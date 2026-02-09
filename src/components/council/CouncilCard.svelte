<script lang="ts">
	let { onViewProfile, name, position, image, featured = false, tag = null } = $props();

	function getInitials(n: string | null | undefined): string {
		if (n == null || typeof n !== 'string') return '';
		return n
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 3)
			.map((w) => w.charAt(0).toUpperCase())
			.join('');
	}

	let imageError = $state(false);
	function handleImageError() {
		imageError = true;
	}
</script>

<!-- Wrapper: card + ring layer (ring pulses on small screen only) -->
<div class="relative w-full max-w-full sm:contents">
	<div
		class="group relative flex h-full min-w-0 cursor-pointer flex-row overflow-hidden rounded-xl shadow-md transition-all duration-500 ease-out sm:grid sm:grid-rows-[auto_1fr] {featured
			? 'w-full sm:max-w-64 md:max-w-[13.6rem] lg:max-w-72'
			: 'w-full sm:max-w-64 md:max-w-[13.6rem] lg:max-w-72'} bg-ecsess-800 ring-0 ring-offset-0 ring-ecsess-500/50 ring-offset-ecsess-900 hover:ring-ecsess-300 hover:shadow-ecsess-400/50 focus-within:ring-ecsess-300 focus-within:ring-offset-ecsess-900 focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-xl sm:ring-2 sm:ring-offset-2"
		role="button"
		tabindex="0"
		onclick={onViewProfile}
		onkeydown={(e) =>
			e.key === 'Enter' || e.key === ' ' ? (e.preventDefault(), onViewProfile()) : null}
	>
		{#if tag}
			<span
				class="absolute top-2 right-2 z-10 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide shadow-md ring-1 bg-ecsess-600 text-ecsess-50 ring-ecsess-400/60"
			>
				{tag}
			</span>
		{/if}

		<!-- Picture section: fills entire area, image covers it -->
		<div
			class="relative flex min-w-20 shrink-0 items-center justify-center overflow-hidden rounded-l-xl bg-ecsess-700 aspect-square sm:min-w-0 sm:w-full sm:rounded-none"
		>
			{#if image && !imageError}
				<img
					src={image}
					alt={`Profile picture of ${name} for the position of ${position}`}
					class="size-full object-cover object-center"
					onerror={handleImageError}
				/>
			{:else}
				<span class="text-ecsess-150 text-2xl font-bold sm:text-5xl" aria-hidden="true">
					{getInitials(name)}
				</span>
			{/if}
		</div>

		<div
			class="flex min-w-0 flex-1 flex-col justify-center gap-1 px-3 py-2 text-left sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-4 sm:text-center"
		>
			<h3 class="w-full text-lg font-bold leading-tight text-ecsess-50 line-clamp-2 sm:text-lg">
				{name}
			</h3>
			<p class="w-full text-xs italic text-ecsess-200 line-clamp-2 sm:text-sm">{position}</p>
			<button
				type="button"
				class="mt-1 hidden w-full rounded-lg bg-ecsess-500 px-3 py-2 text-xs font-semibold text-ecsess-950 shadow-md transition focus:ring-2 focus:ring-ecsess-300 focus:ring-offset-2 focus:ring-offset-ecsess-800 focus:outline-none hover:bg-ecsess-400 hover:text-ecsess-50 sm:mt-1 sm:block lg:hidden"
			>
				View profile
			</button>
		</div>
	</div>

	<!-- Small screen only: pulsing ring (opacity only), not the card -->
	<div
		class="absolute inset-0 pointer-events-none rounded-xl ring-2 ring-ecsess-400/60 ring-offset-2 ring-offset-ecsess-900 animate-pulse-ring sm:hidden"
		aria-hidden="true"
	></div>
</div>
