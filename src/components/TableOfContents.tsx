"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TocHeading } from "@/src/lib/headings";

const SCROLL_OFFSET = 112;

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return [active, setActive] as const;
}

function List({
  headings,
  active,
  onNavigate,
}: {
  headings: TocHeading[];
  active: string | null;
  onNavigate: (id: string) => void;
}) {
  // The shallowest level present is the top of the tree, so posts that use
  // "#" or "##" for their sections both render with sensible indentation.
  const base = Math.min(...headings.map((h) => h.level));

  return (
    <ol className="space-y-0.5 border-l border-white/10">
      {headings.map((h) => {
        const isActive = h.id === active;
        const depth = h.level - base;
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(h.id);
              }}
              className={`-ml-px block border-l py-1.5 pr-2 text-sm leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${
                depth === 0 ? "pl-4" : depth === 1 ? "pl-7" : "pl-10"
              } ${
                isActive
                  ? "border-cyan-300 font-medium text-cyan-200"
                  : "border-transparent text-zinc-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {h.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export default function TableOfContents({
  headings,
  variant,
}: {
  headings: TocHeading[];
  variant: "mobile" | "desktop";
}) {
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const [active, setActive] = useActiveHeading(ids);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (headings.length === 0) return null;

  const goTo = (id: string) => {
    // Collapse first (mobile) so the target position is measured after layout settles.
    if (detailsRef.current) detailsRef.current.open = false;
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  if (variant === "mobile") {
    return (
      <details
        ref={detailsRef}
        className="group mt-6 rounded-2xl border border-white/10 bg-[#0a0a14] lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden">
          En este post
          <svg
            className="h-4 w-4 text-zinc-400 transition-transform group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <nav aria-label="Tabla de contenidos" className="px-5 pb-4">
          <List headings={headings} active={active} onNavigate={goTo} />
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label="Tabla de contenidos"
      className="hidden rounded-2xl border border-white/10 bg-[#0a0a14] p-5 lg:block"
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        En este post
      </h2>
      <List headings={headings} active={active} onNavigate={goTo} />
    </nav>
  );
}
