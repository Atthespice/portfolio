# Implementation notes & hosting guide

Companion to `PORTFOLIO_SPEC.md`. This explains **how** the key features were built and
**how to put the site online** on Vercel, step by step.

---

## 1. How the key features work

### Content separation (`src/content.ts`)
Every piece of copy — bio, contacts, services, tech stack, projects, certifications,
education — is a typed export from one file. Pages and components only ever `import` from
it. Practical effect: to add project #8, change your phone number, or reword a service,
you edit one file and nothing else.

### Design tokens (Tailwind v4 `@theme`)
Tailwind v4 changed how theming works: instead of a `tailwind.config.js` with a `colors`
object, you declare CSS variables inside an `@theme` block in `src/index.css` — Tailwind
then auto-generates utility classes from the variable names (`--color-yellow` →
`bg-yellow`, `text-yellow`, `border-yellow`, etc). This keeps every hex value in one
place; components never write raw hex.

### The RM emblem (magnetic hover)
`src/components/RMEmblem.tsx`. Framer Motion's `useMotionValue`/`useSpring` track the
pointer position relative to the emblem's own bounding box and ease the whole SVG toward
it — the "spring" is what gives it the soft magnetic-pull feel instead of snapping
instantly. Disabled under `prefers-reduced-motion`.

### Scroll-driven marquee
`src/components/Marquee.tsx`. Rather than a CSS `@keyframes` loop (which runs on a timer,
independent of the visitor), each row's horizontal position is a `useTransform` of the
page's `scrollYProgress` — literally tied to how far down the page you've scrolled. The
two rows map that same progress to opposite output ranges, producing the crossing effect.
Falls back to a static grid under reduced motion.

### Stacking/scaling featured project cards
`src/components/StackingProjects.tsx`. Each card is `position: sticky` with a small
increasing `top` offset (28px per spec). A shared tall container drives one
`useScroll`/`useTransform` per card, each mapped to a different slice of the scroll
range, so later cards scale earlier ones down slightly (0.03 step) as they scroll past —
the classic "stack of cards" effect. Falls back to a plain list under reduced motion.

### Character-by-character reveal
`src/components/CharReveal.tsx`. Uses Framer Motion's `staggerChildren` on a tree of
per-character `<motion.span>`s, triggered once via `whileInView` when the text scrolls
into the viewport. Renders as plain text instantly under reduced motion.

### Placeholder art that swaps for real screenshots
`src/lib/projectImages.ts` uses Vite's `import.meta.glob` to eagerly scan
`src/assets/projects/*/cover.*` at build time and builds a slug → URL map.
`src/components/MediaSlot.tsx` checks that map first; if nothing's there, it renders a
generated mesh-gradient + grain placeholder instead. Drop a real image in the right
folder and it swaps automatically — no code change, no rebuild logic needed beyond Vite's
normal build.

### Hover tilt + animated glow on project cards
`src/components/ProjectCard.tsx` tracks pointer position within the card and maps it to a
small `rotateX`/`rotateY` (springed, so it settles smoothly), plus a radial-gradient glow
that follows the same value. Skipped under reduced motion.

### Responsive & accessibility (§9)
- `useReducedMotion()` (`src/lib/useReducedMotion.ts`) wraps
  `matchMedia('(prefers-reduced-motion: reduce)')` — every animated component checks it
  and renders a static equivalent when true.
- Every button/link uses `min-h-11` (44px) + `flex-shrink-0` so touch targets never shrink
  or overflow.
- `:focus-visible` gets a visible yellow outline globally (`index.css`) — never
  overridden per-component.
- Navbar splits into two separate trees (desktop row vs. mobile dropdown) rather than one
  reflowing layout, so the mobile menu can have full-size tap targets.

### Routing
React Router v6 (`BrowserRouter`) with four routes in `App.tsx`. `ScrollToTop.tsx` resets
`window.scrollTo(0, 0)` on every route change, since React Router doesn't do this by
default — without it, navigating from the bottom of Projects to About would land you
mid-page.

---

## 2. What still needs the owner's input before launch

These are placeholders by design — the spec calls them out as things you'll fill in:

- **Project screenshots**: drop images into `src/assets/projects/<slug>/cover.*` per
  `src/assets/projects/README.md`.
- **Repo/live URLs**: a few projects have `repoUrl`/`liveUrl` set to `null` with an
  `ownerNote` in `src/content.ts` (Katiba OS repo, Safaricom PLP repo + description).
  Search that file for `ownerNote` to find them all.
- **OG image**: `public/og-image.svg` is generated from the emblem, but it's SVG — some
  platforms (older Facebook/LinkedIn crawlers) render OG images more reliably as PNG. If
  you hit that, screenshot the SVG at 1200×630 and save it as `public/og-image.png`, then
  update the two `content="/og-image..."` meta tags in `index.html`.
- **CV formatting**: `public/cv/Rich_Maina_IT_Resume.pdf` was rebuilt from the resume text
  you shared (no original file was reachable on disk to copy byte-for-byte), styled to
  read cleanly as a PDF. If you have the original file with your preferred exact layout,
  just drop it in over this one, same filename — no code changes needed.

---

## 3. Hosting on Vercel

The spec targets Vercel, and Vite + React + TypeScript is one of Vercel's auto-detected
frameworks — no config file needed.

### Step 1 — push the repo to GitHub
```bash
git add -A
git commit -m "Initial portfolio build"
```
Then create a new empty repository on GitHub (github.com/new — do **not** initialize it
with a README, since this repo already has one), and push:
```bash
git remote add origin https://github.com/Atthespice/<repo-name>.git
git branch -M main
git push -u origin main
```

### Step 2 — import into Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is simplest — it's
   the same account as `github.com/Atthespice`).
2. Click **Add New → Project**.
3. Select the repository you just pushed. Vercel detects "Vite" automatically and
   pre-fills:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **Install command**: `npm install`
   You shouldn't need to change any of these.
4. No environment variables are required — this is a fully static build with no backend.
5. Click **Deploy**. First deploy takes ~1 minute; you'll get a `*.vercel.app` URL.

### Step 3 — every future push auto-deploys
Once connected, Vercel watches the GitHub repo: every push to `main` triggers a new
production deploy, and every push to any other branch (or open PR) gets its own preview
URL. That's the whole workflow going forward — `git push`, wait ~60 seconds, refresh.

### Step 4 (optional) — custom domain
In the Vercel project → **Settings → Domains**, add your domain and follow the DNS
instructions Vercel shows (usually one `A` or `CNAME` record at your domain registrar).
Propagation is usually minutes, occasionally up to 24 hours.

### Verifying before you deploy
Run this locally first — it's exactly what Vercel runs:
```bash
npm run build
npm run preview
```
`npm run preview` serves the production build locally so you can click through it once
before pushing.
