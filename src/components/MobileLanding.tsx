import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, BarChart3, Bitcoin, CalendarDays, Car, Check, ChevronDown, ChevronLeft, ChevronRight,
  Cloud, Facebook, HeartPulse, Info, Instagram, Laptop, Linkedin, Menu, Monitor, Plus, Search, Store, X, Youtube,
} from "lucide-react";
import { faq } from "../faq";
import AutoVideo from "./AutoVideo";
import SiteFooter from "./SiteFooter";

const produits = [
  { id: "winedge", nom: "WinEdge", texte: "L’épargne indolore en Bitcoin.", image: "/realisations/winedge.png", url: "winedge.io", Icon: Bitcoin, fond: "linear-gradient(160deg,#ffa31a 0%,#f57c0a 55%,#e35d05 100%)", pastille: "#f7931a" },
  { id: "pilote360", nom: "Pilote360", texte: "Gestion de trésorerie assistée par IA.", image: "/realisations/pilote360.png", url: "pilote360.io", Icon: BarChart3, fond: "linear-gradient(160deg,#2f7bff 0%,#145df0 55%,#0a3fcf 100%)", pastille: "#1e66f5" },
  { id: "caisse-solidarite", nom: "Caisse Solidarité", texte: "Un carnet de santé numérique.", image: "/realisations/caisse-solidarite.png", url: "caissesolidaritemaladie.com", Icon: HeartPulse, fond: "linear-gradient(160deg,#22c55e 0%,#13a344 55%,#08782f 100%)", pastille: "#16a34a" },
  { id: "coontrool", nom: "Coontrool", texte: "Contrôle de caisse à distance.", image: "/realisations/coontrool.png", url: "coontrool.com", Icon: Store, fond: "linear-gradient(160deg,#b84ef0 0%,#9a1fd6 55%,#6b0fa3 100%)", pastille: "#a21caf" },
  { id: "smscovoit", nom: "SMSCovoit", texte: "Le covoiturage simple et fiable.", image: "/realisations/smscovoit.png", url: "smscovoit.com", Icon: Car, fond: "linear-gradient(160deg,#18c3d2 0%,#06a3b4 55%,#047688 100%)", pastille: "#0891b2" },
];

const CARDS_PER_PAGE = 2;


function CreateSiteIcon({ size }: { size: number }) {
  return <Monitor size={size} strokeWidth={1.8} aria-hidden="true" />;
}

// Réservation et recherche de noms de domaine : gérées sur SOIBY Cloud

