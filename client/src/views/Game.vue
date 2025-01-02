<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useGameStore } from "../store/gameStore.ts";
import { storeToRefs } from "pinia";
import GameSlide from "../components/GameSlide.vue"
import { useEditorStore } from "../store/editorStore.ts";
import AcitveUsers from "../components/AcitveUsers.vue"
import {useRoute} from "vue-router";

const store = useEditorStore();
const gameStore = useGameStore();
const route = useRoute();
const { getRoom: room_id } = storeToRefs(gameStore);

const {
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

const started = ref(false);

onMounted(function () {
  gameStore.setGame(route.params.id);
})

</script>

<template>   

  <div v-if="!started" class="card-box">
    <h1>Lobby: {{ $route.params.id }}</h1>
    <AcitveUsers text="Friends Online" :lobby="true"/>
    <hr/>
    <br/>
    <AcitveUsers text="Accepted Players" :lobby="false"/>

    <button>Start Game</button>
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
