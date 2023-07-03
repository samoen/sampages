<script lang="ts">
    import { showJsButtons, type TopBarIconState } from "$lib/stores";
    import { fade } from "svelte/transition";

    export let push = () => {};
    export let state: TopBarIconState;
</script>

<!-- {#if $showJsButtons} -->
<!-- class:quick-transition="{$topBarTransitionQuick}" -->
<!-- class:delayed-transition="{$topBarTransitionDelayed}" -->
<button
    class:inset-brutal="{state.color == 'inset'}"
    class="baricon"
    class:transparent="{state.color == 'transparent'}"
    class:brutal-border="{state.color == 'solid'}"
    class:fadey="{state.transition == 'slow'}"
    class:gone="{!$showJsButtons}"
    on:transitionend="{() => {
        // $topBarTransitionDelayed = false;
    }}"
    on:click="{() => {
        push();
    }}"
    on:keydown
>
    <slot />
</button>

<!-- {:else} -->
<!-- <div></div> -->
<!-- {/if} -->

<style>
    .baricon {
        touch-action: none;
        background-color: var(--colorpressed);
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-tap-highlight-color: transparent;
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
    
    .gone {
        color: transparent;
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
