<template>
    <div class="book-profile">
      <img src="./Book1.jpg" alt="Book Cover" class="book-cover" />
      <div class="book-details">
        <table>
            <tbody>
            <tr> 
                <!-- TITLE -->
                <th>TITLE</th>
                <td v-for="loan in loans" :key="loan.title">{{ loan.title }}</td>
            </tr>
            <tr>
                <!-- WRITER -->
                <th>WRITER</th>
                <td v-for="loan in loans" :key="loan.title">{{ loan.writer }}</td>
            </tr>
            <tr>
                <!-- BOOK NUMBER -->
                <th>NUMBER</th>
                <td v-for="loan in loans" :key="loan.title">{{ loan.book_number }}</td>
            </tr>
            </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const loans = [
  { title: '당신이 누군가를 죽였다', writer: '히가시노 게이고', book_number: '811.5 윤225.o.히 c.2' }
  // More loans
];
</script>
  
  <style scoped>
  .book-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 16px;
    font-size: 1rem;
  }
  
  .book-cover {
    height: 200px;
    margin-bottom: 16px;
    border-radius: 8px;
  }
  
  .book-details td, th, p {
    text-align: left;
    margin: 5px 0;
  }

  @media screen and (max-width: 768px) {
    .book-profile {
        font-size: 0.875rem; /* Reduce font size for smaller screens */
    }
  }
 
  @media screen and (max-width: 480px) {
    .book-profile {
        font-size: 0.75rem; /* Further reduce font size for very small screens */
    }
  }
  </style>