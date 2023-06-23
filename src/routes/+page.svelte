<script lang="ts">
    import pachnor from "$lib/assets/pachnor.png";
    import wavy from "$lib/assets/wavy.png";
    import wavydark from "$lib/assets/wavydark.png";
    import xbig from "$lib/assets/xbig.png";
    import gamesprites from "$lib/assets/gamesprites.png";
    import Footer from "$lib/components/Footer.svelte";
    import { barColorState, burgopen, mobileMode, navSelect, splashTopMargin, themeMode, themes } from "$lib/stores";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { derived } from "svelte/store";

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
        class:lower-border="{$splashTopMargin}"
    >
        <h1 class="glowing">
            <!-- <img width=70 height=40 src="{pachnor}" alt="peachy" /> -->
            A Software Engineer
        </h1>
        <p>
            Innovating transformative digital experiences to delight
            and confuse.
        </p>
        {#if !clickedCall}
            <div class="gagstart" bind:this="{gagEl}">
                <p class="gag-start-text">
                    Now you hunger.. you crave. Request - nay,
                    demand it! I give you, the
                    <span class=""> CALL TO ACTION </span>
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
                        msg++;
                        // for (let i = 0; i < 5; i++) {
                        // setTimeout(() => {
                        // msg++;
                        // },
                        // 1900);
                        // 1900 * i);
                        // }
                        setTimeout(() => {
                            doneFalling = true;
                        }, 700);
                    }}"
                >
                    <span class="gag-but-text">Heed the Call!</span
                    ></button
                >
            </div>
        {:else}
            <div class="gagmsgs">
                {#if msg == 1}
                    <p
                        class="grid1"
                        in:fade="{{ duration: 100 }}"
                        on:introend="{() => msg++}"
                        out:fade="{{ duration: 500, delay: 1000 }}"
                    >
                        <!-- on:outroend="{()=>msg++}" -->
                        Oops!
                    </p>
                {:else if msg == 2}
                    <p
                        class="grid1"
                        in:fade="{{ duration: 2000, delay: 1500 }}"
                        on:introend="{() => {
                            msg++;
                        }}"
                        out:fade="{{ duration: 500, delay: 1000 }}"
                    >
                        <!-- on:outroend="{()=>msg++}" -->
                        <!-- class:trans="{msg != 2}" -->
                        <!-- class:longfade="{msg == 2 || msg == 3}" -->
                        <!-- class:nofade="{msg == 3}" -->
                        That button is.. experiencing transformational..
                        maintenance.
                    </p>
                {:else if msg == 3}
                    <p
                        class="grid1"
                        in:fade="{{ duration: 2000, delay: 1500 }}"
                    >
                        Please continue to digitally experience the
                        website.
                    </p>
                {/if}
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
                    Heed the Call!</button
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

    .container {
        padding-inline: 3vw;
    }
    .splash {
        padding-inline: 3vw;
        padding-bottom: 10px;
        padding-top: 65px;
        margin-top: 3px;
        margin-bottom: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: local;
        transition: margin-top 500ms ease-in-out, padding-top 500ms ease-in-out;
    }
    .lower-border{
        padding-top:15px;
        margin-top:73px;
    }

    .gagstart {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        row-gap: 20px;
        column-gap: calc(10vw - 15px);
    }
    .gag-start-text {
        justify-self: start;
        flex-basis: 30ch;
        flex-grow: 1;
        max-width: 90ch;
    }

    .gagstart > button {
        flex: 0 0 auto;
        font-weight: bold;
        margin-inline: auto;
        /* justify-self: center; */
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        background-color: var(--colorsecondary);
        border-color: var(--colorshadow);
    }
    .gagmsgs {
        /* box-sizing: border-box; */
        display: grid;
        align-items: center;
        justify-items: center;
        height: var(--gag-height);
        text-align: center;
    }
    @media (hover: hover) and (pointer: fine) {
        .gagstart > button:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
        .gagstart > button {
            cursor: pointer;
        }
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
        animation: move-bg 4s infinite;
        animation-timing-function: ease-out;
        /* animation-direction:reverse; */
        /* animation-timing-function: linear; */
        background-image: linear-gradient(
            90deg,
            /* var(--colortext), */ /* var(--colortext), */
                /* var(--colortext), */ var(--colortext),
            var(--colortext),
            var(--colorlight),
            /* transparent, */ /* var(--colorlight), */
                var(--colortext),
            var(--colortext),
            var(--colortext),
            var(--colortext),
            var(--colortext)
        );
        background-size: 800% 100%;
        /* background-clip: 400%; */
        background-position: 100% 0px;
        background-repeat: no-repeat;
        background-clip: text;
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
    }
    @keyframes move-bg {
        to {
            background-position: 0px 0px;
        }
    }
    .fallingbutton {
        position: absolute;
        top: var(--but-y);
        left: var(--but-x);
        background-color: var(--colorsecondary);
        border-color: var(--colorshadow);
        box-shadow: 3px 3px 0px 0px var(--colorshadow);
        border-radius: 8px;
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        transition: background-color 700ms, color 700ms,
            box-shadow 700ms;
        color: var(--colortext);
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
        animation-fill-mode: forwards;
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
        border: 1px solid var(--colorshadow);
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
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
            /* border-color: var(--colorprimary); */
            /* border-color: transparent; */
            /* box-shadow: none; */
        }
        20% {
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
            /* box-shadow: none; */
        }
        30% {
            box-shadow: none;
            /* border-color: var(--colorsecondary); */
            /* border-color: transparent; */
            /* box-shadow: inset 3px 3px 4px 1px var(--colorshadow); */
        }
        43% {
            box-shadow: inset 3px 3px 2px 1px var(--colorshadow);
            /* border:none; */
            /* border-color: gray; */
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
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
            /* border-color: transparent; */
            /* font-size: x-small; */
            /* color: darkgreen; */
        }
        100% {
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
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

    .splash > p {
        /* font-weight: bold; */
        text-size-adjust: none;
        -webkit-text-size-adjust: none;
        /* font-size: 1rem; */
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .splash > h1 {
        /* text-align: center; */
        font-size: clamp(1rem, 4vw + 1rem, 3rem);
        margin-bottom: 0.6em;
        /* margin-top: 1em; */
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
