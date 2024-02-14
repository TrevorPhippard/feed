<script setup lang="ts">
import { ref } from 'vue'

var props = defineProps({
    text: String,
    label: String,
    placeholder: String,
    index: Number
})

const emit = defineEmits([ 'input-submit', 'input-edit'])

const textModel = ref(props.text)
const isEdit = ref(false);

function onEnter(){
    console.log(1)
    emit('input-submit',textModel.value )
    isEdit.value = !isEdit.value;
}

function setEditMode(){
    console.log('-')
    isEdit.value = !isEdit.value;
    // emit('input-edit', textModel.value )
}

</script>



<template>
    <div class="editable" @dblclick="setEditMode">
       <h4> {{ label }} <span v-if="!isEdit"> {{ text }}</span>
      <input v-if="isEdit" @keyup.enter="onEnter" type="text" placeholder="rename slide" v-model="textModel"></h4>
    </div>
</template>

<style scoped>
    .editable{
        cursor: pointer;
    }

    span{
        font-weight: 100;
    }
</style>
