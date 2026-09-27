import { Link } from "react-router-dom";
import { ArrowRight, Mail, BookOpen, MessageSquareText } from "lucide-react";
import { Marquee } from "../components/Marquee";
import { CharReveal } from "../components/CharReveal";
import { NeedSearch } from "../components/NeedSearch";
import { HeroGlobe } from "../components/HeroGlobe";
import { HeroCalloutsCompact, HeroCalloutsLeft, HeroCalloutsRight } from "../components/HeroCallouts";
import { useReducedMotion } from "../lib/useReducedMotion";
import { homeCopy, services, contacts, worldSection } from "../content";

export function Home() {
  const reducedMotion = useReducedMotion();

  // "Tell me your problem": bring the text box itself to the middle of the screen (not the
  // section top, which on phones is the explanation) and put the cursor in it.
  function goToProblemBox() {
    const input = document.getElementById("problem-input");
    input?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    input?.focus({ preventScroll: true });
  }

  return (
    <div>
      {/* Hero: headline, then the globe (me pinned on Nairobi) with illustrated callouts
          around it, so the first screen explains itself. The globe is pulled up under the
          headline so the two read as one piece. */}
      <section className="bg-stars relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-8 pt-6 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--color-yellow) 12%, transparent), transparent 55%), radial-gradient(circle at 85% 80%, color-mix(in srgb, var(--color-blue) 14%, transparent), transparent 55%)",
          }}
        />

        <p className="relative z-10 text-center text-xs font-black uppercase tracking-[0.3em] text-blue sm:text-sm">
          {worldSection.title}
        </p>
        <h1
          className="pointer-events-none relative z-10 mt-2 text-center font-black uppercase leading-[0.95] text-silver"
          style={{ fontSize: "clamp(2.75rem, 11vw, 8rem)" }}
        >
          HI, I'M <span className="text-yellow" style={{ WebkitTextFillColor: "initial" }}>RICH</span>
        </h1>

        <div className="relative z-0 mx-auto -mt-[2vw] grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <HeroCalloutsLeft />
          <div className="flex flex-col items-center">
            <HeroGlobe label={worldSection.globeLabel} className="w-[min(440px,82vw,50svh)]" />
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-mist/50 lg:hidden">
              {worldSection.tapTitle}: {worldSection.tapText.toLowerCase()}
            </p>
          </div>
          <HeroCalloutsRight />
        </div>

        <div className="relative z-10 mx-auto mt-4 flex w-full flex-col items-center gap-5">
          <HeroCalloutsCompact />
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={goToProblemBox}
              className="flex min-h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              <MessageSquareText size={16} aria-hidden />
              {worldSection.problemButton}
            </button>
            <Link
              to="/story"
              className="flex min-h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-yellow px-6 text-sm font-semibold text-yellow transition-colors hover:bg-yellow hover:text-ink"
            >
              {worldSection.cta}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* "What's slowing your work down?" box: explanation on one side, the box on the other. */}
      <section id="problem-box" className="scroll-mt-16 px-4 py-20 sm:px-6">
        <NeedSearch />
      </section>

      {/* Scroll-driven marquee, §2/§4 */}
      <Marquee />

      {/* About teaser, §8 */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <CharReveal
          text={homeCopy.aboutTeaser}
          className="text-2xl font-medium leading-relaxed text-mist sm:text-3xl"
        />
        <Link
          to="/about"
          className="mt-6 inline-flex min-h-11 flex-shrink-0 items-center gap-2 text-sm font-semibold text-yellow hover:underline"
        >
          More about me
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      {/* White services sheet, §3/§8 */}
      <section className="relative mt-8 rounded-t-[60px] bg-white px-4 pb-24 pt-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-black uppercase text-ink sm:text-4xl">{homeCopy.servicesTitle}</h2>
          <ol className="mt-10 flex flex-col gap-8">
            {services.map((service, index) => (
              <li key={service.title} className="flex gap-5 border-b border-black/10 pb-8 last:border-0">
                <span className="text-2xl font-black text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{service.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{service.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Redirect to the Story page instead of stacking full project cards here,
          which used to overlap awkwardly at the bottom of the page. */}
      <section className="relative -mt-16 rounded-t-[60px] bg-ink px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue">{homeCopy.journeyEyebrow}</p>
        <h2 className="mt-3 text-3xl font-black uppercase text-silver sm:text-4xl">{homeCopy.journeyTitle}</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/story"
            className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border-2 border-yellow px-8 py-4 text-base font-semibold text-yellow transition-colors hover:bg-yellow hover:text-ink"
          >
            <BookOpen size={20} aria-hidden />
            Story
          </Link>
          <Link
            to="/contact"
            className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-8 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            <Mail size={16} aria-hidden />
            Let's talk: {contacts.email}
          </Link>
        </div>
      </section>
    </div>
  );
}
