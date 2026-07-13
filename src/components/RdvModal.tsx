/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X, 
  Briefcase, 
  User, 
  Mail, 
  MessageSquare, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DayAvailability, BookingDetails } from "../types";

interface RdvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate the next 4 business days in French starting tomorrow or Monday
const generateBusinessDays = (): DayAvailability[] => {
  const list: DayAvailability[] = [];
  const daysFrench = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const monthsFrench = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  let current = new Date();
  
  while (list.length < 5) {
    current.setDate(current.getDate() + 1);
    const dayOfWeek = current.getDay();
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateString = `${daysFrench[dayOfWeek]} ${current.getDate()} ${monthsFrench[current.getMonth()]}`;
      
      // Determine random but deterministic slot availability
      const seed = current.getDate();
      const slots = [
        { time: "09:30", available: (seed % 3 !== 0) },
        { time: "11:00", available: (seed % 4 !== 0) },
        { time: "14:00", available: true },
        { time: "15:30", available: (seed % 2 === 0) },
        { time: "17:00", available: (seed % 5 !== 0) },
      ];
      
      list.push({ dateString, slots });
    }
  }
  
  return list;
};

export default function RdvModal({ isOpen, onClose }: RdvModalProps) {
  const days = generateBusinessDays();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1); // 1 = Day/Time, 2 = Info Form, 3 = Confirmed
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "IA & Automatisation",
    notes: ""
  });

  if (!isOpen) return null;

  const currentDay = days[selectedDayIndex];

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
  };

  const handleNextStep = () => {
    if (selectedSlot) {
      setStep(2);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      setStep(3);
    }
  };

  // Helper to generate Google Calendar event link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Meeting SOIBY - ${form.projectType}`);
    const details = encodeURIComponent(
      `Bonjour ${form.name},\n\nMerci pour votre demande de rendez-vous avec SOIBY.\nSujet : ${form.projectType}\nEntreprise : ${form.company}\n\nNotes : ${form.notes}\n\nÀ très vite !\nL'équipe SOIBY.`
    );
    
    // Fallback date generation
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + (selectedDayIndex + 1));
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    const [hours, minutes] = (selectedSlot || "10:00").split(":");
    const startHour = String(Number(hours)).padStart(2, '0');
    const endHour = String(Number(hours) + 1).padStart(2, '0');
    
    const startStr = `${year}${month}${day}T${startHour}${minutes}00`;
    const endStr = `${year}${month}${day}T${endHour}${minutes}00`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=Google+Meet&sf=true&output=xml`;
  };

  // Helper to generate a prefilled mailto draft
  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Rendez-vous SOIBY - ${form.name} (${form.company})`);
    const body = encodeURIComponent(
      `Bonjour l'équipe SOIBY,\n\nJe souhaite confirmer mon rendez-vous le ${currentDay.dateString} à ${selectedSlot}.\n\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company || "Non renseigné"}\nProjet: ${form.projectType}\nMessage: ${form.notes || "Aucun message additionnel."}\n\nCordialement.`
    );
    return `mailto:contact@soiby.fr?subject=${subject}&body=${body}`;
  };

  const resetModal = () => {
    setStep(1);
    setSelectedSlot(null);
    setForm({
      name: "",
      email: "",
      company: "",
      projectType: "IA & Automatisation",
      notes: ""
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetModal();
      }}
    >
      <div 
        id="rdvModalContent"
        className="relative w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-none overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">
              Consultation gratuite
            </span>
            <h2 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">
              {step === 3 ? "Rendez-vous réservé !" : "Prendre Rendez-vous"}
            </h2>
          </div>
          <button 
            onClick={resetModal}
            className="p-2 text-neutral-400 hover:text-white bg-neutral-850 hover:bg-neutral-800 rounded-none transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal content steps */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    1. Sélectionnez la date :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {days.map((day, idx) => {
                      const isSelected = selectedDayIndex === idx;
                      // Split "Lundi 14 Juillet" into "Lundi" & "14 Juil."
                      const parts = day.dateString.split(" ");
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedDayIndex(idx);
                            setSelectedSlot(null);
                          }}
                          className={`flex flex-col items-center justify-center p-4 rounded-none border text-center transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-accent/10 border-accent text-white shadow-lg shadow-accent/5" 
                              : "bg-neutral-850 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-wider opacity-70">{parts[0]}</span>
                          <span className="text-xl font-black mt-1">{parts[1]}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider opacity-80 mt-0.5">{parts[2]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-3">
                    2. Sélectionnez un créneau horaire :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {currentDay.slots.map((slot) => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot.time)}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-none border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                            !slot.available
                              ? "bg-neutral-800/10 border-white/5 text-neutral-600 line-through cursor-not-allowed"
                              : isSelected
                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                : "bg-neutral-850 border-white/5 text-white hover:border-white/20"
                          }`}
                        >
                          <Clock size={13} className={isSelected ? "text-white" : "text-neutral-500"} />
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex justify-between items-center">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    {selectedSlot ? (
                      <span className="text-white">
                        Sélection : <strong className="text-accent">{currentDay.dateString} à {selectedSlot}</strong>
                      </span>
                    ) : (
                      "Veuillez choisir un horaire."
                    )}
                  </div>
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedSlot}
                    className={`flex items-center gap-2 px-6 py-3.5 rounded-none font-black uppercase tracking-[0.15em] text-xs transition-all cursor-pointer ${
                      selectedSlot
                        ? "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20"
                        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    Continuer
                    <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form
                key="step2"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="bg-accent/10 border border-accent/25 rounded-none p-4 flex justify-between items-center text-xs text-white mb-2 uppercase tracking-wider font-bold">
                  <div>
                    Créneau choisi : <strong className="text-accent">{currentDay.dateString} à {selectedSlot}</strong>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setStep(1)} 
                    className="text-[10px] underline text-accent hover:text-accent-hover uppercase font-black"
                  >
                    Modifier
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 mb-1.5">
                      Nom complet <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="w-full bg-neutral-850 border border-white/10 rounded-none pl-10 pr-4 py-3 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 mb-1.5">
                      Adresse Email <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jean.dupont@entreprise.com"
                        className="w-full bg-neutral-850 border border-white/10 rounded-none pl-10 pr-4 py-3 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 mb-1.5">
                      Entreprise / Structure
                    </label>
                    <div className="relative">
                      <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full bg-neutral-850 border border-white/10 rounded-none pl-10 pr-4 py-3 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 mb-1.5">
                      Type de projet principal
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-neutral-850 border border-white/10 rounded-none px-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-neutral-900 text-white" value="IA & Automatisation">IA & Automatisation</option>
                      <option className="bg-neutral-900 text-white" value="Blockchain & Ledger">Blockchain & Ledger</option>
                      <option className="bg-neutral-900 text-white" value="SaaS & FinTech">SaaS & FinTech</option>
                      <option className="bg-neutral-900 text-white" value="Santé Numérique">Santé Numérique</option>
                      <option className="bg-neutral-900 text-white" value="Autre demande">Autre demande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 mb-1.5">
                    Décrivez brièvement vos besoins (facultatif)
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-4 text-neutral-500" />
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Quels sont vos objectifs ou questions principales ?"
                      rows={3}
                      className="w-full bg-neutral-850 border border-white/10 rounded-none pl-10 pr-4 py-3 text-white text-sm focus:border-accent focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-black uppercase tracking-[0.15em] text-neutral-400 hover:text-white transition-all cursor-pointer"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3.5 rounded-none font-black uppercase tracking-[0.15em] text-xs shadow-lg shadow-accent/20 transition-all cursor-pointer"
                  >
                    Confirmer le Rendez-vous
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-center py-6 space-y-6"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-none text-emerald-500">
                    <CheckCircle2 size={48} className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">C'est noté, {form.name} !</h3>
                  <p className="text-neutral-300 max-w-md mx-auto text-sm leading-relaxed">
                    Votre créneau pour le <strong className="text-white">{currentDay.dateString} à {selectedSlot}</strong> est pré-réservé.
                  </p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Pour finaliser et sécuriser l'événement, ajoutez-le immédiatement à votre agenda Google ou envoyez-nous la confirmation par email.
                  </p>
                </div>

                <div className="bg-neutral-850 border border-white/5 rounded-none p-5 max-w-md mx-auto space-y-3 font-mono text-xs">
                  <div className="text-left text-neutral-400 space-y-1.5">
                    <p>🧑‍💼 <strong className="text-white uppercase tracking-wider">Client :</strong> {form.name} ({form.company || "Perso"})</p>
                    <p>✉️ <strong className="text-white uppercase tracking-wider">Email :</strong> {form.email}</p>
                    <p>🚀 <strong className="text-white uppercase tracking-wider">Secteur :</strong> {form.projectType}</p>
                    {form.notes && <p>📝 <strong className="text-white uppercase tracking-wider">Note :</strong> "{form.notes}"</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.15em] py-4 px-5 rounded-none text-xs shadow-lg shadow-accent/20 transition-all cursor-pointer"
                  >
                    Ajouter à Google Calendar
                    <ExternalLink size={13} />
                  </a>
                  <a
                    href={getMailtoUrl()}
                    className="flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 border border-white/10 text-white font-black uppercase tracking-[0.15em] py-4 px-5 rounded-none text-xs transition-all cursor-pointer"
                  >
                    Envoyer par Email Direct
                    <Mail size={13} />
                  </a>
                </div>

                <div>
                  <button
                    onClick={resetModal}
                    className="text-[10px] uppercase font-black tracking-widest text-neutral-500 hover:text-neutral-300 underline transition-all cursor-pointer"
                  >
                    Fermer la fenêtre
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
