<script lang="ts">
    import { preloadData } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Gear from "$lib/assets/Gear.svelte";
    import Hamburger from "$lib/assets/Hamburger.svelte";
    import Hand from "$lib/assets/Hand.svelte";
    import House from "$lib/assets/House.svelte";
    import User from "$lib/assets/User.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import SideBarItem from "$lib/components/SideBarItem.svelte";
    import TopBarIcon from "$lib/components/TopBarIcon.svelte";
    import {
        SHELF_IN_DURATION,
        burgIconState,
        contactHeight,
        contactIconState,
        contactMenuState,
        modBase,
        narrowScreenState,
        screenWidth,
        settingsHeight,
        settingsIconState,
        settingsMenuState,
        shadowState,
        showJsButtons,
        sideBarState,
        sidebarwidth,
        themeMode,
        themes,
        topbarColorState,
        topbarheight,
        uIEvent,
        wscrollY,

        type UiEventKind

    } from "$lib/stores";
    import { onMount } from "svelte";
    import { backIn, backOut, bounceOut } from "svelte/easing";
    import { fade, slide } from "svelte/transition";

    // export let data;

    let preloadableRoutes = [modBase, `${base}/about`];
    let sidenav: HTMLElement | undefined = undefined;
    onMount(() => {
        for (let r of preloadableRoutes) {
            if ($page.url.pathname != r) {
                console.log(`preloading ${r}`);
                preloadData(`${r}`);
            }
        }
        showJsButtons.set(true);
        // sendEvent('resize');
    });

    // afterNavigate((e) => {
        // console.log("afterNavigate");
        // bug? svelte tries to maintain window scroll between routes
        // window.scrollTo(0, 1);
    // });

    // let lastWindowWidth = 0;
    // function mayberesizeEvent() {
    //         uIEvent.set({
    //             kind:'resize',
    //             narrowScreenState: $narrowScreenState,
    //             sidebarState: $sideBarState,
    //             contactMenuState: $contactMenuState,
    //             settingsMenuState: $settingsMenuState,
    //             screenWidth: $screenWidth,
    //         });
    //     }
        function sendEvent(kind: UiEventKind){
            uIEvent.set({
                kind: kind,
                narrowScreenState: $narrowScreenState,
                sidebarState: $sideBarState,
                contactMenuState: $contactMenuState,
                settingsMenuState: $settingsMenuState,
                screenWidth: $screenWidth,
            });

    }

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
                --colorlight: rgb(250, 231, 207);
            }
        </style>
    {:else if $themeMode == themes.red}
        <style>
            html {
                --colorprimary: pink;
                --colorsecondary: red;
                --coloritem: crimson;
                --colortext: white;
                --colorpressed: hotpink;
                --colorshadow: darkred;
                --colorlight: lightpink;
            }
        </style>
    {:else}
        <style>
            html {
                --colorprimary: cadetblue;
                --colorsecondary: darkblue;
                --coloritem: teal;
                --colortext: white;
                --colorpressed: darkslategrey;
                --colorshadow: black;
                --colorlight: cadetblue;
            }
        </style>
    {/if}
    <!-- {#each preloadedImages as image}
    <link rel="preload" as="image" href="{image}" />
    {/each} -->
</svelte:head>

<svelte:window
    bind:innerWidth="{$screenWidth}"
    bind:scrollY="{$wscrollY}"
    on:resize="{(e) => {
        sendEvent('resize')
    }}"
    on:wheel="{(e) => {
        // console.log(e.target);
    }}"
/>

