<script>
	// import { slide } from 'svelte/transition';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	// FAQ closed by default
	let isOpen = $state(false);
	// const toggle = () => (isOpen = !isOpen);

	// Variable to be included into the component
	let { /** @type {String} */ entries } = $props();
</script>

<Accordion classes="w-[500px] max-w-[500px] transition-all ease-in-out" multiple>
	{#snippet iconClosed()}
		<svg
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path d="M9 5l7 7-7 7" />
		</svg>
	{/snippet}
	{#snippet iconOpen()}
		<svg
			class="rotate-90"
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path d="M9 5l7 7-7 7" />
		</svg>
	{/snippet}
	
	{#each entries as entry, index}
		<Accordion.Item
			value={index.toString()}
			classes="border-ecsess-200 mb-4 overflow-hidden rounded-xl border-2"
			leadClasses="text-xl font-bold"
			controlClasses="hover:bg-ecsess-black-hover
            flex w-inherit cursor-pointer items-center justify-between
            py-4 transition-colors ease-in-out"
			panelClasses=" border-t-ecsess-200 max-h-fit border-t-2 bg-transparent p-4 bg-ecsess-400"
		>
			<!-- Control -->
			{#snippet lead()}
				{entry.question}
			{/snippet}
			{#snippet control()}{/snippet}

			<!-- Panel -->
			{#snippet panel()}{entry.answer}{/snippet}
		</Accordion.Item>
	{/each}
</Accordion>

<!-- 
<div class="accordion-wrapper w-full max-w-[500px]">
	<div
		class="accordion-item
    border-ecsess-200 mb-4 overflow-hidden rounded-xl border-2
    {isOpen ? '' : 'open'}"
	>
		<button
			class="accordion-header hover:bg-ecsess-black-hover
            flex h-16 w-full cursor-pointer items-center justify-between
            px-4 transition-colors ease-in-out"
			onclick={toggle}
			aria-expanded={isOpen}
		>
			<span class="text-xl font-bold">{question}</span>
			<svg
				class="accordion-icon transform-cpu transition-all ease-in-out"
				width="20"
				height="20"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path d="M9 5l7 7-7 7" />
			</svg>
		</button>

		{#if isOpen}
			<div
				class="accordion-content border-t-ecsess-200 max-h-fit border-t-2 bg-transparent p-4 transition-all ease-in"
				transition:slide={{ duration: 300 }}
			>
				<p>{answer}</p>
			</div>
		{/if}
	</div>
</div> -->

<!-- <style>
	[aria-expanded='true'] .accordion-icon {
		transform: rotate(90deg);
	}

	.accordion-item.open .accordion-header,
	.accordion-item.open .accordion-content {
		background-color: var(--color-ecsess-black-hover);
	}
</style> -->
