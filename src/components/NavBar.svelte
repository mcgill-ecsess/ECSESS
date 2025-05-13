<script>
	import NavButton from './NavButton.svelte';
	import ECSESS from 'assets/ECSESS.png';
</script>

<nav
	class="bg-ecsess-black text-ecsess-200 mx-auto flex min-w-fit flex-wrap items-center justify-center px-4 pt-2"
>
	<img src={ECSESS} alt="ECSESS Logo" class="w-20 p-2" />
	<NavButton href="/">Home</NavButton>
	<NavButton href="/council">Meet the council</NavButton>
	<NavButton href="/events">Events</NavButton>
	<NavButton href="/resources">Resources</NavButton>
	<NavButton href="/join">Join ECSESS</NavButton>
	<NavButton href="/ctrlz">Ctrl-Z</NavButton>
	{#if import.meta.env.DEV}
		<NavButton href="/showroom">Components</NavButton>
	{/if}
</nav>
