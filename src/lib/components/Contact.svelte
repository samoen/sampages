<script>
    import Discord from "$lib/assets/Discord.svelte";
    import Github from "$lib/assets/Github.svelte";
    import Gmail from "$lib/assets/Gmail.svelte";
    import LinkedIn from "$lib/assets/LinkedIn.svelte";
    import Phone from "$lib/assets/Phone.svelte";
    import ContactItem from "./ContactItem.svelte";

    // let PADDING = 60
    // The width the component will be after animations finish
    // Prevents animating in with too much height due to wrapping
    // let destinationWidth = derived([screenWidth,burgopen,sidebarwidth],([$screenWidth,$burgopen,$sidebarwidth])=>{
    //     if($burgopen){
    //         return $screenWidth - $sidebarwidth - PADDING
    //     }
    //     return $screenWidth - PADDING
    // });
</script>

<div class="wrapper">
    <h2>Contact Me</h2>
    <div class="icons">
        <ContactItem
            icon="{Phone}"
            path="#"
            title="Phone"
            detail="+61 459 753 902"
        />
        <ContactItem
            icon="{Gmail}"
            path="mailto:samoen@gmail.com"
            title="Email"
            detail="samoen@gmail.com"
        />
        <ContactItem
            icon="{Github}"
            path="https://github.com/samoen"
            title="Github"
            detail="github.com/samoen"
        />
        <ContactItem
            icon="{LinkedIn}"
            path="https://www.linkedin.com/in/sam-oen-22001436/"
            title="LinkedIn"
            detail="linkedin.com/in/sam-oen-22001436"
        />
        <ContactItem
            icon="{Discord}"
            path="https://discord.gg/7JfUv46y"
            title="Discord"
            detail="samoen"
        />
    </div>
</div>

<style>
    .wrapper {
        /* padding-block: 20px; */
        /* padding-inline: 15px; */
        /* overflow: auto; */
    }
    .icons {
        /* overflow: hidden; */
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        /* padding-left:15px; */
        /* background-color: blue; */
    }
</style>
