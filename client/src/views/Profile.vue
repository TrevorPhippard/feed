<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "../store/editorStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import TopHeader from "../components/TopHeader.vue";
import GameLauncher from "../components/GameLauncher.vue";
import ChatMessage from "../components/ChatMessage.vue";
import AcitveUsers from "../components/AcitveUsers.vue";

// import Info from "../components/Info.vue";
// import SocketUser from "../components/SocketUser.vue";

const gameStore = useGameStore();
const editorStore  = useEditorStore();

const { getActiveRoom: room_id } = storeToRefs(gameStore);

// getGameList
onMounted(function () {
  editorStore .fetchGameFromDatabase();
})
</script>

<template>
  <main>
    <div class="flex">
        <div class="card-box">
            <TopHeader/>
            <h3><span class="icons" id="icon-contacts">&#9731;</span>Quizes</h3>
            <GameLauncher />
            <div class="community">
              {{ room_id }}
              <AcitveUsers text="Friends Online" :lobby="false" :room="room_id" />
              <!-- <ChatMessage  class="item"/> -->
            </div>
        </div>
    </div>
  </main>
</template>

<style scoped>
  h3{
    margin-bottom:10px;
  }

  .community{
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex: 1 1 0px;
  }


  .item {
  flex-grow: 4; /* default 0 */
  margin-left:20px;
}
</style>
