<script setup lang="ts">
import { onMounted } from "vue"

// import Info from "../components/Info.vue";
import TopHeader from "../components/TopHeader.vue";
import GameLauncher from "../components/GameLauncher.vue";
// import ChatMessage from "../components/ChatMessage.vue";
import SocketUser from "../components/SocketUser.vue";

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

            <br/>
            <h3><span class="icons" id="icon-contacts">&#9814;</span>Friends Online:</h3>
            <!-- <ChatMessage /> -->
            <ul>
              <SocketUser :online="false" :username="'client side test offline'"/>
              <SocketUser :online="true" :username="'client side test online'"/>
            </ul>
          </div>
    </div>
  </main>
</template>

<style scoped>
  h3{
    margin-bottom:10px ;
  }
</style>
