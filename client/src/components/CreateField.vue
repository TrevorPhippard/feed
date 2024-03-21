<script setup lang="ts">
import { ref } from 'vue';
// import BooleanChoice from './answers/BooleanChoice.vue';
import CheckboxChoice from './answers/CheckboxChoice.vue';
// import RadioChoice from './answers/RadioChoice.vue';

import { useEditorStore } from '../store/editorStore.ts';

var props = defineProps({ slideData: Object, })
var store = useEditorStore();

var selected = ref('');
const questionText = ref(props.slideData ? props.slideData.question : '')

function updateQuestion() {
    store.updateSlideQuestion(questionText.value)
}

</script>
<template>
    <div v-if="props.slideData">
        <h4>Create Question</h4>
        <label for="question">Question: </label>
        <i>{{ props.slideData.question }}</i>
        <textarea v-model="questionText" name="question" rows="4" placeholder="write question here" @input="updateQuestion" />
        <!-- <p>Question Type</p> -->
        <!-- <select v-model="selected"> -->
            <!-- <option value="">Please select one</option> -->
            <!-- <option>Boolean</option> -->
            <!-- <option>Checkbox</option> -->
            <!-- <option>Radio</option> -->
        <!-- </select> -->
        <!-- <BooleanChoice v-if="selected == 'Boolean'" /> -->
        <!-- <RadioChoice v-if="selected == 'Radio'" /> -->
        <CheckboxChoice :data="slideData" />
    </div>
</template>

<style scoped>
h4 {
    margin-top: 0;
    margin-bottom: 10px;
}

textarea {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top:10px;
    background-color: var(--input-bg);
}

.title,
.secondary-text {
    margin: 5px 0 5px 0;
}

.media {
    height: 150px
}

.x-button {
    border: 1px solid rgba(255, 255, 255, 0.87);
    border-radius: 12px;
    position: relative;
    padding: 0px 5px 2px 5px;
    font-style: inherit;
    cursor: pointer;
}

.x-button:hover {
    color: #2d2d2d;
    background-color: #ccc;
    font-weight: 900;
}
</style>
