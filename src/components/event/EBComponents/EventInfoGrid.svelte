<script lang="ts">
	import { CalendarDays, MapPin } from '@lucide/svelte';

	let { date, location } = $props<{
		date: string;
		location?: string;
	}>();
</script>

<div
	class="border-primary-soft bg-base pointer-events-none relative z-30 m-5 space-y-3 rounded-xl border p-4 backdrop-blur-sm"
>
	<div class="flex items-center gap-3">
		<div class="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
			<CalendarDays class="text-accent-content h-5 w-5" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-primary-content text-sm font-semibold">{date}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
			<MapPin class="text-accent-content h-5 w-5" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-primary-content text-sm font-semibold">{location ?? 'TBA'}</p>
		</div>
	</div>
</div>
