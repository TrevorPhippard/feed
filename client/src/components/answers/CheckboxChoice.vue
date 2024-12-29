<script setup lang="ts">
import { ref } from "vue";
import { useEditorStore } from "../../store/editorStore.ts";
import minusCircle from "../../assets/minus-circle.svg";


var store = useEditorStore();

defineProps({ data: Object, })

var inputs = ref([{
    name: "",
    party: ""
}])

function addChoice() {
    store.addChoice()

}
function removeChoice(index: number) {
    store.removeChoice(index)
}

function updateChoice(event: Event) {
    store.updateChoice(event)
}

function updateCheck(event: Event) {
    store.updateCheck(event)
}

</script>

<template>
    <div class="form">
        <p> Answer: </p>
        <div class="form-group" v-if="data" v-for="(input, k) in data.options" :key="k">
            <span>{{ k + 1 }})</span>
            <textarea placeholder="option" type="text" :id="'opt_' + k" :value="input.choice"
                @input="updateChoice"></textarea>

            <input type="checkbox" :id="'check_' + k" :checked="input.correct" @input="updateCheck">
            <label :for="'check_' + k"> Correct</label><br>
                <img
                alt="" 
                class="x-button" @click="removeChoice(k)" 
                v-show="k || (!k && inputs.length > 1)"
                :src="minusCircle" 
              >

            </div>
    </div>
    <button @click="addChoice">Add fields</button>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}

.form p{
    margin-bottom: 10px;
}

.form-group {
    align-items: center;
    display: flex;
    margin-bottom: 20px;
}

.form-group *+* {
    margin-left: 10px;
}
textarea{
    padding:5px;
}
</style>