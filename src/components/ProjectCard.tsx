import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../content";
import { MediaSlot } from "./MediaSlot";
import { GithubMark } from "./icons/GithubMark";
import { useReducedMotion } from "../lib/useReducedMotion";

interface ProjectCardProps {
  project: Project;
  variant?: number;
  size?: "default" | "large";
}

/**
 * §6 tile: mesh/screenshot media slot, tech-tag chips, and the repo/live button
 * rules from the spec. Hover tilt is a small rotateX/rotateY driven by pointer
 * position within the card, springed for a soft parallax feel; skipped entirely
 * under prefers-reduced-motion (§9).
 */
export function ProjectCard({ project, variant = 0, size = "default" }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });
  const glowX = useTransform(rotateY, (v) => 50 + v * 3);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateXRaw.set(py * -8);
    rotateYRaw.set(px * 8);
  }

  function handleMouseLeave() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative">
        <MediaSlot slug={project.slug} alt={`${project.name} preview`} variant={variant} className="aspect-[16/10] w-full" />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              glowX,
              (x) => `radial-gradient(circle at ${x}% 0%, color-mix(in srgb, var(--color-yellow) 25%, transparent), transparent 60%)`,
            ),
          }}
        />
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${size === "large" ? "p-6" : "p-5"}`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue">{project.role}</p>
          <h3 className={`mt-1 font-bold text-mist ${size === "large" ? "text-2xl" : "text-xl"}`}>{project.name}</h3>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-mist/75">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-mist/85"
            >
              {tech}
            </span>
          ))}
        </div>

        {!project.hideButtons && (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-mist transition-colors hover:border-yellow hover:text-yellow"
              >
                <GithubMark size={16} />
                View Repo
              </a>
            )}

            {project.badge ? (
              <span className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-blue/50 bg-blue/10 px-4 text-sm font-medium text-blue">
                {project.badge}
              </span>
            ) : project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                <ExternalLink size={16} aria-hidden />
                Live Project
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="flex min-h-11 flex-shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-mist/40"
              >
                Live link coming soon
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
