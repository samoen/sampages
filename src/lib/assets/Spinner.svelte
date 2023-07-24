    <div class="lds-ring"><div></div><div></div><div></div></div>
<style>
       .lds-ring {
  display: flex;
  /* position: relative; */
        /* background-color: aqua; */
        /* margin-left: 4px; */
  width: 60%;
  height: 60%;
  align-items:flex-end;
  justify-content: center;
  margin-left: 4px;
}
.lds-ring div {
  box-sizing: border-box;
  /* display: block; */
  /* position: absolute; */

  width: 10%;
  height: 30%;
  /* background-color: bisque; */
  border: 4px dashed white;
  border-radius: 30%;
  animation: lds-ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite both;
  border-color: black transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0%{
    transform: rotate(0deg) translateX(4px) translateY(5px);

  }
  20% {
    transform: rotate(0deg);
    /* translate: 0px 0px; */
  }
  70%,100% {
    transform: rotate(270deg) translateX(-5px) translateY(5px);
    /* translate: 6px 5px; */
  }
}
</style>