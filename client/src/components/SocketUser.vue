<script setup lang="ts">
import { storeToRefs } from "pinia";
import SocketioService from "../services/socketio.service.js";
import plusCircle from "../assets/plus-circle.svg";
import user from "../assets/user.svg";
import { useGameStore } from "../store/gameStore.ts";
import { useAuthStore } from "../store/authStore.ts";

var props = defineProps({
    online: Boolean,
    username: String,
    // imgSrc: String,
})

const gameStore = useGameStore();
const authStore = useAuthStore();

const { getRoom: roomId } = storeToRefs(gameStore);
const { getusername: yourUsername } = storeToRefs(authStore)

function goToEdit(user:string) {
    SocketioService.invite(user, roomId.value )
}

</script>
<template>
        <li 
        v-if="yourUsername!==username"
        @click="goToEdit(username)" data-user="user">
            <div class="iconCont">
                <div>
                    <img  class="userIcon" :src="user" alt=""/>
                    <div :class="`status ${props.online ?'online':'offline'}`"></div>
                </div>
                <h2>{{props.username}}</h2>
            </div>
            <img class="addUserBtn" :src="plusCircle" alt=""/>
        </li>
     </template>
<style scoped>

.iconCont{
    position:relative;
    display: flex;
    align-items: center;
}

img.addUserBtn{
    cursor: pointer;
    border-radius: 50%;
    height:20px
}
img.addUserBtn:hover{
    background-color: var(--accent1-hover);
   
}

img.userIcon{
    background-color: var(--primary);
    border-radius: 50%;
    padding:5px;
}

h2{
    font-size:22px;
    margin-bottom:0px;
}

li{
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
}

li img{
    margin-right:10px;
}

.status{
    position:absolute;
    bottom:5px;
    left:25px;
    height:10px;
    width:10px;
    border-radius: 50%;
}

.online{
    background-color:var(--online);
}

.offline{
    background-color:var(--offline);
}
</style>
