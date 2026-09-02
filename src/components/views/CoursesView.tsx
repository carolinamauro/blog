import Link from "next/link";
import { courses } from "../../lib/courses";
import { t, type Lang } from "../../lib/i18n";

export default function CoursesView({ lang }: { lang: Lang }) {
  const completed = courses.filter((course) => course.status === "completed");
  const studying = courses.filter((course) => course.status === "studying");
  const upcoming = courses.filter((course) => course.status === "upcoming");
  return (
    <main className="portfolio-shell relative z-10 min-h-screen px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            <span aria-hidden>✦</span> {t("Aprendizaje continuo", lang)}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            {t("Cursos y", lang)} <span className="text-shimmer">{t("certificaciones", lang)}</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            {t("Soy un poco inquieta, asi que después de recibirme (y tomarme unos meses de relax) comenzó mi camino de autodescubrimiento profesional. En la informatica es imposible aburrirse, hay muchisimas ramas nuevas que podemos explorar. Por eso, me encuentro en la búsqueda de aquello que despierte ese 'bichito' que te haga querer quedarte un ratito más en la compu.", lang)}{" "}
          </p>
        </header>

        <section className="mt-16" aria-labelledby="completed-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="completed-title" className="text-2xl font-bold">{t("Cursos realizados", lang)}</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-pink-300/40 to-transparent" />
          </div>

          <div className="grid gap-6">
            {completed.map((course) => (
              <article key={course.id} className="group grid overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl shadow-violet-950/20 transition hover:-translate-y-1 hover:border-pink-300/40 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200">✓ {t("Completado", lang)}</span>
                    <span className="text-sm text-zinc-400">{t(course.date, lang)}</span>
                  </div>
                  <p className="mt-7 font-mono text-sm text-cyan-300">{t(course.institution, lang)}</p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight">{t(course.title, lang)}</h3>
                  <p className="mt-5 max-w-2xl leading-7 text-zinc-300">{t(course.description, lang)}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span key={topic} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-zinc-200">{t(topic, lang)}</span>
                    ))}
                  </div>
                </div>

                <div className="relative flex min-h-72 items-center justify-center overflow-hidden border-t border-white/10 bg-gradient-to-br from-violet-500/15 via-pink-500/10 to-cyan-500/15 p-8 lg:border-l lg:border-t-0">
                  <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,white_0_1px,transparent_1px)] [background-size:24px_24px]" />
                  {course.certificate ? (
                    <Link href={course.certificate} target="_blank" className="relative flex aspect-[1.414/1] w-full max-w-sm flex-col items-center justify-center rounded-xl border border-amber-200/40 bg-[#f8f2df] p-8 text-center text-zinc-900 shadow-2xl transition group-hover:rotate-1 group-hover:scale-[1.02]">
                      <span className="text-3xl">✦</span>
                      <span className="mt-3 font-serif text-xl font-bold">{t("Certificado", lang)}</span>
                      <span className="mt-2 text-xs uppercase tracking-[0.2em]">UTN</span>
                      <span className="mt-5 text-xs font-semibold text-pink-700">{t("Abrir documento ↗", lang)}</span>
                    </Link>
                  ) : (
                    <div className="relative flex aspect-[1.414/1] w-full max-w-sm flex-col items-center justify-center rounded-xl border border-dashed border-white/25 bg-black/30 p-8 text-center">
                      <span className="text-4xl" aria-hidden>⌁</span>
                      <p className="mt-4 font-semibold">{t("Certificado próximamente", lang)}</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">{t("El documento verificado estará disponible acá.", lang)}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="upcoming-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="upcoming-title" className="text-2xl font-bold">{t("Aprendiendo ahora", lang)}</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/40 to-transparent" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {studying.map((course, index) => (
              <article key={course.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <span className="absolute right-5 top-3 font-mono text-6xl font-bold text-white/[0.04]">0{index + 1}</span>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-200"><span className="h-2 w-2 rounded-full bg-amber-300" />{t(course.date, lang)}</span>
                  <h3 className="mt-5 text-2xl font-bold">{t(course.title, lang)}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{t(course.description, lang)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.topics.map((topic) => <span key={topic} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{t(topic, lang)}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="upcoming-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="upcoming-title" className="text-2xl font-bold">{t("Lo que sigue", lang)}</h2>
            <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/40 to-transparent" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {upcoming.map((course, index) => (
              <article key={course.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <span className="absolute right-5 top-3 font-mono text-6xl font-bold text-white/[0.04]">0{index + 1}</span>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-200"><span className="h-2 w-2 rounded-full bg-amber-300" />{t(course.date, lang)}</span>
                  <h3 className="mt-5 text-2xl font-bold">{t(course.title, lang)}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{t(course.description, lang)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.topics.map((topic) => <span key={topic} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{t(topic, lang)}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        
      </div>
    </main>
  );
}
