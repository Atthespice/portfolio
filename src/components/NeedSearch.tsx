import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, PenLine, Search, Send, Sparkles, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { search } from "../lib/search";
import { contacts, problemBox, type ProblemStepIcon } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

const stepIcons: Record<ProblemStepIcon, LucideIcon> = { write: PenLine, match: Sparkles, send: Send };

function HowItWorks() {
  return (
    <div>
      <h2 id="problem-box-heading" className="text-3xl font-black uppercase leading-tight text-silver sm:text-4xl">
        {problemBox.title}
      </h2>
      <p className="mt-3 text-base text-mist/75">{problemBox.intro}</p>
      {/* Phones: the three steps as one compact row, so the box itself stays close. */}
      <ol className="mt-6 grid grid-cols-3 gap-2 lg:hidden">
        {problemBox.steps.map((step, index) => {
          const Icon = stepIcons[step.icon];
          return (
            <li key={step.title} className="glass-panel flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow text-yellow">
                <Icon size={15} aria-hidden />
              </span>
              <span className="text-[11px] font-bold leading-tight text-mist">
                {index + 1}. {step.title}
              </span>
            </li>
          );
        })}
      </ol>

      <ol className="relative mt-8 hidden flex-col gap-6 lg:flex">
        <span aria-hidden className="absolute bottom-6 left-5 top-6 border-l-2 border-dashed border-yellow/35" />
        {problemBox.steps.map((step, index) => {
          const Icon = stepIcons[step.icon];
          return (
            <li key={step.title} className="relative flex gap-4">
              <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-yellow bg-ink text-yellow">
                <Icon size={18} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-mist">
                  <span className="text-yellow">{index + 1}.</span> {step.title}
                </p>
                <p className="mt-0.5 text-sm text-mist/65">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * "What's slowing your work down?" One box does two jobs: as the visitor types, it
 * matches their words against services and story stops (client-side, instant), and
 * one click sends the same words to /api/problem, which emails them to the owner.
 * A contact is optional, so nobody has to open their own email to reach out.
 */
export function NeedSearch() {
  const [problem, setProblem] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const results = useMemo(() => search(problem, 3), [problem]);
  const canSend = problem.trim().length >= 8 && status !== "sending";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSend) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/problem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ problem, contact, website: honeypot }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || problemBox.error);
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : problemBox.error);
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <HowItWorks />

      {status === "sent" ? (
        <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-10 text-center" role="status">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-ink">
            <Check size={24} aria-hidden />
          </span>
          <p className="text-lg font-bold text-mist">{contact.trim() ? problemBox.sentWithContact : problemBox.sent}</p>
          <button
            type="button"
            onClick={() => {
              setProblem("");
              setContact("");
              setStatus("idle");
            }}
            className="min-h-11 text-sm font-semibold text-yellow hover:underline"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} aria-labelledby="problem-box-heading" className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-border bg-ink/50 px-4 py-2 focus-within:border-yellow">
            <Search size={18} className="mt-3 flex-shrink-0 text-mist/60" aria-hidden />
            <textarea
              id="problem-input"
              value={problem}
              onChange={(event) => {
                setProblem(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={problemBox.placeholder}
              aria-label={problemBox.title}
              rows={4}
              maxLength={1500}
              data-own-focus
              className="min-h-11 w-full flex-1 resize-none bg-transparent py-2.5 text-base text-mist placeholder:text-mist/55"
            />
          </div>

          {/* Honeypot: hidden from people and screen readers, bots tend to fill it in. */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />

          <AnimatePresence initial={false}>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div role="region" aria-live="polite" className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-mist/55">{problemBox.matchesTitle}</p>
                  <div className="mt-2 flex flex-col gap-2">
                    {results.map((result) => (
                      <Link
                        key={`${result.type}-${result.title}`}
                        to={result.to}
                        className="flex min-h-11 flex-col gap-0.5 rounded-2xl border border-border bg-ink/40 px-4 py-3 text-left transition-colors hover:border-yellow/60"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-blue">
                          {result.type === "service" ? "Service" : "Project"}
                        </span>
                        <span className="text-sm font-semibold text-mist">{result.title}</span>
                        <span className="text-xs text-mist/60">{result.blurb}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <label className="mt-4 block text-sm text-mist/75">
            {problemBox.contactLabel}
            <input
              type="text"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder={problemBox.contactPlaceholder}
              maxLength={200}
              autoComplete="email"
              className="mt-2 block min-h-11 w-full rounded-full border border-border bg-ink/50 px-5 text-base text-mist placeholder:text-mist/55"
            />
          </label>

          <div className="mt-5 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-xs text-mist/55 sm:text-left">{problemBox.privacy}</p>
            <button
              type="submit"
              disabled={!canSend}
              className="flex min-h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} aria-hidden />
              {status === "sending" ? problemBox.sending : problemBox.send}
            </button>
          </div>

          {/* Plain-words privacy note: what's collected, why, where it goes, how to delete it. */}
          <details className="group mt-3 text-center text-xs text-mist/55 sm:text-left">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-mist/70 hover:text-yellow">
              {problemBox.privacyMore}
            </summary>
            <ul className="mt-1 flex flex-col gap-1.5 text-left leading-relaxed">
              {problemBox.privacyNote.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </details>

          {status === "error" && (
            <p role="alert" className="mt-3 text-center text-sm text-yellow">
              {errorMessage} You can also email me at{" "}
              <a href={`mailto:${contacts.email}`} className="underline">
                {contacts.email}
              </a>
              .
            </p>
          )}
        </form>
      )}
    </div>
  );
}
