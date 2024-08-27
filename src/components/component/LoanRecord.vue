<template>
  <div class="loan-record">
    <h3>도서 대출 기록</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>대출일</th>
            <th>반납일</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id">
            <td>{{ loan.title }}</td>
            <td>{{ loan.borrowed }}</td>
            <td>{{ loan.returned || '-' }}</td>
            <td><span :class="['badge', loan.status]">{{ loan.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bottom-space"></div>
  </div>
</template>

<script setup lang="ts">
const loans = [
  { id: 1, title: '당신이 누구처럼 죽었다', borrowed: '2024-08-08', returned: null, status: '대여중' },
  { id: 2, title: '나는 도대체 왜 피곤할까', borrowed: '2024-08-08', returned: null, status: '대여중' },
  { id: 3, title: '세이노의 가르침', borrowed: '2024-08-08', returned: null, status: '대여중' },
  { id: 4, title: '기분이 태도가 되지 말자', borrowed: '2024-08-08', returned: null, status: '대여중' },
  { id: 5, title: '참을 수 없는 존재의 가벼움', borrowed: '2024-08-08', returned: null, status: '대여중' },
  { id: 6, title: 'Book 6', borrowed: '2024-07-01', returned: '2024-07-09', status: '반납' },
  { id: 6, title: 'Book 7', borrowed: '2024-06-01', returned: '2024-06-09', status: '반납' },
  { id: 6, title: 'Book 8', borrowed: '2024-05-01', returned: '2024-05-09', status: '반납' },
  { id: 6, title: 'Book 9', borrowed: '2024-04-01', returned: '2024-04-09', status: '반납' },
  { id: 6, title: 'Book 10', borrowed: '2024-03-01', returned: '2024-03-09', status: '반납' },
];
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
