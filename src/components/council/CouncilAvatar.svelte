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

<div
	class="bg-ecsess-600/50 relative aspect-square size-20 overflow-hidden rounded-full sm:size-24"
>
	{#if src && !imageError}
		<img {src} alt={name} class="h-full w-full object-cover" onerror={handleImageError} />
	{:else}
		<div
			class="bg-ecsess-500 text-ecsess-950 flex h-full w-full items-center justify-center text-lg font-bold"
		>
			{getInitials(name)}
		</div>
	{/if}
</div>
