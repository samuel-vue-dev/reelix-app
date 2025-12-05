<script setup>
  import { ref } from 'vue';
  
</script>
<template>
  <AppHeader/>
  <div class="pt-20 md:pt-30">
    <div class="p-3">
      <div class="grid justify-center items-center">
        <input type="file" class="h-[150px] w-auto" accept="images/*">
      </div>
      <!-- field Inputd -->
      <div class="">
        <label>Title</label>
        <input type="text" class="p-3 border border-white border-2">
        <label>Content</label>
        <input type="text"class="p-3 border border-white border-2">
      </div>
    </div>
  </div>
</template>