<script setup lang="ts">
import { onMounted } from "vue"
// import { useGameStore } from "../store/gameStore.ts";
import { storeToRefs } from "pinia";
import GameSlide from "../components/GameSlide.vue"
import { useEditorStore } from "../store/editorStore.ts";

var store = useEditorStore();



var store = useEditorStore();
const {
    editorName: gameName,
    editorSlides: slides,
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

var { name,type,question, options, bgImg }= currentSlide;

onMounted(function () {
  store.fetchGameFromDatabase();
})

</script>

<template>
  <div class="container">
    <div class="game card">
      <GameSlide :data="currentSlide"></GameSlide>
    </div>
    <div class="chat card">
      <h3><span class="icons" id="icon-contacts">&#9990;</span>Chat</h3>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 90vh;
  width: 100vw;
  display: grid; 
  grid-template-columns: 2fr 2fr 1fr; 
  grid-template-rows: 1fr 1.6fr 0.4fr; 
  gap: 10px 10px; 
  grid-template-areas: 
    "game game chat"
    "game game chat "
    "game game chat ";   

}
.card{
  width: 100%;
}
.game{
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: game;
  text-align: center;
  z-index: 1;
}
.game img{
  position: absolute;
}

.game .slide{
  position: relative;
}
.chat{
  grid-area: chat;
}

</style>
