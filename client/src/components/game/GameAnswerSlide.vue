<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia';

import { useSlideStore } from '../../store/slideStore.ts';
import { useGameStore } from '../../store/gameStore.ts';

var slideStore = useSlideStore();
var gameStore = useGameStore();


const {
    getSlideNum: slideNum,
    getSlideInex: slideIndex
} = storeToRefs(slideStore);


var props = defineProps({ data: Object })

const answer = computed(() => {
    return props.data.options.filter(item => item.correct)[0].choice
})

function onOptionClick() {
    gameStore.setSlideStatus('question');
    if(slideIndex.value <  (slideNum.value-1)){
        slideStore.incrementSildes();
    }else{
        console.log('done questiohs')
    }
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