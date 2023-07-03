<script lang="ts">
    import { afterNavigate, preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Gear from "$lib/assets/Gear.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Hand from "$lib/assets/Hand.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import SideBarItem from "$lib/components/SideBarItem.svelte";
    import TopBarIcon from "$lib/components/TopBarIcon.svelte";
    import {
        DEFAULT_MENU_SLIDE_DURATION,
        barColorState,
        burgIconState,
        burgopen,
        contactIconState,
        lastEvent,
        mainPadding,
        mobileMode,
        modBase,
        navSelect,
        screenWidth,
        settingsIconState,
        showJsButtons,
        sidebarwidth,
        themeMode,
        themes,
        toggleSidebar,
        topNavHeight,
        topbarheight,
        wscrollY,
    } from "$lib/stores";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    // export let data;

    let preloadableRoutes = [modBase, `${base}/about`];
    // let mounted = false;

    onMount(() => {
        for (let r of preloadableRoutes) {
            if ($page.url.pathname != r) {
                console.log(`preloading ${r}`);
                preloadData(`${r}`);
            }
        }
        showJsButtons.set(true);
        // mounted = true;
    });

    afterNavigate((e) => {
        if ($mobileMode && $burgopen) {
            toggleSidebar();
        }
        window.scrollTo(0, 1);
    });

    // let preloadedImages = [xbig, biggy];
</script>

<svelte:head>
    <title>Sam pages</title>

    {#if $themeMode == themes.light}
        <style>
            html {
                --colorprimary: wheat;
                --colorsecondary: beige;
                --colortext: black;
                --coloritem: blanchedalmond;
                --colorpressed: bisque;
                --colorshadow: black;
                --colorlight: antiquewhite;
            }
        </style>
    {:else}
        <style>
            html {
                --colorprimary: blue;
                --colorsecondary: cadetblue;
                --coloritem: teal;
                --colortext: white;
                --colorpressed: burlywood;
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
    style:--sidebar-width-px="{$sidebarwidth}px"
    style:--topbarheight="{$topbarheight}px"
    style:--top-nav-height="{$topNavHeight}px"
>
    {#if $mobileMode && $burgopen}
        <div class="shadow" transition:fade></div>
        <div
            class="shadowclick"
            on:click="{() => {
                toggleSidebar();
            }}"
            aria-hidden="true"
            on:keyup
        ></div>
    {/if}

    <div
        class="topbar"
        class:transpar="{$barColorState.color == 'transparent'}"
        class:solidbar="{$barColorState.color == 'solid'}"
        class:brutal-border="{$barColorState.color == 'solid' ||
            $barColorState.color == 'blur'}"
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
            <Hamburger
                size="{1}"
                padding="{5}"
                lilShrink="{$burgopen}"
                gone="{!$showJsButtons}"
            />
        </TopBarIcon>
        <span class="barp">SAM OEN</span>
        <!-- {$wscrollY} -->
        <TopBarIcon
            push="{() => {
                lastEvent.set({ e: 'contactClick' });
            }}"
            state="{$contactIconState}"
        >
            <Hand
                padding="{5}"
                lilShrink="{$navSelect.sel == 'contact'}"
                gone="{!$showJsButtons}"
            />
        </TopBarIcon>
        <TopBarIcon
            push="{() => {
                lastEvent.set({ e: 'settingsClick' });
            }}"
            state="{$settingsIconState}"
        >
            <Gear
                lilShrink="{$navSelect.sel == 'settings'}"
                padding="{5}"
                gone="{!$showJsButtons}"
            />
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
                if (!$burgopen) {
                    $sidebarwidth = 0;
                }
                lastEvent.set({ e: 'menuOut' });
            }}"
        >
            <nav class="sidenav">
                <ul>
                    <li>
                        <SideBarItem txt="Home Page" icon={Hand} path={modBase}></SideBarItem>
                    </li>
                    <li>
                        <SideBarItem txt="About" icon={Palette} path="{base}/about"></SideBarItem>
                    </li>
                </ul>
            </nav>
        </div>
    {/if}
    {#key $navSelect.sel}
        {#if $navSelect.sel != "none"}
            <div
                class="topnav brutal-border"
                bind:clientHeight="{$topNavHeight}"
                in:slide|global="{{
                    duration: DEFAULT_MENU_SLIDE_DURATION,
                }}"
                out:slide|global="{{
                    duration: $navSelect.outSpeed,
                }}"
                on:outroend="{() => {
                    lastEvent.set({ e: 'menuOut' });
                    if ($navSelect.sel == 'none') {
                        $topNavHeight = 0;
                    }
                }}"
            >
                {#if $navSelect.sel == "settings"}
                    <div class="top-nav-selection">
                        <Settings />
                    </div>
                {:else if $navSelect.sel == "contact"}
                    <div class="top-nav-selection">
                        <Contact />
                    </div>
                {/if}
            </div>
        {/if}
    {/key}
    {#key $page.url.pathname}
        <div
            class="slotandfoot"
            in:fade="{{ duration: 500, delay: 0 }}"
            style="padding-top:{$mainPadding}px"
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
    }

    .slotandfoot {
        min-height: 100vh;
        /* padding-top: calc(var(--top-nav-height)); */
        display: grid;
        grid-template-rows: 1fr auto;
    }
    .topbar {
        position: fixed;
        top: 0px;
        left: 3px;
        right: 4px;
        z-index: 2;
        padding-block: 5px;
        padding-left: 3vw;
        padding-right: 3vw;
        min-height: 66px;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 8px;
        /* border: 2px solid; */
        border-radius: 6px;
        transition: background-color 500ms ease-in-out 0ms,
            border-color 500ms ease-in-out 0ms,
            box-shadow 500ms ease-in-out 0ms;
        /* user-select: none; */
        /* box-sizing: content-box; */
    }
    .blurbar {
        background-color: transparent;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        /* border: 2px solid var(--colorshadow); */
        /* box-shadow: 2px 2px 1px 0px var(--colorshadow); */
    }
    .solidbar {
        background-color: var(--coloritem);
        /* border: 2px solid var(--colorshadow); */
        /* box-shadow: 2px 2px 1px 0px var(--colorshadow); */
    }
    .transpar {
        background-color: transparent;
        border-color: transparent;
        box-shadow: 2px 2px 1px 0px transparent;
        border: 2px solid transparent;
    }

    .barp {
        display: block;
        white-space: nowrap;
        user-select: none;
        font-size: 1.4rem;
        font-family: monospace;
        font-weight: bold;
        color: var(--colortext);
        flex-grow: 1;
        text-align: center;
    }

    .topnav {
        position: fixed;
        top: calc(var(--topbarheight) + 2px);
        left: calc(var(--sidebar-width-px) + 3px);
        right: 4px;
        display: grid;
        overflow: hidden;
        z-index: 3;
        background-color: var(--coloritem);
    }
    .top-nav-selection {
        /* position: absolute; */
        /* grid-row: 1 / 1; */
        /* grid-column: 1 / 1; */
    }

    .sidebar {
        position: fixed;
        top: calc(var(--topbarheight) + 2px);
        left: 4px;
        bottom: 6px;
        z-index: 2;
        background-color: var(--coloritem);
        overflow-x: hidden;
        overflow-y: hidden;
        /* height: calc(100dvh - var(--topbarheight) - 5px); */
        /* transition: height 100ms ease-in-out; */
    }

    .sidenav {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
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
    

    hr {
        margin-top: 15px;
        margin-bottom: 20px;
        width: 90%;
        border: 2px solid var(--coloritem);
        border-radius: 3px;
        border-color: var(--coloritem);
        opacity: 50%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    footer {
        padding-left: 10px;
    }

    @media (hover: hover) and (pointer: fine) {
        a:hover {
            background-color: var(--colorlight);
            transition: background-color 0s;
        }
    }

    @media only screen and (max-width: 500px) {
        /* .top { */
        /* --main-width-px: 100vw; */
        /* position: relative; */
        /* } */
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
        .shadowclick {
            position: fixed;
            top: var(--topbarheight);
            left: var(--sidebar-width-px);
            z-index: 3;
            height: calc(100vh - var(--topbarheight));
            width: calc(100vw - var(--sidebar-width-px));
            /* background-color: blue; */
        }
    }
    @media only screen and (min-width: 500px) {
        /* .top { */
        /* --main-width-px: calc(100vw - var(--sidebar-width-px)); */
        /* } */
        .slotandfoot {
            padding-left: var(--sidebar-width-px);
        }
        .shadow {
            display: none;
        }
        .shadowclick {
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
    .top :global(.no-top-border) {
        border-top: 0px solid var(--colorshadow);
    }
    .top :global(.inset-brutal) {
        box-shadow: inset 2px 2px 3px 1px var(--colorshadow);
        border: 2px solid var(--coloritem);
        border-radius: 9px;
    }
    a:focus,
    a:active {
        outline: none;
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
        /* transition: color 1s; */
        font-family: monospace;
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
        box-sizing: border-box;
        /* scroll-behavior: smooth; */
    }

    :global(*, *:before, *:after) {
        padding: 0;
        margin: 0;
        /* font-size:1rem; */
        overscroll-behavior: contain;
        box-sizing: border-box;
        text-size-adjust: none;
        -webkit-text-size-adjust: none;
        /* border-radius: 4px; */
    }

    :global(body) {
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: var(--colorprimary);
    }
</style>
