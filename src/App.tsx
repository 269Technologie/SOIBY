import { useState } from "react";
import LandingMaquette from "./LandingMaquette";
import RdvModal from "./components/RdvModal";
import SiteWizard from "./components/SiteWizard";
import PortfolioModal from "./components/PortfolioModal";
import { openGoogleBooking } from "./booking";

export default function App() {
  const [isRdvOpen, setIsRdvOpen] = useState(false);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [workId, setWorkId] = useState<string | null>(null);   // réalisation ouverte dans le portfolio interactif

  // « Prendre rendez-vous » : agenda Google Calendar (lien de réservation), sinon fenêtre de réservation interne
  const openRdv = () => { if (!openGoogleBooking()) setIsRdvOpen(true); };

  return <>
    <LandingMaquette onOpenRdv={openRdv} onOpenSite={() => setIsSiteOpen(true)} onOpenWork={setWorkId} />
    <RdvModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
    <SiteWizard isOpen={isSiteOpen} onClose={() => setIsSiteOpen(false)} onRequestQuote={() => { setIsSiteOpen(false); openRdv(); }} />
    <PortfolioModal workId={workId} onClose={() => setWorkId(null)} />
  </>;
}
