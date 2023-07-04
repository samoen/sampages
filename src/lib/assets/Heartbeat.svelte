<script lang="ts">
    let size1 = 32;
    let size2 = Math.floor(size1 * (24/32));
    
    export let scl = 1.0;
</script>

<div 
class="cont"
style:--size="{size1}px"
style:--othersize="-{size2}px"
style:transform="scale({scl})"
>
    <div class="lds-heart">
        <div></div>
    </div>

</div>


<style>
    .cont{
        /* background-color: aqua; */
        padding:15px;
        padding-inline:25px;
        padding-top:39px;
        /* width: 100%; */
        /* height:auto; */
        /* width:auto; */
        /* display: inline-flex; */
        /* justify-content: center; */
        /* align-items: center; */
        /* position: relative; */
        /* padding:40px; */
        /* transform: scale(scl); */
    }

 

    .lds-heart {
        /* position: absolute; */
        /* inset:0; */
        /* margin-left: auto; */
        /* margin-right:auto; */
        /* display: block; */
        /* position: relative; */

        /* width: 32px; */
        /* height: 32px; */
        /* background-color: blueviolet; */
        transform: rotate(45deg);
        /* transform-origin: 0px 60px; */
    }
    .lds-heart div {
        /* top: 32px; */
        /* left: 32px; */
        /* position: absolute; */
        width: var(--size);
        height: var(--size);
        /* height:32px; */
        /* width:32px; */
        background: red;
        animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .lds-heart div:after,
    .lds-heart div:before {
        content: " ";
        position: absolute;
        display: block;
        width: var(--size);
        height: var(--size);
        /* height:32px; */
        /* width:32px; */
        background: red;
    }
    .lds-heart div:before {
        left: var(--othersize);
        /* left: -24px; */
        border-radius: 50% 0 0 50%;
    }
    .lds-heart div:after {
        top: var(--othersize);
        /* top: -24px; */
        border-radius: 50% 50% 0 0;
    }
    @keyframes lds-heart {
        0% {
            transform: scale(0.95);
        }
        15% {
            transform: scale(1.2);
        }
        39% {
            transform: scale(0.85);
        }
        45% {
            transform: scale(1);
        }
        60% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(0.95);
        }
    }
</style>
