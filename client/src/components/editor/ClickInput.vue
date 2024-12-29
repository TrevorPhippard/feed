<script setup lang="ts">
import { ref } from "vue"

var props = defineProps({
    text: String,
    label: String,
    placeholder: String,
    index: Number
})

const emit = defineEmits([ "input-submit"])

const textModel = ref(props.text)

const isEdit = ref(props.text?false:true);

function onEnter(){
    emit("input-submit",textModel.value )
    isEdit.value = !isEdit.value;
}

function setEditMode(){
    isEdit.value = !isEdit.value;
}

</script>
<template>
    <div class="editable" @dblclick="setEditMode">
       <h2> {{ label }} <span v-if="!isEdit || text"> {{ text }}</span>
      <input v-if="isEdit &&  !text" @keyup.enter="onEnter" type="text" placeholder="enter quiz name" v-model="textModel"></h2>
    </div>
</template>

<style scoped>
    .editable{
        cursor: pointer;
    }

    span{
        color: var(--primary);
        font-weight: 100;
    }
</style>
