<script lang="ts">
    let { member, startTime, endTime } = $props();
</script>

<div class="card w-full bg-ecsess-200 text-ecsess-black max-w-md p-4 m-4 text-center rounded-xl">
  <p>{member.name}</p>
  <p>{member.position}</p>
  <hr>
  <p>{startTime} - {endTime}</p>
</div>