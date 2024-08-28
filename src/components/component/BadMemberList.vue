<template>
  <div class="bad-member-container">
    <h3>불량 사용자 리스트</h3>
    <div class="bad-member-list">
      <ul>
        <li v-for="member in badMembers" 
            :key="member.id" 
            class="bad-member-item" 
            @click="goToMemberDetail(member.id)">
          {{ member.memberName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const badMembers = computed(() => store.getters.getBadMemberList);

const goToMemberDetail = (memberId: number) => {
  router.push({ path: '/memberdetail', query: { id: memberId } });
};

// 컴포넌트가 마운트될 때 회원 목록을 가져옴
onMounted(() => {
  store.dispatch('fetchMembers');
});
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
