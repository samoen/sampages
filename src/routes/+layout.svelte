<script lang="ts">
    import { afterNavigate, preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Esflag from "$lib/assets/Esflag.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Ukflag from "$lib/assets/Ukflag.svelte";
    import biggy from "$lib/assets/biggy.png";
    import xbig from "$lib/assets/xbig.png";
    import Footer from "$lib/components/Footer.svelte";
    import {
        burgopen,
        croute,
        mobileMode,
        nocolortransition,
        screenWidth,
        themeMode,
        toggleSidebar,
        toggleTopNav,
        topnavopen,
        topnavshouldslideaway,
        transparentTopBar,
        wscrollY,
    } from "$lib/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { fade, slide } from "svelte/transition";

    // export let data;
    // $croute = data.currentRoute;

    let selectedLang = "EN";
    let preloadableRoutes = ["/", "/about"];

    onMount(() => {
        for (let r of preloadableRoutes) {
            if ($page.url.pathname != r) {
                preloadData(`${base}${r}`);
            }
        }
    });
    afterNavigate(() => {
        if (get(mobileMode) && get(burgopen)) {
            toggleSidebar();
        }
        window.scrollTo(0, 0);
    });

    // let preloadedImages = [xbig, biggy];
    function mayslide(node: Element) {
        if ($topnavshouldslideaway) {
            return slide(node, { delay: 0, duration: 300 });
        } else {
            return {
                duration: 0,
            };
        }
    }
</script>

<svelte:head>
    <title>Sam pages</title>
    <!-- {#each preloadedImages as image}
        <link rel="preload" as="image" href="{image}" />
    {/each} -->
    <style>
        :root{
            --topbarheight: 70px;
        }
    </style>
    {#if $themeMode == "light"}
        <style>
            :root {
                --colorprimary: beige;
                --colorsecondary: rgb(247, 195, 160);
                --colortext: black;
                --coloritem: aliceblue;
            }
        </style>
    {:else if $themeMode == "dark"}
        <style>
            :root {
                --colorprimary: rgb(2, 1, 44);
                --colorsecondary: darkblue;
                --coloritem: blue;
                --colortext: white;
            }
        </style>
    {:else if $themeMode == "red"}
        <style>
            :root {
                --colorprimary: pink;
                --colorsecondary: red;
                --colortext: aliceblue;
                --coloritem: brown;
            }
        </style>
    {/if}
</svelte:head>

<svelte:window bind:innerWidth="{$screenWidth}" bind:scrollY="{$wscrollY}" />

<div class="top">
    <div class="sideandmain">
        <div
            class="topbar"
            class:opac="{$transparentTopBar}"
            class:nocolortransition="{$nocolortransition}"
        >
            <button
                class="baricon"
                on:click="{() => {
                    toggleSidebar();
                }}"
                on:keydown
            >
                <Hamburger />
            </button>
            <p class="barp">SamCorp</p>
            <button
                class="baricon"
                on:click="{() => {
                    $nocolortransition = false;
                    if ($themeMode == 'light') {
                        themeMode.set('dark');
                    } else {
                        themeMode.set('light');
                    }
                }}"
                on:keydown
            >
                <Palette />
            </button>
            <button
                class="flag"
                on:click="{() => {
                    toggleTopNav();
                }}"
            >
                {#if selectedLang == "EN"}
                    <Ukflag />
                {:else if selectedLang == "ES"}
                    <Esflag />
                {/if}
            </button>
            <!-- <a class="barlink" href="https://github.com/samoen"><Github></Github></a> -->
        </div>
        {#if $burgopen}
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
            {#if $mobileMode && $burgopen}
                <div
                    class="shadow"
                    on:click="{() => {
                        toggleSidebar();
                    }}"
                    on:keyup
                    transition:fade
                ></div>
            {/if}
        {/if}
        {#if $topnavopen}
            <div
                class="topnav"
                in:slide|local="{{
                    delay: 0,
                    duration: 300,
                    // axis: 'y',
                }}"
                out:mayslide
            >
                <!-- out:fade -->
                <button class="flag" on:click="{() => (selectedLang = 'EN')}">
                    <Ukflag />
                </button>
                <button class="flag" on:click="{() => (selectedLang = 'ES')}">
                    <Esflag />
                </button>
            </div>
        {/if}

        {#key $page.url.pathname}
            <div class="slotandfoot" in:fade="{{ duration: 500, delay: 0 }}">
                <!-- class:shadowed="{$mobileMode && burgopen}" -->
                <slot />
                <!-- <Footer></Footer> -->
                <footer>
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
    .sideandmain {
        /* position: fixed; */
        /* height: 100dvh; */
        /* overflow-y:auto; */
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: var(--topbarheight) auto 1fr;
        align-items: start;
        /* overflow-x: hidden; */
        /* margin-right: 40px; */
        /* background-color: gray; */
    }
    .topbar {
        position: sticky;
        top: 0;

        grid-column: 1 / span 2;
        grid-row: 1;
        z-index: 3;
        box-sizing: border-box;
        background-color: var(--colorsecondary);
        /* background-color: tr; */
        display: grid;
        grid-template-columns: 3rem 1fr 3rem 3rem 3rem;
        place-items: center;
        overflow-x: hidden;
        /* justify-content: space-between; */
        align-items: center;
        /* padding-left: 10px; */
        /* padding-right: 10px; */
        /* padding-top: 5px; */
        /* padding-bottom: 5px; */
        height: var(--topbarheight);
        border: 4px solid var(--coloritem);
    }
    .topnav {
        /* position: fixed; */
        position: sticky;
        /* top:0; */
        top: var(--topbarheight);
        /* margin-top: var(--topbarheight); */
        /* align-self: self-start; */
        grid-row: 2;
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
    .barlink {
        background-color: aqua;
        /* width:150px; */
        height: 100%;
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
    .nocolortransition {
        transition: background-color 0s;
    }

    .flag {
        width: 50px;
        border: none;
        /* line-height: 10px; */
        /* align-items: center; */
        /* padding: 6px; */
        background-color: transparent;
        touch-action: none;
        /* background-color: blue; */
    }
    .sidebar {
        grid-column: 1;
        grid-row: 2 / span 2;
        /* align-self: stretch; */
        position: sticky;
        /* top:0px; */
        top: var(--topbarheight);
        padding: 5px;
        background-color: var(--colorsecondary);
        /* max-width: 100px; */
        /* min-height: 1px; */
        /* height: calc(100dvh - var(--topbarheight)); */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 4px solid var(--coloritem);
        border-top: none;
        box-sizing: border-box;
        z-index: 4;
        /* height:100%; */
        height: calc(100dvh - var(--topbarheight));
        /* overflow-y: hidden; */
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
        padding-right: 10px;
        background-color: var(--colorprimary);
        text-decoration: none;
        /* cursor: pointer; */
    }

    .slotandfoot {
        /* min-height: 100%; */
        /* min-height: 100dvh; */
        /* flex-basis: 100%; */
        /* flex-grow: 1; */
        overflow-y: auto;
        grid-column: 2;
        grid-row: 1 / span 3;

        display: grid;
        grid-template-rows: 1fr auto;
        /* flex-direction: column; */
        min-height: 100vh;
    }
    footer {
        /* padding: 10px; */
        /* height: 200px; */
        /* background-color: blue; */
        margin: 0;
        padding: 0;
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
        touch-action: none;
    }
    .baricon:hover {
        background-color: var(--colortext);
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
            /* position: fixed; */
        }
        .slotandfoot {
            grid-column: 1 / span 2;
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

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: var(--colorprimary);
    }
</style>
