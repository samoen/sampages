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
        DEFAULT_COLOR_TRANSITION_DURATION,
        MENU_SLIDE_DURATION,
        barbordercolor,
        barcolor,
        burgopen,
        mobileMode,
        screenWidth,
        themeMode,
        themes,
        toggleSidebar,
        toggleTheme,
        toggleTopNav,
        topnavopen,
        toptransdelay,
        toptransduration,
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
        window.scrollTo(0, 0);
    });

    // let preloadedImages = [xbig, biggy];
    // function mayslide(node: Element) {
    //     if ($topnavshouldslideaway) {
    //         return slide(node, { delay: 0, duration: 300 });
    //     } else {
    //         return {
    //             duration: 0,
    //         };
    //     }
    // }
</script>

<svelte:head>
    <title>Sam pages</title>

    {#if $themeMode == themes.light}
        <style>
            html {
                --colorprimary: beige;
                --colorsecondary: rgb(247, 195, 160);
                --colortext: black;
                --coloritem: aliceblue;
            }
        </style>
    {:else}
        <style>
            html {
                --colorprimary: rgb(2, 1, 44);
                --colorsecondary: darkblue;
                --coloritem: blue;
                --colortext: white;
            }
        </style>
    {/if}
    <!-- {#each preloadedImages as image}
    <link rel="preload" as="image" href="{image}" />
    {/each} -->
</svelte:head>

<svelte:window bind:innerWidth="{$screenWidth}" bind:scrollY="{$wscrollY}" />

<div
    class="top"
    style:--barTcolor="{$barcolor}"
    style:--barBorderColor="{$barbordercolor}"
    style:--barTDelay="{$toptransdelay}ms"
    style:--barTDur="{$toptransduration}ms"
    style:--defaultTransitionDuration="{DEFAULT_COLOR_TRANSITION_DURATION}ms"
    style:--scrolly="{$wscrollY}px"
>
    <div
        class="sideandmain"
        on:drag="{(e) => {
            // e.preventDefault()
        }}"
    >
        <div class="topbar">
            <button
                class="baricon"
                on:click="{() => {
                    toggleSidebar();
                }}"
                on:keydown
            >
                <Hamburger />
            </button>
            <!-- {$wscrollY} -->
            <p class="barp">SamCorp</p>
            <button
                class="baricon"
                on:click="{() => {
                    toggleTheme();
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
                on:drag="{(e) => {
                    e.preventDefault();
                }}"
                transition:slide="{{
                    delay: 0,
                    duration: MENU_SLIDE_DURATION,
                    axis: 'x',
                }}"
            >
                <nav class="sidenav">
                    <ul>
                        <li>
                            <a
                                on:click="{() => {
                                    if ($mobileMode && $burgopen) {
                                        toggleSidebar();
                                    }
                                }}"
                                href="{base}/"
                            >
                                <Hamburger />
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                on:click="{() => {
                                    if ($mobileMode && $burgopen) {
                                        toggleSidebar();
                                    }
                                }}"
                                href="{base}/about"
                            >
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
                transition:slide|local="{{ duration: MENU_SLIDE_DURATION }}"
            >
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
                <slot />
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
        --topbarheight: 70px;
        /* overflow-y: scroll; */
    }
    .sideandmain {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: var(--topbarheight) auto 1fr;
        align-items: start;
    }
    .slotandfoot {
        min-height: 100dvh;
        grid-column: 2;
        grid-row: 1 / span 3;
        display: grid;
        grid-template-rows: 1fr auto;
        /* overflow-y: scroll; */
    }
    .topbar {
        position: sticky;
        top: 0;

        grid-column: 1 / span 2;
        grid-row: 1;
        z-index: 5;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 3rem 1fr 3rem 3rem 3rem;
        place-items: center;
        overflow-x: hidden;
        align-items: center;
        height: var(--topbarheight);
        background-color: var(--barTcolor);
        border: 4px solid var(--barBorderColor);
        transition: background-color var(--barTDur) ease-in-out var(--barTDelay),
            border-color var(--barTDur) ease-in-out var(--barTDelay);
    }
    .topnav {
        position: sticky;
        top: var(--topbarheight);
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
        height: 100%;
        width: 100%;
    }

    .flag {
        width: 50px;
        border: none;
        background-color: transparent;
        touch-action: none;
    }
    .sidebar {
        grid-column: 1;
        grid-row: 2 / span 2;
        position: sticky;
        top: var(--topbarheight);
        background-color: var(--colorsecondary);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 4px solid var(--coloritem);
        border-top: none;
        box-sizing: border-box;
        z-index: 4;
        height: 
        /* min( */
            calc(100vh - var(--topbarheight));
            /* 100% */
            /* ); */
    }

    .sidenav {
        height:100%;
        overflow-x: hidden;
    }
    .sidenav ul {
        height: 100%;
        overflow-y: auto;
        list-style: none;
    }
    .sidenav li {
        margin:1rem;
    }
    .sidenav a {
        /* white-space: nowrap; */
        overflow-x: hidden;
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

    footer {
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

    .shadow {
        grid-column: 1 / span 2;
        grid-row: 1 / span 3;
        place-self: stretch;
        background-color: black;
        opacity: 0.5;
        z-index: 2;
    }

    .barp {
        user-select: none;
        font-size: 1.5rem;
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

    @media (hover: hover) and (pointer: fine) {
        .baricon:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }

        a:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
    }
    .navimg {
        width: 20px;
        margin-right: 5px;
    }
    @media only screen and (max-width: 400px) {
        .slotandfoot {
            grid-column: 1 / span 2;
        }
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
        transition: color 1s;
        /* font-size:0.1rem; */
    }
    :global(div, button, p, a, h1, path, hr) {
        transition: background-color var(--defaultTransitionDuration)
                ease-in-out,
            border-color var(--defaultTransitionDuration) ease-in-out,
            color var(--defaultTransitionDuration),
            stroke var(--defaultTransitionDuration);
    }
    :global(body) {
        transition: background-color 1s ease-in-out;
    }
    :global(html) {
        transition: background-color 1s ease-in-out;
    }

    :global(*) {
        padding: 0;
        margin: 0;
        overscroll-behavior: contain;
    }

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: purple;
    }
</style>
