---
name: ecseess-design
description: Apply ECSESS visual design — green color palette, typography, Section gradients, and page layout patterns. Use when styling pages, adding sections, or matching the site's look and feel.
---

# ECSESS Design System

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
- Eyebrow label: `text-ecsess-500 text-xs font-bold tracking-[0.2em] uppercase`
- CMS prose: wrap content in `.typography`

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
