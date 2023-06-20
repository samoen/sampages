<script>

    import { barIconColorState, showJsButtons, topBarTransitionDelayed, topBarTransitionQuick } from "$lib/stores";
    import { fade } from "svelte/transition";

    export let push = ()=>{}

</script>
{#if $showJsButtons}
<button
    class="baricon"
    class:brutal-border="{$barIconColorState == 'solid'}"
    class:transparent="{$barIconColorState == 'transparent'}"
    class:quick-transition="{$topBarTransitionQuick}"
    class:delayed-transition="{$topBarTransitionDelayed}"
    on:transitionend={()=>{
        $topBarTransitionDelayed = false
    }}
    on:click="{() => {
        push();
    }}"
    on:keydown
    in:fade
>
    <slot/>
</button>
{:else}
<div></div>
{/if}

<style>
    .baricon {
        width: 100%;
        height: 100%;
        touch-action: none;
        border-width: 0;
        border-radius: 6px;
        border: 2px solid transparent;
        background-color: var(--colorsecondary);
        /* transition: background-color var(--barTDur) ease-in-out
                var(--barTDelay),
            border-color var(--barTDur) ease-in-out var(--barTDelay); */
    }

    .transparent{
        background-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
        .baricon.brutal-border:not(.delayed-transition):hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
        .baricon{
            cursor: pointer;
        }
    }
</style>