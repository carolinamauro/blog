"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { t, langFromPathname } from "@/src/lib/i18n";

export const OPEN_GAME_EVENT = "caro:open-game";

const W = 360;
const H = 560;
const PAD_W = 72;
const PAD_H = 10;
const R = 7;
const GAMES_TO_WIN = 3;
const POINT_NAMES = ["0", "15", "30", "40"];

type Score = { you: number; cpu: number; gYou: number; gCpu: number };

function pointLabel(a: number, b: number, lang: "es" | "en") {
  if (a >= 3 && b >= 3) {
    if (a === b) return [t("Iguales", lang), ""] as const;
    return a > b ? (["AD", ""] as const) : (["", "AD"] as const);
  }
  return [POINT_NAMES[a] ?? "40", POINT_NAMES[b] ?? "40"] as const;
}

export default function TennisGame() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lang = langFromPathname(pathname);

  // Konami code + custom event
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === seq[pos] ? pos + 1 : k === seq[0] ? 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_GAME_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_GAME_EVENT, onOpen);
    };
  }, []);

  if (!open) return null;
  return <GameModal lang={lang} onClose={() => setOpen(false)} />;
}

function GameModal({ lang, onClose }: { lang: "es" | "en"; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<Score>({ you: 0, cpu: 0, gYou: 0, gCpu: 0 });
  const [message, setMessage] = useState<string>(t("Tocá o apretá espacio para sacar", lang));
  const [winner, setWinner] = useState<"you" | "cpu" | null>(null);

  const state = useRef({
    px: W / 2,
    cx: W / 2,
    bx: W / 2,
    by: H - 40,
    vx: 0,
    vy: 0,
    serving: true,
    keys: { left: false, right: false },
    score: { you: 0, cpu: 0, gYou: 0, gCpu: 0 } as Score,
    over: false,
  });

  const serve = useCallback(() => {
    const s = state.current;
    if (s.over) {
      s.score = { you: 0, cpu: 0, gYou: 0, gCpu: 0 };
      s.over = false;
      setScore({ ...s.score });
      setWinner(null);
    }
    if (!s.serving) return;
    s.serving = false;
    s.bx = s.px;
    s.by = H - 40;
    s.vx = (Math.random() - 0.5) * 4;
    s.vy = -5.2;
    setMessage("");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const css = getComputedStyle(document.documentElement);
    const col = (n: string) => css.getPropertyValue(n).trim();
    const court = col("--court") || "#1f7a4d";
    const ball = col("--ball") || "#d4f53c";
    const clay = col("--clay") || "#d9572a";

    const s = state.current;
    let frame = 0;

    const awardPoint = (who: "you" | "cpu") => {
      const sc = s.score;
      if (who === "you") sc.you++;
      else sc.cpu++;
      const a = sc.you, b = sc.cpu;
      let gameMsg = "";
      if (a >= 4 && a - b >= 2) {
        sc.gYou++;
        sc.you = sc.cpu = 0;
        gameMsg = t("¡Game, Caro! 🎾", lang);
      } else if (b >= 4 && b - a >= 2) {
        sc.gCpu++;
        sc.you = sc.cpu = 0;
        gameMsg = t("Game para la compu 🤖", lang);
      }
      if (sc.gYou >= GAMES_TO_WIN || sc.gCpu >= GAMES_TO_WIN) {
        s.over = true;
        setWinner(sc.gYou > sc.gCpu ? "you" : "cpu");
        setMessage(t("Tocá para la revancha", lang));
      } else {
        setMessage(
          `${gameMsg || (who === "you" ? t("¡Punto tuyo!", lang) : t("Punto de la compu", lang))} · ${t("Tocá para sacar", lang)}`,
        );
      }
      setScore({ ...sc });
      s.serving = true;
      s.vx = s.vy = 0;
    };

    const draw = () => {
      // court
      ctx.fillStyle = court;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 10, W - 32, H - 20);
      ctx.beginPath();
      ctx.moveTo(48, 10);
      ctx.lineTo(48, H - 10);
      ctx.moveTo(W - 48, 10);
      ctx.lineTo(W - 48, H - 10);
      ctx.moveTo(48, H * 0.28);
      ctx.lineTo(W - 48, H * 0.28);
      ctx.moveTo(48, H * 0.72);
      ctx.lineTo(W - 48, H * 0.72);
      ctx.moveTo(W / 2, H * 0.28);
      ctx.lineTo(W / 2, H * 0.72);
      ctx.stroke();
      // net
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fillRect(6, H / 2 - 2, W - 12, 4);
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      for (let x = 8; x < W - 8; x += 6) ctx.fillRect(x, H / 2 + 2, 1, 6);

      // rackets
      const racket = (x: number, y: number, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x - PAD_W / 2, y - PAD_H / 2, PAD_W, PAD_H, 6);
        ctx.fill();
      };
      racket(s.cx, 26, clay);
      racket(s.px, H - 26, "#ffffff");

      // ball shadow + ball
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(s.bx + 3, s.by + 5, R, R * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ball;
      ctx.beginPath();
      ctx.arc(s.bx, s.by, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(s.bx - R * 1.1, s.by, R * 0.9, -0.9, 0.9);
      ctx.stroke();
    };

    const step = () => {
      // player keys
      if (s.keys.left) s.px -= 7;
      if (s.keys.right) s.px += 7;
      s.px = Math.max(PAD_W / 2 + 8, Math.min(W - PAD_W / 2 - 8, s.px));

      if (s.serving) {
        s.bx = s.px;
        s.by = H - 40;
      } else {
        s.bx += s.vx;
        s.by += s.vy;
        if (s.bx < R + 8 || s.bx > W - R - 8) {
          s.vx *= -1;
          s.bx = Math.max(R + 8, Math.min(W - R - 8, s.bx));
        }
        // player hit
        if (s.vy > 0 && s.by + R >= H - 26 - PAD_H / 2 && s.by < H - 18 && Math.abs(s.bx - s.px) < PAD_W / 2 + R) {
          const off = (s.bx - s.px) / (PAD_W / 2);
          const speed = Math.min(Math.hypot(s.vx, s.vy) * 1.05, 11);
          s.vx = off * speed * 0.75;
          s.vy = -Math.sqrt(Math.max(speed * speed - s.vx * s.vx, 9));
        }
        // cpu hit
        if (s.vy < 0 && s.by - R <= 26 + PAD_H / 2 && s.by > 18 && Math.abs(s.bx - s.cx) < PAD_W / 2 + R) {
          const off = (s.bx - s.cx) / (PAD_W / 2);
          const speed = Math.min(Math.hypot(s.vx, s.vy) * 1.04, 11);
          s.vx = off * speed * 0.7 + (Math.random() - 0.5) * 1.5;
          s.vy = Math.sqrt(Math.max(speed * speed - s.vx * s.vx, 9));
        }
        if (s.by > H + R) awardPoint("cpu");
        else if (s.by < -R) awardPoint("you");
      }

      // cpu: track the ball when it is coming, drift to centre otherwise
      const target = s.vy < 0 ? s.bx : W / 2;
      const cpuSpeed = 3.6 + (s.score.gYou - s.score.gCpu) * 0.4;
      s.cx += Math.max(-cpuSpeed, Math.min(cpuSpeed, target - s.cx));
      s.cx = Math.max(PAD_W / 2 + 8, Math.min(W - PAD_W / 2 - 8, s.cx));

      draw();
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") s.keys.left = true;
      if (e.key === "ArrowRight") s.keys.right = true;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        serve();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") s.keys.left = false;
      if (e.key === "ArrowRight") s.keys.right = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.body.style.overflow = prevOverflow;
    };
  }, [lang, onClose, serve]);

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    state.current.px = ((e.clientX - rect.left) / rect.width) * W;
  };

  const [pYou, pCpu] = pointLabel(score.you, score.cpu, lang);

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t("Mini juego de tenis", lang)}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-fade-in-up flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
        {/* Scoreboard */}
        <div className="flex items-stretch justify-between gap-2 bg-[#0e1a12] px-4 py-3 font-mono text-sm text-white">
          <table className="w-full border-separate border-spacing-y-1">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">🤖 CPU</td>
                <td className="w-10 rounded bg-white/10 text-center">{score.gCpu}</td>
                <td className="w-12 rounded bg-[#d4f53c] text-center font-bold text-black">{pCpu || "·"}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">🎾 {t("Vos", lang)}</td>
                <td className="w-10 rounded bg-white/10 text-center">{score.gYou}</td>
                <td className="w-12 rounded bg-[#d4f53c] text-center font-bold text-black">{pYou || "·"}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 self-start rounded-full px-2 text-lg leading-none text-white/70 hover:text-white"
            aria-label={t("Cerrar", lang)}
          >
            ×
          </button>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            onPointerMove={onPointer}
            onPointerDown={(e) => {
              onPointer(e);
              serve();
            }}
            className="block aspect-[360/560] w-full touch-none"
            style={{ cursor: "none" }}
          />
          {(message || winner) && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 px-6 text-center">
              {winner && (
                <p className="rounded-full bg-black/70 px-4 py-2 font-display text-2xl font-extrabold text-white">
                  {winner === "you" ? t("¡Ganaste el set! 🏆", lang) : t("La compu ganó… revancha?", lang)}
                </p>
              )}
              {message && <p className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">{message}</p>}
            </div>
          )}
        </div>
        <p className="px-4 py-3 text-center text-xs text-muted">
          {t("Mové el mouse / dedo o usá ← →. Primero en ganar 3 games.", lang)}
        </p>
      </div>
    </div>
  );
}
