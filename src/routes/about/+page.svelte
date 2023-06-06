<script>
    import biggy from "$lib/assets/biggy.png";
    import { onMount } from "svelte";

    // onMount(() => {});
</script>

<div class="cont">
    <h1>About</h1>
    <p>Made with &hearts; by Sam Oen</p>
    <div class="imgwithtext">
        <div class="myimgcont">
            <img
                class="myimg"
                height="500"
                width="500"
                src={biggy}
                alt="bigish"
            />
        </div>
        <div class="cardtxt">
            <p class="cardp">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
                vitae facere. Magni repudiandae consequuntur rem autem eaque
                asperiores amet odit distinctio alias delectus nam
                reprehenderit, eos inventore corporis suscipit molestias.
            </p>
        </div>
    </div>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, vitae
        facere. Magni repudiandae consequuntur rem autem eaque asperiores amet
        odit distinctio alias delectus nam reprehenderit, eos inventore corporis
        suscipit molestias.
    </p>
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, vitae
        facere. Magni repudiandae consequuntur rem autem eaque asperiores amet
        odit distinctio alias delectus nam reprehenderit, eos inventore corporis
        suscipit molestias.        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, vitae
        facere. Magni repudiandae consequuntur rem autem eaque asperiores amet
        odit distinctio alias delectus nam reprehenderit, eos inventore corporis
        suscipit molestias.        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, vitae
        facere. Magni repudiandae consequuntur rem autem eaque asperiores amet
        odit distinctio alias delectus nam reprehenderit, eos inventore corporis
    </p>
</div>

<!-- {:else} -->
<!-- <div class="hi"> -->
<!-- <Heartbeat /> -->
<!-- </div> -->
<!-- </div> -->

<style>
    h1{
        /* margin-top:3rem */
    }
    .cont > * + * {
        margin-top: 1rem;
    }

    .cont {
        padding: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top:5rem;
        background-image: linear-gradient(to right,red, yellow);
        --textwidth: 300px;
        --maximagewidth: 600px;
        container: conty / inline-size;
    }
    .imgwithtext {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--colorsecondary);
    }


    @container conty (width >= 600px) {
        .imgwithtext {
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: center;
            gap: 1rem;
            max-width: calc(var(--textwidth) + var(--maximagewidth));
        }
        .myimgcont {
            flex: 1 1 auto;
            position: relative;
            align-self: stretch;
            max-width: var(--maximagewidth);
        }

        .myimg {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .cardtxt {
            width: var(--textwidth);
        }
    }
    @container conty (width < 600px) {
        .myimgcont {
            text-align: center;
        }
        .myimg {
            max-width: 100%;
            height: auto;
        }

        .cardtxt {
            margin: auto;
            text-align: center;
        }
    }
</style>
