<script>
    import Discord from "$lib/assets/Discord.svelte";
    import Github from "$lib/assets/Github.svelte";
    import Gmail from "$lib/assets/Gmail.svelte";
    import LinkedIn from "$lib/assets/LinkedIn.svelte";

</script>

<div class="wrapper">
    <h1>Contact Me</h1>
    <div class="icons">
        <a
        class="barlink" 
        href="mailto:samoen@gmail.com"
        >   
        <div class="icon">
            <Gmail/>
        </div>
        <span>Email</span>
    </a>
    <a
    class="barlink" 
    href="https://github.com/samoen"
    >   
    <div class="icon">
        <Github/>
    </div>
    <span>Github</span>
</a>
<a
class="barlink" 
href="https://www.linkedin.com/in/sam-oen-22001436/"
>   
<div class="icon">
    <LinkedIn />
</div>
<span>LinkedIn</span>
</a>
<a
    class="barlink" 
    href="https://discord.gg/7JfUv46y"
    >   
    <div class="icon">
        <Discord />
    </div>
    <span>Discord</span>
</a>
</div>
</div>

<style>
    .wrapper{
        /* padding:170px; */
        /* background-color: aqua; */
        /* width: 200px; */
        overflow-x: hidden;
    }
    .icons{
        display: flex;
        flex-wrap: wrap;
    }
    .icon{
        /* background-color: aqua; */
        height:40px;
        width: 40px;
    }
    a{
        text-decoration: none;
        display: flex;
        align-items: center;
        flex-direction: column;
        /* height:80px; */
        padding:10px;

    }
</style>