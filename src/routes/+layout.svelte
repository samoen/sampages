<script lang="ts">
    import { preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Gear from "$lib/assets/Gear.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Hand from "$lib/assets/Hand.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import TopBarIcon from "$lib/components/TopBarIcon.svelte";
    import {
        DEFAULT_MENU_SLIDE_DURATION,
        barColorState,
        burgIconState,
        burgopen,
        contactIconState,
        lastEvent,
        mobileMode,
        navSelect,
        screenWidth,
        settingsIconState,
        showJsButtons,
        sidebarwidth,
        themeMode,
        themes,
        toggleSidebar,
        topNavOutDuration,
        topbarheight,
        wscrollY,
    } from "$lib/stores";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    // export let data;
    // $croute = data.currentRoute;

    let preloadableRoutes = ["/", "/about"];
    // let mounted = false;

    onMount(() => {
        for (let r of preloadableRoutes) {
            if ($page.url.pathname != r) {
                preloadData(`${base}${r}`);
            }
        }
        showJsButtons.set(true);
        // mounted = true;
    });
    // afterNavigate(() => {
    // window.scrollTo(0, 0);
    // });

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
                --colorsecondary: wheat;
                --colortext: black;
                --coloritem: limegreen;
                --colorshadow: black;
                --colorlight: white;
            }
        </style>
    {:else}
        <style>
            html {
                --colorprimary: blue;
                --colorsecondary: cadetblue;
                --coloritem: teal;
                --colortext: white;
                --colorshadow: black;
                --colorlight: gray;
            }
        </style>
    {/if}
    <!-- {#each preloadedImages as image}
    <link rel="preload" as="image" href="{image}" />
    {/each} -->
</svelte:head>

<!-- bind:innerWidth="{$screenWidth}" -->
<svelte:window bind:scrollY="{$wscrollY}" />

<div
    class="top"
    bind:clientWidth="{$screenWidth}"
    style:--sidebar-width="{$sidebarwidth}"
    style:--topbarheight="{$topbarheight}px"
>
    {#if $mobileMode && $burgopen}
        <div class="shadow" transition:fade></div>
        <div
            class="shadowclick"
            on:click="{() => {
                toggleSidebar();
            }}"
            on:keyup
        ></div>
    {/if}

    <div
        class="topbar"
        class:transpar="{$barColorState.color == 'transparent'}"
        class:solidbar="{$barColorState.color == 'solid'}"
        class:blurbar="{$barColorState.color == 'blur'}"
        class:quick-transition="{$barColorState.speed == 'instant'}"
        bind:clientHeight="{$topbarheight}"
    >
        <!-- class:delayed-transition="{$topBarTransitionDelayed}" -->
        <TopBarIcon
            push="{() => {
                toggleSidebar();
            }}"
            state="{$burgIconState}"
        >
            <Hamburger scale="{$burgopen}" />
        </TopBarIcon>
        <span class="barp">SAM OEN</span>
        <!-- {$mobileMode} -->
        <TopBarIcon
            push="{() => {
                // toggleContact();
                lastEvent.set({ e: 'contactClick' });
            }}"
            state="{$contactIconState}"
        >
            <Hand scale="{$navSelect.sel == 'contact'}" />
        </TopBarIcon>
        <TopBarIcon
            push="{() => {
                // toggleSettings();
                lastEvent.set({ e: 'settingsClick' });
            }}"
            state="{$settingsIconState}"
        >
            <Gear scale="{$navSelect.sel == 'settings'}" />
        </TopBarIcon>
    </div>
    {#if $burgopen}
        <div
            class="sidebar brutal-border"
            bind:offsetWidth="{$sidebarwidth}"
            transition:slide="{{
                delay: 0,
                duration: DEFAULT_MENU_SLIDE_DURATION,
                axis: 'x',
            }}"
            on:outroend="{() => {
                $sidebarwidth = 0;
                lastEvent.set({ e: 'menuOut' });
                // menuSlideComplete()
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

    {#if $navSelect.sel == "settings"}
        <div
            class="topnav"
            in:slide|local="{{
                duration: DEFAULT_MENU_SLIDE_DURATION,
            }}"
            out:slide|local="{{
                duration: $navSelect.outSpeed,
            }}"
            on:outroend="{() => {
                lastEvent.set({ e: 'menuOut' });
            }}"
        >
            <Settings />
        </div>
    {:else if $navSelect.sel == "contact"}
        <div
            class="topnav"
            in:slide|local="{{
                duration: DEFAULT_MENU_SLIDE_DURATION,
            }}"
            out:slide|local="{{
                duration: $navSelect.outSpeed,
            }}"
            on:outroend="{() => {
                lastEvent.set({ e: 'menuOut' });
            }}"
        >
            <Contact />
        </div>
    {/if}
    {#key $page.url.pathname}
        <div
            class="slotandfoot"
            in:fade="{{ duration: 500, delay: 0 }}"
        >
            <slot />
            <footer>
                <hr />
                <p>&copy Sam Oen</p>
            </footer>
        </div>
    {/key}
</div>

<style>
    .top {
        --sidebar-width-px: calc(var(--sidebar-width) * 1px);
    }

    .slotandfoot {
        min-height: 100dvh;
        display: grid;
        grid-template-rows: 1fr auto;
        /* z-index: 1; */
        /* overflow-y: scroll; */
    }
    .topbar {
        position: fixed;
        top: 0;
        left: 3px;
        right: 4px;
        z-index: 2;
        /* margin-right: 5px; */
        /* margin-left:2px; */
        padding-block: 10px;
        padding-left: 3vw;
        padding-right: 3vw;
        display: grid;
        column-gap: clamp(4px, 3vw, 8rem);
        grid-template-columns: 3rem 1fr 3rem 3rem;
        grid-template-rows: auto;
        grid-auto-flow: column;
        place-items: center;
        border: 2px solid;
        border-radius: 6px;
        transition: background-color 500ms ease-in-out 0ms,
            border-color 500ms ease-in-out 0ms,
            box-shadow 500ms ease-in-out 0ms;
    }
    .blurbar {
        background-color: transparent;
        backdrop-filter: blur(5px);
        border: 2px solid var(--colorshadow);
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
    }
    .solidbar {
        background-color: var(--colorsecondary);
        border: 2px solid var(--colorshadow);
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
    }
    .transpar {
        background-color: transparent;
        border-color: transparent;
        box-shadow: transparent;
    }

    .barp {
        display: block;
        white-space: nowrap;
        user-select: none;
        /* overflow-x: hidden; */
        font-size: 1.4rem;
        font-family: "Impact";
        /* font-weight: 700; */
        color: var(--colortext);
        grid-column: 1fr;
    }

    .topnav {
        position: fixed;
        top: calc(var(--topbarheight) + 12px);
        /* left: calc(var(--sidebarwidth) + 10px); */
        right: 5px;
        /* display: inline-block; */
        /* vertical-align: top; */
        /* margin-top: 5px; */
        /* margin-left: 25px; */
        max-width: calc(var(--main-width-px) - 10px);
        z-index: 3;
        padding-inline: 1rem;
        padding-block: 0.5rem;
        border: 2px solid var(--colorshadow);
        border-radius: 7px;
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
        background-color: var(--colorsecondary);
    }

    .sidebar {
        position: fixed;
        top: calc(var(--topbarheight) + 9px);
        left: 5px;
        z-index: 2;
        background-color: var(--colorprimary);
        overflow-x: hidden;
        overflow-y: hidden;
        height: calc(100dvh - var(--topbarheight) - 17px);
        transition: height 100ms ease-in-out;
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
        border-radius: 6px;
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

    .shadowclick {
        position: fixed;
        top: var(--topbarheight);
        left: var(--sidebar-width-px);
        z-index: 3;
        height: calc(100vh - var(--topbarheight));
        width: calc(var(--main-width-px));
        /* background-color: blue; */
    }
    footer {
        padding-left: 10px;
    }

    @media (hover: hover) and (pointer: fine) {
        a:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
    }

    @media only screen and (max-width: 500px) {
        .top {
            --main-width-px: 100vw;
            position: relative;
        }
        .slotandfoot {
            padding-left: 0px;
        }
        .shadow {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: black;
            opacity: 0.5;
            z-index: 1;
        }
    }
    @media only screen and (min-width: 500px) {
        .top {
            --main-width-px: calc(100vw - var(--sidebar-width-px));
        }
        .slotandfoot {
            padding-left: var(--sidebar-width-px);
        }
        .shadow {
            display: none;
        }
    }
    .top :global(.quick-transition) {
        transition-duration: 0ms;
    }

    .top :global(.delayed-transition) {
        transition-delay: 300ms;
    }

    .top :global(.brutal-border) {
        border: 2px solid var(--colorshadow);
        box-shadow: 2px 2px 0px 0px var(--colorshadow);
        border-radius: 8px;
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
        /* transition: color 1s; */
        font-family:monospace;
    }
    /* :global(div, button, a, h1, path, hr) {
        transition: background-color 400ms ease-in-out,
        border-color 400ms ease-in-out, color 400ms, stroke 400ms,
        box-shadow 400ms ease-in-out,
        height 100ms ease-in-out;
    } */
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
        /* box-sizing: border-box; */
        /* border-radius: 4px; */
    }

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: purple;
    }
</style>
