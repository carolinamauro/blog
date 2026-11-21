import type { ReactNode } from "react";

const tones = {
  info: "border-cyan-400/40 bg-cyan-400/[0.07]",
  important: "border-rose-400/50 bg-rose-400/[0.08]",
  warning: "border-amber-400/50 bg-amber-400/[0.08]",
} as const;

/** Boxed callout for MDX, used to call out a key idea in a post. */
export function Highlight({
  tone = "important",
  children,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <div
      className={`mdx-highlight my-8 rounded-xl border px-5 py-4 leading-8 text-zinc-100 [overflow-wrap:anywhere] sm:px-6 sm:py-5 [&>:first-child]:mt-0 [&>:last-child]:mb-0 ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
