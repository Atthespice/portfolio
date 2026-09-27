import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { chapterStatusLabels, projects, type Chapter, type ChapterStatus } from "../content";
import { getProjectImage } from "../lib/projectImages";
import { useReducedMotion } from "../lib/useReducedMotion";
import { MediaSlot } from "./MediaSlot";

// Snake pattern across the width, like a level map: centre, right, centre, left.
const OFFSETS = [0.5, 0.78, 0.5, 0.22];
const NODE_WIDTH = 144; // w-36, the column that holds each stop

const ringByStatus: Record<ChapterStatus, string> = {
  live: "ring-yellow",
  building: "ring-blue",
  done: "ring-silver-bottom",
};

const textByStatus: Record<ChapterStatus, string> = {
  live: "text-yellow",
  building: "text-blue",
  done: "text-mist/60",
};

function offsetStyle(index: number) {
  const offset = OFFSETS[index % OFFSETS.length];
  return { marginLeft: `calc(${offset * 100}% - ${NODE_WIDTH / 2}px)` };
}

export interface EndStop {
  icon: ReactNode;
  label: string;
  sublabel: string;
  /** When set, the end stop is a button (e.g. "go to the next part"). */
  onClick?: () => void;
  ariaLabel?: string;
}

interface StoryPathProps {
  chapters: Chapter[];
  onOpen: (chapterNumber: number) => void;
  endStop: EndStop;
}

/**
 * One part of the /story map: its stops on a winding flight path, ending at an end
 * stop. The path is drawn through the real on-screen centre of each stop (re-measured
 * on resize), so it always passes through them instead of approximating.
 */
export function StoryPath({ chapters, onOpen, endStop }: StoryPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLElement | null)[]>([]);
  const [path, setPath] = useState({ d: "", width: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const box = container.getBoundingClientRect();
      const points = stopRefs.current
        .slice(0, chapters.length + 1)
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
        });

      let d = points.length ? `M ${points[0].x} ${points[0].y}` : "";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const midY = (a.y + b.y) / 2;
        d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
      }
      setPath({ d, width: box.width, height: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [chapters]);

  const endCircleClass =
    "flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-yellow/70 bg-ink text-yellow";

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl px-4 pb-10 sm:px-6">
      <svg className="pointer-events-none absolute inset-0" width={path.width} height={path.height} aria-hidden>
        <path
          d={path.d}
          fill="none"
          stroke="color-mix(in srgb, var(--color-blue) 22%, transparent)"
          strokeWidth={26}
          strokeLinecap="round"
        />
        <path
          d={path.d}
          fill="none"
          stroke="var(--color-yellow)"
          strokeWidth={3}
          strokeDasharray="10 14"
          strokeLinecap="round"
          opacity={0.75}
        />
      </svg>

      <ol className="relative flex flex-col gap-12 sm:gap-16">
        {chapters.map((chapter, index) => {
          const lead = projects.find((p) => p.slug === chapter.projectSlugs[0]);
          const image = lead && chapter.screenshotStatus !== "text-only" ? getProjectImage(lead.slug) : undefined;
          const statusLabel = chapterStatusLabels[chapter.status];

          return (
            <motion.li
              key={chapter.number}
              className="flex"
              initial={reducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex w-36 flex-col items-center text-center" style={offsetStyle(index)}>
                <div className="relative">
                  <button
                    ref={(el) => {
                      stopRefs.current[index] = el;
                    }}
                    id={`stop-${chapter.number}`}
                    type="button"
                    onClick={() => onOpen(chapter.number)}
                    aria-label={`Stop ${chapter.number}: ${chapter.chapterTitle}. ${statusLabel}. Open.`}
                    className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-surface ring-4 ring-offset-4 ring-offset-ink transition-transform duration-200 hover:scale-110 sm:h-28 sm:w-28 ${ringByStatus[chapter.status]}`}
                    style={{ boxShadow: "0 0 32px color-mix(in srgb, var(--color-blue) 35%, transparent)" }}
                  >
                    {image ? (
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <MediaSlot slug={lead?.slug ?? "none"} alt="" variant={chapter.number} className="absolute inset-0" />
                        <span className="text-silver relative text-3xl font-black" aria-hidden>
                          {String(chapter.number).padStart(2, "0")}
                        </span>
                      </>
                    )}
                  </button>
                  <span
                    aria-hidden
                    className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-sm font-black text-ink"
                  >
                    {chapter.number}
                  </span>
                </div>
                <div className="mt-4 rounded-xl bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-sm font-bold leading-snug text-mist">{chapter.chapterTitle}</p>
                  <p className={`mt-0.5 text-xs font-semibold ${textByStatus[chapter.status]}`}>{statusLabel}</p>
                </div>
              </div>
            </motion.li>
          );
        })}

        <li className="flex">
          <div className="flex w-36 flex-col items-center text-center" style={offsetStyle(chapters.length)}>
            {endStop.onClick ? (
              <button
                ref={(el) => {
                  stopRefs.current[chapters.length] = el;
                }}
                type="button"
                onClick={endStop.onClick}
                aria-label={endStop.ariaLabel ?? endStop.label}
                className={`${endCircleClass} transition-colors hover:bg-yellow hover:text-ink`}
              >
                {endStop.icon}
              </button>
            ) : (
              <div
                ref={(el) => {
                  stopRefs.current[chapters.length] = el;
                }}
                aria-hidden
                className={endCircleClass}
              >
                {endStop.icon}
              </div>
            )}
            <div className="mt-3 rounded-xl bg-ink/80 px-3 py-1.5 backdrop-blur-sm" aria-hidden={!endStop.onClick}>
              <p className="text-sm font-bold text-mist">{endStop.label}</p>
              <p className="mt-0.5 text-xs text-mist/55">{endStop.sublabel}</p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}
