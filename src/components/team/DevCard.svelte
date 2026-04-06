<script lang="ts">
	import { Github, Mail } from '@lucide/svelte';

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
	<!-- Commit Card -->
	<div
		class="relative w-full overflow-hidden rounded-xl transition-all duration-100 ease-linear hover:scale-101 hover:shadow-lg hover:shadow-md {active
			? 'bg-primary-soft shadow-sm'
			: 'bg-base shadow-md'}"
	>
		<!-- Header -->
		<div class="px-6 pt-5 pb-3">
			<div class="flex flex-col items-center gap-2.5 text-center">
				<img src={githubAvatar} alt={name} class="size-20 shrink-0 rounded-full object-cover" />
				<div class="w-full">
					<h3 class="text-base-content text-lg font-semibold">
						{name}
					</h3>
					<p class="text-primary-content">{role}</p>
				</div>
			</div>
		</div>

		<!-- Body -->
		<div class="space-y-3 px-6 pb-5">
			<!-- Year Badge -->
			<div class="flex items-center justify-center gap-2">
				<span
					class="rounded-full px-4 py-1.5 font-medium {active
						? 'bg-base text-base-content'
						: 'bg-primary-soft text-base-content'}"
				>
					{year}
				</span>
			</div>

			<!-- Fun Fact / Commit Message -->
			<div class="min-h-[60px]">
				<p class="text-primary-content text-sm leading-relaxed italic">
					{funFact || ``}
				</p>
			</div>

			<!-- Actions -->
			<div class="flex gap-3 pt-1">
				{#if github}
					<a
						href={github}
						target="_blank"
						class="items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors {active
							? 'bg-base text-base-content hover:bg-primary-background'
							: 'bg-primary-soft text-base-content hover:bg-primary-hover'} {active && email
							? 'flex flex-1'
							: 'flex w-full'}"
					>
						<Github class="size-4.5" />
						GitHub
					</a>
				{/if}
				{#if email && active}
					<a
						href="mailto:{email}"
						class="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors {active
							? 'bg-base text-base-content hover:bg-primary-background'
							: 'bg-primary-soft text-base-content hover:bg-primary-hover'}"
					>
						<Mail class="size-4.5" />
						Email
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.fadeup {
		animation: fadeUp both;
		animation-timeline: view();
		animation-range: entry 20% cover 35%;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
