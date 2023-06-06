<script lang="ts">
    import { afterNavigate, preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import Esflag from "$lib/assets/Esflag.svelte";
    import Github from "$lib/assets/Github.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Heartbeat from "$lib/assets/Heartbeat.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Ukflag from "$lib/assets/Ukflag.svelte";
    import biggy from "$lib/assets/biggy.png";
    import logooen from "$lib/assets/logooen.png";
    import xbig from "$lib/assets/xbig.png";
    import { mobileMode, screenWidth } from "$lib/stores";
    import { onMount } from "svelte";
    import { fade, slide, fly } from "svelte/transition";

    export let data;
    let burgopen = false;
    let topnavopen = false;
    let ready = false;
    let atTop = true;
    let scrollY = 0;
    let selectedLang = "EN";
    let preloadableRoutes = ["/", "/about"];

    onMount(() => {
        if ($mobileMode) {
            burgopen = false;
        }
        ready = true;

        for (let r of preloadableRoutes) {
            if (data.currentRoute != r) {
                preloadData(`${base}${r}`);
            }
        }
    });
    afterNavigate(() => {
        if ($mobileMode) {
            burgopen = false;
        }
        window.scrollTo(0, 0);
    });

    let preloadedImages = [xbig, biggy];
</script>

<svelte:head>
    <title>Sam pages</title>
    {#each preloadedImages as image}
        <link rel="preload" as="image" href="{image}" />
    {/each}
</svelte:head>

<svelte:window bind:innerWidth="{$screenWidth}" bind:scrollY="{scrollY}" />

<!-- in:fade -->
<div class="top">
    
    <div class="sideandmain">
        <div
            class="topbar"
            in:fade="{{ duration: 200 }}"
            class:opac="{scrollY < 70 && !topnavopen && !burgopen}"
        >
            <!-- class:opac="{(atTop && !topnavopen && !burgopen) || (!burgopen)}" -->
            <button
                class="baricon"
                on:click="{() => {
                    burgopen = !burgopen;
                }}"
                on:keydown
            >
                <Hamburger />
            </button>
            <p class="barp">SamCorp</p>
            <div class="barsection">
                <button
                    class="baricon"
                    on:click="{() => {
                        window.document.body.classList.toggle('dark-mode');
                    }}"
                    on:keydown
                >
                    <Palette />
                </button>
                <button
                    class="flag"
                    on:click="{() => {
                        topnavopen = !topnavopen;
                        if($mobileMode){
                            burgopen = false;
                        }
                    }}"
                >
                    {#if selectedLang == "EN"}
                        <Ukflag />
                    {:else if selectedLang == "ES"}
                        <Esflag />
                    {/if}
                </button>
                <a class="barlink" href="https://github.com/samoen"><Github></Github></a>
            </div>
        </div>
        {#if burgopen}
            <!-- transition:fade -->
            <div
                class="sidebar"
                transition:slide="{{ delay: 0, duration: 400, axis: 'x' }}"
            >
                <nav class="sidenav">
                    <ul>
                        <li>
                            <a href="{base}/">
                                <Hamburger />
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="{base}/about">
                                <Hamburger />
                                About
                            </a>
                        </li>
                        <li>
                            <a href="{base}/about">
                                <Hamburger />
                                About
                            </a>
                        </li>
                        <li>
                            <a href="{base}/about">
                                <Hamburger />
                                About
                            </a>
                        </li>
                        <li>
                            <a href="{base}/about">
                                <Hamburger />
                                About
                            </a>
                        </li>
                        <li>
                            <a href="{base}/about">
                                <Hamburger />
                                About
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            {#if $mobileMode && burgopen}
                <div
                    class="shadow"
                    on:click="{() => (burgopen = false)}"
                    on:keyup
                    transition:fade
                ></div>
            {/if}
        {/if}
        {#if topnavopen}
            <div
                class="topnav"
                transition:slide|local="{{
                    delay: 0,
                    duration: 300,
                    // axis: 'y',
                }}"
            >
                <button class="flag" on:click="{() => (selectedLang = 'EN')}">
                    <Ukflag />
                </button>
                <button class="flag" on:click="{() => (selectedLang = 'ES')}">
                    <Esflag />
                </button>
            </div>
        {/if}

        {#key data.currentRoute}
            <div class="slotandfoot" in:fade="{{ duration: 250, delay: 0 }}">
                <!-- class:shadowed="{$mobileMode && burgopen}" -->
                <slot />
                <footer class="foot">
                    <hr />
                    <p>&copy Sam Oen</p>
                </footer>
            </div>
        {/key}
    </div>
</div>

<!-- </div> -->

<style>
    .top {
        /* background-color: var(--colorprimary); */
    }
    .topbar {
        position: sticky;
        top: 0;
        
        grid-column: 1 / span 2;
        grid-row:1;
        z-index: 3;
        box-sizing: border-box;
        background-color: var(--colorsecondary);
        /* background-color: tr; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        /* padding-top: 5px; */
        /* padding-bottom: 5px; */
        /* height: var(--topbarheight); */
        height: 4rem;
        border: 4px solid var(--coloritem);
    }
    .topnav {
        position: sticky;
        /* top:0; */
        top: var(--topbarheight);
        /* margin-top: var(--topbarheight); */
        align-self: self-start;
        grid-row:2;
        grid-column: 2;
        box-sizing: border-box;
        z-index: 3;
        display: flex;
        gap: 10px;
        padding: 7px;
        flex-wrap: wrap;
        justify-content: space-evenly;
        border: 4px solid var(--coloritem);
        border-top: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        background-color: var(--colorsecondary);
    }
    .barlink{
        background-color: aqua;
        /* width:150px; */
        height:100%;
        width: 100%;
        /* display:block; */
        /* height:100%; */
        /* width:100% */

    }
    .opac {
        /* opacity: 1; */
        background-color: transparent;
        /* border-color: transparent; */
        border: 4px solid transparent;
    }

    .flag {
        width: 50px;
        border: none;
        /* line-height: 10px; */
        /* align-items: center; */
        /* padding: 6px; */
        background-color: transparent;
        /* background-color: blue; */
    }
    .sideandmain {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto 1fr;
        background-color: white;
    }
    .sidebar {
        grid-column: 1;
        grid-row:2 / span 2;
        align-self: start;
        position: sticky;
        /* top:0px; */
        /* top: var(--top
        barheight); */
        padding: 5px;
        background-color: var(--colorsecondary);
        /* max-width: 100px; */
        /* min-height: 1px; */
        /* max-height: calc(100dvh - var(--topbarheight)); */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 4px solid var(--coloritem);
        border-top: none;
        box-sizing: border-box;
        z-index: 4;
        height:min(100%, 100dvh);
        /* overflow-y: scroll; */
        /* height: min(
            calc(100dvh - var(--topbarheight)),
            calc(100% - var(--topbarheight))
        ); */
    }

    .sidenav {
        height: 100%;
    }
    .sidenav ul {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        /* min-height:min(calc(90vh - var(--topbarheight)),100%); */
        /* max-height:calc(80%); */
        gap: 10px;
        /* padding-right: 20px; */
    }
    .sidenav a {
        /* white-space: nowrap; */
        display: grid;
        grid-template-columns: auto minmax(max-content, 1fr);
        grid-auto-flow: column;
        gap: 5px;
        align-items: center;
        justify-items: start;
        padding: 5px;
        padding-right:10px;
        background-color: var(--colorprimary);
        text-decoration: none;
        /* cursor: pointer; */
    }

    .slotandfoot {
        /* min-height: 100%; */
        /* min-height: 100dvh; */
        /* flex-basis: 100%; */
        /* flex-grow: 1; */
        grid-column: 2;
        grid-row:1 / span 2;
    }
    .shadowed {
        /* display: none; */
        background-color: black;
        opacity: 0.5;
    }
    .shadow {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        opacity: 0.5;
        z-index: 2;
    }

    .foot {
        /* padding: 10px; */
    }
    hr {
        margin-top: 15px;
        margin-bottom: 20px;
        width: 90%;
        border: 2px solid var(--coloritem);
        border-radius: 3px;
        border-color: var(--colortext);
        opacity: 50%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .barsection {
        display: flex;
        gap: 5px;
        /* flex-grow: 1; */
        /* align-items: center; */
    }
    .barp {
        user-select: none;
        font-size: 150%;
    }
    .baricon {
        cursor: pointer;
        padding: 0;
        margin: 0;
        background-color: transparent;
        border-width: 0;
        padding: 0px;
        border-radius: 15px;
    }
    .baricon:hover {
        background-color: var(--coloritem);
    }


    a:hover {
        background-color: var(--coloritem);
        transition: background-color 0s;
    }
    .navimg {
        width: 20px;
        margin-right: 5px;
    }
    @media only screen and (max-width: 400px) {
        .sidebar {
            position: fixed;
        }
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
        transition: color 1s;
    }
    :global(div, button, body, p, a, h1, path, hr) {
        transition: background-color 1s, border-color 0.4s, color 1s, stroke 1s;
    }

    :global(*) {
        padding: 0;
        margin: 0;
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
        --topbarheight: 70px;
    }
    :global(html) {
        /* margin: 0; */
        /* padding: 0; */
        /* height:100%; */
        /* background-color: rgb(177, 209, 37); */
        background-color: var(--colorprimary);
    }
</style>
