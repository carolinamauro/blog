"use client";

import { useState, type ReactNode } from "react";
import { t, type Lang } from "@/src/lib/i18n";

type Contact = {
  label: string;
  /** What gets shown (can include <wbr/> for nice wrapping) */
  display: ReactNode;
  /** Raw value copied to clipboard */
  copyValue: string;
  href: string;
  icon: ReactNode;
  hover: string;
  iconHover: string;
};

const contacts: Contact[] = [
  {
    label: "Email",
    display: (
      <>
        carolinaluciamauro@<wbr />gmail.com
      </>
    ),
    copyValue: "carolinaluciamauro@gmail.com",
    href: "mailto:carolinaluciamauro@gmail.com",
    hover: "hover:border-cyan-300/60",
    iconHover: "group-hover:text-cyan-200",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    label: "Teléfono",
    display: <>(+54 9) 11 6799 4226</>,
    copyValue: "+5491167994226",
    href: "tel:+5491167994226",
    hover: "hover:border-pink-300/60",
    iconHover: "group-hover:text-pink-200",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.5 1.2l-1.7.85a11 11 0 005.5 5.5l.85-1.7a1 1 0 011.2-.5l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
    ),
  },
  {
    label: "LinkedIn",
    display: <>carolina-mauro</>,
    copyValue: "https://www.linkedin.com/in/carolina-mauro-78751a220",
    href: "https://www.linkedin.com/in/carolina-mauro-78751a220",
    hover: "hover:border-violet-300/60",
    iconHover: "group-hover:text-violet-200",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.98 3.5a2 2 0 11-.01 4.001A2 2 0 014.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z" />
    ),
  },
];

function ContactCard({ contact, lang }: { contact: Contact; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const isExternal = contact.href.startsWith("http");

  async function copy() {
    try {
      await navigator.clipboard.writeText(contact.copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available — ignore silently
    }
  }

  return (
    <div
      className={`group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${contact.hover}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-zinc-200 transition group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`h-5 w-5 ${contact.iconHover}`}>
          {contact.icon}
        </svg>
      </span>

      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {t(contact.label, lang)}
      </span>

      {/* Value — links out, wraps nicely on small screens */}
      <a
        href={contact.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="w-full break-words text-[13px] font-medium leading-snug text-zinc-200 transition hover:text-white sm:text-sm"
      >
        {contact.display}
      </a>

      {/* Copy button */}
      <button
        type="button"
        onClick={copy}
        className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-zinc-300 transition hover:border-white/25 hover:text-white"
        aria-label={`${t("Copiar", lang)} ${t(contact.label, lang)}`}
      >
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5 text-emerald-300">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-300">{t("Copiado", lang)}</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8V5a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-3M5 8h9a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z" />
            </svg>
            {t("Copiar", lang)}
          </>
        )}
      </button>
    </div>
  );
}

export default function ContactSection({ lang }: { lang: Lang }) {
  return (
    <section id="contact" className="section-shell relative overflow-hidden py-20">
      {/* Decorative blobs */}
      <div
        className="nebula-blob animate-nebula"
        style={{ top: "0", left: "10%", width: "24rem", height: "24rem", "--blob": "rgba(129,140,248,0.10)", zIndex: 0 }}
      />
      <div
        className="nebula-blob animate-nebula"
        style={{ bottom: "0", right: "8%", width: "22rem", height: "22rem", "--blob": "rgba(244,114,182,0.10)", zIndex: 0, animationDelay: "4s" }}
      />

      <div className="relative z-[1] mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          <span className="text-sm">✦</span> {t("Contacto", lang)}
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("¿Trabajamos juntos?", lang)} <span className="text-shimmer">{t("Hablemos", lang)}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-300">
          {t("Estoy abierta a nuevas oportunidades, colaboraciones y proyectos. Escribime por el medio que prefieras.", lang)}
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {contacts.map((c) => (
            <ContactCard key={c.label} contact={c} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
