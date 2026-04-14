<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

	let {
		title = '_Resource Title_',
		description = 'Lorem ipsum',
		link = 'https://example.com'
	} = $props();
</script>

<Link href={link} external={true} class="group block h-full">
	<div
		class="bg-ecsess-black border-ecsess-800 hover:border-ecsess-600 relative flex h-full flex-col justify-between gap-3 rounded-xl border p-5 transition-all duration-200 hover:shadow-lg"
	>
		<!-- Top row: title + arrow -->
		<div class="flex items-start justify-between gap-3">
			<h3 class="text-ecsess-50 group-hover:text-ecsess-200 py-0 text-lg font-bold leading-snug transition-colors text-balance">
				{title}
			</h3>
			<span
				class="bg-ecsess-800 group-hover:bg-ecsess-600 mt-0.5 flex shrink-0 items-center justify-center rounded-full p-1.5 transition-colors duration-200"
			>
				<ArrowUpRight size="16" class="stroke-ecsess-300 group-hover:stroke-ecsess-50 transition-colors" />
			</span>
		</div>

		<!-- Description -->
		<p class="text-ecsess-400 text-sm leading-relaxed">
			{description}
		</p>

		<!-- Bottom accent line -->
		<div class="bg-ecsess-700 group-hover:bg-ecsess-500 mt-1 h-px w-full transition-colors duration-200"></div>
	</div>
</Link>
