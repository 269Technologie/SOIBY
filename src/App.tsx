import { useEffect, useState } from "react";
import LandingMaquette from "./LandingMaquette";
import RdvModal from "./components/RdvModal";
import SiteWizard from "./components/SiteWizard";
import PortfolioModal from "./components/PortfolioModal";
import DomainSearchModal from "./components/DomainSearchModal";
import { loadBookingUrl, openGoogleBooking } from "./booking";

export default function App() {
  const [isRdvOpen, setIsRdvOpen] = useState(false);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [domainQuery, setDomainQuery] = useState<string | null>(null);   // recherche de domaine ouverte (texte saisi sur l'accueil)
  const [rdvNotes, setRdvNotes] = useState("");   // besoin pré-rempli (réservation / transfert de domaine)
  const [workId, setWorkId] = useState<string | null>(null);   // réalisation ouverte dans le portfolio interactif

  useEffect(() => { void loadBookingUrl(); }, []);

  // « Prendre rendez-vous » : agenda Google Calendar (lien de réservation), sinon fenêtre de réservation interne
  const openRdv = (notes = "") => { if (!openGoogleBooking()) { setRdvNotes(notes); setIsRdvOpen(true); } };

  return <>
    <LandingMaquette onOpenRdv={() => openRdv()} onOpenSite={() => setIsSiteOpen(true)} onOpenWork={setWorkId} onOpenDomain={setDomainQuery} />
    <RdvModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} presetNotes={rdvNotes} />
    <SiteWizard isOpen={isSiteOpen} onClose={() => setIsSiteOpen(false)} onRequestQuote={() => { setIsSiteOpen(false); openRdv(); }} />
    <DomainSearchModal isOpen={domainQuery !== null} initialQuery={domainQuery ?? ""} onClose={() => setDomainQuery(null)} onRequestRdv={(notes) => { setDomainQuery(null); openRdv(notes); }} />
    <PortfolioModal workId={workId} onClose={() => setWorkId(null)} />
  </>;
}
