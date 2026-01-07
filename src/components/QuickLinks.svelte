<script lang="ts">
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';
</script>

<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
	<Link href="/events" button>
		<Button class="w-full">ECSESS Events</Button>
	</Link>

	<Link href="/r/trot5th" external button>
		<Button class="w-full">Trottier 5th booking</Button>
	</Link>

    <Link href="/r/ctrlz" external button>
        <Button size="lg" class="w-full">Ctrl+Z (feedback) form</Button>
    </Link>

	<!-- Sponsorship disabled -->
	<Link button>
		<Button disabled class="w-full">Sponsorship</Button>
	</Link>
</div>
