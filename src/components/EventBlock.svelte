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

<div
  class="mx-auto max-w-[980px] rounded-[22px] bg-[#E8FFD9] p-[22px] shadow-[inset_0_0_0_4px_rgba(255,255,255,0.25),0_10px_18px_rgba(0,0,0,0.12)] text-[#0A3D2A]"
>
  <div class="rounded-[20px] bg-[#A6D6B8]">
    <div
      class="grid h-[200px] place-items-center overflow-hidden rounded-[16px] bg-[#5CAF95]"
      aria-label="Event banner"
    >
      {#if thumbnail}
        <img class="h-full object-fill" src={thumbnail} alt="Event banner" />
      {:else if eventCategory?.[0] === 'social'}
        <img class="h-full object-fill" src="/Social.jpg" alt="Social Placeholder" />
      {:else if eventCategory?.[0] === 'technical'}
        <img class="h-full object-fill" src="/Technical.jpg" alt="Technical Placeholder" />
      {:else if eventCategory?.[0] === 'professional'}
        <img class="h-full object-fill" src="/Professional.jpg" alt="Professional Placeholder" />
      {:else if eventCategory?.[0] === 'academic'}
        <img class="h-full object-fill" src="/Academic.jpg" alt="Academic Placeholder" />
      {:else}
        <img class="h-full object-fill" src="/ECSESS.png" alt="Default Placeholder" />
      {/if}
    </div>
  </div>

  <!-- content -->
  <div class="mt-[22px] grid gap-[18px]">
    <p class="m-0 text-center text-[clamp(26px,3vw,34px)] leading-[1.05] tracking-[0.3px] text-[#0A3D2A]">
      {eventTitle}
    </p>

    {#if eventDescription}
      <div class="max-w-[75ch] mx-auto leading-relaxed text-[#5E8174]">
        <PortableText value={eventDescription} />
      </div>
    {/if}

    <div class="mt-[6px] grid gap-4 md:grid-cols-2">

      <div class="grid gap-[10px] rounded-2xl bg-[#CCE7BA] px-4 py-[14px]">
        <div class="flex items-center gap-2 text-[#0A3D2A]">
          <CalendarDays class="shrink-0" strokeWidth={2.5} />
          <span class="font-bold tracking-[0.2px]">Datetime:</span>
          <p class="m-0 text-left">{date}</p>
        </div>

        <div class="flex items-center gap-2 text-[#0A3D2A]">
          <MapPin class="shrink-0" strokeWidth={2.5} />
          <span class="font-bold tracking-[0.2px]">Location:</span>
          <p class="m-0 text-left">{location ?? 'TBA'}</p>
        </div>
      </div>

      <div class="grid gap-[10px] rounded-2xl bg-[#CCE7BA] px-4 py-[14px]">
        <div class="flex items-center gap-2 text-[#0A3D2A]">
          <FilePen class="shrink-0" strokeWidth={2.5} />
          <span class="font-bold tracking-[0.2px]">Registration:</span>
          {#if registrationLink}
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              class="text-left text-[#0A3D2A] underline-offset-4 hover:underline"
            >
              Register Here
            </a>
          {:else}
            <p class="m-0 text-left">Just drop in!</p>
          {/if}
        </div>

        <div class="flex items-center gap-2 text-[#0A3D2A]">
          <LinkIcon class="shrink-0" strokeWidth={2.5} />
          <span class="font-bold tracking-[0.2px]">Payment:</span>
          {#if paymentLink}
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              class="text-left text-[#0A3D2A] underline-offset-4 hover:underline"
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
