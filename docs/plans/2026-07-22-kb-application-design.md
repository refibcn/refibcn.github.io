# KB application — one engine, two lenses (approved 2026-07-22)

**Goal:** the real knowledge-base surface on refibcn-site, replacing Obsidian Publish + Quartz. Approach A approved by Luiz: hash-routed single-file internal app + upgraded public commons. All 260721 governance rails hold (D6 curated-sub-scope publication, fail-closed public lens, archive-don't-republish, encrypted single-file internal artifact).

## Engine (`src/lib/kb.mjs` additions — pure, tested)

`connections(objects)` → per-object index of:
- `out`: resolved `related_concepts` links (title → object index; case-insensitive title match, slug fallback)
- `unresolved`: related_concepts with no target in the given set (render as plain text — in the public lens this is also the leak guard: links computed within the publishable subset only, so unpublished titles never become paths)
- `backlinks`: reverse of `out`
- `siblings`: same work-order/origin objects (provenance context, kept distinct from concept links)

## Internal lens v2 (`/commons-review` — still ONE self-contained file)

Constraints unchanged: `is:inline` everything, no `/_astro` refs, `COMMONS_REVIEW=1` env gate, staticrypt pipeline + canary gates untouched.

- **Layout:** header (search/filters/sort/view toggle, kept) + **persistent left sidebar** (schema tree with counts, domain list, high-risk/maturity toggles) + **reader pane** (replaces the modal drawer).
- **Hash router with history:** `#/` browse · `#/o/<schema>/<slug>` object. pushState-style back/forward; deep links shareable inside the password wall.
- **Typed layouts per schema** (field order): claim-evidence: claim → evidence → interpretation → uncertainty · concept-lineage: short_description → source_traditions → tensions → risks_of_flattening → toolkit_usage · signal: interpretation → proposed_intervention · encyclopedia-entry: summary → known_tensions → audience · resource: notes → resource_type → link_status · source-system: what_it_curates → url → update_rhythm. Then provenance block, then remaining fields.
- **Connections in the reader:** References (resolved, clickable) · Referenced by (backlinks) · Same source (siblings) · unresolved concepts as muted text.
- **Graph:** existing canvas engine reused verbatim; node click routes to the object; "show in graph" from reader.
- **Keyboard:** `/` search · `g` graph · `esc` back to browse · `[`/`]` prev/next in current filtered list.

## Public lens v2 (`/commons*` — renders `publishableKb()` only, zero pages today)

- `commons.astro`: keeps framing/status; when published objects exist, renders schema-sectioned browse (cards with domain/type tags). Empty state = current honest status meter.
- `commons/[schema]/[slug].astro`: typed layouts (same field-order spec), provenance, References/Referenced-by **computed within the publishable subset only**, breadcrumbs, editorial-organic styling (site theme, not the internal palette).
- Fixture positive tests prove layouts + connection filtering (a publishable fixture linking to an unpublishable title must render it as text, not a link).

## Verify / ship

`npm test` (existing deny-branch tests stay green + new connections tests) · plain build → stub + canary green · `COMMONS_REVIEW=1` build → app, self-containment check · staticrypt pipeline verified with a throwaway password (real bucket redeploy = Luiz runs with the real password) · public deploy unchanged in content (still zero KB pages) · DEVELOPMENT.md + parent `knowledge-commons.md` updated (worktree).
