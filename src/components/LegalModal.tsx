import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { LEGAL, isLegalId, type LegalId } from "../legal";
import { NAVIGATE_EVENT } from "../sectionRoutes";
import "../legal.css";

/**
 * Mentions légales / Politique de confidentialité, en fenêtre modale.
 * Ouverte par l'adresse /mentions-legales ou /politique-confidentialite (vraies URL, sans routeur) ;
 * les serveurs de production renvoient index.html pour toute adresse (serve -s, server/index.mjs).
 */
const LINK = /\[\[(.+?)\]\]\((.+?)\)/g;

function inline(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(LINK)) {
    if (m.index! > last) out.push(line.slice(last, m.index));
    const [, label, url] = m;
    const external = /^https?:/.test(url);
    out.push(<a key={m.index} href={url} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>);
    last = m.index! + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const fromPath = (): LegalId | null => { const p = window.location.pathname.replace(/^\/+|\/+$/g, ""); return isLegalId(p) ? p : null; };

export default function LegalModal() {
  const [id, setId] = useState<LegalId | null>(fromPath);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setId(fromPath());
    // Liens internes <a href="/mentions-legales"> (pied de page, fenêtre) : navigation sans rechargement
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href")?.replace(/^\/+|\/+$/g, "") ?? "";
      if (!isLegalId(href)) return;
      e.preventDefault();
      if (fromPath() === href) return;
      if (fromPath()) history.replaceState({ legal: true }, "", `/${href}`);   // passer d'un texte à l'autre
      else history.pushState({ legal: true }, "", `/${href}`);
      window.dispatchEvent(new Event(NAVIGATE_EVENT));
      setId(href);
    };
    window.addEventListener("popstate", sync);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("popstate", sync); document.removeEventListener("click", onClick); };
  }, []);

  const close = () => {
    if (history.state?.legal) history.back();          // ouvert depuis le site : retour à la page précédente
    else { history.replaceState(null, "", "/"); window.dispatchEvent(new Event(NAVIGATE_EVENT)); setId(null); }   // arrivée directe par l'adresse
  };

  useEffect(() => {
    if (!id) return;
    cardRef.current?.scrollTo(0, 0);
    const previous = document.body.style.overflow;
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    document.body.style.overflow = "hidden";
    document.title = `${LEGAL[id].title} — SOIBY`;
    if (canonical) canonical.href = `https://soiby.fr/${id}`;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      window.removeEventListener("keydown", onKey);
    };
  }, [id]);

  if (!id) return null;
  const doc = LEGAL[id];
  const other = LEGAL[id === "mentions-legales" ? "politique-confidentialite" : "mentions-legales"];

  return (
    <div className="lg-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={cardRef} className="lg-card" role="dialog" aria-modal="true" aria-labelledby="lg-title">
        <header className="lg-head">
          <div>
            <p className="lg-eyebrow">SOIBY SAS</p>
            <h2 id="lg-title">{doc.title}</h2>
            <p className="lg-updated">{doc.updated}</p>
          </div>
          <button type="button" className="lg-close" onClick={close} aria-label="Fermer"><X strokeWidth={3} /></button>
        </header>

        <div className="lg-body">
          {doc.sections.map((s) => (
            <section key={s.title}>
              <h3>{s.title}</h3>
              {s.paragraphs.map((p, i) => {
                const t = p.trim();
                if (t.startsWith("**") && t.endsWith("**")) return <p key={i} className="lg-sub">{t.slice(2, -2)}</p>;
                return <p key={i}>{p.split("\n").map((line, j) => <Fragment key={j}>{j > 0 && <br />}{inline(line)}</Fragment>)}</p>;
              })}
            </section>
          ))}
        </div>

        <footer className="lg-foot">
          <a href={`/${other.id}`}>{other.title}</a>
          <button type="button" onClick={close}>Fermer</button>
        </footer>
      </div>
    </div>
  );
}
