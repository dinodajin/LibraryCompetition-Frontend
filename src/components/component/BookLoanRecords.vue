<template>
  <div class="loan-records">
    <h3>도서 대출 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>대출일</th>
            <th>반납일</th>
            <th>훼손유무</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loanRecords" :key="loan.id">
            <td>{{ getMemberName(loan.memberId) }}</td>
            <td>{{ loan.loanTime }}</td>
            <td>{{ loan.returnTime }}</td>
            <td><span :class="['loan-status', statusClass(loan.damageDegree)]">{{ loan.damageDegree }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-space"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const loanRecords = computed(() => store.getters.getLoanRecords);

const getMemberName = (memberId: string) => {
  return store.getters.getMemberById(memberId);
};

const statusClass = (status: string) => {
  switch (status) {
    case '훼손':
      return 'danger';
    case '정상':
      return 'safe';
    default:
      return '';
  }
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
.loan-records {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  max-height: 300px; /* Adjust this value to fit 5 rows */
  overflow: hidden; /* Hide any overflow to ensure scroll only appears on the table container */
  font-size: 1rem;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.table-container {
  max-height: 100%;
  margin-bottom: 16px; /* Add margin at the bottom of the table container */
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
}

th {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  padding: 15px;
}

td {
  padding: 15px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
}

.loan-status {
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

.bottom-space {
  height: 20px; /* Adjust the height as needed for bottom margin */
}
</style>
