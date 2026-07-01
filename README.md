# refibcn-site

The new **ReFi BCN** coop website (refibcn.cat) — one consolidated Astro surface:
the org/marketing site + **Atlas** (territorial maps) + the **Bioregional Commons**
(knowledge base). Built on the editorial shell from the Bioregional Intelligence
project, with Andrea's organic palette + backgrounds as the atmosphere.

> **Provisional naming.** "Bioregional Commons" (the Atlas + Commons surface) and the
> overall identity are provisional — the final BIS-rename + group-rebrand + domain is
> one converged decision (see the knowledge-commons-architecture session). Spec:
> `../../projects/branding/REFIBCN-SITE-SPEC.md`.

## Run

```bash
npm install        # one-time
npm run dev        # http://localhost:4321/
npm run build      # static site → dist/
```

## The theme swap

Palette + type + radius live behind **one line**. Edit `src/styles/theme.css`:

```css
@import "./themes/editorial-organic.css";   /* ACTIVE — BIS editorial + organic atmosphere */
/* @import "./themes/organic.css"; */        /* Andrea's full organic (Geist/amber/rounded) */
/* @import "./themes/brand-family.css"; */    /* v2 purple/Fraunces */
```

`src/styles/tokens.css` holds structural tokens (spacing, type scale, motion) and never
changes between themes. `global.css` consumes only theme vars (no raw hex). All candidate
fonts are bundled via `@fontsource`, so the swap is instant.

## Information architecture

`/` home · `/what-we-do` · `/who-we-serve` · `/projects` (+ `/projects/<slug>` case studies)
· `/atlas` (maps) · `/commons` (knowledge) · `/about` · `/contact` · `/lab` (internal,
noindex — element + branding test surface).

## Character

Editorial-cartographic structure (**Averia Serif Libre** display/headings — Andrea's face ·
IBM Plex Mono eyebrows · Inter body · straight edges · 1px-ink tile grids · dashed dividers)
+ organic atmosphere (three-pillar palette — Neural / Tissue / Flow — and Tissue/Flow/Neural
SVG backgrounds). The landing follows Andrea's prepared structure (the three pillars framed
as three capabilities).

## Deploy

GitHub Actions → Pages via `.github/workflows/deploy.yml` (build on push to `main`). Served at
base `/` (org root page or custom domain). For a project-page path, set `base` in
`astro.config.mjs` and make internal links base-aware first.

## Naming

Stays **ReFi BCN** / open per the 260630 decision — publishing is not gated on a rebrand.
"Bioregional Commons" is a provisional surface label, not the group name.

## Phasing

- **Phase 1 (this):** shell + editorial-organic theme + marketing pages + Atlas/Commons
  scaffolds + `/lab`.
- **Phase 1b:** wire the territorial maps into `/atlas`. The map components
  (`CatalunyaProgramMap`, `CatalunyaInsetMap`), `src/lib/catalunya-projection.ts`,
  `src/data/rc-cohort.yaml`, and `content.config.ts` are carried (dormant) from BIS, plus
  `d3` + `maplibre-gl` deps. The `public/geo/` + `public/images/projects/` assets are present.
- **Phase 2:** fold the knowledge base into `/commons` (gated on the host-architecture decision).

## Provenance

Forked from `bioregional-intelligence` (BIS) as the editorial base, then re-themed and
extended. The standalone BIS deploy stays live until the maps are integrated here.
Built by ReFi Barcelona.
