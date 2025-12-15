<script>
	let { onViewProfile, name, position, image } = $props();
	import Button from 'components/Button.svelte';
	import CouncilAvatar from 'components/council/CouncilAvatar.svelte';
</script>

<div class="text-ecsess-100 flex max-w-md items-center gap-6 p-3">
	<!-- Profile picture -->
	<div>
		<CouncilAvatar {name} src={image} />
	</div>
	<div class="text-left">
		<div class="text-xl font-bold md:text-2xl">{name}</div>
		<div class="text-ecsess-200 mb-2 text-sm italic md:text-base">{position}</div>
		<Button onclick={onViewProfile}>View Profile</Button>
	</div>
</div>
