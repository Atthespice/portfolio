import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { chapters, chapterStatusLabels, projects } from "../content";
import { MediaSlot } from "./MediaSlot";
import { ProjectActions } from "./ProjectActions";
import { useReducedMotion } from "../lib/useReducedMotion";

function useIsWide() {
  const query = "(min-width: 1024px)";
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setWide(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return wide;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ChapterBookProps {
  chapterNumber: number;
  onClose: () => void;
  onNavigate: (chapterNumber: number) => void;
}

/**
 * A chapter opened as a book. Wide screens: a closed book (yellow cover) slides to
 * centre-left while its cover swings open on the spine to reveal a two-page spread.
 * Narrow screens: a single page that flips in. Reduced motion: a plain fade.
 * Behaves as a modal dialog: Esc closes, arrow keys turn pages, focus stays inside.
 */
export function ChapterBook({ chapterNumber, onClose, onNavigate }: ChapterBookProps) {
  const reducedMotion = useReducedMotion();
  const isWide = useIsWide();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousNumber = useRef(chapterNumber);
  const direction = chapterNumber >= previousNumber.current ? 1 : -1;
  // Decided once on open, so turning pages later never replays the cover.
  const [playCover] = useState(() => isWide && !reducedMotion);
  const [coverDone, setCoverDone] = useState(!playCover);

  const index = chapters.findIndex((c) => c.number === chapterNumber);
  const chapter = chapters[index];
  const prev = chapters[index - 1];
  const next = chapters[index + 1];
  const chapterProjects = chapter.projectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);
  const lead = chapterProjects[0];

  useEffect(() => {
    previousNumber.current = chapterNumber;
  }, [chapterNumber]);

  useEffect(() => {
    closeRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && next) onNavigate(next.number);
      else if (event.key === "ArrowLeft" && prev) onNavigate(prev.number);
      else if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, next, prev]);

  const showCover = playCover && !coverDone;

  const pageTurn = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, rotateY: direction * 18, x: direction * 40 },
        animate: { opacity: 1, rotateY: 0, x: 0 },
        exit: { opacity: 0, rotateY: -direction * 18, x: -direction * 40 },
      };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl"
        style={{ perspective: 2200 }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-2 right-0 z-20 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full bg-surface-2 text-mist transition-colors hover:text-yellow"
        >
          <X size={20} />
        </button>

        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d", transformOrigin: isWide ? "center" : "left center" }}
          initial={
            reducedMotion ? { opacity: 0 } : isWide ? { x: "-25%", scale: 0.92 } : { rotateY: -70, opacity: 0 }
          }
          animate={{ x: 0, scale: 1, rotateY: 0, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="max-h-[85svh] overflow-y-auto rounded-2xl shadow-2xl lg:overflow-hidden"
            style={{ perspective: 1600 }}
            initial={{ opacity: playCover ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ delay: playCover ? 0.75 : 0, duration: 0.4 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.number}
                {...pageTurn}
                transition={{ duration: reducedMotion ? 0.12 : 0.3 }}
                className="grid lg:grid-cols-2"
              >
                {/* Left page: the picture and the tech. */}
                <div className="book-page book-page-left order-last flex flex-col gap-5 p-6 sm:p-8 lg:order-none lg:max-h-[85svh] lg:overflow-y-auto">
                  {chapter.screenshotStatus !== "text-only" && lead ? (
                    <MediaSlot
                      slug={lead.slug}
                      alt={`${lead.name} screenshot`}
                      variant={chapter.number}
                      className="aspect-[16/10] w-full rounded-xl"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-xl border border-border bg-ink/60">
                      <span className="text-silver text-6xl font-black" aria-hidden>
                        {String(chapter.number).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  {chapterProjects.map((project) => (
                    <div key={project.slug} className="flex flex-col gap-3">
                      <p className="text-sm font-bold text-mist">{project.name}</p>
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
                      <ProjectActions project={project} />
                    </div>
                  ))}
                </div>

                {/* Right page: the story, in three plain steps. */}
                <div className="book-page book-page-right flex flex-col p-6 sm:p-8 lg:max-h-[85svh] lg:overflow-y-auto">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue">
                    Stop {chapter.number} of {chapters.length} · {chapterStatusLabels[chapter.status]}
                  </p>
                  <h2 id="book-title" className="mt-2 text-3xl font-black uppercase leading-tight text-silver">
                    {chapter.chapterTitle}
                  </h2>

                  <dl className="mt-6 flex flex-col gap-5">
                    {(
                      [
                        ["The problem", chapter.beats.problem],
                        ["What I built", chapter.beats.built],
                        ["Where it is now", chapter.beats.now],
                      ] as const
                    ).map(([label, text]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-yellow">{label}</dt>
                        <dd className="mt-1 text-base leading-relaxed text-mist/85">{text}</dd>
                      </div>
                    ))}
                  </dl>

                  {chapter.stat && (
                    <div className="glass-panel mt-6 w-fit rounded-2xl px-5 py-3">
                      <p className="text-xl font-black text-yellow">{chapter.stat.value}</p>
                      <p className="text-xs uppercase tracking-wide text-mist/60">{chapter.stat.label}</p>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-3 pt-8">
                    <button
                      type="button"
                      disabled={!prev}
                      onClick={() => prev && onNavigate(prev.number)}
                      className="flex min-h-11 flex-shrink-0 items-center gap-1 rounded-full border border-border px-4 text-sm font-medium text-mist transition-colors hover:border-yellow hover:text-yellow disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={16} aria-hidden />
                      Previous
                    </button>
                    <span className="text-xs text-mist/50">
                      {chapter.number} / {chapters.length}
                    </span>
                    <button
                      type="button"
                      disabled={!next}
                      onClick={() => next && onNavigate(next.number)}
                      className="flex min-h-11 flex-shrink-0 items-center gap-1 rounded-full bg-yellow px-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next
                      <ChevronRight size={16} aria-hidden />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {showCover && (
            <motion.div
              aria-hidden
              className="absolute bottom-0 left-1/2 top-0 flex w-1/2 flex-col justify-between rounded-r-2xl bg-yellow p-10 text-ink shadow-2xl"
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              onAnimationComplete={() => setCoverDone(true)}
            >
              <p className="text-sm font-bold uppercase tracking-widest">Stop {chapter.number}</p>
              <p className="text-4xl font-black uppercase leading-tight">{chapter.chapterTitle}</p>
              <p className="text-sm font-black">RM.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
