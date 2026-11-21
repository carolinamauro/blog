import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Side-by-side comparison card for MDX. Columns sit next to each other from
 * `md` up and stack on small screens. Subgrid keeps every header the same
 * height, so the bodies line up even when one title wraps.
 *
 * For row-by-row comparisons, fill each column with `ComparisonItem`s and set
 * `rows` to the number of items per column: item N then has the same height in
 * every column. Without items, a column body is a single block (`rows` stays 1).
 */
export function Comparison({
  children,
  rows = 1,
}: {
  children: ReactNode;
  rows?: number;
}) {
  return (
    <div
      style={{ "--rows": rows, "--span": rows + 1 } as CSSProperties}
      className="mdx-comparison my-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface md:auto-cols-[minmax(0,1fr)] md:grid-flow-col md:grid-cols-none md:grid-rows-[auto_repeat(var(--rows),auto)]"
    >
      {children}
    </div>
  );
}

export function ComparisonColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const hasItems = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === ComparisonItem,
  );

  return (
    <section
      aria-label={title}
      className="[grid-row:span_var(--span)] grid min-w-0 grid-rows-subgrid border-line not-first:border-t md:not-first:border-t-0 md:not-first:border-l"
    >
      <p className="not-prose m-0 border-b border-line bg-surface-2 px-5 py-4 text-base font-semibold text-ink sm:px-6">
        {title}
      </p>
      {hasItems ? (
        children
      ) : (
        /* Long unbroken tokens (full IPv6 addresses, URLs) wrap instead of clipping. */
        <div className="min-w-0 px-5 py-5 [overflow-wrap:anywhere] sm:px-6 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </div>
      )}
    </section>
  );
}

/** One row of a column; must be a direct child of `ComparisonColumn`. */
export function ComparisonItem({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 border-t border-line px-5 py-4 [overflow-wrap:anywhere] first-of-type:border-t-0 sm:px-6 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
      {children}
    </div>
  );
}
