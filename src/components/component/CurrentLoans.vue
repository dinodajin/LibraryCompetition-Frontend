<template>
  <div class="current-loans">
    <h3>현재 대출 도서 목록</h3>
    <div class="loaned-books-wrapper">
      <div class="loaned-books" :style="{ transform: `translateX(-${currentIndex * bookWidth}px)` }">
        <img v-for="(book, index) in loanedBooks" :key="index" :src="book" alt="Book Cover" />
      </div>
    </div>
    <div class="controls">
      <button @click="prev" :disabled="currentIndex === 0" class="nav-button">◀</button>
      <button @click="next" :disabled="currentIndex === maxIndex" class="nav-button">▶</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const loanedBooks = ref([
  new URL('./Book1.jpg', import.meta.url).href,
  new URL('./Book2.jpg', import.meta.url).href,
  new URL('./Book3.jpg', import.meta.url).href,
  new URL('./Book4.jpg', import.meta.url).href,
  new URL('./Book5.jpg', import.meta.url).href,
]);

const bookWidth = 110; // 책 이미지의 너비 + 마진 (100px + 10px)
const currentIndex = ref(0);
const booksPerPage = 2;

const maxIndex = computed(() => {
  const totalWidth = loanedBooks.value.length * bookWidth;
  const visibleWidth = booksPerPage * bookWidth;
  return Math.ceil((totalWidth - visibleWidth) / bookWidth);
});

const prev = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const next = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};
</script>

<style scoped>
.current-loans {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
}

h3 {
  margin-top: 12px;
  margin-bottom: 12px;
}

.loaned-books-wrapper {
  align-items: center;
  overflow: hidden;
  width: 300px;
  height: 150px;
}

.loaned-books {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.loaned-books img {
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.nav-button {
  background: transparent;
  border: none;
  padding: 10px;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}

.nav-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.nav-button:not(:disabled):hover {
  background: #f0f0f0;
  border-radius: 50%;
}
</style>
