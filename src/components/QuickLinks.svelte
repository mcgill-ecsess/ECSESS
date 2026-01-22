<script lang="ts">
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';
</script>

<div>
	<p
		class="text-ecsess-50 decoration-ecsess-200 mt-2 mb-6 text-base font-bold tracking-wide underline decoration-2 underline-offset-8"
	>
		Popular resources
	</p>

	<div class="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:mt-0">
		<Link href="/events">
			<Button class="flex h-full w-full items-center justify-center">ECSESS Events</Button>
		</Link>

		<Link href="/r/trot5th" external>
			<Button class="flex h-full w-full items-center justify-center">
				Trottier 5th Room Booking
			</Button>
		</Link>

		<Link href="/r/ctrlz" external>
			<Button class="flex h-full w-full items-center justify-center">Ctrl+Z feedback form</Button>
		</Link>

		<!-- Sponsorship disabled -->
		<Link href="/sponsorship">
			<Button disabled class="flex h-full w-full items-center justify-center">
				Sponsor ECSESS
			</Button>
		</Link>
	</div>
</div>
