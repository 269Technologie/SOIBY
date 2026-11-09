/**
 * Portfolio interactif : pour chaque réalisation, des captures de plusieurs pages du site (grande capture + vignettes).
 * Images : public/realisations/<id>/<n>.jpg (1280×800) et <n>-t.jpg (vignette 320×200).
 */
export interface PortfolioPage { label: string; src: string; thumb: string }
export interface PortfolioProject { id: string; nom: string; url: string; pages: PortfolioPage[] }

const pages = (id: string, labels: string[]): PortfolioPage[] =>
  labels.map((label, i) => ({ label, src: `/realisations/${id}/${i + 1}.jpg`, thumb: `/realisations/${id}/${i + 1}-t.jpg` }));

export const PORTFOLIO: Record<string, PortfolioProject> = {
  winedge: { id: "winedge", nom: "WinEdge", url: "winedge.io", pages: pages("winedge", ["Accueil", "Concept", "Témoignages", "FAQ"]) },
  pilote360: { id: "pilote360", nom: "Pilote360", url: "pilote360.io", pages: pages("pilote360", ["Accueil", "Fonctionnalités", "Tarifs", "ARIA, assistant IA"]) },
  "caisse-solidarite": { id: "caisse-solidarite", nom: "Caisse Solidarité Maladie", url: "caissesolidaritemaladie.com", pages: pages("caisse-solidarite", ["Accueil", "Nos actions", "Carte SHIFA", "Annuaire médical"]) },
  coontrool: { id: "coontrool", nom: "Coontrool", url: "coontrool.com", pages: pages("coontrool", ["Accueil", "Fonctionnalités", "Tarifs", "Comment ça marche"]) },
  smscovoit: { id: "smscovoit", nom: "SMSCovoit", url: "smscovoit.com", pages: pages("smscovoit", ["Accueil", "Comment ça marche", "Espace Femme", "À propos"]) },
};
