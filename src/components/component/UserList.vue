<!-- UserList.vue -->
<template>
  <div class="user-list">
    <h3>Users</h3>
    <div class="list-container">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>E-MAIL</th>
            <th>NUMBER</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="user-row" @click="goToUserDetail(user.id)">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.number }}</td>
            <td><span :class="['user-status', statusClass(user.status)]">{{ user.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToUserDetail = (userId: number) => {
  router.push({ path: '/userdetail', query: { id: userId } });
};

const users = [
  { id: 1, name: 'ByeWind', email: 'User1@gmail.com', number: '010-1234-5678', status: '위험' },
  { id: 2, name: 'Natali Craig', email: 'User2@gmail.com', number: '010-2345-6789', status: '양호' },
  { id: 3, name: 'Drew Cano', email: 'User3@gmail.com', number: '010-3456-7890', status: '정정' },
  { id: 4, name: 'Matt Damon', email: 'User4@gmail.com', number: '010-4567-8901', status: '경고' },
  { id: 5, name: 'Andi Lane', email: 'User5@gmail.com', number: '010-5678-9012', status: '기타' },
  // 더 많은 유저 추가 가능
];

const statusClass = (status: string) => {
  switch (status) {
    case '위험':
      return 'danger';
    case '양호':
      return 'safe';
    case '정정':
      return 'normal';
    case '경고':
      return 'warning';
    default:
      return 'other';
  }
};
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  width: auto;
  overflow-x: auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-height: 400px; /* Adjust this value to fit 5 rows */
  min-height: 400px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1rem;
}

.list-container {
  max-height: 100%;
  border-collapse: collapse;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  padding: 16px;
}

thead {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
}

thead th {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  padding: 15px;
}

tbody td {
  padding: 15px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
}

.user-row {
  transition: transform 0.2s ease-in-out;
}

.user-row:hover {
  transform: scale(1.02);
}

.user-status {
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.danger {
  background-color: #ffebe6;
  color: #e74c3c;
}

.safe {
  background-color: #e6f7e6;
  color: #27ae60;
}

.normal {
  background-color: #ebf0ff;
  color: #3498db;
}

.warning {
  background-color: #fff5e6;
  color: #f39c12;
}

.other {
  background-color: #f0f0f5;
  color: #999;
}
</style>
