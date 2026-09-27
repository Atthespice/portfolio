# NARRATIVE_REVAMP_SPEC.md — Rich Maina Portfolio (v4, narrative)

> **To Claude Code:** This is a concept doc. Most open decisions from the first draft are
> now resolved (see §10) — one is still open (exact chapter order, tentatively updated
> below). Do not start building against this until the owner confirms §10 item 1. Where
> this doc is silent, v3 (`PORTFOLIO_SPEC.md`) and `CLAUDE.md` still govern (design tokens,
> content-in-`content.ts`, responsive/accessibility rules, no em dash in visitor-facing
> copy, ask before large refactors).

## 1. Why this exists

v3 shipped a real, working multi-page site with a genuine design system ("Tarmac hybrid").
What it doesn't do: read as a progression. It lists projects as same-weight cards, sorted
by category. It also predates four real projects (Wealth Track, Dobi Go, LoopHole, Track My
Kid) that are more ambitious than most of what's currently listed, and it has no connection
to Rich OS (the product-engineering system these are built under) or the Kenya Design
Library (the competitive-research library that now grounds design decisions on newer
builds).

The revamp's goal: same design tokens, same routes at the top level, but the projects
experience becomes a chaptered story with a clear arc, real screenshots, and one honest
throughline: *network operator → freelance builder → client software → personal products →
security research → an actual engineering system behind it all, still growing.* The owner
wants every real project folded in, not trimmed — the point is to show an ecosystem being
built, not a highlight reel.

## 2. What stays from v3

- Stack: Vite, React 19, TypeScript, Tailwind v4, Framer Motion, React Router.
- Design tokens (`src/index.css` `@theme`): ink/surface/border/yellow/blue/mist, Kanit font.
- `content.ts` as the single source of copy — this gets restructured (§5), not abandoned.
- Home, About, Contact stay close to their current shape (Home gains the search bar, §7).
  **Projects is what changes.**
- All §9-equivalent responsiveness/accessibility rules from v3, `useReducedMotion()`, the
  no-em-dash copy rule.
- **Voice: first person throughout the narrative** ("I designed...", "I'm building...") —
  confirmed by the owner, since this is his own site. About/Contact can stay however they
  already read.

## 3. The narrative structure

> **Superseded by the owner's follow-up (built):** `/story` is now a level-map, not a
> scroll of chapters. Every project is a stop (circular thumbnail, numbered badge, status
> ring: yellow = live, blue = in progress, silver = finished) on one winding dashed flight
> path (`StoryPath.tsx`), ending at a "Next launch" rocket. Tapping a stop opens it as a
> book (`ChapterBook.tsx`): on wide screens a closed yellow-covered book slides in and its
> cover swings open on the spine to a two-page spread (picture + tech left, story right);
> on phones, one page flips in with the story first. Previous/Next and arrow keys turn
> pages, Esc closes, `/story#chapter-N` deep-links straight to a stop. All chapter wording
> was rewritten in plain language ("An app for landlords", not "First real product"), and
> each page labels its three beats: The problem / What I built / Where it is now. Home also
> gained a space-themed "A world through my lens" section with a spinning globe
> (`Globe.tsx`, the `cobe` library) marking Nairobi. The original scroll design below is
> kept for history.

A new `/story` route (main nav link points here). Structure: a vertical scroll of numbered
chapters, each full-bleed, with a persistent chapter rail (desktop: fixed left sidebar
listing chapter numbers/titles, current one highlighted and clickable to jump; mobile: a
collapsed progress dot-stack). This is the "book" feel: a spine you can see the whole time,
chapters you can jump into, page-turn-weight transitions between them (a subtle vertical
slide/fade, not a literal 3D page flip — keep it tasteful, respect `prefers-reduced-motion`
by cutting straight to opacity fades).

Each chapter template:

1. **Chapter number + title** (large, silver-gradient numeral in the Kanit display style
   already established for the Home hero).
2. **One real screenshot or short clip** as the visual anchor (see §6 — no placeholder art
   in the narrative; a chapter without a real asset yet either waits or uses a minimal
   text-only "field note" layout instead of generated art).
3. **Three narrative beats**, first person, 1-2 sentences each: *the problem*, *what I
   built/am building*, *where it stands now* (live / in pilot / in development /
   feature-complete). In-progress projects say so honestly — that's part of the story, not
   something to hide.
