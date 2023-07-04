<script lang="ts">
    import Hand from "$lib/assets/Hand.svelte";
    import HeartBalloon from "$lib/assets/HeartBalloon.svelte";
    import Heartbeat from "$lib/assets/Heartbeat.svelte";
    import Lightbulb from "$lib/assets/Lightbulb.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import gamesprites from "$lib/assets/gamesprites.png";
    import wavy from "$lib/assets/wavy.png";
    import wavydark from "$lib/assets/wavydark.png";
    import CallToAction from "$lib/components/CallToAction.svelte";
    import ImageTextCard from "$lib/components/ImageTextCard.svelte";
    import {
        lowerSplashTopMargin,
        themeMode,
        themes,
        topbarheight,
    } from "$lib/stores";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    $: splashimg = $themeMode == themes.dark ? wavydark : wavy;
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
    let cardwidth = 32;
</script>

<div
    class="container"

>
    <div
        class="splash brutal-border"
        style="background-image:url({splashimg});
         margin-top:{$lowerSplashTopMargin
            ? $topbarheight + 10
            : 3}px;
         padding-top:{$lowerSplashTopMargin ? 15 : 65}px"
    >
        <h1 class="glowing responsivetitle">
            <!-- <img width=70 height=40 src="{pachnor}" alt="peachy" /> -->
            Software Engineering
        </h1>
        <p>
            Innovating transformative digital experiences to delight
            and confuse.
        </p>
        <!-- bind:this="{gagEl}" -->

    </div>
    <div class="card brutal-border">
        <CallToAction></CallToAction>
    </div>

    <ImageTextCard>
        <h1>Fun Designs</h1>
        <br />
        <span> Solid Fundamentals </span>
    </ImageTextCard>
    <!-- {Math.floor(cardwidth)} -->
    <div class="twocards">
        <div class="brutal-border"
        bind:offsetWidth="{cardwidth}">
            <!-- <div> -->
                <HeartBalloon dims={cardwidth/2.2} anim="heartBeat"></HeartBalloon>
            <!-- </div> -->
            <p>Hand crafted. Made with love</p>
        </div>
        <div class="brutal-border">
            <Lightbulb dims={cardwidth/2} anim="swing"></Lightbulb>
            <p>
                Bring your ideas to life
            </p>
        </div>
    </div>
    <div class="brutal-border card">
        <h1>Want Buzzwords? We Got Em!</h1>
        <p>
            Are you tired of humdrum, run-of-the-mill websites that lack
            the cognitive surplus to leverage synergistic optimization?
            Fear not, for we have the solution. Our state-of-the-art
            platform is meticulously engineered to harmonize seamless
            scalability with disruptive hyper-convergence.
        </p>
        <br>
        <p>
            Oh, and did we mention the cloud? Yes, we have harnessed the
            boundless power of cloud computing to transcend the limits of
            terrestrial computing. Our servers float high above,
            majestically showering you with a mystical rain of data
            packets, granting you an ethereal connection that defies the
            boundaries of physicality.
        </p>
    </div>
</div>

<style>
    h1{
        margin-bottom: 0.5em;
    }
    .twocards{
        margin-block:20px;
        display:flex;
        flex-wrap: wrap;
        justify-content: center; 
        gap:20px;
    }
    .twocards > div{
        flex-basis: 0px;
        flex-grow: 1;
        flex-shrink:1;
        max-width: 360px;
        min-width:100px;
        text-align: center;
        /* min-width: 30ch; */
        background-color: var(--colorsecondary);
        padding:20px;
        /* padding-block:10%; */
        aspect-ratio: 1 / 0.7;
        display: flex;
        flex-direction: column;
        gap:15px;
        align-items: center;
        justify-content: center;
    }
    .twocards > div > p{
        text-wrap:balance;

    }
    .container {
        padding-inline: calc(3vw);
    }
    .splash {
        padding-inline: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: local;
        transition: margin-top 500ms ease-in-out,
            padding-top 500ms ease-in-out;
    }
    .card {
        margin-block:20px;
        padding:20px;
        background-color: var(--colorsecondary);
    }
    /* h1 {
        font-size: 1rem;
        text-wrap: balance;
    } */
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
    @keyframes move-bg {
        to {
            background-position: 0px 0px;
        }
    }
    

    .container > p {
        display: block;
        max-width: clamp(0px, 85%, 200ch);
        margin-inline: auto;
        margin-top: 1em;
    }

    .splash > p {
        /* font-weight: bold; */
        /* font-size: 1rem; */
        margin-top: 1em;
        margin-bottom: 1em;
        /* max-width: 50rch; */
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
