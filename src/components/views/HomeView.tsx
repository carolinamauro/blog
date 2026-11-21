import Link from "next/link";
import ContactSection from "../ContactSection";
import ProfessionalStoryTimeline from "../ProfessionalStoryTimeline";
import TechStackShowcase from "../TechStackShowcase";
import Hero from "../home/Hero";
import AboutBento from "../home/AboutBento";
import Scoreboard from "../home/Scoreboard";
import Reveal, { SectionHeading } from "../home/Reveal";
import { getAllPostsMeta } from "../../lib/posts";
import { projects } from "../../lib/projects";
import { t, localizedHref, type Lang } from "../../lib/i18n";
import { statusStyle } from "../../lib/status";

export default function HomeView({ lang }: { lang: Lang }) {
  const allPosts = getAllPostsMeta();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-x-clip text-ink">
      <Hero lang={lang} />
      <Scoreboard lang={lang} posts={allPosts.length} projects={projects.length} />
      <AboutBento lang={lang} />
      <ProfessionalStoryTimeline lang={lang} />
      <TechStackShowcase lang={lang} />

      {/* Projects */}
      <section id="projects" className="scroll-mt-24 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={t("Proyectos", lang)}
              title={t("Cosas que", lang)}
              accent={t("construí.", lang)}
            />
            <Link
              href={localizedHref("/projects", lang)}
              className="mb-12 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold transition hover:bg-ink hover:text-bg"
            >
              {t("Ver todos los proyectos", lang)} →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => {
              const status = statusStyle[project.status];
              return (
                <Reveal key={project.slug} delay={i * 0.08}>
                  <Link
                    href={localizedHref(`/projects/${project.slug}`, lang)}
                    className="card group relative flex h-full flex-col overflow-hidden p-7 transition duration-300 hover:-translate-y-1.5 hover:border-ink/25 sm:p-9"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ball/0 transition-all duration-500 group-hover:bg-ball/30"
                    />
                    <div className="relative flex items-center justify-between gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${status.chip}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {t(project.status, lang)}
                      </span>
                      <span className="font-mono text-xs text-faint">{t(project.period, lang)}</span>
                    </div>
                    <h3 className="relative mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                      {t(project.title, lang)}
                    </h3>
                    <p className="relative mt-3 text-base leading-7 text-muted">{t(project.tagline, lang)}</p>
                    {project.context && (
                      <p className="relative mt-2 text-sm font-semibold text-ink/80">{t(project.context, lang)}</p>
                    )}
                    <div className="relative mt-auto pt-8">
                      <div className="mb-2 flex justify-between font-mono text-xs text-muted">
                        <span>{t("Progreso del partido", lang)}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-ball" style={{ width: `${project.progress}%` }} />
                      </div>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span key={tech} className="chip">{tech}</span>
                        ))}
                      </div>
                      <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                        {t("Ver detalle completo", lang)}
                        <span aria-hidden className="transition-transform group-hover:translate-x-1.5">→</span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="scroll-mt-24 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={t("Training log", lang)}
              title={t("Lo último", lang)}
              accent={t("del blog.", lang)}
              intro={t("Notas de aprendizaje, apuntes técnicos y reflexiones sobre mi camino profesional.", lang)}
            />
            <Link
              href="/blog"
              className="mb-12 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold transition hover:bg-ink hover:text-bg"
            >
              {t("Ver todas las notas", lang)} →
            </Link>
          </div>

          <ol className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:border-ink/25"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-faint">
                    <span>#{String(allPosts.length - i).padStart(2, "0")}</span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-accent">{post.category ?? "General"}</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight">
                    <span className="bg-[linear-gradient(var(--ball),var(--ball))] bg-[length:0%_35%] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_35%]">
                      {post.title}
                    </span>
                  </h3>
                  {post.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{post.summary}</p>}
                  <span className="mt-auto pt-6 text-sm font-bold">
                    {t("Leer", lang)} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContactSection lang={lang} />
    </main>
  );
}
