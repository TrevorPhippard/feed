<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Socket from '../components/game/Socket.vue';
import { useSlideStore } from '../store/slideStore.ts';
import { useGameStore } from '../store/gameStore.ts';

import GameAnswerSlide from './../components/game/GameAnswerSlide.vue';
import GameQuestionSlide from '../components/game/GameQuestionSlide.vue';

var slideStore = useSlideStore();
var gameStore = useGameStore();

const { getCurrentSlide: currentSlide } = storeToRefs(slideStore);
const { getGameStatus: gameStatus } = storeToRefs(gameStore);

slideStore.fetchGameById(1);
slideStore.fetchGameFromDatabase();

function updateGameName(status:string) {
  gameStore.setSlideStatus(status);
  // if(status=='answer'){
  //   slideStore.incrementSildes();
  // }
}

</script>

<template>
  <div class="container">
    <div class="game card">
      <GameAnswerSlide v-if="gameStatus == 'answer'" :data="currentSlide" />
      <GameQuestionSlide @times-up="updateGameName" v-if="gameStatus == 'question'" :data="currentSlide" />
    </div>
    <div class="chat card">
      <h3><span class="icons" id="icon-contacts">&#9990;</span>Chat</h3>
      <Socket />
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

.card {
  width: 100%;
}

.game {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: game;
  text-align: center;
  z-index: 1;
  background-color: rgb(134, 120, 154);
  padding: 0;
}

.game img {
  position: absolute;
}

.game .slide {
  position: relative;
}

.chat {
  grid-area: chat;
}
</style>
