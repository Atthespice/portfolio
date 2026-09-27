import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Rocket } from "lucide-react";
import { chapters, storyEpilogue, storyParts } from "../content";
import { StoryPath, type EndStop } from "../components/StoryPath";
import { ChapterBook } from "../components/ChapterBook";
import { useReducedMotion } from "../lib/useReducedMotion";

function chapterFromHash(hash: string): number | null {
  const match = hash.match(/^#chapter-(\d+)$/);
  if (!match) return null;
  const n = Number(match[1]);
  return chapters.some((c) => c.number === n) ? n : null;
}

function partOf(chapterNumber: number): number {
  return storyParts.find((part) => part.chapterNumbers.includes(chapterNumber))?.number ?? storyParts[0].number;
}

export function Story() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [openNumber, setOpenNumber] = useState<number | null>(() => chapterFromHash(location.hash));
  const [activePart, setActivePart] = useState(() => {
    const fromHash = chapterFromHash(location.hash);
    return fromHash !== null ? partOf(fromHash) : storyParts[0].number;
  });
  const [partDirection, setPartDirection] = useState(1);

  const part = storyParts.find((p) => p.number === activePart) ?? storyParts[0];
  const partChapters = part.chapterNumbers
    .map((n) => chapters.find((c) => c.number === n))
    .filter((c) => c !== undefined);
  const nextPart = storyParts.find((p) => p.number === activePart + 1);

  const goToPart = useCallback(
    (n: number, scroll = false) => {
      setPartDirection(n >= activePart ? 1 : -1);
      setActivePart(n);
      if (scroll) pickerRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    },
    [activePart, reducedMotion],
  );

  // Search results link to /story#chapter-N: open that stop (and its part) straight away.
  useEffect(() => {
    const n = chapterFromHash(location.hash);
    if (n !== null) {
      setOpenNumber(n);
      setActivePart(partOf(n));
    }
  }, [location.hash]);

  const openChapter = useCallback((n: number) => {
    setOpenNumber(n);
    setActivePart(partOf(n));
    window.history.replaceState(null, "", `#chapter-${n}`);
  }, []);

  const closeBook = useCallback(() => {
    setOpenNumber((last) => {
      if (last !== null) requestAnimationFrame(() => document.getElementById(`stop-${last}`)?.focus());
      return null;
    });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const endStop: EndStop = nextPart
    ? {
        icon: <ArrowDown size={26} />,
        label: `Next: Part ${nextPart.number}`,
        sublabel: nextPart.title,
        onClick: () => goToPart(nextPart.number, true),
        ariaLabel: `Go to Part ${nextPart.number}: ${nextPart.title}`,
      }
    : { icon: <Rocket size={26} />, label: "Next launch", sublabel: "Coming soon" };

  return (
    <>
      <motion.div
        className="bg-stars relative"
        initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-3xl px-4 pb-8 pt-14 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue">My story so far</p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-silver sm:text-5xl">
            Real problems, real apps
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-mist/75">
            Every project I've built, in order. Pick a part, then tap a stop to open it.
          </p>
          <Link
            to="/projects"
            className="mt-3 inline-flex min-h-11 items-center text-sm text-mist/60 underline-offset-4 hover:text-yellow hover:underline"
          >
            Prefer a simple list?
          </Link>
        </div>

        {/* Part picker: one "planet" per part. Keeps the map short however many projects exist. */}
        <div ref={pickerRef} className="scroll-mt-20 px-4 sm:px-6">
          <div
            role="group"
            aria-label="Parts of the story"
            className="mx-auto flex max-w-3xl gap-3 overflow-x-auto pb-2 sm:justify-center"
          >
            {storyParts.map((p) => {
              const active = p.number === activePart;
              return (
                <button
                  key={p.number}
                  type="button"
                  onClick={() => goToPart(p.number)}
                  aria-pressed={active}
                  className={`flex min-h-11 flex-shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors ${
                    active ? "border-yellow bg-yellow/10" : "border-border bg-ink/60 hover:border-mist/40"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      active ? "bg-yellow text-ink" : "bg-surface-2 text-mist/70"
                    }`}
                  >
                    {p.number}
                  </span>
                  <span>
                    <span className={`block text-sm font-bold ${active ? "text-yellow" : "text-mist"}`}>{p.title}</span>
                    <span className="block text-xs text-mist/55">{p.chapterNumbers.length} stops</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-mist/70">{part.blurb}</p>
        </div>

        <div className="mt-4 overflow-hidden pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={part.number}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: partDirection * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -partDirection * 60 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.3 }}
            >
              <StoryPath chapters={partChapters} onOpen={openChapter} endStop={endStop} />
            </motion.div>
          </AnimatePresence>
        </div>

        <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-32 pt-10 sm:px-6" aria-labelledby="epilogue-heading">
          <h2 id="epilogue-heading" className="text-center text-3xl font-black uppercase text-silver sm:text-4xl">
            {storyEpilogue.title}
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-mist/85 sm:text-lg">
            {storyEpilogue.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <p className="glass-panel rounded-2xl px-6 py-5 text-sm text-mist/85 sm:text-base">{storyEpilogue.teaser}</p>
          <Link
            to="/contact"
            className="mx-auto mt-2 flex min-h-11 w-fit flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Let's talk
            <ArrowRight size={16} aria-hidden />
          </Link>
        </section>

      </motion.div>

      {/* Outside the animated wrapper: a transformed ancestor would pin this fixed overlay to it. */}
      <AnimatePresence>
        {openNumber !== null && (
          <ChapterBook key="book" chapterNumber={openNumber} onClose={closeBook} onNavigate={openChapter} />
        )}
      </AnimatePresence>
    </>
  );
}
