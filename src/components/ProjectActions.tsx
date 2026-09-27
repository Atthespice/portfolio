import { ExternalLink } from "lucide-react";
import type { Project } from "../content";
import { GithubMark } from "./icons/GithubMark";

/**
 * Repo/badge/live-link button row per §6 rules. Shared between ProjectCard (grid)
 * and Chapter (story), so the button logic only lives in one place.
 */
export function ProjectActions({ project }: { project: Project }) {
  if (project.hideButtons) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-mist transition-colors hover:border-yellow hover:text-yellow"
        >
          <GithubMark size={16} />
          View Repo
        </a>
      )}

      {project.badge && (
        <span className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-blue/50 bg-blue/10 px-4 text-sm font-medium text-blue">
          {project.badge}
        </span>
      )}

      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          <ExternalLink size={16} aria-hidden />
          Live Project
        </a>
      ) : !project.badge ? (
        <span
          aria-disabled="true"
          className="flex min-h-11 flex-shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-mist/40"
        >
          Live link coming soon
        </span>
      ) : null}
    </div>
  );
}
