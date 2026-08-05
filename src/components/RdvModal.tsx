import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Briefcase, Calendar, CheckCircle2, Clock, ExternalLink, Loader2, Mail, MessageSquare, Phone, User, X } from "lucide-react";

interface RdvModalProps { isOpen: boolean; onClose: () => void }
interface BookingResult { success: boolean; message: string; eventId?: string; calendarLink?: string }
interface Slot { start: string; end: string; time: string }
interface BookingDay { date: string; label: string; slots: Slot[] }
interface BusyPeriod { start: string; end: string }
interface AvailabilityResult { success: boolean; busy: BusyPeriod[] }

const WEBHOOK_URL = import.meta.env.VITE_N8N_RDV_WEBHOOK_URL || "https://n8n.winedge.io/webhook/rendez-vous-soiby";
const AVAILABILITY_URL = import.meta.env.VITE_N8N_AVAILABILITY_WEBHOOK_URL || "https://n8n.winedge.io/webhook/disponibilites-soiby";
const BOOKING_DAYS = 15;
const emptyForm = { name: "", email: "", phone: "", company: "", projectType: "IA & Automatisation", notes: "" };

function buildBookingDays(): BookingDay[] {
  const days: BookingDay[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < BOOKING_DAYS) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const day = String(cursor.getDate()).padStart(2, "0");
      const date = `${year}-${month}-${day}`;
      const slots = [9, 10, 11, 14, 15, 16].map((hour) => ({
        start: `${date}T${String(hour).padStart(2, "0")}:00:00+03:00`,
        end: `${date}T${String(hour + 1).padStart(2, "0")}:00:00+03:00`,
        time: `${String(hour).padStart(2, "0")}:00`,
      }));
      days.push({
        date,
        label: new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" }).format(cursor),
        slots,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export default function RdvModal({ isOpen, onClose }: RdvModalProps) {
  const days = useMemo(buildBookingDays, [isOpen]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [busyPeriods, setBusyPeriods] = useState<BusyPeriod[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  const loadAvailability = async () => {
    if (!days.length) return;
    setLoadingAvailability(true); setError(null);
    try {
      const query = new URLSearchParams({
        start: `${days[0].date}T00:00:00+03:00`,
        end: `${days[days.length - 1].date}T23:59:59+03:00`,
      });
      const response = await fetch(`${AVAILABILITY_URL}?${query}`);
      const data = await response.json() as AvailabilityResult;
      if (!response.ok || !data.success || !Array.isArray(data.busy)) throw new Error("Réponse de disponibilité invalide.");
      setBusyPeriods(data.busy);
    } catch {
      setBusyPeriods([]);
      setError("Impossible de charger les disponibilités. Veuillez réessayer.");
    } finally { setLoadingAvailability(false); }
  };

  useEffect(() => {
    if (isOpen) void loadAvailability();
  }, [isOpen, days]);

  if (!isOpen) return null;
  const currentDay = days[selectedDayIndex];
  const selectedSlot = currentDay?.slots.find((slot) => slot.start === selectedStartTime);
  const slotIsBusy = (slot: Slot) => busyPeriods.some((period) =>
    Date.parse(slot.start) < Date.parse(period.end) && Date.parse(slot.end) > Date.parse(period.start),
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true); setError(null);
    try {
      const payload = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        service: form.projectType,
        start: selectedSlot.start,
        end: selectedSlot.end,
        message: form.notes.trim(),
      });
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: payload,
      });
      const data = await response.json() as BookingResult;
      if (!response.ok || !data.success) throw new Error(data.message || "La réservation a échoué.");
      setResult(data); setStep(3);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "La réservation a échoué.");
    } finally { setSubmitting(false); }
  };

  const resetModal = () => {
    setStep(1); setSelectedDayIndex(0); setSelectedStartTime(null); setForm(emptyForm); setResult(null); setBusyPeriods([]); setError(null); onClose();
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-md" onClick={(event) => { if (event.target === event.currentTarget) resetModal(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="rdv-title" className="relative w-full max-w-2xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
      <header className="flex items-center justify-between border-b border-white/10 p-6"><div><span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Rendez-vous SOIBY</span><h2 id="rdv-title" className="mt-1 text-2xl font-black uppercase tracking-tight text-white">{step === 3 ? "Rendez-vous confirmé" : "Prendre rendez-vous"}</h2></div><button onClick={resetModal} className="bg-neutral-800 p-2 text-neutral-400 hover:text-white" aria-label="Fermer"><X size={18}/></button></header>
      <div className="p-6"><AnimatePresence mode="wait">
        {step === 1 && <motion.div key="slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <div><div className="mb-3 flex items-center justify-between gap-4"><label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">1. Sélectionnez une date</label><span className="text-[9px] font-bold uppercase text-neutral-600">3 prochaines semaines →</span></div><div className="flex snap-x gap-2 overflow-x-auto pb-3">{days.map((day, index) => <button key={day.date} type="button" onClick={() => { setSelectedDayIndex(index); setSelectedStartTime(null); setError(null); }} className={`flex min-h-20 min-w-28 snap-start flex-col items-center justify-center border p-3 transition-all ${selectedDayIndex === index ? "border-accent bg-accent/10 text-white" : "border-white/5 bg-neutral-800/50 text-neutral-400 hover:border-white/20"}`}><span className="text-xs font-black uppercase">{day.label}</span></button>)}</div></div>
          <div><label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">2. Sélectionnez un horaire</label><div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{currentDay.slots.map((slot) => { const busy = slotIsBusy(slot); return <button key={slot.start} type="button" disabled={busy || loadingAvailability} onClick={() => { setSelectedStartTime(slot.start); setError(null); }} title={busy ? "Ce créneau est déjà réservé" : undefined} className={`flex items-center justify-center gap-2 border p-3 text-xs font-black ${busy ? "cursor-not-allowed border-white/5 bg-neutral-950 text-neutral-600 line-through" : selectedStartTime === slot.start ? "border-accent bg-accent text-white" : loadingAvailability ? "cursor-wait border-white/5 text-neutral-600" : "border-white/10 text-white hover:border-accent"}`}><Clock size={12}/>{slot.time}{busy && <span className="sr-only"> — Déjà réservé</span>}</button>; })}</div><p className="mt-3 text-[10px] text-neutral-500">{loadingAvailability ? "Vérification du calendrier…" : "Fuseau horaire : UTC+3 · Durée : 60 min. Les horaires barrés sont déjà réservés."}</p></div>
          {error && <div className="flex items-center justify-between gap-4 border border-accent/30 bg-accent/10 p-3 text-sm text-red-200"><span>{error}</span><button type="button" onClick={() => void loadAvailability()} className="shrink-0 text-[10px] font-black uppercase text-white underline">Réessayer</button></div>}
          <div className="flex items-center justify-between border-t border-white/10 pt-5"><p className="text-xs font-bold text-neutral-400">{selectedSlot ? <span className="text-white">{currentDay.label} à <strong className="text-accent">{selectedSlot.time}</strong></span> : "Choisissez un créneau."}</p><button onClick={() => selectedSlot && setStep(2)} disabled={!selectedSlot} className="flex items-center gap-2 bg-accent px-6 py-3.5 text-xs font-black uppercase text-white disabled:bg-neutral-800 disabled:text-neutral-500">Continuer <ArrowRight size={13}/></button></div>
        </motion.div>}

        {step === 2 && selectedSlot && <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
          <div className="flex items-center justify-between border border-accent/25 bg-accent/10 p-4 text-xs font-bold text-white"><span>{currentDay.label} à <strong className="text-accent">{selectedSlot.time}</strong></span><button type="button" onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-accent underline">Modifier</button></div>
          <div className="grid gap-4 sm:grid-cols-2"><Field icon={User} label="Nom complet *"><input required minLength={2} value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="Jean Dupont" className="field-input"/></Field><Field icon={Mail} label="Adresse email *"><input type="email" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="jean@entreprise.com" className="field-input"/></Field><Field icon={Phone} label="Téléphone *"><input type="tel" required minLength={6} value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} placeholder="+269…" className="field-input"/></Field><Field icon={Briefcase} label="Entreprise"><input value={form.company} onChange={(e) => setForm({...form,company:e.target.value})} placeholder="Entreprise" className="field-input"/></Field><div className="sm:col-span-2"><label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-neutral-400">Type de projet</label><select value={form.projectType} onChange={(e) => setForm({...form,projectType:e.target.value})} className="field-input pl-4"><option>IA & Automatisation</option><option>SaaS & FinTech</option><option>Blockchain & Ledger</option><option>Santé Numérique</option><option>Autre demande</option></select></div></div>
          <Field icon={MessageSquare} label="Votre besoin"><textarea value={form.notes} onChange={(e) => setForm({...form,notes:e.target.value})} rows={3} placeholder="Décrivez brièvement votre projet…" className="field-input resize-none"/></Field>
          {error && <p className="border border-accent/30 bg-accent/10 p-3 text-sm text-red-200">{error}</p>}
          <div className="flex items-center justify-between border-t border-white/10 pt-5"><button type="button" onClick={() => setStep(1)} className="text-xs font-black uppercase text-neutral-400">Retour</button><button type="submit" disabled={submitting} className="flex items-center gap-2 bg-accent px-6 py-3.5 text-xs font-black uppercase text-white disabled:opacity-60">{submitting && <Loader2 size={14} className="animate-spin"/>}{submitting ? "Réservation…" : "Confirmer le rendez-vous"}</button></div>
        </motion.form>}

        {step === 3 && result && <motion.div key="success" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-7 text-center"><div className="mx-auto grid h-20 w-20 place-items-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"><CheckCircle2 size={42}/></div><div><h3 className="text-2xl font-black uppercase text-white">C’est confirmé !</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-300">Le rendez-vous a été ajouté au calendrier SOIBY. Une invitation a été envoyée à <strong className="text-white">{form.email}</strong>.</p></div>{result.calendarLink && <a href={result.calendarLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent px-6 py-4 text-xs font-black uppercase text-white">Voir le rendez-vous <ExternalLink size={13}/></a>}<div><button onClick={resetModal} className="text-[10px] font-black uppercase tracking-wider text-neutral-500 underline">Fermer</button></div></motion.div>}
      </AnimatePresence></div>
    </div>
  </div>;
}

function Field({ icon: Icon, label, children }: { icon: typeof User; label: string; children: ReactNode }) {
  return <div><label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-neutral-400">{label}</label><div className="relative"><Icon size={15} className="absolute left-3.5 top-3.5 text-neutral-500"/>{children}</div></div>;
}
