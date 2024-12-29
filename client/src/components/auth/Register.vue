<script setup lang="ts">

import { ref } from "vue"
import { useAuthStore } from "../../store/authStore.ts";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const username = ref();
const email = ref();
const password = ref();
const error = ref("");

function submitToken() {
  const formData = {
    "username": username.value,
    "email": email.value,
    "password": password.value
  }

  authStore.register(formData).then(function () {
    router.push({ path: "/profile" })
  }).catch(function (res) {
    console.error(res.response)
    error.value = "error";
  });
};

function backToLanding() {
  router.push({ path: "/" })
}

</script>

<template>
    <div class="card-bg">
      <form @submit.prevent="">
        <input type="text" placeholder="username" v-model="username" required>
        <input type="email" placeholder="email" v-model="email" required>
        <input type="password" placeholder="password" v-model="password" required>
        <div class="buttonsCont">
          <button @click="backToLanding" type="submit" class="secondary-button">Back</button>
          <button @click="submitToken" type="submit" class="primary-button">Register</button>
        </div>
      </form>
      <p class="error">{{ error }}</p>
    </div>
</template>

<style scoped>

.buttonsCont {
  display: flex;
  justify-content:center;
  gap: 10px;
  margin-top:5px;
}

.error {
  margin-top:10px;
  color: var(--error);
}
</style>
