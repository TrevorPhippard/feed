<script setup lang="ts">

import Preview from '../components/Preview.vue'
import Sortable from '../components/Sortable.vue'
import CreateField from '../components/CreateField.vue'
import ImageUploader from '../components/ImageUploader.vue';

import { storeToRefs } from 'pinia';
import { useEditorStore } from '../store/editorStore.ts';
import NavBar from '../components/NavBar.vue';
import ClickInput from '../components/ClickInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

var store = useEditorStore();
const {
    editorName: gameName,
    editorSlides: slides,
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

function updateGameName(value:string) {
    store.updateGameName(value);
}

function saveGameToDatabase(){
    store.saveGameToDatabase();
    router.push({ path: '/profile' })
}

</script>

<template>
    <NavBar/>
    <div class="dashboard">
        <div class="card preview">
            <Preview :data="currentSlide"></Preview>
        </div>
        <div class="card control ">
                <ImageUploader />
                <br/>
                <CreateField class="col-right" :slideData="currentSlide"></CreateField>
        </div>
        <div class="info ">
            <div class="card ">
                <ClickInput
                label="Name:" 
                placeholder="trivia name" 
                :text="gameName" 
                @input-submit="updateGameName"
                />
            </div>
            <div class="card ">
                <Sortable :itemsContent="slides"></Sortable>
            </div>
        </div>
        <div class="save card">
                <h4>Save Trivia </h4>
                <i>save changes and return to home to launch game</i>
                <hr/>
                <button @click="saveGameToDatabase">Save</button>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 10px;
    width: 95%; 
     overflow-y: scroll;
}

.dashboard {
  display: grid; 
  grid-template-columns: 1.5fr 2fr 2fr; 
  grid-template-rows: 1fr 1.6fr 0.4fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "preview control control"
    "info  control control "
    "save  save save ";   

}
.control { 
    grid-area: control;
}
.save {    
    grid-area: save;
 }
 .info {    
    grid-area: info;
 }
.preview { 
    grid-area: preview;
    height: 100%;
}


</style>
