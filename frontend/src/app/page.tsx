/**
 * Math is Punk — Phase Notes
 *
 * Phase 0 — Naming & Setup ✅
 * - Basic landing page is live on Cloudflare Pages.
 * - Tech stack: Next.js (App Router, TypeScript, Tailwind), dark theme, minimal UI.
 *
 * Phase 1 — The Playground v1 🧪 (current focus)
 * - Next steps (to be implemented incrementally):
 *   1. Add a /playground route with a two-column layout (controls + canvas).
 *   2. Implement the first visual experiment (e.g. animated sine wave).
 *   3. Add basic controls that tweak the visual in real time.
 *   4. Make the Playground page feel like an experimental lab for future math art.
 *
 * AI Assistants (Codex, etc.):
 * - When asked to help, start by implementing the next uncompleted step from Phase 1.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Math is <span className="underline decoration-pink-500">Punk</span>.
        </h1>

        <p className="text-lg md:text-2xl text-gray-300">
          A pointless, over-engineered math-art playground.
        </p>

        <p className="text-sm md:text-base text-gray-400">
          Coming soon: chaotic attractors, prime spirals, useless calculators, 
          and absurd proofs. No test prep. No formulas to memorise. Just vibes.
        </p>

        <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
          Phase 0 · Naming & Setup
        </div>
      </div>
    </main>
  );
}
