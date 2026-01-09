<script>
    import SeoMetaTags from "components/layout/SeoMetaTags.svelte";
    import Section from "components/layout/Section.svelte";
    import Avatar from "components/team/Avatar.svelte";
</script>


<SeoMetaTags/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
    <div class="flex flex-col ">
        <p class="page-title">Meet the team!</p>
        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Current Team</h1>

        <Avatar src="/Technical.jpg" name="Someone" role="" />

        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Past Contributors</h1>
    </div>
</Section>
