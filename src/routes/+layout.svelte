<script>
    import { base } from "$app/paths";
    import Search from "$lib/icons/Search.svelte";
</script>

<svelte:head>
    <title>Sam pages</title>
</svelte:head>
<div class="topbar">
    <a href="{base}/">Home</a>
    <a href="{base}/about">About</a>
    <div class="spacer"></div>
    <button>
        <Search />
    </button>
</div>

<slot />

<style>
    .topbar {
        background-color: aqua;
        position: sticky;
        top: 0px;
        padding: 0rem;
        padding-left: 1rem;
        display: flex;
        gap: 1rem;
        align-items:center;
    }
    .spacer {
        flex-grow: 1;
    }
    :global(body) {
        padding: 0;
        margin: 0;
    }
    /* :global(html){
        padding:0;
    } */
</style>
