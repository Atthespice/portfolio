import { useEffect, useRef, type ReactNode } from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "../lib/useReducedMotion";

const NAIROBI: [number, number] = [-1.2921, 36.8219];
const MARKER_ID = "nairobi";

// cobe's phi/theta for a lat/long, so the globe faces Nairobi.
function anglesFor([lat, long]: [number, number]): [number, number] {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

interface GlobeProps {
  className?: string;
  /** Rendered pinned to Nairobi, following it as the globe sways. */
  pin?: ReactNode;
}

/**
 * Dotted WebGL Earth with a Nairobi marker. It sways gently around Kenya rather
 * than spinning a full turn, so the pin never rotates round the back. Holds still
 * under prefers-reduced-motion.
 *
 * The pin follows cobe's own marker anchor (it writes the marker's projected
 * position onto a 1px div as left/top percentages). We copy those numbers onto the
 * pin each frame instead of using CSS anchor positioning, which not every browser
 * supports yet.
 */
export function Globe({ className = "", pin }: GlobeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const [basePhi, baseTheta] = anglesFor(NAIROBI);
    const theta = baseTheta + 0.3;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: basePhi,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.25, 0.27, 0.32],
      markerColor: [245 / 255, 185 / 255, 33 / 255],
      glowColor: [0.15, 0.25, 0.55],
      markers: [{ location: NAIROBI, size: 0.07, id: MARKER_ID }],
    });

    const syncPin = () => {
      const anchor = wrapper.querySelector<HTMLDivElement>(`div[style*="--cobe-${MARKER_ID}"]`);
      if (anchor && pinRef.current) {
        pinRef.current.style.left = anchor.style.left;
        pinRef.current.style.top = anchor.style.top;
        pinRef.current.style.opacity = "1";
      }
    };

    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * dpr, height: width * dpr });
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      globe.update({ phi: basePhi + Math.sin(t * 0.25) * 0.5 });
      syncPin();
      frame = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      // One render so the anchor exists, then stop.
      frame = requestAnimationFrame(() => {
        globe.update({ phi: basePhi });
        requestAnimationFrame(syncPin);
      });
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} className={`relative aspect-square w-full ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" style={{ contain: "layout paint size" }} />
      {pin && (
        <div
          ref={pinRef}
          data-globe-pin
          className="pointer-events-none absolute opacity-0 transition-opacity duration-500"
          style={{ left: "50%", top: "50%" }}
        >
          {pin}
        </div>
      )}
    </div>
  );
}
