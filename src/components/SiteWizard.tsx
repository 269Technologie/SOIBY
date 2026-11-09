import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, Briefcase, Building2, CalendarDays, Check, CheckCircle2, ChevronDown, CloudUpload, Globe, Laptop, List, Loader2,
  Lock, FileCheck2, FileText, Info, Layers, Mail, MapPin, MessageCircle, Paperclip, Pencil, Phone, Rocket, ShieldCheck, Palette, Send, Settings, Share2, ShoppingCart, Square, SquareCheck, Store, Tag, Target, User, Users, X, Zap,
} from "lucide-react";
import "../site-wizard.css";

interface SiteWizardProps { isOpen: boolean; onClose: () => void; onRequestQuote?: () => void }

const WEBHOOK_URL: string | undefined = import.meta.env.VITE_N8N_SITE_WEBHOOK_URL;
const CONTACT_EMAIL = "contact@soiby.fr";
const PRICE = "189 € HT";
const HERO_IMAGE = "/hero-studio.png";
const HERO_IMAGE_MOBILE = "/site-wizard-mobile.jpg";
const HERO_IMAGE_MOBILE_WIDE = "/site-wizard-mobile-wide.jpg"; // plan large, bannière réduite (étapes 2 à 4)

const STEPS = [
  { label: "Vos coordonnées", icon: User, title: "Commençons par vos coordonnées", subtitle: "Nous vous recontactons rapidement pour avancer ensemble." },
  { label: "Votre activité", icon: Store, title: "Parlez-nous de votre activité", subtitle: "Donnez-nous toutes les informations pour bien comprendre votre entreprise, vos produits ou services." },
  { label: "Votre projet", icon: Laptop, title: "Quel est votre projet ?", subtitle: "Choisissez le type de site qui correspond à votre besoin." },
  { label: "Vos besoins", icon: TargetArrow, title: "Vos besoins", subtitle: "Indiquez ce que vous souhaitez pour votre site." },
  { label: "Validation", icon: FileCheck2, title: "Validation de votre demande", subtitle: "Vérifiez le récapitulatif de votre projet et confirmez votre demande." },
] as const;

const COUNTRIES = [
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+269", flag: "🇰🇲", name: "Comores" },
  { code: "+230", flag: "🇲🇺", name: "Maurice" },
  { code: "+262", flag: "🇷🇪", name: "La Réunion" },
  { code: "+32", flag: "🇧🇪", name: "Belgique" },
  { code: "+41", flag: "🇨🇭", name: "Suisse" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
];

const SECTORS = ["Commerce & e-commerce", "Restauration & hôtellerie", "Santé & bien-être", "Éducation & formation", "Services aux entreprises", "Immobilier", "Associations & ONG", "Artisanat & BTP", "Technologie & numérique", "Autre"];
const PROJECT_TYPES = [
  { value: "Site vitrine", desc: "Présentez votre activité, vos offres et soyez visible en ligne.", price: "189 € HT", Icon: BrowserIcon },
  { value: "Site e-commerce", desc: "Vendez vos produits en ligne (paiement, commandes, stock, etc.).", price: "Sur devis", Icon: ShoppingCart },
  { value: "Marketplace", desc: "Mettez en relation plusieurs vendeurs et acheteurs.", price: "Sur devis", Icon: Store },
] as const;
const GOALS = ["Présenter mon activité", "Obtenir des contacts / devis", "Vendre mes produits en ligne", "Prendre des rendez-vous / réservations", "Publier des actualités / du contenu", "Renforcer ma crédibilité", "Autre"];
const AUDIENCES = ["Particuliers (B2C)", "Entreprises (B2B)", "Les deux"] as const;
const BOTH = AUDIENCES[2];
const DELAYS = { asap: "Le plus vite possible (3 à 7 jours)", weeks: "Sous 2 à 4 semaines", date: "Date précise" } as const;
type Delay = keyof typeof DELAYS;
const NOTES_MAX = 5000;
const PAGES = ["Accueil", "À propos", "Nos produits / services", "Galerie / Réalisations", "Témoignages", "Blog / Actualités", "FAQ", "Contact"];
const DEFAULT_PAGES = ["Accueil", "À propos", "Nos produits / services"];
const FEATURES = [
  { value: "Formulaire de contact avancé", Icon: Square, IconOn: SquareCheck },
  { value: "Prise de rendez-vous en ligne", Icon: CalendarDays },
  { value: "Carte Google / Géolocalisation", Icon: MapPin },
  { value: "Bouton WhatsApp", Icon: WhatsAppIcon },
  { value: "Inscription à une newsletter", Icon: Mail },
  { value: "Liens vers mes réseaux sociaux", Icon: Share2 },
] as const;
const STYLES = [
  { value: "Utiliser mon logo et ma charte graphique", hint: "(si disponible)" },
  { value: "Proposition de design par SOIBY", hint: "" },
] as const;
const NEEDS_MAX = 5000;
const PLAN_POINTS = ["Site professionnel et responsive (mobile, tablette, PC)", "Design moderne et personnalisé", "Mise en ligne incluse", "Accompagnement inclus", "Livré en 3 à 7 jours"];

// Validation automatique : e-commerce, marketplace (ou vente en ligne) => hors forfait, demande de devis personnalisé
const MSG_COMPATIBLE = "Votre projet est compatible avec l’offre Site vitrine à 189 € HT.";
const MSG_CUSTOM = "Votre projet nécessite une étude personnalisée. Demandez votre devis gratuit.";
const CUSTOM_POINTS = ["Étude personnalisée de votre besoin", "Devis gratuit et détaillé", "Conception sur mesure", "Accompagnement inclus", "Planning défini avec vous"];
const SELL_GOAL = "Vendre mes produits en ligne";
const needsQuote = (d: { projectType: string; goal: string }) => d.projectType !== PROJECT_TYPES[0].value || d.goal === SELL_GOAL;

const STATUSES = [
  { value: "Entreprise existante", hint: "Mon activité est déjà lancée" },
  { value: "Entreprise en création", hint: "Je lance bientôt mon activité" },
] as const;
const DESC_MAX = 5000;
const FILE_MAX = 10;
const FILE_MAX_BYTES = 10 * 1024 * 1024;
const FILE_EXT = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "xls", "xlsx", "ppt", "pptx"];
const DESC_PLACEHOLDER = "Présentez en détail votre entreprise :\n• Ce que vous vendez, fabriquez ou proposez (produits, services, prestations, etc.)\n• Vos gammes, spécialités ou offres principales\n• Vos clients cibles (particuliers, entreprises, collectivités, etc.)\n• Ce qui vous différencie (qualité, prix, savoir-faire, valeurs, etc.)";
const FORMATS: [string, string][] = [["PDF", "pdf"], ["JPG", "jpg"], ["PNG", "png"], ["DOC", "doc"], ["XLS", "xls"], ["PPT", "ppt"]];

