// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "../../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getPostSlugs().map((slug: string) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Unwrap the params Promise
  let post;

  try {
    post = getPostBySlug(slug); // Fetch the post data
  } catch {
    notFound(); // Handle 404 if the post is not found
  }

  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-10">
      <h1>{post.meta.title}</h1>
      <p className="text-sm opacity-70">{post.meta.date}</p>

      <MDXRemote source={post.content} />
    </article>
  );
}