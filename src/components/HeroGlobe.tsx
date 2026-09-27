import { lazy, Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RMEmblem } from "./RMEmblem";
import { useReducedMotion } from "../lib/useReducedMotion";
import faceImage from "../assets/face.webp";

// The WebGL globe library is the heaviest thing on Home. Loading it as its own file lets
// the headline and problem box show first on slow mobile data, with a same-size empty
// circle holding the space until the globe arrives.
const Globe = lazy(() => import("./Globe").then((module) => ({ default: module.Globe })));

function PhotoPin() {
  return (
    <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
      <RMEmblem size={112} photoSrc={faceImage} />
      <span className="h-6 w-0.5 bg-gradient-to-b from-yellow to-transparent" />
    </div>
  );
}

/**
 * The hero globe with the owner pinned on Nairobi. Clicking it "launches": the globe
 * zooms in toward the pin while a warp-speed starfield rushes past, then it lands on
 * /story. Under reduced motion it just navigates.
 */
export function HeroGlobe({ label, className = "w-full max-w-[min(540px,88vw)]" }: { label: string; className?: string }) {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [launchOrigin, setLaunchOrigin] = useState<string | null>(null);

  function launch() {
    if (reducedMotion) {
      navigate("/story");
      return;
    }
    // Zoom toward wherever the pin currently sits on the globe.
    const pin = wrapperRef.current?.querySelector<HTMLElement>("[data-globe-pin]");
    setLaunchOrigin(pin ? `${pin.style.left} ${pin.style.top}` : "50% 50%");
  }

  const launching = launchOrigin !== null;

  return (
    <div ref={wrapperRef} className={`relative mx-auto ${className}`}>
      <motion.button
        type="button"
        onClick={launch}
        disabled={launching}
        aria-label={label}
        className="relative block w-full rounded-full"
        style={{ transformOrigin: launchOrigin ?? "50% 50%" }}
        whileHover={launching || reducedMotion ? undefined : { scale: 1.03 }}
        animate={launching ? { scale: 6, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={launching ? { duration: 0.9, ease: [0.7, 0, 0.84, 0] } : { duration: 0.3 }}
        onAnimationComplete={() => {
          if (launching) navigate("/story");
        }}
      >
        <Suspense fallback={<div className="aspect-square w-full rounded-full bg-surface/40" />}>
          <Globe pin={<PhotoPin />} />
        </Suspense>
      </motion.button>

      {launching && (
        <>
          <motion.div
            aria-hidden
            className="bg-stars pointer-events-none fixed inset-0 z-[70]"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 5 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[71] bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.35 }}
          />
        </>
      )}
    </div>
  );
}
