
<script setup lang="ts" >
import { ref, onMounted, onUnmounted } from "vue"
import SocketioService from "../services/socketio.service.js";
import MsgService from "../services/msg.service.js";

import { useAuthStore } from "../store/authStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const gameStore = useGameStore();

const router = useRouter();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getRoom: room_id } = storeToRefs(gameStore)

const inputMessageText = ref("")
const messages = ref([]);
const msg = ref();


  interface messageType {
    room_id: string;
    username: string;
    message_body: string;
  }

  if (token.value) {
    SocketioService.setupSocketConnection(token.value, room_id.value, username.value);
    SocketioService.subscribeToMessages((_err, data) => {
      messages.value.push(data);
    });

    SocketioService.subscribeToUsersPassage((_err, message) => {
      console.log(message );
    });

    MsgService.fetchMessages(room_id.value)
      .then(result => {
        if(result.status == 500) return console.log(result)

       result.map((data: { room_id: string; username: string; message_body: string; }) => {
          return {
            message: {
              room_id: data.id,
              username: data.username,
              message_body: data.message_body
            }
          }
        }).map((data: messageType) => {
          return messages.value.push(data);
        })
      })
  } else {
     router.push({ path: "/" })
  }


onUnmounted(() => SocketioService.disconnect(room_id.value,username.value));

function submitMessage() {

  const message = {
    room_id: room_id.value,
    username: username.value,
    message_body: inputMessageText.value
  }

  console.log(message)

  SocketioService.sendMessage(message, () => {
    inputMessageText.value = "";
    MsgService.postMessages(message)
    scrollToBottom();
  });
}

  function scrollToBottom() {
        msg.value.scrollTop = msg.value.scrollHeight;
  }

function filterMessage(info: { message: any; }) {
  return info.message
}

</script>
<template>
  <div>
    <div v-if="token" class="box">
      <div  :class="{ sideScroll: messages.length > 3 }" class=" messagesCont" ref="msg">
        <div v-for="(info, key) in messages" :key="key">
          <strong> {{ filterMessage(info).username }}: </strong>{{ filterMessage(info).msg }}
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