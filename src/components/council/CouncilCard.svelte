<script lang="ts">
	let { onViewProfile, name, position, image, featured = false, tag = null } = $props();
	import { getInitials } from '$lib/format';

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}
</script>

<article
	class="group bg-ecsess-800 ring-ecsess-500/50 ring-offset-ecsess-900 hover:ring-ecsess-300 hover:shadow-ecsess-400/50 focus-within:ring-ecsess-300 focus-within:ring-offset-ecsess-900 grid h-full min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-xl shadow-md ring-2 ring-offset-2 transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-xl {featured
		? 'w-full max-w-56 sm:max-w-64'
		: 'w-full max-w-56 sm:max-w-64'}"
>
	<div
		class="bg-ecsess-700 relative flex aspect-square min-h-0 w-full items-center justify-center overflow-hidden"
	>
		{#if tag}
			<span
				class="bg-ecsess-600 text-ecsess-50 ring-ecsess-400/60 absolute top-2 right-2 z-1 rounded-md px-2 py-1 text-xs font-semibold tracking-wide uppercase shadow-md ring-1"
			>
				{tag}
			</span>
		{/if}
		{#if image && !imageError}
			<img
				src={image}
				alt={name}
				class="h-full w-full object-cover object-center"
				onerror={handleImageError}
			/>
		{:else}
			<span class="text-ecsess-150 text-4xl font-bold sm:text-5xl" aria-hidden="true">
				{getInitials(name)}
			</span>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-center gap-2 p-3 text-center sm:p-4">
		<h3 class="text-ecsess-50 line-clamp-2 w-full text-base leading-tight font-bold sm:text-lg">
			{name}
		</h3>
		<p class="text-ecsess-200 line-clamp-2 w-full text-xs italic sm:text-sm">{position}</p>
		<button
			type="button"
			onclick={onViewProfile}
			class="bg-ecsess-500 text-ecsess-950 hover:bg-ecsess-400 hover:text-ecsess-50 focus:ring-ecsess-300 focus:ring-offset-ecsess-800 mt-1 w-full rounded-lg px-3 py-2 text-xs font-semibold shadow-md transition focus:ring-2 focus:ring-offset-2 focus:outline-none sm:text-sm"
		>
			View profile
		</button>
	</div>
</article>
