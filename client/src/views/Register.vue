<script setup lang="ts">

import { ref } from 'vue'
import { useAuthStore } from '../store/authStore.ts';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const username = ref();
const email = ref();
const password = ref();
const error = ref('');

function submitToken() {
  const formData = {
    "username": username.value,
    "email": email.value,
    "password": password.value
  }

  store.register(formData).then(function () {
    router.push({ path: '/profile' })
  }).catch(function (res) {
    console.error(res.response)
    error.value = 'error';
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
          <button @click="submitToken" type="submit" class="login-button">Register</button>
        </div>
      </form>
      <p class="error">{{ error }}</p>
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
  height: 90vh;
  width: 100vw;
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

.error {
  color: var(--error);
}
</style>
