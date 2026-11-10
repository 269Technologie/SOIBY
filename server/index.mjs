/**
 * Serveur SOIBY : API de recherche de domaines (/api/domains/check).
 *
 * Lancement : `node server/index.mjs` (port 3013 par défaut). Le proxy de Vite (vite.config.ts) redirige /api vers ce serveur.
 * Variables d'environnement lues dans .env (jamais exposées au navigateur) : DNA_RESELLER_ID, DNA_API_KEY, DNA_OTE (true = serveur de test).
 */
import { config } from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAvailabilityHandler, createDnaClient } from "./domains.mjs";

config({ path: ".env.local" });
config();

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const production = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3013;

const falsy = (value) => ["false", "0", "no", "off"].includes(String(value ?? "").trim().toLowerCase());
const client = createDnaClient({
  resellerId: process.env.DNA_RESELLER_ID ?? "",
  apiKey: process.env.DNA_API_KEY ?? "",
  ote: !falsy(process.env.DNA_OTE ?? "true"),
  timeoutMs: Number(process.env.DNA_TIMEOUT) * 1000 || 30000,
});

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1); // derrière l'ingress : IP réelle du visiteur pour la limitation de débit
app.get("/api/domains/check", createAvailabilityHandler({ client }));
app.use("/api", (_req, res) => res.status(404).json({ error: "Introuvable." }));

const dist = path.join(root, "dist");
if (production && fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(port, "0.0.0.0", () => {
  console.log(`[soiby] serveur prêt sur le port ${port}${production ? " (production)" : ""}`);
  if (!process.env.DNA_RESELLER_ID || !process.env.DNA_API_KEY) console.warn("[soiby] Domain Name API non configurée : la recherche de domaines renverra une erreur.");
});
