<script lang="ts">
	let {
		name,
		src,
		role = ''
	}: {
		name: string;
		src: string;
		role: string;
	} = $props();

	let array = $derived(role ? [...Array(3)].map((_) => [...role].concat('*')).flat() : []);
</script>

<div class="relative size-40 shrink-0 [--text-radius:108px] md:size-48">
	<img
		class="border-ecsess-200 size-full rounded-full border-4 object-cover p-2"
		{src}
		alt={name}
	/>
	{#if role}
		{#each array as char, index}
			<p
				class="char absolute inset-24 z-10 size-3 text-xs"
				style="transform: translate(-50%, -50%) rotate({(360 / array.length) *
					index}deg) translateY(calc(-1 * var(--text-radius)));"
			>
				{char}
			</p>
		{/each}
	{/if}
</div>
