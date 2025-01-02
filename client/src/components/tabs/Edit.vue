<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "../../store/editorStore.ts";

import ClickInput from "../editor/ClickInput.vue";
import CreateField from "../editor/CreateField.vue"
import Sortable from "../editor/Sortable.vue"
import ImageUploader from "../editor/ImageUploader.vue";

const store = useEditorStore();

const {
    editorName: gameName,
    editorSlides: slides,
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

function updateGameName(value:string) {
    store.updateGameName(value);
}

</script>

<template>
 <div class="col">
                <ClickInput
                    label="Name:" 
                    placeholder="trivia name" 
                    :text="gameName" 
                    @input-submit="updateGameName"
                />
                <Sortable :itemsContent="slides"></Sortable>
            </div>
            <div class="col">
                <h3>{{ currentSlide.name }}</h3>
                <hr/>
                <ImageUploader />
                <br/>
                <CreateField class="col-right" :slideData="currentSlide"></CreateField>
            </div>
</template>

<style scoped>

</style>
