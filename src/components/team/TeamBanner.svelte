<script lang="ts">
let {name, src, role}:{
    name: string,
    src: string,
    role: string,
} = $props();
</script>

<div class="size-32 md:size-48 rounded-full">
    <img 
    class="size-full "
    src={src} alt={name}>
</div>
