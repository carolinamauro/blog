import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-black dark:via-zinc-950 dark:to-zinc-900 font-sans">

      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 px-6 text-center">

        <span className="rounded-full bg-black/5 px-4 py-1 text-sm font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          Diario de aprendizaje en construcción 🚀
        </span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Ups! Te encontraste con mi{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            spam de ideas
          </span>
        </h1>

        <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
          <p>
            Desde un poco antes de recibirme como Ingeniera en Informática en
            diciembre de 2025, estuve preguntándome si estaba lista. Si conocía
            lo suficiente. Si había explorado bien las materias. Si había hecho
            suficientes proyectos interesantes...
          </p>

          <p>
            Pero sobre todo no paro de preguntarme: ¿En qué quiero enfocarme?
            ¿Front? ¿Back? ¿Ciberseguridad? ¿Machine Learning? ¿Cloud?
            ¿AWS?
          </p>

          <p>
            Y entre tantas posibilidades, me di cuenta de algo simple:
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {" "}
              lo que más me gusta es aprender.
            </span>{" "}
            Así que este blog es mi laboratorio personal.
          </p>
        </div>

        <Link
          href="/blog"
          className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-500"
        >
          Ver lo que estoy aprendiendo →
        </Link>
      </div>
    </div>
  );
}