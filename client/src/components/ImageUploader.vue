<script setup lang="ts">
import { ref } from "vue";
import { useEditorStore } from "../store/editorStore.ts";

const store = useEditorStore();

const isDragging = ref(false);
const file = ref(false);
const clearlyNotNamed = ref(false);

function remove(){
  file.value = false;
  console.log("removed", file.value)
}

function dragover(e){
  e.preventDefault();
  isDragging.value = true;
}

function dragLeave(){
  isDragging.value = false;
}

function drop(e){
  e.preventDefault();
  onChange(e)
  isDragging.value = false;
}


function onChange(event) {
  console.log(event);

  if(event.type == "drop"){
    file.value = event.dataTransfer.files[0];
    clearlyNotNamed.value = true;
  }else{
    file.value = event.target.files[0];
    clearlyNotNamed.value = true;
  }
}

 function onSubmit() {

  const formData = new FormData();
  formData.append("file", file.value.files[0]);
  formData.append("id", "test1");
  formData.append("test","good")
  store.upload(formData);

  clearlyNotNamed.value = false;

}

</script>
<template>     
    <h4>background image: 
      <i v-if="file.files && file.files[0] && !clearlyNotNamed">{{file.files[0].name}}</i>
    </h4>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="dropzone-container" @dragover="dragover" @dragleave="dragLeave" @drop="drop">
          <input 
          name="file"
          id="fileInput"
          type="file" 
          ref="file"
          accept=".png,.jpeg,.gif"
          @change="onChange" 
          placeholder="Select Files" />
        <label for="fileInput" class="file-label" v-if="!clearlyNotNamed && file">
          <div class="dropzone"  v-if="isDragging">Release to drop file here.</div>
          <div class="dropzone" v-else>
            <h2>Drop File</h2>
            <p>or</p>
            <a class="button">browse files</a>
          </div>
        </label>
        <div class="prelaod" v-if="file.files && clearlyNotNamed">
          <p :title="file.name"> {{ file.files[0].name }}</p>
          <input type="submit" value="Submit">
        </div>

      

      </div>
    </form>
</template>

<style scoped>

h4{
  margin:10px 0;
}

.dropzone-container{
	display: flex;
}

.dropzone{
  color: var(--input-text-placeholder);
  height:125px;
  width:150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dropzone a{
  color: var(--input-text-placeholder);
}


.file-label{
  padding: 12px;
  border: 2px dashed var(--accent1);
  background-color: var(--input-bg);
}
.file-label *{
  margin: 0;
  padding: 6px 12px;
}

form {
  display: flex;
  justify-content: center;
  text-align: center;
}

input {
  display: none;
}

.button{
  display: inline-block;
  padding: 0px;
  margin: 0px;
  color: var(--input-text);
  text-decoration: underline;
}

.prelaod input[type="submit"]{
  position: relative;
	cursor: pointer;
  display: block;
}

.prelaod{
  display: flex;
  gap:10px
}
/* Plugin Style End */

</style>
