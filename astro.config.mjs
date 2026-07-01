import { defineConfig } from "astro/config";

export default defineConfig({
  // Org root page → served at https://refibcn.github.io/ (base "/").
  // Swap to the custom domain (refibcn.cat) when DNS is wired.
  site: "https://refibcn.github.io",
  output: "static",
  build: { format: "directory" },
});
