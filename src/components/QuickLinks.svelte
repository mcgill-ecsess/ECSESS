<script lang="ts">
	import Button from 'components/Button.svelte';
</script>

<div>
	<p
		class="text-primary-content decoration-base-content mt-2 mb-6 text-lg font-bold tracking-wide underline decoration-2 underline-offset-8"
	>
		Popular resources
	</p>

	<div class="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:mt-0">
		<Button
			href="/events"
			variant="primary"
			size="md"
			class="h-full min-h-11 w-full justify-center"
		>
			ECSESS Events
		</Button>

		<Button
			href="/r/trot5th"
			external
			variant="primary"
			size="md"
			class="h-full min-h-11 w-full justify-center"
		>
			Trottier 5th Room Booking
		</Button>

		<Button
			href="/r/ctrlz"
			external
			variant="primary"
			size="md"
			class="h-full min-h-11 w-full justify-center"
		>
			Ctrl+Z feedback form
		</Button>

		<Button
			href="/sponsorship"
			disabled
			variant="primary"
			size="md"
			class="h-full min-h-11 w-full justify-center"
		>
			Sponsor ECSESS
		</Button>
	</div>
</div>
