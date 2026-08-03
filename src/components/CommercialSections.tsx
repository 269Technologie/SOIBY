import { useState } from "react";
import { ArrowRight, Blocks, Check, ChevronDown, Compass, Rocket, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const offers = [
  { icon: Compass, eyebrow: "Cadrer", title: "Audit & feuille de route", description: "Transformez une idée ou un problème métier en plan d’action réaliste, priorisé et chiffrable.", deliverables: ["Atelier de cadrage", "Architecture cible", "Priorités et estimation"], duration: "1 à 2 semaines" },
  { icon: Blocks, eyebrow: "Valider", title: "Prototype & MVP", description: "Testez rapidement votre concept auprès de vrais utilisateurs avant d’investir dans une plateforme complète.", deliverables: ["Parcours UX/UI", "MVP fonctionnel", "Déploiement de test"], duration: "4 à 8 semaines", featured: true },
  { icon: Rocket, eyebrow: "Déployer", title: "Plateforme métier", description: "Construisez une solution robuste, intégrée à vos outils et prête à évoluer avec votre activité.", deliverables: ["Développement sur mesure", "Sécurité et intégrations", "Mise en production"], duration: "Sur estimation" },
  { icon: Wrench, eyebrow: "Faire évoluer", title: "Maintenance & Cloud", description: "Gardez une plateforme disponible, sécurisée et continuellement améliorée après son lancement.", deliverables: ["Supervision", "Correctifs et mises à jour", "Accompagnement continu"], duration: "Accompagnement mensuel" },
];

const process = [
  { number: "01", title: "Découverte", text: "Nous clarifions vos utilisateurs, vos contraintes et le résultat attendu." },
  { number: "02", title: "Cadrage", text: "Vous recevez un périmètre, des priorités et une trajectoire de réalisation lisible." },
  { number: "03", title: "Conception", text: "Nous avançons par cycles courts avec démonstrations et décisions partagées." },
  { number: "04", title: "Lancement", text: "La solution est testée, documentée, déployée puis accompagnée dans la durée." },
];

const faqs = [
  { question: "Pouvez-vous partir d’une idée encore peu définie ?", answer: "Oui. L’audit sert précisément à transformer une intuition en objectifs, périmètre et premières priorités sans engager immédiatement un développement complet." },
  { question: "Combien coûte un projet ?", answer: "Le budget dépend du périmètre, des intégrations et du niveau de conformité attendu. Après un premier échange, SOIBY propose une phase de cadrage ou une estimation adaptée, sans masquer les hypothèses." },
  { question: "À qui appartient le code développé ?", answer: "La propriété, les licences et les conditions de réversibilité sont précisées dans la proposition commerciale avant le démarrage du projet." },
  { question: "Pouvez-vous reprendre une plateforme existante ?", answer: "Oui, après un audit technique permettant d’évaluer la qualité du code, les risques, la sécurité et la meilleure stratégie de reprise." },
  { question: "Comment suivez-vous l’avancement ?", answer: "Le travail est organisé en étapes courtes avec un interlocuteur identifié, des démonstrations régulières et une visibilité continue sur les décisions et les prochaines actions." },
];

interface CommercialSectionsProps { onContact: () => void }

export function OfferSection({ onContact }: CommercialSectionsProps) {
  return <section id="offres" className="relative z-10 border-t border-white/10 px-4 py-24 sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">02 / DES OFFRES LISIBLES</span><h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">Commencez au niveau qui correspond à <span className="font-serif italic lowercase text-accent">votre maturité</span>.</h2></div><p className="text-sm leading-relaxed text-neutral-400 lg:col-span-4">Pas de solution imposée : nous choisissons ensemble le plus petit engagement capable de produire une décision ou un résultat utile.</p></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{offers.map((offer, index) => { const Icon = offer.icon; return <motion.article key={offer.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.08 }} className={`group relative flex min-h-[410px] flex-col border p-6 transition-colors ${offer.featured ? "border-accent/60 bg-accent/[0.06]" : "border-white/10 bg-neutral-900/40 hover:border-white/25"}`}>
      {offer.featured && <span className="absolute right-4 top-4 bg-accent px-2 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-white">Conseillé</span>}<Icon size={25} className="mb-8 text-accent" /><p className="text-[9px] font-black uppercase tracking-[0.22em] text-neutral-500">{offer.eyebrow}</p><h3 className="mt-2 text-xl font-black uppercase leading-tight text-white">{offer.title}</h3><p className="mt-4 text-sm leading-relaxed text-neutral-400">{offer.description}</p><ul className="mt-6 space-y-3">{offer.deliverables.map((item) => <li key={item} className="flex items-center gap-2 text-xs font-medium text-neutral-300"><Check size={13} className="shrink-0 text-accent" />{item}</li>)}</ul><div className="mt-auto border-t border-white/10 pt-5"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">Délai indicatif</p><p className="mt-1 text-xs font-bold text-white">{offer.duration}</p></div>
    </motion.article>; })}</div>
    <div className="mt-8 flex flex-col items-start justify-between gap-5 border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center"><div><p className="font-black uppercase text-white">Vous ne savez pas quelle formule choisir ?</p><p className="mt-1 text-sm text-neutral-400">Un premier échange permet d’identifier la prochaine étape utile, sans engagement.</p></div><button onClick={onContact} className="flex shrink-0 items-center gap-2 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-accent hover:text-white">Parler de mon besoin <ArrowRight size={13} /></button></div>
  </div></section>;
}

export function ProcessSection() {
  return <section id="methode" className="relative z-10 border-t border-white/10 bg-neutral-950/40 px-4 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">04 / UNE COLLABORATION SANS ZONE GRISE</span><h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">De votre besoin à un produit <span className="font-serif italic lowercase text-accent">utilisé & mesurable</span>.</h2></div><div className="mt-14 grid gap-px bg-white/10 md:grid-cols-4">{process.map((step) => <article key={step.number} className="relative bg-[#080808] p-7"><span className="font-mono text-xs font-black text-accent">{step.number}</span><div className="absolute right-7 top-8 h-px w-8 bg-white/15"/><h3 className="mt-12 text-lg font-black uppercase text-white">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-neutral-400">{step.text}</p></article>)}</div></div></section>;
}

export function FaqSection({ onContact }: CommercialSectionsProps) {
  const [openIndex, setOpenIndex] = useState(0);
  return <section id="faq" className="relative z-10 border-t border-white/10 px-4 py-24 sm:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">05 / QUESTIONS FRÉQUENTES</span><h2 className="mt-3 text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">Décider avec les <span className="font-serif italic lowercase text-accent">bonnes informations</span>.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">Votre question n’est pas dans la liste ? Échangez directement avec nous.</p><button onClick={onContact} className="mt-7 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white hover:text-accent">Poser une question <ArrowRight size={13} /></button></div><div className="lg:col-span-7">{faqs.map((item, index) => { const open = openIndex === index; return <div key={item.question} className="border-b border-white/10"><button onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-sm font-black uppercase tracking-wide text-white hover:text-accent" aria-expanded={open}><span>{item.question}</span><ChevronDown size={17} className={`shrink-0 transition-transform ${open ? "rotate-180 text-accent" : ""}`} /></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-sm leading-relaxed text-neutral-400">{item.answer}</p></motion.div>}</AnimatePresence></div>; })}</div></div></section>;
}
