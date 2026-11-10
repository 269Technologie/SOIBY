/**
 * Vérification de disponibilité des noms de domaine via l'API REST « Domain Name API »
 * (https://www.domainnameapi.com) — même logique que cloud-soiby (apps/domains/dna.py).
 *
 * Appels exclusivement côté serveur : le Reseller ID et la clé API viennent des variables d'environnement
 * et ne sont jamais renvoyés au navigateur ni journalisés. Lecture seule (aucun achat n'est déclenché).
 *
 * Environnements : test (OTE) https://ote.domainresellerapi.com/api/v1 — production https://api.domainresellerapi.com/api/v1
 */
import { domainToASCII } from "node:url";

export const PRODUCTION_URL = "https://api.domainresellerapi.com/api/v1";
export const OTE_URL = "https://ote.domainresellerapi.com/api/v1";

/**
 * Prix de VENTE affichés (€ HT pour 1 an), par extension.
 * Le prix renvoyé par l'API est notre coût revendeur en USD : il n'est jamais transmis au navigateur.
 * Une extension absente de cette grille s'affiche « Prix sur demande ».
 */
export const PRICES_EUR_HT = { fr: 14.9, com: 12.9, net: 15.9 };

const RETRY_429_ATTEMPTS = 4; // le fournisseur refuse (HTTP 429) les appels trop simultanés
const RETRY_429_DELAY_MS = 1500;
const AVAILABLE = new Set(["available", "1", "true"]);
const TAKEN = new Set(["notavailable", "unavailable", "not_available", "registered", "taken", "0", "false"]);
const UNSUPPORTED_RE = /suffix|tld|extension/i;

export class DnaError extends Error {}
/** Identifiants absents ou refusés : problème de configuration SOIBY, pas de l'internaute. */
export class DnaConfigError extends DnaError {}

export const DOMAIN_RE = /^(?=.{4,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)\.[a-z0-9-]{2,24}(\.[a-z0-9-]{2,24})?$/;

/** 'https://www.MonSite.com/page' -> 'monsite.com' (IDN converti en ASCII). */
export function normalizeDomain(value) {
  let v = String(value ?? "").trim().toLowerCase().replace(/^[a-z]+:\/\//, "");
  v = v.split("/")[0].split("?")[0].replace(/^\.+|\.+$/g, "");
  if (v.startsWith("www.")) v = v.slice(4);
  return domainToASCII(v) || v;
}

export function sellingPrice(domain, prices = PRICES_EUR_HT) {
  const tld = domain.slice(domain.indexOf(".") + 1);
  return Object.prototype.hasOwnProperty.call(prices, tld) ? prices[tld] : null;
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createDnaClient({ resellerId, apiKey, ote = true, timeoutMs = 30000, fetchImpl = fetch, sleep = wait }) {
  const baseUrl = ote ? OTE_URL : PRODUCTION_URL;

  /** POST domains/bulk-search pour UN nom de domaine complet. -> { domain, status: available | taken | unsupported } */
  async function checkDomain(domain) {
    if (!resellerId || !apiKey) throw new DnaConfigError("Domain Name API non configurée (DNA_RESELLER_ID, DNA_API_KEY).");
    const headers = { "X-API-KEY": apiKey, __reseller: resellerId, "Content-Type": "application/json", Accept: "application/json" };
    let response;
    try {
      for (let attempt = 0; attempt < RETRY_429_ATTEMPTS; attempt++) {
        response = await fetchImpl(`${baseUrl}/domains/bulk-search`, {
          method: "POST", headers, body: JSON.stringify([{ domainName: domain }]), redirect: "manual", signal: AbortSignal.timeout(timeoutMs),
        });
        if (response.status !== 429 || attempt === RETRY_429_ATTEMPTS - 1) break;
        await sleep(RETRY_429_DELAY_MS * (attempt + 1));
      }
    } catch (cause) {
      throw new DnaError(`injoignable (${cause?.name ?? "erreur réseau"})`);
    }
    if ([301, 302, 401, 403].includes(response.status)) throw new DnaConfigError("identifiants refusés");
    if (response.status !== 200) throw new DnaError(`HTTP ${response.status}`);

    let items;
    try { items = (await response.json())?.infos ?? []; } catch { throw new DnaError("réponse invalide"); }
    const item = items.find((i) => i && typeof i === "object" && String(i.domainName ?? "").toLowerCase() === domain);
    if (!item) throw new DnaError("domaine absent de la réponse");

    const status = String(item.status ?? "").trim().toLowerCase();
    if (AVAILABLE.has(status)) return { domain, status: "available" };
    if (TAKEN.has(status)) {
      // « suffix does not exist » : l'extension n'est pas gérée par le registre, le nom n'est pas « pris »
      return { domain, status: UNSUPPORTED_RE.test(String(item.reason ?? "")) ? "unsupported" : "taken" };
    }
    // Statut inconnu ou « ERROR » : on ne dit jamais « disponible » sur une réponse qu'on ne comprend pas
    throw new DnaError(`statut inconnu : ${JSON.stringify(status)}`);
  }
  return { checkDomain };
}

/**
 * Handler Express : GET ?domain=monsite.com ->
 *   { domain, status: "available" | "taken" | "unsupported", available: boolean, price: prix de vente € HT / an | null }
 * Public, lecture seule, limité par adresse IP, résultats mis en cache. Aucune donnée simulée : si le fournisseur
 * ne répond pas, l'erreur est renvoyée telle quelle.
 */
export function createAvailabilityHandler({ client, prices = PRICES_EUR_HT, limitPerMinute = 60, cacheMs = 600_000, now = Date.now, log = console }) {
  const cache = new Map(); // domaine -> { result, expires }
  const hits = new Map(); // ip -> { count, resetAt }

  return async function availability(req, res) {
    const domain = normalizeDomain(req.query.domain);
    if (!DOMAIN_RE.test(domain)) {
      return res.status(400).json({ error: "Saisissez un nom de domaine valide (lettres, chiffres, tirets), par exemple monsite.com." });
    }

    const t = now();
    const ip = req.ip ?? "";
    const slot = hits.get(ip);
    if (!slot || slot.resetAt <= t) hits.set(ip, { count: 1, resetAt: t + 60_000 });
    else if (++slot.count > limitPerMinute) return res.status(429).json({ error: "Trop de recherches. Réessayez dans une minute." });
    if (hits.size > 5000) for (const [key, value] of hits) if (value.resetAt <= t) hits.delete(key);

    const cached = cache.get(domain);
    if (cached && cached.expires > t) return res.json(cached.result);

    let check;
    try {
      check = await client.checkDomain(domain);
    } catch (error) {
      log.error(`[domains] vérification impossible pour ${domain} : ${error instanceof DnaError ? error.message : "erreur inattendue"}`);
      return res.status(503).json({ error: "La vérification est momentanément indisponible. Veuillez réessayer.", retry: true });
    }
    const available = check.status === "available";
    const result = { domain: check.domain, status: check.status, available, price: available ? sellingPrice(check.domain, prices) : null };
    cache.set(domain, { result, expires: t + cacheMs });
    res.json(result);
  };
}
