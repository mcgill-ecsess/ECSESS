<script lang="ts">
	import { CalendarDays, MapPin } from '@lucide/svelte';

	let {
		date,
		location,
		compact = false
	} = $props<{
		date: string;
		location?: string;
		compact?: boolean;
	}>();
</script>

<div
	class="border-ecsess-800/30 bg-ecsess-900/60 relative z-30 space-y-3 rounded-xl border backdrop-blur-sm {compact
		? 'm-0 p-2.5'
		: 'm-0 p-4 md:p-5'}"
>
	<div class="flex items-center gap-3">
		<div class="bg-ecsess-400 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
			<CalendarDays class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-ecsess-50 line-clamp-2 text-xs font-semibold md:text-sm">{date}</p>
		</div>
	</div>

	<div class="flex items-center gap-3">
		<div class="bg-ecsess-400 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
			<MapPin class="h-5 w-5 text-white" strokeWidth={2.5} />
		</div>
		<div class="flex-1">
			<p class="text-ecsess-50 line-clamp-2 text-xs font-semibold md:text-sm">
				{location ?? 'TBA'}
			</p>
		</div>
	</div>
</div>
