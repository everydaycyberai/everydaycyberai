"use client";
import { useEffect, useRef } from "react";

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Characters to rain — mix of binary, hex, cyber chars
    const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF</>{}[]#@$%^&*!=";

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const fontSize = 13;
    const cols = Math.floor(W / fontSize);

    // Each column has: y position, speed, opacity, char type
    type Drop = { y: number; speed: number; opacity: number; glowing: boolean };
    const drops: Drop[] = Array.from({ length: cols }, () => ({
      y: Math.random() * -200,
      speed: 0.4 + Math.random() * 1.2,
      opacity: 0.3 + Math.random() * 0.5,
      glowing: Math.random() > 0.85,
    }));

    // Particles (glowing dots)
    type Particle = { x: number; y: number; r: number; vx: number; vy: number; opacity: number; pulse: number };
    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: 0.3 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let animId: number;

    const draw = () => {
      frame++;

      // Fade trail
      ctx.fillStyle = "rgba(10,32,48, 0.10)";
      ctx.fillRect(0, 0, W, H);

      // ── Matrix rain ──
      drops.forEach((drop, i) => {
        const x = i * fontSize;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Head char — brighter
        if (drop.glowing) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#22d3ee";
          ctx.fillStyle = `rgba(200,255,255,${drop.opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(34,211,238,${drop.opacity * 0.9})`;
        }

        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, x, drop.y * fontSize);

        // Tail chars — dimmer green-cyan
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(0,210,180,${drop.opacity * 0.4})`;
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          x,
          (drop.y - 2) * fontSize
        );

        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y * fontSize > H + 100) {
          drop.y = -5 - Math.random() * 30;
          drop.speed = 0.4 + Math.random() * 1.2;
          drop.glowing = Math.random() > 0.85;
        }
      });

      // ── Floating particles ──
      particles.forEach((p) => {
        p.pulse += 0.02;
        const r = p.r + Math.sin(p.pulse) * 0.8;
        const op = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#22d3ee";
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${op})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // ── Occasional horizontal scan line ──
      if (frame % 180 === 0) {
        const scanY = Math.random() * H;
        const grad = ctx.createLinearGradient(0, scanY, W, scanY);
        grad.addColorStop(0,   "rgba(34,211,238,0)");
        grad.addColorStop(0.4, "rgba(34,211,238,0.06)");
        grad.addColorStop(0.6, "rgba(34,211,238,0.06)");
        grad.addColorStop(1,   "rgba(34,211,238,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY, W, 2);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cyber-canvas"
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
    />
  );
}
