<script>
  let { onViewProfile, name, position, image } = $props();
  import placeholder from 'assets/placeholderAvatar.png';
	import Button from 'components/Button.svelte';

</script>

<style lang="postcss">
	@reference '../app.css';

  .card {
    @apply flex items-center gap-4 bg-transparent p-6 rounded-lg text-ecsess-200 max-w-[400px];
  }

  .profile-img {
    @apply size-[100px] rounded-full overflow-hidden; 
  }

  .profile-img :global(img) {
    @apply object-cover size-full;
  }

  .info {
    @apply flex-1;
  }

  .name {
    @apply text-xl font-bold;
  }

  .role {
    @apply text-ecsess-200 mb-2;
  }
</style>

<div class="card">
	<div class="profile-img">
		<img src={image || placeholder} alt={name} />
	</div>
  <div class="info">
    <div class="name">{name}</div>
    <div class="role">{position}</div>
    <!-- <button class="button" onclick={onViewProfile}>View Profile</button> -->
    <Button onclick={onViewProfile}>View Profile</Button>
  </div>
</div>



