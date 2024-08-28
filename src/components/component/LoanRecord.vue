<template>
  <div class="loan-records">
    <h3>도서 대출 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>대출일</th>
            <th>반납일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in formattedLoans" :key="loan.id">
            <td>{{ getBookTitle(loan.bookId) }}</td>
            <td>{{ loan.loanTime }}</td>
            <td>{{ loan.returnTime || '-' }}</td>
            <td><span :class="['badge', loan.status]">{{ loan.status }}</span></td>
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
const bookList = computed(() => store.getters.getBookList);

const getBookTitle = (bookId: string) => {
  return store.getters.getBookById(bookId);
};

const formattedLoans = computed(() => {
  return loanRecords.value.map(loan => {
    const book = bookList.value.find(b => b.bookId === loan.bookId);
    return {
      ...loan,
      title: book ? book.bookTitle : 'Unknown Book',
      status: loan.returnTime ? '반납' : '대여중'
    };
  });
});

// 컴포넌트가 마운트될 때 대출 기록을 가져옴
onMounted(() => {
  const bookId = route.query.id as string;
  if (bookId) {
    store.dispatch('fetchBooks');
  }
});
</script>

<style scoped>
.loan-record {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  max-height: 300px; /* Adjust this value to fit 5 rows */
  overflow: hidden;
  font-size: 1rem;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.table-container {
  max-height: 100%; /* Adjust this value as needed */
  margin-bottom: 16px;
  overflow-y: auto;
  border: 1px #ddd; /* Optional: Adds border around the scrollable area */
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

.badge {
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.대여중 {
  background-color: #fff5e6;
  color: #f39c12;
}

/* .연체 {
  background-color: #ff7f7f;
} */

.반납 {
  background-color: #e6f7e6;
  color: #27ae60;
}

.bottom-space {
  height: 20px; /* Adjust the height as needed for bottom margin */
}
</style>
