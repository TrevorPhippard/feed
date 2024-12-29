<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import draggable from "vuedraggable";

import { useEditorStore } from "../store/editorStore.ts";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import trash from "../assets/trash.svg";
import playCircle from "../assets/play-circle.svg";
import plusCircle from "../assets/plus-circle.svg";

import edit from "../assets/edit.svg";

const router = useRouter();
const store = useEditorStore();

const { getGameList: gameList } = storeToRefs(store);

defineProps({
  itemsContent: Array,
});


function addGame() {
  store.createNewGame();
  router.push({ path: "/editor" })
}

function launchGame(index: number) {
  store.fetchGameById(index);
  router.push({ path: `/game/${index}` });
}

function goToEdit(index: number) {
    store.fetchGameById(index);
    router.push({ path: "/editor" });
}

function deleteGame(index: number) {
  store.deleteGameFromDatabase(index);
}

</script>
<template>
  <div class="game-list">
    <div  v-if="Boolean(gameList.length == 0)">
      <p> No Quizes</p>
    </div>
    <div v-else v-for="(info, key) in gameList" :key="key">
      <p>{{ info.gameName ? info.gameName :'unnamed' }}</p>
      <ul>
        <li><img :src="playCircle"  alt="" @click="launchGame(info.id)" /></li>
        <li><img :src="edit"        alt="" @click="goToEdit(info.id)" /></li>
        <li><img :src="trash"       alt="" @click="deleteGame(info.id)" /></li>
      </ul>
    </div>
  </div>
  <button class="newBtn" @click="addGame">Create Quiz <img :src="plusCircle" alt=""></button>
</template>
<style scoped>

.newBtn{
  align-items: center;
  display: flex;
  padding:2px 6px;
}

.newBtn img{
  margin-left: 10px;
  width: 14px;
}

.game-list {
  list-style: none;
  padding-left: 0px;
}

.game-list div {
  background-color: var(--accent-bg);
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px 10px;
}

.game-list div ul {
  display: flex;
}

.game-list div ul li {
  padding: 8px 10px;
  cursor: pointer;
}

.game-list div ul li:hover{
  background-color:  var(--accent1);
  /* var(--accent-bg); */
}

.game-list div ul li img{
  width: 20px;
}

.game-list div ul li button {
  padding: 2px 10px;
  border-radius: 2px;
}
</style>
