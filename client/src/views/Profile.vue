<script setup lang="ts">
import { onMounted } from "vue"

// import Info from "../components/Info.vue";
import TopHeader from "../components/TopHeader.vue";
import GameLauncher from "../components/GameLauncher.vue";
import ChatMessage from "../components/ChatMessage.vue";
import SocketUser from "../components/SocketUser.vue";
import AcitveUsers from "../components/AcitveUsers.vue";

import { useEditorStore } from "../store/editorStore.ts";

var store = useEditorStore();

// getGameList
onMounted(function () {
  store.fetchGameFromDatabase();
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
              <AcitveUsers text="Friends Online" :lobby="false" />
              <ChatMessage  class="item"/>
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
