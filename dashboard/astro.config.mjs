// @ts-check
import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: "https://jackplowman.github.io",
  base: "repo-overseer",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
