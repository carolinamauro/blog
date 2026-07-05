"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Static (no rAF) on mobile or when the user prefers reduced motion —
    // this is what keeps scrolling smooth on phones.
    const staticMode =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Opaque background painted by the canvas itself. Because the canvas is
    // fixed + fully painted, any content area exposed during fast/async scroll
    // reveals this instead of a black "checkerboard" gap.
    const BG = "#03030a";

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    let animId: number | null = null;
    let last = 0;
    let t = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      // lower density than before (÷5500) + hard cap
      const count = Math.min(160, Math.floor((canvas!.width * canvas!.height) / 5500));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: Math.random() * 1.4 + 0.2,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.6 + 0.2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawStatic() {
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      for (const star of stars) {
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx!.fill();
      }
    }

    function spawnShootingStar() {
      const angle = (Math.random() * Math.PI) / 4 + Math.PI / 8;
      const speed = Math.random() * 8 + 6;
      shootingStars.push({
        x: Math.random() * canvas!.width * 0.8,
        y: Math.random() * canvas!.height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 80 + 40,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      });
    }

    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      // throttle to ~30fps
      if (now - last < 33) return;
      last = now;
      t++;

      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (const star of stars) {
        const tw = Math.sin(t * star.speed * 0.08 + star.twinkleOffset);
        const op = star.opacity * (0.6 + 0.4 * tw);
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${op})`;
        ctx!.fill();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;
        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.moveTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx!.lineTo(s.x, s.y);
        ctx!.strokeStyle = `rgba(255,255,255,${s.opacity * 0.8})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      if (t % 220 === 0) spawnShootingStar();
    }

    function start() {
      if (animId == null) {
        last = 0;
        animId = requestAnimationFrame(frame);
      }
    }
    function stop() {
      if (animId != null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    resize();
    initStars();

    if (staticMode) {
      drawStatic();
      const onResize = () => {
        resize();
        initStars();
        drawStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    start();

    const onResize = () => {
      resize();
      initStars();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
