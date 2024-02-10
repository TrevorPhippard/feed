<script setup lang="ts">

import ImageUploader from '../components/ImageUploader.vue';
import Info from '../components/Info.vue';
import Contacts from '../components/Contacts.vue';
import Socket from '../components/Socket.vue';
import NavBar from '../components/NavBar.vue'; 

</script>

<template>
<main>
  <NavBar />
  <div id="main-content">
    <div class="column_container">
      <div  >
        <div class="card-box">
          <Info/>
          <hr/>
          <ImageUploader/>
          </div>
        <div class="card-box">
          <Contacts/>
          </div>
      </div>
      <div id="m-col">
        <div class="card-box" >
          <Socket/>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>
#composer {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
}

</style>
