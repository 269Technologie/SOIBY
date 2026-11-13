import { useEffect } from "react";

/**
 * Adresses propres pour les sections de la page d'accueil : /equipe, /realisations, /faq…
 * (au lieu des ancres #equipe). Un lien <a href="/equipe"> fait défiler jusqu'à la section sans recharger,
 * une arrivée directe sur soiby.fr/equipe aussi. Les anciennes adresses en # sont converties.
 * Les serveurs de production renvoient index.html pour toute adresse (serve -s, server/index.mjs).
 */
/** Émis après un history.pushState/replaceState fait hors de ce module. */
export const NAVIGATE_EVENT = "soiby:navigate";

export const SECTIONS = ["accueil", "equipe", "realisations", "cloud", "faq", "contact"] as const;
type Section = (typeof SECTIONS)[number];

export const sectionPath = (id: Section) => (id === "accueil" ? "/" : `/${id}`);

function sectionFromPath(path: string): Section | null {
  const p = path.replace(/^\/+|\/+$/g, "");
  if (p === "") return "accueil";
  return (SECTIONS as readonly string[]).includes(p) ? (p as Section) : null;
}

function scrollToSection(id: Section, smooth: boolean) {
  const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
  if (id === "accueil") { window.scrollTo({ top: 0, behavior }); return; }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export function useSectionRoutes() {
  useEffect(() => {
    // Ancienne adresse soiby.fr/#equipe -> soiby.fr/equipe
    const legacy = window.location.hash.slice(1);
    if (legacy && (SECTIONS as readonly string[]).includes(legacy)) {
      history.replaceState(history.state, "", sectionPath(legacy as Section) + window.location.search);
    }

    // Arrivée directe sur /equipe : défilement une fois la page dessinée
    const initial = sectionFromPath(window.location.pathname);
    const timer = initial && initial !== "accueil" ? window.setTimeout(() => scrollToSection(initial, false), 60) : undefined;
    // Dernière adresse vue : en revenant d'une fenêtre (ex. /mentions-legales -> /) on ne fait pas défiler la page
    let lastPath = window.location.pathname;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href");
      if (!href || !href.startsWith("/") || a?.getAttribute("target")) return;
      const id = sectionFromPath(href);
      if (!id) return;
      e.preventDefault();
      const path = sectionPath(id);
      if (window.location.pathname !== path) history.pushState({ section: id }, "", path);
      lastPath = path;
      scrollToSection(id, true);
    };

    const onPop = () => {
      const from = lastPath;
      lastPath = window.location.pathname;
      const id = sectionFromPath(lastPath);
      if (id && sectionFromPath(from)) scrollToSection(id, true);
    };

    // Changement d'adresse fait ailleurs (fenêtre des mentions légales) : on le note sans défiler
    const onNavigate = () => { lastPath = window.location.pathname; };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener(NAVIGATE_EVENT, onNavigate);
    };
  }, []);
}
