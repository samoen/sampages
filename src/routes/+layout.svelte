<script lang="ts">
    import { afterNavigate, preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Esflag from "$lib/assets/Esflag.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Ukflag from "$lib/assets/Ukflag.svelte";
    import Github from "$lib/assets/Github.svelte";
    import biggy from "$lib/assets/biggy.png";
    import xbig from "$lib/assets/xbig.png";
    import Footer from "$lib/components/Footer.svelte";
    import {
        DEFAULT_COLOR_TRANSITION_DURATION,
        MENU_SLIDE_DURATION,
        TOP_BAR_HEIGHT,
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
    style:--topbarheight="{TOP_BAR_HEIGHT}"
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
                <Palette --pad="0.1rem" />
            </button>
            <button
                class="baricon"
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
            <a class="barlink" href="https://github.com/samoen"><Github --pad="0.4rem"></Github></a>
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
                                <div class="sideicon">
                                    <Palette />
                                </div>
                                <span>
                                    Home
                                </span>
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
                            <div class="sideicon">
                                <Hamburger />
                            </div>
                            <span>
                                About
                            </span>
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
        /* --topbarheight: 4rem; */
        /* overflow-y: scroll; */
        /* width: 100vw; */
    }
    .sideandmain {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: var(--topbarheight) auto 1fr;
        /* align-items: start; */
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
        overflow-x: auto;
        /* overflow-y: auto; */
        /* overflow: visible; */

        grid-column: 1 / span 2;
        grid-row: 1;
        z-index: 5;
        box-sizing: border-box;
        display: grid;
        column-gap: 1rem;
        grid-template-columns: 3rem 1fr 3rem 3rem 3rem;
        grid-template-rows: 1fr;
        height: var(--topbarheight);
        place-items: center;
        background-color: var(--barTcolor);
        border: 4px solid var(--barBorderColor);
        transition: background-color var(--barTDur) ease-in-out var(--barTDelay),
            border-color var(--barTDur) ease-in-out var(--barTDelay);
    }
    .barlink {
        /* position: relative; */
        /* display: block; */
        height: 100%;
        width: 100%;
        /* display: grid; */
        /* place-items: center; */
        /* overflow: visible; */
    }
    .barp {
        user-select: none;
        /* font-size: 1rem; */
    }
    .baricon {
        width: 100%;
        height: 100%;
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;
    }

    .topnav {
        position: sticky;
        top: var(--topbarheight);
        grid-row: 2;
        grid-column: 2;
        box-sizing: border-box;
        z-index: 3;
        display: grid;
        /* grid-template-columns: repeat(auto-fit, minmax(1rem,1fr)); */
        grid-template-columns: repeat(auto-fit, 3rem);
        grid-auto-flow: column;
        /* grid-auto-columns: 4rem; */
        grid-auto-rows: 4rem;
        /* gap: 1rem; */
        /* padding: 0rem; */
        border: 4px solid var(--coloritem);
        border-top: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        background-color: var(--colorsecondary);
    }
    .flag {
        width: 100%;
        height: 100%;
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;
    }
    .sidebar {
        grid-column: 1;
        grid-row: 2 / span 2;
        position: sticky;
        top: calc(var(--topbarheight));
        background-color: var(--colorsecondary);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 4px solid var(--coloritem);
        border-top: none;
        /* padding-top:10px; */
        box-sizing:border-box;
        z-index: 4;
        overflow-x: hidden;
        overflow-y: hidden;
        height: 
        /* min( */
            calc(100dvh - var(--topbarheight));
            /* 100% */
            /* ); */
        /* width: 15rem; */
        padding-top: 1rem;
    }

    .sidenav {
        height:100%;
        /* padding-inline: 1rem; */
        /* width: auto; */
        /* overflow-x: hidden; */
        overflow-y: auto;
        /* height:auto; */
    }
    .sidenav ul {
        overflow-x: hidden;
        list-style: none;
        display: grid;
        grid-template-columns: 100%;
        place-items: center;
        row-gap: 0.3rem;
    }
    .sidenav li {
        /* overflow-x: hidden; */
    }
    .sidenav a {
        padding-inline: 0.5rem;
        margin-inline: 1rem;
        display: grid;
        grid-template-columns: 2rem auto;
        grid-template-rows: 1.5rem;
        grid-auto-flow: column;
        align-items: center;
        justify-items:start;
        background-color: var(--colorprimary);
        text-decoration: none;
        border: 2px solid var(--coloritem);
        /* margin-top: 0.5rem; */
        /* cursor: pointer; */
    }
    .sidenav span{
        width: max-content;
        font-size: 1.2rem;
        padding-right: 0.5rem;
    }
    .sideicon{
        height:100%;
        width: 100%;
        box-sizing: border-box;
        padding-top:0.4rem;
        padding-bottom: 0.5rem;
        display: grid;
        place-items: center;
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
        /* font-size:1rem; */
        overscroll-behavior: contain;
        box-sizing: border-box;
    }

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: purple;
    }
</style>
