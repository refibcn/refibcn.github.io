# ReFi BCN Website — Development Feedback

> **Live site:** https://refibcn.github.io/
> **Element/branding lab:** https://refibcn.github.io/lab/ (internal test surface — palette, type, motifs, primitives)
> **Repository:** https://github.com/refibcn/refibcn.github.io

---

## How to Contribute

1. **Review the live site** at the link above (the `/lab/` page shows all the design elements in one place)
2. **Add your feedback** in the sections below — edit this file directly on GitHub (pencil icon)
3. **Tag your comments** with your name/handle
4. **Prioritize** if possible (🔴 Critical, 🟡 Important, 🟢 Nice to have)

---

## General Impressions

> What's your overall feeling about the site? First reactions welcome.

-
-
-

---

## Design Feedback

> Current theme = "editorial-organic": Averia Serif Libre titles · Geist body · IBM Plex Mono labels ·
> straight edges · three-pillar palette (Neural / Tissue / Flow, Andrea's 2026-05-31 lock — 4-step
> ramps, red primary) · tissue backgrounds + grainy-aurora pillar fields.
> The whole palette/type can be swapped in one line (`src/styles/theme.css`) — nothing is final.

-
-
-

---

## Content Feedback

> Landing copy follows Andrea's prepared structure (pillars as the three capabilities).
> Naming stays **ReFi BCN / open** — no rebrand in the site until the name survey resolves.

-
-
-

---

## Navigation & UX

> How does it feel to move around? Known open point: the landing tells the full story while the nav
> still points to separate deeper pages (/what-we-do, /who-we-serve…) with overlapping content.

-
-
-

---

## Content Ideas

> What pages/sections should we add? (Atlas = maps, Commons = knowledge base are scaffolds for now.)

-
-
-

---

## Feature Requests

> What's missing? What would make this better?

-
-
-

---

## Bugs & Issues

> Anything broken? Display issues? Errors?

| Issue | Browser/Device | Reporter |
|-------|---------------|----------|
| | | |
| | | |

---

## Questions for Discussion

- [x] **Primary action colour** — ~~embrace red as primary, or keep a warm amber/coral?~~ → **Red** (`#C92637`), decided 2026-07-04 (see Decisions Made).
- [x] **Body font** — ~~Geist vs Inter?~~ → **Geist**, decided 2026-07-04 (see Decisions Made).
- [ ] **Landing vs deeper pages** — single-page with anchors, or keep separate pages and differentiate their content?
- [ ] **Custom domain** — when to point refibcn.cat (or subdomain) at this?
- [ ] **Group name** — survey pending; the site re-skins via tokens when decided.
- [ ]

---

## Decisions Made

| Decision | Date | Context |
|----------|------|---------|
| Organic / interconnected visual direction (cells · mycelium · rivers) | 2026-06-02 | ops sync |
| One consolidated Astro surface, BIS editorial base + hidden `/lab` | 2026-06-11 | ops sync |
| "Bioregional Commons" as the maps+knowledge surface label (provisional) | 2026-06-11 | ops sync |
| Editorial-BIS structure + organic atmosphere; dual-theme one-line swap | 2026-06-10 | build session |
| Landing adopts Andrea's prepared structure + Averia titles | 2026-06-11 | build session |
| Naming stays OPEN / ReFi BCN — publishing not gated on rebrand | 2026-06-30 | team decision |
| Published to GitHub Pages under the refibcn account (`gh-pages` branch) | 2026-07-01 | this repo |
| **Primary action colour = red** `#C92637` (flow step 3 of Andrea's 2026-05-31 lock; paper foreground, AA 5.23:1). Guardrails: `--danger` → dark brick `#7A2618`, `--warning` → flow-1 yellow `#FFDD80` | 2026-07-04 | Luiz, iteration-3 session |
| **Body font = Geist** (Andrea's direction). Display stays Averia Serif Libre; eyebrows/labels stay IBM Plex Mono (Geist Mono = separate future call) | 2026-07-04 | Luiz, iteration-3 session |
| 2026-05-31 palette lock adopted in both organic themes (4-step ramps, new 9-colour data-viz library); aurora pillar fields recreated in pure CSS (watermarked mesh refs NOT shipped) | 2026-07-04 | iteration-3 session |

---

## Next Steps (proposed — next iteration)

- [x] Adopt Andrea's 2026-05-31 palette lock — done 2026-07-04 (red primary per decision)
- [x] Wire in Andrea's real project illustrations (optimized for web) — done 2026-07-01 (iteration 2)
- [x] Recreate the grainy-aurora pillar backgrounds in CSS — done 2026-07-04 (`Aurora.astro`, pure CSS)
- [x] Fold Andrea's live Voronoi tissue editor into `/lab` — done 2026-07-01 (`/lab-tools/`)
- [x] Housekeeping: centralize the org name into one token · OG/meta tags · 404 page — done 2026-07-01
- [ ] Body font follow-up: Geist Mono for eyebrows/labels? (IBM Plex Mono kept for now)
- [ ] Phase 1b: wire the Catalunya maps into `/atlas`

---

## Meeting Notes

### [Date]

**Present:**

**Notes:**

**Actions:**

---

*Add your name to contributors when you provide feedback!*

**Contributors:**
