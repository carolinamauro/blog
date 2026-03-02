import Link from "next/link";
import { getAllPostsMeta } from "../../../lib/posts";

export default function BlogIndex() {
  const posts = getAllPostsMeta();
  
  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Blog</h1>

      <ul className="mt-6 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link className="text-lg underline" href={`/blog/${p.slug}`}>
              {p.title}
            </Link>
            <div className="text-sm opacity-70">{p.date}</div>
            {p.summary ? <p className="opacity-80">{p.summary}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
}