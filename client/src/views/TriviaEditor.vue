<script setup lang="ts">
import Preview from '../components/Preview.vue'
import Sortable from '../components/Sortable.vue'
import CreateField from '../components/CreateField.vue'
import ImageUploader from '../components/ImageUploader.vue';
import { ref } from 'vue';

var serverLocation = "http://localhost:3000/images/";
var showSlide = ref(0)

var slides = ref([
    {
        name: 'slide1',
        type: 'checkbox',
        question: 'Q1:  Whose that wonderful girl, could she be any sweeter?',
        options: ['Nanalan', 'Sweet Pea', 'Mona', 'Russer', 'mr.woca'],
        bgImg: serverLocation + "img-0906.jpg"
    }, {
        name: 'slide2',
        type: 'checkbox',
        question: 'Q2:  what will we do with feefer?',
        options: ['Put in water', 'ask Russer', 'NANA!!!!', 'mr.woca?'],
        bgImg: serverLocation + "img-0906.jpg"
    },
])

var blankSlideInfo = {
    name: '',
    type: '',
    question: '',
    options: [],
    bgImg: "http://localhost:3000/images/img-0906.jpg"
}

function onSlideAction(id:number){
    console.log(id)
    showSlide.value =id;
}

function onSlideMove(id:number, id2:number){
    console.log(id,id2)
}

function onSlideAdd(){
    slides.value.push(blankSlideInfo)
}

function onSlideRemove(index:number){
    slides.value.splice(index, 1);
}

function onSlideEdit(index:number, text:string){
    slides.value[index].name = text;
}

</script>

<template>
    <div class="dashboard">

        <div class="div1">
            <div class="card">
                <Sortable
                @slide-action="onSlideAction"  
                @slide-move="onSlideMove"
                @slide-add="onSlideAdd"
                @slide-remove="onSlideRemove"
                @slide-edit="onSlideEdit"
                :itemsContent="slides"
                ></Sortable>
            </div>
            <div class="card">
                <CreateField class="div2"></CreateField>
                <ImageUploader />
            </div>
        </div>
        <div  class="div2">
            <div class="card">
                <Preview :data="slides[showSlide]"></Preview>
            </div>
        </div>

    </div>
</template>

<style scoped>
.card  {
  width: 100%;  
  margin: 30px;
}
.dashboard {
    position: relative;
    display: flex;
    gap: 20px;
    width:100%;
    height: 100%;
}
.div2{
    display: flex;
    align-items: stretch;
}
.div2 .card{
    display: flex;
    align-items: stretch;
}

</style>
