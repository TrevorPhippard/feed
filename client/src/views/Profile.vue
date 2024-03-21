<script setup lang="ts">
import { onMounted } from 'vue'

import Info from '../components/Info.vue';
import NavBar from '../components/NavBar.vue';
import GameLauncher from "../components/GameLauncher.vue";
import { useEditorStore } from '../store/editorStore.ts';

var store = useEditorStore();

// getGameList
onMounted(function () {
  store.fetchGameById(1);
  store.fetchGameFromDatabase();
})
</script>

<template>
  <main>
    <NavBar />
    <div id="main-content">
          <div class="card-box">
            <h3><span class="icons" id="icon-contacts">&#9731;</span>Profile Info</h3>
            <Info />
          </div>
          <div class="card-box longer">
            <h3><span class="icons" id="icon-contacts">&#9814;</span>Game List</h3>
            <GameLauncher />
          </div>
      
    </div>
  </main>
</template>

<style scoped>
  h3{
    margin-top: 0;
  }

  h3 span{
    position: relative;
    top:-7px;
    font-size: 24px;
  }

#composer {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
}

#main-content{
  display: flex;
  padding: 10px 20px;
}

.longer{
  flex:1
}
.card-box {
  padding: 20px;
  margin-bottom: 28px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  background-color: var(--accent1);
  border-radius: 4px;
  overflow: hidden;
}

.card-box + .card-box{
  margin-left:50px
}
</style>
