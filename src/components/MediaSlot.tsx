import { getProjectImage } from "../lib/projectImages";

const gradientVariants = [
  "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-yellow) 35%, transparent), transparent 60%), radial-gradient(circle at 80% 75%, color-mix(in srgb, var(--color-blue) 40%, transparent), transparent 55%), var(--color-surface)",
  "radial-gradient(circle at 80% 15%, color-mix(in srgb, var(--color-blue) 40%, transparent), transparent 55%), radial-gradient(circle at 15% 85%, color-mix(in srgb, var(--color-yellow) 30%, transparent), transparent 60%), var(--color-surface)",
  "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-yellow) 25%, transparent), transparent 65%), radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-blue) 35%, transparent), transparent 60%), var(--color-surface-2)",
  "radial-gradient(circle at 10% 50%, color-mix(in srgb, var(--color-blue) 30%, transparent), transparent 60%), radial-gradient(circle at 90% 50%, color-mix(in srgb, var(--color-yellow) 30%, transparent), transparent 60%), var(--color-surface)",
];

interface MediaSlotProps {
  slug: string;
  alt: string;
  variant?: number;
  className?: string;
}

/**
 * Layered mesh-gradient + grain placeholder (§4) that transparently swaps for a
 * real screenshot the moment one exists at src/assets/projects/<slug>/cover.*.
 */
export function MediaSlot({ slug, alt, variant = 0, className = "" }: MediaSlotProps) {
  const image = getProjectImage(slug);
  const gradient = gradientVariants[variant % gradientVariants.length];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="bg-grain relative h-full w-full" style={{ background: gradient }} aria-hidden={!!alt} role={alt ? "img" : undefined} aria-label={alt}>
          <div className="absolute inset-0 border border-white/5" />
        </div>
      )}
    </div>
  );
}
