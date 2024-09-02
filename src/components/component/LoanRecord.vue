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
.loan-records {
  background: #fff; /* 전체 배경을 흰색으로 설정 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.table-container {
  margin-bottom: 16px;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff; /* 테이블 배경을 흰색으로 설정 */
}

thead {
  position: sticky;
  top: 0;
  background-color: #fff; /* 헤더 배경을 흰색으로 설정 */
  z-index: 1;
}

th {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid #eee;
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

.반납 {
  background-color: #e6f7e6;
  color: #27ae60;
}

.bottom-space {
  height: 20px;
}
</style>
