<!-- SearchBar.vue -->
<template>
  <div class="search-bar">
    <form @submit.prevent="handleSubmit" class="input-container">
      <input type="text" v-model="searchQuery" placeholder="Search..." />
      <button type="submit" class="search-button">
        🔍
      </button>
    </form>
    <div class="settings-icon" @click="toggleSettings">
      ⚙️
    </div>
    <div v-if="showSettings" class="settings-popup">
      <div class="setting-option">Option 1</div>
      <div class="setting-option">Option 2</div>
      <div class="setting-option">Option 3</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 검색어를 저장할 변수
const searchQuery = ref('');

// 설정 팝업 표시 여부를 저장할 변수
const showSettings = ref(false);

// 설정 팝업을 토글하는 함수
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

// 폼이 제출될 때 호출되는 함수
const handleSubmit = () => {
  // 여기에 검색 로직을 추가하면 됩니다.
  console.log('검색어:', searchQuery.value);
  // 검색어를 서버로 전송하거나, 로컬에서 필터링을 할 수 있습니다.
};

// 페이지 외부 클릭 시 설정 팝업을 닫는 함수
const onClickOutside = (event: MouseEvent) => {
  const settingsPopup = document.querySelector('.settings-popup');
  if (settingsPopup && !settingsPopup.contains(event.target as Node)) {
    showSettings.value = false;
  }
};

// 페이지가 마운트되었을 때 이벤트 리스너 추가
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

// 페이지가 언마운트되었을 때 이벤트 리스너 제거
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.input-container {
  position: relative;
  flex: 0.7;
}

input {
  width: 100%;
  padding: 10px 50px 10px 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: #f5f7fa;
}

.search-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.search-button:hover {
  transform: translateY(-50%) scale(1.2);
}

.settings-icon {
  margin-left: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.settings-icon:hover {
  transform: scale(1.2);
}

.search-bar > .settings-icon {
  z-index: 10;
}

.settings-popup {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting-option {
  padding: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.setting-option:hover {
  background-color: #f0f0f5;
  border-radius: 5px;
}
</style>
