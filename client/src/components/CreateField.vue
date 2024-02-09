<script setup lang="ts">
import {ref} from 'vue';
// import { ref,  toRefs, watch, computed  } from 'vue'
// const props = defineProps({
//   title: String,
//   subtext: String
// })
// const mediaBg = computed(() => background)


var inputs = ref([{
    name: '',
    party: ''
}])

function add() {
    inputs.value.push({
        name: '',
        party: ''
    })
}
function remove(index: number) {
    inputs.value.splice(index, 1)
}



</script>

<template>
    <div class="card">

        <h3>Slide</h3>
        <label for="question">Question:</label>

<textarea id="question" name="question" rows="4" cols="50" placeholder="write question here">
</textarea>
    <div class="form">

        <div class="form-group" v-for="(input, k) in inputs" :key="k">
            <p>{{ k }}</p>
            <input placeholder="option" type="text"  v-model="input.name">
            <select name="true" id="">
                <option value="correct">correct</option>
                <option value="wrong">wrong</option>
            </select>

            
            <span>
                <i class="fas fa-minus-circle" @click="remove(k)" v-show="k || (!k && inputs.length > 1)">Remove</i>
            </span>
        </div>
    </div>
        <button @click="add" >Add fields</button>
    </div>
</template>

<style scoped>

textarea{
    padding: 10px;
}
.card {
    /* background-color: #fff; */
    width: 100%;
    display: table;
    border-radius: .2rem;
    box-shadow: rgb(150, 150, 150) 0px 1px 3px;
    width: 350px;
    padding: 0 18px;
    font-family: 'roboto', sans-serif;
}
.form{
    margin-top: 10px;
    margin-bottom: 10px;
}
.form-group{
    display: inline-flex;
    align-items: center;
}
.form-group *{
    margin-right: 1em;
}

.title,
.secondary-text {
    margin: 5px 0 5px 0;
}

.media {
    height: 150px
}
</style>
