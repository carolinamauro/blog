import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Terminaste de leer el post.
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Tengo mucho más para contar — pasate por el blog.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/20"
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
