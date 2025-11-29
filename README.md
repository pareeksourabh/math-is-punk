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

- [x] **Task 1.1:** Create a `/playground` route with a basic layout (header + two-column structure).
- [x] **Task 1.2:** Add a simple navigation between Home (`/`) and Playground (`/playground`).
- [x] **Task 1.3:** Implement the first visual component (e.g. animated sine wave) using `<canvas>` or SVG.
- [x] **Task 1.4:** Add basic UI controls (sliders/toggles) that change parameters of the visual in real time.
- [x] **Task 1.5:** Polish the styling to match the "Math is Punk" vibe (dark theme, strong typography, subtle borders).
- [x] **Task 1.6:** Refactor the visual into a reusable `<PlaygroundExperiment>` component so new experiments can be added later.

### Phase 2 — Today in Mathematics 🧮✨ (In Progress)

**Goal:**  
Give Math is Punk a “living pulse” by adding a daily auto-generated math-art drop.  
Every day, the site will feature a new math-inspired artifact (image + caption).

Core ideas for Phase 2:
- A dedicated `/today` route showing:
  - “Math Artifact of the Day”
  - A dynamically generated image (seed-based)
  - A short caption (poetic/absurd/punk tone)
- A server-side generator that produces:
  - SVG or Canvas-based art using a daily pseudorandom seed
- Archive older drops in `/today/archive`
- Make the UI visually minimal and editorial
- Later (Phase 2B): automate IG posting using AWS Lambda → Facebook Graph API

#### Phase 2 — Task List (for Codex)

- [ ] **Task 2.1:** Create a new `/today` route with placeholder UI.
- [ ] **Task 2.2:** Build a simple random math-art generator (client-side SVG/Canvas).
- [ ] **Task 2.3:** Replace placeholder with generated art based on a daily seed.
- [ ] **Task 2.4:** Add a short caption generated from a fixed set of phrases.
- [ ] **Task 2.5:** Create `/today/archive` page listing previous drops (placeholder for now).
- [ ] **Task 2.6:** Refactor into components (`DailyArt`, `DailyCaption`).

### Phase 2B — Backend: Daily Art Lambda (AWS) ☁️

**Goal:**  
Give "Today in Mathematics" a backend engine that can generate a deterministic daily art asset (SVG/PNG) and store it in S3, so it can later be used for automation (e.g. posting to Instagram).

High-level architecture:
- **AWS Lambda (Python)** — `generate_daily_art` function
- **EventBridge rule** — runs the Lambda once a day with a date-based seed
- **S3 bucket** — stores generated daily artifacts (e.g. `math-is-punk-art/YYYY-MM-DD.png`)
- (Later) optional **HTTP trigger** or **CLI script** to:
  - regenerate art for a specific day
  - or trigger Instagram posting

#### Phase 2B — Task List

- [ ] **Task 2B.1:** Set up `infra/` and `backend/` structure with a basic Serverless Framework config and a stub Lambda.
- [ ] **Task 2B.2:** Implement the Lambda to generate a deterministic SVG/PNG for a given `date` or `seed` and save it to S3.
- [ ] **Task 2B.3:** Add a daily EventBridge schedule (cron) to trigger the Lambda automatically.
- [ ] **Task 2B.4:** Add a simple manual trigger path (HTTP endpoint or CLI script) to generate art for a specific date.
- [ ] **Task 2B.5:** (Optional) Expose the generated image in the frontend (e.g. show S3 image on `/today` instead of client-side SVG).

Live site: https://mathispunk.com

Notes:
- `infra/template.yaml` is the AWS SAM template entry point for the backend (Serverless).
- `backend/daily_art_lambda/handler.py` holds the Lambda that generates deterministic SVG art for a given date and stores it in the S3 bucket created by `DailyArtBucket`. It now also runs daily via EventBridge (`rate(1 day)`) in addition to the manual API call.
