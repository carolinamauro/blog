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
  category?: string;
};

export function getPostSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
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

const normalizeTag = (tag: string) => tag.trim().toLowerCase();

const cleanTags = (tags?: string[]) =>
  (tags ?? []).filter((t) => t.trim().length > 0);

export type RelatedPost = ReturnType<typeof getAllPostsMeta>[number];

/**
 * Posts that share tags (weighted x2) or the category (x1) with `slug`.
 * When nothing overlaps, falls back to the most recent other posts so the
 * sidebar is never empty — `isFallback` lets the UI label that honestly.
 */
export function getRelatedPosts(slug: string, limit = 3) {
  const all = getAllPostsMeta();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return { posts: others.slice(0, limit), isFallback: true };

  const currentTags = new Set(cleanTags(current.tags).map(normalizeTag));
  const scored = others
    .map((post) => {
      const shared = cleanTags(post.tags).filter((t) =>
        currentTags.has(normalizeTag(t)),
      ).length;
      const sameCategory =
        post.category && post.category === current.category ? 1 : 0;
      return { post, score: shared * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1));

  if (scored.length === 0) {
    return { posts: others.slice(0, limit), isFallback: true };
  }
  return { posts: scored.slice(0, limit).map((s) => s.post), isFallback: false };
}

/** Categories and most-used tags across every post, for the topics widget. */
export function getTopics(tagLimit = 10) {
  const posts = getAllPostsMeta();

  const categories = new Map<string, number>();
  const tags = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    const category = post.category ?? "General";
    categories.set(category, (categories.get(category) ?? 0) + 1);

    // A post may repeat a tag in different casing; count it once.
    const seen = new Set<string>();
    for (const tag of cleanTags(post.tags)) {
      const key = normalizeTag(tag);
      if (seen.has(key)) continue;
      seen.add(key);
      const entry = tags.get(key) ?? { label: tag.trim(), count: 0 };
      entry.count += 1;
      tags.set(key, entry);
    }
  }

  return {
    categories: [...categories]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    tags: [...tags.values()]
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, tagLimit),
  };
}
