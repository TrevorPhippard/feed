<script setup lang="ts">

import plusCircle from "../assets/plus-circle.svg";
import user from "../assets/user.svg";

var props = defineProps({
    online: Boolean,
    username: String,
    // imgSrc: String,
})

function goToEdit(){
    console.log('test!')
}

</script>
<template>
        <li @click="goToEdit()">
            <div class="iconCont">
                <div>
                    <img  class="userIcon" :src="user" alt=""/>
                    <div :class="`status ${props.online ?'online':'offline'}`"></div>
                </div>
                <h2>{{props.username}}</h2>
            </div>
            <img class="addUserBtn" :src="plusCircle" alt=""/>
        </li>
     </template>
<style scoped>

.iconCont{
    position:relative;
    display: flex;
    align-items: center;
}

img.addUserBtn{
    cursor: pointer;
    border-radius: 50%;
    height:20px
}
img.addUserBtn:hover{
    background-color: var(--accent1-hover);
   
}

img.userIcon{
    background-color: var(--primary);
    border-radius: 50%;
    padding:5px;
}

h2{
    font-size:22px;
    margin-bottom:0px;
}

li{
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
}

li img{
    margin-right:10px;
}

.status{
    position:absolute;
    bottom:5px;
    left:25px;
    height:10px;
    width:10px;
    border-radius: 50%;
}

.online{
    background-color:var(--online);
}

.offline{
    background-color:var(--offline);
}
</style>
