<script setup lang="ts">
import { ref } from 'vue'

var props = defineProps({
    text: String,
    label: String,
    placeholder: String,
    index: Number
})

const emit = defineEmits([ 'input-submit'])

const textModel = ref(props.text)
const isEdit = ref(false);

function onEnter(){
    emit('input-submit',textModel.value )
    isEdit.value = !isEdit.value;
}

function setEditMode(){
    isEdit.value = !isEdit.value;
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
