<script lang="ts">
    import Hand from "$lib/assets/Hand.svelte";
    import HappyMessage from "$lib/assets/HappyMessage.svelte";
    import HeartBalloon from "$lib/assets/HeartBalloon.svelte";
    import Heartbeat from "$lib/assets/Heartbeat.svelte";
    import Lightbulb from "$lib/assets/Lightbulb.svelte";
    import Palette from "$lib/assets/Palette.svelte";
    import Wallet from "$lib/assets/Wallet.svelte";
    import gamesprites from "$lib/assets/gamesprites.png";
    import wavy from "$lib/assets/wavy.png";
    import wavydark from "$lib/assets/wavydark.png";
    import CallToAction from "$lib/components/CallToAction.svelte";
    import ImageTextCard from "$lib/components/ImageTextCard.svelte";
    import {
        
        splashMarginTop,
        themeMode,
        themes,
        topbarheight,
    } from "$lib/stores";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    $: splashimg = $themeMode == themes.dark || $themeMode == themes.red ? wavydark : wavy;
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
</script>

<div
    class="container"

>
    <div
        class="splash brutal-border"
        style="background-image:url({splashimg});"
         style:margin-top="{$splashMarginTop.marg}px"
         style:padding-top="{$splashMarginTop.pad}px"
         
    >
        <h1 class="glowing">
            <!-- <img width=70 height=40 src="{pachnor}" alt="peachy" /> -->
            Software Engineering
        </h1>
        <p>
            Innovating transformative digital experiences to delight
            and confuse.
        </p>
        <!-- bind:this="{gagEl}" -->

    </div>
    <div class="card brutal-border callToAction">
        <h2>Extreme Interactivity</h2>
        <CallToAction></CallToAction>
    </div>

    <ImageTextCard>
        <h2>Fun Designs</h2>
        <span> Solid Fundamentals </span>
    </ImageTextCard>
    <div class="fourcards">
        <div class="twocards">
            <div class="brutal-border">
                <div class="cardim balloon">
                    <HeartBalloon></HeartBalloon>
                </div>
                <div class="cardtxt">
                    <p>Hand crafted. Made with love</p>
                </div>
            </div>
            <div class="brutal-border">
                <div class="cardim bulb">
                    <Lightbulb></Lightbulb>
                </div>
                <div class="cardtxt">
                    <p>
                        Bring your ideas to life
                    </p>
                </div>
            </div>
        </div>
        <div class="twocards">
            <div class="brutal-border">
                <div class="cardim happyMsg">
                    <HappyMessage></HappyMessage>
                </div>
                <div class="cardtxt">
                    <p>
                        Joyful collaboration
                    </p>
                </div>
            </div>
            <div class="brutal-border">
                <div class="cardim wallet">
                    <Wallet></Wallet>
                </div>
                <div class="cardtxt">
                    <p>Easy on the front pocket</p>
                </div>
            </div>
        </div>

    </div>
    <div class="brutal-border card">
        <h2>Want Buzzwords? We Got Em!</h2>
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
    .container {
        padding-inline: calc(3vw);
        /* overflow-x: hidden; */
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
    .callToAction{
        /* overflow-x: auto; */
    }
    .bulb{
        /* padding:10%; */
        animation: swing 1200ms infinite;
        /* animation-delay: 4000ms; */
        /* animation-duration: 3000ms; */
        /* background-color: aqua; */
    }
    .balloon{
        animation: heartBeat 1200ms infinite;
        
    }
    .wallet{
        animation: bounce 1200ms infinite;
    }
    .happyMsg{
        animation: rubberBand 1200ms infinite;
    }
    h1{
        margin-bottom: 0.5em;
    }
    .fourcards{
        margin-block:20px;
        /* display: flex; */
        /* flex-wrap: wrap; */
        gap:20px;
        /* justify-content: center; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(45%,1fr));
        grid-auto-rows:1fr;

    }
    .twocards{
        /* flex-basis: 0px; */
        /* flex-grow: 1; */
        /* flex-shrink: 1; */
        /* min-width: 17rem; */

        /* display:flex; */
        /* flex-wrap: nowrap; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px,1fr));
        grid-auto-rows:1fr;
        gap:20px;
    }
    .twocards > div{
        /* flex-basis: 0px; */
        /* flex-grow: 1; */
        /* flex-shrink:1; */
        /* min-height: 1px; */
        min-width: 50px;
        background-color: var(--colorsecondary);
        padding:20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        /* flex-wrap: nowrap; */
        gap:10px;
        /* gap:15px; */
    }
    .cardim{
        min-height:1px;
        min-width:1px;
        flex-basis: 70px;
        flex-grow:0;
        flex-shrink: 1;
    }
    
    .cardtxt{
        flex-basis: auto;
        text-align:center;
        margin-block: auto;
        /* flex-grow: 1; */
        /* flex-shrink: 1; */
        display: flex;
        align-items: center;
        /* background-color: aqua; */
        
    }
    .cardtxt > p {
        text-wrap:balance;
    }
    .glowing {
        animation: move-bg 3500ms infinite;
        animation-timing-function: ease-out;
        background-image: linear-gradient(
            90deg,
            var(--colortext),
            var(--colortext),
            var(--colorlight),
            var(--colortext),
            var(--colortext),
            var(--colortext),
            var(--colortext)
            /* , */
            /* var(--colortext) */
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
