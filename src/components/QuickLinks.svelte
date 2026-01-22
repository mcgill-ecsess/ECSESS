<script lang="ts">
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';
</script>

<div class="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:mt-0">
	<Link href="/events">
		<Button
			class="ql-btn flex h-full min-h-[48px] w-full cursor-pointer items-center justify-center sm:min-h-[56px]"
		>
			ECSESS Events
		</Button>
	</Link>

	<Link href="/r/trot5th" external>
		<Button
			class="ql-btn flex h-full min-h-[48px] w-full cursor-pointer items-center justify-center sm:min-h-[56px]"
		>
			Trottier 5th booking
		</Button>
	</Link>

	<Link href="/r/ctrlz" external>
		<Button
			size="lg"
			class="ql-btn flex h-full min-h-[48px] w-full cursor-pointer items-center justify-center sm:min-h-[56px]"
		>
			Ctrl+Z (feedback) form
		</Button>
	</Link>

	<!-- Sponsorship disabled -->
	<Link href="#">
		<Button
			disabled
			class="ql-btn flex h-full min-h-[48px] w-full cursor-not-allowed items-center justify-center sm:min-h-[56px]"
		>
			Sponsorship
		</Button>
	</Link>
</div>
