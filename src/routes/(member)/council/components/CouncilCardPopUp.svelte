<script lang="ts">
	import { Linkedin, Mail, X } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import Link from '#lib/components/Link.svelte';

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

	let imageError = $state(false);

	function getInitials(name: string | null | undefined): string {
		if (name == null || typeof name !== 'string') return '';
		const words = name.trim().split(/\s+/).filter(Boolean);
		return words
			.slice(0, 3)
			.map((w) => w.charAt(0).toUpperCase())
			.join('');
	}

	function handleImageError() {
		imageError = true;
	}
</script>

<div
	class="relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-ecsess-650/70 bg-ecsess-900 text-ecsess-100 shadow-2xl md:max-w-2xl md:flex-row"
	transition:scale
	role="article"
	data-component="CouncilCardPopUp"
>
	<button
		type="button"
		onclick={onClose}
		class="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-ecsess-650 text-ecsess-50 transition hover:cursor-pointer hover:bg-ecsess-550 focus:ring-2 focus:ring-ecsess-500 focus:ring-offset-2 focus:ring-offset-ecsess-900 focus:outline-none"
		aria-label="Close"
	>
		<X class="size-4 md:size-5" />
	</button>

	<div
		class="flex shrink-0 flex-col items-center justify-center border-b border-ecsess-700/60 bg-ecsess-850 p-4 md:min-w-44 md:border-r md:border-b-0 md:border-ecsess-700/60 md:p-6"
	>
		<div
			class="flex aspect-4/5 w-24 items-center justify-center overflow-hidden rounded-lg bg-ecsess-750 shadow-inner ring-1 ring-ecsess-650/60 md:w-40 md:rounded-xl"
		>
			{#if image && !imageError}
				<img
					src={image}
					alt={`Profile picture of ${name} for the position of ${position}`}
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
			<p class="mt-2 text-center text-xs font-semibold tracking-wider text-ecsess-200 uppercase">
				{yearProgram}
			</p>
		{/if}
	</div>

	<div class="flex min-w-0 flex-1 flex-col justify-center p-0 px-4 text-center md:p-6">
		<div class="flex flex-wrap items-center justify-center gap-2">
			<h2 {id} class="mt-2 text-lg leading-tight font-bold text-ecsess-50 md:text-2xl">{name}</h2>
		</div>
		<p class="mt-0.5 text-sm text-ecsess-200 italic md:text-base">{position}</p>

		{#if positionDescription}
			<div class="mt-3 border-t border-ecsess-700/60 pt-3 md:mt-4 md:pt-4">
				<p class="text-sm leading-relaxed text-ecsess-100 md:text-base">
					{positionDescription}
				</p>
			</div>
		{/if}

		{#if email || linkedin}
			<div
				class="mt-2 mb-4 flex flex-col items-center justify-center gap-1 border-t border-ecsess-700/60 pt-3 text-center md:mb-0 md:pt-4"
			>
				{#if email}
					<div class="flex items-center justify-center gap-2">
						<Mail class="size-4 shrink-0 text-ecsess-300" aria-hidden="true" />
						<a
							href="mailto:{email}"
							class="text-sm font-medium break-all text-ecsess-200 underline decoration-ecsess-500 underline-offset-2 hover:text-ecsess-50 hover:decoration-ecsess-400 md:text-base"
						>
							{email}
						</a>
					</div>
				{/if}
				{#if linkedin}
					<div class="flex items-center justify-center gap-2">
						<Linkedin
							class="size-4 fill-transparent stroke-ecsess-300 stroke-2"
							aria-hidden="true"
						/>
						<Link
							href={linkedin}
							external
							class="text-sm font-medium break-all text-ecsess-200 underline decoration-ecsess-500 underline-offset-2 hover:text-ecsess-50 hover:decoration-ecsess-400 md:text-base"
						>
							LinkedIn
						</Link>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
