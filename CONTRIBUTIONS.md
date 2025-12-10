# Contribution Guide

The website development is under the portfolio of ECSESS VP Technical Development. For content request, please refer to VP Communications for the content management.
This document outlines the developer guides to contribute to the ECSESS website project. Developers can choose to contribute either by (1) working as an internal team member of ECSESS Website Subcommittee (make a branch and open PR), or (2) contributing as an external open-source contributor (fork the repo and open a PR).

---

## Prerequisite knowledge

- `npm` knowledge. We use `bun` for this project. See https://bun.sh for installation guide.
- Svelte & SvelteKit: Follow the tutorial here: https://svelte.dev/tutorial/svelte/welcome-to-svelte

## Collaboration workflow

- Branches:
  - `main` The development of the site, default branch on ECSESS org.
  - All development branches: If you're working on an issue, **name your branch accordingly** so that we know what feature it is.
- Pull Requests (PRs) & Code Review:
  - Once your feature is complete, open a PR against `main`. Ensure to describe the changes made and link any relevant issues.
  - At least one code review approval from ECSESS dev team members is required before merging.
  - After merging, delete the feature branch to keep the repository clean.

## Tech stack

- SvelteKit (Svelte v5, Kit v2)
- TailwindCSS (v4.0)
- [`bun`](https://bun.sh) as Node.js package manager (similar to `npm`, `yarn`, `pnpm`, and `deno` v2)
- Content Management System: Sanity

## Development guide

- Clone the repo and install dependencies, and start dev environment:

```bash
git clone https://github.com/mcgill-ecsess/ecsess-site.git # or use SSH
cd ecsess-site
bun i
```

- Create `.env` by copy `.env.example`
- Add the Sanity CMS project ID `SANITY_ID=the_project_id` -- Contact VP TechDev or VP Comms for this info
- See the development website locally at `localhost:5173`:

```sh
bun run dev
```

- To build and preview a production version of the website. This step is optional as Vercel handles the build and preview deployment automatically as you commit to a PR.

```bash
bun run build
bun run preview
```

---

# Content Management

- See `ecsess-sanity-studio` for the development of the Sanity CMS studio.
- Schemas are defined in `src/lib/schemas.ts` as reference based on what is configured in the Sanity studio
- Each `+page.svelte` (client-side/frontend) has a corresponding `+page.server.ts` (server-side/backend) that fetches the content from Sanity CMS using GROQ queries. This data is loaded to `data` variable that can be accessed in the Svelte component.

---

## UI Designs

### Figma

- The [original Figma design can be found here](https://www.figma.com/design/tomzJ7nLU4KCkojf2vM6xq/ECSESS-Website?node-id=0-1&t=wph9RdHLmvAW6rld-1)

### Colour Palette

- The website relies on TailwindCSS custom colour variables:

| HEX CODE | Variable name              |
| -------- | -------------------------- |
| #e8ffd9  | --color-ecsess-50          |
| #cce7ba  | --color-ecsess-100         |
| #a9d0a0  | --color-ecsess-200         |
| #8fb98a  | --color-ecsess-300         |
| #6a9a6a  | --color-ecsess-400         |
| #5a8b5a  | --color-ecsess-500         |
| #3f6a3f  | --color-ecsess-600         |
| #2d5a2d  | --color-ecsess-700         |
| #0a3d2a  | --color-ecsess-800         |
| #062c20  | --color-ecsess-900         |
| #031c15  | --color-ecsess-950         |
| #1f1f1f  | --color-ecsess-black       |
| #161917  | --color-ecsess-black-hover |

### Typography

- The website uses the Saira font family from Google Fonts:
  - Saira: https://fonts.google.com/specimen/Saira

- Instead of using TailwindCSS Typography plugin, we define our own typography styles in `src/app.css`, via `.typography` class.
