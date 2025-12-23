# repo-overseer

Dashboard for keeping multiple GitHub repositories healthy at a glance. Built with Astro + React, it ships a sortable, paginated table that surfaces repo hygiene signals (open PRs/issues, key files, security settings) and is pre-configured for GitHub Pages at `jackplowman.github.io/repo-overseer`.

## Table of Contents

- [repo-overseer](#repo-overseer)
  - [Table of Contents](#table-of-contents)
  - [What you get](#what-you-get)
  - [Quick start (dashboard)](#quick-start-dashboard)
    - [Data shape (dashboard/src/data/repositories.json)](#data-shape-dashboardsrcdatarepositoriesjson)
  - [Running the tests](#running-the-tests)
  - [Useful commands](#useful-commands)
  - [Project structure](#project-structure)
  - [Deployment notes](#deployment-notes)


## What you get
- Three-tab view (Details, Key Files, Security) powered by TanStack Table with sorting and pagination.
- Static JSON data source so you can publish a snapshot without backend dependencies.
- Astro 5 + Tailwind CSS 4 styling with lightweight shadcn-inspired UI components.
- E2E checks via pytest + Playwright hitting the deployed site by default.

## Quick start (dashboard)
1) Prereqs: Node 24.5+, npm 11.5+. Optional: `just` for the convenience recipes in [dashboard/dashboard.just](dashboard/dashboard.just).
2) Install: `cd dashboard && npm install` (or `npm ci`).
3) Add data: create `dashboard/src/data/repositories.json` (gitignored) using the schema below.
4) Run locally: `npm run dev -- --host --port 8000` (port 8000 matches the test defaults). Navigate to http://localhost:8000/repo-overseer/.
5) Build: `npm run build` writes `dashboard/dist/` for GitHub Pages (site/base already set in [dashboard/astro.config.mjs](dashboard/astro.config.mjs)).
6) Preview build: `npm run preview -- --host --port 8000`.

### Data shape (dashboard/src/data/repositories.json)
`src/data` ignores JSON files so you can store private repo metadata locally. Supply an array of repositories with nested detail blocks:

```json
[
  {
    "name": "actions-status",
    "full_name": "JackPlowman/actions-status",
    "repository_link": "https://github.com/JackPlowman/actions-status",
    "repository_details": {
      "open_pull_requests": 0,
      "open_issues": 2
    },
    "repository_key_files": {
      "has_license": true,
      "has_readme": true,
      "has_security_policy": true,
      "has_code_of_conduct": false,
      "has_contributing": true,
      "has_project_technologies": false
    },
    "repository_security_details": {
      "secret_scanning_push_protection": true,
      "secret_scanning": true,
      "dependabot_security_updates": true,
      "private_vulnerability_disclosures": false,
      "code_scanning_alerts": 0
    }
  }
]
```

## Running the tests
- UI tests live in [tests/ui](tests/ui) and default to the deployed site at https://jackplowman.github.io/repo-overseer.
- Prereqs: Python 3.13, [uv](https://github.com/astral-sh/uv), and browser binaries via Playwright.
- Install once: `cd tests && uv sync --all-extras && uv run playwright install --with-deps`.
- Run against deployed site: `uv run pytest ui -vv --reruns 2 --browser chromium`.
- Run against local dev server: start the dashboard on port 8000, then `just tests::run-local`.

## Useful commands
- Dashboard: `just dashboard::dev`, `just dashboard::lint`, `just dashboard::prettier-check`.
- Tests: `just tests::install`, `just tests::run-ci chromium`, `just tests::ruff-checks`.
- Repo-wide helpers: `just prettier-check`, `just lefthook-validate`, `just gitleaks-detect`.

## Project structure
- [dashboard](dashboard): Astro frontend and UI components.
- [tests](tests): Playwright-based E2E checks, pytest configuration, and helper justfile.
- [docs](docs): meta docs (conduct, security, conventional commits).
- [images](images): branding assets.

## Deployment notes
- The Astro config sets `site` and `base` for GitHub Pages; running `npm run build` creates a `/repo-overseer`-ready bundle.
- Robots.txt and sitemap generation are handled by `astro-robots-txt` and `@astrojs/sitemap` during build.
