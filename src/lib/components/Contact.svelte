<script>
    import Discord from "$lib/assets/Discord.svelte";
    import Github from "$lib/assets/Github.svelte";
    import Gmail from "$lib/assets/Gmail.svelte";
    import LinkedIn from "$lib/assets/LinkedIn.svelte";
    import Phone from "$lib/assets/Phone.svelte";
    import { burgopen, screenWidth, sidebarwidth } from "$lib/stores";
    import { derived } from "svelte/store";

    let PADDING = 60

    // The width the component will be after animations finish
    // Prevents animating in with too much height due to wrapping
    let destinationWidth = derived([screenWidth,burgopen,sidebarwidth],([$screenWidth,$burgopen,$sidebarwidth])=>{
        if($burgopen){
            return $screenWidth - $sidebarwidth - PADDING
        }
        return $screenWidth - PADDING
    });
</script>

<div 
    class="wrapper" 
    style:width="{$destinationWidth}px"
    >
    <h2>Contact Me</h2>
    <p>Samuel Cleveland Oen</p>
    <p>Perth, Western Australia</p>
    <br>
    <div class="icons">
        <div class="contactItem brutal-border">
            <!-- <div class="iconAndType"> -->
                <div class="icon">
                    <Phone />
                </div>
            <!-- </div> -->
            <span>
                Phone
                <br>
                +61 459 753 902
            </span>
        </div>
        
        <div class="contactItem brutal-border">
            <a class="barlink" href="mailto:samoen@gmail.com">
                <div class="icon">
                    <Gmail />
                </div>
            </a>
            <span>
                Email<br>samoen@gmail.com
            </span>
            
        </div>
        
        <div class="contactItem brutal-border">
            <a class="barlink" href="https://github.com/samoen">
                <div class="icon">
                    <Github />
                </div>
            </a>
            <span>Github<br>github.com/samoen</span>
        </div>
        <div class="contactItem brutal-border">
            <a
            class="barlink"
            href="https://www.linkedin.com/in/sam-oen-22001436/"
            >
                <div class="icon">
                    <LinkedIn />
                </div>
            </a>
            <span>LinkedIn<br>linkedin.com/in/sam-oen-22001436</span>
        </div>
        <div class="contactItem brutal-border">
            <a class="barlink" href="https://discord.gg/7JfUv46y">
                <div class="icon">
                    <Discord />
                </div>
            </a>
            <span>Discord<br>samoen</span>
        </div>
    </div>
</div>

<style>
    .wrapper {
        margin-inline: auto;
        margin-block: 20px;
        /* padding-block: 15px; */
        /* padding:15px; */
        /* padding-bottom:20px; */
        /* background-color: aqua; */
        /* width: 200px; */
        /* overflow-x: hidden; */

    }
    .contactItem{
        background-color: var(--colorlight);
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        gap:10px;
        padding-inline: 8px;
        padding-block: 6px;
    }
    /* .iconAndType{
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */
    /* .wrapper > :not(.icons){
        margin: 10px;
    } */
    .icons {
        display: flex;
        flex-wrap: wrap;
        gap:10px;
        /* padding-left:15px; */
        /* background-color: blue; */
    }
    .icon {
        /* background-color: aqua; */
        height: 50px;
        /* width: 50px; */
        /* align-self: stretch; */

    }
    .barlink {
        /* background-color: aqua; */
        text-decoration: none;
        display: flex;
        align-items: center;
        flex-direction: column;
        /* height:80px; */
        /* padding:10px; */
    }
</style>
