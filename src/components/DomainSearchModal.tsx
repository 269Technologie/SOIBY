import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowRightLeft, CalendarDays, Check, Info, Loader2, Search, ShoppingCart, X } from "lucide-react";
import { apiGet } from "../api";
import "../domain-search.css";

/**
 * Recherche et gestion de nom de domaine.
 * Interroge GET /api/v1/domains/check (backend SOIBY-BACK) : la clé du fournisseur ne quitte jamais le serveur.
 * Aucun achat ici : « Réserver » / « Transférer » ouvrent la prise de rendez-vous avec le besoin pré-rempli.
 */
const TLDS = ["fr", "com", "net", "org", "info"];
const CONCURRENCY = 2; // le fournisseur refuse les appels trop simultanés

type Row =
  | { domain: string; state: "loading" }
  | { domain: string; state: "available"; price: number | null }
  | { domain: string; state: "taken" | "unsupported" | "error"; message?: string };

const euro = (n: number) => `${n.toFixed(2).replace(".", ",")} € HT / an`;

/** « MonSite.com » -> « monsite », « monsite.fr » -> « monsite » (le nom sans extension, normalisé). */
function baseName(input: string) {
  const v = input.trim().toLowerCase().replace(/^[a-z]+:\/\//, "").split("/")[0].replace(/^www\./, "");
  return v.split(".")[0].normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
}

async function check(domain: string): Promise<Row> {
  const result = await apiGet<{ status?: string; price?: number | null }>("/domains/check", { domain });
  if (!result.ok) return { domain, state: "error", message: result.message ?? "Vérification indisponible." };
  // Jamais « pris » par défaut : un statut inattendu est une erreur.
  const { status, price } = result.data ?? {};
  if (status === "available") return { domain, state: "available", price: typeof price === "number" ? price : null };
  if (status === "taken") return { domain, state: "taken" };
  if (status === "unsupported") return { domain, state: "unsupported" };
  return { domain, state: "error", message: "Vérification indisponible." };
}

export default function DomainSearchModal({ isOpen, initialQuery = "", onClose, onRequestRdv }: { isOpen: boolean; initialQuery?: string; onClose: () => void; onRequestRdv: (notes: string) => void }) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [searched, setSearched] = useState("");
  const [invalid, setInvalid] = useState(false);
  const run = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); run.current++; };
  }, [isOpen, onClose]);

  // Recherche saisie sur la page d'accueil : la fenêtre s'ouvre avec le champ rempli et lance la recherche
  useEffect(() => {
    if (!isOpen) return;
    setQuery(initialQuery);
    setRows([]); setSearched(""); setInvalid(false);
    if (initialQuery.trim()) void search(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  async function search(value: string) {
    const name = baseName(value);
    if (name.length < 2) { setInvalid(true); setRows([]); setSearched(""); return; }
    setInvalid(false);
    setSearched(name);
    const id = ++run.current;
    // l'extension saisie par l'internaute (ex. monsite.io) passe en premier
    const typed = value.trim().toLowerCase().replace(/^[a-z]+:\/\//, "").split("/")[0].replace(/^www\./, "");
    const typedTld = typed.includes(".") ? typed.split(".").slice(1).join(".").replace(/[^a-z0-9.-]/g, "") : "";
    const tlds = typedTld && !TLDS.includes(typedTld) ? [typedTld, ...TLDS] : TLDS;
    const domains = tlds.map((t) => `${name}.${t}`);
    setRows(domains.map((domain) => ({ domain, state: "loading" })));
    let next = 0;
    const worker = async () => {
      while (next < domains.length) {
        const domain = domains[next++];
        const row = await check(domain);
        if (run.current !== id) return;
        setRows((current) => current.map((r) => (r.domain === domain ? row : r)));
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  }

  const submit = (e: FormEvent) => { e.preventDefault(); void search(query); };

  const busy = rows.some((r) => r.state === "loading");

  return (
    <div className="ds-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ds-card" role="dialog" aria-modal="true" aria-labelledby="ds-title">
        <header className="ds-head">
          <img className="ds-logo" src="/logoversion.png" alt="SOIBY — Respirez on s’occupe de tout !" draggable={false} />
          <h2 id="ds-title">Recherche et gestion de nom de domaine</h2>
          <button type="button" className="ds-close" onClick={onClose} aria-label="Fermer"><X strokeWidth={3} /></button>
        </header>

        <form className="ds-form" onSubmit={submit} role="search">
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="monsite.com" aria-label="Nom de domaine à rechercher" autoComplete="off" autoCapitalize="none" spellCheck={false} />
          <button type="submit" disabled={busy}>{busy ? <Loader2 className="ds-spin" aria-hidden="true" /> : <Search aria-hidden="true" strokeWidth={2.6} />}Rechercher</button>
        </form>
        {invalid && <p className="ds-warn" role="alert">Saisissez un nom de domaine valide (lettres, chiffres, tirets), par exemple monsite.com.</p>}

        {rows.length > 0 && (
          <ul className="ds-rows" aria-live="polite" aria-label={`Résultats pour ${searched}`}>
            {rows.map((r) => (
              <li key={r.domain} className={`ds-row ds-${r.state}`}>
                <strong>{r.domain}</strong>
                {r.state === "loading" && <span className="ds-badge"><Loader2 className="ds-spin" aria-hidden="true" />Vérification…</span>}
                {r.state === "available" && <>
                  <span className="ds-badge ok"><i><Check aria-hidden="true" strokeWidth={3.4} /></i>Disponible</span>
                  <span className="ds-price">{r.price != null ? <>{euro(r.price)}<Info aria-hidden="true" /></> : "Prix sur demande"}</span>
                  <button type="button" className="buy" onClick={() => onRequestRdv(`Réservation du nom de domaine ${r.domain}`)}><ShoppingCart aria-hidden="true" />Réserver ce domaine</button>
                </>}
                {r.state === "taken" && <>
                  <span className="ds-badge ko"><i><X aria-hidden="true" strokeWidth={3.4} /></i>Déjà pris</span>
                  <span className="ds-note">Ce nom de domaine est déjà enregistré.</span>
                  <span className="ds-transfer">
                    <button type="button" className="ghost" onClick={() => onRequestRdv(`Transfert du nom de domaine ${r.domain} vers SOIBY`)}><ArrowRightLeft aria-hidden="true" />Transférer mon domaine</button>
                    <small>(si vous en êtes le propriétaire)</small>
                  </span>
                </>}
                {r.state === "unsupported" && <><span className="ds-badge">Extension non gérée</span><span className="ds-note" /><span /></>}
                {r.state === "error" && <><span className="ds-badge ko">{r.message}</span><span className="ds-note" /><span /></>}
              </li>
            ))}
          </ul>
        )}

        <div className="ds-panels">
          <div className="ds-panel-info">
            <Info aria-hidden="true" />
            <div>
              <h3>Vous possédez déjà ce domaine chez un autre prestataire ?</h3>
              <p>Transférez-le vers SOIBY et centralisez la gestion (nom de domaine, site web, emails, hébergement).</p>
            </div>
          </div>
          <div className="ds-panel-help">
            <CalendarDays aria-hidden="true" />
            <div>
              <h3>Besoin d’aide ou d’un conseil ?</h3>
              <p>Réservez un rendez-vous avec un expert SOIBY.</p>
              <button type="button" onClick={() => onRequestRdv("Question sur un nom de domaine")}>Réserver un rendez-vous<ArrowRight aria-hidden="true" strokeWidth={2.6} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
