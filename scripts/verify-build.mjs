// scripts/verify-build.mjs
// Quick integrity checks on the static build output. Runs after `npm run build`.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const REQUIRED = [
  "index.html",
  "about/index.html",
  "indicators/index.html",
  "actors/index.html",
  "programs/regenerant-catalunya/index.html",
  "programs/regenerant-catalunya/article/index.html",
  "geo/catalunya-comarques.geojson",
  "CNAME",
];

let failed = false;
for (const path of REQUIRED) {
  const full = join(DIST, path);
  if (!existsSync(full)) {
    console.error(`MISSING: ${full}`);
    failed = true;
  } else {
    console.log(`OK:      ${full}`);
  }
}

// Sanity: cohort page must reference all 11 projects by id.
const cohort = readFileSync(join(DIST, "programs/regenerant-catalunya/index.html"), "utf8");
const expectedIds = [
  "regeneracio-xyz", "resilience-earth", "de-bat-a-bat", "chapter-2", "anigami", "mixite",
  "laurel-31", "la-marmita", "les-juntes", "la-suculenta", "la-granja-del-tilo",
];
for (const id of expectedIds) {
  if (!cohort.includes(`data-project-id="${id}"`)) {
    console.error(`COHORT MISSING ID: ${id}`);
    failed = true;
  }
}
console.log(`COHORT IDs: ${expectedIds.length} expected, ${expectedIds.filter((id) => cohort.includes(id)).length} found`);

process.exit(failed ? 1 : 0);
