<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './store/authStore.ts';
import { storeToRefs } from 'pinia';

const location = useRoute();
const router = useRouter();
const store = useAuthStore();

const { getToken: token } = storeToRefs(store)

onMounted(function () {
  var cookie = localStorage.getItem("user");
  if (cookie) { store.setUser(cookie) };
  if (token) {
    router.push({ path: '/profile' })
  } else {
    router.push({ path: '/' })
  }
})

</script>

<template>
  <div id="page-container">
    <div id="content-wrap">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#page-container {
  position: relative;
  min-height: 100vh;

}

#content-wrap {
  padding-bottom: 2.5rem;

  /* Footer height */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  /* Footer height */
}

nav ul {
  display: flex;
}

nav li {
  margin-left: 10px;
  list-style: none;
}
</style>
