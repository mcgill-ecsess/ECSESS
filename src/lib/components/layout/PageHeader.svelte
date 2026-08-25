<script lang="ts">
	let {
		title,
		description = '',
		class: className = ''
	} = $props<{ title: string; description?: string; class?: string }>();
</script>

<div class="w-full max-w-7xl pt-6 text-left {className}">
	<p class="text-ecsess-500 mb-2 text-xs font-bold tracking-[0.2em] uppercase">ECSESS</p>
	<h1 class="text-ecsess-50 mb-2 py-0 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
		{title}
	</h1>
	{#if description}
		<p class="text-ecsess-400 mb-8 max-w-xl text-base leading-relaxed">{description}</p>
	{/if}
</div>
