import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Check, HeartPulse, LayoutDashboard, MessageSquareText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const products = [
  {
    id: "windege",
    number: "01",
    title: "Windege",
    domain: "windege.io",
    url: "https://windege.io/",
    badge: "Finance & pilotage",
    icon: BriefcaseBusiness,
    description: "Une plateforme conçue pour donner une lecture plus claire des données financières et faciliter les décisions de pilotage.",
    features: ["Vision consolidée de l’activité", "Analyse et suivi des indicateurs", "Aide à la décision", "Expérience accessible en ligne"],
  },
  {
    id: "pilote360",
    number: "02",
    title: "Pilote360",
    domain: "pilote360.io",
    url: "https://pilote360.io/",
    badge: "Copilote financier IA",
    icon: LayoutDashboard,
    description: "Le copilote financier qui aide les dirigeants à suivre leur entreprise, comprendre leurs chiffres et agir plus sereinement.",
    features: ["Tableau de bord centralisé", "Suivi de la performance", "Lecture simplifiée des données", "Assistance au pilotage"],
  },
  {
    id: "smscovot",
    number: "03",
    title: "SMS Covot",
    domain: "smscovot.com",
    url: "https://smscovot.com/",
    badge: "Communication numérique",
    icon: MessageSquareText,
    description: "Une solution numérique SOIBY dédiée à la communication et à la circulation efficace de l’information.",
    features: ["Accès depuis le web", "Parcours utilisateur simplifié", "Gestion centralisée", "Solution évolutive"],
  },
  {
    id: "csmc",
    number: "04",
    title: "Caisse Solidarité Maladie",
    domain: "caissesolidaritemaladie.com",
    url: "https://caissesolidaritemaladie.com/",
    badge: "Santé & solidarité",
    icon: HeartPulse,
    description: "Une plateforme au service de la solidarité maladie, pensée pour rendre la protection santé plus accessible aux Comores.",
    features: ["Parcours d’adhésion numérique", "Gestion des bénéficiaires", "Suivi des services", "Accès sécurisé en ligne"],
  },
];

export default function RealisationSection() {
  const [activeId, setActiveId] = useState(products[0].id);
  const current = products.find((product) => product.id === activeId) ?? products[0];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const Icon = product.icon;
          const active = product.id === activeId;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveId(product.id)}
              className={`group relative min-h-52 overflow-hidden border p-5 text-left transition-all ${active ? "border-accent bg-accent text-white shadow-xl shadow-accent/15" : "border-white/10 bg-neutral-900/60 text-white hover:-translate-y-1 hover:border-white/30"}`}
              aria-pressed={active}
            >
              <span className={`font-mono text-[9px] font-black tracking-[0.2em] ${active ? "text-white/70" : "text-accent"}`}>{product.number} / PRODUIT</span>
              <Icon size={24} className={`absolute right-5 top-5 ${active ? "text-white" : "text-neutral-600 group-hover:text-accent"}`} />
              <div className="mt-16">
                <h3 className="text-xl font-black uppercase tracking-tight">{product.title}</h3>
                <p className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${active ? "text-white/70" : "text-neutral-500"}`}>{product.badge}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 transition-all ${active ? "w-full bg-white" : "w-0 bg-accent group-hover:w-full"}`} />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="relative overflow-hidden border border-white/10 bg-neutral-900/45 p-6 backdrop-blur-sm sm:p-10">
          <div className="pointer-events-none absolute -right-8 -top-10 select-none text-[8rem] font-black uppercase text-white/[0.025] sm:text-[12rem]">{current.number}</div>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center border border-accent/30 bg-accent/10 text-accent"><CurrentIcon size={21} /></div><div><p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">{current.badge}</p><p className="mt-1 font-mono text-[10px] text-neutral-500">{current.domain}</p></div></div>
              <h3 className="text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">{current.title}</h3>
              <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-neutral-300 sm:text-base">{current.description}</p>
              <a href={current.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 bg-accent px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-hover">
                Découvrir {current.title} <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="border border-white/10 bg-neutral-950 p-6 lg:col-span-5 sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-neutral-500">Ce que la plateforme propose</p>
              <ul className="mt-6 space-y-4">{current.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm font-medium text-neutral-300"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-emerald-500/25 bg-emerald-500/10 text-emerald-400"><Check size={11} /></span>{feature}</li>)}</ul>
              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[9px] font-black uppercase tracking-[0.16em]"><span className="text-neutral-600">Plateforme en ligne</span><span className="flex items-center gap-2 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Visiter le site</span></div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
