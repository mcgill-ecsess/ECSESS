<script>
	let { onViewProfile, name, position, image } = $props();
	import Button from 'components/Button.svelte';
	import CouncilAvatar from 'components/council/CouncilAvatar.svelte';
</script>

<article
	class="group flex w-full min-w-0 items-center gap-5 rounded-xl border border-ecsess-600/20 bg-ecsess-800/40 p-5 text-ecsess-100 shadow-lg transition hover:border-ecsess-500/30 hover:bg-ecsess-800/60 hover:shadow-xl focus-within:ring-2 focus-within:ring-ecsess-400/50 sm:gap-6 sm:p-6 md:p-6 lg:gap-8 lg:p-8"
>
	<div class="shrink-0">
		<CouncilAvatar {name} src={image} />
	</div>
	<div class="min-w-0 flex-1 text-left">
		<h3 class="text-lg font-bold leading-tight sm:text-xl md:text-2xl lg:text-3xl">{name}</h3>
		<p class="text-ecsess-200 mt-1 text-sm italic sm:text-base lg:text-lg">{position}</p>
		<div class="mt-4 lg:mt-5">
			<Button onclick={onViewProfile}>View Profile</Button>
		</div>
	</div>
</article>
