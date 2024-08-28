<!-- BadUserList.vue -->
<template>
  <div class="bad-member-container">
    <h3>불량 사용자 리스트</h3>
    <div class="bad-member-list">
    <ul>
      <li v-for="member in badMembers" 
      :key="member.id" class="bad-member-item" 
      @click="goToMemberDetail(member.id)">
        {{ member.name }}
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToMemberDetail = (memberId: number) => {
  router.push({ path: '/memberdetail', query: { id: memberId } });
};

const badMembers = [
  { id: 1, name: 'Natali Craig' },
  { id: 2, name: 'Drew Cano' },
  { id: 3, name: 'Andi Lane' },
  { id: 4, name: 'Koray Okumus' },
  { id: 5, name: 'Kate Morrison' },
  { id: 6, name: 'Melody Macy' },
  { id: 7, name: 'Megan Bowen' },
  { id: 8, name: 'Ava Peters' },
  { id: 9, name: 'Leo Johnson' },
  { id: 10, name: 'Isabella Brown' },
  { id: 11, name: 'Mason Smith' },
  { id: 12, name: 'Sophia Davis' },
  { id: 13, name: 'Liam Wilson' },
  { id: 14, name: 'Oliver Martinez' },
  { id: 15, name: 'Amelia Anderson' },
  { id: 16, name: 'James Thomas' },
];
</script>

<style scoped>
.bad-member-container {
  display: flex;
  flex-direction: column;
  flex: 0.5;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-height: 400px; /* Adjust this value to fit 5 rows */
  box-sizing: border-box;
  overflow: hidden; /* Hide any overflow to ensure scroll only appears on the table container */
  font-size: 1rem;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bad-member-list {
  padding: 20px;
  overflow-y: auto;
}

.bad-member-item {
  flex: 1 1 calc(50% - 10px); /* 2개씩 블럭 형태로 배치 */
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: #666;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  overflow-y: auto;
}

.bad-member-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
