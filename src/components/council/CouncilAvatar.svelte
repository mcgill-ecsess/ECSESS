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

<div class="size-26 md:size-32 relative rounded-full overflow-hidden">
	{#if src && !imageError}
		<img
			{src}
			alt={name}
			class="h-full w-full rounded-full object-cover"
			onerror={handleImageError}
		/>
	{:else if !src || imageError}
		<div class="bg-ecsess-400 flex h-full w-full items-center justify-center rounded-full">
			<span class="text-ecsess-black text-xl font-bold"> {getInitials(name)} </span>
		</div>
	{/if}
</div>
