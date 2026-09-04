<script lang="ts">
	let {
		title,
		description = '',
		class: className = ''
	} = $props<{ title: string; description?: string; class?: string }>();
</script>

<div
	class="w-full max-w-7xl pt-6 text-center {className}"
	id="PageHeader"
	data-component="PageHeader"
>
	<h1 class="text-ecsess-50 mb-2 py-0 text-5xl font-bold text-balance md:text-6xl lg:text-7xl">
		{title}
	</h1>
	{#if description}
		<p
			class="text-ecsess-150 mx-auto mb-8 w-full max-w-3xl text-lg leading-relaxed md:text-xl lg:text-2xl"
		>
			{description}
		</p>
	{/if}
</div>
