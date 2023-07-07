<script lang="ts">
    import { fade } from "svelte/transition";

    let falling = false;
    let fading = false;
    let gagbut: HTMLButtonElement;
    let butx = 0;
    let buty = 0;
    let clickedCall = false;
    let gagFinished = false;
    let gagMsgsHeight = 0;
    let gagHeight = 0;
    let msg = 0;
</script>

{#if falling}
    <button
        style:left="{butx}px"
        style:top="{buty}px"
        class:trans="{fading}"
        class="fallingbutton"
    >
        Heed the Call!</button
    >
{/if}

<div
    class="gag"
    bind:clientHeight="{gagHeight}"
    class:fixed-min-height="{clickedCall && !gagFinished}"
    class:min-height-transition="{gagFinished}"
    style:--gag-height="{gagHeight}px"
    style:--gag-msgs-height="{gagMsgsHeight}px"
>
    {#if !clickedCall}
        <p class="gagintro">
            Do you yearn for interaction? Yes, you crave a click.. you
            pine for something to press.
        </p>
        <div class="gagstart">
            <div class="gag-start-text">
                <p>
                    Languish no longer dear visitor. Behold a glorious
                    CALL TO ACTION:
                </p>
            </div>
            <button
                class="press-me"
                bind:this="{gagbut}"
                on:click="{() => {
                    let r = gagbut.getBoundingClientRect();
                    butx = r.left;
                    buty = r.top + scrollY;

                    // gagHeight = gagEl.clientHeight;
                    gagMsgsHeight = gagHeight;
                    falling = true;
                    clickedCall = true;
                    msg++;
                    setTimeout(() => {
                        fading = true;
                    }, 1000);
                    setTimeout(() => {
                        falling = false;
                    }, 2000);
                }}"
            >
                <span class="gag-but-text">Heed the Call!</span
                ></button
            >
        </div>
    {:else}
        <div class="gagmsgs" class:text-align-left="{gagFinished}">
            {#if msg == 1}
                <p
                    class="grid1"
                    in:fade|global="{{ duration: 100 }}"
                    on:introend="{() => {
                        setTimeout(() => {
                            msg++;
                        }, 1000);
                    }}"
                    out:fade="{{
                        duration: 500,
                    }}"
                    on:outroend="{() => {
                        msg++;
                    }}"
                >
                    Oops!
                </p>
            {:else if msg == 3}
                <p
                    class="grid1"
                    in:fade="{{
                        duration: 2000,
                    }}"
                    on:introend="{() => {
                        setTimeout(() => {
                            msg++;
                        }, 1000);
                    }}"
                    out:fade="{{
                        duration: 500,
                    }}"
                    on:outroend="{() => {
                        msg++;
                        gagFinished = true;
                    }}"
                >
                    That button is experiencing transformational..
                    ah.. maintenance.
                </p>
            {:else if msg == 5}
                <p
                    class="grid1 finalmsg"
                    in:fade="{{
                        duration: 2000,
                    }}"
                >
                    Please continue to digitally experience the
                    website. But beware, dear visitor. You may find
                    your paradigms have shifted on the journey.
                </p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .fallingbutton {
        position: absolute;
        background-color: var(--colorlight);
        box-shadow: inset 1px 1px 1px 1px var(--colorshadow);
        border: 1px solid black;
        border-radius: 9px;
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        transition: background-color 700ms, color 700ms,
            box-shadow 700ms;
        color: var(--colortext);
        z-index: 3;
        animation-name: fall;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    }
    .gag {
        min-height: 0px;
    }
    .min-height-transition {
        transition: min-height 1s ease-in-out;
    }
    .gagintro{
        margin-bottom: 10px;
    }
    .gagstart {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        row-gap: 12px;
        column-gap: 10px;
    }
    .gag-start-text {
        flex: 1 0 0;
        /* justify-self: start; */
        max-width: max-content;
        flex-basis: 20ch;

        /* text-wrap: balance; */
        /* flex-grow: 1; */
        /* background-color: brown; */
    }
    .press-me {
        flex: 1 0 0;
        font-weight: bold;
        max-width: max-content;
        justify-self: center;
        /* margin-inline: auto; */
        padding-inline: clamp(0px, 2vw + 0.2rem, 2rem);
        padding-block: clamp(0.1rem, 1rem, 2rem);
        border-color: var(--colorshadow);
        animation: press-me 1600ms infinite;
        background-color: var(--coloritem);
        border-radius: 8px;
        border: 1px solid var(--colorshadow);
    }
    .gag-but-text {
        white-space: nowrap;
        display: inline-block;
        animation: gagbutscale 1600ms infinite;
    }

    .gagmsgs {
        display: grid;
        align-items: center;
        justify-items: center;
        text-align: center;
        height: 100%;
    }
    .text-align-left {
        text-align: left;
        align-items: flex-start;
        justify-items: left;
    }
    .fixed-min-height {
        min-height: var(--gag-msgs-height);
        height: var(--gag-msgs-height);
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
        /* text-wrap:balance; */
    }

    .trans {
        color: transparent;
        border-color: transparent;
        box-shadow: 3px 3px 0px 0px transparent;
        background-color: transparent;
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
    @keyframes press-me {
        0%,
        20% {
            /* box-shadow: none; */
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
            /* border-color: var(--colorprimary); */
            /* border-color: transparent; */
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
        53%,
        100% {
            box-shadow: 3px 3px 0px 0px var(--colorshadow);
            /* border-color: transparent; */
            /* font-size: x-small; */
            /* color: darkgreen; */
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
</style>
