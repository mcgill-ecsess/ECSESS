<script lang="ts">
	import { Github, Mail, FileCode } from '@lucide/svelte';
	import Avatar from 'components/team/Avatar.svelte';

	let { src, name, year, role, funFact, github, email } = $props<{
		src: string;
		name: string;
		year: string;
		role: string;
		funFact: string;
		github: string;
		email: string;
	}>();
</script>

<div
	class="fadeup border-ecsess-500/30 bg-ecsess-950/90 hover:border-ecsess-500/60 relative flex w-full flex-col overflow-hidden rounded-xl border p-0 font-mono text-xs shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
>
	<!-- Top Meta Bar -->
	<div
		class="bg-ecsess-950/50 border-ecsess-500/10 text-ecsess-400 flex w-full flex-col gap-2 border-b px-6 py-3 lg:gap-1"
	>
		<!-- Row 1: Author & Email -->
		<div class="grid grid-cols-1 sm:grid-cols-2">
			<div class="flex items-center justify-center gap-2 sm:justify-start">
				<span>Author:</span>
				<span class="text-ecsess-100 font-bold">{name}</span>
			</div>
			<div class="text-right">
				<span class="hidden break-words text-zinc-600 sm:inline">&lt;{email}&gt;</span>
			</div>
		</div>

		<!-- Row 2: Date & Role -->
		<div class="grid grid-cols-2">
			<div class="flex items-center gap-2">
				<span>Year:</span>
				<span class="text-zinc-500">{year}</span>
			</div>

			<div class="text-ecsess-300 ml-auto text-right leading-tight font-bold">
				{role}
			</div>
		</div>
	</div>

	<!-- Main Body -->
	<div class="relative flex flex-col p-4 md:flex-row">
		<!-- Visible centered on mobile -->
		<div class="flex justify-center md:hidden">
			<Avatar {src} {name} role="" />
		</div>

		<div class="min-w-0 flex-1">
			<!-- Commit Message (Fun Fact) -->
			<h2 class="text-ecsess-100 mb-2 text-xl font-bold tracking-tight break-words">
				{funFact || `feat: added ${name} to the team`}
			</h2>

			<!-- Diff Box -->
			<div class="bg-ecsess-950/50 border-ecsess-500/20 mb-6 overflow-x-auto rounded-lg border p-4">
				<div class="flex flex-col gap-1 font-mono text-xs opacity-80">
					<div class="flex gap-3">
						<span class="text-zinc-700 select-none">1</span>
						<div class="flex gap-2 break-all text-green-400/90">
							<span class="text-green-600 select-none">+</span>
							<span>name: "{name}";</span>
						</div>
					</div>
					<div class="flex gap-3">
						<span class="text-zinc-700 select-none">2</span>
						<div class="flex gap-2 break-all text-green-400/90">
							<span class="text-green-600 select-none">+</span>
							<span>role: "{role}";</span>
						</div>
					</div>
					<div class="flex gap-3">
						<span class="text-zinc-700 select-none">3</span>
						<div class="flex gap-2 break-all text-green-400/90">
							<span class="text-green-600 select-none">+</span>
							<span>contact: "{email}";</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex items-center justify-center gap-3">
				{#if github}
					<a
						href={github}
						target="_blank"
						class="hover:bg-ecsess-500/10 hover:border-ecsess-500/50 hover:text-ecsess-200 border-ecsess-500/20 flex items-center gap-2 rounded border px-4 py-2 text-xs font-semibold text-zinc-400 transition-colors"
					>
						<Github class="size-3" />
						View Profile
					</a>
				{/if}
				{#if email}
					<a
						href="mailto:{email}"
						class="hover:bg-ecsess-500/10 hover:border-ecsess-500/50 hover:text-ecsess-200 border-ecsess-500/20 flex items-center gap-2 rounded border px-4 py-2 text-xs font-semibold text-zinc-400 transition-colors"
					>
						<Mail class="size-3" />
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
		animation-range: entry 25% cover 40%;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.5);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
