<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Hamburger from "$lib/icons/Hamburger.svelte";
    import Palette from "$lib/icons/Palette.svelte";
    import Ukflag from "$lib/icons/Ukflag.svelte";
    import { onMount } from "svelte";
    import { fade, fly, slide } from "svelte/transition";
    import logooen from "$lib/icons/logooen.png";

    let burgopen = true;
    let navheight: number = 0;
    let barheight: number = 0;
    let sidewidth: number = 0;
    let ready = false;
    onMount(() => {
        ready = true;
    });
    export let data;
</script>

<svelte:head>
    <title>Sam pages</title>
</svelte:head>

<!-- <svelte:body ></svelte:body> -->
<!-- <svelte:window style="--barheight: {barheight}px; --sidewidth:{sidewidth}px"></svelte:window> -->
{#if !ready}
    <div class="loading" transition:fly={{ delay: 0, duration: 500, y: 300 }}>
        loading...
    </div>
{:else}
    <div
        transition:fly={{ delay: 300, duration: 500, y: -300 }}
        class="top"
        style="--barheight: {barheight}px; --sidewidth:{sidewidth}px; --navheight:{navheight}px;"
    >
        <div class="topbar" bind:offsetHeight={barheight}>
            <button
                class="baricon"
                on:click={() => {
                    burgopen = !burgopen;
                }}
                on:keydown
            >
                <Hamburger />
            </button>
            <!-- {barheight}
        {navheight}
        {sidewidth} -->
            <p class="barp">SamCorp</p>
            <div class="barsection">
                <button
                    class="baricon"
                    on:click={() => {
                        window.document.body.classList.toggle("dark-mode");
                    }}
                    on:keydown
                >
                    <Palette />
                </button>
                <button class="flag">
                    <Ukflag />
                </button>
            </div>
        </div>
        {#if burgopen}
            <div
                class="nav"
                transition:slide={{ delay: 0, duration: 300 }}
                bind:offsetHeight={navheight}
            >
                <a href="{base}/">
                    <img class="navimg" src={logooen} alt="home" />
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

        <!-- bind:offsetWidth={sidewidth} -->
        {#if burgopen}
            <div
                class="sidebar"
                transition:slide={{ delay: 0, duration: 300, axis: "x" }}
                bind:offsetWidth={sidewidth}
            >
                <!-- <div class="sidebarinner"> -->
                    <a class="sideitem" href="{base}/">
                        <img class="navimg" src={logooen} alt="home" />
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
                <!-- </div> -->
            </div>
        {/if}
        <!-- <div class="tray"> -->
        {#key data.currentRoute}
            <div
                class="slotandfoot"
                in:fade={{ duration: 150, delay: 150 }}
                out:fade={{ duration: 150 }}
            >
                <slot />
                <footer class="foot">
                    <hr />
                    <p>&copy Sam Oen</p>
                    <!-- <div class="spacer" /> -->
                </footer>
            </div>
        {/key}
    </div>
{/if}

<!-- </div> -->

<style>
    .flag {
        width: 50px;
        border: none;
        line-height: 10px;
        align-items: center;
        padding: 6px;
        background-color: var(--colorsecondary);
        /* background-color: blue; */
    }
    .sidebar {
        position: fixed;
        top: calc(var(--barheight) + var(--navheight));
        /* top: 50px; */
        bottom: 0;
        left: 0;
        background-color: var(--colorsecondary);
        max-width: 100px;
        overflow: auto;
        z-index: 4;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        border: 4px solid var(--coloritem);
        border-top: none;
        box-sizing: border-box;
    }
    .sidebarinner {
        /* border-top: none; */
    }
    .sideitem {
        white-space: nowrap;
        margin: 5px;
        padding: 10px;
    }

    .slotandfoot {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: calc(var(--barheight) + var(--navheight));
        padding-left: var(--sidewidth);
        width: calc(100vw - var(--sidewidth));
        background-color: var(--colorprimary);
        /* bottom:; */
        /* width: fit-content; */
        /* height:auto; */
        /* padding:100px */
    }
    .foot {
        padding: 10px;
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: center; */
        /* background-color: aqua; */
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

    .topbar {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 3;
        box-sizing: border-box;
        background-color: var(--colorsecondary);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border: 4px solid var(--coloritem);
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
    .heroicon {
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
        /* height: 100px; */
        /* font-size: 250%; */
    }
    .baricon:hover {
        /* background-color: var(--coloritem); */
    }

    .nav {
        position: fixed;
        top: var(--barheight);
        box-sizing: border-box;
        right: 0;
        left: 0;
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
    a {
        display: flex;
        align-items: center;
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
        margin-right: 5px;
        /* height:auto; */
    }
    button {
        background-color: var(--coloritem);
    }
    .spacer {
        flex-grow: 1;
        /* display: inline; */
    }
    .top {
        background-color: var(--colorprimary);
        /* height:auto; */
    }
    :global(p, span, h1, a) {
        color: var(--colortext);
    }
    :global(*) {
        transition: background-color 0.5s;
        /* transition: all 0.5s; */
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
    }
    :global(html) {
        /* margin: 0; */
        /* padding: 0; */
        /* height:100%; */
        /* background-color: rgb(177, 209, 37); */
        background-color: var(--colorprimary);
    }
</style>
