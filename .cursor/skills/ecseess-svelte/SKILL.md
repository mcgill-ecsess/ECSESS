---
name: ecseess-svelte
description: Build Svelte 5 components for the ECSESS SvelteKit site following project file structure and runes patterns. Use when creating or refactoring .svelte files, routes, or component organization.
---

# ECSESS Svelte Development

## File placement

| Scope              | Location                                 | Import                               |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| Shared (2+ routes) | `src/lib/components/`                    | `$lib/components/...`                |
| Page-specific      | `src/routes/{route}/components/`         | `./components/...`                   |
| Homepage sections  | `src/routes/components/`                 | `./components/...` in `+page.svelte` |
| Types / utils      | `src/lib/schemas.ts`, `src/lib/utils.ts` | `$lib/...`                           |

## Component template

```svelte
<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let { title, data } = $props<{ title: string; data: SomeType }>();
	let active = $state(false);
	let filtered = $derived(data.filter(/* ... */));
</script>
```

## Route page template

```svelte
<script lang="ts">
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import MyWidget from './components/MyWidget.svelte';

	let { data } = $props();
</script>

<SeoMetaTags title="..." description="..." canonical={data.canonical} />
<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" contentStart={true}>
	<MyWidget items={data.items} />
</Section>
```

## Rules

- Svelte 5 runes only — compiler option `runes: true`
- Data fetching in `+page.server.ts`, not in components
- Use `@lucide/svelte` for icons
- Invoke Svelte MCP autofixer after editing `.svelte` files when available
