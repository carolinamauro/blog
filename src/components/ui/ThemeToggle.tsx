"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // storage blocked — theme still applies for this visit
  }
  listeners.forEach((l) => l());
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}

/** A tiny tennis court: the ball rallies to the other side of the net. */
export default function ThemeToggle({ label }: { label: string }) {
  const theme = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative h-8 w-16 shrink-0 overflow-hidden rounded-md border-2 border-white/90 bg-court shadow-inner transition hover:scale-105"
    >
      {/* net + service line */}
      <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90" />
      <span aria-hidden className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-white/50" />
      <span aria-hidden className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] leading-none">☀️</span>
      <span aria-hidden className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] leading-none">🌙</span>
      <span
        aria-hidden
        className={`tennis-ball absolute top-1/2 h-5 w-5 -translate-y-1/2 transition-[left,transform] duration-500 [transition-timing-function:cubic-bezier(.5,1.8,.4,.8)] ${
          dark ? "left-[2.15rem] rotate-[200deg]" : "left-1 rotate-0"
        }`}
      />
    </button>
  );
}
