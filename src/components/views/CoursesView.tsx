import Link from "next/link";
import { courses } from "../../lib/courses";
import { t, type Lang } from "../../lib/i18n";
import PageHeader from "../ui/PageHeader";

export default function CoursesView({ lang }: { lang: Lang }) {
  const completed = courses.filter((course) => course.status === "completed");
  const studying = courses.filter((course) => course.status === "studying");
  const upcoming = courses.filter((course) => course.status === "upcoming");
  return (
    <main className="relative min-h-screen px-5 pb-24 pt-32 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader eyebrow={t("Aprendizaje continuo", lang)} title={t("Cursos y", lang)} accent={t("certificaciones", lang)}>
          {t("Soy un poco inquieta, asi que después de recibirme (y tomarme unos meses de relax) comenzó mi camino de autodescubrimiento profesional. En la informatica es imposible aburrirse, hay muchisimas ramas nuevas que podemos explorar. Por eso, me encuentro en la búsqueda de aquello que despierte ese 'bichito' que te haga querer quedarte un ratito más en la compu.", lang)}
        </PageHeader>

        <section className="mt-16" aria-labelledby="completed-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="completed-title" className="font-display text-3xl font-extrabold tracking-tight">{t("Cursos realizados", lang)}</h2>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-6">
            {completed.map((course) => (
              <article key={course.id} className="group grid overflow-hidden card transition hover:-translate-y-1 hover:border-ink/25 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-court/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-court">✓ {t("Completado", lang)}</span>
                    <span className="text-sm text-muted">{t(course.date, lang)}</span>
                  </div>
                  <p className="mt-7 font-mono text-sm font-semibold text-accent">{t(course.institution, lang)}</p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight">{t(course.title, lang)}</h3>
                  <p className="mt-5 max-w-2xl leading-7 text-muted">{t(course.description, lang)}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span key={topic} className="chip text-sm">{t(topic, lang)}</span>
                    ))}
                  </div>
                </div>

                <div className="relative flex min-h-72 items-center justify-center overflow-hidden border-t border-line bg-ball/20 p-8 lg:border-l lg:border-t-0">
                  <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,var(--ink)_0_1px,transparent_1px)] [background-size:24px_24px]" />
                  {course.certificate ? (
                    <Link href={course.certificate} target="_blank" className="relative flex aspect-[1.414/1] w-full max-w-sm flex-col items-center justify-center rounded-xl border border-amber-200/40 bg-[#f8f2df] p-8 text-center text-zinc-900 shadow-2xl transition group-hover:rotate-1 group-hover:scale-[1.02]">
                      <span className="text-3xl">✦</span>
                      <span className="mt-3 font-serif text-xl font-bold">{t("Certificado", lang)}</span>
                      <span className="mt-2 text-xs uppercase tracking-[0.2em]">UTN</span>
                      <span className="mt-5 text-xs font-semibold text-clay">{t("Abrir documento ↗", lang)}</span>
                    </Link>
                  ) : (
                    <div className="relative flex aspect-[1.414/1] w-full max-w-sm flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface p-8 text-center">
                      <span className="text-4xl" aria-hidden>⌁</span>
                      <p className="mt-4 font-semibold">{t("Certificado próximamente", lang)}</p>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{t("El documento verificado estará disponible acá.", lang)}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="studying-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="studying-title" className="font-display text-3xl font-extrabold tracking-tight">{t("Aprendiendo ahora", lang)}</h2>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {studying.map((course, index) => (
              <article key={course.id} className="relative overflow-hidden card p-7 transition hover:-translate-y-1 hover:border-ink/25">
                <span className="absolute right-5 top-3 font-mono text-6xl font-bold text-ink/[0.04]">0{index + 1}</span>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-clay"><span className="h-2 w-2 rounded-full bg-clay" />{t(course.date, lang)}</span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold">{t(course.title, lang)}</h3>
                  <p className="mt-3 leading-7 text-muted">{t(course.description, lang)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.topics.map((topic) => <span key={topic} className="rounded-full bg-ball/15 px-3 py-1 text-xs font-semibold text-accent">{t(topic, lang)}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {upcoming && upcoming.length > 0 && (
        <section className="mt-20" aria-labelledby="upcoming-title">
          <div className="mb-7 flex items-center gap-4">
            <h2 id="upcoming-title" className="font-display text-3xl font-extrabold tracking-tight">{t("Lo que sigue", lang)}</h2>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {upcoming.map((course, index) => (
              <article key={course.id} className="relative overflow-hidden card p-7 transition hover:-translate-y-1 hover:border-ink/25">
                <span className="absolute right-5 top-3 font-mono text-6xl font-bold text-ink/[0.04]">0{index + 1}</span>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-clay"><span className="h-2 w-2 rounded-full bg-clay" />{t(course.date, lang)}</span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold">{t(course.title, lang)}</h3>
                  <p className="mt-3 leading-7 text-muted">{t(course.description, lang)}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.topics.map((topic) => <span key={topic} className="rounded-full bg-ball/15 px-3 py-1 text-xs font-semibold text-accent">{t(topic, lang)}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

        
      </div>
    </main>
  );
}
