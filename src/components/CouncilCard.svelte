<script>
	/**
	 * Schemas for Council Members:
	 * {
	 *   email,
	 *   name,
	 *   position,
	 *   positionDescription,
	 *   yearProgram,
	 * 	 image // CDN URL from Sanity CMS
	 * }
	 */
	let { name, position, email, positionDescription, yearProgram, image } = $props();
	import placeholder from 'assets/placeholderAvatar.png';
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="card h-1/2 max-h-1/2 w-full max-w-1/6 rounded-lg border-4 p-4">
	<!-- <img class="size-4/5" src={placeholder} alt="Placeholder"> -->
	<!-- <Avatar src={placeholder} {name} /> -->
	{#if image}
		<Avatar src={image} {name} />
	{:else}
		<Avatar src={placeholder} {name} />
	{/if}
	<p class="pb-2 text-xl font-bold">{name} - <span class="text-sm"> {yearProgram} </span></p>
	<hr />
	<p class="py-2 text-base font-bold">~ {position} ~</p>
	<p class="underline">{email}</p>
	<p class="text-sm">{positionDescription}</p>
</div>
