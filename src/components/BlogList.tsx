"use client";

import Link from "next/link";
import { useState } from "react";

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  category?: string;
}

function categoryDot(cat: string) {
  const map: Record<string, string> = {
    "Cloud & Redes": "bg-cyan-400",
    General: "bg-pink-400",
    Linux: "bg-violet-400",
  };
  return map[cat] ?? "bg-zinc-400";
}

export default function BlogList({ posts }: { posts: PostSummary[] }) {
  const categories = [
    "Todos",
    ...Array.from(new Set(posts.map((p) => p.category ?? "General"))),
  ];
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos"
      ? posts
      : posts.filter((p) => (p.category ?? "General") === active);

  return (
    <>
      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              active === cat
                ? "border border-white/30 bg-white/10 text-white shadow-[0_0_14px_rgba(255,255,255,0.1)]"
                : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/25 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="space-y-5">
        {filtered.map((p) => {
          const cat = p.category ?? "General";
          const dot = categoryDot(cat);
          return (
            <li key={p.slug} className="animate-fade-in-up">
              <Link
                href={`/blog/${p.slug}`}
                className="group block rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-black/60 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                      <span className="text-xs font-medium text-zinc-500">{cat}</span>
                      <span className="text-xs text-zinc-600">·</span>
                      <span className="text-xs text-zinc-500">{p.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-100 transition group-hover:text-cyan-200">
                      {p.title}
                    </h2>
                    {p.summary && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                        {p.summary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-cyan-400 opacity-0 transition group-hover:opacity-100">
                  Leer post
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-zinc-500">
          No hay posts en esta categoría todavía.
        </p>
      )}
    </>
  );
}
