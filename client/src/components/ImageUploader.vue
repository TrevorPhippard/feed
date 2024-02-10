<script setup lang="ts">

import { ref, computed } from "vue";
import { useEditorStore } from '../store/editorStore.ts';

const store = useEditorStore();

const file = ref();

const fileName = computed(() => file.value.name);
const fileExtension = computed(() => fileName.value.substring(fileName.value?.lastIndexOf(".") + 1));
const fileMimeType = computed(() => file.value?.type);

const uploadFile = (event:any) => {
  file.value = event.target.files[0];
};

const submitFile = async () => {
  store.upload({
      file: file.value, 
      fileName: fileName.value, 
      fileExtension: fileExtension.value,
      fileMimeType: fileMimeType.value
  })
};

</script>
<template>
  <div>
    <input type="file" @change="uploadFile" />
    <button @click="submitFile">upload</button>
  </div>
</template>

<style scoped>
#icon-info {
    background-image: url("https://random-d.uk/api/randomimg?t=1704509234856");
    background-position: 0 -87px;
    margin-right: 10px;
}
</style>
