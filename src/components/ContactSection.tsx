/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { 
  Send, 
  CheckCircle2, 
  User, 
  Mail, 
  Briefcase, 
  MessageSquare, 
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "Intelligence Artificielle",
    message: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  const getMailtoUrl = () => {
    const subjectLine = encodeURIComponent(`Prise de contact [SOIBY] - ${form.name} - ${form.subject}`);
    const bodyContent = encodeURIComponent(
      `Bonjour l'équipe SOIBY,\n\nJe vous contacte au sujet de : ${form.subject}\n\nNom: ${form.name}\nEmail: ${form.email}\nEntreprise: ${form.company || "Non spécifié"}\n\nMessage:\n${form.message}\n\nCordialement.`
    );
    return `mailto:contact@soiby.fr?subject=${subjectLine}&body=${bodyContent}`;
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      subject: "Intelligence Artificielle",
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <div className="bg-neutral-900/40 border border-white/10 rounded-none p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
      {/* Subtle background blur sphere */}
      <div className="absolute -left-32 -bottom-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
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
                    className="w-full bg-neutral-950 border border-white/10 rounded-none pl-10 pr-4 py-3.5 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/25 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
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
                    className="w-full bg-neutral-950 border border-white/10 rounded-none pl-10 pr-4 py-3.5 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/25 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
                  Entreprise / Structure (Facultatif)
                </label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-neutral-950 border border-white/10 rounded-none pl-10 pr-4 py-3.5 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/25 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
                  Sujet d'intérêt principal
                </label>
                <div className="relative">
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/10 rounded-none px-4 py-3.5 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/25 transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-neutral-950 text-white" value="Intelligence Artificielle">Intelligence Artificielle</option>
                    <option className="bg-neutral-950 text-white" value="Blockchain & Traçabilité">Blockchain & Traçabilité</option>
                    <option className="bg-neutral-950 text-white" value="Cloud & Hébergement">Cloud & Hébergement</option>
                    <option className="bg-neutral-950 text-white" value="SaaS & Cockpit Décisionnel">SaaS & Cockpit Décisionnel</option>
                    <option className="bg-neutral-950 text-white" value="Autre demande">Autre demande</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400">
                Votre message <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3.5 top-4 text-neutral-500" />
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez votre besoin, les objectifs ou les contraintes de votre projet..."
                  className="w-full bg-neutral-950 border border-white/10 rounded-none pl-10 pr-4 py-3.5 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/25 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">
                * Champs requis. Réponse sous 24h ouvrées.
              </span>
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.15em] py-4 px-8 rounded-none text-xs shadow-lg shadow-accent/15 flex items-center gap-2 group transition-all cursor-pointer"
              >
                Envoyer ma demande
                <Send size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center py-8 space-y-6"
          >
            <div className="flex justify-center">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-none text-emerald-500">
                <CheckCircle2 size={48} className="animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Message prêt à envoyer</h3>
              <p className="text-neutral-300 max-w-md mx-auto text-sm leading-relaxed font-medium">
                Merci {form.name}. Votre demande au sujet de <strong className="text-white">{form.subject}</strong> est prête.
              </p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Aucune donnée n’a encore été transmise. Ouvrez votre messagerie pour envoyer le message prérempli à SOIBY.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-md mx-auto pt-2">
              <a
                href={getMailtoUrl()}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.15em] py-4 px-6 rounded-none text-xs transition-all shadow-lg shadow-accent/20 cursor-pointer"
              >
                Ouvrir ma messagerie
                <Send size={13} />
              </a>
              <button
                onClick={resetForm}
                className="flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 border border-white/10 text-neutral-400 hover:text-white font-black uppercase tracking-[0.15em] py-4 px-6 rounded-none text-xs transition-all cursor-pointer"
              >
                Nouveau message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
