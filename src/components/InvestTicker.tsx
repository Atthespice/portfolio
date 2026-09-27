import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MessageSquareText, Share2, TrendingUp, type LucideIcon } from "lucide-react";
import { chapterStatusLabels, investTicker } from "../content";
import { formatPrice, tickerGrowthPercent, tickerHistory, tickerPrice } from "../lib/ticker";
import { useReducedMotion } from "../lib/useReducedMotion";

// Chart geometry in SVG units. The SVG scales uniformly with its container.
const W = 600;
const H = 220;
const PAD_X = 14;
const PAD_Y = 18;

// One extra slot after the real history: the dashed "coming next" launch.
const lastIndex = tickerHistory.length - 1;
const upcomingIndex = lastIndex + 1;
const upcomingPrice = tickerPrice + investTicker.moves.live;

const prices = [...tickerHistory.map((point) => point.price), upcomingPrice];
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

const xAt = (index: number) => PAD_X + (index / upcomingIndex) * (W - PAD_X * 2);
const yAt = (price: number) => H - PAD_Y - ((price - minPrice) / (maxPrice - minPrice || 1)) * (H - PAD_Y * 2);

const linePath = tickerHistory.map((point, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(point.price)}`).join(" ");
const areaPath = `${linePath} L${xAt(lastIndex)},${H} L${xAt(0)},${H} Z`;

const investIcons: Record<(typeof investTicker.invest)[number]["kind"], LucideIcon> = {
  hire: Briefcase,
  problem: MessageSquareText,
  share: Share2,
};

/**
 * "Invest in me": a stock-style card for $RICH. The chart is scrubbable like a trading
 * app (drag, tap, or arrow keys), and every point is a real Story stop. Buying in means
 * hiring, sending a problem, or sharing, never money, and the card says so.
 */
export function InvestTicker({ onSendProblem }: { onSendProblem: () => void }) {
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState(lastIndex);
  const isUpcoming = selected === upcomingIndex;
  const point = tickerHistory[Math.min(selected, lastIndex)];

  function selectFromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = (event.clientX - rect.left) / rect.width;
    const index = Math.round(((fraction * W - PAD_X) / (W - PAD_X * 2)) * upcomingIndex);
    setSelected(Math.max(0, Math.min(upcomingIndex, index)));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next: Record<string, number> = {
      ArrowLeft: selected - 1,
      ArrowDown: selected - 1,
      ArrowRight: selected + 1,
      ArrowUp: selected + 1,
      Home: 0,
      End: upcomingIndex,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setSelected(Math.max(0, Math.min(upcomingIndex, next[event.key])));
  }

  function share() {
    const text = `${investTicker.shareText} ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const pointLabel = isUpcoming
    ? investTicker.upcoming.label
    : point.chapter
      ? `Stop ${point.chapter.number}: ${point.chapter.chapterTitle}`
      : investTicker.startLabel;
  const shownPrice = isUpcoming ? upcomingPrice : point.price;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue">{investTicker.eyebrow}</p>
      <h2 id="invest-heading" className="mt-2 text-3xl font-black uppercase leading-tight text-silver sm:text-4xl">
        {investTicker.title}
      </h2>
      <p className="mt-3 max-w-2xl text-base text-mist/75">{investTicker.intro}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[7fr_5fr]">
        {/* The quote + chart */}
        <div className="glass-panel min-w-0 rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-mist">
                <span className="rounded-md bg-yellow px-2 py-0.5 text-ink">{investTicker.symbol}</span>
                {investTicker.name}
                <span className="font-normal text-mist/60">· {investTicker.exchange}</span>
              </p>
              <p className="mt-2 text-4xl font-black tabular-nums text-mist sm:text-5xl" aria-live="polite">
                {formatPrice(shownPrice)}
              </p>
            </div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-yellow">
              <TrendingUp size={16} aria-hidden />▲ +{tickerGrowthPercent}% {investTicker.sinceStart}
            </p>
          </div>

          <div
            role="slider"
            tabIndex={0}
            aria-label={`${investTicker.symbol} price history`}
            aria-valuemin={0}
            aria-valuemax={upcomingIndex}
            aria-valuenow={selected}
            aria-valuetext={`${pointLabel}, price ${formatPrice(shownPrice)}`}
            onKeyDown={onKeyDown}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              selectFromPointer(event);
            }}
            onPointerMove={(event) => {
              if (event.pointerType === "mouse" || event.currentTarget.hasPointerCapture(event.pointerId)) {
                selectFromPointer(event);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setSelected(lastIndex);
            }}
            className="mt-5 cursor-crosshair touch-pan-y select-none rounded-xl"
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="ticker-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-yellow)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-yellow)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} stroke="var(--color-border)" strokeDasharray="4 6" />
              ))}
              <motion.path
                d={areaPath}
                fill="url(#ticker-fill)"
                initial={reducedMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke="var(--color-yellow)"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <line
                x1={xAt(lastIndex)}
                y1={yAt(tickerPrice)}
                x2={xAt(upcomingIndex)}
                y2={yAt(upcomingPrice)}
                stroke="var(--color-blue)"
                strokeWidth={3}
                strokeDasharray="6 7"
                strokeLinecap="round"
              />
              <circle
                cx={xAt(upcomingIndex)}
                cy={yAt(upcomingPrice)}
                r={isUpcoming ? 7 : 4.5}
                fill={isUpcoming ? "var(--color-blue)" : "var(--color-ink)"}
                stroke="var(--color-blue)"
                strokeWidth={2}
              />
              <line
                x1={xAt(selected)}
                x2={xAt(selected)}
                y1={0}
                y2={H}
                stroke="var(--color-mist)"
                strokeOpacity={0.35}
                strokeDasharray="3 4"
              />
              {tickerHistory.map((p, i) => (
                <circle
                  key={i}
                  cx={xAt(i)}
                  cy={yAt(p.price)}
                  r={i === selected ? 7 : 3.5}
                  fill={i === selected ? "var(--color-yellow)" : "var(--color-ink)"}
                  stroke="var(--color-yellow)"
                  strokeWidth={2}
                />
              ))}
            </svg>
          </div>

          {/* What moved the price at the selected point */}
          <div className="mt-4 flex min-h-11 flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-ink/40 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-mist">{pointLabel}</p>
              {isUpcoming && <p className="text-xs text-blue">{investTicker.upcoming.note}</p>}
              {!isUpcoming && point.chapter && (
                <p className="text-xs text-mist/60">
                  {chapterStatusLabels[point.chapter.status]} · <span className="text-yellow">+{point.change}</span>
                </p>
              )}
            </div>
            {isUpcoming && (
              <Link
                to="/story#epilogue"
                className="flex min-h-11 flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
              >
                {investTicker.upcoming.link}
                <ArrowRight size={14} aria-hidden />
              </Link>
            )}
            {!isUpcoming && point.chapter && (
              <Link
                to={`/story#chapter-${point.chapter.number}`}
                className="flex min-h-11 flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-yellow hover:underline"
              >
                See this stop
                <ArrowRight size={14} aria-hidden />
              </Link>
            )}
          </div>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-mist/55">{investTicker.howTitle}</p>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {investTicker.howItems.map((item) => (
                <li key={item.status} className="flex items-baseline gap-2 text-sm text-mist/75">
                  <span className="font-bold tabular-nums text-yellow">+{investTicker.moves[item.status]}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to buy in */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-mist/55">{investTicker.investTitle}</p>
          {investTicker.invest.map((option) => {
            const Icon = investIcons[option.kind];
            const inner = (
              <>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow text-ink">
                  <Icon size={18} aria-hidden />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-base font-bold text-mist">{option.title}</span>
                  <span className="block text-sm text-mist/65">{option.text}</span>
                </span>
              </>
            );
            const className =
              "glass-panel flex min-h-11 items-center gap-4 rounded-2xl p-4 transition-colors hover:border-yellow/60";
            if (option.kind === "hire") {
              return (
                <Link key={option.kind} to="/contact" className={className}>
                  {inner}
                </Link>
              );
            }
            return (
              <button
                key={option.kind}
                type="button"
                onClick={option.kind === "problem" ? onSendProblem : share}
                className={className}
              >
                {inner}
              </button>
            );
          })}
          <p className="mt-2 text-xs leading-relaxed text-mist/60">{investTicker.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

/** Compact $RICH quote for the navbar, so the ticker is one tap away on every page. */
export function TickerPill({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      to="/#invest"
      onClick={() => {
        // Already on Home with #invest in the URL: the hash won't change, so scroll here.
        document.getElementById("invest")?.scrollIntoView({ behavior: "smooth" });
        onNavigate?.();
      }}
      aria-label={`${investTicker.pillLabel}: ${formatPrice(tickerPrice)}, up ${tickerGrowthPercent}%`}
      className="flex min-h-11 flex-shrink-0 items-center gap-1.5 px-2 text-xs font-bold tabular-nums"
    >
      <span className="rounded bg-yellow px-1.5 py-0.5 text-ink">{investTicker.symbol}</span>
      <span className="text-yellow">▲{tickerGrowthPercent}%</span>
    </Link>
  );
}
