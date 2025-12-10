<script>
	import { CircleArrowRight } from '@lucide/svelte';
	import Link from 'components/Link.svelte';
	let { title = '_Resource Title_', description = "Lorem ipsum", link = 'https://example.com' } = $props();
</script>

<div class="bg-ecsess-50 relative h-fit max-w-xl min-w-12 rounded-md px-4 py-2 md:py-0 hover:shadow-md transition-shadow border border-ecsess-100">
	<div class="grid grid-cols-1 md:grid-cols-[7fr_1fr]">
		<div class="flex flex-col items-start p-4">
			<p class="text-ecsess-900 my-1 pb-1 text-left text-xl font-extrabold">
				{title}
			</p>
			<p class="text-ecsess-700 text-left text-base">
				{description}
			</p>
		</div>
		<div class="m-4 place-self-center">
			<Link href={link}>
				<CircleArrowRight
					size="42"
					class="stroke-ecsess-700 hover:stroke-ecsess-500 cursor-pointer transition duration-200 active:scale-90"
				/>
			</Link>
		</div>
	</div>
</div>
