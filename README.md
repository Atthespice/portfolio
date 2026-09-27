# Rich Maina — Portfolio

Multi-page portfolio built with Vite, React 18, TypeScript, Tailwind CSS, Framer Motion,
and React Router. See `PORTFOLIO_SPEC.md` for the full spec this was built against, and
`CLAUDE.md` for the design tokens and rules future changes should follow.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content

All site copy — bio, contacts, services, tech stack, projects — lives in
`src/content.ts`. Edit that file to update copy; no component code needed.

## Project screenshots

Drop a real image into `src/assets/projects/<slug>/cover.{png,jpg,webp}` and it replaces
the generated placeholder art automatically. See `src/assets/projects/README.md`.

Or, if the real screenshot lives elsewhere in `~/Projects/<app>/`, add an entry to
`MANIFEST` in `scripts/sync-screenshots.mjs` and run `npm run sync:screenshots` to copy
it in. Manual by design, nothing runs automatically.

## "What's slowing your work down?" box

The box under the hero sends a visitor's problem (plus an optional phone/email) to
`api/problem.ts`, a Vercel function that emails it to you through [Resend](https://resend.com).
One-time setup: create a free Resend account with your own email, create an API key, then add
`RESEND_API_KEY` (and optionally `PROBLEM_INBOX_EMAIL`) in Vercel > Project > Settings >
Environment Variables. For local testing put the same values in `.env.local` (see `.env.example`).
Without a key, `npm run dev` prints messages to the terminal instead of emailing them.

## Story

`/story` (see `NARRATIVE_REVAMP_SPEC.md`) is a chaptered, first-person narrative through
every real project, replacing the grid as the primary "Projects" experience. The grid
itself still lives at `/projects` as a fast fallback, linked from the top of `/story`.
Chapter content lives in `content.ts` (`chapters`, `storyEpilogue`), same rule as
everything else: no copy in component code.

## $RICH: the "invest in me" ticker

A stock-style chart on Home (and a pill in the navbar on every page) that turns the Story
road map into a running price. It's not a real coin or share, just a fun way to say "get
in early": the price is rebuilt from each stop's status in `content.ts` (`chapters`), so it
only moves when a real project moves. Price logic lives in `src/lib/ticker.ts`, copy and
the point values in `content.ts`'s `investTicker`, UI in `src/components/InvestTicker.tsx`.

## Deployment

See `IMPLEMENTATION_AND_HOSTING.md` for how this was built and how to deploy it to Vercel.
Vercel's **Deployment Protection** must be disabled (Settings → Deployment Protection) for
the site to actually be public, otherwise every URL redirects to a Vercel login page.

## Progress log

`PROGRESS.md` is a dated running log of what changed, what's blocked, and what's next.
Add an entry there each session instead of only saying it in chat.
