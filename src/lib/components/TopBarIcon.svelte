<script>

    import { barIconColorState, showJsButtons } from "$lib/stores";
    import { fade } from "svelte/transition";

    export let push = ()=>{}

</script>
{#if $showJsButtons}
<button
    class="baricon"
    class:brutal="{$barIconColorState == 'brutal'}"
    class:transparent="{$barIconColorState == 'transparent'}"
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
        cursor: pointer;
        border-radius: 6px;
        border: 2px solid transparent;
        /* transition: background-color var(--barTDur) ease-in-out
                var(--barTDelay),
            border-color var(--barTDur) ease-in-out var(--barTDelay); */
    }
    .brutal{
        background-color: var(--colorsecondary);
        border: 2px solid var(--colorshadow);
        box-shadow: 2px 2px 2px 1px var(--colorshadow);
    }
    .transparent{
        background-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
        .baricon:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
    }
</style>