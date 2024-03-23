<script setup lang="ts">
import { ref, onMounted } from 'vue';

const selected = ref(null);
const countDown = ref(15);
// const showAnswer = ref(false);

defineProps({ data: Object })
const emit = defineEmits(['times-up'])

function onOptionClick(num: number) {
    selected.value = num;
}

onMounted(() => {
    setInterval(() => {
        if (countDown.value > 1) {
            countDown.value -= 1;
        } else {
            countDown.value = 0;
            // showAnswer.value = true;
            emit('times-up', 'answer')
        }
    }, 1000);
})

</script>

<template>
    <div class="imagecontainer" v-if="data" v-bind:style="{ backgroundImage: `url(${data.bgImg}) ` }">
        <h1 v-if="countDown">{{ countDown }}</h1>
        <h2>{{ data.question }}</h2>
        <ul>
            <li :class="{ 'selected': selected === index }" @click="onOptionClick(index)"
                v-for="( option, index) in data.options">
                {{ index + 1 }}) {{ option.choice }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.imagecontainer h1 {
    color: #fff;
    font-size: 119px;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, .5);
}

.imagecontainer h2 {
    font-size: 32px;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, .5);
    color: #fff;
}

.imagecontainer {
    position: relative;
    border: 1px solid;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: bottom;
    height: 100%;
    width: 100%;
    padding: 20px;
}

ul {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: wrap;
    bottom: 0px;
    width: 100%;
}

li {
    list-style: none;
    width: 30%;
    margin: 10px;
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
}

li.selected {
    border: 2px solid var(--accent1-hover);
}

li:hover {
    background-color: #ccc;
}
</style>
