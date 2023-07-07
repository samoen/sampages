<script>
    import Esflag from "$lib/assets/Esflag.svelte";
    import Palette from "$lib/assets/Palette.svelte";

    import Ukflag from "$lib/assets/Ukflag.svelte";
    import {
        selectedLang,
        themeMode,
        themes,
        toggleTheme,
    } from "$lib/stores";
</script>

<div class="wrapper">
    <h2>Settings</h2>
    <h3>Language</h3>
    <div class="langs">
        <button
            class="flag brutal-border"
            on:click="{() => ($selectedLang = 'EN')}"
        >
            <Ukflag />
        </button>
        <button
            class="flag brutal-border"
            on:click="{() => ($selectedLang = 'ES')}"
        >
            <Esflag />
        </button>
    </div>
    
    <h3>Color Theme</h3>
    <div class="themes">
        <button
            class="themePick cream"
            class:insetCream="{$themeMode == themes.light}"
            class:grow="{$themeMode == themes.light}"
            class:borderCream="{$themeMode != themes.light}"
            on:click="{() => {
                themeMode.set(themes.light);
            }}"
        >
            <div class:shrink="{$themeMode == themes.light}">
                Cream
            </div>
        </button>
        <button
            class="themePick night"
            class:insetNight="{$themeMode == themes.dark}"
            class:grow="{$themeMode == themes.dark}"
            class:borderNight="{$themeMode != themes.dark}"
            on:click="{() => {
                themeMode.set(themes.dark);
            }}"
        >
            <div class:shrink="{$themeMode == themes.dark}">Night</div>
        </button>
        <button
            class="themePick anger"
            class:insetRed="{$themeMode == themes.red}"
            class:grow="{$themeMode == themes.red}"
            class:borderRed="{$themeMode != themes.red}"
            on:click="{() => {
                themeMode.set(themes.red);
            }}"
        >
            <div class:shrink="{$themeMode == themes.red}">Rover</div>
        </button>
    </div>
</div>

<style>
    /* button{
        min-height: 40px;
        min-width: 40px;
    } */
    .flag{
        height:35px;
        width:50px;
        touch-action: none;
        cursor: pointer;
        /* padding:10px; */
    }
    
    .wrapper {
        /* overflow:hidden; */
        /* padding:10px; */
        /* background-color: aqua; */
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: stretch; */
        /* justify-content: space-around; */
    }
    .wrapper span {
        overflow: hidden;
        white-space: nowrap;
    }
    .themePick {
        touch-action: none;
        cursor: pointer;
        /* width: 40px; */
        /* height: 40px; */
        font-weight: bold;
        padding-inline: 15px;
        padding-block: 10px;
        touch-action: none;
        /* border-width: 0; */
        background-color: transparent;
        cursor: pointer;
    }
    .shrink {
        transform: scale(0.9);
    }
    .grow {
        transform: scale(1.2);
    }
    .cream {
        border-color: black;
        background-color: beige;
        color: black;
    }
    .borderCream {
        border: 2px solid black;
        box-shadow: 2px 2px 0px 0px black;
        border-radius: 8px;
    }

    .insetCream {
        box-shadow: inset 2px 2px 3px 1px black;
        border: 2px solid var(--coloritem);
        border-radius: 9px;
    }

    .night {
        background-color: blue;
        border-color: aqua;
        color: white;
    }
    .borderNight {
        border: 2px solid darkblue;
        box-shadow: 2px 2px 0px 0px darkblue;
        border-radius: 8px;
    }

    .insetNight {
        box-shadow: inset 2px 2px 3px 1px darkblue;
        border: 2px solid var(--coloritem);
        border-radius: 9px;
    }
    .anger {
        background-color: red;
        color: pink;
        border: 2px solid darkred;
        box-shadow: 2px 2px 0px 0px darkred;
        border-radius: 8px;
    }
    .borderRed {
        border: 2px solid darkred;
        box-shadow: 2px 2px 0px 0px darkred;
        border-radius: 8px;
    }

    .insetRed {
        box-shadow: inset 2px 2px 3px 1px darkred;
        border: 2px solid var(--coloritem);
        border-radius: 9px;
    }
    .langs {
        display: flex;
        gap: 10px;
        padding-left:8px;
        margin-bottom: 10px;
    }
    .themes {
        display: flex;
        gap: 10px;
        padding-left:8px;
    }
</style>
