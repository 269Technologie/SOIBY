import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight, Blocks, Bot, CalendarDays, Check, ChevronDown, CircleUserRound, Cloud,
  BarChart3, Bitcoin, Car, ExternalLink, HeartPulse, Laptop, Layers3, Menu, Monitor, Rocket,
  Pause, Play, ShieldCheck, Smartphone, Sparkles, Star, Store, UsersRound, X, Zap,
} from "lucide-react";

const expertises = [
  ["Sites web professionnels", Laptop], ["Applications mobiles", Smartphone], ["Solutions SaaS", Layers3],
  ["Intelligence Artificielle", Bot], ["Blockchain & FinTech", Blocks], ["Santé numérique", HeartPulse],
  ["Cloud & Hébergement", Cloud],
] as const;

const produits = [
  { nom: "WinEdge", logo: "/logo_winedge.png", image: "/realisations/winedge.png", texte: "L’épargne indolore en Bitcoin.", nombre: "+25 000", unite: "utilisateurs", url: "winedge.io", couleur: "from-[#f06a00] to-[#762600]", type: "dashboard" },
  { nom: "Pilote360", logo: "/logo_pilote.png", image: "/realisations/pilote360.png", texte: "Gestion de trésorerie assistée par IA et facturation électronique.", nombre: "+1 200", unite: "entreprises", url: "pilote360.io", couleur: "from-[#0879dc] to-[#032859]", type: "dashboard" },
  { nom: "Caisse Solidarité Maladie", logo: "/logo_caisse.png", image: "/realisations/caisse-solidarite.png", texte: "Un carnet de santé numérique.", nombre: "+12 000", unite: "dossiers santé", url: "caissesolidaritemaladie.com", couleur: "from-[#11a442] to-[#075124]", type: "phone" },
  { nom: "Coontrool", logo: "", image: "/realisations/coontrool.png", texte: "Gestion, suivi et contrôle de caisse à distance.", nombre: "+3 500", unite: "commerces", url: "coontrool.com", couleur: "from-[#a210cf] to-[#41075f]", type: "dashboard" },
  { nom: "SMSCovoit", logo: "/logo_covoit.png", image: "/realisations/smscovoit.png", texte: "Une plateforme de covoiturage simple et fiable.", nombre: "+50 000", unite: "trajets", url: "smscovoit.com", couleur: "from-[#05a9b8] to-[#005269]", type: "map" },
  { nom: "HALIMA", logo: "", image: "/realisations/halima.png", texte: "Agent IA entrepreneurial, conseil business et lifestyle.", nombre: "+10 000", unite: "utilisateurs", url: "halima.ai", couleur: "from-[#ed1683] to-[#710640]", type: "assistant" },
];

const forces = [
  ["Des produits réels et utilisés", "Nous opérons nos propres plateformes, une garantie de savoir-faire et de fiabilité.", Sparkles],
  ["Une équipe de 15 développeurs", "Une équipe pluridisciplinaire au service de votre projet.", UsersRound],
  ["De l’idée au déploiement", "Conception, développement, hébergement et maintenance, tout au même endroit.", Zap],
  ["Des solutions robustes et sécurisées", "Haute disponibilité, performance et sécurité de niveau professionnel.", ShieldCheck],
] as const;

function SectionTitle({ label, children }: { label: string; children: ReactNode }) {
  return <div className="mb-5"><p className="section-kicker">{label}</p><h2 className="section-title">{children}</h2></div>;
}

function Cta({ children, outline = false }: { children: ReactNode; outline?: boolean }) {
  return <a href="#contact" className={`landing-cta ${outline ? "landing-cta-outline" : ""}`}>{children}<ArrowRight size={17} /></a>;
}

