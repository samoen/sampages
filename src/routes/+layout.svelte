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
    import { DEFAULT_COLOR_TRANSITION_DURATION, MENU_SLIDE_DURATION, TOP_BAR_HEIGHT, barbordercolor, barcolor, burgopen, mobileMode, screenWidth, sidebarwidth, themeMode, themes, toggleSidebar, toggleTheme, toggleTopNav, topbarheight, topnavopen, toptransdelay, toptransduration, wscrollY } from "$lib/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { fade, slide } from "svelte/transition";
    import { blank_object } from "svelte/internal";

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
                --colorshadow: black;
            }
        </style>
    {:else}
        <style>
            html {
                --colorprimary: cadetblue;
                --colorsecondary: blue;
                --coloritem: teal;
                --colortext: white;
                --colorshadow: black;
            }
        </style>
    {/if}
    <!-- {#each preloadedImages as image}
    <link rel="preload" as="image" href="{image}" />
    {/each} -->
</svelte:head>

<svelte:window bind:innerWidth="{$screenWidth}" bind:scrollY="{$wscrollY}" />

<div class="top" style:--barTcolor="{$barcolor}" style:--barBorderColor="{$barbordercolor}" style:--barTDelay="{$toptransdelay}ms" style:--barTDur="{$toptransduration}ms" style:--defaultTransitionDuration="{DEFAULT_COLOR_TRANSITION_DURATION}ms" style:--scrolly="{$wscrollY}px" style:--sidebarwidth="{$sidebarwidth}px" style:--topbarheight="{$topbarheight}px">
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

    <div class="menus">
        <div class="topbar" bind:clientHeight="{$topbarheight}">
            <button
                class="baricon"
                on:click="{() => {
                    toggleSidebar();
                }}"
                on:keydown
            >
                <Hamburger />
            </button>
            <!-- {sidebarwidth} -->
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
            <a class="barlink" href="https://github.com/samoen"><Github --pad="0.4rem" /></a>
        </div>
        {#if $burgopen}
            <div
                class="sidebar"
                bind:offsetWidth="{$sidebarwidth}"
                transition:slide="{{
                    delay: 0,
                    duration: MENU_SLIDE_DURATION,
                    axis: 'x',
                }}"
                on:outroend="{() => {
                    $sidebarwidth = 0;
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
                                <span> Home Page </span>
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
                                <span> About </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        {/if}
    </div>
    {#if $topnavopen}
        <div class="topnav" transition:slide|local="{{ duration: MENU_SLIDE_DURATION }}">
            <div class="langs">
                <button class="flag" on:click="{() => (selectedLang = 'EN')}">
                    <Ukflag />
                </button>
                <button class="flag" on:click="{() => (selectedLang = 'ES')}">
                    <Esflag />
                </button>
            </div>
        </div>
    {/if}
    {#if $mobileMode && $burgopen}
        <div
            class="shadowclick"
            on:click="{() => {
                toggleSidebar();
            }}"
            on:keyup
        ></div>
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

<!-- </div> -->

