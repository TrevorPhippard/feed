<script setup lang="ts">
import { ref,reactive, onMounted, onUnmounted } from "vue"
import SocketioService from "../services/socketio.service.js";
import SocketUser from "../components/SocketUser.vue";

import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";
import { useEditorStore } from "../store/editorStore.ts";

import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const gameStore = useGameStore();
const store = useEditorStore();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getRoom: roomId } = storeToRefs(gameStore);

const activeUsers = ref({});

defineProps({ lobby: Boolean, text:String })


onMounted(function () {

SocketioService.setupSocketConnection(token.value, roomId.value, username.value);

SocketioService.subscribeToUsersPassage((_err, message) => {
    switch (message.type) {
    case "enteredRoom":
        var keys = Object.values(message.userList);
        keys.map(username => {
            activeUsers.value[username] = { online: true };
        });
        break;

    case 'join':
        activeUsers.value[message.displayName] = { online: true };
        break;

    case 'disconnected':
        activeUsers.value[message.displayName] = { online: false };
        break;

    case "broadcast":
        if(username.value === message.data.userId){
            store.addInvitation(message.data.roomId)
            store.toggleModal(true)
        };
        break;

    default:
        console.log('unexpected message type', message)
        break;
}
});
})
// onUnmounted(() => SocketioService.disconnect(roomId.value,username.value));

</script>

<template>
 <div>
    <h3><span class="icons" id="icon-contacts">&#9814;</span>{{text}}:</h3>
    <ul>
        <SocketUser v-for="(info, key) in activeUsers" :key="key" :online="info.online" :username="key" :lobby="lobby"/>
    </ul>
</div>
</template>

<style scoped>
    h3{
        margin-bottom:10px ;
    }
</style>
