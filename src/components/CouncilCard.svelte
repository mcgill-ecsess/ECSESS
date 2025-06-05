<script>
	/**
	 * Schemas for Council Members:
	 * {
	 *   email,
	 *   name,
	 *   position,
	 *   positionDescription,
	 *   yearProgram
	 * }
	 */
	let { name, position, email, positionDescription, yearProgram } = $props();
</script>

<div class="card w-full max-w-md rounded-lg border-4 p-4">
	<p class="text-xl font-bold pb-2">{name} - <span class="text-sm"> {yearProgram} </span></p>
    <hr>
	<p class="text-base font-bold py-2">~ {position} ~</p>
	<p class="underline">{email}</p>
	<p class="text-sm">{positionDescription}</p>
</div>
