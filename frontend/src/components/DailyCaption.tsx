/**
 * Renders a deterministic daily caption chosen from a fixed list using the date-based seed.
 */
"use client";

import { useMemo } from "react";
import { createSeededRandom } from "@/lib/seed";

type Props = {
  seed: string;
};

export default function DailyCaption({ seed }: Props) {
  const caption = useMemo(() => {
    const phrases = [
      "Numbers don’t lie. They riot.",
      "Today’s mood: irrational but continuous.",
      "Order is overrated. Embrace the gradient.",
      "Punk theorem: disrupt before you derive.",
      "Symmetry is just rebellion in disguise.",
      "We plot chaos because it refuses to behave.",
      "You don’t hate math. You hate obedience.",
      "Curves whisper. Noise shouts. We listen to both.",
      "Every prime is a protest sign.",
      "Deterministic randomness is the new beat.",
      "Proofs are poems with stricter line breaks.",
      "Singularities are just math screaming.",
      "Precision with attitude. That’s the vibe.",
    ];
    const rand = createSeededRandom(seed);
    const idx = Math.floor(rand() * phrases.length);
    return phrases[idx];
  }, [seed]);

  return (
    <div className="text-sm text-gray-400 text-center mt-3">
      {caption}
    </div>
  );
}
