import type { ReactNode } from "react";

/** Big editorial header shared by the inner pages (projects, courses, blog). */
export default function PageHeader({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <header className="animate-fade-in-up relative mb-14 max-w-3xl">
      <p className="eyebrow">
        <span className="tennis-ball h-3 w-3" aria-hidden /> {eyebrow}
      </p>
      <h1 className="mt-4 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.04em] text-ink sm:text-7xl">
        {title} {accent && <span className="mark">{accent}</span>}
      </h1>
      {children && <div className="mt-6 text-lg leading-8 text-muted">{children}</div>}
    </header>
  );
}
