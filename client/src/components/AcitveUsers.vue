<script setup lang="ts">
import { ref,onMounted } from "vue"
import SocketioService from "../services/socketio.service.js";
import SocketUser from "../components/SocketUser.vue";

import { useAuthStore } from "../store/authStore.ts";
import { useEditorStore } from "../store/editorStore.ts";

import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const store = useEditorStore();

const { getusername: username, getToken: token } = storeToRefs(authStore)

const activeUsers:any = ref({});

defineProps({ lobby: Boolean, text:String })

interface userPassageType{
  username: string;
  type: string;
  data?: {
    userId: string,
    room_id:string
  };
  userList?: any;
}

onMounted(function () {

SocketioService.setupSocketConnection(token.value, 'ActiveUsers', username.value);

SocketioService.subscribeToUsersPassage((_err, message:userPassageType) => {
    switch (message.type) {
    case "enteredRoom":
        var keys = Object.values(message.userList);
        keys.map((username:any) => {
            activeUsers.value[username] = { online: true };
        });
        break;

    case 'join':
        activeUsers.value[message.username] = { online: true };
        break;

    case 'disconnected':
        activeUsers.value[message.username] = { online: false };
        break;

    case "broadcast":
        if(message.data && message.data.room_id && username.value === message.data.userId){
            store.addInvitation(message.data.room_id)
            store.toggleModal(true)
        };
        break;

    default:
        console.log('unexpected message type', message)
        break;
}
});
})
// onUnmounted(() => SocketioService.disconnect(room_id.value,username.value));

</script>

<template>
 <div>
    <h3><span class="icons" id="icon-contacts">&#9814;</span>{{text}}:</h3>
    <ul>
        <SocketUser v-for="(info, key) in activeUsers" 
            :key="key" 
            :online="info.online" 
            :username="String(key)" 
            :lobby="lobby"
        />
    </ul>
</div>
</template>

<style scoped>
    h3{
        margin-bottom:10px ;
    }
</style>