<div class="top">
    {#if $shadowState}
        <div
            class="shadow"
            transition:fade
            on:wheel="{(e) => {
                e.preventDefault();
            }}"
        ></div>
        <div
            class="shadowclick"
            transition:fade="{{ duration: 0 }}"
            style:left="{$sidebarwidth}px"
            style:height="calc(100vh - {$topbarheight}px)"
            style:width="calc(100vw - {$sidebarwidth}px)"
            style:top="{$topbarheight}px"
            on:click|preventDefault="{() => {
                sendEvent('burgerClicked')
            }}"
            on:touchstart|preventDefault="{() => {
                uIEvent.set({
                    kind: 'burgerClicked',
                    screenWidth:$screenWidth,
                    contactMenuState: $contactMenuState,
                    settingsMenuState: $settingsMenuState,
                    sidebarState: $sideBarState,
                    narrowScreenState: $narrowScreenState,
                });
            }}"
            aria-hidden="true"
            on:keyup
            on:wheel="{(e) => {
                e.preventDefault();
            }}"
        ></div>
    {/if}

    <div
        class="topbar"
        class:transpar="{$topbarColorState.color == 'transparent'}"
        class:solidbar="{$topbarColorState.color == 'solid'}"
        class:brutal-border="{$topbarColorState.color == 'solid' ||
            $topbarColorState.color == 'blur'}"
        class:blurbar="{$topbarColorState.color == 'blur'}"
        class:quick-transition="{$topbarColorState.speed == 'instant'}"
        bind:clientHeight="{$topbarheight}"
        on:touchmove|nonpassive="{(e) => {
            e.preventDefault();
        }}"
        on:wheel|nonpassive="{(e) => {
            e.preventDefault();
        }}"
    >
        <TopBarIcon
            push="{() => {
                sendEvent('burgerClicked')
            }}"
            state="{$burgIconState}"
        >
            <Hamburger
                size="{1}"
                padding="{5}"
                lilShrink="{$sideBarState.state == 'fullOpen' ||
                    $sideBarState.state == 'comingIn'}"
                gone="{!$showJsButtons}"
            />
        </TopBarIcon>
        <span class="barp noselect">SAM OEN</span>
        <!-- {$narrowScreenState && $sideBarState} -->
        <TopBarIcon
            push="{() => {
                sendEvent('contactClicked')
            }}"
            state="{$contactIconState}"
        >
            <Hand
                padding="{5}"
                lilShrink="{$contactMenuState.menu == 'comingIn' ||
                    $contactMenuState.menu == 'fullOpen'}"
                gone="{!$showJsButtons}"
            />
        </TopBarIcon>
        <TopBarIcon
            push="{() => {
                sendEvent('settingsClicked')
            }}"
            state="{$settingsIconState}"
        >
            <Gear
                lilShrink="{$settingsMenuState.menu == 'comingIn' ||
                    $settingsMenuState.menu == 'fullOpen'}"
                padding="{5}"
                gone="{!$showJsButtons}"
            />
        </TopBarIcon>
    </div>
    {#if $sideBarState.state == "fullOpen" || $sideBarState.state == "comingIn"}
        <div
            class="sidebar brutal-border"
            bind:offsetWidth="{$sidebarwidth}"
            style:top="{$topbarheight + 2}px"
            out:slide="{{
                delay: 0,
                duration: $sideBarState.speed,
                axis: 'x',
                // easing: backIn,
            }}"
            in:slide="{{
                delay: 0,
                duration: $sideBarState.speed,
                axis: 'x',
                easing: backOut,
            }}"
            on:outroend="{() => {
                $sidebarwidth = 0;
                sendEvent('sidebarAnimationFinish')
            }}"
            on:introend="{() => {
                sendEvent('sidebarAnimationFinish')
            }}"
            on:wheel|nonpassive="{(e) => {
                if (!sidenav) return;
                if (sidenav.scrollHeight <= sidenav.clientHeight) {
                    e.preventDefault();
                }
            }}"
        >
            <nav
                class="sidenav"
                bind:this="{sidenav}"
                on:touchmove|nonpassive="{(e) => {
                    if (!sidenav) return;
                    if (
                        sidenav.scrollHeight <= sidenav.clientHeight
                    ) {
                        e.preventDefault();
                    }
                }}"
                on:wheel|nonpassive="{(e) => {
                    if (!sidenav) return;
                    if (
                        sidenav.scrollHeight <=
                            sidenav.clientHeight &&
                        $narrowScreenState == 'narrow'
                    ) {
                        e.preventDefault();
                    }
                }}"
            >
                <ul>
                    <li>
                        <SideBarItem
                            txt="Home Page"
                            icon="{House}"
                            path="{modBase}"
                        />
                    </li>
                    <li>
                        <SideBarItem
                            txt="About"
                            icon="{User}"
                            path="{base}/about"
                        />
                    </li>
                </ul>
            </nav>
        </div>
    {/if}
    {#if $contactMenuState.menu == "fullOpen" || $contactMenuState.menu == "comingIn"}
        <div
            class="topnav brutal-border"
            bind:clientHeight="{$contactHeight}"
            style:top="{$topbarheight + 2}px"
            style:left="{$narrowScreenState == 'narrow' ? 3 : $sidebarwidth + 3}px"
            style:max-height="calc(100vh - {$topbarheight + 8}px)"
            in:slide|global="{{
                duration: SHELF_IN_DURATION,
                easing: bounceOut
            }}"
            out:slide|global="{{
                duration: $contactMenuState.outSpeed,
                easing:backIn,
            }}"
            on:outroend="{() => {
                $contactHeight = 0;
                sendEvent('contactAnimationFinish')
            }}"
            on:introend="{() => {
                sendEvent('contactAnimationFinish')
            }}"
        >
            <Contact />
        </div>
    {/if}
    {#if $settingsMenuState.menu == "fullOpen" || $settingsMenuState.menu == "comingIn"}
        <div
            class="topnav brutal-border"
            bind:clientHeight="{$settingsHeight}"
            style:top="{$topbarheight + 2}px"
            style:left="{$narrowScreenState == 'narrow' ? 3 : $sidebarwidth + 3}px"
            style:max-height="calc(100vh - {$topbarheight + 8}px)"
            in:slide|global="{{
                duration: SHELF_IN_DURATION,
                easing: bounceOut
            }}"
            out:slide|global="{{
                duration: $settingsMenuState.outSpeed,
                easing: backIn
            }}"
            on:outroend="{() => {
                $settingsHeight = 0;
                sendEvent('settingsAnimationFinish')
            }}"
            on:introend="{() => {
                sendEvent('settingsAnimationFinish')
            }}"
        >
            <Settings />
        </div>
    {/if}
    {#key $page.url.pathname}
        <div
            class="slotandfoot"
            in:fade="{{ duration: 500, delay: 0 }}"
            style:padding-top="{$contactHeight > $settingsHeight
                ? $contactHeight
                : $settingsHeight}px"
            style:padding-left="{$narrowScreenState == 'narrow' ? 0 : $sidebarwidth}px"
        >
            <slot />
            <footer>
                <hr />
                <p>&copy Sam Oen {new Date().getFullYear()}</p>
            </footer>
        </div>
    {/key}
