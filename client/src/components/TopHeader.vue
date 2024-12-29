<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore";
import LogoSide from "../components/LogoSide.vue";


const authStore = useAuthStore();

const router = useRouter();
const { getusername: username } = storeToRefs(authStore)


function logout() {
  localStorage.removeItem("user");
  router.push({ path: "/" })
}

var placeholderAvatar ="https://placeholder.pagebee.io/api/random/300/200"

//import.meta.env.VITE_BASE_ENDPOINT + "images/b.jpg"

</script>

<template>
  <div class="headerCont">
    <nav>
        <img :src="placeholderAvatar">
        <ul>
          <li><h3>{{ username }}</h3></li>
          <li class="link" @click="logout">log out</li>
        </ul>
    </nav>
    <LogoSide/>
  </div>
</template>
<style scoped>
.headerCont{
  display: flex;
  justify-content: space-between;
}

.link{
  text-decoration: underline;
  cursor: pointer;
}

nav{
  display: flex;
  margin-bottom:20px;
}

img{
  margin-right:10px;
}

 img {
  display: block;
  width: 50px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 50%;
  overflow: hidden;
  background-position: 50% 25%;
  background-size: cover;
}
</style>
