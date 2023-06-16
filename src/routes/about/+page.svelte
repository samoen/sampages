<script>
    import biggy from "$lib/assets/biggy.png";
    import Footer from "$lib/components/Footer.svelte";
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
    <br/>
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
    <!-- <div class="foothold">
        <Footer></Footer>
    </div> -->
</div>

<!-- {:else} -->
<!-- <div class="hi"> -->
<!-- <Heartbeat /> -->
<!-- </div> -->
<!-- </div> -->

<style>
    p{
        display: block;
        margin-inline:auto;
        max-width: 120ch;
    }
    /* .cont > * + * {
        margin-top: 1rem;
    } */

    .cont {
        padding-left: 10px;
        margin:0;
        /* padding-left: calc(var(--sidebarwidth) + 20px); */
        padding-right: 1rem;
        padding-top:5rem;
        /* background-image: linear-gradient(to right,red, yellow); */
        /* min-height: 100vh; */
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


    @container conty (min-width: 600px) {
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
    @container conty (max-width: 600px) {
        .myimgcont {
            /* text-align: center; */
        }
        .myimg {
            display:block;
            /* max-width: 300px; */
            max-height:100px;
            width: clamp(0px,100%,600px);
            margin-inline:auto;
            object-fit:cover;
        }

        .cardtxt {
            margin-top:1em;
            margin-inline: auto;
            text-align: center;
        }
    }
</style>
