<script>
  let { onViewProfile, name, position, image } = $props();
  import placeholder from 'assets/placeholderAvatar.png';
  import { Avatar } from '@skeletonlabs/skeleton-svelte';

</script>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color:transparent;
    padding: 1.5rem;
    border-radius: 0.5rem;
    color: white;
    max-width: 400px;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }

  .profile-img :global(img) {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .info {
    flex: 1;
  }

  .name {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .role {
    color: #a0aec0;
    margin-bottom: 0.5rem;
  }

  .button {
    background-color: #2d3748;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    text-decoration: none;
    display: inline-block;
  }

  .button:hover {
    background-color: #4a5568;
  }
</style>

<div class="card">
	<div class="profile-img">
		{#if image}
			<Avatar src={image} {name}/>
		{:else}
			<Avatar src={placeholder} {name} />
		{/if}
	</div>
  <div class="info">
    <div class="name">{name}</div>
    <div class="role">{position}</div>
    <button class="button" onclick={onViewProfile}>View Profile</button>
  </div>
</div>



