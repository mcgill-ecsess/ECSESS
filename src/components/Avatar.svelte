<script lang="ts">
	// Reference: https://github.com/skeletonlabs/skeleton/blob/main/packages/skeleton-svelte/src/components/Avatar/Avatar.svelte
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
    // Note: size, font, etc., are styled with TailwindCSS classes
	let { name, size, src }: {name: string, size: string, src: string} = $props();
</script>

<Avatar
	{name}
	{src}
    font={"text-xl text-ecsess-black"}
	{size}
	background="bg-ecsess-400"
	imageBase="object-cover w-full h-full"
/>
