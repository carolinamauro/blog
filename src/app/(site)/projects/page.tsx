import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "../../../lib/projects";
import type { ProjectStatus } from "../../../lib/projects";

export const metadata: Metadata = {
  title: "Proyectos · Carolina Mauro",
  description: "Proyectos personales y profesionales que estoy construyendo.",
};

const statusConfig: Record<ProjectStatus, { color: string; dot: string }> = {
  "En progreso": {
    color: "text-cyan-200 bg-cyan-400/10 border-cyan-400/30",
    dot: "bg-cyan-400 shadow-[0_0_8px_rgba(103,232,249,0.8)]",
  },
  Iterando: {
    color: "text-pink-200 bg-pink-400/10 border-pink-400/30",
    dot: "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
  },
  Completado: {
    color: "text-emerald-200 bg-emerald-400/10 border-emerald-400/30",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  },
  Pausado: {
    color: "text-zinc-400 bg-zinc-400/10 border-zinc-400/30",
    dot: "bg-zinc-500",
  },
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "-2rem", right: "2rem", width: "30rem", height: "30rem", background: "rgba(139,92,246,0.15)" }}
      />
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "20rem", left: "-2rem", width: "26rem", height: "26rem", background: "rgba(6,182,212,0.12)", animationDelay: "4s" }}
      />

      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-in-up mb-12">
          <h1 className="text-shimmer text-4xl font-extrabold tracking-tight">
            Proyectos
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Cosas que estoy construyendo, explorando o que ya terminé. Hacé click en cualquiera para ver el detalle completo.
          </p>
        </div>

        <div className="grid gap-5">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/55 hover:shadow-2xl hover:shadow-cyan-950/20 sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {project.status}
                      </span>
                      {project.context && (
                        <span className="text-xs text-zinc-500">{project.context}</span>
                      )}
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-white transition group-hover:text-cyan-100">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">{project.tagline}</p>
                  </div>
                  <div className="min-w-[100px] sm:text-right">
                    <p className="text-sm font-semibold text-zinc-300">{project.progress}%</p>
                    <p className="text-xs text-zinc-500">completado</p>
                  </div>
                </div>

                <div className="mt-4">
                  <ProgressBar value={project.progress} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-zinc-500">
                      +{project.stack.length - 5} más
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-cyan-400 opacity-0 transition group-hover:opacity-100">
                  Ver detalle completo
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
