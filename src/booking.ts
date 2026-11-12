import { apiGet } from "./api";

/**
 * Prise de rendez-vous : lien de réservation Google Calendar, fourni par le backend (GET /api/v1/booking,
 * variable GOOGLE_BOOKING_URL côté SOIBY-BACK).
 * Le lien est chargé au démarrage de l'application pour que « Prendre rendez-vous » reste synchrone : un window.open
 * lancé après une attente réseau serait bloqué par le navigateur. Tant qu'il n'est pas disponible (non configuré ou
 * backend injoignable), le bouton garde la fenêtre de réservation interne.
 */
let bookingUrl: string | undefined;

export async function loadBookingUrl(): Promise<void> {
  const result = await apiGet<{ url: string | null }>("/booking");
  bookingUrl = result.ok ? result.data?.url?.trim() || undefined : undefined;
}

/** Ouvre la page de réservation Google Calendar dans un nouvel onglet ; renvoie false si aucun lien n'est disponible. */
export function openGoogleBooking(): boolean {
  if (!bookingUrl) return false;
  window.open(bookingUrl, "_blank", "noopener,noreferrer");
  return true;
}
