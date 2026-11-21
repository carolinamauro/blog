"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/src/lib/i18n";
import { OPEN_GAME_EVENT } from "../extras/TennisGame";

const ROLES = [
  "Software Engineer @ Innovid",
  "Ingeniera en Informática",
  "Ayudante de cátedra en FIUBA",
  "No sé lo que es estar quieta",
];

function useBuenosAiresTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function RotatingRole({ lang }: { lang: Lang }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mark whitespace-nowrap"
        >
          {t(ROLES[i], lang)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const stickers = [
  { label: "🎾 Tenis", pos: "left-[-6%] top-[12%]", rot: -8, delay: 0.5 },
  { label: "☁️ AWS", pos: "right-[-4%] top-[6%]", rot: 6, delay: 0.65 },
  { label: "🤖 IA", pos: "right-[-8%] top-[52%]", rot: -4, delay: 0.8 },
  { label: "🏃‍♀️ Hyrox", pos: "left-[-10%] bottom-[18%]", rot: 5, delay: 0.95 },
  { label: "👩‍🏫 FIUBA", pos: "right-[6%] bottom-[2%]", rot: -6, delay: 1.1 },
];

export default function Hero({ lang }: { lang: Lang }) {
  const time = useBuenosAiresTime();
  const reduce = useReducedMotion();
  const [serving, setServing] = useState(false);
  const taps = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const serve = () => {
    if (reduce) {
      document.getElementById("about")?.scrollIntoView();
      return;
    }
    setServing(true);
  };

  const tapBall = () => {
    taps.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => (taps.current = 0), 1500);
    if (taps.current >= 5) {
      taps.current = 0;
      window.dispatchEvent(new Event(OPEN_GAME_EVENT));
    }
  };

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* Court markings in the background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-10 top-24 -z-10 rounded-[2rem] border-2 border-line sm:inset-x-10">
        <div className="absolute inset-x-[12%] inset-y-0 border-x-2 border-line" />
        <div className="absolute inset-x-[12%] top-1/2 h-0.5 bg-line" />
        <div className="absolute left-1/2 top-[22%] h-[56%] w-0.5 bg-line" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full opacity-60 dark:opacity-25"
        style={{ background: "radial-gradient(closest-side, var(--ball), transparent 72%)" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 sm:px-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div {...fade(0)} className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-court" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-court" />
              </span>
              {t("Disponible para charlar", lang)}
            </span>
            <span className="chip font-mono">
              📍 Buenos Aires, AR {time && <>· {time}</>}
            </span>
          </motion.div>

          <motion.p {...fade(0.1)} className="mt-8 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-muted">
            {t("Hola, soy", lang)}
          </motion.p>

          <motion.h1
            {...fade(0.18)}
            className="font-display text-[clamp(5.5rem,20vw,12.5rem)] font-extrabold leading-[0.82] tracking-[-0.06em] text-ink"
          >
            Caro
            <button
              type="button"
              onClick={tapBall}
              aria-label={t("Pelotita (¿qué pasa si la tocás 5 veces?)", lang)}
              className="tennis-ball animate-bob ml-1 inline-block h-[0.22em] w-[0.22em] align-baseline transition-transform hover:scale-125 active:scale-90"
            />
          </motion.h1>

          <motion.p {...fade(0.3)} className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
            <RotatingRole lang={lang} />
          </motion.p>

          <motion.p {...fade(0.38)} className="mt-5 max-w-lg text-lg leading-8 text-muted">
            {t("Resuelvo problemas con pensamiento lateral, enseño en la facu y ahora me estoy metiendo de lleno en IA y cloud. Fuera de la compu: tenis, pádel, Hyrox y cualquier plan al aire libre.", lang)}
          </motion.p>

          <motion.div {...fade(0.46)} className="relative mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={serve}
              className="group relative inline-flex items-center gap-2 rounded-full bg-ball px-7 py-3.5 text-sm font-bold text-ball-ink shadow-[0_10px_30px_-10px_var(--ball)] transition hover:-translate-y-0.5"
            >
              {t("Sacar", lang)} 🎾
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border-2 border-ink px-7 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-bg"
            >
              {t("Contactame", lang)}
            </a>

            {serving && (
              <motion.span
                aria-hidden
                className="tennis-ball pointer-events-none absolute left-10 top-2 z-50 h-6 w-6"
                initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={{ x: [0, 260, 620], y: [0, -260, 40], scale: [1, 1.6, 0.6], rotate: 720 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  setServing(false);
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Portrait in a ball-coloured "court" */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[26rem]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-full bg-ball">
            <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white/70" />
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-white/40" />
            <div className="absolute inset-[14%] rounded-full border-4 border-white/60" />
          </div>
          <div className="absolute inset-[4%]">
            <Image
              src="/images/caricatura.png"
              alt={t("Caricatura de Caro Mauro", lang)}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 26rem"
              className="select-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
            />
          </div>
          {stickers.map((s) => (
            <motion.span
              key={s.label}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: s.delay }}
              whileHover={{ scale: 1.12, rotate: 0 }}
              drag
              dragSnapToOrigin
              style={{ rotate: s.rot }}
              className={`absolute ${s.pos} hidden cursor-grab select-none rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-bold text-ink shadow-card active:cursor-grabbing sm:block`}
            >
              {t(s.label, lang)}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        className="mx-auto mb-6 flex w-fit flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint transition hover:text-ink"
      >
        {t("Scroll", lang)}
        <span className="flex h-9 w-5 justify-center rounded-full border-2 border-current pt-1.5">
          <span className="animate-bob h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
