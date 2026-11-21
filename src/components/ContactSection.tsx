"use client";

import { useState, type ReactNode } from "react";
import { t, type Lang } from "@/src/lib/i18n";
import Reveal from "./home/Reveal";

type Contact = {
  label: string;
  /** What gets shown (can include <wbr/> for nice wrapping) */
  display: ReactNode;
  /** Raw value copied to clipboard */
  copyValue: string;
  href: string;
  icon: ReactNode;
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
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    label: "Teléfono",
    display: <>(+54 9) 11 6799 4226</>,
    copyValue: "+5491167994226",
    href: "tel:+5491167994226",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.6a1 1 0 01-.5 1.2l-1.7.85a11 11 0 005.5 5.5l.85-1.7a1 1 0 011.2-.5l3.6 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" />
    ),
  },
  {
    label: "LinkedIn",
    display: <>carolina-mauro</>,
    copyValue: "https://www.linkedin.com/in/carolina-mauro-78751a220",
    href: "https://www.linkedin.com/in/carolina-mauro-78751a220",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.98 3.5a2 2 0 11-.01 4.001A2 2 0 014.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z" />
    ),
  },
  {
    label: "GitHub",
    display: <>carolinamauro</>,
    copyValue: "https://github.com/carolinamauro",
    href: "https://github.com/carolinamauro",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
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
    <li className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-[#d4f53c]/60 sm:p-5">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d4f53c] text-[#12140f] transition group-hover:rotate-[-8deg] group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden>
          {contact.icon}
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          {t(contact.label, lang)}
        </p>
        <a
          href={contact.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block break-words font-semibold text-white underline-offset-4 hover:underline"
        >
          {contact.display}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/80 transition hover:border-white/40 hover:text-white"
        aria-label={`${t("Copiar", lang)} ${t(contact.label, lang)}`}
      >
        {copied ? <span className="text-[#d4f53c]">✓ {t("Copiado", lang)}</span> : t("Copiar", lang)}
      </button>
    </li>
  );
}

export default function ContactSection({ lang }: { lang: Lang }) {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#1d6b44] px-6 py-14 text-white sm:px-12 sm:py-20">
        {/* Court lines */}
        <div aria-hidden className="pointer-events-none absolute inset-5 rounded-[1.75rem] border-2 border-white/25">
          <div className="absolute inset-x-[10%] inset-y-0 border-x-2 border-white/20" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/25" />
        </div>
        <span aria-hidden className="tennis-ball animate-bob absolute right-10 top-10 hidden h-16 w-16 sm:block" />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d4f53c]">
              {t("Contacto", lang)}
            </p>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.03em] sm:text-7xl">
              {t("¿Peloteamos?", lang)}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
              {t("Estoy abierta a nuevas oportunidades, colaboraciones, charlas de IA y cloud… o a un partido de dobles. Escribime por el medio que prefieras.", lang)}
            </p>
            <a
              href="mailto:carolinaluciamauro@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d4f53c] px-7 py-3.5 text-sm font-bold text-[#12140f] transition hover:-translate-y-0.5"
            >
              {t("Mandame un mail", lang)} ✉️
            </a>
          </div>
          <ul className="grid gap-3">
            {contacts.map((c) => (
              <ContactCard key={c.label} contact={c} lang={lang} />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
