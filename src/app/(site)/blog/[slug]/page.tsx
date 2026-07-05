import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/src/components/ui/footer";
import remarkGfm from "remark-gfm";

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
  const category = post.meta.category ?? "General";

  return (
    <div className="relative z-10 min-h-screen overflow-hidden pt-5">

      {/* Nebula blobs */}
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "-4rem", right: "-2rem", width: "28rem", height: "28rem", background: "radial-gradient(closest-side, rgba(139,92,246,0.14), transparent 78%)" }}
      />
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ bottom: "0", left: "-4rem", width: "32rem", height: "32rem", background: "radial-gradient(closest-side, rgba(6,182,212,0.10), transparent 78%)", animationDelay: "4s" }}
      />

      <article className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al blog
        </Link>

        {/* Header card */}
        <header className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm sm:p-8">
          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              {category}
            </span>
            {tags.length > 0 &&
              tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-zinc-400"
                >
                  #{t}
                </span>
              ))}
          </div>

          {/* Title */}
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            <span className="text-shimmer">{post.meta.title}</span>
          </h1>

          {/* Date */}
          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.meta.date}>{post.meta.date}</time>
          </div>

          {/* Summary */}
          {post.meta.summary && (
            <p className="mt-4 text-base leading-7 text-zinc-300">
              {post.meta.summary}
            </p>
          )}
        </header>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* MDX content */}
        <div className="prose prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
          prose-p:text-zinc-300 prose-p:leading-8
          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-200
          prose-strong:text-white
          prose-code:text-pink-300 prose-code:bg-white/[0.06] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/60 prose-pre:overflow-x-auto
          prose-blockquote:border-l-cyan-400 prose-blockquote:text-zinc-400
          prose-hr:border-white/10
          prose-ul:text-zinc-300 prose-ol:text-zinc-300
          prose-li:marker:text-cyan-400
          prose-th:text-white prose-td:text-zinc-300
        ">
          <MDXRemote
            source={post.content}
            components={{
              img: (props) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...props}
                  alt={props.alt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-auto w-full max-w-full rounded-xl border border-white/10"
                />
              ),
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        <Footer />
      </article>
    </div>
  );
}
