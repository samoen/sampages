<script lang="ts">
    import pachnor from "$lib/assets/pachnor.png";
    import squig from "$lib/assets/squig.png";
    import xbig from "$lib/assets/xbig.png";

</script>

<div class="container">
    <div class="splash" style="background-image:url({xbig});">
        <h1>
            Welcome to my website
            <img width=70 height=20 src="{pachnor}" alt="peachy" />
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
            <img class="normalimg" width="400" height=200 src="{squig}" alt="a squiggle">
    </div>
    <br />
</div>
<style>
    .container {
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: flex-start; */
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
