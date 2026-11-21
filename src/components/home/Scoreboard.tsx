"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/src/lib/i18n";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{val}</span>;
}

/** Stadium-style scoreboard with a few real numbers. */
export default function Scoreboard({
  lang,
  posts,
  projects,
}: {
  lang: Lang;
  posts: number;
  projects: number;
}) {
  const yearsCoding = new Date().getFullYear() - 2020;
  const stats = [
    { label: "Años programando", value: yearsCoding },
    { label: "Posts en el blog", value: posts },
    { label: "Proyectos", value: projects },
    { label: "Partidos por semana", value: 1 },
    { label: "Torneos jugados", value: 0, note: "todavía 😅" },
  ];

  return (
    <section aria-label={t("Estadísticas", lang)} className="px-5 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border-4 border-[#1b2a1f] bg-[#0e1a12] text-white shadow-card">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
          <span>Caro Mauro · Live</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff4d4d]" /> {t("En juego", lang)}
          </span>
        </div>
        <dl className="grid grid-cols-2 divide-white/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
              <dd className="font-mono text-5xl font-bold tabular-nums text-[#d4f53c] [text-shadow:0_0_18px_rgba(212,245,60,0.45)]">
                <Counter to={s.value} />
              </dd>
              <dt className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t(s.label, lang)}
                {s.note && <span className="block normal-case tracking-normal text-white/40">{t(s.note, lang)}</span>}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
