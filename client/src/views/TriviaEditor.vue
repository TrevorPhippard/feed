<script setup lang="ts">
import Preview from '../components/Preview.vue'
import Sortable from '../components/Sortable.vue'
import CreateField from '../components/CreateField.vue'
import ImageUploader from '../components/ImageUploader.vue';

import { storeToRefs } from 'pinia';
import { useEditorStore } from '../store/editorStore.ts';
import NavBar from '../components/NavBar.vue'; 


var store = useEditorStore();

const {
    editorSlides:slides,
    editorCurrentSlides:currentSlide

} = storeToRefs(store);

</script>

<template>
      <NavBar />

    <div class="dashboard">

        <div class="div1">
            <div class="card"> 
                <Sortable :itemsContent="slides"></Sortable>
            </div>
            <div class="card">
                <CreateField class="div2" :data="currentSlide"></CreateField>
                <ImageUploader />
            </div>
        </div>
        <div  class="div2">
            <div class="card">
                <Preview :data="currentSlide"></Preview>
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
