<script>
    export let size = 1.0
    export let lilShrink = false
    export let gone = true
    export let padding = 0
    $: fillColor = gone ? 'transparent' : 'var(--colortext)'
    $: adjWidth = 48 * size
    $: adjHeight = 42 * size
</script>

<!-- <div> -->
<svg 
class:lil-shrink="{lilShrink}" 
style:--fill-color="{fillColor}"
style:--adj-width="{adjWidth}px"
style:--adj-height="{adjHeight}px"
style:--pad="{padding}px"
height="24"
width="24"
viewBox="3 8 18 8"
    >
    <!-- width="24" -->
    <!-- height="24" -->
    <rect
        stroke="none"
        fill="#003020"
        opacity="0"></rect>
    <g transform="matrix(0.83 0 0 0.83 12 12)">
        <g style="">
            <g transform="matrix(1 0 0 1 0 -5)">
                <path
                    style=" stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-12, -7)"
                    d="M 21 7 L 3 7"
                    stroke-linecap="round"></path>
            </g>
            <g transform="matrix(1 0 0 1 0 0)">
                <path
                    style="stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-12, -12)"
                    d="M 21 12 L 3 12"
                    stroke-linecap="round"></path>
            </g>
            <g transform="matrix(1 0 0 1 0 5)">
                <path
                    style="stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;"
                    transform=" translate(-12, -17)"
                    d="M 21 17 L 3 17"
                    stroke-linecap="round"></path>
            </g>
        </g>
    </g>
</svg>

<!-- </div> -->

<style>
    .lil-shrink {
        scale: 0.9;
    }
    path {
        stroke: var(--fill-color);
        fill: var(--fill-color);
        transition: fill 1s ease-in, stroke 1s ease-in;
    }
    svg {
        height: var(--adj-height);
        width: var(--adj-width);
        padding:var(--pad);
        /* background-color: aqua; */
        /* margin-top:3px; */

    }
</style>
