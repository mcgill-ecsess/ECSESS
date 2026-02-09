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
		<h2 id="sponsors-title" class="text-ecsess-100 mb-2 text-4xl font-bold md:text-5xl">
			Our Sponsors
		</h2>
		<p class="text-ecsess-200/90 mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
			We're grateful to our sponsors for their continued support of ECSESS, our events, activities,
			and our community.
		</p>
		<div
			class="via-ecsess-150/40 mx-auto mt-2 h-px w-32 bg-linear-to-r from-transparent to-transparent"
			aria-hidden="true"
		></div>
		<div class="mt-6">
			<Link href="/sponsor">
				<Button>Become a Sponsor</Button>
			</Link>
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
						class="group flex w-full max-w-[342px] justify-center rounded-xl focus-visible:outline-none"
					>
						<div
							class="border-ecsess-150/15 bg-ecsess-950 group-hover:border-ecsess-150/30 group-hover:bg-ecsess-900 flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border p-6 shadow-md transition-colors duration-150"
						>
							<img
								src={sponsor.logo}
								alt={sponsor.name}
								class="max-h-16 w-full object-contain opacity-90 transition-opacity duration-150 group-hover:opacity-100"
							/>
						</div>
					</Link>
				{/each}
			</div>
		</div>
	{:else}
		<div class="text-ecsess-300 py-12 text-center">
			<p>You can be our next sponsor!</p>
		</div>
	{/if}
</div>
