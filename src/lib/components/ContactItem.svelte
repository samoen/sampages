<script lang="ts">
    import Phone from "$lib/assets/Phone.svelte";
    import type { ComponentType } from "svelte";

    export let icon: ComponentType = Phone;
    export let path: string = "#";
    let rightHeight: number;
    export let title = "title";
    export let detail = "detail";
</script>

<div class="contactItem">
    <!-- style:height="{rightHeight}px" -->
    <!-- bind:offsetHeight="{rightHeight}" -->
    <a class="barlink brutal-border" href="{path}">
        <div class="pic">
            <svelte:component this="{icon}" />
        </div>
        <span class="title">{title}</span>
    </a>
    <div
    class="detail"
    >
        <span >{detail}</span>
    </div>
</div>

<style>
    .pic {
        height: 40px;
        width: 40px;
        /* background-color: beige; */
    }
    .title {
        /* padding-inline: 5px; */
    }
    .contactItem {
        /* padding-right:10px; */
        /* padding-left:5px; */
        /* padding-block:3px; */
        /* flex-basis: 40px; */
        /* flex-shrink: 1; */
        
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
        align-items: stretch;
        /* gap:7px; */
        /* overflow: hidden; */
        /* background-color: aqua; */
        /* width: 100px; */
        width: 100px;
    }
    .barlink {
        /* aspect-ratio: 1/1; */
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
    }
    .detail {
        font-size: 0.7rem;
        /* flex-grow: 1; */
        /* max-width: 50px; */
        margin-top: 5px;
        text-wrap:balance;
        /* padding-inline: 25px; */
        /* margin-block: auto; */
        /* background-color: brown; */
        word-wrap: break-word;
        text-align: center;
    }
    .right {
        /* line-height:1em; */
        /* padding-block: 6px; */
        /* line-height:5px; */
    }
</style>
