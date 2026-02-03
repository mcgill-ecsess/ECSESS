<script>
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
	import { Mail, X } from '@lucide/svelte';
	import placeholder from 'assets/placeholderAvatar.png';
	import { slide } from 'svelte/transition';
</script>

<div
	class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-ecsess-600/30 bg-gradient-to-br from-ecsess-50 to-ecsess-200/90 shadow-2xl shadow-black/30 text-ecsess-800"
	transition:slide
	role="article"
>
	<!-- Close button: visible and tappable on all screens -->
	<button
		type="button"
		onclick={onClose}
		class="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-ecsess-800/90 text-ecsess-100 shadow-lg transition hover:bg-ecsess-700 focus:outline-none focus:ring-2 focus:ring-ecsess-400 focus:ring-offset-2"
		aria-label="Close profile"
	>
		<X class="size-5" />
	</button>

	<div class="flex flex-1 flex-col overflow-y-auto sm:flex-row">
		<!-- Avatar block -->
		<div
			class="flex shrink-0 flex-col items-center gap-2 border-b border-ecsess-300/50 bg-ecsess-100/50 p-6 sm:border-b-0 sm:border-r sm:min-w-[180px]"
		>
			<div class="size-28 overflow-hidden rounded-xl shadow-md sm:size-32">
				<img
					src={image || placeholder}
					alt={name}
					class="h-full w-full object-cover"
				/>
			</div>
			<span class="text-center text-sm font-medium text-ecsess-700">{yearProgram}</span>
		</div>

		<!-- Content block: more space for long text -->
		<div class="flex min-w-0 flex-1 flex-col p-6 pt-5 sm:p-8 sm:pt-6">
			<div class="mb-4">
				<h2 {id} class="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">{name}</h2>
				<p class="mt-0.5 text-base italic text-ecsess-700 sm:text-lg">{position}</p>
			</div>

			<hr class="border-ecsess-400/60 my-3 border-t border-dashed" />

			<div class="space-y-4 text-left">
				{#if positionDescription}
					<div class="max-w-prose">
						<p class="text-sm leading-relaxed text-ecsess-800 sm:text-base">
							{positionDescription}
						</p>
					</div>
				{/if}
				{#if email}
					<div class="flex flex-wrap items-center gap-2">
						<Mail class="size-4 shrink-0 text-ecsess-600" aria-hidden="true" />
						<a
							href="mailto:{email}"
							class="break-all text-sm font-medium text-ecsess-700 underline decoration-ecsess-500 underline-offset-2 transition hover:text-ecsess-800 hover:decoration-ecsess-600 sm:text-base"
						>
							{email}
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
