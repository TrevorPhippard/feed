<script setup lang="ts">
import { useAuthStore } from '../store/authStore.ts';
import { storeToRefs } from 'pinia';
const store = useAuthStore();
const {
  getusername: username,
} = storeToRefs(store)

var placeholderAvatar = import.meta.env.VITE_API_ENDPOINT + '/images/b.jpg'


</script>

<template>
  <div class="card-header">

    <div>
      <img class="profile-pic" :src="placeholderAvatar">
    </div>
    <div>
      <i class="icons" id="icon-info">&#9990;</i>
      <span>Intro</span>
    </div>
    <div class="lb-action"><i class="materiaiconscons">edit</i></div>
  </div>

  <div id="i-box">
    <div id="u-occ">Username: {{ username }}</div>
    <div id="u-occ">First you get the water, than you get the wemons</div>
    <div id="u-loc"><i class="materiaiconscons">location: </i><a href="#">Pond</a>, <a href="#">Plesantville</a></div>
  </div>
</template>
<style scoped>
.profile-pic {
  height: 150px;
  width: 150px;
}

#icon-info {
  margin-right: 10px;
}

#b-i i {
  font-size: 24px;
}

#i-box {
  color: #797979;
  font-size: 14px;
  line-height: 1.3;
}

#intro-line {
  margin-top: 17px;
}

#u-occ {
  margin: 10px 0px;
}

#u-occ a {
  color: #2196f3;
}

#u-loc i {
  color: #2196f3;
  font-size: 16px;
  margin-left: -3px;
  margin-right: 2px;
  margin-top: -1px;
  vertical-align: middle;
}

#u-loc a {
  position: relative;
  top: 1px;
  color: #2196f3;
}


.lb-action {
  cursor: pointer;
  float: right;
}

.lb-action i {
  color: #ccc;
  font-size: 18px;
}
</style>
