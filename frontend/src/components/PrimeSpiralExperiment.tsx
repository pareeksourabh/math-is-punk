"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  count: number;
  scale: number;
  twistDegrees: number;
};

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  return { width, height };
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function PrimeSpiralExperiment({
  count,
  scale,
  twistDegrees,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const primeMap = useMemo(() => {
    const flags = new Array(count + 1).fill(true);
    flags[0] = false;
    flags[1] = false;
    for (let i = 2; i * i <= count; i++) {
      if (flags[i]) {
        for (let j = i * i; j <= count; j += i) {
          flags[j] = false;
        }
      }
    }
    return flags;
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (time: number) => {
      const { width, height } = resizeCanvas(canvas);
      const centerX = width / 2;
      const centerY = height / 2;
      const angleStep = (Math.PI / 180) * twistDegrees;
      const spin = time * 0.00035;
      const pulse = 1 + Math.sin(time * 0.0006) * 0.05;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let n = 1; n <= count; n++) {
        const angle = n * angleStep + spin;
        const radius = Math.sqrt(n) * scale * pulse;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const prime = primeMap[n];
        const size = prime ? 2.05 : 1.2;
        ctx.fillStyle = prime
          ? "rgba(244,114,182,0.9)"
          : "rgba(148,163,184,0.28)";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(centerX, centerY) - 6, 0, Math.PI * 2);
      ctx.stroke();
    };

    let rafId: number;
    const render = (t: number) => {
      drawFrame(t);
      rafId = requestAnimationFrame(render);
    };

    render(performance.now());
    const handleResize = () => drawFrame(performance.now());
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count, primeMap, scale, twistDegrees]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
