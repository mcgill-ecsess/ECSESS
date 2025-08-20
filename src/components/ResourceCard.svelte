<script>
	import { slide } from 'svelte/transition';
	import Button from './Button.svelte';
	import Link from './Link.svelte';
	let { title = '_Resource Title_', children, link = 'https://example.com' } = $props();
</script>

<div class="bg-ecsess-200 ring-6 ring-ecsess-600 hover:ring-ecsess-200/60 hover:shadow-3xl max-w-sm rounded-lg w-full transition-all" transition:slide>
	<Link href={link}>
		<div class="px-8 py-4">
			<p class="text-ecsess-800 px-2 text-xl font-semibold lg:text-2xl">
				{title}
			</p>

			<p class="text-ecsess-black pt-3 text-base font-normal lg:text-lg">{@render children()}</p>
		</div>
	</Link>
</div>
