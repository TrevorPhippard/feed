<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Preview from '../components/Preview.vue'
import Sortable from '../components/Sortable.vue'
import CreateField from '../components/CreateField.vue'
import ImageUploader from '../components/ImageUploader.vue';

import { storeToRefs } from 'pinia';
import { useEditorStore } from '../store/editorStore.ts';
import NavBar from '../components/NavBar.vue';
import ClickInput from '../components/ClickInput.vue';

var store = useEditorStore();
const {
    editorName: gameName,
    editorSlides: slides,
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

function updateGameName(value:string) {
    store.updateGameName(value);
}

onMounted(function () {
    store.fetchGameFromDatabase();
})

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
                @input-edit="updateGameName"

                />
                <h4>background image</h4>
                <ImageUploader />

            </div>
            <div class="card">
                <Sortable :itemsContent="slides"></Sortable>
            </div>
            <div class="card">
                <CreateField class="col-right" :data="currentSlide"></CreateField>
            </div>
            
        </div>
        <div class="save">
            <div class="card">
                <h4>Save Trivia </h4>
                <i>save changes and return to home to launch game</i>
                <hr/>
                <button @click="store.saveGameToDatabase">Save</button>
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
  height: 80vh;
  grid-template-columns: 1fr 1fr 1.2fr; 
  grid-template-rows: 1fr 1.6fr 0.4fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "control preview preview"
    "control preview preview"
    "save preview preview"; 
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
