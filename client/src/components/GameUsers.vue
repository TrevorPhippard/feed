<script setup lang="ts">
import { ref,onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";
import { useEditorStore } from "../store/editorStore.ts";

import SocketUser from "../components/SocketUser.vue";

import SocketioService from "../services/socketio.service.js";


const authStore = useAuthStore();
const EditorStore = useEditorStore();
const GameStore = useGameStore();

const { getusername: username, getToken: token } = storeToRefs(authStore)

const userList:any = ref({});

const props = defineProps({ lobby: Boolean, text:String, room: String })

interface userPassageType{
  username: string;
  type: string;
  data?: {
    userId: string,
    room_id:string
  };
  userList?: any;
}

function socketActions(_err, message:userPassageType)  {
    console.log('G',username.value,props.room, message)

    switch (message.type) {
        case "enteredRoom":
            const keys = Object.values(message.userList);
            keys.map((username:any) => {
                userList.value[username] = { online: true };
            });
            break;

        case 'join':
            userList.value[message.username] = { online: true };
            break;

        case 'disconnected':
            userList.value[message.username] = { online: false };
            break;

        case "broadcast":
            if(message.data && message.data.room_id && username.value === message.data.userId){
                GameStore.addInvitation(message.data.room_id)
                EditorStore.toggleModal(true)
            };
            break;

        default:
            console.log('unexpected message type', message)
            break;
    }
}

onMounted(function () {
        console.log("subscribeToUsersPassage");
        SocketioService.setupSocketConnection(token.value, props.room, username.value);
        SocketioService.subscribeToGameActions(socketActions);
})
// onUnmounted(() => SocketioService.disconnect(room_id.value,username.value));

</script>

<template>
 <div>
    <h3><span class="icons" id="icon-contacts">&#9814;</span>{{text}}:</h3>
    <ul>
        <SocketUser v-for="(info, key) in userList" 
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
