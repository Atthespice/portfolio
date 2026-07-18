# PORTFOLIO_SPEC.md — Rich Maina Portfolio (v3, multi-page)

> **To Claude Code:** Build this portfolio exactly as specified. The owner is a Diploma in IT
> student who learns by doing — **explain each significant decision as you make it**
> (structure, hooks, animation logic) in one or two sentences as you go. Ask before
> deviating from this spec. A reference implementation of the previous single-page
> version exists in `RichMainaPortfolioV2.jsx` (if present in the repo root) — reuse its
> logic where useful, but this spec supersedes it.

---

## 1. Project setup

- **Stack:** Vite + React 18 + TypeScript, Tailwind CSS, Framer Motion, React Router v6, lucide-react.
- **Fonts:** Kanit (Google Fonts, weights 300–900).
- **Deployment target:** Vercel. Must pass `npm run build` cleanly.
- **All text content lives in `src/content.ts`** — a single typed module exporting bio,
  contacts, services, tech stack, and the projects array. Components never hard-code copy.
- **Assets convention:** `src/assets/projects/<slug>/` for real screenshots/photos the
  owner will add. Components fall back to generated placeholder art (see §4) when a
  real asset is missing.

## 2. Site structure (multi-page, React Router)

| Route | Page | Contents |
|---|---|---|
| `/` | Home | Hero (emblem + gradient headline), scroll marquee, about teaser, 3 featured projects, services strip, CTA to /contact |
| `/projects` | Projects | Full grid of ALL projects (§6) with tech tags, category filters (Client / Group / Academic / Infrastructure / Freelance), and Live Project buttons |
| `/about` | About | Full bio, skills & tech stack (§7), certifications & awards, education |
| `/contact` | Contact | Contact block (§5), large mailto CTA, GitHub link |

- Shared `<Navbar />` (links: Home, Projects, About, Contact) and `<Footer />` on every page.
- Navbar collapses to a hamburger below 640px.
- Scroll restored to top on route change.

## 3. Design system

**Identity: "Tarmac hybrid"** — the Jack-spec skeleton with Rich's identity.

- Background: `#0C0C0C` (html, body, #root)
- Display text: silver gradient `linear-gradient(180deg,#646973 0%,#BBCCD7 100%)` clipped to text
- Accent 1 (primary): road-marking yellow `#F5B921`
- Accent 2: signal blue `#3D7BFF`
- Body/UI text: `#D7E2EA`
- Surfaces: `#14151B` / `#1E2027`, borders `#22242C`
- Services page section keeps the **white sheet** treatment (`#FFFFFF`, rounded-top 60px) inside Home.
- Typography: Kanit; hero display `clamp`-driven (~15vw on Home hero), headings font-black uppercase tight leading.
- **Signature element:** the RM emblem — monogram in a dashed road-ring with signal
  waves and yellow/blue orbit lines, magnetic mouse-follow hover (Framer Motion or
  pointer-tracking transform).

## 4. Art direction — visual quality bar (IMPORTANT)

The previous flat line-art SVG tiles were too basic. Target the quality level of modern
motion-portfolio sites (e.g. the previews on motionsites.ai) **without copying any of
their assets**:

- Layered **mesh/radial gradient backgrounds** with subtle grain/noise texture (SVG
  turbulence or a tiling noise PNG generated in-project)
- **Glassmorphic panels** (blur, 1px translucent borders, inner glow) for tile content
- Soft depth shadows and glow in the yellow/blue accents
- **Hover motion:** slight parallax/tilt and animated gradient borders on project tiles
- Marquee tiles and project-card imagery use this treatment as placeholders; each has a
  slot that swaps to a real screenshot from `src/assets/projects/<slug>/` when present
- Prefer real assets when provided: DSMIS UI screenshots, Bidii wrap mockups, network
  install photos, Strava composite poster

## 5. Global content (verbatim — from content.ts)

**Hero tagline:** "Full-stack developer and creative technologist — building software,
networks, and brands that businesses in Nairobi run on."

**About (full, About page):**
"I'm Mwangi Rich Maina — a full-stack developer, network operator, and designer based in
Nairobi. I currently operate a live 30-user residential internet service on MikroTik
infrastructure and am building a complete management information system for a real
driving school client. I'm a certified full-stack developer (Safaricom Power Learn
Project) with cybersecurity training in progress. What sets my work apart is planning:
I take a client's problem end-to-end — scoping it properly, building it well, and
communicating clearly at every step. Big ideas, disciplined execution."

**Footer line (all pages):** "Ambitious by nature, methodical by practice — open to
freelance work."  *(No attachment mention anywhere.)*

