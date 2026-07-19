import { Link } from "react-router-dom";
import { ArrowRight, Mail, Building2 } from "lucide-react";
import { RMEmblem } from "../components/RMEmblem";
import { Marquee } from "../components/Marquee";
import { CharReveal } from "../components/CharReveal";
import { heroTagline, aboutFull, services, contacts } from "../content";
import faceImage from "../assets/face.jpeg";

export function Home() {
  return (
    <div>
      {/* Hero: giant gradient headline + emblem + bottom bar, per §8 */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pb-8 pt-16 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--color-yellow) 12%, transparent), transparent 55%), radial-gradient(circle at 85% 80%, color-mix(in srgb, var(--color-blue) 14%, transparent), transparent 55%)",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6 text-center">
          <h1 className="font-black uppercase leading-[0.95] text-silver" style={{ fontSize: "clamp(2.75rem, 15vw, 11rem)" }}>
            HI, I'M <span className="text-yellow" style={{ WebkitTextFillColor: "initial" }}>RICH</span>
          </h1>
          <RMEmblem size={240} photoSrc={faceImage} className="my-2" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-center text-sm text-mist/80 sm:text-left">{heroTagline}</p>
          <Link
            to="/contact"
            className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            <Mail size={16} aria-hidden />
            Contact
          </Link>
        </div>
      </section>

      {/* Scroll-driven marquee, §2/§4 */}
      <Marquee />

      {/* About teaser, §8 */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <CharReveal
          text={aboutFull.split(". ")[0] + "."}
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
          <h2 className="text-center text-3xl font-black uppercase text-ink sm:text-4xl">Services</h2>
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

      {/* Redirect to the Projects page instead of stacking full project cards here,
          which used to overlap awkwardly at the bottom of the page. */}
      <section className="relative -mt-16 rounded-t-[60px] bg-ink px-4 py-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue">Still under construction down here</p>
        <h2 className="mt-3 text-3xl font-black uppercase text-silver sm:text-4xl">The real work lives on the Projects page</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/projects"
            className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border-2 border-yellow px-8 py-4 text-base font-semibold text-yellow transition-colors hover:bg-yellow hover:text-ink"
          >
            <Building2 size={20} aria-hidden />
            Projects
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
