"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { t, type Lang } from "@/src/lib/i18n";
import Reveal, { SectionHeading } from "./Reveal";

/** Bento card with a subtle 3D tilt that follows the pointer. */
function Tile({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <Reveal delay={delay} className={className}>
      <motion.div
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((e.clientY - r.top) / r.height - 0.5) * -6,
            y: ((e.clientX - r.left) / r.width - 0.5) * 6,
          });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformPerspective: 900 }}
        className="card group relative h-full overflow-hidden p-6 sm:p-7"
      >
        {children}
      </motion.div>
    </Reveal>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">{children}</p>;
}

const languages = [
  { flag: "🇦🇷", name: "Español", level: "Nativo", pct: 100 },
  { flag: "🇬🇧", name: "Inglés", level: "B2", pct: 75 },
  { flag: "🇩🇪", name: "Alemán", level: "B2", pct: 75 },
];

const sports = [
  { icon: "🎾", name: "Tenis", note: "desde chica · 1x semana" },
  { icon: "🏓", name: "Pádel", note: "siempre que se arma" },
  { icon: "🏋️‍♀️", name: "Hyrox", note: "sufrir con estilo" },
  { icon: "🏃‍♀️", name: "Running", note: "para despejar" },
];

const langsCode = [
  { name: "C", note: "Mi primer amor (un poco oxidada 😅)" },
  { name: "JavaScript", note: "El de todos los días" },
  { name: "Python", note: "El que tiene todo el potencial" },
];

export default function AboutBento({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t("Sobre mí", lang)}
          title={t("Un poco de código,", lang)}
          accent={t("mucho movimiento.", lang)}
        />

        <div className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* Story */}
          <Tile className="sm:col-span-2 lg:col-span-4 lg:row-span-2">
            <Label>{t("Mi historia", lang)}</Label>
            <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t("De Club Penguin y fórmulas de Excel a", lang)}{" "}
              <span className="mark">{t("Ingeniera en Informática", lang)}</span>.
            </h3>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              <p>
                {t("En el colegio computación siempre me resultó fácil: Excel me divertía muchísimo y las fórmulas eran como pequeños trucos para hacer cosas copadas. Tuve varias compus, jugaba al Mundo Gaturro y al Club Penguin… nada tan informático como hoy, pero la chispa ya estaba.", lang)}
              </p>
              <p>
                {t("En la carrera encontré lo que más me gusta: resolver problemas, usar el pensamiento lateral y ver qué puedo crear con lo que sé — y qué me falta aprender.", lang)}
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <span aria-hidden>💼</span> Software Engineer II @ Innovid
              <span className="text-faint">·</span>
              <span aria-hidden>🎓</span> FIUBA
            </p>
          </Tile>

          {/* Now */}
          <Tile className="lg:col-span-2" delay={0.05}>
            <div className="flex items-center justify-between">
              <Label>{t("Ahora mismo", lang)}</Label>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-clay" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-extrabold leading-tight">
              {t("Profundizando en", lang)} <span className="mark">{t("IA", lang)}</span> {t("y", lang)}{" "}
              <span className="mark">AWS / Data</span>
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t("Quiero entender cloud a fondo y la IA me parece fascinante para seguir aprendiendo.", lang)}
            </p>
          </Tile>

          {/* Languages */}
          <Tile className="lg:col-span-2" delay={0.1}>
            <Label>{t("Idiomas", lang)}</Label>
            <ul className="mt-4 space-y-3">
              {languages.map((l) => (
                <li key={l.name}>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>
                      <span aria-hidden className="mr-1.5">{l.flag}</span>
                      {t(l.name, lang)}
                    </span>
                    <span className="font-mono text-xs text-muted">{t(l.level, lang)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      className="h-full rounded-full bg-ball"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Sports */}
          <Tile className="sm:col-span-2 lg:col-span-3" delay={0.05}>
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-court/15" />
            <Label>{t("Fuera de la compu", lang)}</Label>
            <h3 className="mt-3 font-display text-2xl font-extrabold">{t("Siempre con una raqueta cerca", lang)}</h3>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {sports.map((s) => (
                <li key={s.name} className="rounded-2xl border border-line bg-surface-2 p-3 transition group-hover:border-ink/20">
                  <p className="text-xl" aria-hidden>{s.icon}</p>
                  <p className="mt-1 text-sm font-bold">{t(s.name, lang)}</p>
                  <p className="text-xs text-muted">{t(s.note, lang)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-dashed border-line p-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>🏆 {t("Jugar un torneo", lang)}</span>
                <span className="font-mono text-muted">{t("algún día…", lang)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full bg-[repeating-linear-gradient(45deg,var(--clay)_0_8px,color-mix(in_oklab,var(--clay)_60%,transparent)_8px_16px)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "62%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </Tile>

          {/* Teaching */}
          <Tile className="lg:col-span-3" delay={0.1}>
            <Label>{t("Docencia", lang)}</Label>
            <h3 className="mt-3 font-display text-2xl font-extrabold">
              {t("Ayudante en Ingeniería del Software II", lang)}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t("Desde 2025 en FIUBA: code review, Clean Code, BDD/TDD y arquitectura hexagonal. Enseñar es mi forma favorita de aprender dos veces.", lang)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Ruby", "BDD/TDD", "Gherkin", "Clean Code"].map((x) => (
                <span key={x} className="chip">{x}</span>
              ))}
            </div>
          </Tile>

          {/* Code languages */}
          <Tile className="lg:col-span-2" delay={0.05}>
            <Label>{t("Lenguajes favoritos", lang)}</Label>
            <ul className="mt-4 space-y-3">
              {langsCode.map((c, i) => (
                <li key={c.name} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs text-faint">0{i + 1}</span>
                  <div>
                    <p className="font-mono text-sm font-bold">{c.name}</p>
                    <p className="text-xs text-muted">{t(c.note, lang)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Vacations */}
          <Tile className="lg:col-span-2" delay={0.1}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-80"
              style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, #38bdf8 22%, transparent))" }}
            />
            <Label>{t("Vacaciones ideales", lang)}</Label>
            <p className="relative mt-4 text-4xl tracking-widest" aria-hidden>🏖️ 🥾 🏞️</p>
            <p className="relative mt-3 font-display text-xl font-extrabold leading-snug">
              {t("Mucha playa, caminatas y lagos con paisajes increíbles.", lang)}
            </p>
          </Tile>

          {/* Social */}
          <Tile className="sm:col-span-2 lg:col-span-2" delay={0.15}>
            <div className="flex h-full flex-col justify-between rounded-2xl">
              <div>
                <Label>{t("Modo social", lang)}</Label>
                <p className="mt-4 font-display text-2xl font-extrabold leading-tight">
                  {t("Si hay plan, me sumo.", lang)} <span aria-hidden>🙌</span>
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {t("Me encanta conocer gente: un café, un after o un partido de dobles.", lang)}
                </p>
              </div>
              <a
                href="#contact"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-bg transition hover:-translate-y-0.5"
              >
                {t("Armemos algo", lang)} →
              </a>
            </div>
          </Tile>

          {/* Goal */}
          <Tile className="sm:col-span-2 lg:col-span-6" delay={0.05}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <Label>{t("Próximos 2–3 años", lang)}</Label>
                <p className="mt-3 max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                  {t("Sentirme una gran profesional, seguir enseñando en la facu y estar de lleno en el desarrollo con IA.", lang)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {["🚀", "👩‍🏫", "🤖"].map((e) => (
                  <span key={e} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface-2 text-2xl" aria-hidden>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