**Contacts (Contact page + footer):**
- Email: richmaina0@gmail.com (mailto CTA)
- Phone: 0727 305 152
- GitHub: https://github.com/Atthespice
- Location: Nairobi, Kenya

**Services (5, numbered list on Home):**
1. **Web Development** — Full-stack builds with React, Vite, Node.js and Supabase — from
   student registration systems to REST and SMS API integrations that businesses run on.
2. **Networking & ISP Setup** — MikroTik RouterOS configuration, LAN design, cabling and
   switch deployment. I design, install and operate — including a live 30-user, 200 Mbps
   building network.
3. **IT Support** — Hardware and software diagnostics, OS installation and maintenance,
   and patient first-line user support that keeps people working instead of waiting.
4. **Brand & Graphic Design** — Brand identities, vehicle wrap mockups and marketing
   collateral in Photoshop, Lightroom and Canva — visuals built to be remembered on the
   street.
5. **Social Media & Content** — Planning, photography, videography and page management
   that grow engagement — currently running official pages for two Nairobi institutions.

**Certifications & awards (About page):**
- Full-Stack Development Certificate — Safaricom Power Learn Project, graduated July 2025
- Cybersecurity Certificate (in progress) — Cyber Shujaa, expected Dec 2026
- Silver Prize, 16th International Standards Olympiad (2021) — sponsored by KEBS
- County-Level Winner, Kenya Science & Engineering Fair — health innovation (diabetes management)
- Volunteer Coding Instructor & Science Mentor — Thika High School (Feb–Apr 2026)

**Education (About page):**
- Diploma in Information Technology — KCA University, Nairobi (Sep 2024 – Dec 2026, expected)
- KCSE — Thika High School (2020–2023)

## 6. Projects (Projects page grid; first three featured on Home)

Each project in `content.ts`: `{ slug, name, category, role, description, stack[],
repoUrl?, liveUrl?, featured }`.
**Live Project button behavior:** if `liveUrl` is null → render a disabled ghost button
labeled "Live link coming soon". Owner will fill URLs later.

1. **Bidii Driving School MIS** — Client · Academic capstone (featured)
   Full management information system for a Nairobi driving school: student registration,
   NTSA PDL/IDL licence tracking, fee management in KES, and SMS notifications — backed
   by a 40-page IEEE/ISO-standard SRS.
   Stack: React, Vite, Supabase (PostgreSQL, Auth), Africa's Talking SMS. Live: TBD.

2. **Residential ISP — 3 Floors, 30 Users** — Live infrastructure (featured)
   Designed, installed, and operate a building-wide internet service on a 200 Mbps
   uplink: MikroTik hEX (DHCP, NAT, firewall), three cascaded switches on a structured
   192.168.10.0/24 subnet, with ongoing first-line support. Operating since Jan 2025.
   Stack: MikroTik RouterOS, LAN design, IP subnetting. (No repo/live link — show a
   "Live since 2025" badge instead of the button.)

3. **Katiba OS** — Group personal project (featured)
   A legal workflow platform for East Africa, starting with Kenya. Turns scattered
   evidence — voice notes, M-Pesa records, invoices, chats — into organized,
   evidence-linked case files that a human legal professional reviews and approves.
   Flagship Justice Engine works end-to-end: bilingual intake (English/Kiswahili, with
   voice), evidence-linked timelines with confidence scoring, allow-listed legal
   citations, and a downloadable PDF preparation pack. Built with a human-approval
   gate — the AI never files or decides anything on its own.
   Stack: React 19, TypeScript, Vite, Express 5, Zod, SQLite, Recharts, PWA, Flutter,
   OpenAI API, Vitest, Playwright. Repo: on GitHub (owner to insert URL). Live: TBD.

4. **AI-Powered Helpdesk** — Personal/portfolio build
   Ticket management system with AI assistance: intake via email, web form, and chat;
   AI classification, summaries, and draft-only suggested replies that an agent must
   review and approve; priority levels with SLA due-by tracking; admin and agent roles.
   Stack: TypeScript, Docker, Node.js. Repo: https://github.com/Atthespice/helpdesk. Live: TBD.

5. **Mwirigo Emergency Reporting System** — Collaborative academic build
   Digital emergency platform for the Mwirigo community: residents report fires, medical
   crises, and security incidents instantly with GPS location, replacing manual
   phone-and-word-of-mouth coordination, so responders can verify, dispatch, and
   coordinate from one place.
   Stack: HTML, CSS, JavaScript. Repo:
   https://github.com/Atthespice/mwirigo-emergency-reporting-system. Live: TBD.
   *(Owner: adjust credit line if needed — proposal authored with Venessa Nyaboke.)*

