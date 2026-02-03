<script lang="ts">
	let {
		name,
		position,
		email,
		positionDescription,
		yearProgram,
		image,
		onClose,
		id = 'popup-title'
	} = $props();
	import { getInitials } from '$lib/format';
	import { Mail, X } from '@lucide/svelte';
	import { scale } from 'svelte/transition';

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}
</script>

<div
	class="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-ecsess-650/70 bg-ecsess-900 shadow-2xl text-ecsess-100 md:max-w-2xl md:flex-row"
	transition:scale
	role="article"
>
	<button
		type="button"
		onclick={onClose}
		class="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-ecsess-650 text-ecsess-50 transition hover:bg-ecsess-550 focus:outline-none focus:ring-2 focus:ring-ecsess-500 focus:ring-offset-2 focus:ring-offset-ecsess-900 md:size-9"
		aria-label="Close"
	>
		<X class="size-4 md:size-5" />
	</button>

	<!-- Photo block: top on small, left on md+ -->
	<div
		class="flex shrink-0 flex-col items-center justify-center border-b border-ecsess-700/60 bg-ecsess-850 p-4 md:min-w-[11rem] md:border-b-0 md:border-r md:border-ecsess-700/60 md:p-6"
	>
		<div
			class="flex w-24 aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-ecsess-750 shadow-inner ring-1 ring-ecsess-650/60 md:w-40 md:rounded-xl"
		>
			{#if image && !imageError}
				<img
					src={image}
					alt={name}
					class="h-full w-full object-cover object-center"
					onerror={handleImageError}
				/>
			{:else}
				<span class="text-xl font-bold text-ecsess-200 md:text-3xl" aria-hidden="true">
					{getInitials(name)}
				</span>
			{/if}
		</div>
		{#if yearProgram}
			<p class="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-ecsess-200">
				{yearProgram}
			</p>
		{/if}
	</div>

	<!-- Information: below photo on small, right on md+ -->
	<div class="flex min-w-0 flex-1 flex-col justify-center p-4 md:p-6">
		<h2 {id} class="text-lg font-bold leading-tight text-ecsess-50 md:text-2xl">{name}</h2>
		<p class="-mt-0.5 text-sm italic text-ecsess-200 md:text-base">{position}</p>

		{#if positionDescription}
			<div class="mt-3 border-t border-ecsess-700/60 pt-3 md:mt-4 md:pt-4">
				<p class="text-sm leading-relaxed text-ecsess-100 md:text-base">
					{positionDescription}
				</p>
			</div>
		{/if}

		{#if email}
			<div
				class="mt-3 flex flex-row items-center justify-center gap-2 border-t border-ecsess-700/60 pt-3 text-center md:mt-4 md:pt-4"
			>
				<Mail class="size-4 shrink-0 text-ecsess-300" aria-hidden="true" />
				<a
					href="mailto:{email}"
					class="break-all text-sm font-medium text-ecsess-200 underline decoration-ecsess-500 underline-offset-2 hover:text-ecsess-50 hover:decoration-ecsess-400 md:text-base"
				>
					{email}
				</a>
			</div>
		{/if}
	</div>
</div>
