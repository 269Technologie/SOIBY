/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Cpu, 
  Database, 
  CloudRain, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Zap,
  Layers,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Expertise } from "../types";

export default function ExpertiseSection() {
  const [selectedId, setSelectedId] = useState<string>("ia");

  const expertises: Expertise[] = [
    {
      id: "ia",
      title: "Intelligence Artificielle",
      shortDescription: "Modèles d'apprentissage et traitement automatisé de l'information.",
      fullDescription: "Nous créons des agents intelligents, des pipelines d'extraction LLM et des modèles prédictifs adaptés aux contraintes métiers de la finance et de la santé. Nos solutions intègrent des capacités d'analyse automatisée de documents, de classification et de prédiction en temps réel.",
      bullets: [
        "LLMs privés & sécurisés (RGPD-compliant)",
        "Analyse de sentiments & prévisions financières",
        "Agents autonomes de support & gestion",
        "Traitement automatisé de dossiers médicaux"
      ],
      color: "from-accent/20 to-orange-500/10"
    },
    {
      id: "blockchain",
      title: "Blockchain & Registre Distribué",
      shortDescription: "Systèmes décentralisés d'audit, de traçabilité et de notarisation.",
      fullDescription: "Grâce à des registres immuables, nous assurons l'authenticité de vos flux transactionnels et d'informations. Idéal pour la traçabilité des dossiers de santé, la notarisation légale instantanée et l'audit continu sans tiers de confiance.",
      bullets: [
        "Notarisation infalsifiable de données",
        "Smart contracts auto-exécutants audités",
        "Interopérabilité multi-ledgers sécurisée",
        "Traçabilité rigoureuse des dossiers médicaux"
      ],
      color: "from-accent/20 to-sky-500/10"
    },
    {
      id: "cloud",
      title: "Cloud Hybride & Automatisation",
      shortDescription: "Infrastructures hautement disponibles, auto-scalantes et résilientes.",
      fullDescription: "Nous concevons des architectures Cloud Serverless ultra-performantes et auto-gérées qui garantissent un temps de disponibilité optimal. Intégrées avec des routines CI/CD strictes, vos plateformes évoluent sans aucune friction technique.",
      bullets: [
        "Hébergement auto-géré de haute sécurité",
        "Serverless micro-services scalabilité infinie",
        "Monitoring prédictif avec alertes IA",
        "Déploiements atomiques sans interruption (Zero-Downtime)"
      ],
      color: "from-accent/20 to-teal-500/10"
    }
  ];

  const current = expertises.find(item => item.id === selectedId) || expertises[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Selector */}
      <div className="lg:col-span-5 space-y-3">
        {expertises.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-left p-6 rounded-none border transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? "bg-neutral-900 border-accent/30 shadow-lg shadow-accent/5 text-white" 
                  : "bg-neutral-900/40 border-white/10 hover:border-white/20 text-neutral-400 hover:text-white"
              }`}
            >
              {/* Highlight bar */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${
                  isActive ? "bg-accent" : "bg-transparent group-hover:bg-neutral-700"
                }`} 
              />
              
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
                  {item.id === "ia" && "TECH 01"}
                  {item.id === "blockchain" && "TECH 02"}
                  {item.id === "cloud" && "TECH 03"}
                </span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
              </div>

              <h4 className="text-xl font-black mt-2 uppercase tracking-tight">{item.title}</h4>
              <p className="text-sm opacity-70 mt-1 leading-relaxed">{item.shortDescription}</p>
            </button>
          );
        })}
      </div>

      {/* Main Details Panel */}
      <div className="lg:col-span-7 bg-neutral-900/40 border border-white/10 rounded-none p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[420px] backdrop-blur-sm">
        {/* Glow backdrop based on selection */}
        <div className={`absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br ${current.color} blur-3xl pointer-events-none transition-all duration-500`} />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 border border-accent/20 rounded-none text-accent">
                {current.id === "ia" && <Cpu size={24} />}
                {current.id === "blockchain" && <Database size={24} />}
                {current.id === "cloud" && <Layers size={24} />}
              </div>
              <div>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">SOIBY TECHNOLOGY</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{current.title}</h3>
              </div>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed opacity-90 font-medium">
              {current.fullDescription}
            </p>

            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Capacités clés</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-accent font-extrabold text-xs mt-1">◼</span>
                    <span className="font-medium">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-neutral-500 flex-wrap gap-2 uppercase tracking-[0.1em] font-black">
          <div className="flex items-center gap-1.5">
            <Zap size={12} className="text-accent" />
            <span>Déployé de bout en bout</span>
          </div>
          <div>
            <span>SLA garanti 99.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
