<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore.ts";
import { useEditorStore } from "../store/editorStore.ts";
import { useGameStore } from "../store/gameStore.ts";

import SocketioService from "../services/socketio.service.js";
import closeCircle from "../assets/x-circle.svg";


const editorStore = useEditorStore();
const authStore = useAuthStore();
const gameStore = useGameStore();

const { getusername: username, getToken: token } = storeToRefs(authStore)
const { getInvitation: room_id } = storeToRefs(gameStore);

const {
  modal: castModal,
} = storeToRefs(editorStore);

function closeModal(){
    editorStore.toggleModal(false);
}

function joinGame(){
  editorStore.toggleModal(false);
  SocketioService.joinRoom(room_id, username)
  SocketioService.subscribeToGameActions((_err, data) => {
      console.log(data);
  })
}

</script>
<template>
<section class="flex">
  <div class="modal flex" role="dialog" aria-modal="true"  v-if="castModal">
    <div class="modal_header">
      <h1> You've been invited! </h1>
      <img id="closeButton" @click="closeModal" :src="closeCircle" />
    </div>

      <p>Would you like to join <i>username</i> in game: <i>{{room_id}}</i></p>
    <div class="modal_footer">
      <button class="btn-invert" @click="joinGame">Join</button>
      <button @click="closeModal">Back</button>
    </div>
  </div>
</section>
</template>

<style scoped>
p{
  display:block;
  width:100%;
  text-align:center;
  margin:10px;
}
.modal {
  position: fixed;
  top: 100px;
  width: 80%;
  max-width: 600px;
  padding: var(--sp-sm) var(--sp-lg);
  background-color: var(--white);
  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}

.modal_header {
    color: var(--primary);
    display: flex;
 }

 .modal_footer{
  margin:10px;
 }

#closeButton {
  position:absolute;
  top:10px;
  right:10px;
  cursor:pointer;
}
#closeButton:hover{
  background-color: var(--accent1-hover);
  border-radius:50%;
}

</style>
