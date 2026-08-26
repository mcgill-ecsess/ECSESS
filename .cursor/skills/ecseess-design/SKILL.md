---
name: ecseess-design
description: Apply ECSESS visual design — green color palette, typography, Section gradients, and page layout patterns. Use when styling pages, adding sections, or matching the site's look and feel.
---

# ECSESS Design System

## Dark mode only

The site is forced dark mode at all times — no light theme, theme toggle, or light `prefers-color-scheme` variants. Always design for dark green / near-black surfaces with light text.

## Colors

All colors are Tailwind tokens from `src/app.css` `@theme`. Use `ecsess-{50..950}` and `ecsess-black`.

- Dark sections: `ecsess-black`, `ecsess-800`–`950`
- Body text on dark: `text-ecsess-100` / `text-ecsess-200`
- Accents / labels: `text-ecsess-500`, `text-ecsess-50` for emphasis
- Cards: `bg-ecsess-black border-ecsess-800`
- Buttons: `bg-ecsess-600 hover:bg-ecsess-700 text-ecsess-50`

## Typography

- Font: Saira (global in `app.css`)
- Page hero: `.page-title` or `text-4xl md:text-5xl lg:text-6xl font-bold text-ecsess-50`
- **No eyebrow** above page or section titles (see `AGENTS.md`)
- Section supporting subtitle: `text-ecsess-300 mt-3 text-sm leading-relaxed sm:text-base`
- CMS prose: wrap content in `.typography`

## Soft surfaces

Prefer soft translucent panels on dark sections: `bg-ecsess-950/40`–`/50`, `border-ecsess-800/60`–`/70`, `rounded-2xl`. No nested cards. Avoid bright mint fills for blocks on dark calendars — use mid-green translucency instead.

## Section layout

Use `$lib/components/layout/Section.svelte`:

```svelte
<Section from="from-ecsess-black" to="to-ecsess-900" via="via-ecsess-950" contentStart={true}>
	<div class="w-full max-w-7xl pt-6 text-left">
		<!-- content -->
	</div>
</Section>
```

Homepage stacks gradients from black → dark green → lighter green. Content pages often use solid dark backgrounds.

## Checklist for new pages

1. Add `SeoMetaTags` with title, description, `canonical={data.canonical}`
2. Wrap content in `Section` with gradient props matching adjacent pages
3. Use `max-w-7xl` content width, left-aligned headers
4. Reuse `Button`, `Link`, `EventTabsTrigger`, `PageHeader` from `$lib/components/`
