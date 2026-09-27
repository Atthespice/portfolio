import { services, chapters, projects } from "../content";

export interface SearchResult {
  type: "service" | "project";
  title: string;
  blurb: string;
  to: string;
}

// Plain-language terms a visitor might type, mapped onto each service's title.
// Keeps the search static (no backend, no API call) while still understanding
// "I need a website" the same way it understands "Apps & websites".
// Keys must match the service titles in content.ts.
const serviceSynonyms: Record<string, string[]> = {
  "Apps & websites": ["website", "web app", "webapp", "app", "site", "software", "system", "build", "development"],
  "Internet & Wi-Fi setup": ["wifi", "wi-fi", "network", "internet", "isp", "router", "cabling", "lan"],
  "Tech support": ["laptop", "computer", "fix", "repair", "install", "troubleshoot", "hardware", "support"],
  "Branding & design": ["logo", "brand", "design", "graphics", "wrap", "poster", "identity"],
  "Social media & content": ["social media", "content", "video", "photography", "instagram", "page", "posts"],
};

// Filler words in "I need someone to..." that would otherwise match story text like "needed".
const STOP_WORDS = new Set(["need", "needs", "want", "someone", "with", "for", "the", "and", "can", "you", "please", "get", "make"]);

interface IndexEntry {
  result: SearchResult;
  haystack: string;
}

function buildIndex(): IndexEntry[] {
  const serviceEntries: IndexEntry[] = services.map((service) => ({
    result: { type: "service", title: service.title, blurb: service.description, to: "/contact" },
    haystack: [service.title, service.description, ...(serviceSynonyms[service.title] ?? [])].join(" ").toLowerCase(),
  }));

  const chapterEntries: IndexEntry[] = chapters.map((chapter) => {
    const chapterProjects = chapter.projectSlugs
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p) => p !== undefined);
    return {
      result: {
        type: "project",
        title: chapter.chapterTitle,
        blurb: chapter.beats.now,
        to: `/story#chapter-${chapter.number}`,
      },
      haystack: [
        chapter.chapterTitle,
        chapter.beats.problem,
        chapter.beats.built,
        ...chapterProjects.flatMap((p) => [p.name, ...p.stack]),
      ]
        .join(" ")
        .toLowerCase(),
    };
  });

  return [...serviceEntries, ...chapterEntries];
}

/** Client-side keyword match, no network call. Good enough for a static site's search bar. */
export function search(query: string, limit = 4): SearchResult[] {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 2 && !STOP_WORDS.has(term));
  if (terms.length === 0) return [];

  const scored = buildIndex()
    .map(({ result, haystack }) => ({
      result,
      score: terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.result);
}
