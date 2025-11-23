# Math is Punk

> Maths is rebellion. Because the world wants you to stop thinking.

**Math is Punk** is a pointless, over-engineered math-art playground.
It's not about teaching mathematics. It's about making it look and feel cool again.

Planned components:
- A visual maths playground (chaotic attractors, prime spirals, fractals).
- A daily "Today in Mathematics" drop.
- A Useless Calculator that refuses to calculate.
- Contrarian posters and absurd proofs.

This repo will evolve in phases.  
## Project Phases

### Phase 0 — Naming & Setup ✅ (Complete)

**Goal:** Get "Math is Punk" live with a minimal landing page and a working deployment pipeline.

What was done:
- Chose the project name: **Math is Punk**.
- Scaffolded a Next.js (App Router) + TypeScript + Tailwind frontend in `/frontend`.
- Created a minimal dark-themed landing page with the core tagline and Phase 0 status.
- Connected the GitHub repo to **Cloudflare Pages** and deployed the site.
- Verified that pushing to `main` triggers an automatic build & deploy.

---

### Phase 1 — The Playground v1 🧪 (In Progress)

**Goal:** Build the first version of the **Math Playground** — a dedicated `/playground` route with a proper layout and one working visual experiment.

Core ideas for Phase 1:
- Create a `/playground` page that feels like an experimental lab:
  - Dark, minimal, “punk” aesthetic.
  - Clear structure: controls on one side, visual canvas on the other.
- Implement the **first visual experiment** (simple but alive), e.g.:
  - Animated sine wave.
  - Or simple particle field.
- Add very basic controls to tweak parameters (frequency, amplitude, speed).
- Prepare the layout so more experiments (prime spirals, attractors, fractals) can be slotted in later.

#### Phase 1 — Task List (for AI assistants like Codex)

- [ ] **Task 1.1:** Create a `/playground` route with a basic layout (header + two-column structure).
- [ ] **Task 1.2:** Add a simple navigation between Home (`/`) and Playground (`/playground`).
- [ ] **Task 1.3:** Implement the first visual component (e.g. animated sine wave) using `<canvas>` or SVG.
- [ ] **Task 1.4:** Add basic UI controls (sliders/toggles) that change parameters of the visual in real time.
- [ ] **Task 1.5:** Polish the styling to match the "Math is Punk" vibe (dark theme, strong typography, subtle borders).
- [ ] **Task 1.6:** Refactor the visual into a reusable `<PlaygroundExperiment>` component so new experiments can be added later.

Live site: https://mathispunk.com
