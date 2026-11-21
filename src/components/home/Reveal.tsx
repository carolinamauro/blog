"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Fades + lifts its children in the first time they scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="eyebrow">
        <span className="tennis-ball h-3 w-3" aria-hidden /> {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl">
        {title} {accent && <span className="mark">{accent}</span>}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{intro}</p>}
    </Reveal>
  );
}
