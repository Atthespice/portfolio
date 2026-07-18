# CLAUDE.md — Rich Maina Portfolio

Guidance for future work in this repo (see `PORTFOLIO_SPEC.md` for the full original spec).

## The owner is learning

The owner is a Diploma in IT student who learns by doing. Briefly explain significant
technical decisions as you make them (structure, hooks, animation logic, why a library
was chosen) in one or two sentences, and wait for confirmation before large refactors.

## Content lives in one place

**All site copy lives in `src/content.ts`.** Components never hard-code bio text, contact
details, service descriptions, project data, tech-stack lists, certifications, or
education entries — they import from `content.ts`. If you're adding or editing copy,
that file is the only place to touch; if you're touching a component and find yourself
typing a sentence of prose, stop and move it to `content.ts` instead.

## Design tokens (§3 of the spec)

Defined once in `src/index.css` under `@theme` (Tailwind v4 auto-generates utilities
from these — `bg-ink`, `text-yellow`, `border-border`, etc.):

| Token | Value | Utility |
|---|---|---|
| Background | `#0C0C0C` | `bg-ink` |
| Surface | `#14151B` | `bg-surface` |
| Surface (raised) | `#1E2027` | `bg-surface-2` |
| Border | `#22242C` | `border-border` |
| Accent 1 (yellow) | `#F5B921` | `bg-yellow` / `text-yellow` |
| Accent 2 (blue) | `#3D7BFF` | `bg-blue` / `text-blue` |
| Body/UI text | `#D7E2EA` | `text-mist` |
| Silver gradient (display text) | `#646973` → `#BBCCD7` | `.text-silver` class in `index.css` |

Font is Kanit everywhere (`--font-display`, loaded from Google Fonts in `index.html`).
Never hard-code these hex values in a component — use the token/utility so a future
palette change is a one-file edit.

## Responsive & accessibility rules (§9 — must-fix from v2)

- All buttons: `min-h-11` (44px) touch target, `flex-shrink-0`, no overflow on small screens.
- Navbar collapses to a hamburger below `sm` (640px) — see `Navbar.tsx`.
- Hero bottom bar stacks vertically below 640px; never let the tagline/button collide
  with the emblem.
- Card grids collapse to one column below 640px.
- Visible `:focus-visible` outline on every interactive element (set globally in
  `index.css`, don't override it away).
- `prefers-reduced-motion: reduce` must disable marquee drift, char-by-char reveal, and
  card scaling — see the `useReducedMotion()` hook (`src/lib/useReducedMotion.ts`) and use
  it in any new animated component instead of assuming motion is always wanted.

## Project images

Drop a real screenshot into `src/assets/projects/<slug>/cover.{png,jpg,webp}` and it
automatically replaces the generated placeholder art everywhere (Home marquee, featured
cards, Projects grid) — see `src/lib/projectImages.ts`. No component changes needed.

## Before large refactors

Ask first. This spec was built carefully section by section — if you think a different
structure would work better, propose it and wait for a yes before changing it.
