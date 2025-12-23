# repo-overseer dashboard

Astro + React frontend that renders the repo health dashboard. It serves a sortable, paginated table with Details, Key Files, and Security tabs backed by a local JSON data set.

## Prerequisites
- Node 24.5+ and npm 11.5+
- Optional: `just` for the recipes in [dashboard.just](./dashboard.just)

## Setup
1. Install deps: `npm install` (or `npm ci`).
2. Add data: create [src/data/repositories.json](./src/data/repositories.json) using the schema shown in the root README.
3. Run dev server (port 8000 matches tests): `npm run dev -- --host --port 8000` then open [http://localhost:8000/repo-overseer/](http://localhost:8000/repo-overseer/).
4. Lint: `npm run lint`.
5. Format check: `npm run prettier-check`.

## Build and preview
- Build for GitHub Pages: `npm run build` (uses `site` and `base` in [astro.config.mjs](./astro.config.mjs)).
- Preview the built site locally: `npm run preview -- --host --port 8000`.

## Data file expectations
- Place repo snapshots in [dashboard/src/data/repositories.json](dashboard/src/data/repositories.json); the folder is gitignored so you can keep private metadata out of the repo.
- Each entry should include repository details, key files booleans, and security flags. See the root README for a full example payload.

## Notes
- UI components live under [dashboard/src/components](dashboard/src/components) and use TanStack Table plus shadcn-inspired primitives.
- Styles come from Tailwind CSS 4 (see [dashboard/src/styles/globals.css](dashboard/src/styles/globals.css)).
- The layout is configured for GitHub Pages at `jackplowman.github.io/repo-overseer`; no extra path tweaks are needed for publishing.
