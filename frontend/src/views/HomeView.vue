<script setup lang="ts">
const baseURL = 'localhost:3000'
const onFileChanged = async (event: Event) => {
  const target = event.target
  console.log(target.files[0])

  /* await fetch(`${baseURL}/upload-file`, { */
  /*   method: 'POST', */
  /*   headers: { */
  /*     'Content-Type': 'application/json' */
  /*   }, */
  /*   body: file */
  /* }) */
}
</script>

<template>
  <main>
    <h1 class="text-center text-8xl mb-20">Image upload app</h1>
    <div class="text-center">
      <input type="file" @change="onFileChanged" accept="image/*" capture />
    </div>
  </main>
</template>
