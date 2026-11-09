/**
 * Prise de rendez-vous : lien de réservation Google Calendar (page de réservation du compte recruoff@gmail.com).
 * À renseigner dans .env : VITE_GOOGLE_BOOKING_URL=https://calendar.app.google/xxxxxxxx
 * Tant qu'il n'est pas renseigné, le bouton « Prendre rendez-vous » garde la fenêtre de réservation interne.
 */
export const BOOKING_URL: string | undefined = import.meta.env.VITE_GOOGLE_BOOKING_URL?.trim() || undefined;

/** Ouvre la page de réservation Google Calendar dans un nouvel onglet ; renvoie false si aucun lien n'est configuré. */
export function openGoogleBooking(): boolean {
  if (!BOOKING_URL) return false;
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  return true;
}
