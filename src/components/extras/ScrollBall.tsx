"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * A ball on a thin "baseline" at the right edge that travels down as you
 * scroll — doubles as a reading-progress indicator. Desktop only.
 */
export default function ScrollBall() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 18, mass: 0.4 });
  const top = useTransform(smooth, (v) => `calc(${v * 100}% - ${v * 18}px)`);
  const rotate = useTransform(smooth, [0, 1], [0, 1080]);

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-24 right-4 top-24 z-40 hidden w-[18px] lg:block">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
      <motion.div style={{ top, rotate }} className="tennis-ball absolute left-0 h-[18px] w-[18px]" />
    </div>
  );
}
