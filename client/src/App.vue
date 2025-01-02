<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore } from "./store/authStore.ts";

import ModalBox from './components/ModalBox.vue';

const router = useRouter();
const authStore = useAuthStore();

const { getToken: token } = storeToRefs(authStore)


onMounted(function () {
  const cookie = localStorage.getItem("user");
  if (cookie) { authStore.setUser(cookie) };
  console.log('-->',token.value)

  if (token.value) {
    router.push({ path: "/profile" })
  } else {
    router.push({ path: "/" })
  }
})

</script>

<template>
      <router-view />
      <ModalBox/>
</template>

<style scoped>
</style>
