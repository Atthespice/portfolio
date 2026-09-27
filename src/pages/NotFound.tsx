import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { notFoundCopy, pageTitles } from "../content";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function NotFound() {
  useDocumentTitle(pageTitles.notFound);
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="text-7xl font-black text-yellow">404</p>
      <h1 className="mt-4 text-3xl font-black uppercase text-silver sm:text-4xl">{notFoundCopy.title}</h1>
      <p className="mt-3 text-mist/75">{notFoundCopy.text}</p>
      <Link
        to="/"
        className="mt-8 flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        <ArrowLeft size={16} aria-hidden />
        {notFoundCopy.button}
      </Link>
    </section>
  );
}
