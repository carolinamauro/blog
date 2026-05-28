"use client";

import { useEffect, useMemo, useState } from "react";

type StackCategory =
  | "Frontend"
  | "Backend"
  | "Testing"
  | "DevOps"
  | "Architecture"
  | "Languages";

type StackItem = {
  name: string;
  categories: StackCategory[];
  level: number;
  context: string;
};

const desktopItemsPerPage = 6;
const mobileItemsPerPage = 2;

const categories: Array<StackCategory | "All"> = [
  "All",
  "Frontend",
  "Backend",
  "Testing",
  "DevOps",
  "Architecture",
  "Languages",
];

const stack: StackItem[] = [
  {
    name: "Vue.js",
    categories: ["Frontend"],
    level: 92,
    context: "Product features, search flows, filters and booking details.",
  },
  {
    name: "Nuxt.js",
    categories: ["Frontend"],
    level: 88,
    context: "SSR and SPA work for high-traffic travel products.",
  },
  {
    name: "React",
    categories: ["Frontend", "Languages"],
    level: 86,
    context: "Professional projects, personal products and hospital systems.",
  },
  {
    name: "React Native",
    categories: ["Frontend"],
    level: 72,
    context: "Android app features with production observability.",
  },
  {
    name: "TypeScript",
    categories: ["Frontend", "Languages"],
    level: 90,
    context: "Typed UI flows, API integration and maintainable components.",
  },
  {
    name: "Node.js",
    categories: ["Backend", "Languages"],
    level: 74,
    context: "API collaboration, project backends and service integration.",
  },
  {
    name: "SQL",
    categories: ["Backend", "Languages"],
    level: 70,
    context: "PostgreSQL, Oracle SQL and MySQL for product and academic work.",
  },
  {
    name: "REST APIs",
    categories: ["Backend", "Architecture"],
    level: 84,
    context: "Integration-heavy frontend work with backend collaboration.",
  },
  {
    name: "Jest",
    categories: ["Testing"],
    level: 70,
    context: "Unit and behavior-focused validation for web features.",
  },
  {
    name: "BDD/TDD",
    categories: ["Testing", "Architecture"],
    level: 76,
    context: "Teaching and reviewing Gherkin, Cucumber and test design.",
  },
  {
    name: "Docker",
    categories: ["DevOps"],
    level: 66,
    context: "Containerized academic and product-adjacent applications.",
  },
  {
    name: "AWS",
    categories: ["DevOps"],
    level: 48,
    context: "Current learning track for cloud computing fundamentals.",
  },
  {
    name: "CI/CD",
    categories: ["DevOps", "Testing"],
    level: 62,
    context: "GitHub Actions and delivery practices around product work.",
  },
  {
    name: "Hexagonal",
    categories: ["Architecture"],
    level: 68,
    context: "University teaching, code review and software design mentoring.",
  },
  {
    name: "Component-based",
    categories: ["Architecture", "Frontend"],
    level: 90,
    context: "Reusable UI architecture across Vue, Nuxt and React systems.",
  },
  {
    name: "Event-driven",
    categories: ["Architecture", "Backend"],
    level: 55,
    context: "Studying distributed systems patterns and message-driven design.",
  },
  {
    name: "C",
    categories: ["Languages"],
    level: 72,
    context: "Teaching memory management, pointers and data structures.",
  },
  {
    name: "Ruby",
    categories: ["Languages"],
    level: 58,
    context: "Mentoring object-oriented design and clean code practices.",
  },
  {
    name: "Python",
    categories: ["Languages"],
    level: 54,
    context: "General scripting, learning experiments and technical foundations.",
  },
];

const categoryStyles: Record<StackCategory, string> = {
  Frontend: "border-pink-200 bg-pink-50 text-pink-800 dark:border-pink-400/20 dark:bg-pink-400/10 dark:text-pink-200",
  Backend: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200",
  Testing: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200",
  DevOps: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200",
  Architecture: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200",
  Languages: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200",
};

