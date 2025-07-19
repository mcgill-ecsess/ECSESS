<script>
	let { onViewProfile, name, position, image } = $props();
	import placeholder from 'assets/placeholderAvatar.png';
	import Button from 'components/Button.svelte';
</script>

<div class="text-ecsess-200 flex max-w-lg items-center gap-6 justify-around rounded-lg bg-transparent p-4">
	<!-- Profile picture -->
	<div class="size-32 overflow-hidden rounded-full">
		<img src={image || placeholder} alt={name} class="size-full object-cover" />
	</div>
	<div class="text-left">
		<div class="text-xl font-bold">{name}</div>
		<div class="text-ecsess-200 mb-2">{position}</div>
		<Button onclick={onViewProfile}>View Profile</Button>
	</div>
</div>
