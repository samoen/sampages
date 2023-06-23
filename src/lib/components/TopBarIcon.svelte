<script lang="ts">
    import {
        showJsButtons,
     
        topBarTransitionQuick,
        type TopBarIconState,
    } from "$lib/stores";
    import { fade } from "svelte/transition";

    export let push = () => {};
    export let state : TopBarIconState;
</script>

{#if $showJsButtons}
<!-- class:quick-transition="{$topBarTransitionQuick}" -->
<!-- class:delayed-transition="{$topBarTransitionDelayed}" -->
<button
class:inset-shadow="{state.color == 'inset'}"
class="baricon"
class:transparent="{state.color == 'transparent'}"
class:brutal-border="{state.color == 'solid'}"
class:fadey="{state.transition == "slow"}"
        on:transitionend="{() => {
            // $topBarTransitionDelayed = false;
        }}"
        
        on:click="{() => {
            push();
        }}"
        on:keydown
        in:fade
    >
        <slot />
    </button>
{:else}
    <div></div>
{/if}

<style>
    .baricon {
        width: 100%;
        height: 100%;
        touch-action: none;
        /* border-width: 0; */
        /* border-radius: 6px; */
        background-color: var(--colorsecondary);
        /* transition: none; */
        /* box-sizing: border-box; */
        /* transition: background-color var(--barTDur) ease-in-out
        var(--barTDelay),
        border-color var(--barTDur) ease-in-out var(--barTDelay); */
    }

    .fadey {
        transition: background-color 400ms ease-in-out,
            border-color 400ms ease-in-out, stroke 400ms ease-in-out,
            box-shadow 400ms ease-in-out;
    }

    .transparent {
        background-color: transparent;
        border: 2px solid transparent;
        border-radius: 9px;
    }

    .inset-shadow {
        box-shadow: inset 2px 2px 3px 1px var(--colorshadow);
        border: 2px solid transparent;
        border-radius: 9px;
        /* padding:3px; */
    }
    @media (hover: hover) and (pointer: fine) {
        .baricon.brutal-border:not(.delayed-transition):hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
        .baricon {
            cursor: pointer;
        }
    }
</style>
