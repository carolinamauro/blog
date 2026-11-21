import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  getTopics,
} from "../../../../lib/posts";
import { compileMDX } from "next-mdx-remote/rsc";
import { rehypeCollectHeadings, type TocHeading } from "@/src/lib/headings";
import TableOfContents from "@/src/components/TableOfContents";
import PostSidebar from "@/src/components/PostSidebar";
import Footer from "@/src/components/ui/footer";
import OllamaPlayground from "@/src/components/OllamaPlayground";
import { Accordion, AccordionItem } from "@/src/components/Accordion";
import {
  Comparison,
  ComparisonColumn,
  ComparisonItem,
} from "@/src/components/Comparison";
import { Highlight } from "@/src/components/Highlight";
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

  const tags = (post.meta.tags ?? []).filter((t) => t.trim().length > 0);
  const category = post.meta.category ?? "General";

  // Compile up front so the heading collector has run before the ToC renders.
  const headings: TocHeading[] = [];
  const { content } = await compileMDX({
    source: post.content,
    components: {
      OllamaPlayground,
      Accordion,
      AccordionItem,
      Comparison,
      ComparisonColumn,
      ComparisonItem,
      Highlight,
      img: (props) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...props}
          alt={props.alt ?? ""}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto w-full max-w-full rounded-2xl border border-line"
        />
      ),
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeCollectHeadings(headings)],
      },
    },
  });

  const related = getRelatedPosts(slug);
  const topics = getTopics();

  return (
    <div className="relative min-h-screen overflow-x-clip pt-24">

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-2 py-1.5 pl-1.5 pr-4 text-sm font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-ball/15 hover:text-accent focus-visible:-translate-y-0.5 focus-visible:border-ink/25 focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 transition-colors duration-200 group-hover:bg-ball/15 group-focus-visible:bg-ball/15">
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </span>
          Volver al blog
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
        <article className="min-w-0">

        {/* Header card */}
        <header className="card relative overflow-hidden p-6 sm:p-10">
          <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-ball/25" />
          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-ball/15 px-3 py-1 text-xs font-semibold text-accent">
              {category}
            </span>
            {tags.length > 0 &&
              tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
                >
                  #{t}
                </span>
              ))}
          </div>

          {/* Title */}
          <h1 className="relative mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
            {post.meta.title}
          </h1>

          {/* Date */}
          <div className="mt-3 flex items-center gap-2 text-sm text-muted">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.meta.date}>{post.meta.date}</time>
          </div>

          {/* Summary */}
          {post.meta.summary && (
            <p className="mt-4 text-base leading-7 text-ink">
              {post.meta.summary}
            </p>
          )}
        </header>

        <TableOfContents headings={headings} variant="mobile" />

        {/* MDX content on a solid reading surface */}
        <div className="card mt-6 rounded-3xl px-5 py-8 sm:px-12 sm:py-14">
          <div className="prose prose-court max-w-none font-sans text-[1.0625rem] [&>:first-child]:mt-0 prose-headings:font-extrabold prose-headings:tracking-tight prose-h1:mt-14 prose-h1:border-b prose-h1:border-line prose-h1:pb-3 prose-h1:text-3xl prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-9 prose-h3:text-xl prose-p:leading-8 prose-li:my-1.5 prose-li:leading-8 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-line prose-pre:text-sm">
            {content}
          </div>
        </div>

        </article>

        <aside aria-label="Contenido relacionado" className="space-y-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1">
          <TableOfContents headings={headings} variant="desktop" />
          <PostSidebar related={related.posts} isFallback={related.isFallback} topics={topics} />
        </aside>
        </div>

        <Footer />
      </div>
    </div>
  );
}
