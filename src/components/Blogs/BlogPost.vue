<script setup>
  import { ref, computed } from 'vue';
  import { uploadToCloudinary } from '@/cloudinary'
  import { blogStore } from '@/AppState/blogPost';
  const useBlogStore = blogStore();
  const blogTitle = ref(null);
  const blogContent = ref(null);
  const ifIsUploading = computed(() => useBlogStore.isUploading);
  const IfUploadFail = computed(() => useBlogStore.failToUpload);
  const ifSuccessfullyUploaded = computed(() => useBlogStore.finishUploading);
  async function uploadImage(e) {
   const file = e.target.files[0];
    if(!file) return;
    try {
     await useBlogStore.upLoadAction({ fileValue: file })
    }catch(error) {
    alert('Uploading Failed');
    }
   }
   
  async function postBlog() {
  if(!blogTitle.value) {
  alert('Blog Title is required')
  }
  else if(!blogContent.value) {
  alert(' Blog Content is required');
  }
  else if(!blogTitle.value && !blogContent.value) {
  alert('Both field is required') 
  }
  else {
  await useBlogStore.addPost({ title: blogTitle.value, content: blogContent.value });
  }
  }
  
</script>
<template>
  <AppHeader/>
  <div class="pt-20 md:pt-30 text-white h-screen content-center">
    <div class="p-4 max-w-[500px] mx-auto my-0">
      <div class="grid justify-center items-center">
        <label 
          for="file-upload" 
          class="relative flex flex-col justify-center items-center 
                 border-2 border-dashed border-green-500 rounded-lg 
                 px-5 py-13px h-[250px] w-auto cursor-pointer 
                 hover:bg-green-700/10 transition duration-150"
        >
         <input 
            id="file-upload" 
            type="file" 
            class="absolute opacity-0 h-full w-full cursor-pointer"
            @change="uploadImage"
          >
          <div class="text-7xl">
            <FontAwesomeIcon :icon="['fas','upload']"/>
          </div>
        <p class="text-sm font-medium text-white mt-2">
            <span class="text-green-400 font-bold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-400 mt-1">PNG, JPG, GIF (Max 10MB)</p>
          <div v-if="ifIsUploading" class="mt-2">
            <div class="flex items-center gap-2"><div class="spinner border border-[rgb(255,255,255,0.4)] border-t-white border-8 h-[10px] p-2 rounded-full"></div>Uploading....</div>
          </div>
          <div class="mt-2" v-if="IfUploadFail">
            <div class="flex items-center gap-2"><FontAwesomeIcon class="text-red-500" :icon="['fas','info-circle']"/>Fail to Upload</div>
          </div>
          <div class="mt-2" v-if="ifSuccessfullyUploaded">
            <div class="flex items-center gap-2"><FontAwesomeIcon class="text-[#3Cd371]" :icon="['fas','circle-check']"/>Uploaded Sucessfully</div>
          </div>
          </label>
      </div>
      <!-- field Inputd -->
      <div class="grid font-[roboto_condensed] mt-3">
        <label for="title">Title<span class="text-red-500 text-xl">*</span></label>
        <input v-model="blogTitle"  id="title" type="text" placeholder="Blog Title" 
          class="rounded-md p-3 border border-white border-2">
        <label for="content" class="mt-2">Content<span class="text-red-500 text-xl">*</span></label>
        <textarea v-model="blogContent" id="content" placeholder="Blog Content" rows="4"
          class="rounded-md p-3 border border-white border-2 h-[150px] w-full"></textarea>
          <button @click="postBlog" class=" rounded-sm p-3 bg-[#3Cd371] mt-2">Post Now</button>
      </div>
    </div>
  </div>
</template>