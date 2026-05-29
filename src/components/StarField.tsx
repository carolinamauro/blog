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

    let animId: number;
    let t = 0;

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      const count = Math.floor((canvas!.width * canvas!.height) / 4000);
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

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      t++;

      // Twinkle stars
      for (const star of stars) {
        const tw = Math.sin(t * star.speed * 0.04 + star.twinkleOffset);
        const op = star.opacity * (0.6 + 0.4 * tw);
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${op})`;
        ctx!.fill();
      }

      // Shooting stars
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

        const grad = ctx!.createLinearGradient(
          s.x - s.vx * (s.length / s.vx || 8),
          s.y - s.vy * (s.length / Math.max(Math.abs(s.vy), 1)),
          s.x,
          s.y
        );
        grad.addColorStop(0, `rgba(103,232,249,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity * 0.9})`);
        ctx!.beginPath();
        ctx!.moveTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx!.lineTo(s.x, s.y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      if (t % 180 === 0) spawnShootingStar();

      animId = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
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
