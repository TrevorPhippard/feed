<script setup lang="ts">

import { ref } from "vue"
import { useAuthStore } from "../../store/authStore.ts";
import { useRouter } from "vue-router";


const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();
const error = ref("");

function submitToken() {
  const formData = {
    "email": email.value,
    "password": password.value
  }

  authStore.login(formData).then(function () {
    router.push({ path: "/profile" })
  })
  .catch(function (res) {
    console.error(res)
    error.value = "error";
  });
};

function goToRegstrationPage() {
  router.push({ path: "/signup" })
}


</script>

<template>
    <div class="card-bg">
      <form @submit.prevent="">
        <input type="email" placeholder="E-Mail" v-model="email" required>
        <input type="password" placeholder="password" v-model="password" required>
        <div class="buttonsCont">
          <button @click="goToRegstrationPage" class="secondary-button">Register</button>
          <button @click="submitToken" type="submit" class="primary-button">Login</button>
        </div>
      </form>
      <p class="error">{{ error }}</p>
    </div>
</template>

<style scoped>

.buttonsCont {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top:5px;
}

.error {
  color: var(--error);
}
</style>
