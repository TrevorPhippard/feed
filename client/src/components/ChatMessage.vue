
<script setup lang="ts" >
import { ref,  onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import SocketioService from "../services/socketio.service.js";
import MsgService from "../services/msg.service.js";

const gameStore = useGameStore();
const authStore = useAuthStore();

const router = useRouter();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getActiveRoom: room_id } = storeToRefs(gameStore);

const inputMessageText = ref("")
const messages:any = ref([]);
const msg = ref();

  if (token.value) {
    SocketioService.setupSocketConnection(token.value, room_id.value, username.value);
    SocketioService.subscribeToMessages((_err, data) => {
      // @ts-ignore 
      messages.value.push(data);
    });

    SocketioService.subscribeToUsersPassage((_err, message) => {
      console.log(message );
    });

    MsgService.fetchMessages(String(room_id.value))
      .then(result => {
        if(result.status == 500) return console.log(result)
        // @ts-ignore
        result.item.map((data) => {
        // @ts-ignore
          messages.value.push(data);
        })
      })
  } else {
     router.push({ path: "/" })
  }


onUnmounted(() => SocketioService.disconnect());

function submitMessage() {

  const message = {
    room_id: room_id.value,
    username: username.value,
    message_body: inputMessageText.value
  }

  SocketioService.sendMessage(message, () => {
    inputMessageText.value = "";
    scrollToBottom();
  });
}

  function scrollToBottom() {
        msg.value.scrollTop = msg.value.scrollHeight;
  }


</script>
<template>
  <div>
    <div v-if="token" class="box">
      <div  :class="{ sideScroll: messages.length > 3 }" class=" messagesCont" ref="msg">
        <div v-if="messages.length" v-for="(info, key) in messages" :key="key">
          <strong> {{ info.username }}: </strong>{{ info.message_body }}
        </div>
      </div>
      <form class="input-div" @submit.prevent="submitMessage">
        <h6>loggin in as: {{username}}</h6>
        <textarea type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Send</button>
      </form>
    </div>

    <div v-else class="box token-error">
        <p>token not found</p>
    </div>
  </div>
</template>
<style>

h6{
  margin-left:5px;
  opacity:20%;
}

.box {
  height: 200px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
}

.box textarea {
  padding: 10px;
  min-height: 20px;
  max-height: 90px;
  min-width: 20px;
  max-width: 600px;
}

.messagesCont {
  padding: 10px;
  width:100%;
  flex-grow: 1;
  text-align: left;
  background-color: #ffffff;
  overflow-anchor: auto !important; 
}

.sideScroll{
    max-height: 250px;
    overflow-y: scroll;
}
.messagesCont *{
  overflow-anchor: none;
}
.input-div {
  display: flex;
  width: 100%;
}

.token-error{
  padding:2px 5px;
  color:red;
}

</style>