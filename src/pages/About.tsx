import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { animate, AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Award, GraduationCap, Hammer, Map, Rocket, ShieldAlert } from "lucide-react";
import { aboutPage, investTicker, techStack, certifications, education, pageTitles } from "../content";
import { formatPrice, tickerGrowthPercent, tickerPrice } from "../lib/ticker";
import { useReducedMotion } from "../lib/useReducedMotion";
import aboutPhoto from "../assets/about-photo.webp";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const processIcons = [Map, Hammer, ShieldAlert, Rocket];

function useReveal() {
  const reducedMotion = useReducedMotion();
  return (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.45, delay },
        };
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref}>
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

function BeforeAfterCards() {
  const [showAfter, setShowAfter] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-mist/70">{aboutPage.beforeAfterHint}</p>
        <button
          type="button"
          role="switch"
          aria-checked={showAfter}
          aria-label="Show after"
          onClick={() => setShowAfter((v) => !v)}
          className="flex min-h-11 flex-shrink-0 items-center gap-3 rounded-full border border-border bg-ink/60 p-1.5 text-sm font-bold"
        >
          <span className={`rounded-full px-4 py-1.5 transition-colors ${showAfter ? "text-mist/60" : "bg-surface-2 text-mist"}`}>
            Before
          </span>
          <span className={`rounded-full px-4 py-1.5 transition-colors ${showAfter ? "bg-yellow text-ink" : "text-mist/60"}`}>
            After
          </span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {aboutPage.beforeAfter.map((item, index) => (
          <div key={item.label} style={{ perspective: 1000 }}>
            <motion.div
              className="grid"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: showAfter ? 180 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : index * 0.08 }}
            >
              <div
                aria-hidden={showAfter}
                className="col-start-1 row-start-1 flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 [backface-visibility:hidden]"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-mist/60">Before · {item.label}</p>
                <p className="text-base leading-relaxed text-mist/70">{item.before}</p>
              </div>
              <div
                aria-hidden={!showAfter}
                className="col-start-1 row-start-1 flex flex-col gap-2 rounded-2xl border border-yellow/50 bg-surface p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ boxShadow: "inset 0 0 40px color-mix(in srgb, var(--color-yellow) 10%, transparent)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-yellow">After · {item.label}</p>
                <p className="text-base leading-relaxed text-mist">{item.after}</p>
                <Link
                  to={`/story#chapter-${item.chapterNumber}`}
                  tabIndex={showAfter ? undefined : -1}
                  className="mt-auto inline-flex min-h-11 w-fit items-center gap-1 text-sm font-semibold text-yellow hover:underline"
                >
                  See how I built it
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toolbox() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + techStack.length) % techStack.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const group = techStack[active];

  return (
    <div>
      <div role="tablist" aria-label={aboutPage.toolboxTitle} className="flex gap-2 overflow-x-auto pb-2">
        {techStack.map((g, index) => (
          <button
            key={g.title}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tool-tab-${index}`}
            aria-selected={index === active}
            aria-controls="tool-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            className={`min-h-11 flex-shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
              index === active ? "border-blue bg-blue/15 text-mist" : "border-border text-mist/60 hover:text-mist"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>
      <div
        id="tool-panel"
        role="tabpanel"
        aria-labelledby={`tool-tab-${active}`}
        className="glass-panel mt-3 min-h-28 rounded-2xl p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={group.title}
            className="flex flex-wrap gap-2"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {group.items.map((item) => (
              <li key={item} className="rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-sm text-mist/90">
                {item}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-2xl font-black uppercase text-silver sm:text-3xl">{children}</h2>;
}

export function About() {
  useDocumentTitle(pageTitles.about);
  const reveal = useReveal();

  return (
    <div className="bg-stars relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-yellow)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-[40rem] h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--color-blue)" }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-24 px-4 py-16 sm:px-6">
        {/* Intro: photo + one big line. */}
        <section className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="glass-panel mx-auto w-fit rotate-[-3deg] rounded-[2rem] border-2 border-white/10 p-1.5">
            <img src={aboutPhoto} alt="Rich Maina" className="aspect-[4/5] w-56 rounded-[1.6rem] object-cover sm:w-64" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue">{aboutPage.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-silver sm:text-6xl">
              {aboutPage.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist/85">{aboutPage.intro}</p>
          </div>
        </section>

        <motion.section {...reveal()}>
          <SectionTitle>{aboutPage.beforeAfterTitle}</SectionTitle>
          <div className="mt-6">
            <BeforeAfterCards />
          </div>
        </motion.section>

        <section>
          <motion.div {...reveal()}>
            <SectionTitle>{aboutPage.processTitle}</SectionTitle>
          </motion.div>
          <ol className="relative mt-8 grid gap-6 md:grid-cols-4">
            <span
              aria-hidden
              className="absolute left-7 top-7 hidden h-0.5 w-[calc(100%-3.5rem)] border-t-2 border-dashed border-yellow/40 md:block"
            />
            {aboutPage.process.map((step, index) => {
              const Icon = processIcons[index];
              return (
                <motion.li key={step.title} {...reveal(index * 0.1)} className="relative flex gap-4 md:flex-col">
                  <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-yellow bg-ink text-yellow">
                    <Icon size={22} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue">Step {index + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-mist">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist/75">{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        <section>
          <SectionTitle>{aboutPage.statsTitle}</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {aboutPage.stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-5">
                <p className="text-4xl font-black text-yellow sm:text-5xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-sm leading-snug text-mist/75">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.section {...reveal()}>
          <div className="flex items-baseline justify-between gap-4">
            <SectionTitle>{aboutPage.toolboxTitle}</SectionTitle>
            <p className="text-sm text-mist/60">{aboutPage.toolboxHint}</p>
          </div>
          <div className="mt-6">
            <Toolbox />
          </div>
        </motion.section>

        <motion.section {...reveal()}>
          <SectionTitle>{aboutPage.trophiesTitle}</SectionTitle>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li key={cert.title} className="glass-panel flex gap-4 rounded-2xl p-5">
                <Award size={22} className="mt-0.5 flex-shrink-0 text-yellow" aria-hidden />
                <div>
                  <p className="font-semibold text-mist">{cert.title}</p>
                  <p className="text-sm text-mist/65">{cert.detail}</p>
                </div>
              </li>
            ))}
            {education.map((entry) => (
              <li key={entry.title} className="glass-panel flex gap-4 rounded-2xl p-5">
                <GraduationCap size={22} className="mt-0.5 flex-shrink-0 text-blue" aria-hidden />
                <div>
                  <p className="font-semibold text-mist">{entry.title}</p>
                  <p className="text-sm text-mist/65">{entry.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section {...reveal()} className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue">{aboutPage.nowEyebrow}</p>
            <SectionTitle>{aboutPage.nowTitle}</SectionTitle>
            <Link
              to="/#invest"
              className="mt-4 inline-flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-border px-4 text-sm font-bold tabular-nums transition-colors hover:border-yellow/60"
            >
              <span className="rounded bg-yellow px-1.5 py-0.5 text-xs text-ink">{investTicker.symbol}</span>
              <span className="text-mist/70">{aboutPage.nowPriceLabel}</span>
              <span className="text-mist">{formatPrice(tickerPrice)}</span>
              <span className="text-yellow">▲{tickerGrowthPercent}%</span>
            </Link>
            <ul className="mt-6 flex flex-col gap-4">
              {aboutPage.now.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-mist/85">
                  <span className="relative mt-2 flex h-2.5 w-2.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel flex flex-col justify-center gap-4 rounded-3xl p-8 text-center">
            <h2 className="text-3xl font-black uppercase text-silver">{aboutPage.ctaTitle}</h2>
            <p className="text-mist/80">{aboutPage.ctaText}</p>
            <Link
              to="/contact"
              className="mx-auto flex min-h-11 w-fit flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              {aboutPage.ctaButton}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
