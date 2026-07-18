// Eagerly globs any cover image dropped into src/assets/projects/<slug>/cover.*.
// This is what lets a real screenshot silently replace the generated placeholder
// (§4) the moment the owner adds one — no component code changes required.
const modules = import.meta.glob<string>("../assets/projects/*/cover.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const imagesBySlug: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/projects\/([^/]+)\/cover\./);
  if (match) imagesBySlug[match[1]] = url;
}

export function getProjectImage(slug: string): string | undefined {
  return imagesBySlug[slug];
}
