"use client";

import { useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/src/lib/i18n";

type EventType = "education" | "work" | "ta" | "project";

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  type: EventType;
  ongoing?: boolean;
  description: string;
  focus: string[];
};

const events: TimelineEvent[] = [
  {
    id: "degree-start",
    year: "2020",
    title: "Inicio Ingeniería",
    subtitle: "FIUBA · Ingeniería en Informática",
    type: "education",
    description:
      "Empecé la carrera en plena pandemia, cursando el CBC de forma virtual a través de UBA XXI mientras terminaba el colegio. Arrancar en ese contexto me enseñó desde el primer día a organizarme, estudiar de forma autónoma y mantener el foco en metas de largo plazo.",
    focus: ["FIUBA", "Algoritmos", "Matemática", "Física"],
  },
  {
    id: "ta-foundations-1",
    year: "2021",
    title: "Ayudantía I",
    subtitle: "Fundamentos de Programación · FIUBA",
    type: "ta",
    description:
      "Primera experiencia como ayudante de cátedra. Acompañé a los alumnos en su primer contacto con la programación: variables, estructuras de control, funciones y algoritmos, todo en C. Me di cuenta rápido que explicar bien algo es tan difícil como entenderlo.",
    focus: ["C", "TDAs", "Memoria", "Punteros", "Docencia"],
  },
  {
    id: "brosoft",
    year: "2022",
    title: "BROSOFT",
    subtitle: "Frontend Developer · TurismoCity",
    type: "work",
    ongoing: true,
    description:
      "Empecé desarrollando la app móvil de TurismoCity en React Native. En 2025 pasé al equipo web (Vue + Nuxt), donde desarrollo funcionalidades de la vertical de paquetes en frontend y backend con Node.js.",
    focus: ["Vue", "Nuxt", "TypeScript", "React Native", "Node.js"],
  },
  {
    id: "garrahan",
    year: "2024",
    title: "Trabajo Profesional",
    subtitle: "Sistema de Prescripción · Hospital Garrahan",
    type: "project",
    description:
      "Desarrollé con tres compañeros una plataforma web para automatizar la prescripción de medicación oncológica pediátrica. Cálculo automático de dosis, generación de recetas PDF y sistema de alertas. Stack: Next.js · Node.js · OracleDB · HL7 FHIR · Docker.",
    focus: ["Next.js", "React", "Node.js", "OracleDB", "HL7 FHIR", "Docker"],
  },
  {
    id: "degree-end",
    year: "2025",
    title: "Ingeniera en Informática",
    subtitle: "Graduación · FIUBA",
    type: "education",
    description:
      "Me gradué de Ingeniería en Informática en la UBA. Cinco años que cubrieron algoritmos, sistemas distribuidos, inteligencia artificial, seguridad informática y más. Un camino largo e intenso que valió cada materia.",
    focus: ["Graduación", "FIUBA", "Ingeniería en Informática"],
  },
  {
    id: "ta-2025",
    year: "2025",
    title: "Dos ayudantías en paralelo",
    subtitle: "Fundamentos de Programación · Ingeniería de Software II · FIUBA",
    type: "ta",
    ongoing: true,
    description:
      "Retomé Fundamentos de Programación y sumé Ingeniería de Software II. En Fundamentos acompaño a los alumnos en sus primeros pasos con C. En IS II trabajamos con Ruby usando BDD + TDD, arquitectura hexagonal, code reviews y metodología ágil. Dos cátedras muy distintas que se complementan.",
    focus: ["C", "Ruby", "BDD/TDD", "Arq. Hexagonal", "POO", "Docencia"],
  },
  {
    id: "now",
    year: "AHORA",
    title: "Explorando y construyendo",
    subtitle: "Cloud · Agentes de IA · Proyectos personales",
    type: "project",
    ongoing: true,
    description:
      "Estoy en una nueva ruta de aprendizaje: profundizando en cloud computing (AWS, sistemas distribuidos) y agentes de IA. En paralelo, desarrollo mis proyectos personales — este blog y una app para entrenadores personales. Quiero conectar mi base de frontend con la nube y el backend de forma más integral.",
    focus: ["AWS", "Cloud", "Agentes de IA", "Proyectos personales", "Sistemas distribuidos"],
  },
];

const TYPE_COLOR: Record<EventType, string> = {
  education: "text-cyan-400",
  work:      "text-pink-400",
  ta:        "text-violet-400",
  project:   "text-amber-400",
};

