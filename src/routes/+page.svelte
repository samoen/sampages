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
    let gagbut: HTMLButtonElement;
    let butx = 815;
    let buty = 200;
    let gagEl: HTMLDivElement;
    let gagHeight = 0;
    onMount(() => {
        mounted = true;
    });
    let msg = 0;
</script>

<div
    class="container"
    style:--but-x="{butx}px"
    style:--but-y="{buty}px"
    style:--gag-height="{gagHeight}px"
>
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
    </div>
    <div class="gag brutal-border">
        {#if !clickedCall}
            <div class="gagstart" bind:this="{gagEl}">
                <p>
                    Now you hunger. You crave. You request, nay -
                    demand! The <span class="glowing">
                        CALL TO ACTION
                    </span>
                </p>
                <button
                    bind:this="{gagbut}"
                    class:glowing-border="{true}"
                    on:click="{() => {
                        // clickGag();
                        let r = gagbut.getBoundingClientRect();
                        butx = r.left;
                        buty = r.top + scrollY;

                        gagHeight = gagEl.clientHeight;
                        falling = true;
                        clickedCall = true;
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                                msg++;
                            }, 2500 * i);
                        }
                        setTimeout(() => {
                            doneFalling = true
                        }, 700);
                    }}"
                >
                    <span class="gag-but-text">Heed the Call</span
                    ></button
                >
            </div>
        {:else}
            <div class="gagmsgs">
                <p class="grid1 nofade" class:trans="{msg != 1}">
                    Oops!
                </p>
                <p
                    class="grid1"
                    class:trans="{msg != 2}"
                    class:longfade="{msg == 2}"
                    class:nofade="{msg == 3}"
                >
                    That button is.. experiencing transformational..
                    maintenance.
                </p>
                <p class="grid1 longfade" class:trans="{msg != 3}">
                    Please continue to digitally experience the
                    website.
                </p>
            </div>
            {#if falling}
            <button
                    class="fallingbutton"
                    class:falling="{falling}"
                    class:trans="{doneFalling}"
                    on:animationend="{(e) => {
                        // e.animationName
                        // doneFalling = true;
                        falling = false;
                    }}"
                >
                    Heed the Fall</button
                >
            {/if}
        {/if}
    </div>
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
    <br />
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
    .container {
        padding-inline: 3vw;
    }
    .splash {
        padding-left: 3vw;
        padding-top: 30px;
        padding-bottom: 10px;
        /* margin-right: 3vw; */
        /* margin-left: 3vw; */
        margin-top: 3px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: local;
    }

    .nofade {
        transition: color 0s;
    }
    .longfade {
        transition: color 2500ms;
    }
    button:hover {
        /* background-color: white; */
    }

    .gag {
        margin-top: 10px;
        /* background-color: aquamarine; */
        /* margin-inline: 20px; */
        margin-block: 20px;
        padding-block: 10px;
        padding-inline: 3vw;
        /* min-width: 0px; */
        /* text-align: right; */
        background-color: var(--colorprimary);
        box-sizing: border-box;
    }

    .gagstart {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: start;
        /* justify-items: center; */
    }

    .gagmsgs {
        display: grid;
        align-items: center;
        justify-items: center;
        height: var(--gag-height);
        text-align: center;
    }

    .gag > p {
        /* margin-inline: auto; */
        flex: 1 1 150px;
        /* align-self: stretch; */
        /* justify-self: flex-start; */
        /* flex-basis: ma; */
        /* min-width: 150px; */
        max-width: max-content;
        text-align: center;
    }
    .gagstart > button {
        /* display: inline-block; */
        /* vertical-align: middle;    */
        /* flex-basis: 50%; */
        flex: 0 0 auto;
        /* max-width:; */
        font-weight: bold;
        margin-inline: auto;
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        background-color: var(--colorsecondary);
        /* font-size:1.5rem; */
        /* flex-grow: 1; */
    }

    .grid1 {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    .trans p,
    .trans span {
        color: transparent;
        animation: none;
    }

    .glowing {
        animation: glowing 500ms infinite;
        animation-timing-function: ease-in-out;
        /* animation-direction: alternate-reverse; */
        animation-timing-function: linear;
    }
    .fallingbutton {
        position: absolute;
        top: var(--but-y);
        left: var(--but-x);
        background-color: var(--colorsecondary);
        box-shadow: 3px 3px 0px 0px var(--colorshadow);
        border-radius:8px;
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        transition: background-color 700ms, color 700ms, box-shadow 700ms;
    }
    .trans {
        color: transparent;
        animation: none;
        border-color: transparent;
        box-shadow: 3px 3px 0px 0px transparent;
        background-color: transparent;
    }
    .falling {
        animation-name: fall;
        animation-duration: 1s;
        animation-fill-mode:forwards;
        animation-timing-function: linear;
        /* position: relative; */
    }
    .glowing-border {
        animation: glowing-border 1600ms infinite;
        /* animation-direction:alternate-reverse; */
        /* animation-timing-function:ease-in-out; */
        /* animation-fill-mode:both; */

        border-radius: 8px;
        /* border-color: black; */
        /* transition: box-shadow 500ms linear; */
        /* transition-duration: 0s; */
    }
    .gag-but-text {
        display: inline-block;
        animation: gagbutscale 1600ms infinite;
    }
    @keyframes gagbutscale {
        25% {
            transform: scale(1);
        }
        40% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1);
        }
    }
    @keyframes glowing-border {
        0% {
            /* box-shadow: none; */
            box-shadow: 2px 2px 0px 0px var(--colorshadow);
            /* border-color: var(--colorprimary); */
            /* border-color: transparent; */
            /* box-shadow: none; */
        }
        28% {
            box-shadow: 2px 2px 0px 0px var(--colorshadow);
            /* box-shadow: none; */
        }
        30% {
            box-shadow: none;
            /* border-color: var(--colorsecondary); */
            /* border-color: transparent; */
            /* box-shadow: inset 3px 3px 4px 1px var(--colorshadow); */
        }
        43% {
            box-shadow: inset 3px 3px 4px 1px var(--colorshadow);
            /* font-size:none; */
        }
        50% {
            /* border-color: transparent; */
            box-shadow: none;
            /* color: green; */
            /* box-shadow: 3px 3px 0px 1px var(--colorshadow); */
            /* font-size: x-small; */
        }
        53% {
            box-shadow: 2px 2px 0px 0px var(--colorshadow);
            /* border-color: transparent; */
            /* font-size: x-small; */
            /* color: darkgreen; */
        }
        100% {
            box-shadow: 2px 2px 0px 0px var(--colorshadow);
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
            transform-origin: bottom left;
        }
        20% {
            transform: rotate(120deg);
        }
        30% {
            /* rotate: 80deg; */
            transform: translateY(0px) rotate(80deg);
            /* top: 0px; */
        }
        50% {
            /* rotate: 30deg; */
            /* translate: 100px; */
            transform: translateY(100px) rotate(30deg);
            /* animation-timing-function: ease-in; */
        }
        /* 60%{
            top:100px;
        } */
        100% {
            /* translate: 500px; */
            /* rotate: -120deg; */
            transform: translateY(500px) rotate(-120deg);
        }
    }

    .container > p {
        display: block;
        max-width: clamp(0px, 80%, 700px);
        margin-inline: auto;
        margin-top: 1em;
    }

    .splash > p,
    h1 {
        font-weight: bold;
        margin-top: 1em;
    }

    p,
    h1 {
        /* text-align: center; */
    }
    h1 {
        font-size: clamp(1rem, 4vw + 1rem, 3rem);
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
