"use client";

import { useEffect, useState } from "react";
import { createSeededRandom } from "@/lib/seed";

type Point = {
  x: number;
  y: number;
  r: number;
  opacity: number;
};

const SIZE = 420;
const CENTER = SIZE / 2;
const RINGS = 9;
const POINTS_PER_RING = 14;

function generatePoints(seed: string): Point[] {
  const points: Point[] = [];
  const rand = createSeededRandom(seed);
  for (let ring = 1; ring <= RINGS; ring++) {
    const baseRadius = (ring / RINGS) * (SIZE * 0.42);
    for (let i = 0; i < POINTS_PER_RING; i++) {
      const angle = (i / POINTS_PER_RING) * Math.PI * 2 + rand() * 0.1;
      const jitter = (rand() - 0.5) * 8;
      const radius = baseRadius + jitter;
      const x = CENTER + Math.cos(angle) * radius;
      const y = CENTER + Math.sin(angle) * radius;
      points.push({
        x,
        y,
        r: Math.max(1.5, 4 * rand()),
        opacity: 0.35 + rand() * 0.45,
      });
    }
  }
  return points;
}

type Props = {
  seed: string;
};

export default function DailyArt({ seed }: Props) {
  const [points, setPoints] = useState<Point[] | null>(null);

  useEffect(() => {
    setPoints(generatePoints(seed));
  }, [seed]);

  return (
    <div className="flex w-full justify-center">
      {points ? (
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="max-w-full"
        >
          <rect width={SIZE} height={SIZE} fill="#050505" rx="14" />
          <g stroke="none">
            {points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="white"
                fillOpacity={p.opacity}
              />
            ))}
          </g>
          <g stroke="#2f2f2f" strokeWidth={0.6} strokeOpacity={0.5}>
            {[1, 2, 3, 4, 5].map((r, idx) => (
              <circle
                key={idx}
                cx={CENTER}
                cy={CENTER}
                r={(r / 5) * (SIZE * 0.42)}
                fill="none"
              />
            ))}
          </g>
        </svg>
      ) : (
        <div className="h-[320px] md:h-[360px] flex items-center justify-center text-gray-600 text-sm w-full">
          Loading daily art...
        </div>
      )}
    </div>
  );
}
