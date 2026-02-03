<script lang="ts">
	let { onViewProfile, name, position, image, featured = false, tag = null } = $props();
	import { getInitials } from '$lib/format';

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}
</script>

<article
	class="group grid h-full min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-xl bg-ecsess-800 shadow-md ring-2 ring-ecsess-500/50 ring-offset-2 ring-offset-ecsess-900 transition-all duration-500 ease-out hover:ring-ecsess-300 hover:shadow-xl hover:shadow-ecsess-400/50 focus-within:ring-2 focus-within:ring-ecsess-300 focus-within:ring-offset-2 focus-within:ring-offset-ecsess-900 {featured
		? 'w-full max-w-[14rem] sm:max-w-[16rem]'
		: 'w-full max-w-[14rem] sm:max-w-[16rem]'}"
>
	<div
		class="relative flex aspect-square w-full min-h-0 items-center justify-center overflow-hidden bg-ecsess-700"
	>
		{#if tag}
			<span
				class="absolute right-2 top-2 z-[1] rounded-md bg-ecsess-600 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ecsess-50 shadow-md ring-1 ring-ecsess-400/60"
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
			<span class="text-4xl font-bold text-ecsess-150 sm:text-5xl" aria-hidden="true">
				{getInitials(name)}
			</span>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-center gap-2 p-3 text-center sm:p-4">
		<h3 class="w-full text-base font-bold leading-tight text-ecsess-50 line-clamp-2 sm:text-lg">
			{name}
		</h3>
		<p class="w-full text-xs italic text-ecsess-200 line-clamp-2 sm:text-sm">{position}</p>
		<button
			type="button"
			onclick={onViewProfile}
			class="mt-1 w-full rounded-lg bg-ecsess-500 px-3 py-2 text-xs font-semibold text-ecsess-950 shadow-md transition hover:bg-ecsess-400 hover:text-ecsess-50 focus:outline-none focus:ring-2 focus:ring-ecsess-300 focus:ring-offset-2 focus:ring-offset-ecsess-800 sm:text-sm"
		>
			View profile
		</button>
	</div>
</article>
