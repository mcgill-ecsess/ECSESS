<script lang="ts">
	let { name, src }: { name: string; src: string } = $props();

	function getInitials(name: string): string {
		const words = name.trim().split(/\s+/);
		return words
			.slice(0, 5)
			.map((word) => word.charAt(0).toUpperCase())
			.join('');
	}

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}
</script>

<div class="relative aspect-square size-24 overflow-hidden rounded-full bg-ecsess-600 sm:size-24">
	{#if src && !imageError}
		<img
			{src}
			alt={`Profile picture of ${name}`}
			class="h-full w-full object-cover"
			onerror={handleImageError}
		/>
	{:else}
		<div
			class="flex h-full w-full items-center justify-center bg-ecsess-500 text-lg font-bold text-ecsess-950"
		>
			{getInitials(name)}
		</div>
	{/if}
</div>