export default function LandingMaquette() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileVideoPlaying, setMobileVideoPlaying] = useState(false);
  const [mobileProjectsPage, setMobileProjectsPage] = useState<0 | 1>(0);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const toggleMobileVideo = () => {
    const video = mobileVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };
  return (
    <div className="soiby-page">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="#accueil" className="logo-wrap"><img src="/logoversion.png" alt="SOIBY" /></a>
          <span className="header-separator" />
          <nav className="desktop-nav" aria-label="Navigation principale">
            <a className="active" href="#accueil">Accueil</a><a href="#realisations">Nos réalisations</a>
            <a href="#parcours">Création de site <ChevronDown size={14} /></a><a href="#expertises">Solutions <ChevronDown size={14} /></a>
            <a href="#cloud">SOIBY Cloud</a><a href="#equipe">L’équipe</a><a href="#contact">Contact</a>
          </nav>
          <div className="header-actions"><a className="login-btn" href="#contact"><CircleUserRound size={17} />Se connecter</a><a className="appointment-btn" href="#contact"><CalendarDays size={17} />Prendre rendez-vous</a></div>
          <a className="mobile-account" href="#contact" aria-label="Se connecter"><CircleUserRound /></a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="mobile-nav"><a href="#accueil">Accueil</a><a href="#realisations">Nos réalisations</a><a href="#expertises">Solutions</a><a href="#cloud">SOIBY Cloud</a><a href="#equipe">L’équipe</a><a href="#contact">Contact</a><a href="#contact">Prendre rendez-vous</a></nav>}
      </header>

      <main>
        <section id="accueil" className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy"><span className="hero-pill">Studio technologique & éditeur de plateformes</span><h1>Nous créons nos propres plateformes.<br /><em>Nous construisons la vôtre.</em></h1><p>De la création de site web à la plateforme métier complexe, SOIBY conçoit, développe et exploite des solutions numériques performantes, sécurisées et évolutives.</p><div className="hero-actions"><Cta><Monitor size={20} />Créer mon site</Cta><Cta outline><Rocket size={20} />Développer mon projet</Cta></div></div>
            <div className="video-card">
              <video controls playsInline preload="metadata" poster="/hero-mobile-v2.png" aria-label="Présentation vidéo du studio technologique SOIBY">
                <source src="/videos.mp4" type="video/mp4" />
                Votre navigateur ne prend pas en charge la lecture de cette vidéo.
              </video>
            </div>
            <button type="button" className="mobile-video-control" onClick={toggleMobileVideo} aria-label={mobileVideoPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}>
              <video ref={mobileVideoRef} className="mobile-mini-video" playsInline preload="metadata" onPlay={() => setMobileVideoPlaying(true)} onPause={() => setMobileVideoPlaying(false)}>
                <source src="/mobile.mp4" type="video/mp4" />
              </video>
              <span className="mobile-video-state" aria-hidden="true">{mobileVideoPlaying ? <Pause /> : <Play />}</span>
            </button>
          </div>
          <div className="stat-bar">{[
            { n: "6", l: "Plateformes en production", Icon: Layers3 },
            { n: "15", l: "Développeurs experts", Icon: UsersRound },
            { n: "7+", l: "Domaines d’expertise", Icon: Layers3 },
            { n: "100+", l: "Projets réalisés", Icon: Rocket },
            { n: "99,9 %", l: "Disponibilité (SLA)", Icon: ShieldCheck },
          ].map(({ n, l, Icon })=><div key={l}><Icon /><p><strong>{n}</strong><small>{l}</small></p></div>)}</div>
        </section>

        <section id="expertises" className="content-section expertise-section"><div className="center-title"><p>— &nbsp; Nos expertises &nbsp; —</p><h2>Création de sites, applications et solutions sur mesure</h2></div><div className="expertise-grid">{expertises.map(([label,Icon])=><article key={label}><Icon /><strong>{label}</strong></article>)}</div></section>

        <section id="realisations" className="content-section"><div className="product-heading"><SectionTitle label="Nos réalisations">Des plateformes concrètes, utilisées et en production</SectionTitle><button type="button" className="mobile-see-all" onClick={() => setMobileProjectsPage(page => page === 0 ? 1 : 0)} aria-label={mobileProjectsPage === 0 ? "Afficher les trois réalisations suivantes" : "Afficher les trois premières réalisations"}>Voir plus <ArrowRight /></button></div><div className="product-grid" data-mobile-page={mobileProjectsPage}>{produits.map((p,index)=><a key={p.nom} href={`https://${p.url}`} target="_blank" rel="noreferrer" aria-label={`Découvrir ${p.nom} sur ${p.url}`} className={`product-card bg-gradient-to-br ${p.couleur}`}><div className="product-top"><div className="product-name"><span className="product-symbol">{index === 0 ? <Bitcoin /> : index === 1 ? <BarChart3 /> : index === 2 ? <HeartPulse /> : index === 3 ? <Store /> : index === 4 ? <Car /> : <Sparkles />}</span><h3>{p.nom}</h3>{index === 5 && <small className="ia-badge">IA</small>}</div><p>{p.texte}</p><div className={`product-screen ${p.type}`}>
          <img src={p.image} alt={`Aperçu de la plateforme ${p.nom}`} />
        </div></div><div className="product-bottom"><div><UsersRound /><p><strong>{p.nombre}</strong><small>{p.unite}</small></p></div><span className="product-url">{p.url}<ExternalLink size={12} /></span></div></a>)}</div><div className="carousel-dots"><i className={mobileProjectsPage === 0 ? "active" : ""} /><i className={mobileProjectsPage === 1 ? "active" : ""} /><i /></div></section>

        <section id="apropos" className="content-section why-grid"><div><SectionTitle label="Pourquoi SOIBY ?">Le partenaire technologique qui fait la différence</SectionTitle><div className="force-grid">{forces.map(([title,text,Icon])=><article key={title}><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><div id="equipe" className="team-photo"><img src="/equipe-studio.png" alt="Équipe de développement SOIBY" /><b><UsersRound />15 développeurs<small>à votre service</small></b></div></section>

        <section id="cloud" className="content-section cloud-section"><div className="cloud-intro"><Cloud /><div><h2>SOIBY Cloud</h2><p>L’infrastructure idéale pour vos projets web et applicatifs.</p></div></div><div className="cloud-list">{["Nom de domaine","Hébergement haute performance","Emails professionnels","Certificat SSL","Sauvegardes automatiques","Déploiement rapide"].map(x=><span key={x}><Check />{x}</span>)}</div><form className="domain-box" onSubmit={e=>e.preventDefault()}><b>Trouvez votre nom de domaine</b><div><input aria-label="Nom de domaine" placeholder="monentreprise.fr" /><button>Rechercher</button></div></form></section>

        <section id="parcours" className="content-section"><SectionTitle label="Deux parcours, un objectif : votre réussite"><span className="sr-only">Nos parcours</span></SectionTitle><div className="journey-grid"><article><Monitor /><div><h3>Je veux créer mon site</h3><p>Un site moderne, rapide et optimisé pour votre activité (vitrine, e-commerce, réservation, blog…).</p><Cta>Créer mon site</Cta></div><img className="journey-device" src="/parcours/creation-site.png" alt="Aperçu d’un site professionnel sur ordinateur" /></article><article><Rocket /><div><h3>Je veux développer mon projet</h3><p>Une application web, mobile ou une plateforme métier (SaaS, FinTech, IA, santé, mobilité…).</p><Cta>Développer mon projet</Cta></div><img className="journey-device" src="/parcours/developpement-application.png" alt="Application présentée sur tablette et téléphone" /></article></div></section>

        <section className="content-section testimonials"><SectionTitle label="Ils nous font confiance"><span className="sr-only">Témoignages</span></SectionTitle><div>{[["Amina M.","Directrice d’entreprise","SOIBY a créé notre site et notre plateforme de gestion. Une équipe réactive, professionnelle et à l’écoute."],["Laurent P.","Consultant","Un accompagnement de A à Z. Mon site est rapide, bien référencé et je gagne de nouveaux clients chaque semaine."],["Samuel K.","Fondateur de startup","Plus qu’un prestataire, SOIBY est un véritable partenaire technologique. Je recommande sans hésiter."]].map(([name,role,text],i)=><blockquote key={name}><span className={`avatar avatar-${i}`}><img src="/equipe-studio.png" alt="" /></span><div><p>« {text} »</p><footer><b>{name}</b><small>{role}</small><span>{[1,2,3,4,5].map(x=><Star key={x} fill="currentColor" />)}</span></footer></div></blockquote>)}</div></section>

        <section id="contact" className="content-section final-cta"><h2>Donnez vie à votre projet digital<br />avec SOIBY</h2><div className="service-icons">{[[Monitor,"Site web"],[Smartphone,"Application mobile"],[Layers3,"Plateforme SaaS"],[Cloud,"Hébergement & Cloud"],[Bot,"IA & Automatisation"]].map(([Icon,label])=>{const I=Icon as typeof Monitor;return <span key={String(label)}><I />{String(label)}</span>})}</div><a href="mailto:contact@soiby.fr"><CalendarDays />Prendre rendez-vous<ArrowRight /></a></section>
      </main>
      <footer className="site-footer"><img src="/logoversion.png" alt="SOIBY" /><p>© 2026 SOIBY SAS — Studio technologique</p><nav><a href="#">Mentions légales</a><a href="#">Confidentialité</a></nav></footer>
    </div>
  );
}
