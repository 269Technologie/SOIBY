import { useEffect, useRef, type CSSProperties } from "react";

interface AutoVideoProps { src: string; poster?: string; className?: string; style?: CSSProperties }

/**
 * Vidéo décorative toujours en lecture : lancée automatiquement, muette, en boucle, sans commandes.
 * Si le navigateur la met en pause (économie d'énergie, onglet masqué…), la lecture reprend d'elle-même.
 */
export default function AutoVideo({ src, poster, className, style }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;          // l'attribut React « muted » n'est pas toujours appliqué : sans cela, la lecture auto est refusée
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    const play = () => { if (!document.hidden && video.paused) void video.play().catch(() => undefined); };
    play();
    const events = ["loadeddata", "canplay", "pause", "stalled"] as const;
    events.forEach((name) => video.addEventListener(name, play));
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", play, { passive: true }); // iOS en économie d'énergie : reprend au premier toucher
    return () => {
      events.forEach((name) => video.removeEventListener(name, play));
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", play);
    };
  }, [src]);

  return (
    <video
      ref={ref} className={className} style={style} src={src} poster={poster}
      autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}
      disablePictureInPicture disableRemotePlayback
    />
  );
}
