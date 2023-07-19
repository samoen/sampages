<script lang="ts">
    import Phone from "$lib/assets/Phone.svelte";
    import type { ComponentType } from "svelte";

    export let icon : ComponentType = Phone
    export let path : string = '#'
    let rightHeight : number;
    export let title = "title"
    export let detail = 'detail'
</script>

<div class="contactItem brutal-border">
    <!-- style:height="{40}px" -->
    <a 
    class="barlink" 
    href="{path}"
    >
            <svelte:component this={icon} />
    </a>
    <!-- bind:offsetHeight="{rightHeight}" -->
    <div
        class="right"
    >
        <span>{title}</span>
        <span class="detail">{detail}</span>
    </div>
</div>

<style>
    .contactItem{
        padding-right:5px;
        padding-left:2px;
        padding-top: 2px;
        background-color: var(--colorsecondary);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap:3px;
        overflow: hidden;
    }
    .barlink{
        width: 2.3em;
        height:2.3em;
        /* aspect-ratio: 1/1; */
    }
    .detail{
        display: inline-block;
        font-size:0.7rem;
        max-width: 16ch;
        word-wrap: break-word;
        /* background-color: aqua; */
        line-height:0.9em;
    }
    .right{
        /* background-color: aqua; */
        padding-bottom: 6px;
        display: flex;
        flex-direction: column;
        gap:1px;
        /* line-height:5px; */
    }
</style>

