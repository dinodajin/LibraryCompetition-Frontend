<template>
  <div class="return-record">
    <h3>도서 훼손 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>훼손 내용</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id" class="record-row" @click="goToBookDetail(record.id)">
            <td>{{ record.title }}</td>
            <td>{{ record.damage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBookDetail = (bookId: number) => {
  router.push({ path: '/bookdetail', query: { id: bookId } });
};

const records = [
  { id: 1, title: 'Book 6', damage: '표지 오염'},
  { id: 2, title: 'Book 7', damage: '표지 찢어짐'},
  { id: 3, title: 'Book 9', damage: '표지 낙서'},
];

</script>

<style scoped>
.return-record {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  height: 350px; /* Adjust this value to fit 5 rows */
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
  max-height: 100%; /* Adjust this value as needed */
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

/* .badge {
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
} */

/* .훼손 {
  background-color: #ffebe6;
  color: #e74c3c;
} */
</style>
