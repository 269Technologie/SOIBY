import {
  BadgeCheck, CalendarDays, Compass, Facebook, FileText, Heart, Instagram, Laptop, Linkedin, Mail, ShieldCheck, TrendingUp, User, Youtube,
} from "lucide-react";
import type { ReactNode } from "react";

/**
 * Pied de page du site (version web), construit sur la structure du pied de page de la Caisse Solidarité Maladie (CSMC) :
 * bandeau + réseaux sociaux, colonnes de liens, chiffres + engagements, mentions légales, copyright.
 */

const CLOUD = "https://cloud.soiby.fr";
const EMAIL = "contact@soiby.fr";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", url: "#" },
  { icon: Youtube, label: "YouTube", url: "#" },
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
];

const ENGAGEMENTS = [
  { icon: Laptop, label: "Design moderne\net responsive" },
  { icon: ShieldCheck, label: "Optimisé pour\nGoogle (SEO)" },
  { icon: CalendarDays, label: "Livré en 3 à 7\njours ouvrés" },
];

const link = "text-left transition hover:text-[#ff4458]";

/** Colonnes : 2 par ligne sur mobile (séparateur vertical au milieu), 4 avec séparateurs sur grand écran — comme le pied de page CSMC. */
function Column({ index, id, icon, title, children }: { index: number; id?: string; icon: ReactNode; title: string; children: ReactNode }) {
  const mobile = index % 2 === 0 ? "pr-4 sm:pr-6 border-r border-white/15" : "pl-4 sm:pl-6";
  const desktop = index === 0 ? "lg:border-r-0 lg:px-6 lg:pl-0" : "lg:border-r-0 lg:px-6 lg:border-l lg:border-white/15";
  return (
    <div id={id} className={`${mobile} ${desktop} scroll-mt-6`}>
      <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white">{icon}{title}</h5>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

export default function SiteFooter({ onOpenRdv, onOpenSite }: { onOpenRdv: () => void; onOpenSite: () => void }) {
  return (
    <footer className="d-footer relative z-10 bg-[#00153a] py-10 text-slate-300 sm:py-12" aria-label="Pied de page">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Bandeau supérieur */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <a href="/" aria-label="SOIBY — retour à l’accueil" className="shrink-0">
              <img src="/desktop/logo-footer.png" alt="SOIBY — Respirez on s’occupe de tout !" className="h-16 w-auto" draggable={false} />
            </a>
            <div className="border-l border-white/15 pl-5">
              <h4 className="text-base font-bold leading-tight text-white sm:text-lg lg:text-xl">Votre projet digital, de l’idée à la mise en ligne</h4>
              <p className="mt-0.5 text-sm text-[#ff6b7a] sm:text-base">Sites web • Applications • Plateformes • Cloud</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-end">
            {SOCIALS.map(({ icon: Icon, label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#f2061d]">
                <Icon className="h-5 w-5 text-slate-200 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-8 border-t border-white/15" />

        {/* Colonnes de navigation */}
        <div className="mb-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          <Column index={0} icon={<Heart className="h-4 w-4 fill-[#ff4458] text-[#ff4458]" />} title="À PROPOS">
            <li><a href="/equipe" className={link}>Qui sommes-nous</a></li>
            <li><a href="/equipe" className={link}>Notre équipe</a></li>
            <li><a href="/realisations" className={link}>Nos réalisations</a></li>
            <li><a href="/faq" className={link}>Questions fréquentes</a></li>
          </Column>

          <Column index={1} icon={<Compass className="h-4 w-4 text-[#ff4458]" />} title="NOS SERVICES">
            <li><button type="button" onClick={onOpenSite} className={link}>Création de site dès 189&nbsp;€&nbsp;HT</button></li>
            <li><button type="button" onClick={onOpenRdv} className={link}>Applications &amp; plateformes sur mesure</button></li>
            <li><a href={CLOUD} target="_blank" rel="noopener noreferrer" className={link}>Noms de domaine</a></li>
            <li><a href={CLOUD} target="_blank" rel="noopener noreferrer" className={link}>Hébergement &amp; Cloud</a></li>
          </Column>

          <Column index={2} icon={<User className="h-4 w-4 text-sky-400" />} title="ESPACE CLIENT">
            <li><a href={`${CLOUD}/auth/connexion/`} target="_blank" rel="noopener noreferrer" className={link}>Se connecter</a></li>
            <li><a href={`${CLOUD}/auth/inscription/`} target="_blank" rel="noopener noreferrer" className={link}>Créer un compte</a></li>
            <li><a href={CLOUD} target="_blank" rel="noopener noreferrer" className={link}>SOIBY Cloud</a></li>
          </Column>

          <Column index={3} id="contact" icon={<Mail className="h-4 w-4 text-purple-400" />} title="CONTACT">
            <li><button type="button" onClick={onOpenRdv} className={link}>Prendre rendez-vous</button></li>
            <li><button type="button" onClick={onOpenRdv} className={link}>Demander un devis</button></li>
            <li><a href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a></li>
          </Column>
        </div>

        <div className="mb-8 border-t border-white/15" />

        {/* Chiffres + engagements */}
        <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-1.5 text-sm text-slate-400 lg:justify-start">
              <TrendingUp className="h-4 w-4 text-[#ff4458]" />
              Notre équipe
            </p>
            <p className="mt-1 text-2xl font-bold text-[#ff4458] sm:text-3xl">15 développeurs</p>
            <p className="mt-1 text-xs text-slate-500">6 plateformes en production • Projets web, mobiles, IA et cloud</p>
          </div>

          <div className="w-full lg:w-auto">
            <h5 className="mb-4 text-center text-sm font-semibold tracking-wide text-white lg:text-right">NOS ENGAGEMENTS</h5>
            <div className="flex items-start justify-center lg:justify-end">
              {ENGAGEMENTS.map(({ icon: Icon, label }, index) => (
                <div key={label} className={`flex flex-col items-center gap-2 px-3 text-center sm:px-5 lg:flex-row lg:text-left ${index > 0 ? "border-l border-white/15" : ""}`}>
                  <Icon className="h-6 w-6 shrink-0 text-[#ff4458]" />
                  <p className="max-w-[110px] whitespace-pre-line text-xs leading-snug text-slate-400 lg:max-w-none">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 border-t border-white/15" />

        {/* Écrire + mentions légales */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="border-r border-white/15 pr-4 sm:pr-6">
            <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white"><Mail className="h-4 w-4 text-[#ff4458]" />NOUS ÉCRIRE</h5>
            <p className="text-sm leading-relaxed text-slate-400">
              <a href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a>
              <br />Réponse rapide, devis clair avant tout démarrage.
            </p>
          </div>

          <div className="pl-4 sm:pl-6">
            <h5 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white"><FileText className="h-4 w-4 text-[#ff4458]" />MENTIONS LÉGALES</h5>
            <ul className="space-y-2 text-sm lg:flex lg:flex-wrap lg:items-center lg:gap-x-1 lg:space-y-0">
              <li className="lg:flex lg:items-center">
                <a href="/mentions-legales" className={link}>Mentions légales</a>
                <span className="mx-1.5 hidden text-slate-600 lg:inline">•</span>
              </li>
              <li className="lg:flex lg:items-center"><a href="/politique-confidentialite" className={link}>Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6">
          <p className="text-center text-sm text-slate-400">© 2026 SOIBY SAS • Tous droits réservés</p>
          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-center text-xs leading-relaxed text-slate-500">
            <BadgeCheck className="h-3.5 w-3.5" />
            Studio technologique &amp; éditeur de plateformes • Création de sites, applications et solutions sur mesure
          </p>
        </div>
      </div>
    </footer>
  );
}
