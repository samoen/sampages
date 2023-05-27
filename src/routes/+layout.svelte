<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import Search from "$lib/icons/Search.svelte";
    let burgopen = true;
    let oh:number;
</script>

<svelte:head>
    <title>Sam pages</title>
</svelte:head>
<div class="barandnav">
    <div class="topbar">
        <span
            class="baricon"
            on:click={() => {
                burgopen = !burgopen;
            }}
            on:keydown>🍔</span
        >
        <!-- <div class="spacer"></div> -->

        <div
            class="barsection"
            on:click={() => {
                goto(`${base}/`);
            }}
            on:keydown
        >
            <!-- <span class="baricon">&#129373;</span> -->
            <!-- <span class="barspan">OEN</span> -->
            <img src="logooen.png" alt="hey" />
        </div>
        <!-- <div class="spacer"></div> -->
        <button class="themer baricon righty"
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
</div>
<!-- <div class="tray"> -->
<!-- {#if burgopen} -->
<!-- {/if} -->
<!-- </div> -->
<!-- <div class="slotcontain"> -->
<slot />
<footer class="foot">
    <hr />
    <p>&copy Sam Oen</p>
    <!-- <div class="spacer" /> -->
</footer>

<!-- </div> -->
<!-- <div class="footer">
</div> -->
<style>
    .slotcontain {
        /* display: flex; */
        /* flex-direction: column; */
        /* height:fit-content; */
        /* min-height:100dvh; */
        /* justify-content: space-between; */
        /* min-height: 100%; */
        /* position: relative; */
    }
    .foot {
        /* flex-grow: 1; */
        background-color: var(--colorsecondary);
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
        width: 90%;
        border: 2px solid #bbb;
        border-radius: 3px;
        border-color: var(--colortext);
        opacity: 50%;
    }
    .barandnav {
        position: sticky;
        top: 0;
        right: 0;
        left: 0;
        padding: 0;
    }
    .stick {
        position: sticky;
        top: 40px;
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
    .barspan {
        /* display:inline; */
        /* align-content: center; */
        /* text-align: center; */
        font-family: fantasy;
        font-size: 160%;
        /* line-height: 200%; */
        /* height: 100%; */

        /* background-color: blue; */
    }
    .baricon {
        /* line-height: 100px; */
        cursor: pointer;
        padding: 0;
        margin: 0;
        background-color: var(--colorsecondary);
        border-width: 0;
        padding: 0px;
        font-size: 180%;
    }
    .baricon:hover {
        background-color: var(--coloritem);
    }
    .righty {
        float: right;
    }
    .nav {
        display: flex;
        /* row-gap:5px; */
        /* column-gap:min(1rem,10vh); */
        gap:10px;
        /* padding: 7px; */
        flex-wrap:wrap;
        justify-content: space-evenly;
        /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
        border: 2px solid #bbb;
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
        background-color: aquamarine;
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
        padding-top:5px;
        padding-bottom:5px;
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
    :global(p, span, h1, a) {
        color: var(--colortext);
    }
    :global(*) {
        transition: background-color 0.5s;
    }
    :global(body.red-mode) {
        --colorprimary: pink;
        --colorsecondary: red;
        --colortext: aliceblue;
        --coloritem: brown;
    }
    :global(body.dark-mode) {
        --colorprimary: black;
        --colorsecondary: darkblue;
        --coloritem: blue;
        --colortext: white;
    }
    :global(body) {
        /* position: relative; */
        padding: 0;
        /* padding-left: 10px; */
        /* padding-right: 10px; */
        margin: 0;
        /* height:100%; */
        min-height: 100vh;
        min-height: 100dvh;
        background-color: var(--colorprimary);
        --colorprimary: beige;
        --colorsecondary: lightgreen;
        --colortext: black;
        --coloritem: chartreuse;
    }
    :global(html) {
        margin: 0;
        padding: 0;
        /* height:100%; */
        background-color: rgb(126, 28, 126);
    }
</style>
