<script lang="ts">
    import pachnor from "$lib/assets/pachnor.png";
    import wavy from "$lib/assets/wavy.png";
    import xbig from "$lib/assets/xbig.png";
    import gamesprites from "$lib/assets/gamesprites.png";

</script>

<div class="container">
    <div class="splash" style="background-image:url({wavy});">
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
</div>
<style>
    .container {

    }
    .splash{
        padding-top: 100px;
        padding-bottom: 100px;
        background-repeat: no-repeat;
        background-size:cover;
        background-attachment:local;
    }
    .splash > p, h1{
        color:black;
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
