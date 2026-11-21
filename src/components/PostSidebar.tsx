import Link from "next/link";
import type { RelatedPost } from "@/src/lib/posts";

type Topics = {
  categories: { name: string; count: number }[];
  tags: { label: string; count: number }[];
};

const widget = "card rounded-3xl p-5";
const widgetTitle = "mb-4 text-xs font-semibold uppercase tracking-wider text-muted";
const chip =
 "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted transition hover:border-ink/25 hover:bg-ball/15 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function PostSidebar({
  related,
  isFallback,
  topics,
}: {
  related: RelatedPost[];
  isFallback: boolean;
  topics: Topics;
}) {
  return (
    <>
      {related.length > 0 && (
        <section className={widget} aria-labelledby="related-posts-title">
          <h2 id="related-posts-title" className={widgetTitle}>
            {isFallback ? "Más recientes" : "Posts relacionados"}
          </h2>
          <ul className="space-y-4">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="text-xs text-muted">
                    {p.category ?? "General"} · {p.date}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-5 text-ink transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={widget} aria-labelledby="topics-title">
        <h2 id="topics-title" className={widgetTitle}>
          Áreas de interés
        </h2>
        <ul className="flex flex-wrap gap-2">
          {topics.categories.map((c) => (
            <li key={c.name}>
              <Link href={`/blog?category=${encodeURIComponent(c.name)}`} className={chip}>
                {c.name}
                <span className="text-faint">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>

        {topics.tags.length > 0 && (
          <>
            <h3 className="mb-3 mt-5 text-xs font-semibold uppercase tracking-wider text-muted">
              Temas populares
            </h3>
            <ul className="flex flex-wrap gap-2">
              {topics.tags.map((t) => (
                <li key={t.label}>
                  <Link href={`/blog?tag=${encodeURIComponent(t.label)}`} className={chip}>
                    #{t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
