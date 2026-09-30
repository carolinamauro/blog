"use client";

import { useId, useState, type ReactNode } from "react";

/** Optional wrapper for a collection of independently expandable details. */
export function Accordion({ children }: { children: ReactNode }) {
  return <div className="mdx-accordion my-6 space-y-3">{children}</div>;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  headingLevel = 3,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const Heading = `h${headingLevel}` as const;

  return (
    <div className="mdx-accordion-item my-3 overflow-hidden rounded-xl border border-white/10 bg-black/30" data-open={open}>
      <Heading className="mdx-accordion-heading">
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold text-white transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-400 motion-reduce:transition-none"
        >
          <span className="min-w-0 break-words">{title}</span>
          <svg
            aria-hidden="true"
            className="mdx-accordion-chevron h-5 w-5 shrink-0 text-cyan-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        inert={!open}
        className="mdx-accordion-panel"
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-5 border-t border-white/10 py-4 text-zinc-300 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
