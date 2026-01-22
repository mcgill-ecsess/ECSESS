<script lang="ts">
	import { CalendarDays, MapPin } from '@lucide/svelte';

	let { date, location } = $props<{
		date: string;
		location?: string;
	}>();
</script>

<div
	class="border-ecsess-800/30 bg-ecsess-900/60 pointer-events-none relative z-30 m-5 space-y-3 rounded-xl border p-4 backdrop-blur-sm"
>
	<div class="flex items-center gap-3">
		<div class="bg-ecsess-400 flex h-10 w-10 items-center justify-center rounded-full">
			<CalendarDays class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-ecsess-50 text-sm font-semibold">{date}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="bg-ecsess-400 flex h-10 w-10 items-center justify-center rounded-full">
			<MapPin class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-ecsess-50 text-sm font-semibold">{location ?? 'TBA'}</p>
		</div>
	</div>
</div>
