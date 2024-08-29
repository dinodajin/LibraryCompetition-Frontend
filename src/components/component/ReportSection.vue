<template>
  <div class="report-section">
    <div class="headline">
      <h3>훼손 내용 제보</h3>
      <a href="#" class="view-all"><strong>View All</strong></a>
    </div>
    <div class="report-list">
      <div class="report-item" v-for="loan in loanRecords" :key="loan.id">
        <div class="member-info">
          <strong>{{ getMemberName(loan.memberId) }}</strong>
        </div>
        <p>{{ loan.declaration }}</p>
      </div>
    </div>
    <div class="bottom-space"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const loanRecords = computed(() => store.getters.getLoanRecords);

const getMemberName = (memberId: string) => {
  return store.getters.getMemberById(memberId);
};

// 컴포넌트가 마운트될 때 대출 기록을 가져옴
onMounted(() => {
  const bookId = route.query.id as string;
  if (bookId) {
    store.dispatch('fetchLoanRecords', bookId);
    store.dispatch('fetchMembers');
  }
});
</script>

<style scoped>
.report-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: auto;
  max-height: 300px;
  overflow: hidden;
  box-sizing: border-box;
}

.headline {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.view-all {
  display: flex;
  text-align: right;
  color: #007bff;
  margin: 5px 0 20px 70px;
  text-decoration: none;
  font-size: 12px;
}

.report-list {
  max-height: auto;
  padding: 20px;
  padding-bottom: 20px; /* 추가: 아래쪽 여백을 추가하여 컴포넌트 내에서 스크롤 시 신고 내용들이 잘려 보이지 않도록 함 */
  overflow-y: auto;
}

.report-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  max-width: calc(100% - 24px);
}

.report-item:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.member-info {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

p {
  margin: 0;
  color: #666;
}

.bottom-space {
  height: 20px;
}
</style>
