<script>
	import { ExternalLink } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

	let { 
		title = '_Resource Title_', 
		description = "Lorem ipsum", 
		link = 'https://example.com' 
	} = $props();
</script>

<!-- added target="_blank" and rel="noopener noreferrer" to open in new tab -->
<Link href={link} target="_blank" rel="noopener noreferrer" class="group block h-full no-underline">
	<div class="bg-ecsess-200 border-ecsess-300 group-hover:border-ecsess-400 relative flex h-full flex-col justify-between rounded-xl border p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ecsess-900/20">
		<div class="flex flex-col items-start text-left">
			<div class="flex w-full justify-between items-start gap-4">
				<h3 class="text-ecsess-900 text-xl font-extrabold leading-tight tracking-tight no-underline">
					{title}
				</h3>
				<div class="text-ecsess-600 transition-colors duration-300 group-hover:text-ecsess-800">
					<ExternalLink size="24" strokeWidth={2.5} />
				</div>
			</div>
			
			<div class="mt-4 h-0.5 w-8 bg-ecsess-400 transition-all duration-300 group-hover:w-full group-hover:bg-ecsess-500"></div>

			<p class="text-ecsess-800 mt-4 text-sm leading-relaxed font-medium no-underline">
				{description}
			</p>
		</div>
	</div>
</Link>