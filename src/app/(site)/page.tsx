import Link from "next/link";
import ProfessionalStoryTimeline from "../../components/ProfessionalStoryTimeline";
import TechStackShowcase from "../../components/TechStackShowcase";
import { getAllPostsMeta } from "../../lib/posts";

const focusAreas = [
  "Cloud computing",
  "Sistemas distribuidos",
  "Redes",
  "Backend",
  "Linux",
  "Agentes de IA",
  "Frontend avanzado",
];

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

const orbitStats = [
  { value: "4+ años de experiencia", label: "en el desarrollo de Software" },
  { value: "FIUBA", label: "ayudante de catedra" },
];

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <main className="portfolio-shell min-h-screen text-white">
      <section className="cosmic-hero relative isolate min-h-[88vh] overflow-hidden px-4 pb-14 pt-24 text-white sm:px-6 lg:min-h-[92vh] lg:px-8">
        <div className="hero-illustration absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,2,8,0.95)_0%,rgba(2,2,8,0.82)_43%,rgba(2,2,8,0.34)_76%,rgba(2,2,8,0.72)_100%)]" />

        <div className="mx-auto grid min-h-[calc(92vh-6rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100 shadow-[0_0_24px_rgba(103,232,249,0.22)]">
               Ingeniera en Informática · Frontend Engineer
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Carolina Mauro
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold text-pink-100 sm:text-2xl">
              Me encanta aprender, crear y compartir lo que sé. Este es mi espacio para mostrar lo que estoy haciendo, 
              lo que aprendí y hacia dónde quiero ir.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">
              Portfolio personal con proyectos, stack, ideas técnicas y notas de
              aprendizaje. Mi base está en frontend, y busco expandir mi perfil hacia la nube, sistemas distribuidos y 
              backend. También me interesa mucho la docencia, así que voy a compartir lo que voy aprendiendo sobre cómo
              explicar software de forma clara y efectiva.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#stack"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_28px_rgba(255,255,255,0.24)] transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                Explorar stack
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-pink-300/50 bg-pink-300/10 px-5 py-3 text-sm font-bold text-pink-100 transition hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-300/20"
              >
                Ir al blog personal
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 lg:hidden">
              {orbitStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/15 bg-white/[0.08] p-3 backdrop-blur"
                >
                  <p className="text-lg font-black leading-tight">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-4 text-zinc-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="cosmic-console hidden rounded-lg border border-white/15 bg-zinc-950/55 p-6 shadow-2xl shadow-pink-950/40 backdrop-blur-md lg:block">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Resumen
              </p>
              <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
            </div>

            <div className="mt-6 grid gap-3">
              {orbitStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-cyan-200/10"
                >
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-zinc-300">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-pink-300/25 bg-pink-300/10 p-4">
              <p className="text-sm font-semibold text-pink-100">
                Ahora estoy profundizando
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-medium text-zinc-100"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm lg:-translate-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-pink-300">
              Sobre mí
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
             Curiosa por naturaleza, me gusta entender cómo funcionan las cosas y compartir lo que sé.
            </h2>
            <Link
              href="#story"
              className="mt-6 inline-flex rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-cyan-200"
            >
              Ver historia profesional
            </Link>
          </div>
          <p className="rounded-lg border border-white/10 bg-black/35 p-6 text-lg leading-8 text-zinc-200 backdrop-blur-sm lg:translate-y-8">
            Soy Ingeniera en Informática y Frontend Engineer. Mi experiencia
            laboral se concentra en productos web y mobile, con foco en frontend, aunque también tengo experiencia con backend.
            Soy ayudante de catedra en FIUBA, donde me encuentro en constante contacto con la docencia y el aprendizaje de nuevos conceptos. 
          </p>
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
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-lg border border-white/10 bg-black/55 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-pink-300/70 hover:bg-black/70 hover:shadow-xl hover:shadow-pink-950/30"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="shrink-0 rounded-md bg-pink-400/10 px-2.5 py-1 text-xs font-semibold text-pink-200 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                  {project.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                {project.description}
              </p>
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
                className="rounded-lg border border-white/10 bg-black/45 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-cyan-300/70 hover:bg-black/70 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <p className="text-xs font-medium text-zinc-400">
                  {post.date}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                {post.summary ? (
                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {post.summary}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
