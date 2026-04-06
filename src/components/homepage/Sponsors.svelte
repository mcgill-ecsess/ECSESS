<script lang="ts">
	import type { Sponsors } from '$lib/schemas';
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';

	let { sponsors, lastUpdated } = $props<{
		sponsors: Sponsors[];
		lastUpdated?: string | null;
	}>();
</script>

<div class="container mx-auto px-4">
	<!-- Section Header -->
	<div class="my-12 text-center">
		<h2 id="sponsors-title" class="text-base-content mb-2 text-5xl font-bold">Our Sponsors</h2>
		<p class="text-base-content mx-auto max-w-2xl text-lg leading-relaxed">
			We're grateful to our sponsors for their continued support of ECSESS, our events, activities,
			and our community.
		</p>
		<div
			class="via-muted mx-auto mt-2 h-px w-32 bg-linear-to-r from-transparent to-transparent"
			aria-hidden="true"
		></div>
		<div class="mt-6">
			<Button href="/sponsor" variant="primary" size="md">Become a Sponsor</Button>
		</div>
	</div>

	<!-- Sponsors -->
	{#if sponsors && sponsors.length > 0}
		<div class="mx-auto max-w-6xl">
			<div class="flex flex-wrap justify-center gap-4 sm:gap-6" aria-labelledby="sponsors-title">
				{#each sponsors as sponsor}
					<Link
						href={sponsor.url}
						external
						class="group focus-visible:ring-muted focus-visible:ring-offset-base flex w-full max-w-[342px] justify-center rounded-(--radius-panel) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					>
						<div
							class="border-primary-soft bg-primary-background group-hover:border-primary group-hover:bg-base flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border p-6 shadow-md transition-colors duration-150"
						>
							<img
								src={sponsor.logo}
								alt={sponsor.name}
								class="max-h-16 w-full object-contain transition-opacity duration-150"
							/>
						</div>
					</Link>
				{/each}
			</div>
		</div>
	{:else}
		<div class="text-base-content py-12 text-center">
			<p>You can be our next sponsor!</p>
		</div>
	{/if}
</div>
