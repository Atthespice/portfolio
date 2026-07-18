import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/**
 * Shared on every page. Collapses to a hamburger below 640px (Tailwind's `sm`
 * breakpoint) per §2/§9 — the desktop link row and the mobile menu are two
 * separate trees rather than one that reflows, so touch targets stay full-size
 * on mobile instead of shrinking to fit.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `min-h-11 flex items-center px-3 text-sm font-medium uppercase tracking-wide transition-colors ${
      isActive ? "text-yellow" : "text-mist hover:text-yellow"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="min-h-11 flex items-center text-lg font-black tracking-tight text-silver" onClick={() => setOpen(false)}>
          RM<span className="text-yellow">.</span>
        </Link>

        <div className="hidden sm:flex sm:items-center sm:gap-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
          <a
            href="/cv/Rich_Maina_IT_Resume.pdf"
            download
            className="ml-2 flex min-h-11 flex-shrink-0 items-center gap-2 rounded-full border border-yellow px-4 text-sm font-semibold text-yellow transition-colors hover:bg-yellow hover:text-ink"
          >
            <Download size={16} aria-hidden />
            CV
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-mist sm:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <a
                href="/cv/Rich_Maina_IT_Resume.pdf"
                download
                className="my-2 flex min-h-11 flex-shrink-0 items-center justify-center gap-2 rounded-full border border-yellow px-4 text-sm font-semibold text-yellow"
              >
                <Download size={16} aria-hidden />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