<style>
    .top {
        /* --topbarheight: 4rem; */
        /* overflow-y: scroll; */
        /* width: 100vw; */
    }
    .menus {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;

        /* background-color: blue; */
        /* display: grid; */
        /* grid-template-columns: auto 1fr; */
        /* grid-template-rows: var(--topbarheight) auto 1fr; */

        /* gap: 4px; */
        /* align-items: start; */
    }
    .slotandfoot {
        padding-left: var(--sidebarwidth);
        min-height: 100dvh;
        display: grid;
        grid-template-rows: 1fr auto;
        /* z-index: 1; */
        /* overflow-y: scroll; */
    }
    .topbar {
        /* position: sticky; */
        /* top: 0; */
        /* overflow-x: auto; */
        /* overflow-y: auto; */
        /* overflow: visible; */
        /* grid-column: 1 / span 2; */
        /* grid-row: 1; */
        /* margin-left: 0px; */
        margin-right: 5px;
        /* margin-top: 3px; */
        padding: 5px;
        /* z-index: 5; */
        min-height: 40px;
        display: grid;
        column-gap: clamp(4px, 3vw, 8rem);
        grid-template-columns: 3rem 1fr 3rem 3rem 3rem;
        grid-template-rows: auto;
        place-items: center;
        background-color: var(--barTcolor);
        border: 2px solid var(--barBorderColor);
        border-radius: 6px;
        box-shadow: 2px 2px 1px 0px var(--barBorderColor);
        transition: background-color var(--barTDur) ease-in-out var(--barTDelay), border-color var(--barTDur) ease-in-out var(--barTDelay);
    }
    .barlink {
        /* position: relative; */
        /* display: block; */
        height: 50px;
        width: 50px;
        /* display: grid; */
        /* place-items: center; */
        /* overflow: visible; */
    }
    .barp {
        display: block;
        user-select: none;
        overflow-x: hidden;
        font-size: 1.4rem;
    }
    .baricon {
        width: 100%;
        height: 100%;
        touch-action: none;
        border-width: 0;
        background-color: var(--colorsecondary);
        cursor: pointer;
        border: 2px solid var(--colorshadow);
        border-radius: 6px;
        box-shadow: 2px 2px 2px 1px var(--colorshadow);
    }

    .topnav {
        position: fixed;
        top: calc(var(--topbarheight) + 12px);
        left: calc(var(--sidebarwidth) + 10px);
        /* display: inline-block; */
        /* vertical-align: top; */
        /* margin-top: 5px; */
        /* margin-left: 25px; */
        z-index: 3;
        padding-inline: 1rem;
        padding-block: 0.5rem;
        border: 2px solid var(--colorshadow);
        border-radius: 7px;
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
        background-color: var(--colorsecondary);
    }
    .langs {
        grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
        grid-template-rows: 3rem;
        grid-auto-flow: column;
        gap: 1rem;
    }
    .flag {
        width: 2rem;
        height: 1.2rem;
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;
        border: 1px solid var(--colorshadow);
        border-radius: 3px;
        box-shadow: 1px 1px 3px 1px var(--colorshadow);
    }
    .sidebar {
        /* position: relative; */
        display: inline-block;
        margin-top: 5px;
        margin-left: 3px;
        background-color: var(--colorprimary);
        border: 2px solid var(--colorshadow);
        border-radius: 9px;
        box-shadow: 2px 2px 2px 1px var(--colorshadow);
        /* z-index: 4; */
        overflow-x: hidden;
        overflow-y: hidden;
        height: 
        /* min( */ calc(100dvh - var(--topbarheight) - 20px);
        /* 100% */
        /* ); */
        /* width: 15rem; */
    }

    .sidenav {
        height: 100%;
        /* padding-inline: 1rem; */
        /* width: auto; */
        overflow-x: hidden;
        overflow-y: auto;
        /* background-color: brown; */
        /* height:auto; */
    }
    .sidenav ul {
        /* overflow-x: hidden; */
        list-style: none;
        display: grid;
        grid-template-columns: auto;
        grid-auto-flow: row;
        place-items: start;
        padding-inline: 1rem;
        padding-block: 1rem;
        row-gap: 0.5rem;
    }
    .sidenav li {
    }
    .sidenav a {
        display: grid;
        column-gap: 0rem;
        grid-template-columns: auto auto;
        align-items: center;
        background-color: var(--colorsecondary);
        text-decoration: none;
        border: 2px solid var(--colorshadow);
        border-radius: 3px;
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
    }
    .sideicon {
        height: 2rem;
        width: 2rem;
    }
    .sidenav span {
        padding-right: 1rem;
        width: max-content;
        white-space: nowrap;
        font-size: 1.3rem;
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
        /* grid-column: 1 / span 2; */
        /* grid-row: 1 / span 3; */
        /* place-self: stretch; */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /* height: 400px; */
        /* width: 400px; */
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }
    .shadowclick {
        position: fixed;
        left: var(--sidebarwidth);
        top: var(--topbarheight);
        z-index: 3;
        height: calc(100vh - var(--topbarheight));
        width: calc(100vw - var(--sidebarwidth));
        background-color: transparent;
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
            padding-left: 0px;
        }
        .shadow {
            display: block;
        }
    }
    @media only screen and (min-width: 400px) {
        .shadow {
            display: none;
        }
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
        transition: color 1s;
        /* font-size:0.1rem; */
    }
    :global(div, button, p, a, h1, path, hr) {
        transition: background-color var(--defaultTransitionDuration) ease-in-out, border-color var(--defaultTransitionDuration) ease-in-out, color var(--defaultTransitionDuration), stroke var(--defaultTransitionDuration);
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
        /* border-radius: 4px; */
    }

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: purple;
    }
</style>
