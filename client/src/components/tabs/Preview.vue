<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia";
import { useEditorStore } from "../../store/editorStore.ts";

const store = useEditorStore();
const {
    editorSlides: slides,
    editorCurrentSlides: currentSlide

} = storeToRefs(store);

const slideNum = ref(0);

function onOptionClick(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target.dataset.answer)
}
function forward(){
    if(slideNum.value < (slides.value.length-1)){
        slideNum.value = slideNum.value +1;
    }
    store.onSlideAction(slideNum.value)
}
function rewind(){
    if(slideNum.value>0){
        slideNum.value = slideNum.value -1;
    }
    store.onSlideAction(slideNum.value)
}

</script>

<template>
    <h3>Slide: {{(slideNum+1) +' of '+ slides.length}}</h3>
    <div class="imagecontainer" v-if="currentSlide" v-bind:style="{
        backgroundImage: `url(${currentSlide.bgImg}) `,
    }">
        <h2>{{ currentSlide.question }}</h2>
        <ul>
            <li :class="{ 'answer-correct': option.correct }" @click="onOptionClick" :data-answer="option"
                v-for="( option, index) in currentSlide.options">
                {{ index + 1 }}) {{ option.choice }}
            </li>
        </ul>
    </div>
    <button v-if="slides.length > 1 && slideNum" @click="rewind">Rewind</button>
    <button v-if="slides.length > 1 && slideNum < (slides.length-1)" @click="forward">Forward</button>
</template>

<style scoped>
.imagecontainer{
    min-height:400px;
    margin-bottom:20px;
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

li.answer-correct {
    background-color: #c2ffbd;
}


li:hover {
    background-color: #ccc;
}
</style>
