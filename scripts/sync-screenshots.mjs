#!/usr/bin/env node
// Copies real screenshots from their source project folders into
// src/assets/projects/<slug>/cover.<ext>, where projectImages.ts picks them up
// automatically. Manual and simple by design (NARRATIVE_REVAMP_SPEC.md §6):
// edit MANIFEST below when a new screenshot is ready, then run
// `npm run sync:screenshots`. Nothing here runs on a schedule.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectsDir = join(__dirname, "..", "src", "assets", "projects");

/** @type {Record<string, string>} slug -> source screenshot path (~ expands to $HOME) */
const MANIFEST = {
  // "wealth-track": "~/Projects/Wealth Track/screenshots/dashboard.png",
  // "dobi-go": "~/Projects/Dobi Go/screenshots/ops-console.png",
  // "loophole": "~/Projects/LoopHole/screenshots/demo.png",
  // "track-my-kid": "~/Projects/Track My Kid/assets/img/hero.png",
};

function resolveHome(path) {
  return path.startsWith("~") ? join(homedir(), path.slice(1)) : path;
}

let copied = 0;
for (const [slug, sourcePath] of Object.entries(MANIFEST)) {
  const resolved = resolveHome(sourcePath);
  if (!existsSync(resolved)) {
    console.warn(`skip ${slug}: not found at ${resolved}`);
    continue;
  }
  const destDir = join(projectsDir, slug);
  mkdirSync(destDir, { recursive: true });
  const dest = join(destDir, `cover${extname(resolved)}`);
  copyFileSync(resolved, dest);
  console.log(`${slug} -> ${dest}`);
  copied += 1;
}

console.log(copied ? `Synced ${copied} screenshot(s).` : "Nothing to sync. Add entries to MANIFEST first.");
