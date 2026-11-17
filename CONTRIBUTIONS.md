# Contribution Guide

The website development is under the portfolio of ECSESS VP Technical Development. For content requests, please refer to VP Communications for content management.
This document outlines the developer guide to contribute to the ECSESS website project. Developers can choose to contribute either by (1) working as an internal team member of ECSESS Website Subcommittee (make a branch and open a PR), or (2) contributing as an external open-source contributor (fork the repo and open a PR).

---

## Prerequisite knowledge

- Node.js `24.x` and [`bun`](https://bun.sh) (`>= 1.4.4`). **Node.js v24 is required for Vercel deployment** — Vercel builds and runs our SvelteKit serverless functions on `nodejs24.x` (pinned in `package.json` `engines.node` and `vite.config.js`), so Vite/SvelteKit scripts must run on Node 24 rather than `bun --bun`, while `bun` is used for package management (`bun install`) and formatting (`bun fmt`).
- Svelte 5 (runes) & SvelteKit: Follow the tutorial at https://svelte.dev/tutorial/svelte/welcome-to-svelte

## Collaboration workflow

- Branches:
  - `main`: Production/default branch on the ECSESS organization.
  - All development branches: If you're working on an issue, **name your branch accordingly** so that we know what feature or fix it covers.
- Pull Requests (PRs) & Code Review:
  - Before opening or updating a PR, run `bun run format` and `bun run check` locally. CI checks formatting (`bun run lint`), types (`bun run check`), and production builds (`bun run build`) on Node.js `24.x`.
  - Once your feature is complete, open a PR against `main`. Describe the changes made and link any relevant issues.
  - At least one code review approval from ECSESS dev team members is required before merging.
  - After merging, delete the feature branch to keep the repository clean.

## Tech stack

- SvelteKit 3 + Svelte 5 (runes) + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Node.js `24.x` runtime (local build & Vercel `nodejs24.x` Serverless Functions)
- [`bun`](https://bun.sh) for package management (`bun install`) and formatting (`bun fmt`, configured in `bunfig.toml`)
- Content Management System: Sanity (`@sanity/client`)
- Icons: [Lucide](https://lucide.dev/icons/) (`@lucide/svelte`)

See [AGENTS.md](./AGENTS.md) for full project layout, `#lib/*` / `#assets/*` import aliases, component conventions, and design system rules.

## Development guide

- Ensure you are on Node.js `24.x` (`node -v`) and have Bun installed (`bun -v`).
- Clone the repo and install dependencies:

```bash
git clone https://github.com/mcgill-ecsess/ECSESS.git # or use SSH
cd ECSESS
bun install
```

- Create `.env` by copying `.env.example`
- Add the Sanity CMS project ID `SANITY_ID=the_project_id` — contact VP TechDev or VP Comms for this info (declared for SvelteKit in `src/env.js`)
- Start the dev server locally at `http://localhost:5173`:

```bash
bun run dev
```

- Format and typecheck your changes before committing:

```bash
bun run format   # format files with bun fmt
bun run lint     # verify formatting
bun run check    # svelte-kit sync + svelte-check
```

- Build and preview a production version of the website (optional locally, as Vercel builds preview deployments automatically on PRs):

```bash
bun run build
bun run preview
```

---

## Content Management

- See `ecsess-sanity-studio` for the development of the Sanity CMS studio.
- Schemas are defined in `src/lib/schemas.ts` as reference based on what is configured in the Sanity studio.
- Server-side Sanity queries use `getFromCMS()` from `#lib/utils` inside `+page.server.ts` / `+layout.server.ts` (never in client components). Loaded data is read via `let { data } = $props()` in `+page.svelte`.

---

## UI Designs

### Figma

- The [original Figma design can be found here](https://www.figma.com/design/tomzJ7nLU4KCkojf2vM6xq/ECSESS-Website?node-id=0-1&t=wph9RdHLmvAW6rld-1)

### Colour Palette

- The site is dark-mode only and uses custom Tailwind CSS v4 `@theme` colour tokens in `src/app.css` (use `ecsess-*` utility classes rather than raw hex values):

| HEX CODE | Variable name              |
| -------- | -------------------------- |
| #e8ffd9  | --color-ecsess-50          |
| #cce7ba  | --color-ecsess-100         |
| #bae9a5  | --color-ecsess-150         |
| #a9d0a0  | --color-ecsess-200         |
| #9cc295  | --color-ecsess-250         |
| #8fb98a  | --color-ecsess-300         |
| #7daa7a  | --color-ecsess-350         |
| #6a9a6a  | --color-ecsess-400         |
| #62925a  | --color-ecsess-450         |
| #5a8b5a  | --color-ecsess-500         |
| #4c7a4f  | --color-ecsess-550         |
| #3f6a3f  | --color-ecsess-600         |
| #306032  | --color-ecsess-650         |
| #2f4d29  | --color-ecsess-700         |
| #1c4a1e  | --color-ecsess-750         |
| #0a3d2a  | --color-ecsess-800         |
| #083525  | --color-ecsess-850         |
| #062c20  | --color-ecsess-900         |
| #031c15  | --color-ecsess-950         |
| #1f1f1f  | --color-ecsess-black       |
| #161917  | --color-ecsess-black-hover |

### Typography

- The website uses the [Saira](https://fonts.google.com/specimen/Saira) font family (with Noto Sans Symbols fallback) from Google Fonts.
- Instead of the Tailwind Typography plugin, prose styles are defined in `src/app.css` via the `.typography` class.
