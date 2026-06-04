"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

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
/*  Cursor follower glow                                               */
/* ------------------------------------------------------------------ */

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
    >
      <div className="h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
    </motion.div>
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
/*  Floating element with mouse parallax                               */
/* ------------------------------------------------------------------ */

function FloatingEl({
  item,
  reduce,
  mx,
  my,
}: {
  item: FloatItem;
  reduce: boolean | null;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const px = useTransform(mx, [-0.5, 0.5], [-item.depth, item.depth]);
  const py = useTransform(my, [-0.5, 0.5], [-item.depth, item.depth]);

  return (
    <motion.div
      style={reduce ? undefined : { x: px, y: py }}
      className={`absolute ${item.position} ${item.hideSm ? "hidden sm:block" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1 }
            : {
                opacity: 1,
                scale: 1,
                y: item.float.y ? [0, item.float.y, 0] : 0,
                rotate: item.float.rotate ? [0, item.float.rotate, 0] : 0,
              }
        }
        transition={{
          opacity: { duration: 0.5, delay: item.delay },
          scale: { duration: 0.5, delay: item.delay },
          y: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {item.node}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HeroCaricature() {
  const reduce = useReducedMotion();

  /* ---- Mouse position (normalized -0.5..0.5) for parallax ---- */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 80, damping: 18, mass: 0.4 });
  const my = useSpring(rawY, { stiffness: 80, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  // Caricature parallax (gentle, opposite direction feels natural)
  const caricX = useTransform(mx, [-0.5, 0.5], [12, -12]);
  const caricY = useTransform(my, [-0.5, 0.5], [10, -10]);

  return (
    <section className="relative isolate overflow-hidden text-white">
      <CursorGlow />

      {/* Soft blurred glow blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-500/12 blur-3xl"
        animate={reduce ? undefined : { x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
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
              Hola, soy
            </p>,
            <h1 key="name" className="mt-3 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
              <span className="text-shimmer">Carolina Mauro</span>
            </h1>,
            <h2 key="headline" className="mt-4 text-xl font-semibold text-zinc-200 sm:text-2xl">
              Ingeniera en Informática &amp; Frontend Engineer
            </h2>,
            <p key="desc" className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-400 lg:mx-0">
              Apasionada por aprender.
            </p>,
            <div key="cta" className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                Ver blog
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-bold text-zinc-100 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-pink-300/50 hover:text-pink-100"
              >
                Contactame
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
            {/* Glow behind the image */}
            <div className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 to-violet-500/25 blur-2xl" />

            {/* Caricature: entrance + float + mouse parallax + scroll frames */}
            <motion.div
              className="relative h-full w-full"
              style={reduce ? undefined : { x: caricX, y: caricY }}
            >
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={reduce ? undefined : { y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Caricature />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating tech elements */}
            {floatItems.map((item) => (
              <FloatingEl key={item.id} item={item} reduce={reduce} mx={mx} my={my} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
