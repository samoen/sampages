<script lang="ts">
    import { page } from "$app/stores";
    import Hand from "$lib/assets/Hand.svelte";
    import { modBase } from "$lib/stores";
    import type { ComponentType, SvelteComponent } from "svelte";

    export let txt : string = "placeholder"
    export let icon : ComponentType = Hand
    export let path : string = modBase
</script>

<a
href="{path}"
class:inset-brutal="{$page.url.pathname ==
    `${path}`}"
class:brutal-border="{$page.url
    .pathname != `${path}`}"
>
<div
    class="sideitem"
    class:lil-shrinky="{$page.url
        .pathname == `${path}`}"
>
    <svelte:component this={icon} dims=25 />
    <span>{txt}</span>
</div>
</a>

<style>
    a {
        background-color: var(--colorlight);
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
        display: block;
    }
    .lil-shrinky {
        transform: scale(0.9);
    }
    .sideitem {
        display: flex;
        align-items: center;
        column-gap: 5px;
        padding-inline: 5px;
        padding-block: 5px;
        /* background-color: var(--colorsecondary); */
    }

    .sideitem span {
        /* padding-right: 1rem; */
        width: max-content;
        white-space: nowrap;
        font-size: 1.3rem;
    }
</style>