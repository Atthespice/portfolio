import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

interface RMEmblemProps {
  size?: number;
  className?: string;
}

/**
 * The site's signature mark: an RM monogram in a dashed road-ring with signal-wave
 * arcs and yellow/blue orbit lines. Tracks the pointer within its own bounding box
 * and eases toward it (a "magnetic" hover) using spring-smoothed motion values —
 * cheaper than re-rendering on every mousemove since Framer Motion drives the
 * transform directly off the motion values.
 */
export function RMEmblem({ size = 220, className = "" }: RMEmblemProps) {
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
      <svg viewBox="0 0 220 220" width={size} height={size} className="overflow-visible">
        <circle
          cx="110"
          cy="110"
          r="96"
          fill="none"
          stroke="var(--color-yellow)"
          strokeWidth="3"
          strokeDasharray="10 14"
          className={reducedMotion ? "" : "animate-[spin_40s_linear_infinite]"}
          style={{ transformOrigin: "110px 110px" }}
        />
        <circle
          cx="110"
          cy="110"
          r="72"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="1.5"
          opacity="0.55"
          className={reducedMotion ? "" : "animate-[spin_28s_linear_infinite_reverse]"}
          style={{ transformOrigin: "110px 110px" }}
        />
        <path
          d="M 40 150 Q 110 190 180 150"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="2"
          opacity="0.4"
        />
        <path
          d="M 46 60 Q 110 25 174 60"
          fill="none"
          stroke="var(--color-yellow)"
          strokeWidth="2"
          opacity="0.35"
        />
        <text
          x="110"
          y="128"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="64"
          className="text-silver"
          fill="url(#emblemGradientFallback)"
        >
          RM
        </text>
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
