"use client";

import { useEffect, useRef } from "react";

type Size = {
  width: number;
  height: number;
};

type Props = {
  amplitude: number;
  frequency: number;
  speed: number;
};

function resizeCanvas(canvas: HTMLCanvasElement): Size {
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

function drawSineWave(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  amplitude: number,
  frequency: number,
  speed: number,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#e5e5e5";
  ctx.lineWidth = 2;
  ctx.beginPath();

  const centerY = height / 2;
  const step = 2;
  for (let x = 0; x <= width; x += step) {
    const y =
      centerY + Math.sin(x * frequency + time * speed) * amplitude * 0.8;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

export default function SineWaveExperiment({
  amplitude,
  frequency,
  speed,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<Size>({ width: 0, height: 0 });
  const amplitudeRef = useRef(amplitude);
  const frequencyRef = useRef(frequency);
  const speedRef = useRef(speed);

  useEffect(() => {
    amplitudeRef.current = amplitude;
    frequencyRef.current = frequency;
    speedRef.current = speed;
  }, [amplitude, frequency, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      sizeRef.current = resizeCanvas(canvas);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrame: number;
    let start = performance.now();

    const render = (time: number) => {
      const elapsed = (time - start) / 16.67; // approx frames
      drawSineWave(
        ctx,
        sizeRef.current.width,
        sizeRef.current.height,
        elapsed,
        amplitudeRef.current,
        frequencyRef.current,
        speedRef.current,
      );
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="h-full w-full" />
  );
}
