<script lang="ts">
    import gamesprites from "$lib/assets/gamesprites.png";
    import { wscrollY } from "$lib/stores";

    let rot = 0
    let base = 0
    let tout : number | undefined = undefined
    let transition = 'none'
    wscrollY.subscribe((value)=>{
        if(tout){
            clearTimeout(tout)
        }
        rot = (value - base)
        transition = 'none'
        // rot = Math.min(4*(oldScroll - value),40)
        // if(value > oldScroll){
        //     rot = 10;
        // }else{
        //     rot = -10
        // }
        tout = setTimeout(()=>{
            if(value - base == rot){
                rot = 0
                transition = 'transform 0.4s'
                base = value
            }
            // setTimeout(()=>{

            // })
        },200)
        // oldScroll = value
    })
</script>

<div 
class="wrapper brutal-border"
style:transform="translateZ(-500px) perspective(1800px) rotateX({(rot * 0.5) % 360}deg)"
style:transition={transition}
>
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
        align-items: center;
        justify-content: center;
        background-color: var(--colorsecondary);
        z-index: -999;
        /* height:200px; */
        /* gap:40px; */
        /* background-color: blue; */
        /* justify-content:center; */
        /* align-items: stretch; */
        /* max-width: 200px; */
        transform-style: preserve-3d;
        
        /* transform-origin: top; */
        /* transform: perspective(400px) rotateX(10deg); */
        /* transition: transform 0.2s; */
        
    }
    .left{
        position: relative;
        flex-grow: 1;
        flex-basis: 0px;
        flex-shrink: 1;
        min-width: 5px;
        min-height: 5px;
        align-self: stretch;
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
        flex-grow: 0;
        flex-basis: auto;
        flex-shrink: 1;
        padding-block:15px;
        padding-right:15px;
    }
    .text > span {
    /* background-color: aqua; */
    }
</style>
