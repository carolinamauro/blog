import Link from "next/link";
import { projects } from "../../lib/projects";
import { statusStyle } from "../../lib/status";
import { t, localizedHref, type Lang } from "../../lib/i18n";
import PageHeader from "../ui/PageHeader";

export default function ProjectsView({ lang }: { lang: Lang }) {
  return (
    <main className="relative min-h-screen px-5 pb-16 pt-32 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PageHeader eyebrow={t("Proyectos", lang)} title={t("Cosas que", lang)} accent={t("construí.", lang)}>
          {t("Cosas que estoy construyendo, explorando o que ya terminé. Hacé click en cualquiera para ver el detalle completo.", lang)}
        </PageHeader>

        <div className="grid gap-5">
          {projects.map((project, i) => {
            const status = statusStyle[project.status];
            return (
              <Link
                key={project.slug}
                href={localizedHref(`/projects/${project.slug}`, lang)}
                className="card group relative grid gap-6 overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-ink/25 sm:p-9 md:grid-cols-[auto_1fr_auto] md:items-center"
              >
                <span className="font-display text-6xl font-extrabold leading-none text-faint/50 transition group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${status.chip}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {t(project.status, lang)}
                    </span>
                    {project.context && <span className="text-xs font-medium text-faint">{t(project.context, lang)}</span>}
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{t(project.title, lang)}</h2>
                  <p className="mt-1 text-muted">{t(project.tagline, lang)}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <span key={tech} className="chip">{tech}</span>
                    ))}
                    {project.stack.length > 6 && (
                      <span className="chip">+{project.stack.length - 6} {t("más", lang)}</span>
                    )}
                  </div>
                </div>
                <div className="md:w-40 md:text-right">
                  <p className="font-mono text-3xl font-bold">{project.progress}%</p>
                  <p className="text-xs text-faint">{t("completado", lang)}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-ball" style={{ width: `${project.progress}%` }} />
                  </div>
                  <p className="mt-4 text-sm font-bold">
                    {t("Ver detalle", lang)} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
