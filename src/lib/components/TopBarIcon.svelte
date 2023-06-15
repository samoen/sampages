<script>

    import { showJsButtons } from "$lib/stores";
    import { fade } from "svelte/transition";

    export let push = ()=>{}

</script>
{#if $showJsButtons}
<button
    class="baricon"
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
        background-color: var(--colorsecondary);
        cursor: pointer;
        border: 2px solid var(--colorshadow);
        border-radius: 6px;
        box-shadow: 2px 2px 2px 1px var(--colorshadow);
    }
    @media (hover: hover) and (pointer: fine) {
        .baricon:hover {
            background-color: var(--coloritem);
            transition: background-color 0s;
        }
    }
</style>