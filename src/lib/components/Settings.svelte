<script>
    import Esflag from "$lib/assets/Esflag.svelte";
    import Palette from "$lib/assets/Palette.svelte";

    import Ukflag from "$lib/assets/Ukflag.svelte";
    import { selectedLang, toggleTheme } from "$lib/stores";
</script>

<div class="wrapper">
    <h2>Settings</h2>
    <span>Languages</span>
    <div class="langs">
        <button
            class="baricon"
            on:click="{() => ($selectedLang = 'EN')}"
        >
            <Ukflag />
        </button>
        <button
            class="baricon"
            on:click="{() => ($selectedLang = 'ES')}"
        >
            <Esflag />
        </button>
    </div>
    <span>Color Theme</span>
    <div class="langs">
        <button
            class="baricon"
            on:click="{() => {
                toggleTheme();
            }}"
        >
            <Palette --pad="0.1rem" />
        </button>
    </div>
</div>

<style>
    /* button{
        min-height: 40px;
        min-width: 40px;
    } */
    
    .wrapper{
        overflow:hidden;
        padding:10px;
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        /* align-items: stretch; */
        /* justify-content: space-around; */
    }
    .wrapper span{
        overflow: hidden;
        white-space: nowrap;
    }
    .baricon {
        /* width: 40px; */
        /* height: 40px; */
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;
    }
    .langs {
        display: flex;
        /* grid-template-columns: repeat(auto-fit, 2rem); */
        /* grid-template-rows: 3rem; */
        /* grid-auto-flow: column; */
        gap: 10px;
        /* background-color: brown; */
    }
    /* .flag {
        width: 2rem;
        height: 1.2rem;
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;

    } */
</style>
