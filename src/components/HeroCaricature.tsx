"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { t, type Lang } from "@/src/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Caricature (fixed image)                                           */
/* ------------------------------------------------------------------ */

const CARICATURE_SRC = "/images/caricatura.png";

function Caricature() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={CARICATURE_SRC}
        alt="Caricatura de Carolina Mauro"
        fill
        priority
        sizes="(max-width: 1024px) 80vw, 40vw"
        className="select-none object-contain drop-shadow-2xl"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating element config                                            */
/* ------------------------------------------------------------------ */

function GlassChip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function CodeGlyph({ text }: { text: string }) {
  return (
    <GlassChip>
      <span className="font-mono text-base font-semibold tracking-tight text-cyan-300">{text}</span>
    </GlassChip>
  );
}

function TechPill({ label, dot }: { label: string; dot: string }) {
  return (
    <GlassChip className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <span className="text-xs font-semibold text-zinc-200">{label}</span>
    </GlassChip>
  );
}

function BrowserMock() {
  return (
    <GlassChip className="w-32">
      <div className="mb-2 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-pink-400/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-3/4 rounded-full bg-cyan-400/40" />
        <div className="h-1.5 w-full rounded-full bg-white/15" />
        <div className="h-1.5 w-2/3 rounded-full bg-violet-400/40" />
      </div>
    </GlassChip>
  );
}

function MiniCard() {
  return (
    <GlassChip className="w-28">
      <div className="mb-2 h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400/70 to-pink-400/70" />
      <div className="space-y-1">
        <div className="h-1.5 w-full rounded-full bg-white/15" />
        <div className="h-1.5 w-1/2 rounded-full bg-violet-400/40" />
      </div>
    </GlassChip>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.7 5.2 2.8 7.3 8 8-5.2.7-7.3 2.8-8 8-.7-5.2-2.8-7.3-8-8 5.2-.7 7.3-2.8 8-8Z" />
    </svg>
  );
}

type FloatItem = {
  id: string;
  node: ReactNode;
  position: string;
  float: { y?: number; rotate?: number };
  duration: number;
  delay: number;
  depth: number; // how much it reacts to the mouse (px)
  hideSm?: boolean;
};

const floatItems: FloatItem[] = [
  { id: "code-arrow", node: <CodeGlyph text="</>" />, position: "left-0 top-6", float: { y: -14, rotate: -4 }, duration: 6, delay: 0.2, depth: 18 },
  { id: "code-braces", node: <CodeGlyph text="{ }" />, position: "left-4 bottom-24", float: { y: 12, rotate: 3 }, duration: 7, delay: 0.5, depth: 12, hideSm: true },
  { id: "code-component", node: <CodeGlyph text="<Component />" />, position: "right-0 top-1/3", float: { y: -10, rotate: 2 }, duration: 8, delay: 0.8, depth: 22 },
  { id: "browser", node: <BrowserMock />, position: "right-2 top-2", float: { y: -16 }, duration: 9, delay: 0.4, depth: 26, hideSm: true },
  { id: "card", node: <MiniCard />, position: "left-2 bottom-2", float: { y: 14, rotate: -3 }, duration: 7.5, delay: 1, depth: 16, hideSm: true },
  { id: "pill-ts", node: <TechPill label="TypeScript" dot="#6aa5e0" />, position: "right-6 bottom-16", float: { y: 10 }, duration: 6.5, delay: 0.6, depth: 14 },
  { id: "pill-react", node: <TechPill label="React" dot="#8fd0e6" />, position: "right-10 bottom-2", float: { y: -12, rotate: 2 }, duration: 8.5, delay: 1.2, depth: 20, hideSm: true },
  { id: "sparkle-1", node: <Sparkle className="h-5 w-5 text-cyan-300" />, position: "right-1/4 top-4", float: { y: -10, rotate: 20 }, duration: 5, delay: 0.3, depth: 30 },
  { id: "sparkle-2", node: <Sparkle className="h-4 w-4 text-violet-300" />, position: "left-1/4 bottom-10", float: { y: 10, rotate: -18 }, duration: 5.5, delay: 0.9, depth: 28 },
  { id: "dot-1", node: <span className="block h-3 w-3 rounded-full bg-pink-400" />, position: "left-10 top-1/2", float: { y: -8 }, duration: 4.5, delay: 0.4, depth: 34 },
  { id: "dot-2", node: <span className="block h-2 w-2 rounded-full bg-cyan-300" />, position: "right-1/3 bottom-8", float: { y: 8 }, duration: 4, delay: 0.7, depth: 24 },
];

/* ------------------------------------------------------------------ */
/*  Floating element — entrance only (no infinite loop / no parallax).  */
/*  Continuously-animating + transform layers are what make the home    */
/*  page checkerboard to black on fast scroll, so we keep them static.  */
/* ------------------------------------------------------------------ */

function FloatingEl({ item, reduce }: { item: FloatItem; reduce: boolean | null }) {
  return (
    <motion.div
      className={`absolute ${item.position} ${item.hideSm ? "hidden sm:block" : ""}`}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: item.delay }}
    >
      {item.node}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HeroCaricature({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Soft glow blobs — static radial-gradients (no filter, no animation,
          no fixed layer) so the home page doesn't checkerboard on fast scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(6,182,212,0.16), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.16), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.13), transparent 70%)" }}
      />

      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* ---------- Left: text content ---------- */}
        <motion.div
          className="order-2 text-center lg:order-1 lg:text-left"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {[
            <p key="greeting" className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              {t("Hola, soy", lang)}
            </p>,
            <h1 key="name" className="mt-3 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-shimmer">Carolina Mauro</span>
            </h1>,
            <h2 key="headline" className="mt-4 text-xl font-semibold text-zinc-200 sm:text-2xl">
              {t("Ingeniera en Informática", lang)}
            </h2>,
            <p key="desc" className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-400 lg:mx-0">
              {t("Apasionada por aprender.", lang)}
            </p>,
            <div key="cta" className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                {t("Ver blog", lang)}
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-bold text-zinc-100 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-pink-300/50 hover:text-pink-100"
              >
                {t("Contactame", lang)}
              </a>
            </div>,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- Right: caricature + floating elements ---------- */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2">
          <div className="relative aspect-[4/5] w-full">
            {/* Glow behind the image — radial-gradient (no filter:blur) */}
            <div
              className="absolute inset-0 -z-10 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.28), transparent 72%)" }}
            />

            {/* Caricature: entrance only */}
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Caricature />
            </motion.div>

            {/* Floating tech elements */}
            {floatItems.map((item) => (
              <FloatingEl key={item.id} item={item} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
