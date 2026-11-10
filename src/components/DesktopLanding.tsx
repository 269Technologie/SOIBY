import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight, BarChart3, Bitcoin, CalendarDays, Car, Check, ChevronLeft, ChevronRight, Cloud, HeartPulse, Laptop, Plus, Search, Store, X,
} from "lucide-react";
import { faq } from "../faq";
import AutoVideo from "./AutoVideo";
import SiteFooter from "./SiteFooter";
import "../desktop.css";

/**
 * Page d'accueil — version web, calée sur la maquette 1671 × 941 px.
 * Chaque élément est positionné aux coordonnées de la maquette ; l'échelle `--u` (voir desktop.css) suit la largeur ET la hauteur
 * de la fenêtre, comme pour la version mobile.
 */

const CLOUD_URL = "https://cloud.soiby.fr";
const U = (n: number) => `calc(var(--u) * ${n})`;
const box = (l: number, t: number, w?: number, h?: number): CSSProperties => ({
  left: U(l), top: U(t), width: w === undefined ? undefined : U(w), height: h === undefined ? undefined : U(h),
});
const band = (y0: number, h: number) => ({ "--y0": y0, "--h": h }) as CSSProperties;

interface TProps {
  key?: string | number;
  sx?: number;
  x: number; base: number; fs: number; w?: number; c?: string; className?: string; style?: CSSProperties;
  href?: string; ext?: boolean; onClick?: () => void; label?: string; children: ReactNode;
}
/** Texte positionné par sa ligne de base (x = bord gauche du texte, base = y de la ligne de base dans la maquette). */
function T({ x, base, fs, w = 700, c, sx, className = "", style, href, ext, onClick, label, children }: TProps) {
  const st: CSSProperties = { left: U(x - 1.6), top: `calc(var(--u) * ${base + 1.3} - var(--u) * ${fs} * var(--k))`, fontSize: U(fs), fontWeight: w, color: c, ...(sx ? { transform: `scaleX(${sx})`, transformOrigin: "0 50%" } : null), ...style };
  if (href) return <a className={`d-t d-link ${className}`} style={st} href={href} aria-label={label} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  if (onClick) return <button type="button" className={`d-t d-link ${className}`} style={st} onClick={onClick} aria-label={label}>{children}</button>;
  return <span className={`d-t ${className}`} style={st}>{children}</span>;
}

interface BtnProps { b: [number, number, number, number]; className?: string; label: string; href?: string; ext?: boolean; onClick?: () => void; children: ReactNode }
/** Bouton dont le contenu garde les coordonnées de la maquette (origine déplacée dans le bouton). */
function Btn({ b, className = "", label, href, ext, onClick, children }: BtnProps) {
  const inner = <span className="d-origin" style={{ left: U(-b[0]), top: U(-b[1]) }}>{children}</span>;
  const st = box(...b);
  if (href) return <a className={`d-abs d-btn ${className}`} style={st} href={href} aria-label={label} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>;
  return <button type="button" className={`d-abs d-btn ${className}`} style={st} onClick={onClick} aria-label={label}>{inner}</button>;
}

const NAV = [
  { id: "accueil", label: "Accueil", x: 406, fs: 17.7, href: "#accueil" },
  { id: "equipe", label: "Notre équipe", x: 542, fs: 17.3, href: "#equipe" },
  { id: "realisations", label: "Réalisations", x: 711, fs: 16.9, href: "#realisations" },
  { id: "cloud", label: "Domaines & Hébergement", x: 872, fs: 17, href: CLOUD_URL, ext: true },
  { id: "faq", label: "FAQ", x: 1140, fs: 16.1, href: "#faq" },
  { id: "contact", label: "Contact", x: 1235, fs: 17, href: "#contact" },
] as const;

