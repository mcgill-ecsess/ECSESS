<script lang="ts">
	import { CalendarDays, MapPin } from '@lucide/svelte';

	let { date, location } = $props<{
		date: string;
		location?: string;
	}>();
</script>

<div class="relative z-30 m-5 space-y-3 rounded-xl border border-ecsess-800/30 bg-ecsess-900/60 p-4 backdrop-blur-sm pointer-events-none">
	<div class="flex items-center gap-3">
		<div class="flex h-10 w-10 items-center justify-center rounded-full bg-ecsess-400">
			<CalendarDays class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-sm font-semibold text-ecsess-50">{date}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="flex h-10 w-10 items-center justify-center rounded-full bg-ecsess-400">
			<MapPin class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-sm font-semibold text-ecsess-50">{location ?? 'TBA'}</p>
		</div>
	</div>
</div>