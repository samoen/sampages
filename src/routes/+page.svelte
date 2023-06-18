<script lang="ts">
    import pachnor from "$lib/assets/pachnor.png";
    import wavy from "$lib/assets/wavy.png";
    import wavydark from "$lib/assets/wavydark.png";
    import xbig from "$lib/assets/xbig.png";
    import gamesprites from "$lib/assets/gamesprites.png";
    import Footer from "$lib/components/Footer.svelte";
    import { themeMode, themes } from "$lib/stores";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";

    $: splashimg = $themeMode == themes.dark ? wavydark : wavy;
    let falling = false;
    let doneFalling = false;
    let clickedCall = false;
    let mounted = false;
    onMount(() => {
        mounted = true;
    });
    let msg = 0;
    function clickGag() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                msg++;
            }, 2000 * i);
        }
    }
</script>

<div class="container">
    <div
        class="splash brutal-border"
        style="background-image:url({splashimg});"
    >
        <h1>
            <!-- <img width=70 height=40 src="{pachnor}" alt="peachy" /> -->
            A Software Engineer
        </h1>
        <p>
            Innovating transformative digital experiences to delight
            and confuse.
        </p>
        <br />
        <br />
        <div class="gag">
            <div class="action">
                <div class="grid1 nofade" class:trans="{msg != 0}">
                    <p>
                        Now you hunger. You crave. You request, nay -
                        demand! The <span class="glowing">
                            CALL TO ACTION
                        </span>
                    </p>
                </div>
                <p class="grid1" class:trans="{msg != 1}">Oops!</p>
                <p class="grid1" class:trans="{msg != 2}">
                    That button is.. experiencing transformational..
                    maintenance.
                </p>
                <p class="grid1" class:trans="{msg != 3}">
                    Just explore the site like normal - digitally
                    experience it.
                </p>
            </div>
            <button
                class:glowing-border="{!falling}"
                class:brutal-border="{!doneFalling}"
                class:falling="{falling}"
                class:trans="{doneFalling}"
                on:click="{() => {
                    clickGag();
                    falling = true;
                    clickedCall = true;
                }}"
                on:animationend="{() => {
                    doneFalling = true;
                }}"
            >
                Heed the Call</button
            >
        </div>
    </div>
    <br />
    <br />
    <br />
    <img
        class="normalimg brutal-border"
        width="400"
        height="200"
        src="{gamesprites}"
        alt="a squiggle"
    />
    <br />
    <p>
        Are you tired of humdrum, run-of-the-mill websites that lack
        the cognitive surplus to leverage synergistic optimization?
        Fear not, for we have the ultimate solution for your
        technologically inclined desires. Our state-of-the-art
        platform is meticulously engineered to harmonize seamless
        scalability with disruptive hyper-convergence.
    </p>

    <p>
        Oh, and did we mention the cloud? Yes, we have harnessed the
        boundless power of cloud computing to transcend the limits of
        terrestrial computing. Our servers float high above,
        majestically showering you with the mystical rain of data
        packets, granting you an ethereal connection that defies the
        boundaries of physicality.
    </p>
    <!-- <Footer></Footer> -->
</div>

<style>
    /* .container > p, h1 { */
    /* margin-top: 0em; */
    /* background-color: blueviolet; */
    /* border: none; */
    /* box-sizing: content-box; */
    /* text-align: center; */
    /* margin-inline: auto; */
    /* } */
    .splash {
        padding-left: 3vw;
        padding-top: 30px;
        padding-bottom: 10px;
        margin-right: 25px;
        margin-left: 20px;
        margin-top: 0px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: local;
    }

    .nofade {
        transition: color 0s;
    }
    button:hover {
        /* background-color: white; */
    }

    .gag {
        display: flex;
        /* grid-template-columns: 1fr 1fr; */
        /* grid-template-rows: 1fr; */
        align-items: center;
        justify-content: center;
        /* background-color: aquamarine; */
        margin-right: 10px;
        gap: clamp(0.01rem, 4vw, 4rem);
        /* overflow-x: hidden; */
        /* min-width: 0px; */
        /* text-align: right; */
    }
    .gag > div {
        flex-shrink: 1;
    }

    .grid1 {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    .secondact {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
    .secondafter {
        transition-delay: var(--talk-delay);
    }

    .trans {
        color: transparent;
        animation: none;
        border-color: transparent;
        background-color: transparent;
    }
    .trans p,
    .trans span {
        color: transparent;
        animation: none;
    }

    .action {
        display: grid;
        align-items: center;
        justify-items: center;
        /* max-width: calc(var(--main-width-px) * 0.4); */
    }
    .action p {
        display: block;
        font-weight: bold;
    }

    .gag button {
        /* display: inline-block; */
        /* vertical-align: middle;    */

        flex-basis: auto;
        font-weight: bold;
        justify-self: center;
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        /* font-size:1.5rem; */
        /* flex-grow: 1; */
    }
    .glowing {
        animation: glowing 500ms infinite;
        animation-timing-function: ease-in-out;
        /* animation-direction: alternate-reverse; */
        animation-timing-function: linear;
    }
    .glowing-border {
        animation: glowing-border 500ms infinite;
        /* animation-direction:alternate-reverse; */
        animation-timing-function: linear;
    }

    .falling {
        animation-name: fall;
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-timing-function: linear;
        position: relative;
    }
    @keyframes glowing-border {
        0% {
            border-color: var(--colorprimary);
        }
        25% {
            border-color: var(--colorsecondary);
        }
        75% {
            border-color: green;
            color: green;
            box-shadow: none;
        }
        100% {
            border-color: darkgreen;
            color: darkgreen;
            box-shadow: none;
        }
    }
    @keyframes glowing {
        0% {
            border-color: var(--colorsecondary);
        }
        25% {
            color: darkgoldenrod;
        }
        75% {
            border-color: green;
            box-shadow: none;
        }
        100% {
            color: lightgreen;
        }
    }
    @keyframes fall {
        0% {
            /* transform: translateY(3px); */
            transform-origin: bottom left;
            /* rotate: 0deg; */
            top: 0px;
        }
        10% {
            top: 0px;
            /* transform: translateY(4); */
            /* top:35px; */
            /* rotate: 100deg; */
            /* transform: translateY(30px); */
        }
        20% {
            top: 0px;
            rotate: 120deg;
        }
        30% {
            rotate: 80deg;
            top: 0px;
        }
        50% {
            rotate: 30deg;
            /* top:0px; */
            top: 100px;
            /* left: 5px; */
            /* transform: translateY(100px); */
            /* animation-timing-function: ease-in; */
        }
        /* 60%{
            top:100px;
        } */
        100% {
            top: 500px;
            left: 0px;
            rotate: -120deg;
            /* transform: translateY(500px); */
        }
    }

    .splash > p {
        font-weight: bold;
        display: inline-block;
        /* margin-inline:auto; */
        max-width: clamp(0px, 80vw, 700px);
        margin-top: 1em;
        margin-inline: auto;
    }

    p,
    h1 {
        /* text-align: center; */
    }
    h1 {
        margin-top: 50px;
        font-size: clamp(1rem, 4vw + 1rem, 3rem);
        /* margin-inline: clamp(0.1rem, 4vw, 3rem); */
        /* font-size: 4rem; */
    }

    .normalimg {
        display: block;
        margin-inline: auto;
        height: auto;
        width: clamp(1px, 60%, 500px);
        object-fit: cover;
        border-radius: 13px;
    }
</style>
