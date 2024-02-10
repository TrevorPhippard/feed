<script setup lang="ts">
// @ts-ignore
import draggable from 'vuedraggable';
import { ref } from 'vue';
import { useEditorStore } from '../store/editorStore.ts';

var store = useEditorStore();

defineProps({
    itemsContent: Array,
})

const games = ref([
    { gameName: 'weirdTrivia' },
    { gameName: 'musicTrivia' },
    { gameName: 'animeTrivia' },
    { gameName: 'superheroTrivia' },
    { gameName: 'historyTrivia' }

]);


function selectGame() {
    store
}

function launch() {
    console.log('add')
}

function edit() {
    console.log('edit')
}

</script>
<template>
    <ul class="game-list">
        <li v-for="(info, key, index) in games" :key="key" @mouseup="selectGame(index)" @keyup.enter="launch">
            {{ info.gameName }}
            <span>
                <button @click="edit">edit</button>
                <button @click="launch">Launch</button>
            </span>
        </li>
    </ul>
</template>
<style>
.game-list {
    list-style: none;
    padding-left: 0px;
}

.game-list li {
    background-color: rgba(40, 40, 40, 1);
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

