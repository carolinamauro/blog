"use client";

import { useEffect, useRef } from "react";

/**
 * Tennis-ball cursor for mouse/trackpad users. A small dot tracks the pointer
 * exactly, the ball follows with a little lag and grows over clickable things.
 * Touch devices and reduced-motion users keep the native cursor.
 */
export default function BallCursor() {
  const ballRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const html = document.documentElement;
    html.classList.add("has-ball-cursor");

    const ball = ballRef.current!;
    const dot = dotRef.current!;
    let x = -100, y = -100, bx = -100, by = -100;
    let scale = 1, targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        bx = x;
        by = y;
        ball.style.opacity = "1";
        dot.style.opacity = "1";
      }
      const el = e.target as Element | null;
      const interactive = el?.closest("a, button, [role='button'], summary, label, select");
      const typing = el?.closest("input, textarea, [contenteditable='true']");
      targetScale = typing ? 0 : interactive ? 1.9 : 1;
    };
    const onLeave = () => {
      visible = false;
      ball.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onDown = () => (targetScale *= 0.75);
    const onUp = () => (targetScale /= 0.75);

    const tick = () => {
      bx += (x - bx) * 0.2;
      by += (y - by) * 0.2;
      scale += (targetScale - scale) * 0.2;
      const spin = (bx + by) * 0.6;
      ball.style.transform = `translate3d(${bx - 10}px, ${by - 10}px, 0) scale(${scale}) rotate(${spin}deg)`;
      dot.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove("has-ball-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ballRef}
        aria-hidden
        className="tennis-ball pointer-events-none fixed left-0 top-0 z-[100] h-5 w-5 opacity-0 mix-blend-normal transition-opacity duration-200 will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1 w-1 rounded-full bg-ink opacity-0 will-change-transform"
      />
    </>
  );
}
