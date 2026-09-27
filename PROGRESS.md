# Progress

### 2026-09-27
- Rebuilt Home around a story: globe hero (photo pinned to Nairobi, click to "launch" into
  `/story`), a chaptered road-map replacing the old scrolling project marquee, a new
  interactive About page (Before/After switch, counting stats, tabbed toolbox), and the
  "What's slowing your work down?" problem box (`api/problem.ts`, emails via Resend).
- Added the **$RICH "invest in me" chart** to Home: a stock-style card whose price is
  rebuilt from the real Story stops (`chapters` in `content.ts`, `+40` live / `+25`
  finished / `+15` building), with a dashed "coming next" point for the unstarted Gikomba
  project, a scrubbable chart, a navbar pill (`$RICH ▲360%`) linking to it from every page,
  per-stop `$RICH +N` badges on the Story map/book, and an "earnings report" block on
  About. Clear disclaimer that it isn't a real coin/share and never asks for money.
- Added a plain-words privacy note under the problem box (what's collected, that it's
  emailed via Resend in the US so it leaves Kenya, how to ask for deletion, Data Protection
  Act reference) and a consent line by the send button.
- Real WhatsApp/Facebook/X link preview: a designed 1200x630 JPG (`public/og-image.jpg`),
  absolute-URL `og:`/`twitter:` tags, no em dashes in the title.
- Mobile-data pass: every page except Home and the WebGL globe now code-splits
  (`React.lazy`/`Suspense`), and the two real photos were resized to display size and
  converted to WebP (276 kB → 106 kB combined).
- Ran the `pre-launch-checklist` skill before pushing: `npm audit fix` (4 vulnerabilities,
  3 high, down to 0), added `vercel.json` (SPA rewrite so deep links like `/story` don't
  404, plus a CSP and security headers, tested against the built site with those headers
  applied), `robots.txt`/`sitemap.xml`/`llms.txt`/Person JSON-LD, a real `<title>` per page,
  a `/*` 404 page, and brighter low-contrast text to meet WCAG AA.
- Committed `b053e32`, pushed to `origin/master`. Vercel build succeeded.

**Blocker:** Vercel **Deployment Protection** is still ON for this project. Every URL
(including the ones WhatsApp's preview bot would fetch) 302s to a Vercel login page, so
the site is not actually visible to the public yet. Fix is one setting: Vercel dashboard
→ this project → **Settings → Deployment Protection** → disable "Vercel Authentication".
Also unconfirmed: whether `RESEND_API_KEY` is set in Vercel's env vars (needed for the
problem box to actually send email in production, not just locally).

**Next:**
- User to disable Deployment Protection, confirm `RESEND_API_KEY` is set, then verify the
  WhatsApp preview and the live problem-box send end to end.
- User sending real project screenshots "probably at the end of the week" — drop into
  `src/assets/projects/<slug>/cover.*` or add to `scripts/sync-screenshots.mjs`'s
  `MANIFEST` (see README).
- Mini-game: pitched three ideas, awaiting the user's pick before building:
  1. **"Beat the notebook"** (recommended) — a 30-second drag-race on Home matching
     M-Pesa messages to tenants by hand vs. the app doing it instantly, ending at the
     problem box. Reuses the About page's Before/After framing; least build effort.
  2. **Road-map runner** — tap-to-jump runner along the Story road, checkpoints at each
     stop add their `$RICH` value to a score. Most build effort, needs care to feel good
     on cheap phones.
  3. **Stack the Wi-Fi** — small coverage puzzle on stop 1 (building Wi-Fi). Least tied to
     the app portfolio itself.
  Whatever's picked: touch + keyboard playable, skippable, respects reduced-motion, and
  loads only on tapping "Play" (no cost when not played).
