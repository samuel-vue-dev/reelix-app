import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { uploadToCloudinary } from '@/cloudinary'
import { userAuth } from '@/AppState/auth'
export const blogStore = defineStore('blogs', {
  state: () => ({
    isLoading: false,
    isPosting: false,
    isPostingError: false,
    isError: false,
    isUploading: false,
    finishUploading: false,
    failToUpload: false,
    blogList: [],
    blogImage: null,
    
  }),
  actions: {
  async upLoadAction({ fileValue }) {
    this.isUploading = true;
    this.failToUpload = false;
    this.finishUploading = false;
    try {
      const uploadedUrl = await uploadToCloudinary(fileValue)
      alert(uploadedUrl) 
      this.blogImage = uploadedUrl
      this.finishUploading = true
      this.failToUpload = false;
      this.isUploading = false;

    } catch (error) {
      console.error(error)
      this.failToUpload = true;
      this.isUploading = false;
    } 
  },
 async addPost({ title, content }) {
   const auth = userAuth();
   const userId = auth.user?.uid;
   if(!this.blogImage) {
     alert('image field is required')
     return;
   };
   const postRef = collection(db, 'posts');
     try {
       await addDoc(postRef, {
            postItle: title,
            postContent: content,
            postImageUrl: this.blogImage,
            postAccepted: false,
            datePosted: Date.now(),
            authorId: userId,
            
       })
       alert('Posted')
     }catch(error) {
      alert('fail to post');
     }
  }
  }
})