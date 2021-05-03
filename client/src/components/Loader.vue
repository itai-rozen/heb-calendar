<template>
  <div class="loader">
  <p class="animation">ן</p>
  <p class="animation">ע</p>
  <p class="animation">ו</p>
  <p class="animation">ט</p>
  </div>
</template>

<script>
export default {
name:"Loader"
}
</script>

<style >

@keyframes hover {
  0% {
    transform: scale(.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }

  20% {
    transform: scale(1);
    color: pink;
    -webkit-text-stroke: 3px red;
    filter: drop-shadow(0 0 1px black)drop-shadow(0 0 1px black)drop-shadow(0 0 3px red)drop-shadow(0 0 5px red)hue-rotate(10turn);
  }

  50% {
    transform: scale(.5);
    color: #121212;
    -webkit-text-stroke: 2px gray;
  }
}

.loader > *{
    margin:0;
}

.loader {
  --effect: hover 1s linear infinite;
  display: flex;
  width: 100vw;
  z-index: 2;
  /* height: 100vh; */
  /* background: black; */
  align-items: center;
  justify-content: center;
}


.animation{
  display: inline-block;
  text-transform: uppercase;
  text-align: center;
  font-size: 4em;
  font-family: arial;
  font-weight: 600;
  transform: scale(.5);
  color: #121212;
  -webkit-text-stroke: 2px gray;
}

.animation:nth-child(4) {
  animation: var(--effect) ;
}

.animation:nth-child(3) {
  animation: var(--effect) .125s;
}

.animation:nth-child(2) {
  animation: var(--effect) .25s;
}

.animation:nth-child(1) {
  animation: var(--effect) .375s;
}

@media screen and (max-width:830px){
  .animation {
    font-size: 2em;
  }
}

</style>