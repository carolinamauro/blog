import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "../../lib/projects";
import { statusStyle } from "../../lib/status";
import { t, localizedHref, type Lang } from "../../lib/i18n";

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className="h-full rounded-full bg-ball"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function ProjectDetailView({ slug, lang }: { slug: string; lang: Lang }) {
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const status = statusStyle[project.status];
  const projectsHref = localizedHref("/projects", lang);

  return (
    <main className="relative min-h-screen px-5 pb-20 pt-32 sm:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          href={projectsHref}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("Volver a proyectos", lang)}
        </Link>

        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {t(project.status, lang)}
            </span>
            {project.context && (
              <span className="text-xs text-faint">{t(project.context, lang)}</span>
            )}
            <span className="text-xs text-faint">{t(project.period, lang)}</span>
          </div>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-6xl">
            {t(project.title, lang)}
          </h1>
          <p className="mt-3 text-lg text-muted">{t(project.tagline, lang)}</p>
        </div>

        {/* Progress */}
        <div className="mt-6 card rounded-3xl p-6 ">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted">{t("Progreso", lang)}</span>
            <span className="text-sm font-bold text-ink">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>

        {/* Stack */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="chip text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-8 rounded-xl border border-line bg-ball/15 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
            Highlights
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ball" />
                {t(h, lang)}
              </li>
            ))}
          </ul>
        </div>

        {/* Content sections */}
        <div className="mt-10 space-y-8">
          {project.sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-3 font-display text-2xl font-extrabold text-ink">{t(section.title, lang)}</h2>
              <p className="text-base leading-8 text-ink/80">{t(section.content, lang)}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-10 card rounded-3xl p-6 ">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-faint">
              Links
            </p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/25 hover:text-accent"
                >
                  {t(link.label, lang)}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-12 border-t border-line pt-8">
          <Link
            href={projectsHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("Ver todos los proyectos", lang)}
          </Link>
        </div>

      </div>
    </main>
  );
}
