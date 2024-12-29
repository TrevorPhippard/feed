<script setup lang="ts">
import { ref } from "vue"

import Preview from "../components/tabs/Preview.vue"
import EditTab from "../components/tabs/Edit.vue"

import { storeToRefs } from "pinia";
import { useEditorStore } from "../store/editorStore.ts";
import { useRouter } from "vue-router";

const router = useRouter();

var store = useEditorStore();
const {
    editorCurrentSlides: currentSlide
} = storeToRefs(store);

const tabSelected = ref("Edit");


function saveGameToDatabase(){
    store.saveGameToDatabase();
    router.push({ path: "/profile" })
}

function backToProfile(){
    router.push({ path: "/profile" })
}

function switchTabs(cls: string){
    tabSelected.value = cls  || "Edit";
}

function isActive(cls: string){
    return tabSelected.value === cls;
}

var tabs = ["Preview","Edit","Settings"]



</script>

<template>
    <main>
    <div class="card-box">

        <ul class="flex">
            <li v-for="tab in tabs"  @click="switchTabs(tab)" :class="{ active: isActive(tab) }"  >{{ tab }}</li>
        </ul>
        <div v-if="tabSelected == 'Preview'" class="tab">
            <Preview :data="currentSlide"></Preview>
        </div>
        <div v-if="tabSelected == 'Edit'" class="editTab tab">
           <EditTab/>
        </div>
        <div v-if="tabSelected == 'Settings'" class="tab ">
            <h2>setting</h2>
            <div class="card">Track pts: no </div>
            <div class="card">share link: no </div>
            <div class="card">api link: no </div>
            <div class="card">allow late: no </div>
            <div class="card">code: 54687 </div>
        </div>

        <br/>
        <div class="save">
                <h4>Save Trivia </h4>
                <i>save changes and return to home to launch game</i>
                <hr/>
                <button @click="saveGameToDatabase">Save</button>
                <button @click="backToProfile">Back</button>

        </div>
    </div>
</main>
</template>

<style scoped>


    .editTab{
        display: flex;
        gap:40px;
    }

    .card-box{
        padding-top:0;
        margin: 0 auto;
    }

    li{
        padding:10px;
        flex: 1;
        text-align: center;
        border-top: 5px solid rgb(255, 85, 0, .05);
    }

    li.active{
        border-top: 5px solid var(--primary);
    }

    li:hover{
        background-color: var(--accent-bg);
    }

    hr{
        margin-bottom:20px;
    }

    ul{
        margin-bottom:20px;
    }

    @media only screen and (max-width: 600px) {
        .editTab{
            display: block;
        }
    }
</style>
