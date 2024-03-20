<script setup lang="ts">
import { ref } from "vue";
import { useEditorStore } from '../store/editorStore.ts';

const store = useEditorStore();

const isDragging = ref(false);
const file = ref(false);

function remove(){
  file.value = false;
  console.log('removed', file.value)
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
  if(event.type == "drop"){
    file.value = event.dataTransfer.files[0]
  }else{
    file.value = event.target.files[0];
  }
}

async function onSubmit() {
  const formData = new FormData();
  formData.append("file", file.value.files[0]);
  formData.append("id", 'test1');
  formData.append("test","good")
  store.upload(formData)
}

</script>
<template>
    <h4>background image</h4>
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
        <label for="fileInput" class="file-label" v-if="!file.value">
          <div v-if="isDragging">Release to drop file here.</div>
          <div v-else>
            <h2>Drop File</h2>
            <p>or</p>
            <a class="button">browse files</a>
          </div>
        </label>
        <div class="prelaod" v-if="file.value">
          <p :title="file.name"> {{ file.files[0].name }}</p>
          <input type="submit" value="Submit">
        </div>
      </div>
    </form>
</template>

<style scoped>

.dropzone-container{
	display: flex;
	/* justify-content: center; */
}

.file-label{
  padding: 12px;
  border: 2px dashed #bbb7c0;
  background-color: #c6ccd5;
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
