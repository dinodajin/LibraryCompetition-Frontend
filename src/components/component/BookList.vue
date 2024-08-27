<!-- bookList.vue -->
<template>
    <div class="book-list">
      <h3>Books</h3>
      <div class="list-container">
        <table>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>WRITER</th>
              <th>NUMBER</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id" class="book-row" @click="goToBookDetail(book.id)">
              <td>{{ book.title }}</td>
              <td>{{ book.writer }}</td>
              <td>{{ book.number }}</td>
              <td><span :class="['book-status', statusClass(book.status)]">{{ book.status }}</span></td>
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
  
  const books = [
    { id: 1, title: 'book1', writer: 'writer1', number: '1', status: '위험' },
    { id: 2, title: 'book2', writer: 'writer2', number: '2', status: '양호' },
    { id: 3, title: 'book3', writer: 'writer3', number: '3', status: '청정' },
    { id: 4, title: 'book4', writer: 'writer4', number: '4', status: '경고' },
    { id: 5, title: 'book5', writer: 'writer5', number: '5', status: '기타' },
    { id: 5, title: 'book6', writer: 'writer6', number: '6', status: '위험' },
    { id: 5, title: 'book7', writer: 'writer7', number: '7', status: '양호' },
    { id: 5, title: 'book8', writer: 'writer8', number: '8', status: '청정' },
    { id: 5, title: 'book9', writer: 'writer9', number: '9', status: '경고' },
    { id: 5, title: 'book10', writer: 'writer10', number: '10', status: '기타' },
    // 더 많은 유저 추가 가능
  ];
  
  const statusClass = (status: string) => {
    switch (status) {
      case '위험':
        return 'danger';
      case '양호':
        return 'safe';
      case '청정':
        return 'normal';
      case '경고':
        return 'warning';
      default:
        return 'other';
    }
  };
  </script>
  
  <style scoped>
  .book-list {
    display: flex;
    flex-direction: column;
    width: auto;
    overflow-x: auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    max-height: 400px; /* Adjust this value to fit 5 rows */
    min-height: 400px;
    box-sizing: border-box;
    overflow: hidden;
    font-size: 1rem;
  }
  
  .list-container {
    max-height: 100%;
    border-collapse: collapse;
    overflow-y: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    padding: 16px;
  }
  
  thead {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;
  }
  
  thead th {
    font-size: 16px;
    font-weight: 600;
    color: #666;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    padding: 15px;
  }
  
  tbody td {
    padding: 15px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  
  .book-row {
    transition: transform 0.2s ease-in-out;
  }
  
  .book-row:hover {
    transform: scale(1.02);
  }
  
  .book-status {
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
  
  .normal {
    background-color: #ebf0ff;
    color: #3498db;
  }
  
  .warning {
    background-color: #fff5e6;
    color: #f39c12;
  }
  
  .other {
    background-color: #f0f0f5;
    color: #999;
  }
  </style>
  