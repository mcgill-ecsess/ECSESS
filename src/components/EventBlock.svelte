<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { CalendarDays, MapPin, Link as LinkIcon, FilePen } from '@lucide/svelte';

	let {
		eventTitle,
		date,
		location,
		eventDescription,
		thumbnail,
		registrationLink,
		paymentLink,
		eventCategory
	} = $props();
</script>

<div class="bg-ecsess-50 text-ecsess-800 mx-auto w-[100%] rounded-2xl p-5 lg:w-[64%] lg:max-w-3xl">
	<div class="bg-ecsess-200 rounded-[20px]">
		<div
			class="bg-ecsess-200 grid h-[200px] place-items-center overflow-hidden rounded-[16px]"
			aria-label="Event banner"
		>
			{#if thumbnail}
				<img class="h-full object-cover" src={thumbnail} alt="Event banner" />
			{:else if eventCategory?.[0] === 'social'}
				<img class="h-full object-cover" src="/Social.jpg" alt="Social Placeholder" />
			{:else if eventCategory?.[0] === 'technical'}
				<img class="h-full object-cover" src="/Technical.jpg" alt="Technical Placeholder" />
			{:else if eventCategory?.[0] === 'professional'}
				<img class="h-full object-cover" src="/Professional.jpg" alt="Professional Placeholder" />
			{:else if eventCategory?.[0] === 'academic'}
				<img class="h-full object-cover" src="/Academic.jpg" alt="Academic Placeholder" />
			{:else}
				<img class="h-full object-cover" src="/ECSESS.png" alt="Default Placeholder" />
			{/if}
		</div>
	</div>

	<!-- content -->
	<div class="mt-[22px] grid gap-[18px]">
		<p
			class="text-ecsess-800 my-0 text-center text-xl leading-6 tracking-[0.3px] text-wrap lg:text-2xl lg:leading-8"
		>
			{eventTitle}
		</p>

		{#if eventDescription}
			<div class="text-ecsess-400 mx-auto max-w-[75ch] leading-relaxed">
				<PortableText value={eventDescription} />
			</div>
		{/if}

		<div class="mt-[6px] grid gap-4 md:grid-cols-2">
			<div class="bg-ecsess-100 grid gap-[10px] rounded-2xl px-4 py-[14px]">
				<div class="text-ecsess-800 flex items-center gap-2">
					<CalendarDays class="shrink-0" strokeWidth={2.5} />
					<span class="font-bold tracking-[0.2px]">Datetime:</span>
					<p class="m-0 text-left">{date}</p>
				</div>

				<div class="text-ecsess-800 flex items-center gap-2">
					<MapPin class="shrink-0" strokeWidth={2.5} />
					<span class="font-bold tracking-[0.2px]">Location:</span>
					<p class="m-0 text-left">{location ?? 'TBA'}</p>
				</div>
			</div>

			<div class="bg-ecsess-100 grid gap-[10px] rounded-2xl px-4 py-[14px]">
				<div class="text-ecsess-800 flex items-center gap-2">
					<FilePen class="shrink-0" strokeWidth={2.5} />
					<span class="font-bold tracking-[0.2px]">Registration:</span>
					{#if registrationLink}
						<a
							href={registrationLink}
							target="_blank"
							rel="noopener noreferrer"
							class="text-ecsess-800 text-left underline-offset-4 hover:underline"
						>
							Register Here
						</a>
					{:else}
						<p class="m-0 text-left">Just drop in!</p>
					{/if}
				</div>

				<div class="text-ecsess-800 flex items-center gap-2">
					<LinkIcon class="shrink-0" strokeWidth={2.5} />
					<span class="font-bold tracking-[0.2px]">Payment:</span>
					{#if paymentLink}
						<a
							href={paymentLink}
							target="_blank"
							rel="noopener noreferrer"
							class="text-ecsess-800 text-left underline-offset-4 hover:underline"
						>
							Pay Here
						</a>
					{:else}
						<p class="m-0 text-left">Free!</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
