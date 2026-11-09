import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { PORTFOLIO } from "../portfolio";
import "../portfolio.css";

/**
 * Portfolio interactif : un clic sur une réalisation ouvre cette fenêtre, sans quitter SOIBY.
 * Grande capture de la page sélectionnée, vignettes des autres pages pour naviguer, croix pour fermer.
 */
export default function PortfolioModal({ workId, onClose }: { workId: string | null; onClose: () => void }) {
  const project = workId ? PORTFOLIO[workId] : undefined;
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project?.pages.length ?? 0;

  useEffect(() => { setIndex(0); }, [workId]);

  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [project, count, onClose]);

  if (!project) return null;
  const page = project.pages[index];

  return (
    <div className="pf-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pf-card" role="dialog" aria-modal="true" aria-labelledby="pf-title">
        <header className="pf-head">
          <div>
            <h2 id="pf-title">{project.nom}</h2>
            <p>{page.label} <span aria-hidden="true">·</span> {index + 1}/{count}</p>
          </div>
          <a className="pf-visit" href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">{project.url}<ExternalLink aria-hidden="true" /></a>
          <button ref={closeRef} type="button" className="pf-close" onClick={onClose} aria-label="Fermer"><X strokeWidth={3} /></button>
        </header>

        <div className="pf-stage">
          <img key={page.src} src={page.src} alt={`${project.nom} — page « ${page.label} »`} draggable={false} />
          <button type="button" className="pf-nav pf-prev" onClick={() => setIndex((index - 1 + count) % count)} aria-label="Page précédente"><ChevronLeft strokeWidth={3} /></button>
          <button type="button" className="pf-nav pf-next" onClick={() => setIndex((index + 1) % count)} aria-label="Page suivante"><ChevronRight strokeWidth={3} /></button>
        </div>

        <ul className="pf-thumbs" aria-label="Autres pages du site">
          {project.pages.map((p, i) => (
            <li key={p.src}>
              <button type="button" className={i === index ? "on" : ""} onClick={() => setIndex(i)} aria-label={`Afficher la page « ${p.label} »`} aria-current={i === index}>
                <img src={p.thumb} alt="" loading="lazy" draggable={false} />
                <span>{p.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
