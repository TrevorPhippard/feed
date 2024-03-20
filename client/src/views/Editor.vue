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
        <div class="control">
            <div class="card">
                <ClickInput
                label="Name:" 
                placeholder="trivia name" 
                :text="gameName" 
                @input-submit="updateGameName"
                />
            </div>
            <div class="card">
                <Sortable :itemsContent="slides"></Sortable>
            </div>
            <div class="card">
                <ImageUploader />
                <br/>
                <CreateField class="col-right" :slideData="currentSlide"></CreateField>
            </div>
        </div>
        <div class="save">
            <div class="card">
                <h4>Save Trivia </h4>
                <i>save changes and return to home to launch game</i>
                <hr/>
                <button @click="saveGameToDatabase">Save</button>
            </div>
        </div>
        <div class="preview">
            <Preview :data="currentSlide"></Preview>
        </div>
    </div>
</template>

<style scoped>
.card {
    margin: 10px;
    width: 95%;
}


.dashboard {
  display: grid; 
  height: 88vh;
  grid-template-columns: .35fr .65fr; 
  grid-template-rows: 1fr 1.6fr 0.4fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "control  preview "
    "control  preview "
    "save  preview "; 
}
.control { 
    grid-area: control;
    height: 100%;
    overflow-y: scroll;
}
.save {    
    grid-area: save;
    height: 100%;
 }
.preview { 
    grid-area: preview;
    padding:0 20px
}


</style>
