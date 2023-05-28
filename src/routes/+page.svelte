<script>
    import { base } from "$app/paths";
</script>

<div class="container">
    <h1>
        Welcome to my website
        <img src="logooen.png" alt="peachy" />
    </h1>
    <br />
    <br />
    <br />
    <div class="someting">
        <!-- height="100"
        width="100" -->
        <iframe
            title="welcomegif"
            allow="fullscreen"
            frameBorder="0"
            src="https://giphy.com/embed/u2wg2uXJbHzkXkPphr/video"
        />
    </div>
    <br />
    <!-- <p> -->
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem dicta
        fugit nobis natus optio inventore veniam distinctio fuga labore
        assumenda provident tenetur laborum odit necessitatibus, exercitationem
        maiores. Iste, esse quaerat!
    <!-- </p> -->
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        /* padding: 10px; */
        /* background-color:var(--colorprimary); */
        /* min-height:100vh; */
    }
    .someting{
        /* display: flex; */
    }
    iframe {
        /* width: 50vw; */
    }
    h1 {
        display: inline;
    }
    img {
        display: inline;
    }
</style>
