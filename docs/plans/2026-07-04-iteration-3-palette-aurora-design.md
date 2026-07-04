# Iteration 3 — 05-31 palette, red primary, Geist body, aurora fields

**Date:** 2026-07-04 · **Status:** approved (Luiz) — decisions A + Geist confirmed
**Source:** `origin/andrea:projects/branding/preview/colors-locked.json` (lock of 2026-05-31), reviewed in `projects/branding/ANDREA-DIRECTION-2026-06-23.md` (parent vault)
**Completes:** §8 items A + C + body-font reconciliation (B, D, E shipped in iteration 2)

## Decisions (operator-confirmed 2026-07-04)

1. **Primary action colour = red** (`#C92637`, flow step 3 = `--pillar-flow-mid`). Embrace Andrea's lock endpoint. Foreground = paper (5.23:1 AA). Guardrails: `--danger` moves to a clearly distinct dark brick `#7A2618` (9.42:1); `--warning` moves to flow-1 yellow `#FFDD80`/ink (13.13:1). Links inherit red via `--primary` (5.23:1 on paper — AA as text).
2. **Body font = Geist** (Andrea's direction; already bundled via `@fontsource-variable/geist`). Display stays Averia Serif Libre; eyebrows/labels stay IBM Plex Mono (the mono face is part of the editorial signature — Geist Mono is a separate, future call).

## 1. Palette port (both themes)

4-step ramps replace the 6-step 05-22 lock. Alias mapping: `light = 1`, `mid = 3`, `dark = 4`.

| Ramp | 1 | 2 | 3 (mid) | 4 (dark) |
|---|---|---|---|---|
| Neural | `#B8F4ED` | `#85C1BB` | `#426EAF` | `#184B7A` |
| Tissue | `#DDF48A` | `#ACB05E` | `#447932` | `#2F4937` |
| Flow | `#FFDD80` | `#E58961` | `#C92637` | `#613400` |

- `themes/editorial-organic.css` (ACTIVE): ramps + semantic remap below. BIS neutrals unchanged.
- `themes/organic.css`: same ramps; `--paper-700` → `#4B3B34`; same status remap adapted to its neutrals.
- Both: old `--lib-*` set (coral/amber/sky/rose/slate/teal/gold/indigo/moss) replaced by Andrea's new 9-colour data-viz library: gris `#AEADA5` · ocean `#4C6BC1` · blue `#6BB5B4` · green `#39A659` · yellow `#D5AD1C` · orange `#DC7221` · red `#CC4727` · pink `#DC697F` · purple `#8161BF`. (`--lib-moss` retired; `--success` re-anchors to tissue-dark.)
- `brand-family.css` untouched (swap-back option, not Andrea's system).

### Semantic map + measured WCAG ratios (editorial-organic, on paper `#fbf9f3` / ink `#1d1a16`)

| Token | Value | Pair | Ratio | AA |
|---|---|---|---|---|
| `--primary` | flow-mid `#C92637` | paper fg on it / as text on paper | 5.23 / 5.23 | ✓ / ✓ |
| `--primary-hover` | flow-dark `#613400` | as text on paper | 9.98 | ✓ |
| `--accent` / `--info` | neural-mid `#426EAF` | paper fg | 4.89 | ✓ |
| `--success` | tissue-dark `#2F4937` | `#F4F6F2` fg | 9.07 | ✓ |
| `--warning` | flow-1 `#FFDD80` | ink fg | 13.13 | ✓ |
| `--danger` | `#7A2618` | paper fg | 9.42 | ✓ |

Organic-theme equivalents (on `--paper-50 #F5F5F5`): primary 5.05 ✓ (paper-50 fg), info 4.72 ✓, warning/paper-900 12.86 ✓, muted `#4B3B34` 9.76 ✓.

## 2. Grainy-aurora pillar fields (pure CSS)

New `src/components/Aurora.astro` — same contract as `Tissue.astro` (absolute-inset decorative layer, zero client-JS, colours only via pillar vars):

- **Gradient layer:** 3–4 overlapping `radial-gradient`s per pillar, biased to ramp steps 1–2 (light) with one step-3 anchor at low alpha via `color-mix(... transparent)`, so body text on top keeps its contrast against effectively-paper.
- **Grain layer:** `::after` with an inline SVG `feTurbulence` fractal-noise data-URI (monochrome — no hex, keeps the gate green), `mix-blend-mode: soft-light`, low opacity.
- The watermarked mesh refs on `origin/andrea` (`preview/assets/pillar-inspo/`) are aesthetic reference ONLY — no file is copied.

Applied: the three landing `.pillar-row`s (each becomes a padded, isolated panel with its pillar's aurora) + an Aurora specimen row in `/lab`.

## 3. Sweep

- `theme.css` comment + `--sans` → Geist in editorial-organic.
- `/lab`: neutrals array → the active theme's actual vars (`--paper --ivory --sand --ink --rule`); ramps → 4 steps; library → new 9; stale "active direction is organic" note corrected; typography caption → Averia · Geist · IBM Plex Mono; Aurora specimens added.
- Landing + case studies + `/what-we-do` etc. visually re-checked under the new palette (tissue-mid is now forest `#447932`, not bright sage — motif tints and badges re-read).

## 4. Verify / deploy

`npm run build` (14 pages) · hex-isolation grep must return nothing · before/after landing screenshots (cached Playwright chromium) · deploy `main` + `gh-pages` as `refibcn` · forced Pages rebuild + content-level freshness check on a NEW hashed asset · decisions recorded in `docs/DEVELOPMENT.md`.
