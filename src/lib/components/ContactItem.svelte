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
    <a 
    class="barlink" 
    href="{path}"
    style:height="{rightHeight}px"
    
    >
            <svelte:component this={icon} />
    </a>
    <div
        class="right"
        bind:offsetHeight="{rightHeight}"
    >
        <span>{title}<br /></span>
        <span class="detail">{detail}</span>
    </div>
</div>

<style>
    .contactItem{
        padding-right:10px;
        padding-left:5px;
        padding-block:3px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap:7px;
        overflow: hidden;
    }
    .barlink{
        aspect-ratio: 1/1;
    }
    .detail{
        font-size:0.7rem;
    }
    .right{
        line-height:1em;
        padding-block: 6px;
        /* line-height:5px; */
    }
</style>

