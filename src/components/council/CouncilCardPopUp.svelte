<script lang="ts">
	let {
		name,
		position,
		email,
		positionDescription,
		yearProgram,
		image,
		linkedin,
		onClose,
		id = 'popup-title'
	} = $props();
	import { Linkedin, Mail, X } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

	function getInitials(name: string | null | undefined): string {
		if (name == null || typeof name !== 'string') return '';
		const words = name.trim().split(/\s+/).filter(Boolean);
		return words
			.slice(0, 3)
			.map((w) => w.charAt(0).toUpperCase())
			.join('');
	}
	import { scale } from 'svelte/transition';

	let imageError = $state(false);

	function handleImageError() {
		imageError = true;
	}
</script>

<div
	class="border-ecsess-650/70 bg-ecsess-900 text-ecsess-100 relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl md:max-w-2xl md:flex-row"
	transition:scale
	role="article"
>
	<button
		type="button"
		onclick={onClose}
		class="bg-ecsess-650 text-ecsess-50 hover:bg-ecsess-550 focus:ring-ecsess-500 focus:ring-offset-ecsess-900 absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full transition hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
		aria-label="Close"
	>
		<X class="size-4 md:size-5" />
	</button>

	<!-- Photo block: top on small, left on md+ -->
	<div
		class="border-ecsess-700/60 bg-ecsess-850 md:border-ecsess-700/60 flex shrink-0 flex-col items-center justify-center border-b p-4 md:min-w-44 md:border-r md:border-b-0 md:p-6"
	>
		<div
			class="bg-ecsess-750 ring-ecsess-650/60 flex aspect-4/5 w-24 items-center justify-center overflow-hidden rounded-lg shadow-inner ring-1 md:w-40 md:rounded-xl"
		>
			{#if image && !imageError}
				<img
					src={image}
					alt={`Profile picture of ${name} for the position of ${position}`}
					class="h-full w-full object-cover object-center"
					onerror={handleImageError}
				/>
			{:else}
				<span class="text-ecsess-200 text-xl font-bold md:text-3xl" aria-hidden="true">
					{getInitials(name)}
				</span>
			{/if}
		</div>
		{#if yearProgram}
			<p class="text-ecsess-200 mt-2 text-center text-xs font-semibold tracking-wider uppercase">
				{yearProgram}
			</p>
		{/if}
	</div>

	<!-- Information: below photo on small, right on md+ -->
	<div class="flex min-w-0 flex-1 flex-col justify-center p-0 px-4 md:p-6">
		<div class="flex flex-wrap items-center justify-center gap-2">
			<h2 {id} class="text-ecsess-50 mt-2 text-lg leading-tight font-bold md:text-2xl">{name}</h2>
		</div>
		<p class="text-ecsess-200 mt-0.5 text-sm italic md:text-base">{position}</p>

		{#if positionDescription}
			<div class="border-ecsess-700/60 mt-3 border-t pt-3 md:mt-4 md:pt-4">
				<p class="text-ecsess-100 text-sm leading-relaxed md:text-base">
					{positionDescription}
				</p>
			</div>
		{/if}

		{#if email || linkedin}
			<div
				class="border-ecsess-700/60 mt-2 mb-4 flex flex-col items-center justify-center gap-1 border-t pt-3 text-center md:mb-0 md:pt-4"
			>
				{#if email}
					<div class="flex items-center justify-center gap-2">
						<Mail class="text-ecsess-300 size-4 shrink-0" aria-hidden="true" />
						<a
							href="mailto:{email}"
							class="text-ecsess-200 decoration-ecsess-500 hover:text-ecsess-50 hover:decoration-ecsess-400 text-sm font-medium break-all underline underline-offset-2 md:text-base"
						>
							{email}
						</a>
					</div>
				{/if}
				{#if linkedin}
					<div class="flex items-center justify-center gap-2">
						<Linkedin class="stroke-ecsess-400 size-4 stroke-2" aria-hidden="true" />
						<Link
							href={linkedin}
							external
							class="text-ecsess-200 decoration-ecsess-500 hover:text-ecsess-50 hover:decoration-ecsess-400 text-sm font-medium break-all underline underline-offset-2 md:text-base"
						>
							LinkedIn
						</Link>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
