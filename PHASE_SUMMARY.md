# Math is Punk — Project Phase Summary (v1.0)

Math is Punk is a deliberately over-engineered mathematical-art playground.
It mixes absurdity, aesthetics, automation, AWS, Cloudflare, and creative experimentation.

This document summarizes every phase of the project so that any AI coding assistant
(ChatGPT, Claude Code, Codex) can understand the intent and generate correct changes.

---

# PHASE 0 — Prototype & Site Skeleton
Purpose:
- Create a minimal, working website deployed on Cloudflare Pages.
- Establish the basic UI shell (home, navigation, playground).
- No real functionality; purely scaffolding.

Outputs:
- Skeleton React site (or Vanilla JS + HTML depending on early choice)
- Deployed to Cloudflare Pages
- Placeholder text: “Phase 0”
- Repo created and structured

Status:
✔ Completed

---

# PHASE 1 — Aesthetic & UX Foundation
Purpose:
- Give the site its visual identity.
- Add minimal interactivity to the playground.
- Start defining the “Math is Punk” aesthetic (dark, punk, neon-academic vibe).
- Make the site look intentional, not placeholder.

Outputs:
- Updated UI (color scheme, navigation, layout)
- Playground v1 (simple sliders / fields / parameters)
- Basic styling philosophy
- Consistent theme

Status:
✔ Completed  
(With additional small future refinements allowed)

---

# PHASE 2 — Automated Math Art Engine (On AWS)
Purpose:
- Add the first *actual* piece of functionality: automatic math-art generation.
- Trigger a daily AWS Lambda that produces an SVG based on mathematical rules.
- Store SVG in S3.
- Frontend loads the most recent art.
- No user interaction required.

Components:
- EventBridge (cron schedule)
- Lambda function (Python)
- S3 bucket (store generated SVGs)
- Cloudflare frontend fetches from S3
- (API Gateway intentionally skipped in Phase 2)

Outputs:
- Fully automated “daily art” system
- SVG generation pipeline
- Frontend integration

Status:
✔ Completed

---

# PHASE 2B — AWS Infra Hardening & Future-Proofing
Purpose:
- Refine infra automation.
- Create SAM template for reproducibility.
- Define future API endpoints (not implemented yet).
- Clean code, IAM roles, and deployment pipeline.

Outputs:
- SAM template
- Documented architecture
- Stable deployments
- Clear instructions for adding new generators later

Status:
✔ Completed

---

# PHASE 3 — Multi-Generator Art Lab
Purpose:
- Expand art generation from a single mode → multiple modes.
- Add new generators (fractals, spirals, chaos attractors, prime grids, etc.)
- Allow choosing modes in the playground.
- Build a “Math is Punk Art Laboratory.”

Outputs:
- /generator folder with multiple algorithms
- UI for switching modes
- Backend ready to accept multiple generator types (even if triggered manually)
- Updated visual identity for the art lab

Status:
🟡 Partially planned, not implemented.

---

# PHASE 4 — Useless Machines (Fun Tools)
Purpose:
- Add deliberately useless, absurd-but-funny tools to enhance the playground.
- Tools are designed to *look* functional but behave mischievously.
- These reinforce the brand’s personality.

Examples:
- Useless Calculator (predicts random but aesthetic numbers)
- Chaos Slider (always snaps to unexpected values)
- Probability Oracle (responds with philosophical nonsense)
- Prime Randomizer (guarantees “not prime” outputs)

Outputs:
- A set of fun, joke-like but beautifully designed tools
- UX that feels handcrafted and playful

Status:
🔜 Planned (this is your next focus: the “Useless Calculator”)

---

# PHASE 5 — User Interaction & Exploration
Purpose:
- Allow users to interact with math visually.
- Add manipulable parameters, animated visual responses, etc.
- Build “mini labs” where users can play with math concepts hands-on.

Outputs:
- Interactive canvas
- Real-time math visualization
- Sliders, toggles, inputs
- Possibly a history or gallery

Status:
Planned (future)

---

# PHASE 6 — Social & Sharing
Purpose:
- Add simple social sharing features.
- Users can save/export images from the art lab.
- Generate shareable meta images.

Outputs:
- Download button (PNG/SVG)
- Share-to-social images
- Possibly an Instagram bot (if needed)

Status:
Future phase

---

# PHASE 7 — Platform & API Expansion
Purpose:
- Introduce API Gateway to expose:
  - /generate?mode=
  - /latest
  - /history
- Allow programmatic use of the art engine.
- Build a micro “math-art API.”

Outputs:
- API with 2–4 endpoints
- Rate limiting & keys
- Public API docs

Status:
Future

---

# PHASE 8 — Open-Ended Growth
Purpose:
- Merchandise
- Pattern marketplace
- User-contributed generators
- NFT-free digital art ownership
- Long-term absurd expansion

Outputs:
- TBD

Status:
Open-ended

---

# USAGE GUIDELINES FOR AI (Codex / ChatGPT)
Whenever I ask:
“Continue Math is Punk”  
or  
“Implement Phase X Task Y”  
AI should:

1. Read this summary.  
2. Understand the phase intention.  
3. Generate the required code or file edits.  
4. Modify files directly when requested.  
5. Not invent new functionality outside the active phase.  

