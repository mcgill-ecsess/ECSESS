<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		class?: string;
	}

	let { title, description = '', class: className = '' }: Props = $props();
</script>

<div
	class="w-full max-w-7xl pt-6 text-center {className}"
	id="PageHeader"
	data-component="PageHeader"
>
	<h1 class="mb-2 py-0 text-5xl font-bold text-balance text-ecsess-50 md:text-6xl lg:text-7xl">
		{title}
	</h1>
	{#if description}
		<p
			class="mx-auto mb-8 w-full max-w-3xl text-lg leading-relaxed text-ecsess-150 md:text-xl lg:text-2xl"
		>
			{description}
		</p>
	{/if}
</div>
