"use client";

import { useEffect, useRef } from "react";

type Props = {
  a: number;
  b: number;
  c: number;
  d: number;
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

export default function StrangeAttractorExperiment({ a, b, c, d }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = resizeCanvas(canvas);
    let x = 0.1;
    let y = 0.0;
    const centerX = width / 2;
    const centerY = height / 2;

    const drawFrame = () => {
      const { width: w, height: h } = resizeCanvas(canvas);
      const scale = Math.min(w, h) / 3.8;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5,5,5,0.12)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const iterations = 14000;

      for (let i = 0; i < iterations; i++) {
        const nextX = Math.sin(a * y) + c * Math.cos(a * x);
        const nextY = Math.sin(b * x) + d * Math.cos(b * y);
        x = nextX;
        y = nextY;

        const px = centerX + x * scale;
        const py = centerY + y * scale;
        const t = i / iterations;
        const alpha = Math.min(0.2, 0.08 + t * 0.18);
        ctx.fillStyle = `rgba(244,114,182,${alpha})`;
        ctx.fillRect(px, py, 1.4, 1.4);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let rafId: number;
    const render = () => {
      drawFrame();
      rafId = requestAnimationFrame(render);
    };

    render();
    const handleResize = () => drawFrame();
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [a, b, c, d]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
