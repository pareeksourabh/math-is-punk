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
**Current phase:** Phase 0 — Naming & Setup (domain, deployment pipeline, skeleton UI).

## Deploying to Cloudflare Pages

The frontend lives in `frontend/`. A root-level helper script installs the dependencies there and runs the build:

- Build command: `npm run build`
- Build output directory: `frontend/out`
- (Optional) Root directory: repo root (no subdirectory needed)

`next.config.ts` is set to `output: "export"`, so `next build` generates a static export in `frontend/out` that Pages can serve directly. In CI the `prebuild` script runs `npm --prefix frontend ci` to install dependencies before the build.

If you are using a custom deploy command (e.g. `npx wrangler deploy`), `wrangler.toml` in the repo root points Wrangler at the static assets in `frontend/out`, so the deployment step can publish the export.
