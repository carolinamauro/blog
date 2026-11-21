import Link from "next/link";

export default function Footer() {
  return (
    <footer className="card mt-12 rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-extrabold text-ink">
            Game, set &amp; match 🎾
          </p>
          <p className="mt-1 text-sm text-muted">
            Terminaste el post. Tengo mucho más para contar — pasate por el blog.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ball px-6 py-3 text-sm font-bold text-ball-ink transition hover:-translate-y-0.5"
        >
          Ver más posts
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
