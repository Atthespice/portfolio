import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "../content";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotion } from "../lib/useReducedMotion";

interface StackCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const SCALE_STEP = 0.03;
const STICKY_OFFSET = 28;

function StackCard({ project, index, total, containerRef }: StackCardProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const targetScale = 1 - (total - index) * SCALE_STEP;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div className="sticky" style={{ top: `${96 + index * STICKY_OFFSET}px` }}>
      <motion.div style={{ scale }} className="origin-top">
        <ProjectCard project={project} variant={index} size="large" />
      </motion.div>
    </div>
  );
}

/**
 * The 3 featured Home cards stack and scale down as the next one scrolls over
 * it (§8): scale step 0.03, sticky offset 28px, driven by useScroll/useTransform
 * against a shared tall container so each card's progress range is a slice of
 * the whole scroll distance. Falls back to a plain stacked list — no sticky,
 * no scaling — under prefers-reduced-motion (§9).
 */
export function StackingProjects({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} variant={index} size="large" />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl px-4 sm:px-6" style={{ height: `${projects.length * 90}vh` }}>
      {projects.map((project, index) => (
        <StackCard key={project.slug} project={project} index={index} total={projects.length} containerRef={containerRef} />
      ))}
    </div>
  );
}
