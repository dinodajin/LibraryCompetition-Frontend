<template>
  <div class="book-profile">
    <img src="./Book1.jpg" alt="Book Cover" class="book-cover" />
    <div class="book-details">
      <table>
        <tbody>
          <tr>
            <th>TITLE</th>
            <td>{{ book?.bookTitle }}</td>
          </tr>
          <tr>
            <th>AUTHOR</th>
            <td>{{ book?.bookAuthor }}</td>
          </tr>
          <tr>
            <th>LABEL</th>
            <td>{{ book?.bookLabel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  book: {
    bookTitle?: string,
    bookAuthor?: string,
    bookLabel?: string,
    coverImage?: string
  }
}>();
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