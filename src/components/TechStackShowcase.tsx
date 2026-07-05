"use client";

import Image from "next/image";
import { useState } from "react";
import { t, type Lang } from "@/src/lib/i18n";

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type Category = "Frontend" | "Backend" | "Lenguajes" | "DevOps" | "Testing";

const stack: { name: string; icon: string; category: Category; invert?: boolean }[] = [
  { name: "JavaScript",   icon: `${ICON_BASE}/javascript/javascript-original.svg`,                     category: "Frontend" },
  { name: "TypeScript",   icon: `${ICON_BASE}/typescript/typescript-original.svg`,                     category: "Frontend" },
  { name: "Vue.js",       icon: `${ICON_BASE}/vuejs/vuejs-original.svg`,                               category: "Frontend" },
  { name: "Nuxt.js",      icon: `${ICON_BASE}/nuxtjs/nuxtjs-original.svg`,                             category: "Frontend" },
  { name: "React",        icon: `${ICON_BASE}/react/react-original.svg`,                               category: "Frontend" },
  { name: "Next.js",      icon: `${ICON_BASE}/nextjs/nextjs-original.svg`,                             category: "Frontend", invert: true },
  { name: "Tailwind",     icon: `${ICON_BASE}/tailwindcss/tailwindcss-original.svg`,                   category: "Frontend" },
  { name: "React Native", icon: `${ICON_BASE}/react/react-original.svg`,                               category: "Frontend" },
  { name: "Node.js",      icon: `${ICON_BASE}/nodejs/nodejs-original.svg`,                             category: "Backend" },
  { name: "Express",      icon: `${ICON_BASE}/express/express-original.svg`,                           category: "Backend",  invert: true },
  { name: "Python",       icon: `${ICON_BASE}/python/python-original.svg`,                             category: "Lenguajes" },
  { name: "Ruby",         icon: `${ICON_BASE}/ruby/ruby-original.svg`,                                 category: "Lenguajes" },
  { name: "C",            icon: `${ICON_BASE}/c/c-original.svg`,                                       category: "Lenguajes" },
  { name: "Docker",       icon: `${ICON_BASE}/docker/docker-original.svg`,                             category: "DevOps" },
  // { name: "AWS",          icon: `${ICON_BASE}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,  category: "DevOps",   invert: true },
  { name: "Git",          icon: `${ICON_BASE}/git/git-original.svg`,                                   category: "DevOps" },
  { name: "GitHub",       icon: `${ICON_BASE}/github/github-original.svg`,                             category: "DevOps",   invert: true },
  { name: "Linux",        icon: `${ICON_BASE}/linux/linux-original.svg`,                               category: "DevOps" },
  { name: "PostgreSQL",   icon: `${ICON_BASE}/postgresql/postgresql-original.svg`,                     category: "Backend" },
  { name: "MySQL",        icon: `${ICON_BASE}/mysql/mysql-original.svg`,                                category: "Backend" },
  { name: "OracleDB",     icon: `${ICON_BASE}/oracle/oracle-original.svg`,                             category: "Backend" },
  { name: "Java",         icon: `${ICON_BASE}/java/java-original.svg`,                                 category: "Lenguajes" },
  { name: "Rust",         icon: `${ICON_BASE}/rust/rust-original.svg`,                                 category: "Lenguajes", invert: true },
  { name: "Jest",         icon: `${ICON_BASE}/jest/jest-plain.svg`,                                    category: "Testing" },
  { name: "Cucumber/BDD", icon: `${ICON_BASE}/cucumber/cucumber-plain.svg`,                            category: "Testing" },
  { name: "Postman",      icon: `${ICON_BASE}/postman/postman-original.svg`,                           category: "Testing" },
];

const categoryOrder: Category[] = ["Frontend", "Backend", "Lenguajes", "DevOps", "Testing"];
const tabs: Array<"All" | Category> = ["All", ...categoryOrder];

function TechCard({ name, icon, invert }: { name: string; icon: string; invert?: boolean }) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-black/40">
      <Image
        src={icon}
        alt={name}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        style={invert ? { filter: "invert(1) brightness(1.8)" } : undefined}
      />
      <span className="text-center text-xs font-medium leading-tight text-zinc-400 transition group-hover:text-white">
        {name}
      </span>
    </div>
  );
}

export default function TechStackShowcase({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<"All" | Category>("All");

  const grouped = categoryOrder.reduce<Record<Category, typeof stack>>((acc, cat) => {
    acc[cat] = stack.filter((i) => i.category === cat);
    return acc;
  }, {} as Record<Category, typeof stack>);

  const filtered = active === "All" ? null : stack.filter((i) => i.category === active);

  return (
    <section id="stack" className="section-shell py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-pink-300">
          Tech stack
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("Herramientas que uso", lang)}
        </h2>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                active === tab
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {t(tab, lang)}
            </button>
          ))}
        </div>

        {filtered && (
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {filtered.map((item) => (
              <TechCard key={item.name} {...item} />
            ))}
          </div>
        )}

        {!filtered && (
          <div className="mt-8 space-y-10">
            {categoryOrder.map((cat) => (
              <div key={cat}>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {t(cat, lang)}
                </p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {grouped[cat].map((item) => (
                    <TechCard key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
