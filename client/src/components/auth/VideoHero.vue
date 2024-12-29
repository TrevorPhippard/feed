<script setup lang="ts">
import Logo from "../../components/Logo.vue";
</script>

<template>
 <div class="home">
      <video muted loop autoplay>
        <source src="https://video.motionplaces.com/motionplaces.com-0031-c021.mp4" type="video/mp4">
      </video>
      <div class="home-content">
        <Logo/>
        <slot></slot> 
    </div>
    </div>
</template>
<style scoped>

.home-content {
    position: relative;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    padding-top: 90px;
}

.home {
    height: auto;
    position: absolute;
}


.home video {
    position: absolute;
    width: 100%;
    height: 65%;
    object-fit: cover;
    border-radius:0 0 20px 20px;
    opacity:50%;
}

</style>

