<!-- MyLibrary.vue -->
<template>
  <div class="container">
    <Sidebar />
    <div class="main-content">
      <SearchBar />
      <UserList />
      <div class="bottom-content">
        <UserStatusRatio />
        <BadUserList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../component/Sidebar.vue'
import SearchBar from '../component/SearchBar.vue'
import UserList from '../component/UserList.vue'
import UserStatusRatio from '../component/UserStatusRation.vue'
import BadUserList from '../component/BadUserList.vue'
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
