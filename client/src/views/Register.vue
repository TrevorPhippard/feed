<script setup lang="ts">

import { ref } from 'vue'
import { useStore } from '../store/main.ts';
import {  useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const  username = ref();
const  email = ref();
const  password = ref();

function submitToken(e) {
    const  formData = {
        "username": username.value,
        "email": email.value,
        "password": password.value
    }

  store.register(formData).then(function(){
    router.push({ path: '/profile' })
  });
};


</script>

<template>
  <div class="container">
    <div class="card-black">
      <form @submit.prevent="">
        <input type="text" placeholder="username" v-model="username" required>
        <input type="email" placeholder="email" v-model="email" required>
        <input type="password" placeholder="password" v-model="password" required>
        <div class="buttons">
          <button  @click="submitToken" type="submit" class="login-button">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}


.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.login-button {
  padding: 10px 20px;
  background-color: #2f19be;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-button {
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

</style>
