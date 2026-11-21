"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./home/Reveal";
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
    id: "brosoft",
    year: "2022",
    title: "BROSOFT",
    subtitle: "Frontend Developer · TurismoCity",
    type: "work",
    description:
      "Empecé desarrollando la app móvil de TurismoCity en React Native. En 2025 pasé al equipo web (Vue + Nuxt), donde desarrollé funcionalidades de la vertical de paquetes en frontend y backend con Node.js. Estuve hasta septiembre de 2026.",
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
    title: "Ayudante de Cátedra",
    subtitle: "Ingeniería del Software II · FIUBA",
    type: "ta",
    ongoing: true,
    description:
      "Desde marzo de 2025 soy ayudante en Ingeniería del Software II. Hago code review con foco en Clean Code, diseño orientado a objetos y patrones de repositorio. Acompaño la implementación de BDD/TDD con escenarios Gherkin y arquitectura hexagonal en Ruby, y cumplo el rol de PO en el proyecto del bot de Telegram.",
    focus: ["Ruby", "BDD/TDD", "Gherkin", "Arq. Hexagonal", "Clean Code", "Product Owner"],
  },
  {
    id: "innovid",
    year: "2026",
    title: "INNOVID",
    subtitle: "Software Engineer II",
    type: "work",
    ongoing: true,
    description:
      "En septiembre de 2026 dejé BROSOFT y me sumé a Innovid como Software Engineer II, un nuevo paso en mi carrera como ingeniera de software.",
    focus: ["Software Engineering"],
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

const TYPE_STYLE: Record<EventType, { label: string; dot: string; chip: string }> = {
  education: { label: "Educación", dot: "bg-court", chip: "text-court border-court/30 bg-court/10" },
  work:      { label: "Trabajo",   dot: "bg-ball",  chip: "text-accent border-accent/30 bg-ball/15" },
  ta:        { label: "Docencia",  dot: "bg-clay",  chip: "text-clay border-clay/30 bg-clay/10" },
  project:   { label: "Proyecto",  dot: "bg-sky-400", chip: "text-sky-600 dark:text-sky-300 border-sky-400/30 bg-sky-400/10" },
};

function TimelineItem({ event, index, lang }: { event: TimelineEvent; index: number; lang: Lang }) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = TYPE_STYLE[event.type];

  return (
    <li ref={ref} className="relative grid gap-4 pl-10 md:grid-cols-[9rem_1fr] md:gap-10 md:pl-0">
      {/* Ball on the baseline */}
      <span
        aria-hidden
        className={`absolute left-[3px] top-7 h-4 w-4 rounded-full border-2 border-bg transition-all duration-500 md:left-[calc(9rem+1.25rem-8px)] ${
          active ? "tennis-ball scale-125" : style.dot
        }`}
      />

      {/* Set + year */}
      <div className="md:pt-5 md:text-right">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-faint">
          Set {String(index + 1).padStart(2, "0")}
        </p>
        <p
          className={`font-display text-4xl font-extrabold tracking-tight transition-colors duration-500 ${
            active ? "text-ink" : "text-faint"
          }`}
        >
          {t(event.year, lang)}
        </p>
      </div>

      {/* Card */}
      <div
        className={`card p-6 transition-all duration-500 ${
          active ? "-translate-y-0.5 border-ink/25" : "opacity-80"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${style.chip}`}>
            {t(style.label, lang)}
          </span>
          {event.ongoing && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-bg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff4d4d]" />
              {t("En juego", lang)}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{t(event.title, lang)}</h3>
        <p className="mt-0.5 text-sm font-semibold text-muted">{t(event.subtitle, lang)}</p>
        <p className="mt-4 text-[0.95rem] leading-7 text-muted">{t(event.description, lang)}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {event.focus.map((tag) => (
            <span key={tag} className="chip">{t(tag, lang)}</span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function ProfessionalStoryTimeline({ lang }: { lang: Lang }) {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t("Mi carrera", lang)}
          title={t("Set por set,", lang)}
          accent={t("punto por punto.", lang)}
          intro={t("Educación, trabajo, docencia y proyectos: el partido que vengo jugando desde 2020.", lang)}
        />

        <ol className="relative space-y-10">
          {/* Baseline */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[10px] top-0 w-0.5 bg-line md:left-[calc(9rem+1.25rem-1px)]"
          />
          {events.map((event, i) => (
            <TimelineItem key={event.id} event={event} index={i} lang={lang} />
          ))}
        </ol>
      </div>
    </section>
  );
}
