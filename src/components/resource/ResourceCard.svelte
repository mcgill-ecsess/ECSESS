<script>
	import { CircleArrowRight } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

	let { 
		title = '_Resource Title_', 
		description = "Lorem ipsum", 
		link = 'https://example.com' 
	} = $props();
</script>

<div class="bg-ecsess-50 border-ecsess-200 group relative flex h-full flex-col justify-between rounded-xl border p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ecsess-900/20">
	<div class="flex flex-col items-start">
		<h3 class="text-ecsess-900 mb-3 text-xl font-extrabold leading-tight tracking-tight">
			{title}
		</h3>
		<p class="text-ecsess-800 text-sm leading-relaxed font-medium">
			{description}
		</p>
	</div>
	
	<div class="mt-6 flex w-full justify-end border-t border-ecsess-200 pt-4">
		<Link href={link}>
			<div class="flex items-center gap-2 text-ecsess-700 transition-colors group-hover:text-ecsess-500 font-bold">
				<span>Access Resource</span>
				<CircleArrowRight
					size="24"
					class="transition-transform duration-300 group-hover:translate-x-1"
				/>
			</div>
		</Link>
	</div>
</div>