6. **Safaricom PLP — MERN Capstone** — Academic (Power Learn Project)
   Full-stack MERN application built during the Safaricom Power Learn Project full-stack
   program (MongoDB, Express, React, Node.js).
   Stack: MongoDB, Express, React, Node.js. Repo: TBD (owner to insert). Live: TBD.
   *(Owner: add one sentence on what the app does before launch.)*

7. **Brand & Media — Bidii + Best Kenya College** — Freelance
   Vehicle wrap mockups, promotional graphics and marketing collateral, plus official
   social media management for two Nairobi institutions (2024 – present).
   Stack: Photoshop, Lightroom, Premiere Pro, Canva. (Gallery-style card; no repo button.)

> **Removed per owner:** plp-final-project repo. Do not list it.

## 7. Tech stack (About page, grouped)

- **Frontend:** React, Vite, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Framer Motion
- **Backend & data:** Node.js, Express, MongoDB, Supabase (PostgreSQL, Auth), SQLite, REST APIs, Zod
- **Integrations:** Africa's Talking SMS, Safaricom Daraja (M-Pesa), OpenAI API
- **DevOps & testing:** Docker, Git/GitHub, Vercel, PWA/service workers, Vitest, Playwright
- **Networking:** MikroTik RouterOS (DHCP, NAT, firewall, bandwidth mgmt), LAN design & cabling, IP subnetting, switch deployment
- **Creative:** Photoshop, Lightroom, Premiere Pro, Canva

> **Removed per owner:** Python/Pillow. Do not list Python anywhere.

## 8. Page details

### Home
Jack-spec skeleton adapted: full-viewport hero (navbar → giant gradient "HI, I'M RICH"
with "RICH" in yellow → RM emblem with magnetic hover → bottom bar: tagline left,
Contact button right). Then the dual-row scroll-driven marquee (opposite directions,
tiles per §4). Then about teaser with character-by-character scroll reveal + link to
/about. Then the white Services sheet (rounded top, 5 numbered items). Then 3 featured
projects as sticky-stacking scale-down cards (Framer Motion useScroll/useTransform,
scale step 0.03, offset 28px), pulled up over the white sheet with rounded top. CTA
footer to /contact.

### Projects
Header + filterable grid (all 7 items). Cards use §4 art treatment, tech-tag chips,
repo + live buttons per §6 rules. Featured items get larger cards.

### About
Gradient "About me" heading, full bio, tech stack groups (§7), certifications timeline,
education. Corner decorative graphics per §4 (fade in from sides).

### Contact
Large gradient heading ("Let's talk"), mailto CTA button, contact rows (email, phone,
GitHub, location), footer line.

## 9. Responsiveness & button fixes (must-fix from v2)

- All buttons: `min-height: 44px` touch targets, `flex-shrink: 0`, padding scales down
  via clamp on small screens — never overflow their container
- Hero bottom bar stacks vertically below 640px; tagline and button must never collide
  with the emblem
- Navbar → hamburger below 640px
- Project-card action button wraps below the title on mobile
- Card grids collapse to one column below 640px
- Visible keyboard focus states on every interactive element
- `prefers-reduced-motion`: disable marquee drift, char-reveal (render full opacity),
  and card scaling

## 10. Extras

- **CV download button** (navbar or About): links `/cv/Rich_Maina_IT_Resume.pdf` in `public/`
- **Meta/OG tags:** title "Rich Maina — Full-Stack Developer & Creator", description from
  hero tagline, OG image generated from the emblem
- **Optional enhancement (ask owner first):** fetch public repos from the GitHub API at
  build time to auto-append new projects
- Create a **CLAUDE.md** in the repo root containing: the design tokens from §3, the
  content-lives-in-content.ts rule, the §9 responsive rules, and this instruction:
  "The owner is learning — briefly explain significant technical decisions as you make
  them, and wait for confirmation before large refactors."

## 11. Acceptance checklist

- [ ] `npm run build` passes; no TypeScript errors
- [ ] All 4 routes render and are reachable from the navbar on mobile and desktop
- [ ] No Python, no plp-final-project, no attachment wording anywhere
- [ ] Every project shows correct stack tags; null liveUrl renders "Live link coming soon" disabled
- [ ] Buttons pass the §9 rules at 360px, 768px, and 1440px widths
- [ ] Lighthouse: no contrast failures on yellow-on-dark or dark-on-white text
