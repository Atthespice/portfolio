import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { contacts, footerLine } from "../content";
import { GithubMark } from "./icons/GithubMark";

/** Shared on every page, per §2/§5. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-ink px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="text-lg font-black tracking-tight text-silver">
            RM<span className="text-yellow">.</span>
          </Link>
          <p className="mt-2 max-w-sm text-sm text-mist/80">{footerLine}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${contacts.email}`}
            className="flex min-h-11 flex-shrink-0 items-center gap-2 text-sm text-mist transition-colors hover:text-yellow"
          >
            <Mail size={16} aria-hidden />
            {contacts.email}
          </a>
          <a
            href={contacts.github}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 flex-shrink-0 items-center gap-2 text-sm text-mist transition-colors hover:text-yellow"
          >
            <GithubMark size={16} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
