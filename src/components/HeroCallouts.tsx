import { motion } from "framer-motion";
import { Bot, MapPin, MousePointerClick, Smartphone, type LucideIcon } from "lucide-react";
import { worldSection, type HeroCalloutIcon } from "../content";
import { useReducedMotion } from "../lib/useReducedMotion";

const icons: Record<HeroCalloutIcon, LucideIcon> = { apps: Smartphone, ai: Bot, place: MapPin };

interface CalloutProps {
  icon: LucideIcon;
  title: string;
  text: string;
  /** Which side the globe is on, so the dashed leader line points at it. */
  globeSide: "left" | "right";
  highlight?: boolean;
  delay?: number;
}

function Callout({ icon: Icon, title, text, globeSide, highlight = false, delay = 0 }: CalloutProps) {
  const reducedMotion = useReducedMotion();
  const leader = (
    <span aria-hidden className="hidden w-10 flex-shrink-0 border-t-2 border-dashed border-yellow/40 xl:block" />
  );

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: globeSide === "right" ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.4 + delay }}
      className={`flex items-center gap-3 ${globeSide === "right" ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 ${
          globeSide === "right" ? "flex-row-reverse text-right" : "text-left"
        } ${highlight ? "border-yellow/50" : ""}`}
      >
        <span
          className={`relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
            highlight ? "bg-yellow text-ink" : "bg-surface-2 text-yellow"
          }`}
        >
          {highlight && !reducedMotion && (
            <span className="absolute inset-0 animate-ping rounded-full bg-yellow opacity-40" aria-hidden />
          )}
          <Icon size={18} aria-hidden className="relative" />
        </span>
        <span>
          <span className="block text-sm font-bold text-mist">{title}</span>
          <span className="block text-xs text-mist/60">{text}</span>
        </span>
      </div>
      {leader}
    </motion.div>
  );
}

const [apps, ai, place] = worldSection.callouts;

/** Left-of-globe callouts (desktop). */
export function HeroCalloutsLeft() {
  return (
    <div className="hidden flex-col items-end gap-10 lg:flex">
      <Callout icon={icons[apps.icon]} title={apps.title} text={apps.text} globeSide="right" />
      <Callout icon={icons[ai.icon]} title={ai.title} text={ai.text} globeSide="right" delay={0.1} />
    </div>
  );
}

/** Right-of-globe callouts (desktop), including the "tap the globe" hint. */
export function HeroCalloutsRight() {
  return (
    <div className="hidden flex-col items-start gap-10 lg:flex">
      <Callout
        icon={MousePointerClick}
        title={worldSection.tapTitle}
        text={worldSection.tapText}
        globeSide="left"
        highlight
        delay={0.2}
      />
      <Callout icon={icons[place.icon]} title={place.title} text={place.text} globeSide="left" delay={0.3} />
    </div>
  );
}

/** Phones and tablets: the same three ideas as a compact row of icon chips under the globe. */
export function HeroCalloutsCompact() {
  return (
    <ul className="grid w-full max-w-md grid-cols-3 gap-2 lg:hidden">
      {worldSection.callouts.map((c) => {
        const Icon = icons[c.icon];
        return (
          <li key={c.title} className="glass-panel flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-yellow">
              <Icon size={16} aria-hidden />
            </span>
            <span className="text-[11px] font-bold leading-tight text-mist">{c.title}</span>
          </li>
        );
      })}
    </ul>
  );
}
