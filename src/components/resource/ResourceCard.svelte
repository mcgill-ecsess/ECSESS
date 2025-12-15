<script>
	import { ExternalLink } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

	let { 
		title = '_Resource Title_', 
		description = "Lorem ipsum", 
		link = 'https://example.com' 
	} = $props();
</script>

<Link href={link}>
	<div class="bg-ecsess-50 border-ecsess-200 group relative flex h-full flex-col justify-between rounded-xl border p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ecsess-900/20 hover:border-ecsess-400">
		<div class="flex flex-col items-start text-left"> <div class="flex w-full justify-between items-start gap-4">
				<h3 class="text-ecsess-900 text-xl font-extrabold leading-tight tracking-tight">
					{title}
				</h3>
				<div class="text-ecsess-300 transition-colors duration-300 group-hover:text-ecsess-600">
					<ExternalLink size="24" strokeWidth={2.5} />
				</div>
			</div>
			
			<div class="mt-4 h-0.5 w-8 bg-ecsess-200 transition-all duration-300 group-hover:w-full group-hover:bg-ecsess-400"></div>

			<p class="text-ecsess-800 mt-4 text-sm leading-relaxed font-medium">
				{description}
			</p>
		</div>
	</div>
</Link>