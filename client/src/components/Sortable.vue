<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref } from 'vue';

defineProps({
    itemsContent: Array,
})



const emit = defineEmits<{
  (e: 'slide-action', id: number): void
  (e: 'slide-move', value: string): void
  (e: 'slide-add', value: string): void
  (e: 'slide-remove', value: string): void
  (e: 'slide-edit', value: number): void
}>()

const slide = ref(0);
const isEdit = ref(100);
const textModel = ref()

function showSlide(index:number) {
    slide.value = index;
    emit('slide-action',index)
}

function setEditMode(index:number) {
    if(isEdit.value === index){
        isEdit.value = 100;
    }else{
        isEdit.value = index;
    }
}

function onEnter(e:Event){
    emit('slide-edit',isEdit.value, textModel )
    isEdit.value = 100;
}

function add() {
    emit('slide-add')
}

function remove() {
    emit('slide-remove', slide.value)
}

function changeOrder(event) {
    const { newIndex, oldIndex } = event.moved;
    if (newIndex !== oldIndex)  emit('slide-move', newIndex,oldIndex)

}

</script>
<template>
        {{ itemsContent[slide] }}
        <draggable :list="itemsContent" :animation="100" ghost-class="invisable-card" group="list" class="sortable-list "
            tag="ul" @change="changeOrder">
            <template #item="{ element, index }">
                <li @mouseup="showSlide(index)"
                    @dblclick="setEditMode(index)"
                >
                    <span> {{ element.name }}</span>
                    <input v-if="isEdit === index" 
                    @keyup.enter="onEnter"
                    type="text" 
                    placeholder="rename slide"
                    v-model="textModel"
                    >
                </li>
            </template>
        </draggable>
        <button @click="add">create slide</button>
        <button @click="remove">remove selected</button>

</template>
<style>
.sortable-list {
    list-style: none;
    padding-left: 0px;
}

.sortable-list li {
    background-color: rgba(40, 40, 40, 1);
    min-width: 100px;
    padding: 4px 10px;
    border-radius: 3px;
    border: 1px solid #555;
}

.sortable-list *+* {
    margin-top: 10px;
}

.invisable-card {
    opacity: 0.2;
}

button + button{
    margin-left:10px
}
</style>

