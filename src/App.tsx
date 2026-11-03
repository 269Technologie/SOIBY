import { useState } from "react";
import LandingMaquette from "./LandingMaquette";
import RdvModal from "./components/RdvModal";

export default function App() {
  const [isRdvOpen, setIsRdvOpen] = useState(false);

  return <>
    <LandingMaquette onOpenRdv={() => setIsRdvOpen(true)} />
    <RdvModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
  </>;
}
