// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src", "content");

export type PostMeta = {
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
};

export function getPostSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  console.log(`Reading post from ${fullPath}`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(file);

  return {
    slug,
    content,
    meta: data as PostMeta,
  };
}

export function getAllPostsMeta() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .map(({ slug, meta }) => ({ slug, ...meta }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}