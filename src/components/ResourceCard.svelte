<script>
	import {  CircleArrowRight } from '@lucide/svelte';
	import Link from '././Link.svelte';
	let { title = '_Resource Title_', children, link = 'https://example.com' } = $props();
</script>

<div class="h-fit w-xl px-4 bg-ecsess-50 rounded-lg relative">
	<div class="grid grid-cols-[5fr_1fr]">
		<div class="flex flex-col items-start p-4">
			<p class="text-ecsess-900 my-1 text-left text-xl font-semibold"> 
				{title} 
			</p>
			<p class="text-ecsess-400 text-left"> 
				{@render children()}
			</p>
		</div>
		<div class="absolute bottom-2 right-2">
			<Link href={link}>
				<CircleArrowRight size="42" class="stroke-ecsess-800 hover:stroke-ecsess-400 active:scale-90 transition duration-200 cursor-pointer"/>
			</Link>
		</div>
	</div>
</div>
