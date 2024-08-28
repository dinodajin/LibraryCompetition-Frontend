<!-- Sidebar.vue -->
<template>
  <aside class="sidebar">
    <div class="logo">MyLibrary</div>
    <nav>
      <ul>
        <li class="nav-item" @click="goToMemberPage">사용자 정보</li>
        <li class="nav-item" @click="goToBookPage">도서 정보</li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMemberPage = () => {
  router.push({ path: '/member'});
};

const goToBookPage = () => {
  router.push({ path: '/book'});
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #6a4dff;
  margin-bottom: 40px;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
  background-color: #f0f0f5;
  color: #6a4dff;
  cursor: pointer;
}
</style>
