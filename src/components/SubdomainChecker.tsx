/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { 
  Globe, 
  Check, 
  X, 
  Loader2, 
  Cpu, 
  ShieldCheck, 
  Server, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function SubdomainChecker() {
  const [subdomain, setSubdomain] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "deploying" | "success">("idle");
  const [deployStep, setDeployStep] = useState(0);

  const steps = [
    { title: "Génération de l'instance Cloud", desc: "Création d'un container dédié sécurisé" },
    { title: "Configuration DNS & SSL", desc: "Attribution de l'adresse https et certificats" },
    { title: "Handshake Ledger Blockchain", desc: "Déploiement des smart-contracts d'audit" },
    { title: "Initialisation de l'IA", desc: "Mise au point des modèles de prédiction" }
  ];

  const cleanSubdomain = (val: string) => {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 32);
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (!subdomain) return;

    setStatus("checking");
    
    // Simulate domain checking
    setTimeout(() => {
      // Deterministic based on name
      const forbidden = ["admin", "root", "soiby", "test", "google", "api", "finance"];
      const isTaken = forbidden.includes(subdomain) || subdomain.length < 3;
      
      if (isTaken) {
        setStatus("taken");
      } else {
        setStatus("available");
      }
    }, 1200);
  };

  const triggerDeploy = () => {
    setStatus("deploying");
    setDeployStep(0);

    // Simulate step by step deployment
    const interval = setInterval(() => {
      setDeployStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setStatus("success");
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleReset = () => {
    setSubdomain("");
    setStatus("idle");
    setDeployStep(0);
  };

  return (
    <div className="bg-neutral-900/60 border border-white/10 rounded-none p-6 sm:p-8 relative overflow-hidden backdrop-blur-sm">
      {/* Absolute Glow */}
      <div className="absolute -right-32 -bottom-32 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">
            Infrastructure Instantanée
          </span>
          <h3 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">
            Réservez votre Subdomain <code className="text-accent">.soiby.fr</code>
          </h3>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl leading-relaxed opacity-80 font-medium">
            Toutes nos solutions intègrent l'hébergement haut de gamme managé automatiquement. Saisissez le nom de votre projet ou entreprise pour simuler son déploiement.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" || status === "checking" || status === "taken" || status === "available" ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 flex items-center gap-1.5 font-bold text-sm">
                    <Globe size={16} />
                    <span>https://</span>
                  </div>
                  <input
                    type="text"
                    required
                    disabled={status === "checking"}
                    value={subdomain}
                    onChange={(e) => setSubdomain(cleanSubdomain(e.target.value))}
                    placeholder="votre-projet"
                    className="w-full bg-neutral-950 border border-white/10 rounded-none pl-24 pr-24 py-4 text-white font-bold text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all disabled:opacity-50"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 font-black text-sm pointer-events-none uppercase tracking-wider">
                    .soiby.fr
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === "checking" || !subdomain}
                  className="bg-white hover:bg-neutral-100 text-black disabled:bg-neutral-800 disabled:text-neutral-500 font-black uppercase tracking-[0.2em] px-6 py-4 rounded-none text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === "checking" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      Vérifier
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {status === "taken" && (
                <div className="flex items-center gap-2 text-sm text-accent bg-accent/5 border border-accent/20 rounded-none p-3.5">
                  <X size={16} />
                  <span className="font-medium">Ce nom est réservé ou trop court. Veuillez en essayer un autre.</span>
                </div>
              )}

              {status === "available" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3 bg-emerald-950/20 border border-emerald-900/30 rounded-none p-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <Check size={18} />
                      <span className="font-medium">Excellent ! <strong>{subdomain}.soiby.fr</strong> est disponible.</span>
                    </div>
                    <button
                      onClick={triggerDeploy}
                      className="bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-none text-[10px] shadow-lg shadow-accent/10 transition-all cursor-pointer"
                    >
                      Simuler le déploiement
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : status === "deploying" ? (
            <motion.div
              key="deploy-view"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-neutral-950 border border-white/10 rounded-none p-5 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-400 pb-3 border-b border-white/5">
                  <span>DEPLOYMENT ENGINE v2.4</span>
                  <span className="text-accent font-black animate-pulse">● LOGS LIVE</span>
                </div>
                
                <div className="space-y-3">
                  {steps.map((step, idx) => {
                    const isPending = deployStep < idx;
                    const isActive = deployStep === idx;
                    const isDone = deployStep > idx;

                    return (
                      <div 
                        key={idx} 
                        className={`flex gap-3 items-start transition-opacity duration-300 ${isPending ? "opacity-30" : "opacity-100"}`}
                      >
                        {isDone ? (
                          <div className="text-emerald-500 mt-0.5">
                            <Check size={14} />
                          </div>
                        ) : isActive ? (
                          <Loader2 size={14} className="text-accent animate-spin mt-0.5" />
                        ) : (
                          <div className="w-3.5 h-3.5 border border-white/10 rounded-none mt-0.5" />
                        )}
                        <div>
                          <p className={`font-bold ${isActive ? "text-white" : isDone ? "text-neutral-400" : "text-neutral-600"}`}>
                            {step.title}
                          </p>
                          {isActive && (
                            <p className="text-[10px] text-accent mt-0.5 font-sans">
                              {step.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 text-center space-y-4"
            >
              <div className="mx-auto w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                <Sparkles size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">Déploiement Terminé !</h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Votre plateforme est initialisée à l'adresse <strong className="text-white font-semibold">{subdomain}.soiby.fr</strong>. Notre architecture hybride Cloud/Blockchain est prête à accueillir votre production.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold px-4 py-2.5 rounded-lg text-xs transition-all"
                >
                  Essayer un autre nom
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
