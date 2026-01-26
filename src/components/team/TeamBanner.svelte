<script lang="ts">
	import { Github } from '@lucide/svelte';
	import Avatar from 'components/team/Avatar.svelte';

	let { idx, src, name, role, funFact } = $props();
</script>

<div
	class="fadeup relative flex flex-col rounded-2xl md:flex-row {idx % 2 == 0
		? 'md:-translate-x-1/12'
		: 'md:translate-x-1/12'} from-ecsess-800 to-ecsess-950 w-5/6 max-w-300 items-center bg-radial from-40% to-90% p-5"
>
	<!-- bg-linear-to-tl from-ecsess-300 to-ecsess-900-->
	<!-- Avatar box -->
	<Avatar {src} {name} {role} />
	<div class="flex-1">
		<h2>{name}</h2>
		<div>Fun Fact:</div>
		<div>{funFact}</div>
		<div>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid ex voluptate minus ratione
			animi unde beatae, maiores maxime adipisci alias, omnis vel, modi provident. Numquam accusamus
			nisi dolores nihil temporibus?
		</div>
	</div>

	<div class="absolute right-2 bottom-2 flex gap-2">
		<Github />
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
