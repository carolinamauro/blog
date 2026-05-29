"use client";

import { useEffect, useRef, useState } from "react";

type EventType = "education" | "work" | "ta" | "project";

type TimelineEvent = {
  id: string;
  /** Fractional year, e.g. 2022.5 = mid-2022 */
  at: number;
  label: string;
  sublabel: string;
  type: EventType;
  ongoing?: boolean;
  detail: {
    period: string;
    description: string;
    focus: string[];
  };
};

const TIMELINE_START = 2020;
const TIMELINE_END = 2026;
const RANGE = TIMELINE_END - TIMELINE_START;

const events: TimelineEvent[] = [
  {
    id: "degree-start",
    at: 2020.2,  // March 2020
    label: "Inicio Ingeniería",
    sublabel: "FIUBA · Ingeniería en Informática",
    type: "education",
    detail: {
      period: "Marzo 2020",
      description:
        "Empecé la carrera en plena pandemia, cursando el CBC de forma virtual a través de UBA XXI mientras terminaba el colegio. Arrancar en ese contexto me enseñó desde el primer día a organizarme, estudiar de forma autónoma y mantener el foco en metas de largo plazo.",
      focus: ["FIUBA", "Algoritmos", "Matemática", "Física"],
    },
  },
  {
    id: "ta-foundations-1",
    at: 2021.2,
    label: "Ayudantía I",
    sublabel: "Fundamentos de Programación",
    type: "ta",
    detail: {
      period: "Junio 2021 – Junio 2022",
      description:
        "Primera experiencia como ayudante de cátedra. Acompañé a los alumnos en su primer contacto con la programación: variables, estructuras de control, funciones y algoritmos, todo en C. Me di cuenta rápido que explicar bien algo es tan difícil como entenderlo, y eso me enganchó con la docencia.",
      focus: ["C", "TDAs", "Memoria", "Punteros", "Docencia"],
    },
  },
  {
    id: "brosoft",
    at: 2022.5,
    label: "BROSOFT",
    sublabel: "Frontend Developer · TurismoCity",
    type: "work",
    ongoing: true,
    detail: {
      period: "Junio 2022 – actualidad",
      description:
        "Empecé en BROSOFT desarrollando la app móvil de TurismoCity, una plataforma de comparación de vuelos y hoteles. Durante más de 3 años trabajé en React Native, y en junio de 2025 pasé al equipo web (Vue + Nuxt), donde desarrollo funcionalidades de la vertical de paquetes tanto en el frontend como en el backend con Node.js.",
      focus: ["Vue", "Nuxt", "TypeScript", "React Native", "Node.js", "APIs"],
    },
  },
  {
    id: "garrahan",
    at: 2025.3,
    label: "Trabajo Profesional",
    sublabel: "Sistema Garrahan · FIUBA",
    type: "project",
    detail: {
      period: "Marzo 2025 – Diciembre 2025",
      description:
        "Desarrollé junto a tres compañeros el Trabajo Profesional final de la carrera: una plataforma web para automatizar la prescripción de medicación oncológica pediátrica en el Hospital Garrahan. El sistema calcula dosis automáticamente, genera recetas en PDF y alerta a los médicos cuando deben emitir una nueva prescripción. Stack: Next.js · React · Node.js · Express · OracleDB · HL7 FHIR · Docker.",
      focus: ["Next.js", "React", "Node.js", "OracleDB", "HL7 FHIR", "Docker", "BDD/TDD"],
    },
  },
  {
    id: "degree-end",
    at: 2025.9,
    label: "Ingeniera en Informática",
    sublabel: "Graduación FIUBA",
    type: "education",
    detail: {
      period: "Diciembre 2025",
      description:
        "Me gradué de Ingeniería en Informática en la UBA. Cinco años de carrera que cubrieron desde algoritmos y estructuras de datos hasta sistemas distribuidos, inteligencia artificial, seguridad informática y blockchain. Fue un camino largo e intenso que valió completamente cada materia.",
      focus: ["Graduación", "FIUBA", "UBA", "Ingeniería en Informática"],
    },
  },
  {
    id: "ta-foundations-2",
    at: 2025.8,
    label: "Ayudantía II",
    sublabel: "Fundamentos de Programación",
    type: "ta",
    ongoing: true,
    detail: {
      period: "Diciembre 2025 – actualidad",
      description:
        "Retomé la ayudantía de Fundamentos de Programación. Verlos arrancar desde cero, entender sus dudas y encontrar la forma de explicar algo que ya naturalizé, sigue siendo uno de los ejercicios más útiles que tengo para seguir creciendo como profesional.",
      focus: ["C", "TDAs", "Punteros", "Docencia", "Algoritmos"],
    },
  },
  {
    id: "ta-software",
    at: 2025.2,
    label: "Ayudantía IS II",
    sublabel: "Ingeniería de Software II",
    type: "ta",
    ongoing: true,
    detail: {
      period: "Marzo 2025 – actualidad",
      description:
        "Ayudante en Ingeniería de Software II, donde se trabaja con Ruby siguiendo BDD + TDD, arquitectura hexagonal, patrón repositorio y POO. Hacemos code reviews, sprints y scrums. Me encanta este espacio porque une lo técnico con lo metodológico y me hace pensar mucho en cómo construir software que dure.",
      focus: ["BDD/TDD", "Ruby", "Arq. Hexagonal", "POO", "Code Review", "Scrums"],
    },
  },
];

