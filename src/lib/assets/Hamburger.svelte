<script>
    export let scale = false
    export let gone = true
    $: fillColor = gone ? 'transparent' : 'var(--colortext)'
</script>

<!-- <div> -->
<svg 
class:lil-shrink="{scale}" 
style:--fill-color="{fillColor}"
viewBox="0 0 24 24"
    ><rect
        width="24"
        height="24"
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
        scale: 0.8;
    }
    path {
        stroke: var(--fill-color);
        fill: var(--fill-color);
        transition: fill 1s ease-in, stroke 1s ease-in;
    }
    svg {
        width: 48px;
        height: 42px;
        margin-top:3px;
    }
</style>
