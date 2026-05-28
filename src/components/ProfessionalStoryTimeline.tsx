"use client";

import { useState } from "react";

type StoryStage = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
  ranges: Array<{
    start: number;
    end: number;
  }>;
};

const timelineStart = 2020;
const timelineEnd = 2026;
const timelineRange = timelineEnd - timelineStart;

const storyStages: StoryStage[] = [
  {
    id: "degree",
    period: "2020 - 2025",
    title: "Ingeniería en Informática",
    subtitle: "UBA · Ingeniería en Informática",
    ranges: [{ start: 2020, end: 2025 }],
    description:
      "Acá podés contar cómo fue tu recorrido universitario: materias que te marcaron, proyectos importantes, cambios en tu forma de pensar software y el camino hasta recibirte.",
    focus: ["Ingeniería", "Fundamentos", "Arquitectura", "Proyecto final"],
  },
  {
    id: "foundations-ta",
    period: "2021 - 2022 / 2025 - actualidad",
    title: "Ayudantía en Fundamentos de Programación",
    subtitle: "FIUBA · Fundamentos de Programación",
    ranges: [
      { start: 2021, end: 2022 },
      { start: 2025, end: 2026 },
    ],
    description:
      "Acá podés escribir sobre tu rol enseñando C, memoria, punteros, TDAs y estructuras de datos. También podés contar qué aprendiste acompañando a estudiantes.",
    focus: ["C", "TDAs", "Memoria", "Punteros", "Docencia"],
  },
  {
    id: "software-ta",
    period: "2025 - presente",
    title: "Ayudantía en Ingeniería de Software II",
    subtitle: "FIUBA · Ingeniería de Software II",
    ranges: [{ start: 2025, end: 2026 }],
    description:
      "Acá podés desarrollar tu mirada sobre diseño, clean code, BDD/TDD, arquitectura hexagonal y code reviews. Es un buen lugar para mostrar tu criterio técnico.",
    focus: ["BDD/TDD", "Clean Code", "Ruby", "Hexagonal", "Code review"],
  },
  {
    id: "brosoft",
    period: "2022 - actualidad",
    title: "Frontend Developer",
    subtitle: "BROSOFT · TurismoCity",
    ranges: [{ start: 2022, end: 2026 }],
    description:
      "Acá podés contar tu experiencia profesional construyendo producto: frontend web, mobile, integración con APIs, colaboración con backend y features para usuarios reales.",
    focus: ["Vue", "Nuxt", "TypeScript", "React Native", "APIs"],
  },
];

export default function ProfessionalStoryTimeline() {
  const [activeStageId, setActiveStageId] = useState(storyStages[3].id);
  const activeStage =
    storyStages.find((stage) => stage.id === activeStageId) ?? storyStages[0];

  return (
    <section id="story" className="section-shell py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="lg:pt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
            Historia profesional
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Línea de tiempo profesional.
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-300">
            Seleccioná un tramo para acercarte a esa etapa y completar el
            detalle con tu propia historia.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="rounded-lg border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
            <div className="hidden sm:grid sm:grid-cols-7 sm:pl-24">
              {Array.from({ length: timelineRange + 1 }, (_, index) => (
                <span
                  key={timelineStart + index}
                  className="text-xs font-semibold text-zinc-500"
                >
                  {timelineStart + index}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              {storyStages.map((stage, index) => {
              const isActive = stage.id === activeStage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`grid gap-3 rounded-lg border p-4 text-left transition duration-200 sm:grid-cols-[13rem_1fr] sm:items-center ${
                    isActive
                      ? "scale-[1.015] border-cyan-200 bg-cyan-200/12 shadow-2xl shadow-cyan-950/40"
                      : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-pink-200/60 hover:bg-white/[0.075]"
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Track {index + 1}
                    </span>
                    <p className="mt-2 text-xs font-semibold text-cyan-100">
                      {stage.period}
                    </p>
                    <h3 className="mt-1 text-sm font-bold leading-tight text-white">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="relative h-9 rounded-full border border-white/10 bg-black/35">
                    <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-white/15" />
                    {stage.ranges.map((range) => {
                      const left =
                        ((range.start - timelineStart) / timelineRange) * 100;
                      const width =
                        ((range.end - range.start) / timelineRange) * 100;

                      return (
                        <span
                          key={`${range.start}-${range.end}`}
                          className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${
                            isActive
                              ? "bg-cyan-200 shadow-[0_0_18px_rgba(165,243,252,0.65)]"
                              : "bg-pink-200/70"
                          }`}
                          style={{
                            left: `calc(${left}% + 0.75rem)`,
                            width: `calc(${width}% - 1.5rem)`,
                          }}
                        />
                      );
                    })}
                  </div>
                </button>
              );
            })}
            </div>
          </div>

          <article className="rounded-lg border border-white/10 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-pink-200">
                  {activeStage.period}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{activeStage.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {activeStage.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
                {activeStage.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-5 text-base leading-8 text-zinc-300">
              {activeStage.description}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
