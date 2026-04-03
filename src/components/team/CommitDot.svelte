<script lang="ts">
	let { active = false } = $props<{
		active?: boolean;
	}>();
</script>

<div class="relative flex items-center justify-center">
	{#if active}
		<!-- Active: glowing green pulsing dot with ring -->
		<span class="relative flex size-5 items-center justify-center">
			<span
				class="bg-ecsess-400 absolute inline-flex size-5 animate-ping rounded-full opacity-60"
			></span>
			<span
				class="bg-ecsess-200 ring-ecsess-400 relative inline-flex size-3.5 rounded-full ring-2"
			></span>
		</span>
	{:else}
		<!-- Past: subtle dot -->
		<span class="bg-ecsess-600 ring-ecsess-700 inline-flex size-3 rounded-full ring-2"></span>
	{/if}
</div>
