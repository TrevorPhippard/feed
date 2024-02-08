
<script setup lang="ts" >
import { ref, onMounted, onUnmounted } from 'vue'
import SocketioService from '../services/socketio.service.js';
import MsgService from '../services/msg.service.js';

import { useStore } from '../store/main.ts';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const {
  getusername: username,
  getToken: token,
  getRoom: roomId,
  getAvatar: avatar
} = storeToRefs(store)

const inputMessageText = ref('')
const messages = ref([]);

onMounted(function () {
  if (token.value) {
    SocketioService.setupSocketConnection(token.value, roomId.value, username.value);
    SocketioService.subscribeToMessages((_err, data) => {
      messages.value.push(data);
    });

    SocketioService.subscribeToUsersPassage((_err, data) => {
      console.log('user::',data);
    });
    MsgService.fetchMessages(roomId.value)
      .then(result => {
        result.map(data => {
          return {
            message: {
              id: data.id,
              displayName: data.user_id,
              msg: data.message_body
            }
          }
        }).map(data => {
          // console.log(data)
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
    avatar: avatar.value,
    displayName: username.value,
    msg: inputMessageText.value
  }

  SocketioService.sendMessage({ message }, (cb: any) => {
    // callback is acknowledgement from server
    console.log(cb);
    // @ts-ignore
    inputMessageText.value = '';
  });
}

</script>
<template>
  <div>
    <div class="box">
      <div class="messages">
        <div v-for="info in messages" :key="info.id">
          <strong> {{ info.message.displayName }}: </strong>{{ info.message.msg }}
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
  width: fit-content;
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
  flex-grow: 1;
  text-align: left;
  background-color: #1a1a1a;
}

.input-div {
  display: flex;
  width: 100%;
}
</style>