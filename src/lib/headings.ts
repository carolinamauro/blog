export type TocHeading = {
  id: string;
  text: string;
  /** Original heading level (1-3). */
  level: number;
};

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const TOC_TAGS = new Set(["h1", "h2", "h3"]);

export function slugify(text: string) {
  return (
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "seccion"
  );
}

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

/**
 * Rehype plugin: gives every h1-h3 a stable, unique `id` and pushes it into
 * `out`, so the page can render a table of contents before the MDX body.
 * Headings inside code fences are not hast headings, so they are ignored.
 */
export function rehypeCollectHeadings(out: TocHeading[]) {
  return () => (tree: HastNode) => {
    const used = new Map<string, number>();

    const walk = (node: HastNode) => {
      if (node.type === "element" && node.tagName && TOC_TAGS.has(node.tagName)) {
        const text = textOf(node).trim();
        if (text) {
          const base = slugify(text);
          const n = used.get(base) ?? 0;
          used.set(base, n + 1);
          const id = n === 0 ? base : `${base}-${n}`;
          node.properties = { ...node.properties, id };
          out.push({ id, text, level: Number(node.tagName[1]) });
        }
        return;
      }
      node.children?.forEach(walk);
    };

    walk(tree);
  };
}
