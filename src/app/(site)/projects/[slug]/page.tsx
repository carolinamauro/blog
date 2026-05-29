import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "../../../../lib/projects";
import type { ProjectStatus } from "../../../../lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Carolina Mauro`,
    description: project.description,
  };
}

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
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const status = statusConfig[project.status];

  return (
    <main className="relative z-10 min-h-screen overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      {/* Nebula blobs */}
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "-2rem", right: 0, width: "32rem", height: "32rem", background: "rgba(139,92,246,0.13)" }}
      />
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "40rem", left: "-4rem", width: "28rem", height: "28rem", background: "rgba(6,182,212,0.10)", animationDelay: "5s" }}
      />

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a proyectos
        </Link>

        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {project.status}
            </span>
            {project.context && (
              <span className="text-xs text-zinc-500">{project.context}</span>
            )}
            <span className="text-xs text-zinc-500">{project.period}</span>
          </div>

          <h1 className="text-shimmer mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-zinc-300">{project.tagline}</p>
        </div>

        {/* Progress */}
        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Progreso</span>
            <span className="text-sm font-bold text-white">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>

        {/* Stack */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-8 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Highlights
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Content sections */}
        <div className="mt-10 space-y-8">
          {project.sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 text-lg font-bold text-white">{section.title}</h2>
              <p className="text-base leading-8 text-zinc-300">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-10 rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Links
            </p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-cyan-100"
                >
                  {link.label}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 transition hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ver todos los proyectos
          </Link>
        </div>

      </div>
    </main>
  );
}
