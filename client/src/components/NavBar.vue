<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const { username } = defineProps(['username'])


function logout() {
  localStorage.removeItem("user");
  router.push({ path: '/' })
}

var placeholderAvatar = import.meta.env.VITE_API_ENDPOINT + '/api/images/b.jpg'

</script>

<template>
  <header>
    <nav>
      <div id="logo">&#10070;</div>
      <div id="search-form">
        <form method="get" action="#">
          <input type="text" placeholder="Search User Network"><i>&#128269;</i>
        </form>
      </div>
      <ul>
        <li class="user-section">
          <a href="#" id="p-link">
            <img :src="placeholderAvatar"></a>
          <span>{{ username }}</span>
        </li>
        <li v-for="(route, index) in router.options.routes" :key="index">
          <router-link :to="route.path">
            {{ route.name }}
          </router-link>
        </li>
        <li class="link" @click="logout"><a href="#">/log out</a></li>
      </ul>
      <div></div>
    </nav>
  </header>
</template>

<style scoped>
#p-link img {
  display: block;
  width: 50px;
  height: 50px;
  background-color: #f1f1f1;
  border-radius: 50%;
  overflow: hidden;
  background-position: 50% 25%;
  background-size: cover;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
}

ul {
  display: flex;
  list-style: none;
  align-items: center;
}

ul li {
  margin-right: 10px;
}

ul li a {
  color: white;
}

.user-section {
  display: flex;
}

.user-section a {
  margin-right: 10px;
}

#logo {
  width: 30px;
  height: 30px;
  padding: 0 15px;
  font-size: 44px;
  line-height: 30px;
  color: #f1cb25;
}

#search-form form {
  position: relative;
  width: 280px;
  font-size: 16px;
  background-color: rgb(50, 51, 80);
  border-radius: 20px;
  height: 30px;
  display: flex;
}

#search-form form input {
  width: 100%;
  color: #fff;
  border: 0;
  background-color: transparent;
}

#search-form form i {
  position: absolute;
  top: 4px;
  right: 12px;
  color: #f1f1f1;
  height: 22px;
  cursor: pointer;
}

#search-form form button i {
  font-size: 22px;
}

/* Footer finished */
</style>
