<script setup>
import draggable from 'vuedraggable';
import { ref } from 'vue';

const itemsContent = ref([
            { name: 'Slide 1', id: 1 },
            { name: 'Slide 2', id: 2 },
            { name: 'Slide 3', id: 3 },
            { name: 'Slide 4', id: 4 },
]);

const slide = ref(0);

function showSlide(index){
    slide.value = index
}

function add() {
    var ln = itemsContent.value.length + 1;
    itemsContent.value.push({
        name: 'slide '+ln,
        id: ln
    })
}

function remove(index) {
    itemsContent.value.splice(index, 1)
}

function changeOrder(event){
    const { newIndex, oldIndex } = event.moved;
    if(newIndex !== oldIndex ) console.log(event)
}

</script>
<template>
    {{  itemsContent[slide] }}
    <draggable
    :list="itemsContent"
    :animation="100"
    ghost-class="invisable-card"
    group="list"
    class="sortable-list"
    tag="ul"
    @change="changeOrder"
    >
    <template #item="{element, index}">
       <li @mouseup="showSlide(index)">{{element.name}}</li>
    </template>
    </draggable>
    <button @click="add">create slide</button>
</template>
<style>

.sortable-list{
    list-style: none;
}

.sortable-list li{
    background-color: rgba(40, 40, 40, 1);
    min-width: 100px;
    padding: 4px 10px;
    border-radius: 3px;
    border: 1px solid #555;
}
.sortable-list * + *{
    margin-top: 10px;
}

.invisable-card{
    opacity: 0.2;
}

</style>