const WORKS = [
  { id: "winedge", nom: "WinEdge", url: "winedge.io", img: "/realisations/winedge.png", txt: "L’épargne indolore en Bitcoin.", Icon: Bitcoin, fs: 17.9,
    bg: "linear-gradient(180deg,#fec478 0%,#fdb155 14%,#fd9b27 29%,#fc8c0b 43%,#f77702 58%,#f56e03 75%,#f06402 100%)" },
  { id: "pilote360", nom: "Pilote360", url: "pilote360.io", img: "/realisations/pilote360.png", txt: "Gestion de trésorerie assistée par IA.", Icon: BarChart3, fs: 17.8,
    bg: "linear-gradient(180deg,#5685fd 0%,#3c6dfd 14%,#2a5ffe 29%,#0d51fe 43%,#014bfc 58%,#012af4 79%,#0106ed 100%)" },
  { id: "caisse-solidarite", nom: "Caisse Solidarité", url: "caissesolidaritemaladie.com", img: "/realisations/caisse-solidarite.png", txt: "Un carnet de santé numérique.", Icon: HeartPulse, fs: 16.4,
    bg: "linear-gradient(180deg,#86d680 0%,#69ca64 14%,#48bd4a 29%,#2fac3a 43%,#1b9b32 58%,#148d2e 79%,#0e7a26 100%)" },
  { id: "coontrool", nom: "Coontrool", url: "coontrool.com", img: "/realisations/coontrool.png", txt: "Contrôle de caisse à distance.", Icon: Store, fs: 17.9,
    bg: "linear-gradient(180deg,#be82fb 0%,#a967ec 14%,#954ee1 29%,#7e3dd1 43%,#652dc0 58%,#4b1daf 79%,#360fa5 100%)" },
  { id: "smscovoit", nom: "SMSCovoit", url: "smscovoit.com", img: "/realisations/smscovoit.png", txt: "Le covoiturage simple et fiable.", Icon: Car, fs: 17.9,
    bg: "linear-gradient(180deg,#7fe0e6 0%,#3fcfdb 14%,#1fb7c6 29%,#0e9fb0 43%,#0a8398 62%,#07677d 100%)" },
] as const;
const VISIBLE = 4, PITCH = 196;
// Cadre de la vidéo agrandi : le hero passe de 245 px (maquette d'origine) à 310 px de haut ; le texte garde sa taille et est centré (voir .d-herotext).
const HERO_H = 310;
// La vidéo commence juste après la fin du texte (le titre se termine à x = 896) : le texte ne la recouvre jamais.
const VIDEO_X = 905;

// Pastilles FAQ : [question 1-6] positions [x, y, largeur] et position du texte
const PILLS = [
  { i: 0, x: 95, y: 791, w: 499, tx: 153, fs: 14.4, px: 121 },
  { i: 1, x: 614, y: 791, w: 460, tx: 668, fs: 14.55, px: 636 },
  { i: 2, x: 1094, y: 791, w: 481, tx: 1149, fs: 14.7, px: 1117 },
  { i: 3, x: 95, y: 828, w: 499, tx: 152, fs: 14.47, px: 121 },
  { i: 4, x: 614, y: 828, w: 460, tx: 668, fs: 14.38, px: 636 },
  { i: 5, x: 1094, y: 828, w: 481, tx: 1149, fs: 14.65, px: 1117 },
] as const;


