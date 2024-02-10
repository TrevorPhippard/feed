<script setup lang="ts">
import { ref } from 'vue';
import BooleanChoice from './answers/BooleanChoice.vue';
import CheckboxChoice from './answers/CheckboxChoice.vue';
import RadioChoice from './answers/RadioChoice.vue';


var selected = ref('')

</script>

<template>
        <h3>Create Question</h3>
        <label for="question">Question:</label>
        <textarea id="question" name="question" rows="4" placeholder="write question here"></textarea>

        <p>Question Type</p>
        <select v-model="selected">
            <option value="">Please select one</option>
            <option>Boolean</option>
            <option>Checkbox</option>
            <option>Radio</option>
        </select>

        <BooleanChoice v-if="selected == 'Boolean'" />
        <CheckboxChoice v-if="selected == 'Checkbox'" />
        <RadioChoice v-if="selected == 'Radio'" />

</template>

<style scoped>
textarea {
    display: block;
    width: 90%;
    padding: 10px;
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
