import { useEffect, useState } from "react";
import MobileLanding from "./components/MobileLanding";
import DesktopLanding from "./components/DesktopLanding";

const MOBILE_QUERY = "(max-width: 680px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function LandingMaquette({ onOpenRdv, onOpenSite, onOpenWork }: { onOpenRdv: () => void; onOpenSite: () => void; onOpenWork: (id: string) => void }) {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileLanding onOpenRdv={onOpenRdv} onOpenSite={onOpenSite} onOpenWork={onOpenWork} />;
  return <DesktopLanding onOpenRdv={onOpenRdv} onOpenSite={onOpenSite} onOpenWork={onOpenWork} />;
}
