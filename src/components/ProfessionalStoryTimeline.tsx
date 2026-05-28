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
    subtitle: "FIUBA · Ingeniería en Informática",
    ranges: [{ start: 2020, end: 2025 }],
    description:
      "Durante la carrera tuve la oportunidad de aprender sobre algoritmos, estructuras de datos, arquitectura de software, ingeniería de software, sistemas distribuidos, \
      bases de datos, ciencia de devIndicatorServerState, inteligenia artificial, modelos de machine learning, programacion areCookiesMutableInCurrentPhase, blockchain, seguridad informática, entre otras cosas. \
       Además, pude participar en proyectos prácticos y trabajos en equipo que me ayudaron a desarrollar habilidades técnicas y de colaboración.",
    focus: ["Ingeniería", "Fundamentos", "Arquitectura", "Desarrollo de Software"],
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
      "Acompaño a los alumnos en su primer contacto con la programación, ayudándolos a entender conceptos básicos como variables, \
      tipos de datos, estructuras de control, funciones y algoritmos. Se enseña en lenguaje C, lo que permite a los estudiantes comprender \
      cómo funciona la memoria y los punteros, y sentar las bases para su desarrollo futuro en el mundo del software.",
    focus: ["C", "TDAs", "Memoria", "Punteros", "Docencia"],
  },
  {
    id: "software-ta",
    period: "2025 - presente",
    title: "Ayudantía en Ingeniería de Software II",
    subtitle: "FIUBA · Ingeniería de Software II",
    ranges: [{ start: 2025, end: 2026 }],
    description:
      "Acompaño a los alumnos en el aprendizaje de metodologías de desarrollo de software, diseño de sistemas, pruebas y mantenimiento. Se trabaja con Ruby y \
       hacemos gran incapie en el trabjo siguiendo BDD + TDD logrando un codigo que respete la arq. hexagonal, patron repositorio y POO. Además, se fomenta la colaboración \
      y el trabajo en equipo a través de scrums y code reviews, preparando a los estudiantes para enfrentar los desafíos del desarrollo de software en el mundo real.",
    focus: ["BDD/TDD", "Clean Code", "Ruby", "Arq. Hexagonal", "Code review", "POO", "Scrums", "Docencia"],
  },
  {
    id: "brosoft",
    period: "2022 - actualidad",
    title: "Frontend Developer",
    subtitle: "BROSOFT · TurismoCity",
    ranges: [{ start: 2022, end: 2026 }],
    description:
      "3 años desarrollando la aplicacion móvil de TurismoCity, una plataforma de comparación de precios de vuelos y hoteles. \
      Empecé trabajando con React Native y en Junio de 2025 cambie al equipo web que utiliza Vue y Nuxt. Actualmente desarrollo funcionalidades en la vertical de paquetes, \
      desarrollando tando el backend en NodeJS como el frontend",
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
            Mi camino en el mundo del Software comienza con la pandemia de 2020, curse mi ultimo año de colegio online y 
            en paralelo hice el ingreso de la facultad via UBA XXI. A partir de 2021 empecé a cursar la carrera de Ingeniería en Informática
            en la UBA, y a lo largo de estos años tuve la oportunidad de aprender muchísimo tanto en el ámbito académico como profesional. 
          </p>
        </div>

        <div className="grid gap-5">
          <div className="rounded-lg border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
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
