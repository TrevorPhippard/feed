<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../../store/gameStore.ts';

const gameStore = useGameStore();

var props = defineProps({ data: Object })

const answer = computed(() => {
    return props.data.options.filter(item => item.correct)[0].choice
})

function onOptionClick() {
    gameStore.setSlideStatus('question');

    // test test test
}
</script>
<template>
    <div>
        <h2>{{ answer }}</h2>
        <button @click="onOptionClick">Next Question</button>
    </div>
</template>
<style scoped>
h2 {
    color: rgb(255, 235, 154);
    font-weight: bold;
    font-size: 2em;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, .5);
}
</style>