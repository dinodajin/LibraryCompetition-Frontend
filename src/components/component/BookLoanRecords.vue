<template>
  <div class="loan-records">
    <h3>도서 대출 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>대출일</th>
            <th>반납일</th>
            <th>훼손유무</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id">
            <td>{{ loan.name }}</td>
            <td>{{ loan.borrowed }}</td>
            <td>{{ loan.returned }}</td>
            <td><span :class="['loan-status', statusClass(loan.status)]">{{ loan.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-space"></div>
  </div>
</template>

<script setup lang="ts">
const loans = [
  { id: 1, name: '이하연', borrowed: '2024-08-03', returned: '2024-08-10', status: '훼손' },
  { id: 2, name: '김민준', borrowed: '2024-06-12', returned: '2024-06-19', status: '정상' },
  { id: 3, name: '이수빈', borrowed: '2024-05-12', returned: '2024-05-19', status: '훼손' },
  { id: 4, name: '박지훈', borrowed: '2024-04-12', returned: '2024-04-19', status: '훼손' },
  { id: 5, name: '최지현', borrowed: '2024-03-12', returned: '2024-03-19', status: '정상' },
  { id: 6, name: '윤지훈', borrowed: '2024-02-12', returned: '2024-02-19', status: '훼손' },
  { id: 7, name: '강나래', borrowed: '2024-01-12', returned: '2024-01-19', status: '정상' },
  { id: 8, name: '이예린', borrowed: '2023-12-12', returned: '2023-12-19', status: '정상' },
  // More loans...
];

const statusClass = (status: string) => {
  switch (status) {
    case '훼손':
      return 'danger';
    case '정상':
      return 'safe';
  }
}
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