const TYPE_CONFIG: Record<EventType, { color: string; glow: string; label: string }> = {
  education: {
    color: "bg-cyan-400 border-cyan-300",
    glow: "shadow-[0_0_16px_rgba(34,211,238,0.8)]",
    label: "Educación",
  },
  work: {
    color: "bg-pink-400 border-pink-300",
    glow: "shadow-[0_0_16px_rgba(244,114,182,0.8)]",
    label: "Trabajo",
  },
  ta: {
    color: "bg-violet-400 border-violet-300",
    glow: "shadow-[0_0_16px_rgba(167,139,250,0.8)]",
    label: "Docencia",
  },
  project: {
    color: "bg-amber-400 border-amber-300",
    glow: "shadow-[0_0_16px_rgba(251,191,36,0.8)]",
    label: "Proyecto",
  },
};

// Map year to % within the padded track (4% inset each side so edges don't clip)
const PAD = 4;
function pct(at: number) {
  return PAD + ((at - TIMELINE_START) / RANGE) * (100 - PAD * 2);
}

const YEAR_LABELS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

// Stagger events above/below so labels don't overlap
const ROWS: Record<string, "top" | "bottom"> = {
  "degree-start":    "bottom",
  "ta-foundations-1":"top",
  "brosoft":         "bottom",
  "garrahan":        "top",
  "degree-end":      "bottom",
  "ta-foundations-2":"top",
  "ta-software":     "bottom",
};

