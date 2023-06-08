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
            Welcome to my website
            <img width=70 height=40 src="{pachnor}" alt="peachy" />
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
    <div class="someting">
            <img class="normalimg" width="400" height=200 src="{gamesprites}" alt="a squiggle">
    </div>
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
    .container {
        /* background-color: blueviolet; */
    }
    .splash{
        padding-top: 100px;
        padding-bottom: 100px;
        background-repeat: no-repeat;
        background-size:cover;
        background-attachment:local;
    }

    h1 {
    }
    .someting{
        text-align: center;
    }
    h1 {
        display: inline;
    }
    .normalimg{
        height: auto;
        width: 60%;
    }
</style>
