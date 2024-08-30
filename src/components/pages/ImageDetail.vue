<template>
  <div class="container">
    <Sidebar class="sidebar"/>
    <div class="main-content">
      <!-- 사용자 정의 파일 선택 버튼 -->
      <div class="file-upload-container">
        <label for="file-upload" class="file-upload-label">
          <span class="button-text">파일 선택</span>
        </label>
        <input id="file-upload" type="file" @change="handleFiles" accept="image/*" multiple class="file-input"/>
      </div>
      
      <!-- 선택된 이미지 미리보기 -->
      <div class="image-preview">
        <img v-for="(image, index) in imageList" :key="index" :src="image" :alt="'도서 표지 ' + (index + 1)" class="preview-image"/>
      </div>
      
      <!-- 이미지 업로드 버튼 -->
      <div class="upload-button-container">
        <button @click="uploadImages" class="upload-button">이미지 등록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../component/Sidebar.vue'
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
.container {
  display: grid;
  grid-template-columns: 250px auto; /* 사이드바와 메인 콘텐츠 영역의 너비 설정 */
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}

.sidebar {
  grid-column: 1 / 2; /* 사이드바를 첫 번째 열에 위치 */
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100vh; /* 사이드바가 전체 높이를 차지하도록 설정 */
  margin-top: 0;
}

.main-content {
  grid-column: 2 / 3;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  max-height: 90vh;
  flex-direction: column;
  margin: 20px 50px;
  justify-content: center;
}

.file-upload-container, .upload-button-container {
  display: flex;
  justify-content: center;
}

.file-input {
  display: none; /* 실제 파일 입력 필드를 숨깁니다 */
}

.file-upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #6a4dff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 50px;
  transition: background-color 0.3s ease;
}

.file-upload-label:hover {
  background-color: #5a3fdb;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 이미지 사이 간격 조정 */
  justify-content: center;
}

.preview-image {
  max-width: 500px; /* 이미지 최대 너비 조정 */
  max-height: 800px; /* 이미지 최대 높이 조정 */
  border-radius: 8px;
  border: 1px solid #ddd;
  object-fit: cover; /* 이미지 크기에 맞게 조정 */
}

.upload-button {
  background-color: #6a4dff;
  color: white;
  border: none;
  border-radius: 8px;
  max-height: 40px;
  padding: 10px 150px;
  font-size: 16px;
  cursor: pointer;
  margin: 50px;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #5a3fdb;
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    height: auto;
    grid-column: 1 / -1;
  }

  .main-content {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .main-content {
    gap: 20px; /* 파일 선택 버튼과 이미지 미리보기 사이의 간격을 약간 늘립니다 */
  }

  .image-preview {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 5px;
  }

  .image-preview {
    gap: 10px;
  }
}
</style>
