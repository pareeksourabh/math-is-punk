"use client";

import Link from "next/link";

// Placeholder archive list; Phase 3/4 will load real S3-backed entries.
const entries = [
  { date: "2025-11-22", caption: "Numbers don’t lie. They riot.", seed: "2025-11-22" },
  { date: "2025-11-21", caption: "Today’s mood: irrational but continuous.", seed: "2025-11-21" },
  { date: "2025-11-20", caption: "Order is overrated. Embrace the gradient.", seed: "2025-11-20" },
  { date: "2025-11-19", caption: "Symmetry is just rebellion in disguise.", seed: "2025-11-19" },
  { date: "2025-11-18", caption: "Every prime is a protest sign.", seed: "2025-11-18" },
  { date: "2025-11-17", caption: "Proofs are poems with stricter line breaks.", seed: "2025-11-17" },
  { date: "2025-11-16", caption: "Deterministic randomness is the new beat.", seed: "2025-11-16" },
];

export default function TodayArchivePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-14 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Archive
            </h1>
            <p className="text-sm md:text-base text-gray-400 tracking-tight">
              A growing list of past math-art artifacts.
            </p>
          </div>
          <Link
            href="/today"
            className="text-sm text-gray-300 hover:text-pink-400 transition-colors"
          >
            ← Back to Today
          </Link>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.date}
              className="rounded-lg border border-gray-800 bg-neutral-950 p-4 space-y-1"
            >
              <div className="text-sm text-gray-400">{entry.date}</div>
              <div className="text-base text-gray-200">{entry.caption}</div>
              <div className="text-xs text-gray-500">Seed: {entry.seed}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
