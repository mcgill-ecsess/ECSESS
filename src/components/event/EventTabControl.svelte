<script>
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
    let { value, children } = $props();
</script>

<Tabs.Control
	{value}
	classes="hover:border-b-ecsess-150 border-b-4 transition-all ease-in-out pb-2 text-lg  active:border-b-ecsess-500 px-2"
	stateActive="border-b-ecsess-350"
>
	{@render children()}
</Tabs.Control>