interface FormData {
  firstName: string; lastName: string; email: string; phoneCountry: string; phone: string;
  company: string; sector: string; status: string; description: string; files: File[];
  projectType: string; goal: string; audience: string[]; delay: Delay; delayDate: string; projectNotes: string;
  pages: string[]; features: string[]; style: string; needs: string;
  consent: boolean;
}

const emptyData: FormData = {
  firstName: "", lastName: "", email: "", phoneCountry: "+33", phone: "",
  company: "", sector: "", status: STATUSES[0].value, description: "", files: [],
  projectType: PROJECT_TYPES[0].value, goal: "", audience: [], delay: "asap", delayDate: "", projectNotes: "",
  pages: DEFAULT_PAGES, features: [], style: STYLES[0].value, needs: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(step: number, d: FormData): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (d.firstName.trim().length < 2) e.firstName = "Indiquez votre prénom.";
    if (d.lastName.trim().length < 2) e.lastName = "Indiquez votre nom.";
    if (!EMAIL_RE.test(d.email.trim())) e.email = "Indiquez une adresse email valide.";
    if (d.phone.replace(/\D/g, "").length < 6) e.phone = "Indiquez un numéro de téléphone valide.";
  }
  if (step === 1) {
    if (d.company.trim().length < 2) e.company = "Indiquez le nom de votre entreprise ou activité.";
    if (!d.sector) e.sector = "Choisissez votre secteur d’activité.";
    if (d.description.trim().length < 10) e.description = "Décrivez votre activité en quelques phrases.";
  }
  if (step === 2) {
    if (!d.goal) e.goal = "Choisissez l’objectif principal de votre site.";
    if (!d.audience.length) e.audience = "Indiquez votre public cible.";
    if (d.delay === "date") {
      const today = new Date().toISOString().slice(0, 10);
      if (!d.delayDate) e.delayDate = "Indiquez la date souhaitée.";
      else if (d.delayDate < today) e.delayDate = "La date doit être à venir.";
    }
  }
  if (step === 3 && !d.pages.length) e.pages = "Choisissez au moins une page.";
  if (step === 4 && !d.consent) e.consent = "Veuillez accepter pour envoyer votre demande.";
  return e;
}

