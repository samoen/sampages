<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import Search from "$lib/icons/Search.svelte";
    let burgopen = false;
    let oh: number;
    let barheight:number =0;
    let sidewidth:number =0;
</script>

<svelte:head>
    <title>Sam pages</title>
</svelte:head>

<!-- <svelte:body ></svelte:body> -->
<!-- <svelte:window style="--barheight: {barheight}px; --sidewidth:{sidewidth}px"></svelte:window> -->

<div class="top" style="--barheight: {barheight}px; --sidewidth:{sidewidth}px">


<div class="barandnav" bind:offsetHeight={barheight}>
    <div class="topbar" >
        <span
            class="baricon"
            on:click={() => {
                burgopen = !burgopen;
            }}
            on:keydown>🍔</span
        >
        <!-- {barheight} -->
        <!-- {sidewidth} -->
        <div
            class="barsection"
            on:click={() => {
                goto(`${base}/`);
            }}
            on:keydown
        >
            <p class="barp">
                SamCorp
            </p>
            <!-- <img class="heroicon" src="logooen.png" alt="hey" /> -->
        </div>
        <button
            class="themer baricon righty"
            on:click={() => {
                window.document.body.classList.toggle("dark-mode");
            }}
            on:keydown>💡</button
        >
    </div>
    {#if burgopen}
        <div class="nav" bind:offsetHeight={oh}>
            <a href="{base}/">
                <!-- <Search></Search> -->
                <img class="navimg" src="pachnor.png" alt="home" />
                Home
            </a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
            <a href="{base}/about">About</a>
        </div>
        {/if}

        <div class="sidebar" bind:offsetWidth={sidewidth}>
            {#if burgopen}
            <div class="sidebarinner">
                <a class="sideitem" href="{base}/">
                    <!-- <Search></Search> -->
                    <img class="navimg" src="pachnor.png" alt="home" />
                    Home
                </a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>
                <a class="sideitem" href="{base}/about">About</a>

            </div>
            {/if}
        </div>
</div>
<!-- <div class="tray"> -->

<div class="slotandfoot" >
    <slot />
    <footer class="foot">
        <hr />
        <p>&copy Sam Oen</p>
        <!-- <div class="spacer" /> -->
    </footer>
</div>
</div>
<!-- </div> -->

<style>
    .sidebar {
        position: fixed;
        top:var(--barheight);
        bottom:0;
        background-color: var(--colorsecondary);
        max-width: 100px;
        overflow: auto;
        z-index: 3;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .sidebarinner{
        border: 4px solid var(--coloritem);
        /* border-top: none; */

    }
    .sideitem{
        white-space: nowrap;
        margin:5px;
        padding:10px
    }
    .tray {
        /* display: flex; */
        /* position: relative; */
    }
    .slotandfoot {
        /* display: inline; */
        /* display: flex; */
        /* flex-direction: column; */
        /* height:fit-content; */
        /* min-height:100dvh; */
        /* justify-content: space-between; */
        /* min-height: 100%; */
        position: relative;
        /* overflow: scroll; */
        /* padding-top: var(--barheight); */
        /* padding-left: var(--sidewidth); */
        top: var(--barheight);
        left: var(--sidewidth);
        width: calc(100vw - var(--sidewidth));
        background-color: var(--colorprimary);
        /* bottom:; */

        /* width: fit-content; */
        /* height:auto; */
        /* padding:100px */
    }
    .foot {
        /* flex-grow: 1; */
        /* background-color: var(--colorsecondary); */
        /* position: absolute; */
        /* bottom:0; */
        /* flex:1; */
        /* display: flex; */
        /* flex-direction: column; */
        /* justify-content: space-between; */
        /* border-top:7px solid #bbb; */
        padding: 10px;
        /* align-items: stretch; */
    }
    hr {
        /* position:absolute; */
        /* bottom: 0; */
        /* margin: 10px; */
        margin-bottom: 10px;
        width: 90%;
        border: 2px solid var(--coloritem);
        border-radius: 3px;
        border-color: var(--colortext);
        opacity: 50%;
    }
    .barandnav {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        padding: 0;
        z-index: 3;
    }
    
    .topbar {
        background-color: var(--colorsecondary);
        /* background-color: rgba(255, 0, 0, 0.3); */
        /* height:50px; */
        /* padding-left: 1rem; */
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        border: 4px solid var(--coloritem);
        /* align-items: stretch; */
        /* gap: 1rem; */
        /* align-items: flex-start; */
        /* align-content:baseline; */
        /* overflow: hidden; */
    }
    .barsection {
        display: flex;
        align-items: center;
    }
    .barp{
        user-select: none;
        font-size: 150%;
    }
    .heroicon{
        width: 150%;
        height: 90%;
    }
    .baricon {
        /* line-height: 100px; */
        cursor: pointer;
        padding: 0;
        margin: 0;
        background-color: var(--colorsecondary);
        border-width: 0;
        padding: 0px;
        font-size: 250%;
    }
    .baricon:hover {
        /* background-color: var(--coloritem); */
    }
    .righty {
        float: right;
    }
    .nav {
        display: flex;
        /* row-gap:5px; */
        /* column-gap:min(1rem,10vh); */
        gap: 10px;
        padding: 7px;
        /* padding-bottom: 7px; */
        flex-wrap: wrap;
        justify-content: space-evenly;
        /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
        border: 4px solid var(--coloritem);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        /* border-top:none; */
        /* justify-items: center; */
        /* justify-content: center; */
        /* width: 100vw; */
        /* grid-auto-flow:column; */
        /* grid-auto-rows:auto; */
        /* overflow-x: hidden; */
        /* column-gap: min(20px,10vw); */
        /* gap: 20vw; */
        /* padding: 1rem; */
        /* align-items: center; */
        /* flex-wrap:wrap; */
        /* justify-content: space-around; */
        background-color: var(--colorsecondary);
    }
    a {
        display: flex;
        align-items: center;
        /* min-width: max-content; */
        /* flex:1; */
        /* white-space: nowrap; */
        /* width: max-content; */
        /* text-align: center; */
        /* vertical-align:middle; */
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
        background-color: var(--colorprimary);
        text-decoration: none;
        cursor: pointer;
    }
    a:hover {
        background-color: var(--coloritem);
    }
    .navimg {
        /* aspect-ratio:inherit; */
        width: 20px;
        /* height:auto; */
    }
    button {
        background-color: var(--coloritem);
    }
    .spacer {
        flex-grow: 1;
        /* display: inline; */
    }
    .top{
        /* position:relative; */
        /* top:0; */
        /* bottom: 0; */
        background-color: var(--colorprimary);
        /* height:auto; */
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
    }
    :global(*) {
        transition: background-color 0.5s;
        transition: all 0.5s;
        padding:0;
        margin:0;
    }
    :global(body.red-mode) {
        --colorprimary: pink;
        --colorsecondary: red;
        --colortext: aliceblue;
        --coloritem: brown;
    }
    :global(body.dark-mode) {
        --colorprimary: rgb(2, 1, 44);
        --colorsecondary: darkblue;
        --coloritem: blue;
        --colortext: white;
    }
    :global(body) {
        /* padding: 0; */
        /* margin: 0; */
        /* height: fit-content; */
        /* min-height: fit-content; */
        /* min-height: 100dvh; */
        
        background-color: var(--colorprimary);
        --colorprimary: beige;
        --colorsecondary: rgb(247, 195, 160);
        --colortext: black;
        --coloritem: aliceblue;
    }
    :global(html) {
        /* margin: 0; */
        /* padding: 0; */
        /* height:100%; */
        /* background-color: rgb(177, 209, 37); */
        background-color: var(--colorprimary);
    }
</style>
