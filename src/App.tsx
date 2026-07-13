/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Calendar, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Layers, 
  Linkedin, 
  Github, 
  Youtube, 
  Twitter, 
  Globe, 
  Zap,
  Cpu,
  Mail,
  Lock,
  ChevronRight,
  ShieldAlert,
  Terminal,
  Activity
} from "lucide-react";
import CanvasBackground from "./components/CanvasBackground";
import { motion } from "motion/react";
import RdvModal from "./components/RdvModal";
import SubdomainChecker from "./components/SubdomainChecker";
import ExpertiseSection from "./components/ExpertiseSection";
import RealisationSection from "./components/RealisationSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  const [isRdvOpen, setIsRdvOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-accent/30 selection:text-white">
      {/* 1. Canvas Connection Background */}
      <CanvasBackground />

      {/* 2. Sticky Premium Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo in bold, italic, uppercase style */}
          <a 
            href="#accueil" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("accueil");
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-5 h-5 border-2 border-accent rounded flex items-center justify-center font-black text-accent text-[10px] transition-transform group-hover:rotate-12 duration-300">
              ◻
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic text-white group-hover:text-accent transition-colors">
              SOIBY
            </span>
          </a>

          {/* Desktop Navigation Links - Bold Typography wide tracking */}
          <nav className="hidden md:flex items-center gap-10">
            <a 
              href="#expertises" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("expertises");
              }}
              className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 hover:text-white hover:underline decoration-accent underline-offset-8 decoration-2 transition-all"
            >
              Expertises
            </a>
            <a 
              href="#realisations" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("realisations");
              }}
              className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 hover:text-white hover:underline decoration-accent underline-offset-8 decoration-2 transition-all"
            >
              Réalisations
            </a>
            <a 
              href="#subdomain" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("subdomain");
              }}
              className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 hover:text-white hover:underline decoration-accent underline-offset-8 decoration-2 transition-all"
            >
              Hébergement
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 hover:text-white hover:underline decoration-accent underline-offset-8 decoration-2 transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Booking Button - Bold Typography style */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsRdvOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-none font-black text-xs uppercase tracking-[0.2em] transition-all border border-accent shadow-lg shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar size={13} />
              Prendre RDV
            </button>
            <div className="w-8 h-px bg-white/20 hidden lg:block"></div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section id="accueil" className="relative pt-32 min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero text (Left side) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-left relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-none bg-white/[0.03] text-[10px] uppercase tracking-[0.25em] font-black text-neutral-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              🇫🇷 IA • Blockchain • FinTech • Santé • SaaS
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.85] text-white">
              Nous imaginons les <span className="text-accent italic font-serif lowercase">plateformes intelligentes</span> qui façonnent demain.
            </h1>

            <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl opacity-80">
              SOIBY développe des technologies de nouvelle génération intégrant Intelligence Artificielle, Blockchain, Cloud et automatisation pour transformer la finance, la santé et la gestion d'entreprise.
            </p>

            {/* Slogan styled elegantly with serif italics */}
            <p className="text-2xl sm:text-3xl md:text-4xl italic font-serif text-accent tracking-tight py-2 font-medium">
              « Respirez, on s'occupe de tout ! »
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => scrollToSection("expertises")}
                className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-none transition-all border border-accent shadow-lg shadow-accent/15 hover:-translate-y-0.5"
              >
                Découvrir SOIBY
                <ArrowRight size={14} />
              </button>
              <button 
                onClick={() => scrollToSection("realisations")}
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-white font-black uppercase tracking-[0.2em] text-xs py-4 px-8 rounded-none transition-all hover:-translate-y-0.5"
              >
                Nos plateformes
              </button>
            </div>
          </motion.div>

          {/* Hero Visual Node Globe (Right side) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 flex items-center justify-center relative z-10"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full flex items-center justify-center bg-gradient-to-tr from-accent/5 via-neutral-900/40 to-transparent border border-white/[0.05] shadow-2xl shadow-accent/5 animate-pulse duration-5000">
              
              {/* Outer orbit circle */}
              <div className="absolute inset-8 rounded-full border border-white/[0.04] animate-spin duration-40000" />
              <div className="absolute inset-16 rounded-full border border-dashed border-accent/10 animate-spin duration-30000" />
              <div className="absolute inset-32 rounded-full border border-white/[0.03]" />

              {/* Central Glowing Shield */}
              <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-neutral-900 to-black border border-white/10 flex flex-col items-center justify-center shadow-2xl shadow-accent/10 hover:scale-105 transition-transform cursor-pointer">
                <span className="font-black text-3xl sm:text-4xl text-white tracking-widest uppercase italic drop-shadow-[0_0_15px_rgba(255,59,48,0.3)]">
                  SOIBY
                </span>
                <span className="text-[9px] font-black tracking-widest text-accent uppercase mt-1">
                  INTELLIGENT NET
                </span>
              </div>

              {/* Pulsing visual nodes */}
              <div className="absolute top-[20%] left-[18%] flex flex-col items-center">
                <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_12px_#FF3B30] animate-ping duration-1500" />
                <span className="text-[9px] font-mono text-neutral-400 bg-black/90 px-2 py-0.5 rounded-none border border-neutral-800 mt-1">IA</span>
              </div>
              
              <div className="absolute top-[18%] right-[22%] flex flex-col items-center">
                <div className="w-3 h-3 bg-accent/80 rounded-full shadow-[0_0_12px_#FF3B30] animate-pulse duration-2000" />
                <span className="text-[9px] font-mono text-neutral-400 bg-black/90 px-2 py-0.5 rounded-none border border-neutral-800 mt-1">CSM</span>
              </div>

              <div className="absolute bottom-[24%] right-[18%] flex flex-col items-center">
                <div className="w-3 h-3 bg-accent rounded-full shadow-[0_0_12px_#FF3B30] animate-pulse duration-1000" />
                <span className="text-[9px] font-mono text-neutral-400 bg-black/90 px-2 py-0.5 rounded-none border border-neutral-800 mt-1">SaaS</span>
              </div>

              <div className="absolute bottom-[22%] left-[22%] flex flex-col items-center">
                <div className="w-3 h-3 bg-accent/70 rounded-full shadow-[0_0_12px_#FF3B30] animate-ping duration-3000" />
                <span className="text-[9px] font-mono text-neutral-400 bg-black/90 px-2 py-0.5 rounded-none border border-neutral-800 mt-1">Ledger</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Section: Nos Expertises */}
      <section id="expertises" className="py-24 px-4 sm:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.25em]">
              01 / NOTRE CHAMP D'ACTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] text-white mt-2">
              Bâtir des technologies <span className="text-accent italic font-serif lowercase">robustes & sécurisées</span>.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed opacity-80">
              Nous couplons l'intelligence artificielle générative et l'immuabilité de la blockchain pour créer des architectures Cloud d'une fiabilité absolue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <ExpertiseSection />
          </motion.div>
        </div>
      </section>

      {/* 5. Section: Nos Réalisations */}
      <section id="realisations" className="py-24 px-4 sm:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left max-w-3xl space-y-3"
          >
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.25em]">
              02 / PLATEFORMES OPÉRATIONNELLES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
              Nos Réalisations
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed opacity-80">
              Découvrez les briques applicatives prêtes à être déployées et personnalisées selon vos exigences stratégiques.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <RealisationSection />
          </motion.div>
        </div>
      </section>

      {/* 6. Section: Subdomain check simulator */}
      <section id="subdomain" className="py-24 px-4 sm:px-8 border-t border-white/10 bg-neutral-950/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SubdomainChecker />
          </motion.div>
        </div>
      </section>

      {/* 7. Section: Contact */}
      <section id="contact" className="py-24 px-4 sm:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-black text-accent uppercase tracking-[0.25em]">
              03 / LANCEZ VOTRE PROJET
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] text-white mt-2">
              Discutons de vos besoins
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-2xl leading-relaxed opacity-80">
              Que vous ayez un cahier des charges précis ou une idée en cours de structuration, notre équipe d'ingénieurs est à votre écoute pour concevoir votre prototype.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <ContactSection />
          </motion.div>
        </div>
      </section>

      {/* 8. Call to Action Pre-Footer */}
      <section className="relative py-24 px-4 sm:px-8 text-center bg-gradient-to-tr from-accent/[0.03] via-neutral-950 to-transparent border-t border-b border-white/10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[-0.03em] leading-tight text-white">
            Construisons ensemble les plateformes qui façonneront votre avenir.
          </h2>
          <button 
            onClick={() => setIsRdvOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-black uppercase tracking-[0.2em] text-xs rounded-none shadow-xl shadow-accent/25 transition-all hover:-translate-y-0.5"
          >
            <Calendar size={14} />
            Prendre rendez-vous
          </button>
        </motion.div>
      </section>

      {/* 9. Premium Footer */}
      <footer className="bg-[#050505] border-t border-white/10 relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1: About & Domain badge (Lg span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <a 
              href="#accueil" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("accueil");
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-5 h-5 border-2 border-accent rounded flex items-center justify-center font-black text-accent text-[10px]">
                ◻
              </div>
              <span className="font-black text-lg tracking-tighter uppercase italic text-white">
                SOIBY
              </span>
            </a>

            <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">
              Respirez, on s'occupe de tout !
            </p>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Créateur de plateformes intelligentes intégrant Intelligence Artificielle, Blockchain et Cloud pour accompagner les entreprises dans leur transformation numérique.
            </p>

            {/* Hosting Domain Highlight */}
            <div className="p-4 rounded-none bg-accent/[0.04] border border-accent/15 space-y-1.5 max-w-xs">
              <p className="text-[11px] font-bold text-white">Gestion Domaine & Hébergement</p>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Vos solutions de pointe sont hébergées automatiquement sous <code className="text-accent bg-neutral-900 px-1 py-0.5 rounded-none text-[10px] font-mono">votrenom.soiby.fr</code>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-white/[0.03] border border-white/10 hover:border-accent hover:text-accent rounded-none transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-white/[0.03] border border-white/10 hover:border-accent hover:text-accent rounded-none transition-all" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-white/[0.03] border border-white/10 hover:border-accent hover:text-accent rounded-none transition-all" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-white/[0.03] border border-white/10 hover:border-accent hover:text-accent rounded-none transition-all" aria-label="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Solutions (Lg span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a 
                  href="#realisations" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("realisations"); }}
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={10} className="text-accent" /> WinEdge
                </a>
              </li>
              <li>
                <a 
                  href="#realisations" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("realisations"); }}
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={10} className="text-accent" /> Pilote360
                </a>
              </li>
              <li>
                <a 
                  href="#realisations" 
                  onClick={(e) => { e.preventDefault(); scrollToSection("realisations"); }}
                  className="hover:text-accent transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={10} className="text-accent" /> CSM
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Entreprise (Lg span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Entreprise</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><a href="#expertises" onClick={(e) => { e.preventDefault(); scrollToSection("expertises"); }} className="hover:text-accent transition-colors">Notre expertise</a></li>
              <li><a href="#realisations" onClick={(e) => { e.preventDefault(); scrollToSection("realisations"); }} className="hover:text-accent transition-colors">Nos solutions</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-accent transition-colors">Actu & Blog</a></li>
              <li><span className="opacity-40 cursor-not-allowed">Carrières (Bientôt)</span></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-accent transition-colors">Nous contacter</a></li>
            </ul>
          </div>

          {/* Col 4: Ressources (Lg span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Ressources</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li><span className="flex items-center gap-1"><HelpCircle size={12} className="text-neutral-500" /> Centre d'aide</span></li>
              <li><span className="flex items-center gap-1"><HelpCircle size={12} className="text-neutral-500" /> FAQ</span></li>
              <li><span className="flex items-center gap-1"><FileText size={12} className="text-neutral-500" /> Documentation</span></li>
              <li>
                <button 
                  onClick={() => setIsRdvOpen(true)}
                  className="text-accent font-black hover:underline uppercase text-[10px] tracking-[0.1em]"
                >
                  Prendre rdv 📅
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info & Legal (Lg span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Contact & Légal</h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <p>📍 France</p>
              <p className="flex items-center gap-1">
                <Mail size={12} className="text-accent" />
                <a href="mailto:contact@soiby.fr" className="hover:text-accent font-bold transition-all">
                  contact@soiby.fr
                </a>
              </p>
              
              <div className="pt-2 border-t border-white/10 space-y-1 text-[10px] opacity-75">
                <p><span className="cursor-pointer hover:text-accent transition-colors">Mentions légales</span></p>
                <p><span className="cursor-pointer hover:text-accent transition-colors">Politique de confidentialité</span></p>
                <p><span className="cursor-pointer hover:text-accent transition-colors">Politique de cookies</span></p>
                <p><span className="cursor-pointer hover:text-accent transition-colors">CGU / CGV</span></p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 gap-4">
          <div className="uppercase tracking-[0.1em]">
            <p>© 2026 SOIBY • Plateformes Intelligentes pour l'Entreprise Moderne. Tous droits réservés.</p>
          </div>
          <div className="text-right sm:text-right text-accent font-black uppercase tracking-[0.15em] flex items-center gap-1">
            <Zap size={11} className="animate-bounce" />
            Conçu par SOIBY
          </div>
        </div>
      </footer>

      {/* 10. Interactive Scheduler Appointment Modal */}
      <RdvModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
    </div>
  );
}
