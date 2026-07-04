# Iteration 4 — editorial deepening: sections + visual elements

**Date:** 2026-07-04 · **Status:** approved (Luiz — "A. Editorial deepening")
**Strategy:** resolve the landing-vs-deeper-pages overlap by *differentiation* — each deeper page carries what the landing can't. System-wide sleekness pass. No IA changes, no rebrand, all copy grounded in existing repo facts.

## New shared components (theme-pure — no raw hex, vars only)

| Component | Purpose | Used on |
|---|---|---|
| `StatBand` | Mono editorial numbers strip (dashed rules), data from `stats.yaml` | landing, about |
| `ProcessStrip` | Numbered engagement path (01–04), data from `process.yaml` | what-we-do, contact |
| `TeamCard` | Monogram tile (Averia initials over pillar aurora header) + role eyebrow + bio | about, landing |
| `CTABand` | Full-width flow-aurora band + grain + primary CTA | what-we-do, who-we-serve, projects, about, case studies |
| `PageHero` | Deeper-page opener: eyebrow + title + lede + optional motif (neural web / tissue / aurora) | about, what-we-do, who-we-serve, projects, contact |

## Data

- `src/data/stats.yaml` (new): €27K+ pooled · 10+ projects funded · 3 operators · 2 global networks — all from existing About/case-study copy.
- `src/data/process.yaml` (new): intro call → short proposal (options + price) → build in tools you own → handover as living systems. From existing what-we-do CTA copy + services voice.
- `services.yaml` extended: per-service `pillar`, `deliverable`, `case` {href,label}.
- `who-we-serve.yaml` extended: per-audience `pillars` + `signals` (3 fit-signals each, drawn from the existing body copy).
- `projects.yaml`: `stats` rows for Regenerant Catalunya (verifiable numbers only).

## Page reworks

- **Landing:** numbered section eyebrows (01–06); StatBand after Approach; projects grid → featured-first layout (Regenerant large, rest compact; imageless cards get an aurora placeholder); team section → TeamCards.
- **About:** PageHero (neural-web motif) → story → StatBand → theory-of-change as numbered editorial blocks → TeamCards (reuses landing team data) → partners row → CTABand.
- **What we do:** PageHero → service rows (mono index number + pillar badge + deliverable line + related case link) → ProcessStrip → CTABand.
- **Who we serve:** PageHero → audience cards with pillar badges + "signals you're a fit" lists → secondary note → CTABand.
- **Projects:** PageHero → featured grid (same treatment as landing) → CTABand. Case studies: meta grid kept, add stat callouts (where data exists), prev/next project footer nav, CTABand.
- **Contact:** PageHero → channel tiles (email/telegram/federation/code) → ProcessStrip.

## Sleekness pass

- `global.css`: card/button/link hover transitions (using existing `--t-fast/med` motion tokens), consistent `:focus-visible`, animated link underlines, reveal classes.
- `Nav`: compact primary Contact button; hover polish.
- `Footer`: NeuralWeb texture at whisper opacity behind the columns.
- `Layout`: ~15-line IntersectionObserver adding `.reveal--in` to sections; base `.reveal` opacity/translate transitions gated behind `prefers-reduced-motion: no-preference`; no-JS users unaffected (classes added by the script itself).

## Verify / deploy

Same pipeline as iteration 3: `npm run build` (14 pages) · hex-isolation gate · screenshots per page · deploy main + gh-pages as refibcn · forced Pages rebuild · content-level freshness probe on a new hashed asset.
