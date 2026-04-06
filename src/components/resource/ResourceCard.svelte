<script>
	import { CircleArrowRight } from '@lucide/svelte';
	import Link from 'components/Link.svelte';
	let {
		title = '_Resource Title_',
		description = 'Lorem ipsum',
		link = 'https://example.com'
	} = $props();
</script>

<div
	class="bg-primary-content border-border relative h-fit max-w-xl min-w-12 rounded-md border px-4 py-2 transition-shadow hover:shadow-md md:py-0"
>
	<div class="grid grid-cols-1 md:grid-cols-[7fr_1fr]">
		<div class="flex flex-col items-start p-4">
			<p class="text-primary-background my-1 pb-1 text-left text-xl font-extrabold">
				{title}
			</p>
			<p class="text-primary-hover text-left text-lg">
				{description}
			</p>
		</div>
		<div class="m-4 place-self-center">
			<Link href={link}>
				<CircleArrowRight
					size="42"
					class="stroke-primary-hover hover:stroke-primary cursor-pointer transition duration-200 active:scale-90"
				/>
			</Link>
		</div>
	</div>
</div>
