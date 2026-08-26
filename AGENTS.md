# ECSESS Website — Agent Instructions

Official site for the Electrical, Computer & Software Engineering Students' Society (ECSESS) at McGill University.

## Stack

- **Runtime / package manager:** Bun (`bun install`, `bun run dev`)
- **Framework:** SvelteKit 2 + Svelte 5 (runes enabled in `svelte.config.js`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` — theme tokens in `src/app.css`
- **CMS:** Sanity (`@sanity/client`) — server-side only via `$lib/utils.ts`
- **Icons:** `@lucide/svelte`
- **Rich text:** `@portabletext/svelte` via `$lib/components/RichText.svelte`
- **Deploy:** Vercel (`@sveltejs/adapter-vercel`)

## Commands

```bash
bun run dev      # dev server
bun run build    # production build
bun run check    # svelte-check + typecheck
bun run format   # Prettier
bun run lint     # Prettier check
```

After completing an implementation, run `bun run format` so changes match project Prettier conventions before finishing.

Requires `SANITY_ID` in env (see `.env.example` if present; set in Vercel for production).

## Project layout

```
src/
  app.css              # Tailwind @theme, typography, global styles
  lib/
    components/        # Shared UI (Button, Link, layout/*, EventTabsTrigger)
    format.ts          # McGill semester labels
    events.ts          # Event date formatting and link helpers
    theme.ts           # Chart colors matching ecsess-* tokens
    schemas.ts         # TypeScript types for CMS documents
    utils.ts           # Sanity client + getFromCMS()
    assets.ts          # Static asset helpers (partnership logos, event images)
  routes/
    +layout.svelte     # NavBar, Footer, PageThumbnail wrapper
    components/        # Homepage-only components (+page.svelte)
    {route}/
      +page.svelte
      +page.server.ts  # CMS load functions (when data needed)
      components/      # Route-specific components
  assets/              # Imported static files (alias: `assets/...`)
```

**Import conventions**

- Shared components: `$lib/components/...`
- Page-specific components: `./components/...` (relative to the route)
- Static assets: `assets/...` (svelte.config alias)
- Types: `$lib/schemas`
- CMS fetch: `$lib/utils` → `getFromCMS(query)`

Do not reintroduce a top-level `src/components/` folder or a `components/` path alias.

## Design system

### Dark mode only

The site is **forced dark mode at all times**. Do not add a light theme, theme toggle, or `prefers-color-scheme` light variants. Design and implement for dark green / near-black surfaces with light text (`ecsess-*` on dark sections). UI should assume dark backgrounds always.

### Colors

Custom palette `ecsess-*` defined in `src/app.css` `@theme`:

| Token range                           | Use                                       |
| ------------------------------------- | ----------------------------------------- |
| `ecsess-50`–`200`                     | Light backgrounds, cards, scrollbar thumb |
| `ecsess-250`–`400`                    | Borders, hovers, accents                  |
| `ecsess-450`–`650`                    | Buttons, interactive elements             |
| `ecsess-700`–`950`                    | Text on light bg, dark section gradients  |
| `ecsess-black` / `ecsess-black-hover` | Near-black UI surfaces                    |

Use semantic Tailwind classes (`bg-ecsess-800`, `text-ecsess-200`) — never hardcode hex in components.

### Soft surfaces (preferred for cards / calendars / panels)

On dark sections, prefer **soft** treatments over harsh solid blocks:

- Surfaces: `bg-ecsess-950/40`–`/50` with `border-ecsess-800/60`–`/70`
- Corners: `rounded-2xl` for cards/panels; `rounded-xl` for chips, buttons-in-cards, hour blocks
- Body copy on dark: `text-ecsess-200` / `text-ecsess-300` (not near-white for long text)
- Interactive fills on dark calendars/lists: translucent mid-green (e.g. `bg-ecsess-600/75`), **not** bright mint (`ecsess-100` / `ecsess-50` fills)
- Sticky columns that sit over scrolling content: use **opaque** `bg-ecsess-950` so labels stay readable

**No nested cards:** do not wrap a bordered/rounded panel inside another card. Use one outer shell **or** flush content — not both.

### No eyebrow

**Do not** put uppercase tracking eyebrow labels above page titles or section titles (e.g. no `ECSESS`, `Our Community`, `Campus & Beyond`).

- `PageHeader` is title + optional description only
- Section headers are title + optional supporting subtitle only
- Avoid `text-xs font-bold tracking-[0.2em] uppercase` above titles

Supporting subtitles under section titles are fine, e.g.:

```svelte
<h2 class="text-ecsess-50 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
<p class="text-ecsess-300 mt-3 text-sm leading-relaxed sm:text-base">{subtitle}</p>
```

### Typography

- **Font:** Saira (+ Noto Sans Symbols fallback), weight 500 default
- **Page titles:** `.page-title` or `text-4xl md:text-5xl lg:text-6xl font-bold`
- **Section headings:** `h1`/`h2` global styles in `app.css`
- **CMS / rich content:** wrap in `.typography` for prose styling

### Page layout

Every page follows this pattern:

1. `<SeoMetaTags title description canonical={data.canonical} />`
2. One or more `<Section from="..." to="..." via="..." direction="to-b" contentStart={true}>` wrappers
3. `<PageHeader title="..." description="..." />` on content pages (no eyebrow)
4. Inner content in `max-w-7xl` containers with left-aligned headers on content pages

`Section` (`$lib/components/layout/Section.svelte`) renders full-viewport gradient bands. Homepage stacks dark-to-light green gradients top-to-bottom; inner pages often use solid dark (`from-ecsess-black`).

Standard page header — use `PageHeader` or this markup:

```svelte
<PageHeader title="Resources" description="Optional subtitle." />
```

### UI primitives

- **Button** — `$lib/components/Button.svelte` — green filled, rounded
- **Link** — `$lib/components/Link.svelte` — pass `external={true}` for off-site
- **EventTabsTrigger** — shared pill/tab filter used on Events and Resources pages
- **PageHeader** — `$lib/components/layout/PageHeader.svelte` — title + optional description (no eyebrow)

### Homepage: Lounge Office Hours

Components: `src/routes/components/OHSchedule.svelte`, `OHBlock.svelte`.

- Soft outer rounded shell around the schedule; **no** inner card around the grid
- Opaque sticky time column (`bg-ecsess-950`) for horizontal scroll on small screens
- Bright time labels (`text-ecsess-100` / `200`); no “Time” header word in the corner
- Hour blocks: soft translucent mid-green, `rounded-xl`, higher opacity so names stay readable
- Semester label (`ohLastUpdated` / `#office-hours-semester`) lives with the section heading, not inside the table unless explicitly requested
- Prefer fitting the calendar to viewport width when possible; keep sticky time readable if days scroll

Svelte note: opacity modifiers break `class:` directives — prefer ternaries in `class="..."` instead of `class:border-ecsess-700/40={cond}`.

### Partnership page notes

- Section title for demographics: **Student Demographics** (not “Our community / audience”)
- Demographics chart + department stats sit **flush** (no outer card around that block)
- Brand logo marquee: keep logos tall enough (`h-20` / `sm:h-24`)
- Shared section heading pattern: title + supporting subtitle only

### Homepage: Subcommittees & Affiliated Groups

`src/routes/components/AffiliatedGroups.svelte` — soft translucent cards (`bg-ecsess-950/40`), muted borders, `rounded-2xl` cards / icon wells, `rounded-xl` link chips.

Data comes from CMS `homepage.subcommittees[]` (`name`, `description`, `highlights`, `instagram`, `website`, `icon`) via `+page.server.ts`. Map `icon` strings to Lucide components in the UI (`code`/`codexml` → CodeXml, `wrench`/`factory` → Wrench, `users`/`bits` → Users, `cpu`/`ieee` → Cpu; default Users). Hide the section when the array is empty.

## Sanity CMS

Client config in `$lib/utils.ts`:

- `projectId`: `$env/static/private` → `SANITY_ID`
- `dataset`: `production`
- `useCdn`: `true`
- `apiVersion`: `2025-02-06`

Fetch only in `+page.server.ts` / `+layout.server.ts` — never in client components.

```ts
import { getFromCMS } from '$lib/utils.js';
import type { Resource } from '$lib/schemas';

const query = `*[_type == "resources"] | order(title asc) { title, url, description, category }`;
const resources: Resource[] = await getFromCMS(query);
```

### Document types

| `_type`       | Used on               | Key fields                                                                  |
| ------------- | --------------------- | --------------------------------------------------------------------------- |
| `homepage`    | `/`, layout thumbnail | `councilPhoto`, `councilGoofyPic`, `faqs`, `subcommittees`                  |
| `officeHours` | `/`                   | `day`, `startTime`, `endTime`, `member` (ref)                               |
| `sponsors`    | `/`                   | `name`, `url`, `logo` (asset)                                               |
| `members`     | `/council`            | `name`, `email`, `position`, `image`, `yearProgram`, `linkedin`             |
| `events`      | `/events`             | `name`, `category`, `date`, `location`, `description`, `links`, `thumbnail` |
| `resources`   | `/resources`          | `title`, `url`, `description`, `category` (string \| string[])              |
| `devTeam`     | `/devteam`            | `name`, `role`, `term`, `github`, `image`, `active`                         |
| `redirects`   | `/r/[shortname]`      | `shortname`, `url`                                                          |

Image URLs: append Sanity transforms — e.g. `"image": image.asset->url+"?h=750&fm=webp"`.

Combined queries (homepage) return nested objects; single-type queries return arrays.

Types live in `$lib/schemas.ts` — add new CMS shapes there before using in load functions.

## Svelte 5 conventions

- Use runes: `$props()`, `$state()`, `$derived()`, `$effect()`
- Prefer `{@render children()}` over slots
- Server data via `let { data } = $props()` in pages
- Keep page logic in `+page.server.ts`; pages focus on presentation
- Minimize scope — match existing patterns before adding abstractions

## Skills & tool-specific files

| File                        | Tool                                           |
| --------------------------- | ---------------------------------------------- |
| `AGENTS.md` (this file)     | Codex, Cursor, Copilot, and others             |
| `CLAUDE.md`                 | Claude Code — imports this file                |
| `.cursor/rules/*.mdc`       | Cursor glob-scoped rules                       |
| `.cursor/skills/*/SKILL.md` | Cursor project skills (Sanity, design, Svelte) |

When editing `.svelte` files, follow `.cursor/rules/svelte.mdc` and use the Svelte MCP tools when available.

## Guardrails

- Do not commit secrets (`.env`, API keys)
- CMS queries and transforms stay server-side
- Match the green gradient aesthetic — no one-off color palettes
- Co-locate new route components under `src/routes/{route}/components/`
- Only add shared components to `src/lib/components/` when used by 2+ routes
- Run `bun run format` after implementations
- **Component inspection markers:** big components expose their Svelte name on the root DOM node for DevTools:
  - Singletons: `id="ComponentName"` and `data-component="ComponentName"` (e.g. `NavBar`, `OHSchedule`, `Partners`)
  - Repeated instances: `data-component="ComponentName"` only (e.g. `ResourceCard`, `OHBlock`, `EventBlock`) — do not reuse the same `id`
  - `Section` always has `data-component="Section"` and accepts an optional `id` prop when a landmark is useful
  - Prefer the exact `.svelte` filename (PascalCase) so inspectors map 1:1 to source files
