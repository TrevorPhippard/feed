<script setup lang="ts">

import { ref } from 'vue'
import { useAuthStore } from '../store/authStore.ts';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();
const error = ref('');

function submitToken() {
  const formData = {
    "email":  email.value,
    "password": password.value
  }

  store.login(formData).then(function(){
    router.push({ path: '/profile' })
  }).catch(function(res){
    console.error(res.response)
    error.value = 'error';
  });
};

function goToRegstrationPage(){
  router.push({ path: '/register' })
}


</script>

<template>
  <div class="container">
    <div class="card-black">
      <form @submit.prevent="">
        <input type="email" placeholder="E-Mail" v-model="email" required>
        <input type="password" placeholder="password" v-model="password" required>
        <div class="buttons">
          <button  @click="goToRegstrationPage" class="register-button">Register</button>
          <button  @click="submitToken" type="submit" class="login-button">Login</button>
        </div>
      </form>
      <p class="error">{{error}}</p>
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
  background-color: var(--accent1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover{
  background-color: var(--accent1-hover);
}


.register-button {
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.error{
  color:  var(--error);
}
</style>
