<script lang="ts">
	// Reference: https://github.com/skeletonlabs/skeleton/tree/88844ffb67b7c9553c5245dd6d70146a3d6b8932/packages/skeleton-svelte/src/components/avatar
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	let { name, src }: { name: string; src: string } = $props();

	function getInitials(name: string): string {
		const words = name.trim().split(/\s+/);
		return words
			.slice(0, 5)
			.map((word) => word.charAt(0).toUpperCase())
			.join('');
	}
</script>

<Avatar class="size-26 md:size-32">
	<Avatar.Image {src} class="h-full w-full rounded-full object-cover" />

	<Avatar.Fallback>
		<div class="bg-ecsess-400 flex h-full w-full items-center justify-center rounded-full">
			<span class="text-ecsess-black text-xl font-bold"> {getInitials(name)} </span>
		</div>
	</Avatar.Fallback>
</Avatar>
