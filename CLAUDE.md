# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ECSESS Website - the official site for McGill University's Engineering and Computer Science Students' Society. Built with SvelteKit 2, Svelte 5, TailwindCSS 4, and Sanity CMS.

## Commands

```bash
bun i                    # Install dependencies
bun run dev              # Start dev server (localhost:5173)
bun run build            # Production build
bun run check            # TypeScript type checking
bun run format           # Format with Prettier
bun run lint             # Check formatting
```

## Environment Setup

Copy `.env.example` to `.env` and set `SANITY_ID` (get from VP Technical Development or VP Communications).

## Architecture

### Data Flow

- **Server-side data fetching**: Each route uses `+page.server.ts` to fetch from Sanity CMS via GROQ queries
- **CMS client**: `src/lib/utils.ts` exports `getFromCMS(query)` for all Sanity fetches
- **Type definitions**: `src/lib/schemas.ts` contains all TypeScript types for CMS data

### Key Patterns

**GROQ Query Pattern** (used in all `+page.server.ts` files):

```typescript
import { getFromCMS } from '$lib/utils.js';

const query = `*[_type == "events"]{ name, date, ... }`;

export const load = async ({ url }) => {
	const data = await getFromCMS(query);
	return { data, canonical: url.href };
};
```

**Image URLs**: Always append Sanity optimization params: `?h=800&fm=webp`

**Svelte 5 Runes**: Project uses `$props()`, `$state()`, and `{@render}` syntax

### Path Aliases

- `components` → `src/components/`
- `assets` → `src/assets/`
- `$lib` → `src/lib/`

### Component Organization

- `src/components/layout/` - NavBar, Footer, Section, SeoMetaTags
- `src/components/homepage/` - Sponsors, FAQAccordion, Gallery, AffiliatedGroups
- `src/components/council/` - CouncilCard, CouncilAvatar, CouncilCardPopUp
- `src/components/event/` - EventBlock, EventTabsContent

### Custom Colors

TailwindCSS theme includes `ecsess-*` color palette (greens 50-950) defined in `src/app.css`.

## Routes

- `/` - Homepage with council photo, office hours, sponsors, FAQs
- `/council` - Council member directory
- `/events` - Event listings with category filtering
- `/resources` - External resources
- `/join` - Membership info
- `/r/[shortname]` - URL shortener redirects (managed via CMS)

## Coding Standards

- **Specification & Clarification (CRITICAL)**:
  - **Ask Questions**: The agent **MUST** ask for clarification if the prompt is ambiguous, vague, or lacks sufficient detail.
  - **Maximize Detail**: Require as much detail as possible from the user regarding functionality, design preferences, and edge cases before coding.
  - **Confirm Plan**: Before implementing complex changes, re-state the requirements to the user to ensure alignment.
- **Svelte Components**:
  - Use `snippets` for repeated markup within a file.
  - Ensure accessibility (a11y) attributes are present.
  - Type all props using `$props()`.
- **TypeScript**:
  - Strict typing is encouraged. Avoid `any`.
  - Define interfaces/types in `src/lib/types` or colocated with components if specific.

## 6. UI/UX Philosophy

- **Premium & Modern**: The design should feel high-quality. Use smooth transitions, subtle hover states, and the specific color palette to maintain brand identity.
- **Responsive**: Mobile responsiveness is a strict requirement. Always verify layouts on small screens.
- **Consistency**: Maintain consistency in design and functionality throughout the website.