export default function ProfessionalStoryTimeline() {
  const [activeId, setActiveId] = useState<string>("brosoft");
  const [animated, setAnimated] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  const activeEvent = events.find((e) => e.id === activeId)!;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Current date position for the "progress" fill
  const now = new Date();
  const nowAt = Math.min(
    now.getFullYear() + now.getMonth() / 12,
    TIMELINE_END
  );
  const progressPct = pct(nowAt);

  return (
    <section id="story" className="section-shell py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
            Historia profesional
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Línea de tiempo
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            Mi camino empieza en 2020, con la pandemia y el ingreso a la facultad.
            Tocá cada evento para ver el detalle.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4">
          {(Object.entries(TYPE_CONFIG) as [EventType, typeof TYPE_CONFIG[EventType]][]).map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${cfg.color.split(" ")[0]}`} />
              <span className="text-xs text-zinc-400">{cfg.label}</span>
            </div>
          ))}
        </div>

        {/* Timeline track */}
        <div className="relative select-none overflow-x-auto">
          {/*
            Fixed vertical zones (all absolute from container top):
              0  – 70px  : top-event label area
             70  – 86px  : top-event dot area   (dot centre ≈ 78px)
             86  – 96px  : connector top → rail
             96px        : ─────── RAIL ─────────
             96  – 110px : connector rail → bottom dot
            110  – 126px : bottom-event dot area (dot centre ≈ 118px)
            126  – 158px : bottom-event label area
            158  – 168px : year tick
            168  – 188px : year text
          */}
          <div
            ref={lineRef}
            className="relative"
            style={{ minWidth: "680px", height: "196px" }}
          >
            {/* Base rail */}
            <div className="absolute left-0 right-0 bg-white/10" style={{ top: "96px", height: "1px" }} />

            {/* Animated progress fill */}
            <div
              className="absolute bg-gradient-to-r from-cyan-400 via-pink-400 to-violet-400 transition-all duration-[2000ms] ease-out"
              style={{
                top: "96px",
                height: "1px",
                left: 0,
                width: animated ? `${progressPct}%` : "0%",
              }}
            />

            {/* Glow dot at progress tip */}
            {animated && (
              <div
                className="absolute -translate-x-1/2 rounded-full bg-white animate-glow-pulse"
                style={{ top: "91px", left: `${progressPct}%`, width: "10px", height: "10px", boxShadow: "0 0 12px 4px rgba(255,255,255,0.4)" }}
              />
            )}

            {/* Year ticks + labels */}
            {YEAR_LABELS.map((yr) => (
              <div
                key={yr}
                className="absolute -translate-x-1/2"
                style={{ left: `${pct(yr)}%`, top: "96px" }}
              >
                <div className="mx-auto w-px bg-white/20" style={{ height: "12px" }} />
                <span className="mt-1 block text-center text-[11px] text-zinc-500 select-none">
                  {yr}
                </span>
              </div>
            ))}

            {/* Events */}
            {events.map((ev) => {
              const row = ROWS[ev.id] ?? "top";
              const isActive = ev.id === activeId;
              const cfg = TYPE_CONFIG[ev.type];

              // dot centre y: top=78, bottom=118
              const dotCentreY = row === "top" ? 78 : 118;
              const dotTopY    = dotCentreY - 8; // dot is 16px
              // connector: from dot edge to rail (96px)
              const connTop    = row === "top" ? dotTopY + 16 : 96;
              const connH      = row === "top" ? 96 - (dotTopY + 16) : dotTopY - 96;
              // label y
              const labelTopY  = row === "top" ? dotTopY - 28 : dotTopY + 20;

              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setActiveId(ev.id)}
                  className="absolute group -translate-x-1/2 focus:outline-none"
                  style={{ left: `${pct(ev.at)}%`, top: 0, height: "100%" }}
                >
                  {/* Connector */}
                  <div
                    className={`absolute left-1/2 w-px -translate-x-1/2 ${isActive ? "bg-white/40" : "bg-white/15"}`}
                    style={{ top: `${connTop}px`, height: `${connH}px` }}
                  />

                  {/* Dot */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200 ${cfg.color} ${
                      isActive ? cfg.glow + " scale-125" : "group-hover:scale-110"
                    }`}
                    style={{ top: `${dotTopY}px` }}
                  >
                    {ev.ongoing && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[88px] text-center transition-opacity ${
                      isActive ? "opacity-100" : "opacity-55 group-hover:opacity-90"
                    }`}
                    style={{ top: `${labelTopY}px` }}
                  >
                    <p className={`text-[10px] font-bold leading-tight ${isActive ? "text-white" : "text-zinc-300"}`}>
                      {ev.label}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div
          key={activeId}
          className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 animate-fade-in-up sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                    {
                      education: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
                      work: "border-pink-400/40 bg-pink-400/10 text-pink-200",
                      ta: "border-violet-400/40 bg-violet-400/10 text-violet-200",
                      project: "border-amber-400/40 bg-amber-400/10 text-amber-200",
                    }[activeEvent.type]
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${TYPE_CONFIG[activeEvent.type].color.split(" ")[0]}`}
                  />
                  {TYPE_CONFIG[activeEvent.type].label}
                  {activeEvent.ongoing && (
                    <span className="ml-1 rounded-sm bg-white/10 px-1 text-[10px]">
                      activo
                    </span>
                  )}
                </span>
                <span className="text-sm text-zinc-400">
                  {activeEvent.detail.period}
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-bold text-white">
                {activeEvent.label}
              </h3>
              <p className="mt-0.5 text-sm text-zinc-400">
                {activeEvent.sublabel}
              </p>
            </div>

            {/* Focus tags */}
            <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end">
              {activeEvent.detail.focus.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-5 text-base leading-8 text-zinc-300">
            {activeEvent.detail.description}
          </p>
        </div>

      </div>
    </section>
  );
}
