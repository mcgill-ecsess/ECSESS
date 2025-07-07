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
</script>

<style lang="postcss">
	@reference '../app.css';

	.card {
		@apply flex items-center gap-4 bg-transparent rounded-2xl p-6 text-ecsess-800 border-transparent max-w-[450px] h-[250px];
		background-image: linear-gradient(to bottom right, #E8FFD9, #97C583);
	}

	.profile-img {
		@apply w-32 h-32 shadow-md overflow-hidden rounded-lg;
	}

	.profile-img :global(img) {
		@apply w-full h-full object-cover;
	}

	.name {
    @apply text-xl font-bold;
  	}

</style>

<div class="card">
	<!-- <img class="size-4/5" src={placeholder} alt="Placeholder"> -->
	<!-- <Avatar src={placeholder} {name} /> -->
	<div class="avatar-container justify-left">
		<div class="profile-img justify-center">
			<img src={image || placeholder} alt={name} />
		</div>	
	<span class="yearProgram text-sm justify-center"> {yearProgram} </span>
	</div>
	<div class="content">
		<p class="name">{name} </p>
		<p class="py-2 text-base">{position}</p>
		<p class="pb-2 text-xs">{positionDescription}</p>
		<a href="mailto:{email}" class="py-2 text-sm underline">{email}</a>
	</div>
</div>
