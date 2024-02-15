<script setup lang="ts">
import { ref } from "vue";
import { useEditorStore } from '../store/editorStore.ts';

const store = useEditorStore();

const file = ref();
const message = ref(' ');

function onSelect() {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  const fileMeta = file.value.files[0];

  if (!allowedTypes.includes(fileMeta.type)) {
    message.value = "Filetype is wrong!!"
  }else if (fileMeta.size > 500000) {
    message.value = 'Too large, max size allowed is 500kb'
  }else{
    message.value = ''
  }
}

async function onSubmit() {
  
  const formData = new FormData();
  formData.append("file", file.value.files[0]);
  formData.append("id", 7878);

  store.upload(formData)
  message.value = 'Uploaded!!'
}

</script>
<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label><br />
        <input type="file" ref="file" @change="onSelect" />
      </div>
      <div class="fields">
        <button :disabled=" message !== ''" >Submit</button>
      </div>
      <div class="message">
        <h5>{{ message }}</h5>
      </div>
    </form>
  </div>
</template>

<style scoped>
#icon-info {
  background-image: url("https://random-d.uk/api/randomimg?t=1704509234856");
  background-position: 0 -87px;
  margin-right: 10px;
}
</style>
