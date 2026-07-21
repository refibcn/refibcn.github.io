// Loader for the refi-bcn-os KMS typed store (data/kb/<schema>.yaml).
// Seed of the Phase-4 /commons collection loader — keep pure + dependency-light.
// Data path: this repo lives at repos/refibcn-site inside the refi-bcn-os checkout.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

// fileURLToPath, not .pathname — the checkout path contains spaces ("03 Libraries").
const DEFAULT_KB_DIR = fileURLToPath(new URL("../../../../data/kb/", import.meta.url));

export function loadKb(kbDir = process.env.KB_DIR ?? DEFAULT_KB_DIR) {
  const schemas = readdirSync(kbDir).filter(f => f.endsWith(".yaml")).map(f => f.replace(/\.yaml$/, ""));
  const objects = [];
  for (const schema of schemas) {
    const doc = yaml.load(readFileSync(join(kbDir, `${schema}.yaml`), "utf8"));
    for (const [slug, o] of Object.entries(doc?.entries ?? {})) {
      objects.push({
        id: `${schema}/${slug}`,
        schema,
        slug,
        title: o.title || slug,
        subtype: o.type || o.page_type || o.resource_type || o.signal_type || o.tier || "",
        domain: o.domain || "",
        maturity: o.maturity || (schema === "public-use-boundary" ? "boundary" : "raw"),
        high_risk: Boolean(o.high_risk) || o.tier === "public-with-caveat",
        summary: o.summary || o.short_description || o.claim || o.interpretation || o.consent_note || o.what_it_curates || "",
        origin: o.provenance?.origin || o.source_lineage || o.url || "",
        raw: o,
      });
    }
  }
  objects.sort((a, b) => a.schema.localeCompare(b.schema) || a.title.localeCompare(b.title));
  return objects;
}

export function facets(objects) {
  return {
    schemas: [...new Set(objects.map(o => o.schema))].sort(),
    domains: [...new Set(objects.map(o => o.domain).filter(Boolean))].sort(),
    highRisk: objects.filter(o => o.high_risk).length,
  };
}

// Graph model: nodes = objects; edges = same-source siblings + shared-concept pairs.
// Same-source edges first (strongest signal), concept edges fill up to the cap.
export function graphData(objects) {
  const seen = new Set();
  const links = [];
  const push = (a, b) => {
    if (a === b) return;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const k = `${lo}-${hi}`;
    if (!seen.has(k) && links.length < 4000) { seen.add(k); links.push([lo, hi]); }
  };

  const bySource = new Map();
  objects.forEach((o, i) => {
    const src = o.raw.work_order || o.origin;
    if (!src) return;
    if (!bySource.has(src)) bySource.set(src, []);
    bySource.get(src).push(i);
  });
  for (const g of bySource.values()) {
    if (g.length < 2) continue;
    if (g.length <= 6) {
      for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) push(g[i], g[j]);
    } else {
      for (let j = 1; j < g.length; j++) push(g[0], g[j]);
    }
  }

  const byConcept = new Map();
  objects.forEach((o, i) => {
    for (const c of o.raw.related_concepts ?? []) {
      const k = String(c).trim().toLowerCase();
      if (!k) continue;
      if (!byConcept.has(k)) byConcept.set(k, []);
      byConcept.get(k).push(i);
    }
  });
  for (const g of byConcept.values()) {
    if (g.length < 2 || g.length > 8) continue; // >8 objects = concept too generic to draw
    for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) push(g[i], g[j]);
  }

  const degree = new Array(objects.length).fill(0);
  for (const [a, b] of links) { degree[a]++; degree[b]++; }
  return {
    nodes: objects.map((o, i) => ({ i, schema: o.schema, hr: o.high_risk, degree: degree[i] })),
    links,
  };
}
