<div class="cont">
    <div class="lds-heart">
        <div></div>
    </div>

</div>


<style>
    .cont{

    }

 

    .lds-heart {
        margin-left: auto;
        margin-right:auto;
        /* display: block; */
        /* position: relative; */
        /* width: 80px; */
        /* height: 80px; */
        transform: rotate(45deg);
        /* transform-origin: 0px 60px; */
    }
    .lds-heart div {
        /* top: 32px; */
        /* left: 32px; */
        /* position: absolute; */
        width: 32px;
        height: 32px;
        background: red;
        animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .lds-heart div:after,
    .lds-heart div:before {
        content: " ";
        position: absolute;
        display: block;
        width: 32px;
        height: 32px;
        background: red;
    }
    .lds-heart div:before {
        left: -24px;
        border-radius: 50% 0 0 50%;
    }
    .lds-heart div:after {
        top: -24px;
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
