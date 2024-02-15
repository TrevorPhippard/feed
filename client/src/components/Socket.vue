
<script setup lang="ts" >
import { ref, onMounted, onUnmounted } from 'vue'
import SocketioService from '../services/socketio.service.js';
import MsgService from '../services/msg.service.js';

import { useAuthStore } from '../store/authStore.ts';
import { useGameStore } from '../store/gameStore.ts';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const gameStore = useGameStore();

const router = useRouter();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getRoom: roomId } = storeToRefs(gameStore)

const inputMessageText = ref('')
const messages = ref([]);
const msg = ref();

onMounted(function () {
  
  if (token.value) {
    SocketioService.setupSocketConnection(token.value, roomId.value, username.value);
    SocketioService.subscribeToMessages((_err, data) => {
      // @ts-ignore
      messages.value.push(data);
    });

    SocketioService.subscribeToUsersPassage((_err, data) => {
      console.log('user::', data);
    });

    MsgService.fetchMessages(roomId.value)
      .then(result => {
        result.map((data: { id: any; user_id: any; message_body: any; }) => {
          return {
            message: {
              id: data.id,
              displayName: data.user_id,
              msg: data.message_body
            }
          }
        }).map((data: never) => {
          return messages.value.push(data);
        })
      })
  } else {
    return router.push({ path: '/' })
  }
})

onUnmounted(() => SocketioService.disconnect());

function submitMessage() {

  const message = {
    roomId: roomId.value,
    displayName: username.value,
    msg: inputMessageText.value
  }

  SocketioService.sendMessage({ message }, (cb: any) => {
    // callback is acknowledgement from server
    console.log(cb);
    // @ts-ignore
    inputMessageText.value = '';
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
    <div class="box">
      <div class="messages" ref="msg">
        <div v-for="(info, key) in messages" :key="key">
          <strong> {{ filterMessage(info).displayName }}: </strong>{{ filterMessage(info).msg }}
        </div>
      </div>
      <form class="input-div" @submit.prevent="submitMessage">
        <textarea type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<style>

.App {
  padding: 1rem;
}

.box {
  height: 400px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.box textarea {
  padding: 10px;
  min-height: 20px;
  max-height: 90px;
  min-width: 20px;
  max-width: 600px;
}

.messages {
  padding: 10px;
  width:100%;
  flex-grow: 1;
  text-align: left;
  background-color: #1a1a1a;
  overflow: scroll;
  overflow-anchor: auto !important; 
}

.messages *{
  overflow-anchor: none;
}
.input-div {
  display: flex;
  width: 100%;
}
</style>