export default function MobileLanding({ onOpenRdv, onOpenSite, onOpenWork, onOpenDomain }: { onOpenRdv: () => void; onOpenSite: () => void; onOpenWork: (id: string) => void; onOpenDomain: (query: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(produits.length / CARDS_PER_PAGE);
  const pageRef = useRef(0);
  const [autoplay, setAutoplay] = useState(true);

  // Position de défilement de la page p : alignée sur sa première carte (bornée à la fin du rail).
  const pageLeft = (track: HTMLDivElement, p: number) => {
    const cards = track.children as HTMLCollectionOf<HTMLElement>;
    const card = cards[Math.min(p * CARDS_PER_PAGE, cards.length - 1)];
    return Math.min(card.offsetLeft - cards[0].offsetLeft, track.scrollWidth - track.clientWidth);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      let nearest = 0;
      for (let p = 1; p < pageCount; p++) {
        if (Math.abs(track.scrollLeft - pageLeft(track, p)) < Math.abs(track.scrollLeft - pageLeft(track, nearest))) nearest = p;
      }
      pageRef.current = nearest;
      setPage(nearest);
    };
    const stopAutoplay = () => setAutoplay(false);
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", stopAutoplay, { passive: true });
    track.addEventListener("touchstart", stopAutoplay, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", stopAutoplay);
      track.removeEventListener("touchstart", stopAutoplay);
    };
  }, [pageCount]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = ((target % pageCount) + pageCount) % pageCount; // boucle aux extrémités
    pageRef.current = next;
    setPage(next);
    track.scrollTo({ left: pageLeft(track, next), behavior: "smooth" });
  };

  // Défilement automatique, coupé dès que l'utilisateur interagit (ou si animations réduites).
  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => goTo(pageRef.current + 1), 4500);
    return () => window.clearInterval(timer);
  }, [autoplay]);

  const userGoTo = (target: number) => {
    setAutoplay(false);
    goTo(target);
  };

  return (
    <div className="m-page">
      <header className="m-header">
        <div className="m-header-inner">
          <a href="/" className="m-logo"><img src="/logoversion.png" alt="SOIBY — Respirez on s’occupe de tout !" /></a>
          <button type="button" className="m-header-cta" onClick={onOpenSite}><CreateSiteIcon size={19} />Créer mon site</button>
          <button type="button" className="m-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X size={30} strokeWidth={2.6} /> : <Menu size={32} strokeWidth={2.8} />}</button>
        </div>
        {menuOpen && <nav className="m-nav" onClick={() => setMenuOpen(false)}>
          <a href="/">Accueil</a><a href="/equipe">L’équipe</a><a href="/realisations">Nos réalisations</a>
          <a href="/cloud">Nom de domaine & hébergement</a><a href="/faq">FAQ</a><a href="/contact">Contact</a>
          <button type="button" onClick={onOpenRdv}>Prendre rendez-vous</button>
        </nav>}
      </header>

      <main>
        {/* Écran 1 — Hero */}
        <section id="accueil" className="m-hero m-screen">
          <h1>Nous créons nos<br /> propres plateformes.<em>Nous construisons<br /> la vôtre.</em></h1>
          <p className="m-hero-sub">Un site professionnel, rapide et<br /> référencé, livré <strong>dès 189&nbsp;€&nbsp;HT.</strong></p>
          <ul className="m-hero-checks">
            {["Design moderne et responsive", "Optimisé pour Google (SEO)", "Livré en 3 à 7 jours ouvrés"].map(t => <li key={t}><span><Check size={17} strokeWidth={4} /></span>{t}</li>)}
          </ul>
          <div className="m-video">
            <AutoVideo src="/mobile.mp4" poster="/hero-mobile-v2.png" />
          </div>
          <button type="button" className="m-cta-main" onClick={onOpenSite}><Laptop size={46} strokeWidth={1.6} aria-hidden="true" /><span>Créer mon site<br />dès 189&nbsp;€&nbsp;HT <ArrowRight size={26} strokeWidth={2.2} /></span></button>
          <button type="button" className="m-cta-rdv" onClick={onOpenRdv}><CalendarDays size={40} strokeWidth={1.6} aria-hidden="true" /><span><strong>Prendre rendez-vous</strong><small>Projet sur mesure <ArrowRight size={20} strokeWidth={2} /></small></span></button>
          <p className="m-hero-note"><Info size={16} strokeWidth={2} aria-hidden="true" /> Création du site uniquement,<br />hors nom de domaine et hébergement. Prix HT.</p>
          <a href="/equipe" className="m-scroll" aria-label="Découvrir la suite"><ChevronDown size={30} strokeWidth={3} /></a>
        </section>

        {/* Écran 2 — Équipe, réalisations, cloud */}
        <div className="m-screen m-screen-2">
        <section id="equipe" className="m-team">
          <div className="m-team-visual">
            <img src="/equipe-studio.png" alt="" aria-hidden="true" />
            <div className="m-team-copy">
              <span className="m-pill">Notre équipe</span>
              <h2>15 développeurs<br />à votre service</h2>
              <p>Une équipe pluridisciplinaire, expérimentée et disponible pour concevoir, développer et faire évoluer vos projets web et mobiles.</p>
            </div>
          </div>
          <ul className="m-team-card">
            <li><Check size={19} strokeWidth={3.4} />Une équipe de 15 développeurs (web, mobile, IA, cloud…)</li>
            <li><Check size={19} strokeWidth={3.4} />Disponible et réactive tout au long du projet</li>
            <li><Check size={19} strokeWidth={3.4} />Un accompagnement personnalisé, de l’idée à la mise en ligne</li>
          </ul>
        </section>

        {/* Réalisations */}
        <section id="realisations" className="m-works">
          <p className="m-kicker">Nos réalisations</p>
          <h2 className="m-title">Des plateformes concrètes,<br />utilisées et en production</h2>
          <div className="m-carousel">
            <div className="m-track" ref={trackRef}>
              {produits.map(({ id, nom, texte, image, Icon, fond, pastille }) => (
                <button key={nom} type="button" className="m-card" onClick={() => onOpenWork(id)} style={{ background: fond }} aria-label={`Voir les pages du site ${nom}`}>
                  <span className="m-card-head"><i style={{ background: pastille }}><Icon size={14} strokeWidth={3} /></i>{nom}</span>
                  <span className="m-card-text">{texte}</span>
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <button type="button" className="m-arrow m-arrow-left" onClick={() => userGoTo(page - 1)} aria-label="Réalisations précédentes"><ChevronLeft size={20} strokeWidth={3} /></button>
            <button type="button" className="m-arrow m-arrow-right" onClick={() => userGoTo(page + 1)} aria-label="Réalisations suivantes"><ChevronRight size={20} strokeWidth={3} /></button>
          </div>
          <div className="m-dots">{Array.from({ length: pageCount }, (_, i) => <button key={i} type="button" className={i === page ? "active" : ""} aria-current={i === page} onClick={() => userGoTo(i)} aria-label={`Page ${i + 1}`} />)}</div>
        </section>

        {/* SOIBY Cloud */}
        <section id="cloud" className="m-cloud">
          <div className="m-cloud-head">
            <Cloud size={66} strokeWidth={1.7} aria-hidden="true" />
            <div><h2>SOIBY, c’est aussi</h2><p>la réservation de nom de domaine<br />et l’hébergement de vos projets.</p></div>
          </div>
          <form className="m-domain" role="search" onSubmit={(e) => { e.preventDefault(); onOpenDomain(String(new FormData(e.currentTarget).get("domain") ?? "")); }}>
            <input name="domain" placeholder="Rechercher un nom de domaine" aria-label="Rechercher un nom de domaine" autoComplete="off" autoCapitalize="none" spellCheck={false} />
            <button type="submit" aria-label="Rechercher"><Search strokeWidth={2.8} aria-hidden="true" /></button>
          </form>
          <ul className="m-cloud-list">
            {["Nom de domaine", "Hébergement web & apps", "Emails professionnels", "Certificat SSL (sécurité)"].map(t => <li key={t}><Check size={19} strokeWidth={3.4} />{t}</li>)}
          </ul>
        </section>

        {/* Écran 3 — FAQ */}
        </div>

        {/* Écran 3 — FAQ et footer */}
        <div className="m-screen m-screen-3">
        <section id="faq" className="m-faq">
          <h2 className="m-kicker m-faq-title">FAQ – Questions fréquentes</h2>
          <ul>
            {faq.map(([q, a], i) => {
              const open = openFaq === i;
              return (
                <li key={q} className={open ? "open" : ""}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open}>
                    <Plus size={22} strokeWidth={3} aria-hidden="true" /><span>{i + 1}.&nbsp;{q}</span>
                  </button>
                  {open && <p>{a}</p>}
                </li>
              );
            })}
          </ul>
          <button type="button" className="m-cta-faq" onClick={onOpenSite}><Laptop size={34} strokeWidth={1.7} aria-hidden="true" />Créer mon site dès 189&nbsp;€&nbsp;HT<ArrowRight size={24} strokeWidth={2.2} /></button>
        </section>


        <SiteFooter onOpenRdv={onOpenRdv} onOpenSite={onOpenSite} />
      </div>
      </main>
    </div>
  );
}
