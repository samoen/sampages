<script>
    import Esflag from "$lib/assets/Esflag.svelte";
    import Palette from "$lib/assets/Palette.svelte";

    import Ukflag from "$lib/assets/Ukflag.svelte";
    import { selectedLang, toggleTheme } from "$lib/stores";
</script>

<div class="wrapper">
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
    <span> Color Theme</span>
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
        /* overflow:hidden; */
    }
    .baricon {
        width: 40px;
        height: 40px;
        touch-action: none;
        border-width: 0;
        background-color: var(--colorsecondary);
        cursor: pointer;
        border: 2px solid var(--colorshadow);
        border-radius: 6px;
        box-shadow: 2px 2px 2px 1px var(--colorshadow);
    }
    .langs {
        /* grid-template-columns: repeat(auto-fit, 2rem); */
        /* grid-template-rows: 3rem; */
        /* grid-auto-flow: column; */
        /* gap: 1rem; */
    }
    /* .flag {
        width: 2rem;
        height: 1.2rem;
        touch-action: none;
        border-width: 0;
        background-color: transparent;
        cursor: pointer;
        border: 1px solid var(--colorshadow);
        border-radius: 3px;
        box-shadow: 1px 1px 3px 1px var(--colorshadow);
    } */
</style>
