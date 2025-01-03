<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useEditorStore } from "../store/editorStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import GameSlide from "../components/GameSlide.vue"
import AcitveUsers from "../components/AcitveUsers.vue"
import GameUsers from "../components/GameUsers.vue"

const editorStore = useEditorStore();
const gameStore = useGameStore();

const route = useRoute();

const {editorCurrentSlides: currentSlide} = storeToRefs(editorStore);
const { getActiveRoom: activeRoom, getGameRoom: gameRoom } = storeToRefs(gameStore);


const started = ref(false);

onMounted(function () {
  if(typeof route.params.id == "string" ){
    
      gameStore.setGame(route.params.id);
  }
})

</script>

<template>

  <div v-if="!started" class="card-box">
    <h1>Lobby: {{ $route.params.id }}</h1>
    <AcitveUsers text="Friends Online" :lobby="true"  :room="activeRoom"/>
    <hr/>
    <br/>
    <GameUsers text="Accepted Players" :lobby="false"  :room="gameRoom"/>

    <button>Start Game</button>
    <button>Quit Game</button>
  </div>

  <div v-if="started" class="game card card-box">
      <GameSlide :data="currentSlide"></GameSlide>
      <nav>
                <ul>
                    <li><button>backwards</button></li>
                    <li><button>skip</button></li>
                    <li><button>forward</button></li>
                </ul>
            </nav>
    </div>
</template>

<style scoped>
nav {
  display:block;
}
nav ul{
  display:flex;
  justify-content: space-around;
  padding-top:10px;
}

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
