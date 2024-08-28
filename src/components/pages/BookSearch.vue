<!-- MyLibrary.vue -->
<template>
  <div class="container">
    <Sidebar />
    <div class="main-content">
      <SearchBar />
      <BookList />
      <div class="bottom-content">
        <MemberStatusRatio />
        <DamagedBookList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../component/Sidebar.vue'
import SearchBar from '../component/SearchBar.vue'
import BookList from '../component/BookList.vue'
import MemberStatusRatio from '../component/MemberStatusRation.vue'
import DamagedBookList from '../component/DamagedBookList.vue'
</script>

<style scoped>
.container {
  display: flex;
  background-color: #f5f7fa;
}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
