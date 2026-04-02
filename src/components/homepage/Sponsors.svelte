<script lang="ts">
	import type { Sponsors } from '$lib/schemas';
	import Link from 'components/Link.svelte';

	let { sponsors, lastUpdated } = $props<{
		sponsors: Sponsors[];
		lastUpdated?: string | null;
	}>();
</script>

<div>
	<!-- Section header -->
	<div style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #808080;">
		<h2 id="sponsors-title" style="font-size: 15px; font-weight: bold; color: #000080; margin: 0 0 4px 0;">
			Our Sponsors
		</h2>
		<p style="font-size: 11px; color: #444; margin: 0 0 8px 0; line-height: 1.5;">
			We&apos;re grateful to our sponsors for their continued support of ECSESS, our events, and our community.
		</p>
		<Link href="/sponsor">
			<button class="win-btn" style="font-size: 11px;">
				💼 Become a Sponsor
			</button>
		</Link>
	</div>

	<!-- Sponsors as Win2k "shortcut icons" -->
	{#if sponsors && sponsors.length > 0}
		<div
			style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-start;"
			aria-labelledby="sponsors-title"
		>
			{#each sponsors as sponsor}
				<Link
					href={sponsor.url}
					external
					class="group"
					style="text-decoration: none;"
				>
					<!-- Win2k desktop icon style -->
					<div
						class="win-raised"
						style="width: 140px; height: 80px; display: flex; align-items: center; justify-content: center; padding: 8px; background: #ffffff; cursor: pointer;"
						onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = '#ece9d8'; }}
						onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = '#ffffff'; }}
					>
						<img
							src={sponsor.logo}
							alt={sponsor.name}
							style="max-height: 56px; max-width: 120px; object-fit: contain;"
						/>
					</div>
					<div style="font-size: 10px; text-align: center; margin-top: 2px; color: #000080; text-decoration: underline; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
						{sponsor.name}
					</div>
				</Link>
			{/each}
		</div>
	{:else}
		<div
			class="win-sunken"
			style="padding: 16px; text-align: center; background: #ffffff; font-size: 12px; color: #808080;"
		>
			<p style="margin-bottom: 8px;">📁 No sponsors found.</p>
			<p>You can be our next sponsor!</p>
		</div>
	{/if}
</div>
