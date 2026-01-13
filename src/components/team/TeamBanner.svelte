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
	class="fadeup shadow-ecsess-black relative flex flex-col rounded-2xl
	border-2 border-dotted shadow-2xl md:flex-row
	{idx % 2 == 0
		? 'bg-linear-to-l md:-translate-x-1/12'
		: 'bg-linear-to-r md:translate-x-1/12'} from-ecsess-800 to-ecsess-900/50 w-5/6 max-w-4xl min-w-xs items-center from-20% to-80% p-10"
>
	<!--Icon Box-->
	<div class="absolute top-0 right-0 left-0 flex items-start gap-2 p-4">
		{#if role}
			<span
				class="bg-ecsess-500 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
			>
				{role}
			</span>
		{/if}

		{#if year}
			<span
				class="bg-ecsess-500 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
			>
				{year}
			</span>
		{/if}
	</div>
	<!-- Avatar box -->
	<Avatar {src} {name} {role} />
	<!--Content box-->
	<div class="flex flex-1 flex-col items-center justify-center md:items-start">
		<!--Header-->
		<h1 class=" flex items-center justify-center md:justify-start">{name}</h1>

		<!--Content-->
		<div class="flex w-full flex-col border-t-2 py-2">
			<div class="flex w-full justify-center gap-2 md:justify-start">
				<p>Email:</p>
				<a class="break-all" href="mailto:{email}">{email}</a>
			</div>

			<!--Fun Fact-->
			<div class="flex w-full flex-col items-center justify-center py-2 md:items-start">
				<h2>Fun Fact:</h2>
				<div>{funFact}</div>
			</div>

			<!--GitHub/Maybe other link in the future-->
			<div class="flex items-center justify-center border-t-2 py-2 md:justify-start">
				<h2>Contact:</h2>
				<div class="flex flex-wrap justify-center gap-2 p-3">
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
