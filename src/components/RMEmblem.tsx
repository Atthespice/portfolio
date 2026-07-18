import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

interface RMEmblemProps {
  size?: number;
  className?: string;
  /** Personal photo/illustration clipped into the center circle. Falls back to the "RM" monogram when omitted. */
  photoSrc?: string;
}

/**
 * The site's signature mark: a dashed road-ring with signal-wave arcs and
 * yellow/blue orbit lines, framing either the "RM" monogram or (when `photoSrc`
 * is given) a circular-clipped personal photo. Tracks the pointer within its own
 * bounding box and eases toward it (a "magnetic" hover) using spring-smoothed
 * motion values — cheaper than re-rendering on every mousemove since Framer
 * Motion drives the transform directly off the motion values.
 */
export function RMEmblem({ size = 220, className = "", photoSrc }: RMEmblemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const relX = event.clientX - bounds.left - bounds.width / 2;
    const relY = event.clientY - bounds.top - bounds.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, width: size, height: size }}
      className={`relative flex items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 260 260" width={size} height={size} className="overflow-visible">
        <circle
          cx="130"
          cy="130"
          r="124"
          fill="none"
          stroke="var(--color-yellow)"
          strokeWidth="3"
          strokeDasharray="11 15"
          className={reducedMotion ? "" : "animate-[spin_40s_linear_infinite]"}
          style={{ transformOrigin: "130px 130px" }}
        />
        <circle
          cx="130"
          cy="130"
          r="102"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="1.5"
          opacity="0.55"
          className={reducedMotion ? "" : "animate-[spin_28s_linear_infinite_reverse]"}
          style={{ transformOrigin: "130px 130px" }}
        />
        <path
          d="M 44 176 Q 130 218 216 176"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          d="M 52 68 Q 130 28 208 68"
          fill="none"
          stroke="var(--color-yellow)"
          strokeWidth="2"
          opacity="0.35"
        />
        {photoSrc ? (
          <>
            <clipPath id="emblemPhotoClip">
              <circle cx="130" cy="130" r="82" />
            </clipPath>
            <image
              href={photoSrc}
              x="48"
              y="48"
              width="164"
              height="164"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#emblemPhotoClip)"
            />
            <circle cx="130" cy="130" r="82" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          </>
        ) : (
          <text
            x="130"
            y="148"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize="64"
            className="text-silver"
            fill="url(#emblemGradientFallback)"
          >
            RM
          </text>
        )}
        <defs>
          <linearGradient id="emblemGradientFallback" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-silver-top)" />
            <stop offset="100%" stopColor="var(--color-silver-bottom)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
