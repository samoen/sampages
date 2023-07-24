<script lang="ts">
    import headshot from "$lib/assets/samsmaller.jpg";
</script>

<div class="cont">
    <div class="mugAndText brutal-border">
        <div class="mugHolder">
            <img
                class="headshot"
                src="{headshot}"
                alt="sam"
                height="100%"
                width="100%"
            />
            <div class="grad"></div>
        </div>
        <div class="mugText">
            <p>
                Sam Oen is a software engineer based in Perth, Western
                Australia.
            </p>
            <p>
                When he's not immersed in lines of code, you can find
                him on the the sports field or wandering in nature
                with his partner Ashleigh.
            </p>
            <p>
                With a solid foundation in software engineering
                principles and a genuine passion for his work, Sam strives to push boundaries
                in the ever-evolving world of technology. 
            </p>
        </div>
    </div>
</div>

<style>
    .cont {
        container: mugout / inline-size;
    }
    @container mugout (min-width: 600px) {
    .mugAndText {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        background-color: var(--colorsecondary);
    }
    .grad {
        background-image: linear-gradient(
            90deg,
            transparent 60%,
            var(--colorsecondary)
        );
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        height: 100%;
        width: 100%;
        z-index: 1;
    }
    .mugHolder {
        position: relative;
        align-self: stretch;
        flex-shrink: 1;
        /* flex-grow: 1; */
        flex-basis: 300px;
        max-width: 500px;
        display: grid;
        min-height: 230px;
        /* height: 100%; */
        background-color: blue;
    }
    .headshot {
        position: absolute;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        object-fit: cover;
        object-position: 0% 35%;
        width: 100%;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        /* max-height: 300px; */
    }
    .mugText {
        flex-basis: 40ch;
        flex-grow: 1;
        /* max-width: 60ch; */
        margin-inline: auto;
        padding: 15px;
    }
    }
    @container mugout (max-width: 599px) {
        .mugText > p {
            text-wrap: balance;
        }
        .mugAndText {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--colorsecondary);
            /* gap:10px; */
            /* padding:10px; */
        }
        .grad {
            /* fill: linear-gradient(transparent, yellow); */
            background-image: linear-gradient(
                transparent 60%,
                var(--colorsecondary)
            );
            grid-row: 1 / 1;
            grid-column: 1 / 1;
            height: 100%;
            width: 100%;
            z-index: 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .headshot {
            grid-row: 1 / 1;
            grid-column: 1 / 1;
            object-fit: cover;
            object-position: 0% 35%;
            width: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            max-height: 300px;
        }
        /* } */

        .mugHolder {
            display: grid;
            width: 100%;
        }

        .mugText {
            padding: 10px;
            text-align: center;
        }
    }
</style>
