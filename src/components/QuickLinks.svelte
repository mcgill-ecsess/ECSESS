<script lang="ts">
	import Link from 'components/Link.svelte';
</script>

<fieldset class="win-groupbox">
	<legend style="font-weight: bold; font-size: 11px; padding: 0 4px; color: #0a246a;">📌 Popular Resources</legend>

	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 4px;">
		<Link href="/events">
			<button class="win-btn w-full" style="font-size:11px; width: 100%;">
				📅 ECSESS Events
			</button>
		</Link>

		<Link href="/r/trot5th" external>
			<button class="win-btn w-full" style="font-size:11px; width: 100%;">
				🏫 Trottier 5th Booking
			</button>
		</Link>

		<Link href="/r/ctrlz" external>
			<button class="win-btn w-full" style="font-size:11px; width: 100%;">
				📝 Ctrl+Z Feedback
			</button>
		</Link>

		<button class="win-btn w-full" disabled style="font-size:11px; width: 100%; cursor: not-allowed;">
			💼 Sponsor ECSESS
		</button>
	</div>
</fieldset>
