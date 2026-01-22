<script lang="ts">
	import { Github, Mail } from '@lucide/svelte';
	import Button from 'components/Button.svelte';
	import Avatar from 'components/team/Avatar.svelte';

	let { idx, src, name, year, role, funFact, github, email } = $props<{
		idx: number;
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
	class="fadeup border-ecsess-500/20 shadow-ecsess-950/50 from-ecsess-900/90 via-ecsess-900/70 to-ecsess-900/50 hover:shadow-ecsess-500/10 relative flex w-full flex-col
	items-center rounded-3xl border bg-linear-to-br p-5 py-15 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 xl:flex-row"
>
	<!--Icon Box-->
	<div class="absolute top-0 right-0 left-0 flex items-start gap-2 p-4">
		{#if role}
			<span
				class="bg-ecsess-500/10 border-ecsess-500/30 text-ecsess-100 rounded-full border px-4 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase shadow-inner shadow-white/5 backdrop-blur-md"
			>
				{role}
			</span>
		{/if}

		{#if year}
			<span
				class="bg-ecsess-500/10 border-ecsess-500/30 text-ecsess-100 rounded-full border px-4 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase shadow-inner shadow-white/5 backdrop-blur-md"
			>
				{year}
			</span>
		{/if}
	</div>
	<!-- Avatar box -->
	<Avatar {src} {name} {role} />
	<!--Content box-->
	<div
		class="flex flex-1 flex-col items-center justify-center text-center xl:items-start xl:text-left"
	>
		<!--Header-->
		<h1
			class="flex items-center justify-center text-3xl font-black tracking-tight text-white drop-shadow-lg xl:justify-start"
		>
			{name}
		</h1>

		<!--Content-->
		<div class="flex w-full flex-col border-t-2 py-2">
			<div
				class="flex w-full flex-col items-center justify-center gap-1 xl:items-start xl:justify-start"
			>
				<p class="text-ecsess-400 text-[0.65rem] font-bold tracking-widest uppercase">Email</p>
				<a
					class="text-ecsess-100 hover:border-ecsess-400 border-b border-transparent break-all transition-colors hover:text-white"
					href="mailto:{email}">{email}</a
				>
			</div>

			<!--Fun Fact-->
			<div class="flex w-full flex-col items-center justify-center py-4 xl:items-start">
				<h2 class="text-ecsess-400 m-0 mb-2 p-0 text-[0.65rem] font-bold tracking-widest uppercase">
					Fun Fact
				</h2>
				<div class="text-ecsess-100 text-center leading-relaxed font-light xl:text-left">
					{funFact}
				</div>
			</div>

			<!--GitHub/Maybe other link in the future-->
			<div
				class="border-ecsess-500/20 flex flex-col items-center justify-center border-t py-4 xl:items-start"
			>
				<h2 class="text-ecsess-400 m-0 p-0 text-[0.65rem] font-bold tracking-widest uppercase">
					Contact
				</h2>
				<div class="mt-2 flex flex-wrap justify-center gap-2">
					{#if github}
						<Button onclick={() => window.open(github, '_blank')}>
							<Github class="size-4" />
						</Button>
					{/if}

					{#if email}
						<Button onclick={() => window.open(`mailto:${email}`, '_blank')}>
							<Mail class="size-4" />
						</Button>
					{/if}
				</div>
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
