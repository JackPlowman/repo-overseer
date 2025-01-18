// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  site: "https://jackplowman.github.io",
  base: "repo-overseer",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    robotsTxt(),
  ],
})
