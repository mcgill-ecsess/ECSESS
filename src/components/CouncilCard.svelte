<script>
	let { onViewProfile, name, position, image } = $props();
	import placeholder from 'assets/placeholderAvatar.png';
	import Button from 'components/Button.svelte';
	import Avatar from 'components/Avatar.svelte';
</script>

<div class="text-ecsess-200 flex max-w-md items-center gap-6 justify-between p-3">
	<!-- Profile picture -->
  <div>
    <Avatar {name} size={"size-26 md:size-32"} src={image}/>
  </div>
	<div class="text-left">
		<div class="text-xl md:text-2xl font-bold">{name}</div>
		<div class="text-sm md:text-base text-ecsess-200 mb-2 italic">{position}</div>
		<Button onclick={onViewProfile}>View Profile</Button>
	</div>
</div>
