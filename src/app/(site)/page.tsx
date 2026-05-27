import Link from "next/link";
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

export default function Home() {
  const latestPosts = getAllPostsMeta().slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <section className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-12 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400">
            Carolina Mauro
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Ingeniera en Informática construyendo mi camino en software.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Frontend Engineer con 4 años de experiencia en productos web y
            móviles. Acá reúno proyectos, stack, intereses técnicos y notas de
            aprendizaje mientras profundizo en cloud, sistemas distribuidos,
            backend e IA aplicada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Ver proyectos
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-pink-500 hover:text-pink-600 dark:border-zinc-700 dark:text-white dark:hover:border-pink-400 dark:hover:text-pink-300"
            >
              Ir al blog personal
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            Focus actual
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-md bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Ahora
            </p>
            <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              Trabajo principalmente con Vue, Nuxt, React, React Native y
              TypeScript. También colaboro en backend, testing y arquitectura.
            </p>
          </div>
        </aside>
      </section>

      <section className="border-y border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              Soy Ingeniera en Informática y Frontend Engineer. Mi experiencia
              laboral se concentra en productos web y móviles de alta escala,
              pero me interesa entender el sistema completo: desde la interfaz y
              la arquitectura de componentes hasta APIs, datos, testing,
              observabilidad y cloud. También soy docente universitaria, un
              espacio que me mantiene cerca de los fundamentos y de la práctica
              de explicar software con claridad.
              </p>
          </div>
        </div>
      </section>

      <TechStackShowcase />

      <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
              Algunas piezas que estoy usando para practicar, documentar y darle
              forma a mi perfil técnico.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="shrink-0 rounded-md bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-500/10 dark:text-pink-300">
                  {project.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Blog personal</h2>
              <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
                Notas de aprendizaje, apuntes técnicos y reflexiones sobre mi
                camino profesional.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold transition hover:border-pink-500 hover:text-pink-600 dark:border-zinc-700 dark:hover:border-pink-400 dark:hover:text-pink-300"
            >
              Ver todas las notas
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-pink-500/60 dark:hover:bg-zinc-950/70"
              >
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {post.date}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                {post.summary ? (
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
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