export default function DesktopLanding({ onOpenRdv, onOpenSite, onOpenWork, onOpenDomain }: { onOpenRdv: () => void; onOpenSite: () => void; onOpenWork: (id: string) => void; onOpenDomain: (query: string) => void }) {
  const [active, setActive] = useState("accueil");
  const [start, setStart] = useState(0);
  const [openQ, setOpenQ] = useState<number | null>(null);
  const [allFaq, setAllFaq] = useState(false);
  const [modalQ, setModalQ] = useState<number | null>(0);
  const max = WORKS.length - VISIBLE;

  const go = (delta: number) => setStart((s) => (s + delta < 0 ? max : s + delta > max ? 0 : s + delta));

  useEffect(() => {
    if (openQ === null && !allFaq) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenQ(null); setAllFaq(false); } };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    if (allFaq) document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [openQ, allFaq]);

  return (
    <div className="d-page">
      {/* ───── En-tête ───── */}
      <header className="d-band d-header" style={band(0, 67)}>
        <div className="d-in">
          <a className="d-abs" href="#accueil" aria-label="SOIBY — Respirez on s’occupe de tout !" style={box(138, 0, 136, 67)} onClick={() => setActive("accueil")}>
            <img src="/desktop/logo-header.png" alt="" draggable={false} />
          </a>
          <nav aria-label="Navigation principale">
            {NAV.map((n) => {
              const on = active === n.id;
              const common = { x: n.x, base: 36, fs: n.fs, c: on ? "var(--red)" : "var(--navy)", label: n.label } as const;
              return <T key={n.id} {...common} href={n.href} ext={"ext" in n}>{n.label}</T>;
            })}
          </nav>
          <span className="d-abs d-underline" style={box(405, 45, 61, 3)} aria-hidden="true" />
          <Btn b={[1356, 12, 201, 43]} className="d-red d-pill-btn" label="Créer mon site" onClick={onOpenSite}>
            <Laptop className="d-abs d-ico" strokeWidth={1.5} style={box(1377, 14.5, 36, 36)} aria-hidden="true" />
            <T x={1425} base={39} fs={15.9} c="#fff">Créer mon site</T>
          </Btn>
        </div>
      </header>

      <main className="d-main">
        {/* ───── Hero ───── */}
        <section className="d-band d-hero" id="accueil" style={band(67, HERO_H)}>
          <div className="d-in">
            <div className="d-abs d-herobg" style={box(0, 67, 1671, HERO_H)} />
            <AutoVideo className="d-abs d-herovid" src="/videos.mp4" poster="/desktop/hero-photo.jpg" style={box(VIDEO_X, 67, 1671 - VIDEO_X, HERO_H)} />
            <img className="d-abs" src="/desktop/hero-swoosh.png" alt="" draggable={false} style={{ ...box(1430, 67 + HERO_H - 122, 241, 122), pointerEvents: "none" }} />
            <div className="d-fill d-herotext">
              <h1 className="d-h1">
                <T x={143} base={107} fs={41.9} c="#fff">Nous créons nos propres plateformes.</T>
                <T x={140} base={153} fs={46.6} c="var(--red)">Nous construisons la vôtre.</T>
              </h1>
              <T x={142} base={186} fs={26.6} w={400} sx={0.966} c="#fff">Un site professionnel, rapide et référencé, livré <b className="d-b">dès 189 € HT.</b></T>
              {[[141, 174, "Design moderne et responsive", 0.838], [411, 444, "Optimisé pour Google (SEO)", 0.87], [673, 707, "Livré en 3 à 7 jours ouvrés", 0.894]].map(([cx, tx, text, fs]) => (
                <span key={text as string}>
                  <span className="d-abs d-check" style={box(cx as number, 204, 20, 20)} aria-hidden="true"><Check strokeWidth={4} /></span>
                  <T x={tx as number} base={219} fs={17.4} w={400} sx={fs as number} c="#fff">{text}</T>
                </span>
              ))}
              <Btn b={[141, 243, 404, 54]} className="d-red d-pill-btn" label="Créer mon site dès 189 € HT" onClick={onOpenSite}>
                <Laptop className="d-abs d-ico" strokeWidth={1.5} style={box(178, 249, 40, 40)} aria-hidden="true" />
                <T x={236} base={276} fs={18.2} c="#fff">Créer mon site dès 189 € HT</T>
                <ArrowRight className="d-abs d-ico" strokeWidth={1.6} style={box(483, 253.5, 33, 33)} aria-hidden="true" />
              </Btn>
              <Btn b={[565, 242, 302, 55]} className="d-outline d-pill-btn" label="Prendre rendez-vous — Projet sur mesure" onClick={onOpenRdv}>
                <CalendarDays className="d-abs d-ico" strokeWidth={1.5} style={box(593, 248.5, 40, 40)} aria-hidden="true" />
                <T x={653} base={261} fs={16.5} c="#fff">Prendre rendez-vous</T>
                <T x={653} base={282} fs={15.4} w={400} c="#fff">Projet sur mesure</T>
                <ArrowRight className="d-abs d-ico" strokeWidth={1.6} style={box(804.5, 261.5, 33, 33)} aria-hidden="true" />
              </Btn>
            </div>
          </div>
        </section>

        {/* ───── Équipe, réalisations, cloud ───── */}
        <div className="d-band d-mid" style={band(312, 440)}>
          <div className="d-in">
            {/* Notre équipe */}
            <section className="d-fill d-clip-team" id="equipe" aria-label="Notre équipe">
              <div className="d-abs d-teambg" style={box(92, 324, 1486, 233)} />
              <img className="d-abs" src="/desktop/team.jpg" alt="" draggable={false} style={box(92, 324, 1081, 233)} />
              <span className="d-abs d-red d-tag" style={box(127, 335, 169, 32)} aria-hidden="true" />
              <T x={146} base={357} fs={21.3} c="#fff">Notre équipe</T>
              <h2 className="d-h2">
                <T x={135} base={407} fs={41.7} c="#fff">15 développeurs</T>
                <T x={135} base={444} fs={42.2} c="#fff">à votre service</T>
              </h2>
              <T x={138} base={473} fs={18.95} w={400} c="#fff">Une équipe pluridisciplinaire,</T>
              <T x={138} base={494} fs={18.9} w={400} c="#fff">expérimentée et disponible pour</T>
              <T x={139} base={516} fs={19.35} w={400} c="#fff">concevoir, développer et faire</T>
              <T x={139} base={537} fs={19.1} w={400} c="#fff">évoluer vos projets web et mobiles.</T>

              <div className="d-abs d-trust" style={box(1174, 336, 389, 205)}>
                <span className="d-origin" style={{ left: U(-1174), top: U(-336) }}>
                  <span className="d-abs d-red" style={box(1195, 349, 4, 23)} aria-hidden="true" />
                  <T x={1212} base={366} fs={22.2}>Pourquoi nous faire confiance ?</T>
                  {[394, 440, 485].map((y) => <span key={y} className="d-abs d-check d-check-lg" style={box(1194, y, 27, 27)} aria-hidden="true"><Check strokeWidth={3.6} /></span>)}
                  <T x={1239} base={400} fs={15.9}>Une équipe de 15 développeurs</T>
                  <T x={1239} base={419} fs={14.55} w={500}>(web, mobile, IA, cloud...)</T>
                  <T x={1239} base={455} fs={14.7}>Disponible et réactive tout au long du projet</T>
                  <T x={1239} base={490} fs={15.8}>Un accompagnement personnalisé,</T>
                  <T x={1239} base={509} fs={15.3}>de l’idée à la mise en ligne</T>
                </span>
              </div>
            </section>

            {/* Nos réalisations */}
            <section className="d-fill" id="realisations" aria-label="Nos réalisations">
              <div className="d-abs d-panel" style={box(92, 567, 1103, 168)} />
              <span className="d-abs d-red" style={box(122, 601, 35, 2)} aria-hidden="true" />
              <T x={167} base={607} fs={19.2} c="var(--red)">Nos réalisations</T>
              <h2 className="d-h2 d-h2-real">
                <T x={123} base={647} fs={23.1}>Des plateformes</T>
                <T x={122} base={671} fs={22.8}>concrètes, utilisées</T>
                <T x={122} base={696} fs={23.35}>et en production.</T>
              </h2>

              <div className="d-abs d-win" style={box(389, 568, 775, 164)}>
                <div className="d-track" style={{ transform: `translateX(${U(-PITCH * start)})` }}>
                  {WORKS.map((w, i) => (
                    <button key={w.nom} type="button" className="d-abs d-work" style={{ ...box(PITCH * i, 12, 187, 139), background: w.bg }} onClick={() => onOpenWork(w.id)} aria-label={`Voir les pages du site ${w.nom}`}>
                      <img className="d-abs d-work-img" src={w.img} alt="" draggable={false} loading="lazy" style={box(0, 0, 187, 104)} />
                      <span className="d-abs d-work-tint" style={{ ...box(0, 0, 187, 104), background: w.bg }} aria-hidden="true" />
                      <span className="d-abs d-work-ico" style={box(14, 82, 30, 30)} aria-hidden="true"><w.Icon strokeWidth={2.4} /></span>
                      <T x={50} base={102} fs={w.fs} c="#fff">{w.nom}</T>
                      <T x={0} base={122} fs={10.5} w={400} c="#fff" style={{ left: 0, width: U(187), textAlign: "center" }}>{w.txt}</T>
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="d-abs d-arrow" style={box(356, 631, 37, 37)} onClick={() => go(-1)} aria-label="Réalisations précédentes"><ChevronLeft strokeWidth={2.2} /></button>
              <button type="button" className="d-abs d-arrow" style={box(1159, 631, 37, 37)} onClick={() => go(1)} aria-label="Réalisations suivantes"><ChevronRight strokeWidth={2.2} /></button>
              <div className="d-abs d-dots" style={box(766 - 4, 726, 70, 12)} role="group" aria-label="Pages du carrousel">
                {Array.from({ length: max + 1 }, (_, i) => <button key={i} type="button" className={i === start ? "on" : ""} onClick={() => setStart(i)} aria-label={`Réalisations ${i + 1}`} aria-current={i === start} style={{ left: U(4 + 23 * i), width: U(12), height: U(12) }} />)}
              </div>
            </section>

            {/* SOIBY Cloud */}
            <section className="d-fill" id="cloud" aria-label="Domaines et hébergement">
              <div className="d-abs d-cloudbox" style={box(1209, 568, 369, 164)} />
              <Cloud className="d-abs d-cloud-ico" strokeWidth={1.05} preserveAspectRatio="none" style={box(1227, 573, 73, 63)} aria-hidden="true" />
              <T x={1311} base={595} fs={21.1} c="var(--red)">SOIBY, c’est aussi</T>
              <T x={1311} base={612} fs={14.9}>la réservation de nom de domaine</T>
              <T x={1311} base={628} fs={14.9}>et l’hébergement de vos projets.</T>
              <form className="d-abs d-domain" style={box(1224, 641, 341, 31)} role="search" onSubmit={(e) => { e.preventDefault(); onOpenDomain(String(new FormData(e.currentTarget).get("domain") ?? "")); }}>
                <input name="domain" placeholder="Rechercher un nom de domaine" aria-label="Rechercher un nom de domaine" autoComplete="off" autoCapitalize="none" spellCheck={false} />
                <button type="submit" className="d-red" aria-label="Rechercher"><Search strokeWidth={2.8} aria-hidden="true" /></button>
              </form>
              {[[1231, 684, 1253, 693, "Nom de domaine", 11.5], [1231, 707, 1252, 716, "Emails professionnels", 11.65], [1396, 684, 1418, 693, "Hébergement web & apps", 11.6], [1396, 707, 1418, 716, "Certificat SSL (sécurité)", 11.7]].map(([cx, cy, tx, base, text, fs]) => (
                <span key={text as string}>
                  <Check className="d-abs d-ccheck" strokeWidth={3.4} style={box((cx as number) - 3.5, (cy as number) - 5.25, 21, 21)} aria-hidden="true" />
                  <T x={tx as number} base={base as number} fs={fs as number}>{text}</T>
                </span>
              ))}
            </section>
          </div>
        </div>

        {/* ───── FAQ ───── */}
        <section className="d-band d-faq" id="faq" style={band(752, 124)} aria-label="Questions fréquentes">
          <div className="d-in">
            <div className="d-abs d-faqbg" style={box(0, 752, 1671, 124)} />
            <span className="d-abs d-red" style={box(96, 769, 48, 3)} aria-hidden="true" />
            <h2 className="d-h2"><T x={159} base={777} fs={22.8} c="#fff">FAQ – Questions fréquentes</T></h2>
            <T x={1372} base={776} fs={16.75} c="#fff" onClick={() => { setAllFaq(true); setModalQ(0); }}>Voir les {faq.length} questions</T>
            <ArrowRight className="d-abs d-ico" strokeWidth={1.7} style={box(1543, 754.5, 33, 33)} aria-hidden="true" />

            {PILLS.map((p) => (
              <button key={p.i} type="button" className="d-abs d-pill" style={box(p.x, p.y, p.w, 31)} onClick={() => setOpenQ(openQ === p.i ? null : p.i)} aria-expanded={openQ === p.i} aria-label={faq[p.i][0]}>
                <span className="d-origin" style={{ left: U(-p.x), top: U(-p.y) }}>
                  <Plus className="d-abs d-plus" strokeWidth={3.1} style={box(p.px - 5.5, p.y + 2.5, 27, 27)} aria-hidden="true" />
                  <T x={p.tx} base={p.y + 20} fs={p.fs} c="var(--navy)">{p.i + 1}. {faq[p.i][0]}</T>
                </span>
              </button>
            ))}
            {openQ !== null && (() => {
              const p = PILLS[openQ];
              return (
                <>
                  <button type="button" className="d-scrim" aria-label="Fermer la réponse" onClick={() => setOpenQ(null)} />
                  <div className="d-abs d-answer" role="region" aria-label="Réponse" style={{ left: U(p.x), width: U(p.w), bottom: U(941 - p.y + 8) }}>
                    <p><b>{p.i + 1}. {faq[p.i][0]}</b></p>
                    <p>{faq[p.i][1]}</p>
                  </div>
                </>
              );
            })()}
          </div>
        </section>
      </main>

      {/* ───── Pied de page (deuxième écran) ───── */}
      <SiteFooter onOpenRdv={onOpenRdv} onOpenSite={onOpenSite} />

      {/* ───── Toutes les questions ───── */}
      {allFaq && (
        <div className="d-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) setAllFaq(false); }}>
          <div className="d-modal-card" role="dialog" aria-modal="true" aria-labelledby="d-faq-title">
            <header>
              <h2 id="d-faq-title">FAQ – Questions fréquentes</h2>
              <button type="button" onClick={() => setAllFaq(false)} aria-label="Fermer"><X strokeWidth={3} /></button>
            </header>
            <ul>
              {faq.map(([q, a], i) => (
                <li key={q} className={modalQ === i ? "open" : ""}>
                  <button type="button" onClick={() => setModalQ(modalQ === i ? null : i)} aria-expanded={modalQ === i}><Plus strokeWidth={3.6} />{i + 1}. {q}</button>
                  {modalQ === i && <p>{a}</p>}
                </li>
              ))}
            </ul>
            <div className="d-modal-foot"><button type="button" onClick={() => { setAllFaq(false); onOpenRdv(); }}>Une autre question ? Prendre rendez-vous<ArrowRight strokeWidth={2.6} /></button></div>
          </div>
        </div>
      )}
    </div>
  );
}
