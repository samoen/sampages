<script lang="ts">
    import perth from "$lib/assets/perth.jpg";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";

    import Profile from "$lib/components/Profile.svelte";

    // let dum:HTMLElement;
    onMount(() => {
        console.log("about mounted");
        // setTimeout(()=>{
        //     window.scrollTo(0,1)

        // },500)
        // dum?.scrollIntoView();
    });
</script>

<!-- <div bind:this={dum} class="dum"></div> -->
<div class="cont">
    <h1>About</h1>
    <p>Made with &hearts; by Sam Oen</p>
    <div class="mugTextOuter">
        <Profile></Profile>
    </div>
    <div class="imgwithtext brutal-border">
        <div class="myimgcont">
            <img
                class="myimg"
                height="500"
                width="500"
                src="{perth}"
                alt="perth"
            />
        </div>
        <div class="cardtxt">
            <p class="cardp">
                Living in the vibrant city of Perth, Sam draws
                inspiration from its dynamic atmosphere and the beauty
                of Western Australia's surroundings.
            </p>
        </div>
    </div>
</div>

<style>
    .cont {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 5rem;
        /* background-color: aqua; */
        --textwidth: 300px;
        --maximagewidth: 600px;
        /* container: conty / inline-size; */
    }
    .mugTextOuter {
        margin-top:30px;
        max-width: 900px;
        margin-inline:auto;
    }

    .cont > p {
        display: block;
        margin-inline: auto;
        max-width: 900px;
    }
    .cont > h1 {
        display: block;
        /* background-color: blue; */
        max-width: 900px;
        /* width: clamp(0px,100%,600px); */

        margin-inline: auto;
    }
    /* .cont > * + * {
        margin-top: 1rem;
    } */

    .imgwithtext {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--colorsecondary);
    }

    @media only screen and (min-width: 600px) {
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
    /* @container conty (max-width: 600px) { */
    @media only screen and (max-width: 599px) {
        .myimg {
            display: block;
            max-height: 100px;
            width: clamp(0px, 100%, 600px);
            margin-inline: auto;
            object-fit: cover;
        }

        .cardtxt {
            margin-top: 1em;
            margin-inline: auto;
            text-align: center;
        }
    }
</style>