const DOT_COLOR: Record<EventType, string> = {
  education: "bg-cyan-400   shadow-[0_0_16px_6px_rgba(34,211,238,0.6)]",
  work:      "bg-pink-400   shadow-[0_0_16px_6px_rgba(244,114,182,0.6)]",
  ta:        "bg-violet-400 shadow-[0_0_16px_6px_rgba(167,139,250,0.6)]",
  project:   "bg-amber-400  shadow-[0_0_16px_6px_rgba(251,191,36,0.6)]",
};

function TimelineItem({ event, lang }: { event: TimelineEvent; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const color = TYPE_COLOR[event.type];
  const dot   = DOT_COLOR[event.type];

  const ongoingBadge = (
    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      {t("en curso", lang)}
    </span>
  );

  const tags = (
    <div className="mt-4 flex flex-wrap gap-2">
      {event.focus.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-400"
        >
          {t(tag, lang)}
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${active ? "opacity-100" : "opacity-30"}`}
    >
      {/* ───────── Mobile / tablet: left rail ───────── */}
      <div className="relative py-8 pl-12 md:hidden">
        {/* Dot on the rail */}
        <div
          className={`absolute left-0 top-9 h-3 w-3 rounded-full border-2 border-black transition-all duration-500 ${
            active ? dot : "bg-zinc-700"
          }`}
        />
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={`font-black tracking-tight transition-all duration-500 ${
              active ? "text-white text-2xl" : "text-zinc-700 text-xl"
            }`}
          >
            {t(event.year, lang)}
          </span>
          {event.ongoing && active && ongoingBadge}
        </div>
        <h3
          className={`mt-1 text-lg font-bold leading-tight transition-colors duration-500 ${
            active ? "text-white" : "text-zinc-500"
          }`}
        >
          {t(event.title, lang)}
        </h3>
        <p className={`mt-0.5 text-sm font-medium transition-colors duration-500 ${active ? color : "text-zinc-600"}`}>
          {t(event.subtitle, lang)}
        </p>
        <p className={`mt-3 text-sm leading-7 transition-colors duration-500 ${active ? "text-zinc-300" : "text-zinc-600"}`}>
          {t(event.description, lang)}
        </p>
        {active && tags}
      </div>

      {/* ───────── Desktop: 3 columns ───────── */}
      <div className="hidden grid-cols-[1fr_auto_1fr] items-stretch gap-x-8 py-14 md:grid lg:gap-x-12">
        {/* Left — title + subtitle */}
        <div className="flex flex-col justify-center pt-2 text-right">
          <h3
            className={`text-2xl font-bold leading-tight transition-colors duration-500 lg:text-3xl ${
              active ? "text-white" : "text-zinc-500"
            }`}
          >
            {t(event.title, lang)}
          </h3>
          <p className={`mt-1 text-sm font-medium transition-colors duration-500 ${active ? color : "text-zinc-600"}`}>
            {t(event.subtitle, lang)}
          </p>
          {event.ongoing && active && (
            <span className="mt-2 flex justify-end">{ongoingBadge}</span>
          )}
        </div>

        {/* Center — year + dot on line */}
        <div className="relative flex w-[7.5rem] flex-col items-center lg:w-36">
          <span
            className={`relative z-10 whitespace-nowrap text-center font-black tracking-tight transition-all duration-500 ${
              active ? "text-white text-3xl lg:text-4xl" : "text-zinc-700 text-2xl lg:text-3xl"
            }`}
          >
            {t(event.year, lang)}
          </span>
          <div
            className={`relative z-10 mt-4 h-3.5 w-3.5 rounded-full border-2 border-black transition-all duration-500 ${
              active ? dot : "bg-zinc-700"
            }`}
          />
        </div>

        {/* Right — description + tags */}
        <div className="flex flex-col justify-center pt-2">
          <p
            className={`text-base leading-7 transition-colors duration-500 ${
              active ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            {t(event.description, lang)}
          </p>
          {active && tags}
        </div>
      </div>
    </div>
  );
}

export default function ProfessionalStoryTimeline({ lang }: { lang: Lang }) {
  return (
    <section id="story" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-4 text-center">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("Mi carrera &", lang)}{" "}
            <span className="text-violet-400">{t("experiencia", lang)}</span>
          </h2>
        </div>

        {/* Legend */}
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          {(["education", "work", "ta", "project"] as EventType[]).map((type) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${DOT_COLOR[type].split(" ")[0]}`} />
              <span className="text-xs text-zinc-500">
                {t({ education: "Educación", work: "Trabajo", ta: "Docencia", project: "Proyecto" }[type], lang)}
              </span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line — left on mobile, centered on desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-1.5 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2 md:-translate-x-1/2" />

          {events.map((event) => (
            <TimelineItem key={event.id} event={event} lang={lang} />
          ))}
        </div>

      </div>
    </section>
  );
}
