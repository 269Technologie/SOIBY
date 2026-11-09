import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight, BarChart3, Bitcoin, CalendarDays, Car, Check, ChevronDown, ChevronLeft, ChevronRight,
  Cloud, Facebook, HeartPulse, Info, Instagram, Laptop, Linkedin, Menu, Monitor, Plus, Search, Store, X, Youtube,
} from "lucide-react";

const produits = [
  { nom: "WinEdge", texte: "L’épargne indolore en Bitcoin.", image: "/realisations/winedge.png", url: "winedge.io", Icon: Bitcoin, fond: "linear-gradient(160deg,#ffa31a 0%,#f57c0a 55%,#e35d05 100%)", pastille: "#f7931a" },
  { nom: "Pilote360", texte: "Gestion de trésorerie assistée par IA.", image: "/realisations/pilote360.png", url: "pilote360.io", Icon: BarChart3, fond: "linear-gradient(160deg,#2f7bff 0%,#145df0 55%,#0a3fcf 100%)", pastille: "#1e66f5" },
  { nom: "Caisse Solidarité", texte: "Un carnet de santé numérique.", image: "/realisations/caisse-solidarite.png", url: "caissesolidaritemaladie.com", Icon: HeartPulse, fond: "linear-gradient(160deg,#22c55e 0%,#13a344 55%,#08782f 100%)", pastille: "#16a34a" },
  { nom: "Coontrool", texte: "Contrôle de caisse à distance.", image: "/realisations/coontrool.png", url: "coontrool.com", Icon: Store, fond: "linear-gradient(160deg,#b84ef0 0%,#9a1fd6 55%,#6b0fa3 100%)", pastille: "#a21caf" },
  { nom: "SMSCovoit", texte: "Le covoiturage simple et fiable.", image: "/realisations/smscovoit.png", url: "smscovoit.com", Icon: Car, fond: "linear-gradient(160deg,#18c3d2 0%,#06a3b4 55%,#047688 100%)", pastille: "#0891b2" },
];

const CARDS_PER_PAGE = 2;

const faq = [
  ["Combien coûte la création d’un site web chez SOIBY ?", "La création d’un site professionnel démarre à 189 € HT. Le prix final dépend du nombre de pages et des fonctionnalités souhaitées ; nous vous remettons un devis clair avant tout démarrage."],
  ["Que comprend l’offre à 189 € HT ?", "La conception et le développement d’un site moderne et responsive, optimisé pour Google, livré prêt à être mis en ligne. Le nom de domaine et l’hébergement sont proposés à part."],
  ["Quels types de sites pouvez-vous créer ?", "Sites vitrines, e-commerce, sites de réservation, blogs, landing pages… et, au-delà, des applications web et mobiles ou des plateformes SaaS sur mesure."],
  ["Quel est le délai de livraison ?", "Un site est livré en 3 à 7 jours ouvrés après réception de vos contenus. Les projets sur mesure font l’objet d’un planning dédié."],
  ["Le site sera-t-il adapté aux mobiles ?", "Oui. Tous nos sites sont responsive : ils s’adaptent automatiquement aux smartphones, tablettes et ordinateurs."],
  ["Le référencement Google (SEO) est-il inclus ?", "Oui, l’optimisation SEO de base est incluse : structure des pages, balises, performances et compatibilité mobile."],
  ["Puis-je modifier mon site après sa livraison ?", "Oui. Nous pouvons faire évoluer votre site à tout moment, et vous pouvez nous confier sa maintenance."],
  ["Le nom de domaine est-il inclus dans le prix ?", "Non, le prix concerne uniquement la création du site. SOIBY peut réserver votre nom de domaine pour vous."],
  ["Où sera hébergé mon site ?", "Nous proposons un hébergement performant et sécurisé via SOIBY Cloud, avec certificat SSL et sauvegardes."],
  ["Proposez-vous des emails professionnels ?", "Oui, nous créons des adresses email à votre nom de domaine (ex. contact@votre-entreprise.fr)."],
  ["Puis-je transférer un domaine existant chez SOIBY ?", "Oui, nous prenons en charge le transfert de votre nom de domaine existant et la configuration associée."],
  ["Puis-je demander une application mobile ou une plateforme SaaS ?", "Oui. Notre équipe de 15 développeurs conçoit des applications mobiles, des plateformes SaaS et des solutions métier sur mesure."],
  ["Comment obtenir un devis pour un projet sur mesure ?", "Prenez rendez-vous avec notre équipe : nous étudions votre besoin et vous envoyons un devis personnalisé."],
] as const;

function CreateSiteIcon({ size }: { size: number }) {
  return <Monitor size={size} strokeWidth={1.8} aria-hidden="true" />;
}

