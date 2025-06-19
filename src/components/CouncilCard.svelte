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

<style>
	.card{
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color:transparent;
		padding: 1.5rem;
		border-radius: 20px;
		color:  #0A3D2A;
		background-color: #E8FFD9;
		max-width: 500px;
	}

	.profile-img{
    border-radius: 10%;
    overflow: hidden;
	}

	.profile-img :global(img) {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

</style>

<div class="card h-1/2 max-h-1/2 w-full max-w-1/6 rounded-lg border-4 p-4">
	<!-- <img class="size-4/5" src={placeholder} alt="Placeholder"> -->
	<!-- <Avatar src={placeholder} {name} /> -->
	<div class="avatar-container justify-left">
		<div class="profile-img justify-center">
			{#if image}
				<Avatar src={image} {name}/>
			{:else}
				<Avatar src={placeholder} {name} />
			{/if}
		</div>	
	<span class="yearProgram text-sm justify-center"> {yearProgram} </span>
	</div>
	<div class="content">
		<p class="pb-2 text-xl font-bold">{name} </p>
		<hr />
		<p class="py-2 text-base">{position}</p>
		<p class="pb-2 text-xs">{positionDescription}</p>
		<hr />

		<p class="py-2 text-sm underline">{email}</p>
	</div>
</div>
