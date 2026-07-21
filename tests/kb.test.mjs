import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadKb, facets, graphData } from "../src/lib/kb.mjs";
import { publishableKb } from "../src/lib/kb.mjs";

// fileURLToPath, not .pathname — the checkout path contains spaces ("03 Libraries").
const FIX = fileURLToPath(new URL("./fixtures/kb/", import.meta.url));

test("loadKb normalizes + sorts", () => {
  const o = loadKb(FIX);
  assert.equal(o.length, 3);
  assert.deepEqual(o.map(x => x.title), ["Alpha Resource", "Zeta Resource", "Beta Signal"]);
  const z = o.find(x => x.slug === "zeta-resource");
  assert.equal(z.high_risk, true);
  assert.equal(z.origin, "https://example.org/doc-a");
  assert.equal(z.summary, "A test guide about funding.");
  const a = o.find(x => x.slug === "alpha-resource");
  assert.equal(a.summary, "A governance tool.");
  assert.equal(a.origin, "https://example.org/alpha");
  assert.equal(o.find(x => x.slug === "beta-signal").subtype, "status-unknown");
});

test("facets", () => {
  const f = facets(loadKb(FIX));
  assert.deepEqual(f.schemas, ["resource", "signal"]);
  assert.deepEqual(f.domains, ["funding", "governance"]);
  assert.equal(f.highRisk, 1);
});

test("graphData: same-source + shared-concept edges, deduped", () => {
  const o = loadKb(FIX);
  const g = graphData(o);
  assert.equal(g.nodes.length, 3);
  const keys = g.links.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`).sort();
  // zeta(1)+beta(2) share wo-aaa; zeta(1)+alpha(0) share concept "quadratic funding"
  assert.deepEqual(keys, ["0-1", "1-2"]);
  assert.equal(g.nodes[1].degree, 2);
});

test("smoke: real store", { skip: !existsSync("../../data/kb/index.json") }, () => {
  const o = loadKb("../../data/kb/");
  assert.equal(o.length, 422);
  assert.ok(o.every(x => x.title && x.schema && x.slug));
  const g = graphData(o);
  assert.ok(g.links.length > 100 && g.links.length <= 4000,
    `links out of expected range: ${g.links.length}`);
});

// Synthetic normalized objects (loadKb output shape) — publishableKb is pure.
const mk = (over = {}) => ({
  id: "resource/x", schema: "resource", slug: "x", title: "X", subtype: "",
  domain: "", maturity: "reviewed", high_risk: false, summary: "", origin: "",
  ...over,
  raw: { publish: true, ai_assisted: false, ...(over.raw ?? {}) },
});
const boundary = (tier, raw = {}) => mk({
  id: "public-use-boundary/b", schema: "public-use-boundary", slug: "b",
  maturity: "boundary", raw: { tier, ...raw },
});

test("publishableKb: fully-cleared reviewed object passes", () => {
  assert.equal(publishableKb([mk()]).length, 1);
});

test("publishableKb: default-deny branches", () => {
  assert.equal(publishableKb([mk({ maturity: "raw" })]).length, 0, "raw");
  assert.equal(publishableKb([mk({ maturity: "weird-state" })]).length, 0, "unknown maturity");
  assert.equal(publishableKb([mk({ raw: { ai_assisted: true } })]).length, 0, "ai_assisted uncleared");
  assert.equal(publishableKb([mk({ raw: { publish: false } })]).length, 0, "publish false");
  assert.equal(publishableKb([mk({ raw: { publish: undefined } })]).length, 0, "publish missing");
  assert.equal(publishableKb([boundary("public")]).length, 0, "boundaries never render");
});

test("publishableKb: paired boundary verdicts (via shared work_order)", () => {
  const obj = mk({ raw: { work_order: "wo-1" } });
  const internalB = boundary("internal-only", { work_order: "wo-1" });
  const publicB = boundary("public", { work_order: "wo-1" });
  assert.equal(publishableKb([obj, internalB]).length, 0, "internal boundary denies");
  assert.equal(publishableKb([obj, boundary("garbled???", { work_order: "wo-1" })]).length, 0, "uninterpretable tier denies");
  assert.equal(publishableKb([obj, publicB]).length, 1, "public boundary allows");
});

test("publishableKb: high-risk requires explicit public boundary", () => {
  const hr = mk({ high_risk: true, raw: { work_order: "wo-2" } });
  assert.equal(publishableKb([hr]).length, 0, "high-risk w/o boundary denies");
  assert.equal(publishableKb([hr, boundary("public", { work_order: "wo-2" })]).length, 1, "cleared high-risk passes");
});

test("publishableKb: real store yields ZERO public objects today", { skip: !existsSync("../../data/kb/index.json") }, () => {
  assert.equal(publishableKb(loadKb("../../data/kb/")).length, 0);
});
