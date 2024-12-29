<script setup lang="ts">
import { ref,reactive, onMounted, onUnmounted } from "vue"
import SocketioService from "../services/socketio.service.js";
import SocketUser from "../components/SocketUser.vue";

import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const gameStore = useGameStore();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getRoom: roomId } = storeToRefs(gameStore);

const activeUsers = ref({})
SocketioService.setupSocketConnection(token.value, roomId.value, username.value);

SocketioService.subscribeToUsersPassage((_err, message) => {
    if(message.type ==="enteredRoom"){
        var temp = {};
        var keys = Object.values(message.userList);
        keys.map( username =>{
            activeUsers.value[username]= { online: true }
        })
    }
    if(message.type === 'join'){
        activeUsers.value[message.displayName] = {online : true}
    }

    if(message.type === 'disconnected'){
        activeUsers.value[message.displayName] = {online : false}
    }
});

// onUnmounted(() => SocketioService.disconnect(roomId.value,username.value));

</script>

<template>
 <div>
    <h3><span class="icons" id="icon-contacts">&#9814;</span>Friends Online:</h3>
    <ul>
        <SocketUser v-for="(info, key) in activeUsers" :key="key" :online="info.online" :username="key"/>
    </ul>
</div>
</template>

<style scoped>
    h3{
        margin-bottom:10px ;
    }
</style>
