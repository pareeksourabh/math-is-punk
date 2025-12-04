"use client";

import { useEffect, useRef } from "react";

type Props = {
  count: number;
  spacing: number;
  warp: number;
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

export default function GoldenFieldExperiment({ count, spacing, warp }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (time: number) => {
      const { width, height } = resizeCanvas(canvas);
      const centerX = width / 2;
      const centerY = height / 2;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
      const drift = time * 0.0005;
      const pulse = 1 + Math.sin(time * 0.0007) * 0.05;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const angle = i * goldenAngle + i * warp + drift;
        const radius = spacing * Math.sqrt(i) * pulse;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const hue = (200 + i * 0.12) % 360;
        const alpha = Math.min(0.85, 0.15 + i / count);
        ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.strokeRect(8, 8, width - 16, height - 16);
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
  }, [count, spacing, warp]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
