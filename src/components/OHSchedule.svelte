<script lang="ts">
  import type { OfficeHour } from '$lib/schemas';

  function parseTime(timeStr: string): number {
    let timeRegexMatch = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
    if (!timeRegexMatch) return 0;

    let hours = parseInt(timeRegexMatch[1], 10);
    let minutes = parseInt(timeRegexMatch[2] || '0', 10);
    let period = timeRegexMatch[3];

    if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

    return Number(hours * 60 + minutes); // total minutes since midnight
  }
  let { allOhs }: { allOhs: OfficeHour[] } = $props();
  let sortedOHs = allOhs.sort((a, b) => {
    return parseTime(a.startTime) - parseTime(b.startTime);
  });
</script>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
  {#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
    <div class="items-stretch justify-self-center min-w-[80%] max-w-[16rem] md:min-w-[90%] md:max-w-[20rem]">
      <p class="text-center text-xl">{day}</p>
      {#each sortedOHs.filter((OH) => OH.day == day) as OH}
        <div
          class="bg-ecsess-200 text-ecsess-black m-2 grid h-28 lg:h-36 grid-cols-1 grid-rows-[2fr_4fr_3fr]
            place-content-center rounded-xl p-3 text-center"
        >
          <p class="border-b-ecsess-600 md:text-md border-b-2 text-base lg:text-lg">
            {OH.startTime} - {OH.endTime}
          </p>

          <p class="text-ecsess-800 place-self-center font-extrabold text-lg md:text-xl lg:text-xl">
            {OH.member.name.split(' ')[0]}
          </p>
          <p class="text-sm italic lg:text-base">{OH.member.position}</p>
        </div>
      {/each}
    </div>
  {/each}
</div>