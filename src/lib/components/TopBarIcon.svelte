<script lang="ts">
    import { showJsButtons } from "$lib/stores";
    import type { TopBarIconState } from "$lib/stores";

    export let push = () => {};
    export let state: TopBarIconState;
</script>

<button
    type="button"
    class:inset-brutal="{state.color == 'inset'}"
    class="baricon"
    class:transparent="{state.color == 'transparent'}"
    class:brutal-border="{state.color == 'solid'}"
    class:fadey="{state.transition == 'slow'}"
    class:gone="{!$showJsButtons}"
    on:click="{() => {
        push();
    }}"
    on:keydown
>
    <slot />
</button>

<style>
    .baricon {
        background-color: var(--colorpressed);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fadey {
        transition: background-color 400ms ease-in-out,
            border-color 400ms ease-in-out, stroke 400ms ease-in-out,
            box-shadow 400ms ease-in-out;
    }

    .transparent {
        background-color: transparent;
        border: 2px solid transparent;
        border-radius: 9px;
    }

    .gone {
        color: transparent;
    }
</style>
