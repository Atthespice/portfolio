import { Link } from "react-router-dom";
import { projects } from "../content";
import { MediaSlot } from "./MediaSlot";

/**
 * Static grid of project tiles (§2/§4). This used to be a dual-row marquee whose
 * position was tied to scroll progress via useTransform, but that constant
 * recalculation blurred on mobile Safari/Chrome as you scrolled. A static grid
 * shows the same tiles with none of that: no scroll listener, nothing to blur.
 *
 * Each tile links to the Projects page rather than a project's own live URL: this
 * is a teaser grid, not a set of exit links, so a click should take a visitor
 * somewhere they can actually read what the project is before going anywhere else.
 */
export function Marquee() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-16 sm:grid-cols-4 sm:px-6">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          to="/projects"
          className="glass-panel group overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:scale-[1.02]"
        >
          <MediaSlot slug={project.slug} alt="" variant={index} className="aspect-[16/10] w-full" />
          <div className="p-3">
            <p className="truncate text-sm font-semibold text-mist group-hover:text-yellow">{project.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
