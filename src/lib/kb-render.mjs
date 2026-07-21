// Server-side render helpers shared by the public commons pages and the
// internal review page's frontmatter. Pure string builders — no DOM.
// COLORS: dataviz-validated on paper #fbf9f3 (all 6 checks pass; fixed assignment).
export const COLORS = {
  "claim-evidence": "#C92637",
  "concept-lineage": "#7B3B6E",
  "encyclopedia-entry": "#3A6B24",
  "public-use-boundary": "#B08000",
  "resource": "#426EAF",
  "signal": "#C96A2B",
  "source-system": "#0A9B8E",
};

export const TYPE_INFO = {
  "resource": "Concrete assets — articles, guides, funding rounds, tools, organizations.",
  "signal": "Time-bound observations — status changes, elapsed timelines, open questions.",
  "encyclopedia-entry": "Stable reference entries — actors, places, concepts of the territory.",
  "claim-evidence": "Claims with their evidence trail — kept separate from settled fact.",
  "concept-lineage": "How ideas evolved — the intellectual history behind the work.",
  "public-use-boundary": "Governance metadata — what may publish and under which conditions.",
  "source-system": "The living systems this knowledge is drawn from.",
};

export const escHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export function tagRowHtml(o) {
  const tag = (body, cls = "") => `<span class="tag${cls}">${body}</span>`;
  return `<div class="tags">` +
    tag(`<span class="dot" style="background:${COLORS[o.schema]}"></span>${o.schema}`) +
    (o.subtype && o.subtype !== o.schema ? tag(escHtml(o.subtype)) : "") +
    (o.domain ? tag(escHtml(o.domain)) : "") +
    tag(escHtml(o.maturity)) +
    (o.high_risk ? tag("⚠ high-risk", " warn") : "") +
    `</div>`;
}

export function fieldHtml(label, v, mono = false) {
  if (v == null || v === "" || (Array.isArray(v) && !v.length)) return "";
  const body = Array.isArray(v)
    ? v.map((x) => (typeof x === "object" ? JSON.stringify(x, null, 2) : String(x))).join("\n")
    : typeof v === "object" ? JSON.stringify(v, null, 2) : String(v);
  return `<dt>${escHtml(label)}</dt><dd class="${mono ? "mono" : ""}">${escHtml(body)}</dd>`;
}
