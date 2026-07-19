import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { aboutFull, techStack, certifications, education } from "../content";
import { useReducedMotion } from "../lib/useReducedMotion";
import aboutPhoto from "../assets/about-photo.jpeg";

export function About() {
  const reducedMotion = useReducedMotion();
  const sideReveal = (fromLeft: boolean) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, x: fromLeft ? -24 : 24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5 },
        };

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--color-yellow)" }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--color-blue)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-center text-4xl font-black uppercase text-silver sm:text-5xl">About me</h1>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-mist/85">{aboutFull}</p>

        <div className="relative mx-auto mt-12 flex max-w-xs flex-col items-center">
          <div
            className="pointer-events-none absolute -inset-10 rounded-[2.5rem] opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 25% 20%, color-mix(in srgb, var(--color-yellow) 45%, transparent), transparent 60%), radial-gradient(circle at 78% 82%, color-mix(in srgb, var(--color-blue) 45%, transparent), transparent 55%)",
            }}
          />
          <div className="glass-panel relative rounded-[2rem] border-2 border-white/10 p-1.5">
            <img
              src={aboutPhoto}
              alt="Rich Maina"
              className="aspect-[4/5] w-64 rounded-[1.6rem] object-cover sm:w-72"
            />
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-yellow">Meet the man himself</p>
        </div>

        <motion.section {...sideReveal(true)} className="mt-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-yellow">Skills &amp; tech stack</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {techStack.map((group) => (
              <div key={group.title} className="glass-panel rounded-2xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-blue">{group.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-mist/85">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section {...sideReveal(false)} className="mt-16">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-yellow">
            <Award size={16} aria-hidden />
            Certifications &amp; awards
          </h2>
          <ol className="mt-6 flex flex-col gap-5 border-l border-border pl-6">
            {certifications.map((cert) => (
              <li key={cert.title} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue" />
                <p className="font-semibold text-mist">{cert.title}</p>
                <p className="text-sm text-mist/70">{cert.detail}</p>
              </li>
            ))}
          </ol>
        </motion.section>

        <motion.section {...sideReveal(true)} className="mt-16 mb-8">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-yellow">
            <GraduationCap size={16} aria-hidden />
            Education
          </h2>
          <ol className="mt-6 flex flex-col gap-5 border-l border-border pl-6">
            {education.map((entry) => (
              <li key={entry.title} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-yellow" />
                <p className="font-semibold text-mist">{entry.title}</p>
                <p className="text-sm text-mist/70">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </motion.section>
      </div>
    </div>
  );
}
