<script>
    import Discord from "$lib/assets/Discord.svelte";
    import Github from "$lib/assets/Github.svelte";
    import Gmail from "$lib/assets/Gmail.svelte";
    import LinkedIn from "$lib/assets/LinkedIn.svelte";
    import { burgopen, screenWidth, sidebarwidth } from "$lib/stores";
    import { derived } from "svelte/store";

    // The width the component will be after animations finish
    // Prevents animating in with too much height due to wrapping
    let destinationWidth = derived([screenWidth,burgopen,sidebarwidth],([$screenWidth,$burgopen,$sidebarwidth])=>{
        if($burgopen){
            return $screenWidth - $sidebarwidth - 35
        }
        return $screenWidth - 35
    });
</script>

<div 
    class="wrapper" 
    style:width="{$destinationWidth}px"
    >
    <h2>Contact Me</h2>
    <p>Samuel Cleveland Oen</p>
    <p>Perth, Western Australia</p>
    <p>Email: samoen@gmail.com</p>
    <p>Phone: +61 459 753 902</p>
    <br>
    <div class="icons">
        <a class="barlink" href="mailto:samoen@gmail.com">
            <div class="icon">
                <Gmail />
            </div>
            <span>Email</span>
        </a>
        <a class="barlink" href="https://github.com/samoen">
            <div class="icon">
                <Github />
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
        <a class="barlink" href="https://discord.gg/7JfUv46y">
            <div class="icon">
                <Discord />
            </div>
            <span>Discord</span>
        </a>
    </div>
</div>

<style>
    .wrapper {
        margin-inline: auto;
        /* padding-block: 15px; */
        /* padding:15px; */
        /* padding-bottom:20px; */
        /* background-color: aqua; */
        /* width: 200px; */
        /* overflow-x: hidden; */

    }
    /* .wrapper > :not(.icons){
        margin: 10px;
    } */
    .icons {
        display: flex;
        flex-wrap: wrap;
        gap:30px;
        /* padding-left:15px; */
        /* background-color: blue; */
    }
    .icon {
        /* background-color: aqua; */
        height: 40px;
        width: 40px;
    }
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        flex-direction: column;
        /* height:80px; */
        /* padding:10px; */
    }
</style>
