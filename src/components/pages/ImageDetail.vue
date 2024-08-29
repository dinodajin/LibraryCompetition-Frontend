<template>
    <div>
      <!-- 파일 선택 버튼 -->
      <input type="file" @change="handleFiles" accept="image/*" multiple />
      
      <!-- 선택된 이미지 미리보기 -->
      <ul>
        <li v-for="(image, index) in imageList" :key="index">
          <img :src="image" :alt="'도서 표지 ' + (index + 1)" width="100"/>
        </li>
      </ul>
      
      <!-- 이미지 업로드 버튼 -->
      <button @click="uploadImages">Upload Images</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const imageList = ref<string[]>([]);
  const selectedFiles = ref<File[]>([]);
  
  const handleFiles = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
  
    imageList.value = [];
    selectedFiles.value = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          imageList.value.push(e.target.result as string);
          selectedFiles.value.push(file); // 선택된 파일 저장
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const uploadImages = async () => {
    const formData = new FormData();
    selectedFiles.value.forEach(file => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post('/imageForwarding/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
    display: flex; /* 가로로 나열 */
    gap: 10px; /* 이미지 간격 */
  }
  
  li {
    margin: 0; /* 상하 좌우 여백 제거 */
  }
  </style>
  