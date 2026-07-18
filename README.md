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

## Deployment

See `IMPLEMENTATION_AND_HOSTING.md` for how this was built and how to deploy it to Vercel.