/** Cible avec flèche (icône de l'étape « Vos besoins »). */
function TargetArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M40 24a16 16 0 1 1-9-14.4" /><path d="M33 24a9 9 0 1 1-4.5-7.8" /><circle cx="24" cy="24" r="2.2" fill="currentColor" />
      <path d="M25 23l14-14M34 6l-1 7 8 .5 3-3-5-1-1-5z" />
    </svg>
  );
}

/** Logo WhatsApp (absent de lucide-react). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 8.5c0 3.3 3.2 6.5 6.5 6.5l1.2-1.4-2.3-1.1-.9.8c-1-.4-2-1.4-2.4-2.4l.8-.9-1.1-2.3z" fill="#25d366" stroke="none" />
    </svg>
  );
}

/** Fenêtre de navigateur avec barre d'adresse et lignes de contenu (icône « Site vitrine »). */
function BrowserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="9" width="36" height="30" rx="4.5" /><path d="M6 17h36" /><path d="M11.5 13h.1M16 13h.1M20.5 13h.1" /><path d="M13 25h14M13 31h22" />
    </svg>
  );
}

function delayLabel(d: FormData) {
  return d.delay === "date" ? `Pour le ${new Date(d.delayDate).toLocaleDateString("fr-FR")}` : DELAYS[d.delay];
}

function buildMessage(d: FormData, custom: boolean) {
  return [
    `Type de demande : ${custom ? "Devis personnalisé (hors forfait Site vitrine 189 € HT)" : "Commande du forfait Site vitrine 189 € HT"}`,
    `Validation : ${custom ? MSG_CUSTOM : MSG_COMPATIBLE}`,
    `Entreprise : ${d.company.trim()}`,
    `Secteur : ${d.sector}`,
    `Statut : ${d.status}`,
    `Activité : ${d.description.trim()}`,
    d.files.length > 0 && `Documents joints : ${d.files.map((f) => f.name).join(", ")}`,
    `Type de projet : ${d.projectType}`,
    `Objectif : ${d.goal}`,
    `Public cible : ${d.audience.join(", ")}`,
    `Délai souhaité : ${delayLabel(d)}`,
    d.projectNotes.trim() && `Informations complémentaires : ${d.projectNotes.trim()}`,
    `Pages souhaitées : ${d.pages.join(", ")}`,
    `Fonctionnalités : ${d.features.length ? d.features.join(", ") : "aucune"}`,
    `Style : ${d.style}`,
    d.needs.trim() && `Précisions : ${d.needs.trim()}`,
  ].filter(Boolean).join("\n");
}

