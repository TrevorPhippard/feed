<script setup lang="ts">

import { useAuthStore } from '../store/authStore.ts';
import { storeToRefs } from 'pinia';

const store = useAuthStore();

const {
  getusername: username,
} = storeToRefs(store)


</script>

<template>
  <div id="profile-upper">
    <div id="profile-banner-image">
      <img src="" alt="Banner image">
    </div>
    <div id="profile-d">
      <div id="profile-pic">
        <img src="">
      </div>
      <div id="u-name">{{ username }}</div>
    </div>
    <div id="black-grd"></div>
  </div>
</template>

<style scoped>
/* Profile image header */
#profile-upper {
  position: relative;
}

#profile-d {
  position: absolute;
  left: 59px;
  bottom: 0px;
  right: 0px;
  height: 180px;
  z-index: 2;
}

#profile-banner-image {
  height: 360px;
  overflow: hidden;
  z-index: 1;
}

#profile-banner-image img {
  width: 100%;
  margin-top: -20%;
}

#profile-pic {
  width: 180px;
  height: 180px;
  border-radius: 3px;
  margin-top: 28px;
  overflow: hidden;
  box-shadow: 0 0 0 5px #fff;
}

#profile-pic img {
  width: 100%;
}

#u-name {
  position: absolute;
  top: 120px;
  left: 208px;
  color: #fff;
  font-size: 36px;
  font-weight: bold;
}



#edit-profile {
  position: absolute;
  right: 20px;
  bottom: 21px;
  line-height: 1;
  cursor: pointer;
}

#edit-profile i {
  display: block;
  color: rgba(255, 255, 255, 0.7);
}

#black-grd {
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0) 71%, rgba(0, 0, 0, 0.53));
  z-index: 1;
}

/* Profile image header finished */
</style>
