import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../content";
import { MediaSlot } from "./MediaSlot";
import { useReducedMotion } from "../lib/useReducedMotion";

const row1 = [...projects, ...projects];
const row2 = [...projects].reverse().concat([...projects].reverse());

function MarqueeRow({ items, direction, progress }: { items: typeof projects; direction: 1 | -1; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const x = useTransform(progress, [0, 1], direction === 1 ? ["0%", "-30%"] : ["-30%", "0%"]);

  return (
    <motion.div style={{ x }} className="flex gap-5">
      {items.map((project, index) => (
        <div key={`${project.slug}-${index}`} className="glass-panel w-64 flex-shrink-0 overflow-hidden rounded-2xl sm:w-80">
          <MediaSlot slug={project.slug} alt="" variant={index} className="aspect-[16/10] w-full" />
          <div className="p-3">
            <p className="truncate text-sm font-semibold text-mist">{project.name}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/**
 * Dual-row scroll-driven marquee (§2/§8): each row's horizontal position is tied
 * to page scroll progress via useScroll/useTransform (not a CSS keyframe loop),
 * so the drift is literally driven by how far the visitor has scrolled. Rows run
 * opposite directions for the crossing effect. Disabled to a static grid under
 * prefers-reduced-motion (§9).
 */
export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  if (reducedMotion) {
    return (
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 overflow-hidden px-4 py-16 sm:grid-cols-4 sm:px-6">
        {projects.map((project, index) => (
          <div key={project.slug} className="glass-panel overflow-hidden rounded-2xl">
            <MediaSlot slug={project.slug} alt="" variant={index} className="aspect-[16/10] w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-5 overflow-hidden py-16">
      <MarqueeRow items={row1} direction={1} progress={scrollYProgress} />
      <MarqueeRow items={row2} direction={-1} progress={scrollYProgress} />
    </div>
  );
}
