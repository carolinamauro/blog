"use client";

import Link from "next/link";
import { useState } from "react";

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  category?: string;
  tags?: string[];
}

function categoryDot(cat: string) {
  const map: Record<string, string> = {
    "Cloud & Redes": "bg-ball",
    General: "bg-clay",
    Linux: "bg-court",
  };
  return map[cat] ?? "bg-faint";
}

export default function BlogList({
  posts,
  initialCategory,
  initialTag,
}: {
  posts: PostSummary[];
  initialCategory?: string;
  initialTag?: string;
}) {
  const categories = [
 "Todos",
    ...Array.from(new Set(posts.map((p) => p.category ?? "General"))),
  ];
  const [active, setActive] = useState(
    initialCategory && categories.includes(initialCategory)
      ? initialCategory
      : "Todos",
  );

  const tagKey = initialTag?.trim().toLowerCase();
  const filtered = posts
    .filter((p) => active === "Todos" || (p.category ?? "General") === active)
    .filter(
      (p) =>
        !tagKey || (p.tags ?? []).some((t) => t.trim().toLowerCase() === tagKey),
    );

  return (
    <>
      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
              active === cat
                ? "border border-ink bg-ink text-bg"
                : "border border-line bg-surface text-muted hover:border-ink/30 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {initialTag && (
        <p className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          Filtrando por
          <span className="rounded-full border border-line bg-ball/15 px-3 py-1 text-xs font-semibold text-accent">
            #{initialTag}
          </span>
          <Link href="/blog" className="text-muted underline-offset-4 transition hover:text-ink hover:underline">
            Quitar filtro
          </Link>
        </p>
      )}

      <ul className="divide-y divide-line border-y border-line">
        {filtered.map((p) => {
          const cat = p.category ?? "General";
          const dot = categoryDot(cat);
          return (
            <li key={p.slug} className="animate-fade-in-up">
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-2 py-7 transition-colors sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <time dateTime={p.date} className="font-mono text-xs text-faint">{p.date}</time>
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">{cat}</span>
                  </div>
                  <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                    <span className="bg-[linear-gradient(var(--ball),var(--ball))] bg-[length:0%_35%] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_35%]">
                      {p.title}
                    </span>
                  </h2>
                  {p.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{p.summary}</p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-lg transition group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-ball group-hover:text-ball-ink sm:flex"
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-faint">
          No hay posts que coincidan todavía.
        </p>
      )}
    </>
  );
}
