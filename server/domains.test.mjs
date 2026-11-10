// Tests : aucun appel réseau, `fetch` est simulé avec des réponses calquées sur celles du fournisseur.
import assert from "node:assert/strict";
import test from "node:test";
import { DnaConfigError, DnaError, createAvailabilityHandler, createDnaClient, normalizeDomain, sellingPrice } from "./domains.mjs";

const reply = (domain, status, extra = {}) => ({
  status: 200,
  json: async () => ({ success: true, infos: [{ domainName: domain, status, price: 11.99, currency: "USD", ...extra }] }),
});
const client = (fetchImpl, opts = {}) => createDnaClient({ resellerId: "11111111-2222", apiKey: "SECRET-KEY", ote: true, fetchImpl, sleep: async () => {}, ...opts });

function run(handler, query, ip = "1.2.3.4") {
  return new Promise((resolve) => {
    const res = { code: 200, status(c) { this.code = c; return this; }, json(body) { resolve({ code: this.code, body }); } };
    handler({ query, ip }, res);
  });
}
const silent = { error() {} };

test("normalizeDomain nettoie la saisie", () => {
  assert.equal(normalizeDomain(" https://www.MonSite.com/accueil?x=1 "), "monsite.com");
  assert.equal(normalizeDomain("café.fr"), "xn--caf-dma.fr");
});

test("sellingPrice : grille de vente, jamais le coût fournisseur", () => {
  assert.equal(sellingPrice("monsite.com"), 12.9);
  assert.equal(sellingPrice("monsite.org"), null);
});

test("disponible / pris / extension non gérée", async () => {
  assert.deepEqual(await client(async () => reply("a.com", "AVAILABLE")).checkDomain("a.com"), { domain: "a.com", status: "available" });
  assert.equal((await client(async () => reply("a.com", "NOTAVAILABLE", { reason: "Domain exists" })).checkDomain("a.com")).status, "taken");
  assert.equal((await client(async () => reply("a.zz", "NOTAVAILABLE", { reason: "suffix does not exist" })).checkDomain("a.zz")).status, "unsupported");
});

test("un statut inconnu n'est jamais « disponible »", async () => {
  await assert.rejects(client(async () => reply("a.com", "ERROR")).checkDomain("a.com"), DnaError);
  await assert.rejects(client(async () => ({ status: 200, json: async () => ({ infos: [] }) })).checkDomain("a.com"), DnaError);
});

test("identifiants absents ou refusés = erreur de configuration", async () => {
  await assert.rejects(client(async () => reply("a.com", "AVAILABLE"), { apiKey: "" }).checkDomain("a.com"), DnaConfigError);
  for (const status of [401, 403, 302]) await assert.rejects(client(async () => ({ status })).checkDomain("a.com"), DnaConfigError);
});

test("les identifiants ne partent que dans les en-têtes", async () => {
  let call;
  await client(async (url, init) => { call = { url, init }; return reply("a.com", "AVAILABLE"); }).checkDomain("a.com");
  assert.match(call.url, /^https:\/\/ote\.domainresellerapi\.com\/api\/v1\/domains\/bulk-search$/);
  assert.equal(call.init.headers["X-API-KEY"], "SECRET-KEY");
  assert.equal(call.init.body, JSON.stringify([{ domainName: "a.com" }]));
  assert.ok(!call.url.includes("SECRET"));
  await client(async (url) => { call = { url }; return reply("a.com", "AVAILABLE"); }, { ote: false }).checkDomain("a.com");
  assert.match(call.url, /^https:\/\/api\.domainresellerapi\.com/);
});

test("HTTP 429 : nouvelle tentative", async () => {
  const answers = [{ status: 429 }, { status: 429 }, reply("a.com", "AVAILABLE")];
  const c = client(async () => answers.shift());
  assert.equal((await c.checkDomain("a.com")).status, "available");
});

test("fournisseur indisponible ou injoignable", async () => {
  await assert.rejects(client(async () => ({ status: 503 })).checkDomain("a.com"), DnaError);
  await assert.rejects(client(async () => { throw new Error("timeout"); }).checkDomain("a.com"), DnaError);
});

test("route : prix de vente renvoyé, coût fournisseur jamais exposé", async () => {
  const handler = createAvailabilityHandler({ client: client(async () => reply("monsite.com", "AVAILABLE")), log: silent });
  const { code, body } = await run(handler, { domain: "MonSite.com" });
  assert.equal(code, 200);
  assert.deepEqual(body, { domain: "monsite.com", status: "available", available: true, price: 12.9 });
  assert.ok(!JSON.stringify(body).includes("11.99"));
});

test("route : pas de prix si pris ou si extension non tarifée", async () => {
  const taken = createAvailabilityHandler({ client: client(async () => reply("monsite.com", "NOTAVAILABLE")), log: silent });
  assert.equal((await run(taken, { domain: "monsite.com" })).body.price, null);
  const org = createAvailabilityHandler({ client: client(async () => reply("monsite.org", "AVAILABLE")), log: silent });
  const { body } = await run(org, { domain: "monsite.org" });
  assert.equal(body.available, true);
  assert.equal(body.price, null);
});

test("route : saisie invalide = 400 sans appel au fournisseur", async () => {
  let calls = 0;
  const handler = createAvailabilityHandler({ client: client(async () => { calls++; return reply("a.com", "AVAILABLE"); }), log: silent });
  for (const bad of ["", "monsite", "-bad-.com", "a b.com", `${"x".repeat(64)}.com`, "monsite.c"]) assert.equal((await run(handler, { domain: bad })).code, 400, bad);
  assert.equal(calls, 0);
});

test("route : panne fournisseur = 503 sans fausse réponse ni fuite", async () => {
  const handler = createAvailabilityHandler({ client: client(async () => ({ status: 401 })), log: silent });
  const { code, body } = await run(handler, { domain: "monsite.com" });
  assert.equal(code, 503);
  assert.equal(body.retry, true);
  assert.ok(!("available" in body));
  assert.ok(!JSON.stringify(body).includes("SECRET"));
});

test("route : succès mis en cache, échecs jamais", async () => {
  let calls = 0;
  let fail = true;
  const handler = createAvailabilityHandler({ client: client(async () => { calls++; return fail ? { status: 503 } : reply("monsite.com", "AVAILABLE"); }), log: silent });
  assert.equal((await run(handler, { domain: "monsite.com" })).code, 503);
  fail = false;
  assert.equal((await run(handler, { domain: "monsite.com" })).code, 200);
  await run(handler, { domain: "monsite.com" });
  assert.equal(calls, 2);
});

test("route : limitation par adresse IP", async () => {
  const handler = createAvailabilityHandler({ client: client(async () => reply("monsite.com", "AVAILABLE")), limitPerMinute: 3, log: silent });
  const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await run(handler, { domain: "monsite.com" })).code);
  assert.deepEqual(codes, [200, 200, 200, 429, 429]);
  assert.equal((await run(handler, { domain: "monsite.com" }, "9.9.9.9")).code, 200);
});