</div>

<style>
    .top {
        /* position: relative; */
        /* so backdrop can position absolute */
    }

    .slotandfoot {
        min-height: 100vh;
        display: grid; /* So the footer goes at least bottom */
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
    }
    .blurbar {
        background-color: transparent;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
    .solidbar {
        background-color: var(--coloritem);
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
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--colortext);
        flex-grow: 1;
        text-align: center;
        overflow-x: hidden;
    }

    .topnav {
        position: fixed;
        right: 4px;
        /* display: grid; */

        overflow: auto;
        z-index: 3;
        background-color: var(--coloritem);
        padding: 10px;
    }

    .sidebar {
        position: fixed;
        left: 4px;
        bottom: 6px;
        z-index: 2;
        background-color: var(--coloritem);
        overflow-x: hidden;
        overflow-y: hidden;
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
        padding: 25px;
    }

    .shadow {
        position: fixed;
        inset: 0px;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }
    .shadowclick {
        position: fixed;
        z-index: 3;
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
    :global(h1) {
        font-size: clamp(1.2rem, 4vw + 0.6rem, 3rem);
        margin-bottom: 0.6em;
        text-wrap: balance;
    }
    :global(h2) {
        font-size: clamp(1.1rem, 2vw + 0.4rem, 2rem);
        margin-bottom: 0.6em;
        text-wrap: balance;
    }
    :global(h3) {
        font-size: clamp(1rem, 1vw + 0.3rem, 1.5rem);
        text-wrap: balance;
        font-weight: 500;
    }
    :global(button, a) {
        -webkit-tap-highlight-color: transparent;
    }
    :global(button) {
        cursor: pointer;
    }
    :global(a) {
        text-decoration: none;
    }
    :global(a:focus, a:active) {
        outline: none;
    }
    
    :global(p, span, h1, a, h2, h3) {
        color: var(--colortext);
        /* transition: color 1s; */
    }
    
    :global(html) {
        transition: background-color 1s ease-in-out;
        box-sizing: border-box;
        /* scroll-behavior: smooth; */
    }

    :global(*, *:before, *:after) {
        user-select: text;
        -moz-user-select: text;
        -webkit-user-select: text;
        -ms-user-select: text;
        touch-action: manipulation;
        padding: 0;
        margin: 0;
        overscroll-behavior: contain;
        box-sizing: border-box;
        text-size-adjust: none;
        -webkit-text-size-adjust: none;
        /* font-family: "Brush Script MT", "Comic Sans MS", Verdana, Arial, monospace; */
        font-family: Verdana, Arial, monospace;
    }
    :global(button, button *, a, a *, .noselect) {
        user-select: none !important;
        -moz-user-select: none !important;
        -webkit-user-select: none !important;
        -ms-user-select: none !important;
    }

    :global(body) {
        transition: background-color 1s ease-in-out;
        background-color: var(--colorprimary);
    }

    :global(html) {
        background-color: var(--colorprimary);
    }

    @keyframes -global-rubberBand {
        from {
            transform: scale3d(1, 1, 1);
        }

        30% {
            transform: scale3d(1.25, 0.75, 1);
        }

        40% {
            transform: scale3d(0.75, 1.25, 1);
        }

        50% {
            transform: scale3d(1.15, 0.85, 1);
        }

        65% {
            transform: scale3d(0.95, 1.05, 1);
        }

        75% {
            transform: scale3d(1.05, 0.95, 1);
        }

        to {
            transform: scale3d(1, 1, 1);
        }
    }
    @keyframes -global-heartBeat {
        0% {
            transform: scale(1);
        }

        14% {
            transform: scale(1.3);
        }

        28% {
            transform: scale(1);
        }

        42% {
            transform: scale(1.3);
        }

        70% {
            transform: scale(1);
        }
    }
    @keyframes -global-swing {
        20% {
            transform: rotate3d(0, 0, 1, 15deg);
        }

        40% {
            transform: rotate3d(0, 0, 1, -10deg);
        }

        60% {
            transform: rotate3d(0, 0, 1, 5deg);
        }

        80% {
            transform: rotate3d(0, 0, 1, -5deg);
        }

        to {
            transform: rotate3d(0, 0, 1, 0deg);
        }
    }
    @keyframes -global-bounce {
        from,
        20%,
        53%,
        to {
            animation-timing-function: cubic-bezier(
                0.215,
                0.61,
                0.355,
                1
            );
            transform: translate3d(0, 0, 0);
        }

        40%,
        43% {
            animation-timing-function: cubic-bezier(
                0.755,
                0.05,
                0.855,
                0.06
            );
            transform: translate3d(0, -20px, 0) scaleY(1.1);
        }

        70% {
            animation-timing-function: cubic-bezier(
                0.755,
                0.05,
                0.855,
                0.06
            );
            transform: translate3d(0, -10px, 0) scaleY(1.05);
        }

        80% {
            transition-timing-function: cubic-bezier(
                0.215,
                0.61,
                0.355,
                1
            );
            transform: translate3d(0, 0, 0) scaleY(0.95);
        }

        90% {
            transform: translate3d(0, -4px, 0) scaleY(1.02);
        }
    }
</style>
