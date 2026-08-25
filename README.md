# ECSESS Website

The official open-source website for the Electrical, Computer & Software Engineering Students' Society (ECSESS) at McGill University.

## Technical Stack

- [Bun](https://bun.sh) — package manager and runtime
- SvelteKit 2 + Svelte 5 (runes)
- Tailwind CSS v4
- Sanity CMS for content management
- [Lucide](https://lucide.dev/icons/) for icons
- Vercel for deployment

See [AGENTS.md](./AGENTS.md) for project conventions, design system, and CMS patterns.

## Development

```bash
bun install
bun run dev
```

Requires `SANITY_ID` in environment (set in Vercel for production).