4. **Stat callouts** where real numbers exist (e.g. "30 users, 300 Mbps, live since Jan
   2025"), styled as pull-quotes.
5. **Stack chips + repo/live links**, same button rules as v3 (disabled ghost button with
   "Live link coming soon" when `liveUrl` is null).

`/projects` (the v3 grid) stays live as a fast, low-motion fallback — nav says "Story" as
the primary link; a small "prefer the quick list?" link at the top of `/story` points to
`/projects` for anyone who wants the scan-in-ten-seconds version. **Resolved** (was open
decision 3).

## 4. Chapter order (updated — everything folds in)

Every real project gets its own chapter now, including AI-Powered Helpdesk, which was
previously proposed as a drop or a pairing. It's back in, and repositioned: it's the first
place an AI agent shows up doing real work in this timeline, which sets up LoopHole later
and the epilogue's Rich OS agent work. This is the one part of the doc still tentative —
confirm the order or reshuffle it.

1. **The network** — Residential ISP (3 floors, 30 users). Before there was code, there was
   infrastructure. Live since Jan 2025, ongoing.
2. **The eye for it** — Brand & Media (Bidii wraps + Best Kenya College). Parallel creative
   track, shows range beyond code.
3. **Learning by shipping** — Bidii Driving School MIS. First real client software project,
   40-page SRS, academic capstone.
4. **Two more reps** — Mwirigo Emergency Reporting System + Safaricom PLP MERN Capstone,
   paired (neither has a live deployment; keeps momentum through the early learning phase).
5. **Teaching a machine to triage** — AI-Powered Helpdesk. First build with an AI agent
   actually doing work (classification, draft replies, always human-approved). The seed of
   everything agent-shaped that follows.
6. **First real product** — Nyumbani. Invite-only rental SaaS for Kenyan landlords, live,
   M-Pesa reconciliation, RLS-modeled multi-tenancy.
7. **Just for me** — Unadoo. Local-first, offline, no-cloud expense/habit tracker.
8. **The ledger** — Wealth Track. Personal finance PWA, reverse-planned from a freedom
   target, fed by Unadoo's export. In active build, shipped shown honestly as such.
9. **The pilot** — Dobi Go. Laundry pickup-and-delivery platform, real operator (Maggy,
   Zimmerman), heading multi-tenant. In active build.
10. **Breaking things on purpose** — LoopHole. AI-driven security-guard red-teaming,
    feature-complete, 129 offline tests, built for a hackathon pitch.
11. **Watching over them** — Track My Kid (Jendie Automobiles). Live school-transport
    safety product for Kenyan parents, client-facing.
12. **Katiba OS** — the most ambitious personal build (bilingual legal-evidence workflow,
    human-approval-gated AI). Closing case-study chapter before the epilogue.
13. **Epilogue: how this gets built, and where it's going** — Rich OS (the product-
    engineering system behind the newer builds) and the Kenya Design Library (121
    competitor teardowns grounding design/trust/security decisions), plus one short,
    unclaimed teaser line about what's incubating next (see §8). Not a pitch, a "here's the
    machine, and it's still running" close.

## 5. `content.ts` restructuring

Add a `chapters` export alongside (not replacing) `projects`:

```ts
export interface Chapter {
  projectSlug: string;       // references Project.slug
  number: number;
  chapterTitle: string;      // "The network", not the product name
  beats: { problem: string; built: string; now: string }; // first person
  stat?: { value: string; label: string };
  screenshotStatus: "ready" | "pending" | "text-only";
}
export const chapters: Chapter[] = [ /* §4 order */ ];
```

`name`, `stack`, `repoUrl`, `liveUrl`, `badge` keep living on `Project`, looked up by
`projectSlug`. New `Project` entries needed for Wealth Track, Dobi Go, LoopHole, Track My
Kid, and re-adding AI-Powered Helpdesk to the chapter set — pull real repo/live URLs and
stack lists from each project's own README before writing these.

## 6. Screenshots — manual, simple (per owner decision)

No new build tooling. Convention:

- Each source project keeps its own screenshots wherever makes sense for that project
  (e.g. `~/Projects/Wealth Track/screenshots/`, `~/Projects/Track My Kid/assets/img/`
  already has some).
- A short Node script in this repo, `scripts/sync-screenshots.mjs`, holds a small manifest
  (`{ slug: "wealth-track", source: "~/Projects/Wealth Track/screenshots/dashboard.png" }`)
  and copies each into `src/assets/projects/<slug>/cover.{ext}` on demand via
  `npm run sync:screenshots`. Owner edits the manifest by hand when a new screenshot is
  ready; nothing runs automatically.
