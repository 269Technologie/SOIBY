/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Activity,
  Heart,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Realisation } from "../types";

export default function RealisationSection() {
  const [activeTab, setActiveTab] = useState<string>("winedge");

  const realisations: Realisation[] = [
    {
      id: "winedge",
      title: "WinEdge",
      badge: "FinTech & Blockchain",
      description: "Plateforme décentralisée d'analyse financière et d'audit transactionnel automatisé par IA.",
      techs: ["Blockchain Ledger", "Vae Models", "Next.js Container", "Smart Audit Engine"],
      features: [
        "Audit transactionnel continu sans intermédiaire",
        "Modèles prédictifs de risques de liquidité",
        "Rapprochement bancaire intelligent en temps réel (99.8% de précision)",
        "Génération automatisée de rapports certifiés"
      ],
      impact: "+42% d'efficacité opérationnelle constatée chez nos clients institutionnels.",
      details: "WinEdge s'adresse aux directions financières exigeantes souhaitant auditer leurs flux monétaires avec une traçabilité totale et une automatisation poussée."
    },
    {
      id: "pilote360",
      title: "Pilote360",
      badge: "SaaS Business Intelligent",
      description: "Le cockpit intelligent pour diriger, automatiser et optimiser l'ensemble de votre entreprise.",
      techs: ["Intelligence Artificielle", "FastAPI Server", "Postgres Cloud", "Tailwind GUI"],
      features: [
        "Dashboard analytique unifié en temps réel",
        "Suivi et affectation automatique des tâches par IA",
        "Génération de factures et relances intelligentes automatiques",
        "Rapports de performance prédictifs mensuels"
      ],
      impact: "-30 heures administratives par mois économisées par manager en moyenne.",
      details: "Pilote360 centralise l'ensemble de vos briques de gestion : facturation, RH, workflows opérationnels et prévisions de vente."
    },
    {
      id: "csm",
      title: "Caisse Solidarité Maladie",
      badge: "Santé Numérique & Ledger",
      description: "Registre de gestion sécurisé et instantané des remboursements et suivis médicaux.",
      techs: ["Private Blockchain", "HIPAA Compliant", "React Native Client", "Zero-Knowledge Proofs"],
      features: [
        "Sécurisation absolue des dossiers patients sensibles",
        "Remboursements instantanés grâce aux smart contracts",
        "Partage sécurisé des fiches cliniques inter-professionnels",
        "Conformité réglementaire totale de niveau médical"
      ],
      impact: "Délais de traitement passés de 14 jours à moins de 3 secondes.",
      details: "La Caisse Solidarité Maladie réinvente la gestion des prestations santé en alliant la transparence de la Blockchain à la sécurité des données médicales."
    }
  ];

  const current = realisations.find(r => r.id === activeTab) || realisations[0];

  return (
    <div className="space-y-8">
      {/* Tab selection bar */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-neutral-950/80 border border-white/10 rounded-none max-w-lg mx-auto">
        {realisations.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[120px] py-3.5 px-4 text-xs font-black uppercase tracking-[0.2em] rounded-none transition-all ${
                isActive
                  ? "bg-accent text-white shadow-lg shadow-accent/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Main product card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-neutral-900/40 border border-white/10 rounded-none p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm"
        >
          {/* Subtle logo background */}
          <div className="absolute right-10 top-10 text-neutral-800/10 font-black text-7xl sm:text-9xl pointer-events-none select-none uppercase italic">
            {current.title}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-none text-[10px] uppercase tracking-[0.15em] font-black text-accent">
                  {current.badge}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed opacity-90 font-medium">
                {current.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Fonctionnalités incluses</h4>
                <div className="space-y-2.5">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-neutral-400 leading-relaxed">
                      <div className="p-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-none text-emerald-400 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-2 pt-2">
                {current.techs.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-neutral-950 border border-white/10 rounded-none text-[10px] font-mono uppercase tracking-wider text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side impact panel */}
            <div className="lg:col-span-5 bg-neutral-950 border border-white/10 rounded-none p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <Activity size={18} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Performance & Impact</span>
                </div>
                
                <p className="text-lg sm:text-xl font-black text-white leading-snug">
                  "{current.impact}"
                </p>
                
                <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                  {current.details}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-wider font-black">
                <span className="text-neutral-500">Hébergement inclus</span>
                <span className="text-emerald-500 flex items-center gap-1">● Actif</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
