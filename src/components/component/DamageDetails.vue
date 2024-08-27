<template>
  <div class="damage-details">
    <h3>도서 훼손 기록</h3>
    <div class="damage-list">
      <div v-for="damage in damages" :key="damage.id" class="damage-item">
        <p>{{ damage.detail }}</p>
      </div>
    </div>
    <div class="bottom-space"></div> <!-- 여백 추가를 위한 div -->
  </div>
</template>

<script setup lang="ts">
const damages = [
  { id: 1, detail: '좌측 상단 훼손' },
  { id: 2, detail: '중앙 상단 훼손' },
  { id: 4, detail: '우측 상단 훼손' },
  { id: 5, detail: '좌측 중단 훼손' },
  { id: 6, detail: '중앙 중단 훼손' },
  { id: 7, detail: '우측 중단 훼손' },
  { id: 8, detail: '좌측 하단 훼손' },
  { id: 9, detail: '중앙 하단 훼손' },
  { id: 3, detail: '우측 하단 훼손' },
  // Add more details as needed
];
</script>

<style scoped>
.damage-details {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 500px; /* Adjust this value to fit the desired height */
  overflow: hidden; /* Enable vertical scrolling */
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
}

h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.damage-list {
  padding: 20px;
  overflow-y: auto;
}

.damage-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  max-width: calc(100% - 24px); /* Ensure the item doesn't exceed the parent's width */
}

.damage-item p {
  margin: 0;
  font-size: 16px;
  color: #555;
}

.damage-item:hover {
  transform: scale(1.03); /* Slightly reduce the scale factor */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Slightly reduce the shadow on hover */
}

.bottom-space {
  height: 20px; /* Adjust the height as needed for bottom margin */
}
</style>
