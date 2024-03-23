<script setup lang="ts">
// @ts-ignore
import draggable from 'vuedraggable';
import { useSlideStore } from '../store/slideStore.ts';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
var store = useSlideStore();

const {
    getGameList: gameList,
    getSlideNum: slideNum
} = storeToRefs(store);

defineProps({ itemsContent: Array })

function addGame() {
    console.log(gameList.value.length)
    // router.push({ path: '/editor' })
}

function launchGame(index: number) {
    router.push({ path: `/game:${index}` })
}

function edit(index: number) {
    router.push({ path: '/editor' })
}

function deleteGame(index: number) {
    console.log('delete:', index)
}

</script>
<template>
    <ul class="game-list" v-if="gameList.length">
        <li v-for="(info, key) in gameList" :key="key">
            <p>{{ info.gameName }}</p>
            <p>{{ slideNum }} Questions</p>
            <span>
                <button @click="edit(info.id)">Edit</button>
                <button @click="launchGame(info.id)">Launch</button>
                <button @click="deleteGame(info.id)">Delete</button>
            </span>
        </li>
    </ul>
    <button @click="addGame">+</button>

</template>
<style>
.game-list {
    list-style: none;
    padding-left: 0px;
}

.game-list li {
    background-color: var(--accent-bg);
    min-width: 100px;
    padding: 8px 10px;
    border-radius: 3px;
    border: 1px solid #555;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game-list li+li {
    margin-top: 10px;
}

.game-list li button {
    padding: 2px 10px;
    border-radius: 2px;
}
</style>
