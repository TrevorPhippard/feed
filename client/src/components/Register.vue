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
    <div class="card-bg">
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
</template>

<style scoped>

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
    display: block;
    font-size: clamp(14px, 1.5vw, 18px);
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    margin: 10px auto 0;
    padding: 12px 20px;
    cursor: pointer;
}


button:hover {
  background-color: var(--accent1-hover);
}



.error {
  color: var(--error);
}
</style>
