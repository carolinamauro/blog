"use client";

import { useState } from "react";
import { t, type Lang } from "@/src/lib/i18n";
import { SectionHeading } from "./home/Reveal";

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type Category = "Frontend" | "Backend" | "Lenguajes" | "DevOps" | "Testing";

const stack: { name: string; icon: string; category: Category; invert?: boolean }[] = [
  { name: "JavaScript",   icon: `${ICON_BASE}/javascript/javascript-original.svg`,                     category: "Frontend" },
  { name: "React",        icon: `${ICON_BASE}/react/react-original.svg`,                               category: "Frontend" },
  { name: "React Native", icon: `${ICON_BASE}/react/react-original.svg`,                               category: "Frontend" },
  { name: "Next.js",      icon: `${ICON_BASE}/nextjs/nextjs-original.svg`,                             category: "Frontend", invert: true },
  { name: "Vue.js",       icon: `${ICON_BASE}/vuejs/vuejs-original.svg`,                               category: "Frontend" },
  { name: "Nuxt.js",      icon: `${ICON_BASE}/nuxtjs/nuxtjs-original.svg`,                             category: "Frontend" },
  { name: "TypeScript",   icon: `${ICON_BASE}/typescript/typescript-original.svg`,                     category: "Frontend" },
  { name: "Node.js",      icon: `${ICON_BASE}/nodejs/nodejs-original.svg`,                             category: "Backend" },
  { name: "Python",       icon: `${ICON_BASE}/python/python-original.svg`,                             category: "Lenguajes" },
  { name: "Ruby",         icon: `${ICON_BASE}/ruby/ruby-original.svg`,                                 category: "Lenguajes" },
  { name: "C",            icon: `${ICON_BASE}/c/c-original.svg`,                                       category: "Lenguajes" },
  { name: "Docker",       icon: `${ICON_BASE}/docker/docker-original.svg`,                             category: "DevOps" },
  { name: "AWS",          icon: `${ICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,  category: "DevOps",   invert: true },
  { name: "Git",          icon: `${ICON_BASE}/git/git-original.svg`,                                   category: "DevOps" },
  { name: "GitHub",       icon: `${ICON_BASE}/github/github-original.svg`,                             category: "DevOps",   invert: true },
  { name: "Linux",        icon: `${ICON_BASE}/linux/linux-original.svg`,                               category: "DevOps" },
  { name: "MySQL",        icon: `${ICON_BASE}/mysql/mysql-original.svg`,                                category: "Backend" },
  { name: "OracleDB",     icon: `${ICON_BASE}/oracle/oracle-original.svg`,                             category: "Backend" },
  { name: "Jest",         icon: `${ICON_BASE}/jest/jest-plain.svg`,                                    category: "Testing" },
  { name: "Cucumber/BDD", icon: `${ICON_BASE}/cucumber/cucumber-plain.svg`,                            category: "Testing" },
  { name: "Postman",      icon: `${ICON_BASE}/postman/postman-original.svg`,                           category: "Testing" },
];

const categoryOrder: Category[] = ["Frontend", "Backend", "Lenguajes", "DevOps", "Testing"];
const tabs: Array<"All" | Category> = ["All", ...categoryOrder];

function TechIcon({ name, icon, invert, className = "h-10 w-10" }: { name: string; icon: string; invert?: boolean; className?: string }) {
  return (
    // Plain <img>: remote SVG icons don't benefit from next/image optimisation.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon}
      alt=""
      aria-hidden
      loading="lazy"
      width={40}
      height={40}
      className={`${className} object-contain ${invert ? "dark:invert" : ""}`}
      title={name}
    />
  );
}

function TechCard({ name, icon, invert }: { name: string; icon: string; invert?: boolean }) {
  return (
    <li className="group flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:-rotate-2 hover:border-ink/25 hover:shadow-card">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 transition group-hover:bg-ball/25">
        <TechIcon name={name} icon={icon} invert={invert} />
      </span>
      <span className="text-center text-xs font-bold leading-tight text-muted transition group-hover:text-ink">{name}</span>
    </li>
  );
}

export default function TechStackShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<"All" | Category>("All");
  const filtered = active === "All" ? stack : stack.filter((i) => i.category === active);

  return (
    <section id="stack" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Tech stack"
          title={t("Mi bolso", lang)}
          accent={t("de raquetas.", lang)}
          intro={t("Las herramientas que llevo a cada partido. Algunas las uso todos los días, otras las saco para ocasiones especiales.", lang)}
        />

        <div role="tablist" aria-label={t("Categorías", lang)} className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                active === tab
                  ? "border-ink bg-ink text-bg"
                  : "border-line bg-surface text-muted hover:border-ink/30 hover:text-ink"
              }`}
            >
              {t(tab === "All" ? "Todo" : tab, lang)}
              <span className="ml-1.5 font-mono text-xs opacity-60">
                {tab === "All" ? stack.length : stack.filter((i) => i.category === tab).length}
              </span>
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {filtered.map((item) => (
            <TechCard key={item.name} {...item} />
          ))}
        </ul>
      </div>

      {/* Endless strip of icons */}
      <div className="marquee-paused mt-16 overflow-hidden border-y border-line bg-surface py-5" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...stack, ...stack].map((item, i) => (
            <span key={i} className="flex items-center gap-3 font-display text-lg font-bold text-muted">
              <TechIcon name={item.name} icon={item.icon} invert={item.invert} className="h-7 w-7" />
              {item.name}
              <span className="tennis-ball ml-6 h-2.5 w-2.5" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
