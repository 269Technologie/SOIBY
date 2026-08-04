import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const products = [
  {
    id: "winedge",
    title: "WinEdge",
    domain: "winedge.io",
    url: "https://winedge.io/",
    logo: "/logo_winedge.png",
    badge: "FinTech & impact social",
    description: "La FinTech qui transforme les achats habituels en épargne Bitcoin et en impact social, sans changer les habitudes du quotidien.",
    features: ["Épargne automatique liée aux achats", "Constitution progressive d’un capital", "Impact social intégré", "Suivi depuis un espace personnel"],
  },
  {
    id: "pilote360",
    title: "Pilote360",
    domain: "pilote360.io",
    url: "https://pilote360.io/",
    logo: "/logo_pilote.png",
    badge: "Copilote financier IA",
    description: "Le copilote financier qui aide les dirigeants à suivre leur entreprise, comprendre leurs chiffres et agir plus sereinement.",
    features: ["Tableau de bord centralisé", "Suivi de la performance", "Lecture simplifiée des données", "Assistance au pilotage"],
  },
  {
    id: "smscovot",
    title: "SMS Covoit",
    domain: "smscovot.com",
    url: "https://smscovot.com/",
    logo: "/logo_covoit.png",
    badge: "Mobilité & covoiturage",
    description: "Une plateforme de covoiturage pensée pour faciliter la mise en relation et l’organisation des déplacements partagés.",
    features: ["Publication de trajets", "Mise en relation des utilisateurs", "Organisation des déplacements", "Accès simple depuis le web"],
  },
  {
    id: "csmc",
    title: "Caisse Solidarité Maladie",
    domain: "caissesolidaritemaladie.com",
    url: "https://caissesolidaritemaladie.com/",
    logo: "/logo_caisse.png",
    badge: "Santé & solidarité",
    description: "Une plateforme au service de la solidarité maladie, pensée pour rendre la protection santé plus accessible aux Comores.",
    features: ["Parcours d’adhésion numérique", "Gestion des bénéficiaires", "Suivi des services", "Accès sécurisé en ligne"],
  },
];

export default function RealisationSection() {
  const [activeId, setActiveId] = useState(products[0].id);
  const current = products.find((product) => product.id === activeId) ?? products[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const active = product.id === activeId;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveId(product.id)}
              className={`group relative min-h-60 overflow-hidden border p-5 text-left transition-all ${active ? "border-accent bg-accent text-white shadow-xl shadow-accent/15" : "border-white/10 bg-neutral-900/60 text-white hover:-translate-y-1 hover:border-white/30"}`}
              aria-pressed={active}
            >
              <div className="absolute left-5 right-5 top-5 grid h-20 place-items-center overflow-hidden rounded-sm border border-black/10 bg-white px-6 py-4 shadow-sm">
                {product.logo ? (
                  <img src={product.logo} alt={`Logo ${product.title}`} className="max-h-10 max-w-[85%] object-contain" />
                ) : (
                  <span className="text-center text-sm font-black uppercase tracking-[0.1em] text-neutral-700">{product.title}</span>
                )}
              </div>
              <div className="mt-28">
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
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-6"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">{current.badge}</p><p className="mt-1 font-mono text-[10px] text-neutral-500">{current.domain}</p></div>
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
