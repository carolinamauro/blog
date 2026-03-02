import Link from "next/link";

export default function Footer() {

    return (
        <footer className="mt-10 rounded-2xl border border-black/5 bg-white/60 p-5 text-sm text-zinc-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Si encontraste un error: no es bug, es{" "}
              <span className="font-semibold">que soy una salame</span>
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              Ver más posts →
            </Link>
          </div>
        </footer>
    )
}