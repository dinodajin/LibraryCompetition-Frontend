<template>
  <div class="return-record">
    <h3>도서 훼손 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>훼손 유무</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.bookId" class="record-row" @click="goToBookDetail(record.bookId)">
            <td>{{ record.title }}</td>
            <td>{{ record.damage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const memberId = route.query.id as string;

const records = ref<{ bookId: number, damage: string, title: string }[]>([]);

const goToBookDetail = (bookId: number) => {
  router.push({ path: '/bookdetail', query: { id: bookId } });
};

onMounted(async () => {
  if (memberId) {
    await store.dispatch('fetchLoanRecordsByMemberId', memberId);

    const loanRecords = store.state.loanRecords;

    const filteredRecordsWithDetails = await Promise.all(
      loanRecords
        .filter(record => record.damageDegree === '훼손')
        .map(async (record) => {
          const book = await store.dispatch('fetchBookById', record.bookId);

          return {
            bookId: record.bookId,
            damage: record.damageDegree,
            title: book ? book.bookTitle : 'Unknown Title'
          };
        })
    );
    records.value = filteredRecordsWithDetails;
  }
});
</script>
<style scoped>
.return-record {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  height: 350px;
  overflow: hidden;
  font-size: 1rem;
  box-sizing: border-box;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.table-container {
  max-height: 100%;
  margin-bottom: 16px;
  overflow-y: auto;
  border: 1px #ddd;
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

.record-row {
  transition: transform 0.2s ease-in-out;
}

.record-row:hover {
  transform: scale(1.02);
}
</style>
