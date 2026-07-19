import { Mail, Phone, MapPin } from "lucide-react";
import { contacts, footerLine } from "../content";
import { GithubMark } from "../components/icons/GithubMark";

const rows = [
  { icon: Mail, label: contacts.email, href: `mailto:${contacts.email}` },
  { icon: Phone, label: contacts.phone, href: `tel:${contacts.phone.replace(/\s+/g, "")}` },
  { icon: GithubMark, label: "GitHub: Atthespice", href: contacts.github },
  { icon: MapPin, label: contacts.location, href: undefined },
];

export function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-4xl font-black uppercase text-silver sm:text-6xl">Let's talk</h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-mist/75">{footerLine}</p>

      <a
        href={`mailto:${contacts.email}`}
        className="mx-auto mt-10 flex min-h-11 w-fit flex-shrink-0 items-center gap-2 rounded-full bg-yellow px-8 text-base font-semibold text-ink transition-opacity hover:opacity-90"
      >
        <Mail size={18} aria-hidden />
        {contacts.email}
      </a>

      <div className="glass-panel mx-auto mt-14 flex max-w-md flex-col divide-y divide-border rounded-2xl text-left">
        {rows.map((row) => {
          const Icon = row.icon;
          const content = (
            <span className="flex min-h-11 flex-shrink-0 items-center gap-3 px-5 text-sm text-mist">
              <Icon size={18} className="text-blue" />
              {row.label}
            </span>
          );
          return row.href ? (
            <a
              key={row.label}
              href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noreferrer" : undefined}
              className="transition-colors hover:bg-surface-2/60"
            >
              {content}
            </a>
          ) : (
            <div key={row.label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