const categoryDescriptions: Record<StackCategory | "All", string> = {
  All: "Una vista completa de las herramientas que uso, enseño o estoy profundizando.",
  Frontend: "Mi zona más fuerte: interfaces, producto, performance y componentes reutilizables.",
  Backend: "APIs, datos y colaboración full-stack para que la experiencia no termine en la UI.",
  Testing: "Prácticas que uso y enseño para diseñar software con feedback temprano.",
  DevOps: "Entrega, observabilidad y cloud como parte de mi siguiente etapa técnica.",
  Architecture: "Diseño de sistemas, límites claros y decisiones mantenibles.",
  Languages: "Fundamentos, docencia y versatilidad para pensar problemas desde más de un paradigma.",
};

export default function TechStackShowcase() {
  const [activeCategory, setActiveCategory] = useState<StackCategory | "All">("All");
  const [selectedSkill, setSelectedSkill] = useState(stack[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = isMobile ? mobileItemsPerPage : desktopItemsPerPage;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  function handleCategoryChange(category: StackCategory | "All") {
    setActiveCategory(category);
    setCurrentPage(1);
    setSelectedSkill(
      category === "All"
        ? stack[0]
        : stack.find((item) => item.categories.includes(category)) ?? stack[0],
    );
  }

  const visibleStack = useMemo(() => {
    if (activeCategory === "All") {
      return stack;
    }

    return stack.filter((item) => item.categories.includes(activeCategory));
  }, [activeCategory]);

  const pageCount = Math.ceil(visibleStack.length / itemsPerPage);
  const activePage = Math.min(currentPage, pageCount);
  const pageStart = (activePage - 1) * itemsPerPage;
  const paginatedStack = visibleStack.slice(pageStart, pageStart + itemsPerPage);
  const emptySlots = Array.from({
    length: itemsPerPage - paginatedStack.length,
  });
  const strongestSkill = visibleStack.reduce((current, item) =>
    item.level > current.level ? item : current,
  visibleStack[0]);

  return (
    <section
      id="stack"
      className="section-shell overflow-hidden py-16 text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-300">
            Tech stack
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Herramientas, lenguajes y prácticas que definen mi perfil técnico
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-300">
            Vengo de construir frontend para productos de alto tráfico, con
            participación en backend, testing y arquitectura. Ahora estoy
            conectando esa base con cloud, sistemas distribuidos e IA aplicada.
          </p>

          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Skill seleccionada
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>
              {selectedSkill.categories.map((category) => (
                <span
                  key={category}
                  className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${categoryStyles[category]}`}
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              {selectedSkill.context}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-white bg-white text-zinc-950"
                    : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-pink-300 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 h-24 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-zinc-300">
                {categoryDescriptions[activeCategory]}
              </p>
              <p className="text-sm font-semibold text-pink-200">
                Top: {strongestSkill.name}
              </p>
            </div>
          </div>

          <div className="mt-5 grid h-[420px] gap-3 sm:grid-cols-2">
            {paginatedStack.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedSkill(item)}
                className={`group h-[204px] overflow-hidden rounded-lg border p-4 text-left transition hover:-translate-y-0.5 sm:h-[132px] ${
                  selectedSkill.name === item.name
                    ? "border-pink-300 bg-pink-300/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{item.name}</p>
                  <div className="flex max-h-14 flex-wrap justify-end gap-1 overflow-hidden">
                    {item.categories.map((category) => (
                      <span
                        key={category}
                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold ${categoryStyles[category]}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all group-hover:bg-pink-300"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
                  {item.context}
                </p>
              </button>
            ))}
            {emptySlots.map((_, index) => (
              <div
                key={`empty-slot-${index}`}
                aria-hidden="true"
                className="h-[204px] rounded-lg border border-transparent p-4 sm:h-[132px]"
              />
            ))}
          </div>

          <div className="mt-5 flex h-20 flex-col gap-3 sm:h-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              Mostrando {pageStart + 1}-{Math.min(pageStart + itemsPerPage, visibleStack.length)} de{" "}
              {visibleStack.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={activePage === 1}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-pink-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-300">
                  {activePage} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                disabled={activePage === pageCount}
                className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-pink-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
