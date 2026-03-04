import Link from "next/link";
import { getAllPostsMeta } from "../../../lib/posts";

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Mis notas en el camino a aprender conceptos nuevos. Hoy estoy haciendo una nueva ruta de Learn to Cloud, 
          así que probablemente la mayoría de los posts van a estar relacionados con la nube, 
          pero también voy a escribir sobre otras cosas que me parezcan interesantes.
        </p>
      </div>

      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {p.title}
                </h2>

                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {p.date}
                </span>
              </div>

              {p.summary && (
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  {p.summary}
                </p>
              )}

              <div className="mt-4 text-sm font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100 dark:text-indigo-400">
                Leer post →
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}