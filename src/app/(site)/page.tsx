import Link from "next/link";
import ContactSection from "../../components/ContactSection";
import HeroCaricature from "../../components/HeroCaricature";
import ProfessionalStoryTimeline from "../../components/ProfessionalStoryTimeline";
import TechStackShowcase from "../../components/TechStackShowcase";
import { getAllPostsMeta } from "../../lib/posts";

function toFileName(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const projects = [
  {
    title: "Personal blog",
    description:
      "Portfolio y blog técnico construido con Next.js, MDX y Tailwind para documentar aprendizaje, stack y proyectos.",
    status: "En progreso",
  },
  {
    title: "Sistema de Gestión de Tratamientos Oncológicos",
    description:
      "Plataforma web para prescripción pediátrica oncológica con cálculo automático de dosis y trazabilidad de medicamentos. Stack: React, HL7, Node.js y Docker.",
    status: "UBA + Hospital Garrahan",
  },
  {
    title: "Organizador de Alumnos para Entrenadores",
    description:
      "App web para gestión de pagos, rutinas y planificación de alumnos. Surge de una necesidad real del ámbito del entrenamiento personal.",
    status: "Iterando",
  },
];

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <main className="portfolio-shell relative z-10 min-h-screen text-white">
      <HeroCaricature />

      <section className="section-shell relative overflow-hidden py-20">
        {/* Decorative blobs */}
        <div
          className="nebula-blob animate-nebula"
          style={{ top: "1rem", left: "-3rem", width: "22rem", height: "22rem", background: "rgba(244,114,182,0.10)", zIndex: 0 }}
        />
        <div
          className="nebula-blob animate-nebula"
          style={{ bottom: "0", right: "-2rem", width: "24rem", height: "24rem", background: "rgba(6,182,212,0.10)", zIndex: 0, animationDelay: "5s" }}
        />

        <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="mb-10 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
              <span className="text-sm">✦</span> Sobre mí
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-pink-300/40 via-white/10 to-transparent" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
            {/* Left — big quote card with animated gradient border */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-cyan-400/50 via-violet-400/40 to-pink-400/50 p-px transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-950/40">
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#08060f]/90 p-8 backdrop-blur-md">
                {/* Giant decorative quote mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-10 select-none font-serif text-[10rem] leading-none text-white/[0.06]"
                >
                  ”
                </span>
                {/* Floating sparkle */}
                <span
                  aria-hidden
                  className="animate-float absolute right-8 top-8 text-cyan-300/70"
                >
                  ✦
                </span>

                <h2 className="relative text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
                  Curiosa por naturaleza, me gusta entender{" "}
                  <span className="text-shimmer">cómo funcionan las cosas</span> y
                  compartir lo que sé.
                </h2>

                <Link
                  href="#story"
                  className="group/btn mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-200/10 hover:text-cyan-100"
                >
                  Ver historia profesional
                  <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right — editor window with bio + highlighted keywords */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20">
              {/* Window title bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-pink-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 font-mono text-xs text-zinc-500">sobre-mi.md</span>
              </div>

              {/* Bio */}
              <div className="p-6 sm:p-8">
                <p className="text-lg leading-9 text-zinc-200">
                  Soy{" "}
                  <span className="font-semibold text-cyan-300">Ingeniera en Informática</span> y trabajo actualmente como{" "}
                  <span className="font-semibold text-pink-300">Frontend Engineer</span>. Mi
                  experiencia laboral se concentra en productos web y mobile, con foco en{" "}
                  <span className="font-semibold text-pink-300">frontend</span>, aunque también
                  tengo experiencia con{" "}
                  <span className="font-semibold text-violet-300">backend</span>. Soy ayudante de
                  catedra en{" "}
                  <span className="font-semibold text-amber-300">FIUBA</span>, donde me encuentro
                  en constante contacto con la{" "}
                  <span className="font-semibold text-emerald-300">docencia</span> y el
                  aprendizaje de nuevos conceptos. Actualmente estoy integrando mis
                  conocimientos de ingeniería en el aprendizaje de{" "}
                  <span className="font-semibold text-cyan-300">cloud</span>,{" "}
                  <span className="font-semibold text-amber-300">AWS</span> y{" "}
                  <span className="font-semibold text-violet-300">agentes de IA</span>, ya que me
                  interesa muchísimo poder trabajar con ellos.
                </p>
              </div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { flag: "🇬🇧", name: "Inglés", level: "B2", pct: 75, color: "from-cyan-400 to-cyan-300" },
              { flag: "🇩🇪", name: "Alemán", level: "B2", pct: 75, color: "from-violet-400 to-violet-300" },
              { flag: "🇦🇷", name: "Español", level: "Nativo", pct: 100, color: "from-pink-400 to-pink-300" },
            ].map((lang) => (
              <div
                key={lang.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-base font-semibold text-white">{lang.name}</span>
                  </div>
                  <span className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-bold text-zinc-200">
                    {lang.level}
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                    style={{ width: `${lang.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProfessionalStoryTimeline />

      <TechStackShowcase />

      <section id="projects" className="section-shell px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
              Algunas piezas que estoy usando para practicar, documentar y darle
              forma a mi perfil técnico.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-100"
          >
            Ver todos los proyectos
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-xl border border-white/10 bg-black/55 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-pink-300/60 hover:shadow-xl hover:shadow-pink-950/30"
            >
              {/* Mac window title bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-pink-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate font-mono text-xs text-zinc-500">
                  {toFileName(project.title)}.tsx
                </span>
              </div>
              {/* Body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="shrink-0 rounded-md bg-pink-400/10 px-2.5 py-1 text-xs font-semibold text-pink-200 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                    {project.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-300">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Blog personal</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Notas de aprendizaje, apuntes técnicos y reflexiones sobre mi
                camino profesional.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-100"
            >
              Ver todas las notas
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                {/* Mac window title bar */}
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-pink-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 truncate font-mono text-xs text-zinc-500">
                    {toFileName(post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, ""))}.md
                  </span>
                </div>
                {/* Body */}
                <div className="p-5">
                  <p className="text-xs font-medium text-zinc-400">{post.date}</p>
                  <h3 className="mt-3 text-lg font-semibold transition group-hover:text-cyan-200">
                    {post.title}
                  </h3>
                  {post.summary ? (
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      {post.summary}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
