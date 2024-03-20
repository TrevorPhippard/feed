<script setup lang="ts">
import { useGameStore } from '../store/gameStore.ts';
import { storeToRefs } from 'pinia';

const gameStore = useGameStore();
const { getRoom: roomId ,

    gameData: gameData
} = storeToRefs(gameStore)

</script>

<template>
  <div class="container">
    <div class="card">
        <h1>test: {{ gameData }}</h1>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100vw;
}


</style>