export default function MobileLanding({ onOpenRdv }: { onOpenRdv: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [domain, setDomain] = useState("");
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

  const searchDomain = (e: FormEvent) => {
    e.preventDefault();
    onOpenRdv();
  };

  return (
    <div className="m-page">
      <header className="m-header">
        <div className="m-header-inner">
          <a href="#accueil" className="m-logo"><img src="/logoversion.png" alt="SOIBY — Respirez on s’occupe de tout !" /></a>
          <button type="button" className="m-header-cta" onClick={onOpenRdv}><CreateSiteIcon size={19} />Créer mon site</button>
          <button type="button" className="m-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X size={30} strokeWidth={2.6} /> : <Menu size={32} strokeWidth={2.8} />}</button>
        </div>
        {menuOpen && <nav className="m-nav" onClick={() => setMenuOpen(false)}>
          <a href="#accueil">Accueil</a><a href="#equipe">L’équipe</a><a href="#realisations">Nos réalisations</a>
          <a href="#cloud">Nom de domaine & hébergement</a><a href="#faq">FAQ</a>
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
            <video controls playsInline preload="metadata" poster="/hero-mobile-v2.png" aria-label="Présentation vidéo SOIBY">
              <source src="/mobile.mp4" type="video/mp4" />
            </video>
          </div>
          <button type="button" className="m-cta-main" onClick={onOpenRdv}><Laptop size={46} strokeWidth={1.6} aria-hidden="true" /><span>Créer mon site<br />dès 189&nbsp;€&nbsp;HT <ArrowRight size={26} strokeWidth={2.2} /></span></button>
          <button type="button" className="m-cta-rdv" onClick={onOpenRdv}><CalendarDays size={40} strokeWidth={1.6} aria-hidden="true" /><span><strong>Prendre rendez-vous</strong><small>Projet sur mesure <ArrowRight size={20} strokeWidth={2} /></small></span></button>
          <p className="m-hero-note"><Info size={16} strokeWidth={2} aria-hidden="true" /> Création du site uniquement,<br />hors nom de domaine et hébergement. Prix HT.</p>
          <a href="#equipe" className="m-scroll" aria-label="Découvrir la suite"><ChevronDown size={30} strokeWidth={3} /></a>
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
              {produits.map(({ nom, texte, image, url, Icon, fond, pastille }) => (
                <a key={nom} className="m-card" href={`https://${url}`} target="_blank" rel="noreferrer" style={{ background: fond }} aria-label={`Découvrir ${nom}`}>
                  <span className="m-card-head"><i style={{ background: pastille }}><Icon size={14} strokeWidth={3} /></i>{nom}</span>
                  <span className="m-card-text">{texte}</span>
                  <img src={image} alt="" loading="lazy" />
                </a>
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
          <form className="m-domain" onSubmit={searchDomain}>
            <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="Votre nom de domaine idéal..." aria-label="Votre nom de domaine idéal" />
            <button type="submit" aria-label="Rechercher"><Search size={22} strokeWidth={2.6} /></button>
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
          <button type="button" className="m-cta-faq" onClick={onOpenRdv}><Laptop size={34} strokeWidth={1.7} aria-hidden="true" />Créer mon site dès 189&nbsp;€&nbsp;HT<ArrowRight size={24} strokeWidth={2.2} /></button>
        </section>


        <footer className="m-footer">
        <div className="m-footer-top">
          <img src="/logoversion.png" alt="SOIBY" />
          <nav aria-label="Réseaux sociaux">
            <a href="#" aria-label="LinkedIn" className="li"><Linkedin size={22} strokeWidth={0} fill="currentColor" /></a>
            <a href="#" aria-label="YouTube" className="yt"><Youtube size={24} strokeWidth={2} /></a>
            <a href="#" aria-label="Facebook" className="fb"><Facebook size={22} strokeWidth={0} fill="currentColor" /></a>
            <a href="#" aria-label="Instagram" className="ig"><Instagram size={24} strokeWidth={2.2} /></a>
          </nav>
        </div>
        <nav className="m-footer-links" aria-label="Liens utiles">
          <p><a href="#equipe">À propos</a><i>|</i><a href="#realisations">Nos réalisations</a><i>|</i><a href="#faq">FAQ</a><i>|</i><a href="#">Mentions légales</a></p>
          <p><a href="#">Politique de confidentialité</a><i>|</i><button type="button" onClick={onOpenRdv}>Contact</button></p>
        </nav>
        <p className="m-copy">© 2026 SOIBY. Tous droits réservés.</p>
      </footer>
      </div>
      </main>
    </div>
  );
}
