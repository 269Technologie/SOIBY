/**
 * Client du backend SOIBY-BACK (API REST /api/v1).
 * En développement, le proxy de Vite redirige /api vers le backend (voir vite.config.ts).
 * En production, VITE_API_URL peut pointer vers le backend, ex. https://api.soiby.example/api/v1 (CORS_ORIGINS côté backend).
 */
export const API_URL: string = (import.meta.env.VITE_API_URL?.trim() || "/api/v1").replace(/\/+$/, "");

/** Réponse du backend : { status: "success", data } ou { status: "error", message, retry?, details? }. */
export interface ApiResult<T> { ok: boolean; data?: T; message?: string; retry?: boolean }

export async function apiGet<T>(path: string, params?: Record<string, string>): Promise<ApiResult<T>> {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  try {
    const r = await fetch(`${API_URL}${path}${query}`, { headers: { Accept: "application/json" } });
    const body = await r.json().catch(() => null);
    // Une réponse qui n'a pas l'enveloppe du backend (ex. page HTML d'un serveur sans backend) est une erreur.
    if (r.ok && body?.status === "success" && body.data !== undefined) return { ok: true, data: body.data as T };
    const details = Array.isArray(body?.details) ? body.details[0]?.message : undefined;
    return { ok: false, message: details ?? body?.message, retry: body?.retry === true };
  } catch {
    return { ok: false, retry: true };
  }
}