export default function SiteWizard({ isOpen, onClose, onRequestQuote }: SiteWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyData);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<"sent" | "mail" | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [wantQuote, setWantQuote] = useState(false);   // « Demander un devis » choisi à l'étape de validation
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const close = () => {
    onClose();
    if (done) { setStep(0); setData(emptyData); setErrors({}); setDone(null); setSubmitError(null); setWantQuote(false); }
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener("keydown", onKey); };
  });

  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current?.scrollTo({ top: 0 });
    // Pas d'autofocus sur écran tactile : il ouvrirait le clavier et masquerait le formulaire.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const first = bodyRef.current?.querySelector<HTMLElement>("input:not([type=checkbox]), select, textarea, button.sw-choice");
    first?.focus({ preventScroll: true });
  }, [step, isOpen, done]);

  if (!isOpen) return null;

  const goNext = (event?: FormEvent) => {
    event?.preventDefault();
    const found = validate(step, data);
    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      requestAnimationFrame(() => bodyRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
      return;
    }
    setErrors({});
    if (step < STEPS.length - 1) setStep(step + 1); else void submit();
  };

  const goTo = (target: number) => { setErrors({}); setSubmitError(null); setStep(target); };

  const submit = async () => {
    setSubmitting(true); setSubmitError(null);
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
    const phone = `${data.phoneCountry} ${data.phone.trim()}`;
    const message = buildMessage(data, custom);
    try {
      if (WEBHOOK_URL) {
        const fields = {
          name: fullName, firstName: data.firstName.trim(), lastName: data.lastName.trim(),
          email: data.email.trim(), phone, company: data.company.trim(),
          service: custom ? "Devis personnalisé – site web" : "Création de site web (Site vitrine 189 € HT)", message,
        };
        let response: Response;
        if (data.files.length) {
          const body = new FormData();
          Object.entries(fields).forEach(([k, v]) => body.append(k, v));
          data.files.forEach((f) => body.append("files", f, f.name));
          response = await fetch(WEBHOOK_URL, { method: "POST", body });
        } else {
          response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: new URLSearchParams(fields),
          });
        }
        if (!response.ok) throw new Error("L’envoi a échoué. Veuillez réessayer.");
        setDone("sent");
      } else {
        const subject = encodeURIComponent(`${custom ? "Demande de devis" : "Demande de création de site"} – ${data.company.trim()}`);
        const body = encodeURIComponent(`Nom : ${fullName}\nEmail : ${data.email.trim()}\nTéléphone : ${phone}\n${message}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        setDone("mail");
      }
    } catch (cause) {
      setSubmitError(cause instanceof Error ? cause.message : "L’envoi a échoué. Veuillez réessayer.");
    } finally { setSubmitting(false); }
  };

  const addFiles = (incoming: FileList | File[] | null) => {
    if (!incoming) return;
    const next = [...data.files];
    const problems: string[] = [];
    for (const f of Array.from(incoming)) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!FILE_EXT.includes(ext)) problems.push(`« ${f.name} » : format non accepté.`);
      else if (f.size > FILE_MAX_BYTES) problems.push(`« ${f.name} » dépasse 10 Mo.`);
      else if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      else if (next.length >= FILE_MAX) { problems.push(`Maximum ${FILE_MAX} fichiers.`); break; }
      else next.push(f);
    }
    setData((prev) => ({ ...prev, files: next }));
    setErrors((prev) => ({ ...prev, files: problems.length ? problems.join(" ") : undefined }));
    if (fileInput.current) fileInput.current.value = "";
  };
  const removeFile = (index: number) => { set("files", data.files.filter((_, i) => i !== index)); setErrors((prev) => ({ ...prev, files: undefined })); };
  const toggle = (key: "pages" | "features", v: string) => set(key, data[key].includes(v) ? data[key].filter((x) => x !== v) : [...data[key], v]);
  const country = COUNTRIES.find((c) => c.code === data.phoneCountry) ?? COUNTRIES[0];
  const current = STEPS[step];
  const StepIcon = current.icon;
  const last = step === STEPS.length - 1;
  const autoQuote = needsQuote(data);
  const custom = wantQuote || autoQuote;

  return (
    <div className="sw-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} className={`sw-dialog ${step === 0 ? "is-first" : ""} ${step >= 1 && !done ? "is-activity" : ""} ${step === 4 && !done ? "is-validation" : ""}`} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="sw-banner">
          <picture>
            <source media="(max-width: 680px)" srcSet={step >= 1 && !done ? HERO_IMAGE_MOBILE_WIDE : HERO_IMAGE_MOBILE} />
            <img className="sw-banner-photo" src={HERO_IMAGE} alt="" />
          </picture>
          <button type="button" className="sw-close" onClick={close} aria-label="Fermer"><X /></button>
          <div className="sw-banner-copy">
            <span className="sw-pill">Votre site web<br />clé en main</span>
            {custom ? <h2 id={titleId}>Projet sur mesure<strong>Sur devis</strong></h2> : <h2 id={titleId}>Site vitrine à<strong>{PRICE}</strong></h2>}
          </div>
          <ul className="sw-perks">
            {custom ? (<>
              <li><span><Zap /></span>Solution<br />sur mesure</li>
              <li><span><FileCheck2 /></span>Devis<br />gratuit</li>
            </>) : (<>
              <li><span><Zap /></span>Simple<br />et rapide</li>
              <li><span><CalendarDays /></span>Livré en<br />3 à 7 jours</li>
            </>)}
            <li><span><Check strokeWidth={3} /></span>Accompagnement<br />inclus</li>
          </ul>
        </header>

        <div className="sw-card">
          {done ? (
            <div className="sw-success" role="status">
              <span className="sw-success-icon"><CheckCircle2 /></span>
              <h3>{done === "sent" ? (custom ? "Demande de devis envoyée !" : "Demande envoyée !") : "Presque terminé !"}</h3>
              <p>
                {done === "sent"
                  ? <>Merci {data.firstName.trim()}, nous revenons vers vous très vite à <strong>{data.email.trim()}</strong>.</>
                  : <>Votre application de messagerie s’est ouverte avec votre demande pré-remplie. Envoyez le message à <strong>{CONTACT_EMAIL}</strong> pour la finaliser{data.files.length > 0 && <> et joignez-y vos {data.files.length} document{data.files.length > 1 ? "s" : ""}</>}.</>}
              </p>
              <button type="button" className="sw-primary" onClick={close}>Fermer</button>
            </div>
          ) : (
            <>
              <ol className="sw-stepper" aria-label="Étapes">
                {STEPS.map((s, i) => (
                  <li key={s.label} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
                    <button type="button" disabled={i > step} onClick={() => goTo(i)} aria-label={`Étape ${i + 1} : ${s.label}`}>
                      <span className="sw-dot">{i < step ? <Check strokeWidth={3.2} /> : i + 1}</span>
                      <span className="sw-step-label">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <form className="sw-form" onSubmit={goNext} noValidate>
                <div className="sw-head">
                  <span className="sw-head-icon"><StepIcon /></span>
                  <div><h3>{current.title}</h3>
                    {step === 4 || (step === 2 && custom)
                      ? <p className={`sw-verdict ${custom ? "custom" : "ok"}`} role="status" aria-live="polite">{custom ? MSG_CUSTOM : MSG_COMPATIBLE}</p>
                      : <p>{current.subtitle}</p>}
                  </div>
                </div>

                <div className={`sw-fields ${step === 3 ? "sw-needs" : ""}`} ref={bodyRef} key={step}>
                  {step === 0 && <>
                    <Field label="Prénom" required error={errors.firstName}>
                      {(p) => <input {...p} value={data.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Votre prénom" autoComplete="given-name" />}
                    </Field>
                    <Field label="Nom" required error={errors.lastName}>
                      {(p) => <input {...p} value={data.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Votre nom" autoComplete="family-name" />}
                    </Field>
                    <Field label="Email" required error={errors.email} wide>
                      {(p) => <div className="sw-input-icon"><Mail /><input {...p} type="email" inputMode="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="votre@email.com" autoComplete="email" /></div>}
                    </Field>
                    <Field label="Téléphone" required error={errors.phone} wide>
                      {(p) => (
                        <div className="sw-phone">
                          <Phone className="sw-phone-ico" />
                          <label className="sw-country">
                            <span aria-hidden="true">{country.flag}</span><ChevronDown />
                            <select aria-label="Indicatif du pays" value={data.phoneCountry} onChange={(e) => set("phoneCountry", e.target.value)}>
                              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>)}
                            </select>
                          </label>
                          <input {...p} type="tel" inputMode="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="06 12 34 56 78" autoComplete="tel-national" />
                        </div>
                      )}
                    </Field>
                  </>}

                  {step === 1 && <>
                    <Field label="Nom de votre entreprise" required error={errors.company}>
                      {(p) => <div className="sw-input-icon"><Building2 /><input {...p} value={data.company} onChange={(e) => set("company", e.target.value)} placeholder="Ex. : Mon Boutique SARL" autoComplete="organization" /></div>}
                    </Field>
                    <Field label="Secteur d’activité" required error={errors.sector}>
                      {(p) => <div className="sw-input-icon sw-select-icon"><List /><Select {...p} value={data.sector} onChange={(v) => set("sector", v)} options={SECTORS} placeholder="Sélectionnez votre secteur" /></div>}
                    </Field>
                    <div className="sw-wide">
                      <p className="sw-label" id="sw-status-label">Statut de votre entreprise <i>*</i></p>
                      <div className="sw-status" role="radiogroup" aria-labelledby="sw-status-label">
                        {STATUSES.map((s) => (
                          <button key={s.value} type="button" role="radio" aria-checked={data.status === s.value} className={`sw-status-card ${data.status === s.value ? "is-on" : ""}`} onClick={() => set("status", s.value)}>
                            <span className="sw-radio" aria-hidden="true" />
                            <span><strong>{s.value}</strong><small>{s.hint}</small></span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Field label="Décrivez précisément votre activité" required error={errors.description} wide>
                      {(p) => (
                        <div className="sw-textarea">
                          <Pencil />
                          <textarea {...p} maxLength={DESC_MAX} value={data.description} onChange={(e) => set("description", e.target.value)} placeholder={DESC_PLACEHOLDER} />
                          <span className="sw-count">{data.description.length.toLocaleString("fr-FR")} / {DESC_MAX.toLocaleString("fr-FR")}</span>
                        </div>
                      )}
                    </Field>
                    <div className="sw-wide sw-docs">
                      <div className="sw-docs-head">
                        <Paperclip />
                        <div><p className="sw-docs-title">Ajoutez vos documents (facultatif)</p><p className="sw-docs-sub">Logo, flyer, catalogue, plaquette, photos de produits, présentations, etc.</p></div>
                      </div>
                      <div
                        className={`sw-drop ${dragging ? "is-drag" : ""} ${errors.files ? "has-error" : ""}`}
                        role="button" tabIndex={0} aria-label="Ajouter des documents"
                        onClick={() => fileInput.current?.click()}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.current?.click(); } }}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                      >
                        <input ref={fileInput} type="file" multiple hidden accept={FILE_EXT.map((x) => `.${x}`).join(",")} onChange={(e) => addFiles(e.target.files)} />
                        <div className="sw-drop-main">
                          <CloudUpload />
                          <p>Déposez vos fichiers ici ou <u>cliquez pour parcourir</u></p>
                        </div>
                        <div className="sw-drop-art" aria-hidden="true"><i className="a" /><i className="b" /><i className="c" /></div>
                        {data.files.length > 0 ? (
                          <ul className="sw-files" onClick={(e) => e.stopPropagation()}>
                            {data.files.map((f, i) => (
                              <li key={`${f.name}-${f.size}`}><span>{f.name}</span><button type="button" aria-label={`Retirer ${f.name}`} onClick={() => removeFile(i)}><X /></button></li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="sw-formats" aria-label="Formats acceptés">{FORMATS.map(([label, cls]) => <li key={label} className={`f-${cls}`}>{label}</li>)}</ul>
                        )}
                        <p className="sw-limits">Jusqu’à {FILE_MAX} fichiers • 10 Mo max par fichier</p>
                      </div>
                      {errors.files && <p className="sw-error" role="alert">{errors.files}</p>}
                    </div>
                  </>}

                  {step === 2 && <>
                    <div className="sw-wide sw-types" role="radiogroup" aria-label="Type de projet">
                      {PROJECT_TYPES.map(({ value, desc, price, Icon }) => {
                        const on = data.projectType === value;
                        return (
                          <button key={value} type="button" role="radio" aria-checked={on} className={`sw-type ${on ? "is-on" : ""}`} onClick={() => set("projectType", value)}>
                            <span className="sw-radio" aria-hidden="true" />
                            {on && <span className="sw-type-check" aria-hidden="true"><Check strokeWidth={3.4} /></span>}
                            <Icon className="sw-type-icon" />
                            <strong>{value}</strong>
                            <small>{desc}</small>
                            <em className={price === "Sur devis" ? "quote" : ""}>{price}</em>
                          </button>
                        );
                      })}
                    </div>
                    <div className="sw-wide sw-iconrow">
                      <Target />
                      <Field label="Objectif principal de votre site" required error={errors.goal}>
                        {(p) => <Select {...p} value={data.goal} onChange={(v) => set("goal", v)} options={GOALS} placeholder="Sélectionnez votre objectif" />}
                      </Field>
                    </div>
                    <div className="sw-wide sw-iconrow">
                      <Users />
                      <div className={`sw-field ${errors.audience ? "has-error" : ""}`}>
                        <p className="sw-label" id="sw-audience-label">Public cible <i>*</i></p>
                        <div className="sw-opts" role="group" aria-labelledby="sw-audience-label">
                          {AUDIENCES.map((a) => (
                            <label key={a} className="sw-opt">
                              <input type="checkbox" checked={data.audience.includes(a)} aria-invalid={!!errors.audience} onChange={() => set("audience", data.audience.includes(a) ? data.audience.filter((x) => x !== a) : a === BOTH ? [BOTH] : [...data.audience.filter((x) => x !== BOTH), a])} />
                              <span>{a}</span>
                            </label>
                          ))}
                        </div>
                        {errors.audience && <p className="sw-error" role="alert">{errors.audience}</p>}
                      </div>
                    </div>
                    <div className="sw-wide sw-iconrow">
                      <CalendarDays />
                      <div className={`sw-field ${errors.delayDate ? "has-error" : ""}`}>
                        <p className="sw-label" id="sw-delay-label">Délai souhaité <i>*</i></p>
                        <div className="sw-delays" role="radiogroup" aria-labelledby="sw-delay-label">
                          {(["asap", "weeks"] as const).map((k) => (
                            <button key={k} type="button" role="radio" aria-checked={data.delay === k} className={`sw-delay ${data.delay === k ? "is-on" : ""}`} onClick={() => set("delay", k)}>
                              <span className="sw-radio" aria-hidden="true" />
                              <span>{k === "asap" ? <><strong>Le plus vite possible</strong><small>(3 à 7 jours)</small></> : <strong>{DELAYS.weeks}</strong>}</span>
                            </button>
                          ))}
                          <div role="radio" tabIndex={0} aria-checked={data.delay === "date"} className={`sw-delay sw-delay-date ${data.delay === "date" ? "is-on" : ""}`} onClick={() => set("delay", "date")} onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); set("delay", "date"); } }}>
                            <CalendarDays />
                            {data.delay === "date"
                              ? <input type="date" aria-label="Date souhaitée" aria-invalid={!!errors.delayDate} min={new Date().toISOString().slice(0, 10)} value={data.delayDate} onChange={(e) => set("delayDate", e.target.value)} />
                              : <strong>{DELAYS.date}</strong>}
                          </div>
                        </div>
                        {errors.delayDate && <p className="sw-error" role="alert">{errors.delayDate}</p>}
                      </div>
                    </div>
                    <div className="sw-wide sw-iconrow">
                      <MessageCircle />
                      <Field label="Informations complémentaires (facultatif)">
                        {(p) => (
                          <div className="sw-textarea plain">
                            <textarea {...p} maxLength={NOTES_MAX} value={data.projectNotes} onChange={(e) => set("projectNotes", e.target.value)} placeholder="Précisez vos attentes, exemples de sites que vous aimez, fonctionnalités particulières, mentions obligatoires, etc." />
                            <span className="sw-count">{data.projectNotes.length.toLocaleString("fr-FR")} / {NOTES_MAX.toLocaleString("fr-FR")}</span>
                          </div>
                        )}
                      </Field>
                    </div>
                  </>}

                  {step === 3 && <>
                    <div className="sw-wide sw-group">
                      <div className="sw-group-head" id="sw-pages-label"><FileText /><p>Pages souhaitées <i>*</i></p><span>(Plusieurs choix possibles)</span></div>
                      <div className="sw-picks sw-picks-4" role="group" aria-labelledby="sw-pages-label">
                        {PAGES.map((v) => {
                          const on = data.pages.includes(v);
                          return <button key={v} type="button" role="checkbox" aria-checked={on} className={`sw-pick ${on ? "is-on" : ""}`} onClick={() => toggle("pages", v)}><span className="sw-box" aria-hidden="true">{on && <Check strokeWidth={3.6} />}</span><span>{v}</span></button>;
                        })}
                      </div>
                      {errors.pages && <p className="sw-error" role="alert">{errors.pages}</p>}
                    </div>
                    <div className="sw-wide sw-group">
                      <div className="sw-group-head" id="sw-features-label"><Settings /><p>Fonctionnalités souhaitées</p><span>(Optionnelles)</span></div>
                      <div className="sw-picks sw-picks-3" role="group" aria-labelledby="sw-features-label">
                        {FEATURES.map((f) => {
                          const on = data.features.includes(f.value);
                          const Icon = on && "IconOn" in f ? f.IconOn : f.Icon;
                          return <button key={f.value} type="button" role="checkbox" aria-checked={on} className={`sw-pick sw-feat ${on ? "is-on" : ""}`} onClick={() => toggle("features", f.value)}><Icon className="sw-feat-icon" /><span>{f.value}</span></button>;
                        })}
                      </div>
                    </div>
                    <div className="sw-wide sw-group">
                      <div className="sw-group-head" id="sw-style-label"><Palette /><p>Style et identité visuelle</p></div>
                      <div className="sw-styles" role="radiogroup" aria-labelledby="sw-style-label">
                        {STYLES.map((s) => (
                          <button key={s.value} type="button" role="radio" aria-checked={data.style === s.value} className={`sw-style ${data.style === s.value ? "is-on" : ""}`} onClick={() => set("style", s.value)}>
                            <span className="sw-radio" aria-hidden="true" />
                            <span><strong>{s.value}</strong>{s.hint && <small>{s.hint}</small>}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="sw-wide sw-group">
                      <div className="sw-group-head"><FileText /><label htmlFor="sw-needs">Autres précisions (facultatif)</label></div>
                      <div className="sw-textarea plain">
                        <textarea id="sw-needs" maxLength={NEEDS_MAX} value={data.needs} onChange={(e) => set("needs", e.target.value)} placeholder="Ajoutez toute information utile : design souhaité, exemples de sites que vous aimez, contenus à intégrer, langues, etc." />
                        <span className="sw-count">{data.needs.length.toLocaleString("fr-FR")} / {NEEDS_MAX.toLocaleString("fr-FR")}</span>
                      </div>
                    </div>
                  </>}

                  {step === 4 && (() => {
                    const plan = custom ? { value: "Devis personnalisé", price: "Sur devis" } : (PROJECT_TYPES.find((x) => x.value === data.projectType) ?? PROJECT_TYPES[0]);
                    const points = custom ? CUSTOM_POINTS : PLAN_POINTS;
                    const rows: [typeof Building2, string, string][] = [
                      [Building2, "Entreprise", data.company.trim()],
                      [Tag, "Secteur", data.sector],
                      [Briefcase, "Statut", data.status],
                      [Laptop, "Projet", custom && !autoQuote ? `${data.projectType} — devis personnalisé` : data.projectType],
                      [TargetArrow, "Objectif", data.goal],
                      [Layers, "Pages", data.pages.join(", ")],
                      [Settings, "Fonctionnalités", data.features.length ? data.features.join(", ") : "Aucune"],
                      [Palette, "Identité visuelle", data.style],
                      [MessageCircle, "Autres précisions", data.needs.trim() || "—"],
                    ];
                    return <>
                      <div className="sw-wide sw-valid">
                        <section className="sw-sum" aria-label="Récapitulatif de votre projet">
                          <h4><FileText />Récapitulatif de votre projet</h4>
                          <ul>{rows.map(([Icon, k, v]) => <li key={k}><Icon /><p><b>{k} :</b> {v}</p></li>)}</ul>
                        </section>
                        <aside className="sw-aside">
                          <section className="sw-plan" aria-label="Forfait sélectionné">
                            <span className="sw-plan-pill">{custom ? "Demande de devis" : "Forfait sélectionné"}</span>
                            <h4>{plan.value}</h4>
                            <p className={`sw-plan-price ${plan.price === "Sur devis" ? "quote" : ""}`}>{plan.price}</p>
                            <ul>{points.map((x) => <li key={x}><span aria-hidden="true"><Check strokeWidth={3.6} /></span>{x}</li>)}</ul>
                          </section>
                          <section className="sw-more">
                            <Info />
                            <div>
                              {custom ? <>
                                <h4>Étude personnalisée</h4>
                                <p>Nous étudions votre besoin et vous remettons un devis gratuit.</p>
                              </> : <>
                                <h4>Besoin de plus ?</h4>
                                <p>E-commerce, marketplace ou fonctionnalités spécifiques ? Demandez un devis personnalisé.</p>
                              </>}
                            </div>
                            {!autoQuote && <button type="button" onClick={() => setWantQuote(!wantQuote)}>{wantQuote ? "Revenir au forfait 189 € HT" : "Demander un devis"}</button>}
                          </section>
                        </aside>
                      </div>
                      <div className={`sw-wide sw-agree ${errors.consent ? "has-error" : ""}`}>
                        <label className="sw-consent">
                          <input type="checkbox" checked={data.consent} aria-invalid={!!errors.consent} onChange={(e) => set("consent", e.target.checked)} />
                          <span><strong>J’accepte les conditions et je confirme ma demande <i>*</i></strong><small>{custom ? "En validant, je demande à SOIBY de me contacter pour étudier mon projet et me remettre un devis personnalisé." : "En validant, je demande à SOIBY de me contacter pour finaliser mon projet et les modalités de paiement."}</small></span>
                        </label>
                        <button type="button" className="sw-terms-link" aria-expanded={showTerms} onClick={() => setShowTerms(!showTerms)}><FileText />Voir les conditions</button>
                        {showTerms && <p className="sw-terms">Création du site uniquement, hors nom de domaine et hébergement. Prix HT. Un devis clair vous est remis avant de commencer, et le site est livré en 3 à 7 jours ouvrés une fois vos contenus transmis.</p>}
                      </div>
                      {errors.consent && <p className="sw-error sw-wide" role="alert">{errors.consent}</p>}
                    </>;
                  })()}
                </div>

                {submitError && <p className="sw-banner-error" role="alert">{submitError}</p>}

                <div className="sw-actions">
                  {step > 0 && <button type="button" className="sw-back" onClick={() => goTo(step - 1)} disabled={submitting}><ArrowLeft />Précédent</button>}
                  <button type="submit" className="sw-primary" data-last={last || undefined} disabled={submitting}>
                    {submitting ? <><Loader2 className="sw-spin" />Envoi…</> : last ? <><Send />{custom ? "Demander mon devis" : "Envoyer ma demande"}</> : <>Suivant<ArrowRight /></>}
                  </button>
                </div>

                {step === 0 && <p className="sw-privacy"><Lock />Vos informations sont confidentielles et ne seront jamais partagées.</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type FieldProps = { id: string; "aria-invalid": boolean; "aria-describedby"?: string };

function Field({ label, required, error, wide, children }: { label: string; required?: boolean; error?: string; wide?: boolean; children: (props: FieldProps) => ReactNode }) {
  const id = useId();
  return (
    <div className={`sw-field ${wide ? "sw-wide" : ""} ${error ? "has-error" : ""}`}>
      <label className="sw-label" htmlFor={id}>{label}{required && <i> *</i>}</label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined })}
      {error && <p className="sw-error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, ...rest }: FieldProps & { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div className="sw-select">
      <select {...rest} value={value} onChange={(e) => onChange(e.target.value)} className={value ? "" : "is-empty"}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown />
    </div>
  );
}
