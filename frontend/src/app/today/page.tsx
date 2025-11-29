/**
 * Today page: shows the daily math-art drop using the date-based seed and S3-rendered SVG.
 */
"use client";

import Link from "next/link";
import DailyCaption from "@/components/DailyCaption";
import { getTodaySeedString } from "@/lib/seed";
import { getDailyArtUrl } from "@/lib/dailyArt";

export default function TodayPage() {
  const seedString = getTodaySeedString();
  const imageUrl = getDailyArtUrl(seedString);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Today in Mathematics: daily math-art artifact powered by a date-based seed. */}
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Today in Mathematics
          </h1>
          <p className="text-sm md:text-base text-gray-400 tracking-tight">
            A daily math-art artifact generated from chaos.
          </p>
        </div>

        <div className="w-full max-w-3xl space-y-3">
          <div className="rounded-lg border border-gray-800 bg-neutral-950 p-4 md:p-6">
            <img
              src={imageUrl}
              alt={`Daily math art for ${seedString}`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          <DailyCaption seed={seedString} />
          <div className="text-xs text-gray-500">Seed: {seedString}</div>
        </div>

        <Link
          href="/today/archive"
          className="text-sm text-gray-300 hover:text-pink-400 transition-colors underline decoration-transparent hover:decoration-pink-400"
        >
          View Archive →
        </Link>
      </div>
    </main>
  );
}
