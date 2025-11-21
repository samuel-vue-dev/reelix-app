<script setup>
  import { ref } from 'vue';
  import{ useRouter, useRoute } from 'vue-router';
  import { searchStore } from '@/AppState/search';
  const router = useRouter();
  const route = useRoute();
  const searchStores = searchStore();
  
</script>
<template>
<AppHeader /> 
<div class="pt-25 md:pt-38 lg:pt-38 p-5">
  <div class="relative mx-auto my-0 text-white max-w-[800px]">
    <div class=" text-[16px] absolute top-3 left-2 text-grey-200"><FontAwesomeIcon :icon="['fas','search']"/></div>
    <button class="text-white bg-[#3CB371] rounded-md absolute top-[6px] right-[5px] px-3 py-2"><FontAwesomeIcon :icon="['fas','search']"/></button>
    <input type="text" placeholder="search for something" class=" px-8 p-3 text-white border border-white rounded-sm w-full">
  </div>
  <div>
    
  </div>
</div>

</template>
