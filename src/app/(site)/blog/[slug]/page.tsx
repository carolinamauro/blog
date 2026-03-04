import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/src/components/ui/footer";

export function generateStaticParams() {
  return getPostSlugs().map((slug: string) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const tags = post.meta.tags ?? [];

  return (
    <div className="relative overflow-hidden bg-zinc-50 dark:bg-black pt-5">

      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-pink-500/15 blur-3xl" />

      <article className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
        >
          <span aria-hidden>←</span> Volver al blog
        </Link>

        <header className="mt-6 rounded-2xl border border-black/5 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
              Nota de aprendizaje ✍️
            </span>

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/15 dark:bg-black/20 dark:text-zinc-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              {post.meta.title}
            </span>
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span aria-hidden>📅</span>
            <time dateTime={post.meta.date}>{post.meta.date}</time>
          </div>

          {post.meta.summary ? (
            <p className="mt-4 text-base text-zinc-700 dark:text-zinc-200">
              {post.meta.summary}
            </p>
          ) : null}
        </header>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/15" />

        <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:rounded-xl prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10">
          <MDXRemote source={post.content} />
        </div>

        <Footer />
      </article>
    </div>
  );
}