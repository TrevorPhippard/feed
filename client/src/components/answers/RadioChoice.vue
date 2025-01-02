<script setup lang="ts">
import { ref } from "vue";

const inputs = ref([{
    name: "",
    party: ""
}])

function add() {
    inputs.value.push({
        name: "",
        party: ""
    })
}
function remove(index: number) {
    inputs.value.splice(index, 1)
}

</script>

<template>
    <div class="form">
        <p> Answer: </p>

        <div class="form-group" v-for="(input, k) in inputs" :key="k">
            <span>{{ k }}</span>
            <textarea placeholder="option" type="text" v-model="input.name"></textarea>
            <input type="radio" :id="'opt_' + k" name="'opt_'+k" :value="k">
            <label :for="'opt_' + k"> Correct</label><br>
                <span class="x-button" @click="remove(k)" v-show="k || (!k && inputs.length > 1)">×</span>
        </div>
    </div>
    <button @click="add">Add fields</button>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    align-items: center;
    display: flex;
    margin-bottom: 20px;
}

.form-group *+* {
    margin-left: 10px;
}
</style>