<script lang="ts">
	import { ExternalLink as ExternalLinkIcon } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';
	import Link from 'components/Link.svelte';
	import type { InputValue } from '@portabletext/svelte';
	import type { LinkType } from '$lib/schemas';

	let { eventDescription, generalLink } = $props<{
		eventDescription?: InputValue;
		generalLink?: LinkType[] | null;
	}>();
</script>

<div class="mt-3 flex min-h-32 flex-col">
	<div
		class="border-ecsess-800 text-ecsess-100 flex max-h-56 flex-1 overflow-y-auto rounded-xl border p-4 text-sm md:max-h-72 md:p-5"
	>
		{#if eventDescription}
			<RichText value={eventDescription} />
		{:else}
			<p>No description available for this event.</p>
		{/if}
	</div>
</div>

{#if generalLink}
	<div class="mt-3 flex w-full flex-wrap items-center gap-2 md:gap-3">
		{#each generalLink.slice(0, 4) as link}
			<Link
				href={link.url}
				external
				class="bg-ecsess-600 hover:bg-ecsess-650 focus:ring-ecsess-300 focus:ring-offset-ecsess-900 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				<ExternalLinkIcon class="h-4 w-4" strokeWidth={2.5} />
				{link.title}
			</Link>
		{/each}
	</div>
{/if}
