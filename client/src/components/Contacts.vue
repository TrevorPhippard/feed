<script setup lang="ts">

</script>

<template>
  <div class="card-header">
    <div>
      <i class="icons" id="icon-contacts">&#9731;</i>
      <span>Contacts Online</span>
    </div>
  </div>
  <ul class="contact-list">
    <li id="profile-0" class="contact">1</li>
    <li id="profile-1" class="contact">2</li>
    <li id="profile-2" class="contact">3</li>
    <li id="profile-3" class="contact">4</li>
    <li id="profile-4" class="contact">5</li>
  </ul>
</template>
<style scoped>
#icon-contacts {
  margin-right: 10px;
}

.contact-list {
  padding: 0;
  margin: 0;
  -ms-box-orient: horizontal;
  display: flex;
  width: 360px;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  list-style: none;
}

.contact {
  padding: 5px;
  width: 100px;
  height: 100px;
  margin: 10px;

  line-height: 100px;
  color: white;
  font-weight: bold;
  font-size: 2em;
  text-align: center;

  border: 2px solid #fff;
  box-sizing: border-box;
  background-color: #f1f1f1;
  background-position: 50% 25%;
  background-size: cover;
}

.profile-0{
background-image: url("../assets//duck-0.jpg");
}
.profile-1{
background-image: url("../assets//duck-1.jpg");
}
.profile-2{
background-image: url("../assets//duck-2.jpg");
}
.profile-3{
background-image: url("../assets//duck-3.jpg");
}
.profile-4{
background-image: url("../assets//duck-4.jpg");
}

</style>
