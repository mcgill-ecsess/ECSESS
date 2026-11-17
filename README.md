# ECSESS Website

The official open-source website for the Electrical, Computer & Software Engineering Students' Society (ECSESS) at McGill University.

## Technical Stack

- [Node.js](https://nodejs.org) `24.x` — build and serverless runtime
- [Bun](https://bun.sh) — package manager and formatter (`bun fmt`)
- SvelteKit 3 + Svelte 5 (runes) + Vite 8
- Tailwind CSS v4
- Sanity CMS for content management
- [Lucide](https://lucide.dev/icons/) for icons
- Vercel for deployment (`nodejs24.x`)

See [AGENTS.md](./AGENTS.md) for project conventions, design system, and CMS patterns.

## Development

Requires Node.js `24.x`, Bun (`>= 1.4.4` for `bun fmt`), and `SANITY_ID` in the environment (e.g. `.env` locally, Vercel project settings in production).

> **Note:** Node.js **v24 (`24.x`) is required for Vercel deployment**. Vercel builds and executes SvelteKit serverless functions on `nodejs24.x` (pinned in `package.json` `engines.node` and `@sveltejs/adapter-vercel` in `vite.config.js`), so Vite/SvelteKit scripts must run on Node 24 rather than the Bun runtime (`bunx --bun`).

```bash
bun install
bun run dev      # dev server
bun run check    # svelte-check + typecheck
bun run build    # production build
bun run format   # format with bun fmt
bun run lint     # check formatting
```
