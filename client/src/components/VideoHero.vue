<script setup lang="ts">
// import backgroundVideo from "./pexels-cottonbro-7322349 (2160p).mp4";

</script>

<template>
 <div class="home">
      <video muted loop autoplay>
        <source src="https://video.motionplaces.com/motionplaces.com-0044-c217.mp4" type="video/mp4">
      </video>
      <div class="home-content">
        <h1>Fleefer</h1>
        <p>Where the fun begins!</p>
        <slot></slot> 
        </div>
    </div>
</template>
<style scoped>
*, ::before, ::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: roboto, sans-serif;
}
body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.home {
    height: 100vh;
    position: relative;
}
video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.home-content {
    position: relative;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: 100vw;
}




h1 {
    font-family: Playfair Display, serif;
    font-size: clamp(45px, 7vw, 130px);
    line-height: 1.1;
    text-shadow: 0px 3px 13px rgba(0, 0, 0, .2);
}

.home p {
    font-size: clamp(25px, 4vw, 40px);
    margin-top: 10px;
    text-shadow: 0px 3px 13px rgba(0, 0, 0, .2);
}

</style>