- Chapters with no screenshot yet ship as `screenshotStatus: "text-only"` rather than
  placeholder art — deliberate departure from v3 for the narrative page specifically.

## 7. "What do you need?" search (new)

A search bar on Home, near the hero or replacing part of the services strip: a visitor
types a plain need ("I need a website", "someone to fix my network", "help organizing
inventory") and it surfaces the matching service(s) and/or story chapter(s) as a small
result card with a link to `/contact` or straight into that chapter on `/story`.

- **Client-side only, no backend or AI call.** A static keyword/synonym match against
  `services` and `chapters` (already in `content.ts`) — keeps the site a static build with
  no API cost or exposed key, consistent with everything else here.
- Synonym table lives in `content.ts` or a small `search.ts` next to it (e.g. "site",
  "webapp", "app" all map to Web Development; "wifi", "network", "internet" map to
  Networking & ISP Setup and the ISP chapter).
- Empty/no-match state: don't dead-end — show the full services list and a "or just tell me
  directly" mailto link.
- Same accessibility bar as everything else: labeled input, visible focus state, results
  announced to screen readers.

## 8. The Gikomba/informal-market idea — parked, not folded in here

The owner described a second, much bigger idea: a WhatsApp-native marketplace for informal
Kenyan traders (Gikomba market and similar) who sell daily but have no online presence and
rely heavily on brokers. Concept: sellers send a photo, description, and price over
WhatsApp; a Rich OS agent organizes the photos, deduplicates listings, and applies a
grading standard; the result becomes an online catalogue; buyers ask "still available?" and
pay. The hard problem, by the owner's own read, is record-keeping: an auction-style catalogue
needs a single source of truth for "is this still available" the moment two buyers want the
same item.

**Recommendation: build this as its own product under Rich OS, not as a feature inside the
portfolio codebase.** Reasoning:

- It's a real multi-sided marketplace with payments, seller PII, and inventory concurrency
  (reservation holds, race conditions on "still available") — a different risk and uptime
  profile than a personal marketing site. Bidii, Nyumbani, Dobi Go, and Wealth Track already
  live as separate repos for the same reason; this deserves the same treatment, with its own
  name and its own room to grow past whatever fits in a portfolio.
- The record-keeping problem is a known pattern (short-lived reservation hold with an
  expiry, one ledger of truth the WhatsApp intake and the public catalogue both write
  through) — worth its own design pass when the owner is ready to build it, not squeezed
  into this revamp.
- Folding the *idea* into the portfolio costs nothing and fits the ecosystem story
  perfectly: it's exactly the kind of thing the epilogue chapter (§4.13) exists for — one
  unclaimed line naming what's being incubated next, no promises, no half-built feature on
  the live site.

So: **name it in the epilogue's teaser line, build it later as its own repo** when there's
time to give the record-keeping problem a real design pass. Say the word and that becomes
its own concept doc.

## 9. Explicitly out of scope for this pass

- No automatic pulling of screenshots from Rich OS, live device capture, or CI-driven
  screenshot generation.
- No CMS, no headless content source. `content.ts` stays the single file.
- The Gikomba marketplace itself (§8) — teaser mention only.

## 10. Decision status

1. **Chapter order (§4)** — tentative, still needs a look. Helpdesk was re-added and moved;
   everything else is unchanged from the first draft.
2. **Voice** — resolved: first person throughout `/story`.
3. **`/projects` grid in nav** — resolved: stays as a fallback, not the primary nav link
   (§3).
4. **AI-Powered Helpdesk** — resolved: kept, repositioned as chapter 5 (§4).
5. **Wealth Track / Dobi Go readiness** — resolved: publish now with an honest "in build"
   badge rather than holding back; showing work in progress supports the ecosystem story
   rather than undermining it.

## 11. Acceptance checklist (once §10 item 1 is confirmed and build starts)

- [ ] All v3 acceptance items still pass (build clean, routes reachable, button rules,
      contrast, reduced-motion).
- [ ] Every chapter has either a real screenshot or an explicit `text-only` treatment.
- [ ] Chapter rail is keyboard-navigable and screen-reader labeled (chapter number + title
      as an accessible name, not just a numeral).
- [ ] `prefers-reduced-motion`: chapter transitions cut to instant/opacity-only, no
      scroll-jacking.
- [ ] `sync-screenshots.mjs` documented in `README.md`.
- [ ] Search bar (§7) has a real empty state, is keyboard-usable, and never calls a network
      API.
- [ ] No em dash in any new chapter or search-result copy.
