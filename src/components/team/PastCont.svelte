<script lang="ts">
	let { name, role, start, end } = $props<{
		name: string;
		role: string;
		start: any;
		end: any;
	}>();
</script>

<div class="p-2">
	{name}
</div>
<div class="p-2">
	{role}
</div>

<div class="hidden p-2 md:block">{start ? start : 'Unknown'}</div>

<div class="hidden p-2 md:block">{end ? end : 'Unknown'}</div>
