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
		border-radius: 20px;
		padding:1.5rem; 
		color:  #0A3D2A;
		border-color:transparent;
		background-image: linear-gradient(to bottom right, #E8FFD9, #97C583);
		max-width: 450px;
		height: 250px;
	}

	.profile-img{
    border-radius: 10%;
    overflow: hidden;
	}

	.profile-img :global(img) {
    object-fit: cover;
    max-width: 100%;
  }
</style>

<div class="card">
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

		<a href="mailto:{email}" class="py-2 text-sm underline">{email}</a>
	</div>
</div>
