<script lang='ts'>
    import biggy from "$lib/assets/biggy.png";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";

    // let dum:HTMLElement;
    onMount(() => {
        console.log('about mounted')
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
    <div class="imgwithtext brutal-border">
        <div class="myimgcont">
            <img
                class="myimg"
                height="500"
                width="500"
                src="{biggy}"
                alt="bigish"
            />
        </div>
        <div class="cardtxt">
            <p class="cardp">
                Sam Oen is a software engineer based in Perth, Western
                Australia. When he's not immersed in lines of code,
                you can find him on the the sports field or wandering in
                nature with his partner Ashleigh.
            </p>
        </div>
    </div>
    <p>
        Living in the vibrant city of Perth, Sam draws inspiration
        from its dynamic atmosphere and the beauty of Western
        Australia's surroundings.
    </p>
    <p>
        With a solid foundation in software engineering principles and
        a genuine passion for his work, Sam continues to push
        boundaries and explore new horizons in the ever-evolving world
        of technology. Sam's energy and enthusiasm are contagious,
        making him an exceptional software engineer with a zest for
        life.
    </p>
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
    .cont > p {
        display: block;
        margin-inline: auto;
        max-width: 120rch;
        margin-bottom: 1rem;
    }
    .cont > h1 {
        display: block;
        /* background-color: blue; */
        max-width: 120rch;
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
