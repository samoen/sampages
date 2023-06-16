<script lang="ts">
    import pachnor from "$lib/assets/pachnor.png";
    import wavy from "$lib/assets/wavy.png";
    import wavydark from "$lib/assets/wavydark.png";
    import xbig from "$lib/assets/xbig.png";
    import gamesprites from "$lib/assets/gamesprites.png";
    import Footer from "$lib/components/Footer.svelte";
    import { themeMode, themes } from "$lib/stores";

    $: splashimg = $themeMode == themes.dark ? wavydark : wavy

</script>

<div class="container">
    <div class="splash" style="background-image:url({splashimg});">
        <h1>
            <!-- <img width=70 height=40 src="{pachnor}" alt="peachy" /> -->
            Welcome to my website
        </h1>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta
            fugit nobis natus optio inventore veniam distinctio fuga labore
            assumenda provident tenetur laborum odit necessitatibus, exercitationem
            maiores. Iste, esse quaerat!
        </p>
        
    </div>
    <br />
    <br />
    <br />
            <img class="normalimg" width="400" height=200 src="{gamesprites}" alt="a squiggle">
    <br />
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta
        fugit nobis natus optio inventore veniam distinctio fuga labore
        assumenda provident tenetur laborum odit necessitatibus, exercitationem
        maiores. Iste, esse quaerat!
    </p>
    <br />
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta
        fugit nobis natus optio inventore veniam distinctio fuga labore
        assumenda provident tenetur laborum odit necessitatibus, exercitationem
        maiores. Iste, esse quaerat!
    </p>
    <!-- <Footer></Footer> -->
</div>
<style>
    .container p, h1 {
        margin-top: 1em;
        /* background-color: blueviolet; */
        /* border: none; */
        /* box-sizing: content-box; */
        max-width: clamp(0px, 80vw, 700px);
        /* text-align: center; */
        margin-inline: auto;
    }
    .splash{
        padding-left: 10px;
        padding-top: 40px;
        padding-bottom: 40px;
        margin-right: 25px;
        margin-left:20px;
        margin-top: 6px;
        background-repeat: no-repeat;
        background-size:cover;
        background-attachment:local;
        border-radius: 9px;
        border: 2px solid var(--colorshadow);
        box-shadow: 2px 2px 1px 0px var(--colorshadow);
    }

    p{
        display:block;
    }
    
    h1 {
        display: block;
        /* text-align: center; */

    }
    
    .normalimg{
        display: block;
        margin-inline: auto;
        height: auto;
        width: clamp(200px, 60%, 500px);
        object-fit: cover;
        border-radius: 13px;
    }
</style>
