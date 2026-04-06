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
	class="border-primary-hover bg-base text-base-content relative flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl md:max-w-2xl md:flex-row"
	transition:scale
	role="article"
>
	<button
		type="button"
		onclick={onClose}
		class="bg-primary-hover text-primary-content hover:bg-primary focus-visible:ring-muted focus-visible:ring-offset-base absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		aria-label="Close"
	>
		<X class="size-5" />
	</button>

	<!-- Photo block: top on small, left on md+ -->
	<div
		class="border-primary-hover bg-primary-soft md:border-primary-hover flex shrink-0 flex-col items-center justify-center border-b p-4 md:min-w-44 md:border-r md:border-b-0 md:p-6"
	>
		<div
			class="bg-primary-soft ring-primary-hover flex aspect-4/5 w-24 items-center justify-center overflow-hidden rounded-lg shadow-inner ring-1 md:w-40 md:rounded-xl"
		>
			{#if image && !imageError}
				<img
					src={image}
					alt={`Profile picture of ${name} for the position of ${position}`}
					class="h-full w-full object-cover object-center"
					onerror={handleImageError}
				/>
			{:else}
				<span class="text-base-content text-3xl font-bold" aria-hidden="true">
					{getInitials(name)}
				</span>
			{/if}
		</div>
		{#if yearProgram}
			<p class="text-base-content mt-2 text-center text-xs font-semibold tracking-wider uppercase">
				{yearProgram}
			</p>
		{/if}
	</div>

	<!-- Information: below photo on small, right on md+ -->
	<div class="flex min-w-0 flex-1 flex-col justify-center p-0 px-4 md:p-6">
		<div class="flex flex-wrap items-center justify-center gap-2">
			<h2 {id} class="text-primary-content mt-2 text-2xl leading-tight font-bold">
				{name}
			</h2>
		</div>
		<p class="text-base-content mt-0.5 italic">{position}</p>

		{#if positionDescription}
			<div class="border-primary-hover mt-3 border-t pt-3 md:mt-4 md:pt-4">
				<p class="text-base-content leading-relaxed">
					{positionDescription}
				</p>
			</div>
		{/if}

		{#if email || linkedin}
			<div
				class="border-primary-hover mt-2 mb-4 flex flex-col items-center justify-center gap-1 border-t pt-3 text-center md:mb-0 md:pt-4"
			>
				{#if email}
					<div class="flex items-center justify-center gap-2">
						<Mail class="text-primary-content size-4 shrink-0" aria-hidden="true" />
						<a
							href="mailto:{email}"
							class="text-base-content decoration-primary hover:text-primary-content hover:decoration-muted font-medium break-all underline underline-offset-2"
						>
							{email}
						</a>
					</div>
				{/if}
				{#if linkedin}
					<div class="flex items-center justify-center gap-2">
						<Linkedin class="stroke-muted size-4 fill-transparent stroke-2" aria-hidden="true" />
						<Link
							href={linkedin}
							external
							class="text-base-content decoration-primary hover:text-primary-content hover:decoration-muted font-medium break-all underline underline-offset-2"
						>
							LinkedIn
						</Link>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
