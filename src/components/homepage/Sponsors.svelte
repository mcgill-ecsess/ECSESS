<script lang="ts">
	import type { Sponsors } from '$lib/schemas';
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';

	let { sponsors } = $props<{ sponsors: Sponsors[] }>();
</script>

<div class="container mx-auto px-4">
	<!-- Section Header -->
	<div class="my-12 text-center">
		<h2 id="sponsors-title" class="text-ecsess-100 mb-2 text-4xl font-bold md:text-5xl">
			Our Sponsors
		</h2>
		<p class="text-ecsess-200 mx-auto max-w-2xl text-base">
			We're grateful to our sponsors for their continued support of ECSESS and our community.
		</p>
		<div class="mt-6">
			<Link href="/sponsor">
				<Button>Become a Sponsor</Button>
			</Link>
		</div>
	</div>

	<!-- Sponsors Flex -->
	{#if sponsors && sponsors.length > 0}
		<div class="flex flex-wrap justify-center gap-6 lg:gap-8">
			{#each sponsors as sponsor}
				<Link href={sponsor.url} external>
					<div
						class="bg-ecsess-950 border-ecsess-800 hover:border-ecsess-700 group flex h-32 w-sm items-center justify-center rounded-lg border p-4 transition-all hover:shadow-lg"
					>
						<img
							src={sponsor.logo}
							alt="{sponsor.name} Logo"
							class="max-h-20 w-40 object-contain opacity-90 transition-opacity group-hover:opacity-100"
						/>
					</div>
				</Link>
			{/each}
		</div>
	{:else}
		<div class="text-ecsess-300 py-12 text-center">
			<p>No sponsors at this time.</p>
		</div>
	{/if}
</div>
