<script setup lang="ts">
import { ref } from "vue";
// import BooleanChoice from "../answers/BooleanChoice.vue";
import CheckboxChoice from "../answers/CheckboxChoice.vue";
// import RadioChoice from "../answers/RadioChoice.vue";

import { useEditorStore } from "../../store/editorStore.ts";

const props = defineProps({ slideData: Object, })
const store = useEditorStore();

const questionText = ref(props.slideData ? props.slideData.question : "")

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
    padding: 10px;
    margin-top:10px;
    margin-bottom:15px;
    background-color: var(--input-bg);
    color: var(--input-text);
    width:100%;
}

</style>
