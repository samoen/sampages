<script>
    import gamesprites from "$lib/assets/gamesprites.png";
</script>

<div class="wrapper brutal-border">
    <div class="left">
        <div class="img-wrap">
            <!-- width="400" -->
            <!-- height="200" -->
            <img
                class="img"
                src="{gamesprites}"
                alt="a squiggle"
            />
            <div class="grad">
                
            </div>
        </div>

    </div>
    <div class="right">
        <slot></slot>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        background-color: var(--colorsecondary);
        /* height:200px; */
        /* gap:40px; */
        /* background-color: blue; */
        /* justify-content:center; */
        /* align-items: stretch; */
        /* max-width: 200px; */
    }
    .left{
        position: relative;
        flex-grow: 1;
        flex-basis: 0px;
        flex-shrink: 0;
        
        /* align-self: stretch; */
    }
    .img-wrap {
        display: grid;
        /* justify-items: stretch; */
        /* align-items: stretch; */
        /* background-color: yellow; */
        height:100%;
        width:100%;
        /* overflow: hidden; */
        /* grid-template-columns: 100%; */
        /* grid-template-rows: 100%; */
    }
    
    .grad {
        /* fill: linear-gradient(transparent, yellow); */
        background-image: linear-gradient(90deg, transparent, transparent, var(--colorsecondary));
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        height:100%;
        width: 100%;
        z-index: 0;
    }
    
    img {
        position: absolute;
        top:0px;
        bottom:0px;
        left:0px;
        right:0px;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        object-fit: cover;
        /* overflow: hidden; */
        object-position: center;
        height: 100%;
        width: 100%;
        min-height: 0px;
        border-radius: 9px;
    }
    .right {
        flex-grow: 1;
        flex-basis: 0;
        /* background-color: brown; */
        display: flex;
        flex-direction: column;
        padding-block:15px;
        padding-right:15px;
        padding-left:5px;
        /* justify-content: center; */
        /* text-align: center; */
        min-width: 50px;
        max-width: 200px;
    }
    .text > span {
    /* background-color: aqua; */
    }
</style>
