<script lang="ts">
    import { page } from "$app/stores";
    import Hand from "$lib/assets/Hand.svelte";
    import { modBase, topMenuState, sideBarState, uIEvent, screenWidth, narrow } from "$lib/stores";
    import type { ComponentType } from "svelte";
    import { get } from "svelte/store";

    export let txt : string = "placeholder"
    export let icon : ComponentType = Hand
    export let path : string = modBase
</script>

<a
href="{path}"
class:inset-brutal="{$page.url.pathname ==`${path}`}"
class:grow="{$page.url.pathname ==`${path}`}"
class:brutal-border="{$page.url.pathname != `${path}`}"
on:click="{
    (e)=>{
        if($sideBarState.state != 'fullOpen' || $page.url.pathname ==`${path}`){
            e.preventDefault()
            return
        }
        if ($narrow == 'narrow' && $sideBarState.state == 'fullOpen') {
            uIEvent.set({
                kind: "burgerClicked",
                narrow:$narrow,
                topMenuState: $topMenuState,
                sidebarState: $sideBarState,
                screenWidth: $screenWidth,
            });
        }
    }
}"
>
<div
    class="sideitem"
    class:lil-shrinky="{$page.url
        .pathname == `${path}`}"
>
        <div class="icon">
            <svelte:component this={icon} />
        </div>
    <span>{txt}</span>
</div>
</a>

<style>
    a {
        background-color: var(--colorlight);
        display: block;
        padding-inline: 5px;
        padding-block: 5px;
    }
    .lil-shrinky {
        transform: scale(0.9);
    }
    .grow {
        background-color: var(--colorpressed);
        transform: scale(1.04);
    }
    .sideitem {
        display: flex;
        align-items: center;
        column-gap: 5px;
    }
    .icon{
        height:1.6rem;
        width: 1.6rem;
    }
    
    .sideitem span {
        white-space: nowrap;
        max-width: max-content;
        font-size: 1.3rem;
    }
</style>