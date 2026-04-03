<script lang="ts">
	import { Github, Mail, Sparkles } from '@lucide/svelte';

	let {
		name,
		role,
		year,
		src,
		funFact,
		github,
		email,
		active = false
	} = $props<{
		name: string;
		role: string;
		year: string;
		src: string;
		funFact: string;
		github: string;
		email: string;
		active?: boolean;
	}>();

	// Extract GitHub username from URL and construct avatar URL
	let githubAvatar = $derived.by(() => {
		if (!github) return src;
		try {
			const url = new URL(github);
			const username = url.pathname.split('/').filter(Boolean)[0];
			return username ? `https://github.com/${username}.png?size=200` : src;
		} catch {
			return src;
		}
	});
</script>

<div class="fadeup group relative flex flex-col">
	<div
		class="relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl {active
			? 'bg-ecsess-800/80 border-ecsess-600/50 hover:border-ecsess-400/60 hover:shadow-ecsess-500/10 shadow-ecsess-black/50 shadow-sm'
			: 'bg-ecsess-900/80 border-ecsess-700/40 hover:border-ecsess-600/50 hover:shadow-ecsess-black/40'}"
	>
		<!-- Top accent bar (active only) -->
		{#if active}
			<div class="from-ecsess-500 to-ecsess-700 h-0.5 w-full bg-gradient-to-r"></div>
		{/if}

		<!-- Avatar + Name Header -->
		<div class="flex items-center gap-4 px-5 pt-5 pb-3">
			<div class="relative shrink-0">
				<img
					src={githubAvatar}
					alt={name}
					class="size-14 rounded-xl object-cover ring-2 {active
						? 'ring-ecsess-500/60'
						: 'ring-ecsess-700/60'}"
				/>
				{#if active}
					<span
						class="bg-ecsess-400 ring-ecsess-800 absolute -right-1 -bottom-1 size-3 rounded-full ring-2"
					></span>
				{/if}
			</div>
			<div class="min-w-0 flex-1">
				<h3
					class="truncate text-base font-semibold leading-tight {active
						? 'text-ecsess-50'
						: 'text-ecsess-200'}"
				>
					{name}
				</h3>
				<p class="text-ecsess-400 mt-0.5 truncate text-sm">{role}</p>
			</div>
		</div>

		<!-- Year badge + fun fact -->
		<div class="space-y-3 px-5 pb-4">
			<span
				class="inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-medium tracking-wider {active
					? 'bg-ecsess-700/60 text-ecsess-300'
					: 'bg-ecsess-800/60 text-ecsess-500'}"
			>
				{year}
			</span>

			{#if funFact}
				<div class="flex gap-2">
					<Sparkles class="text-ecsess-500 mt-0.5 size-3.5 shrink-0" />
					<p class="text-ecsess-400 text-xs leading-relaxed italic">
						{funFact}
					</p>
				</div>
			{/if}
		</div>

		<!-- Divider -->
		<div class="bg-ecsess-700/30 mx-5 h-px"></div>

		<!-- Actions -->
		<div class="flex gap-2 px-5 py-3">
			{#if github}
				<a
					href={github}
					target="_blank"
					rel="noopener noreferrer"
					class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {active
						? 'bg-ecsess-700/50 text-ecsess-300 hover:bg-ecsess-700 hover:text-ecsess-100'
						: 'bg-ecsess-800/50 text-ecsess-500 hover:bg-ecsess-800 hover:text-ecsess-300'}"
				>
					<Github class="size-3.5" />
					GitHub
				</a>
			{/if}
			{#if email && active}
				<a
					href="mailto:{email}"
					class="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all {active
						? 'bg-ecsess-700/50 text-ecsess-300 hover:bg-ecsess-700 hover:text-ecsess-100'
						: 'bg-ecsess-800/50 text-ecsess-500 hover:bg-ecsess-800 hover:text-ecsess-300'}"
				>
					<Mail class="size-3.5" />
					Email
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.fadeup {
		animation: fadeUp both;
		animation-timeline: view();
		animation-range: entry 10% cover 30%;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
