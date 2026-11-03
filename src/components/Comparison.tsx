import type { ReactNode } from "react";

/**
 * Side-by-side comparison card for MDX. Columns sit next to each other from
 * `md` up and stack on small screens. Subgrid keeps every header the same
 * height, so the bodies line up even when one title wraps.
 */
export function Comparison({ children }: { children: ReactNode }) {
  return (
    <div className="mdx-comparison my-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-cyan-400/30 bg-black/30 md:auto-cols-[minmax(0,1fr)] md:grid-flow-col md:grid-cols-none md:grid-rows-[auto_1fr]">
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
  return (
    <section
      aria-label={title}
      className="row-span-2 grid min-w-0 grid-rows-subgrid border-white/10 not-first:border-t md:not-first:border-t-0 md:not-first:border-l"
    >
      <p className="not-prose m-0 border-b border-cyan-400/30 bg-white/[0.06] px-5 py-4 text-base font-semibold text-white sm:px-6">
        {title}
      </p>
      {/* Long unbroken tokens (full IPv6 addresses, URLs) wrap instead of clipping. */}
      <div className="min-w-0 px-5 py-5 [overflow-wrap:anywhere] sm:px-6 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </section>
  );
}
