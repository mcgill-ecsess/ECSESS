<script lang="ts">
	let { name, url, logo } = $props();
</script>

<a href={url} target="_blank" rel="noopener noreferrer">
	<div>
        <img src={logo} alt={`"${name}" company logo`} />
        <p>{name}</p>
	</div>
</a>
