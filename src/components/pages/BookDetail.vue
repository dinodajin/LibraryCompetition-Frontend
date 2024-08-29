<template>
  <div class="book-detail">
    <Sidebar />
    <div class="grid-container">
      <div class="left-column">
        <!-- 전달된 book 데이터를 props로 넘김 -->
        <BookProfile :book="book" />
        <DamageRate />
        <ReportSection />
      </div>
      <div class="right-column">
        <div class="top-row">
          <DamageRecords />
          <DamageDetails />
        </div>
        <div class="bottom-row">
          <LoanRecords />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookProfile from '../component/BookProfile.vue'
import ReportSection from '../component/ReportSection.vue'
import DamageRate from '../component/DamageRate.vue'
import LoanRecords from '../component/BookLoanRecords.vue'
import DamageRecords from '../component/DamageRecords.vue'
import DamageDetails from '../component/DamageDetails.vue'
import Sidebar from '../component/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const book = ref(null)

const fetchBookDetails = async () => {
  const id = route.query.id as string // URL 쿼리 파라미터에서 id 추출
  if (id) {
    book.value = await store.dispatch('fetchBookById', id)
  } else {
    console.error('No book ID found in route query parameters.')
  }
}

onMounted(() => {
  fetchBookDetails()
})
</script>

<style scoped>
.book-detail {
  display: grid;
  grid-template-columns: auto auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.left-column > * {
  max-width: 100%;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
}

.bottom-row {
  display: grid;
  gap: 16px;
  height: 100%;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .grid-container {
    padding: 10px;
  }

  .left-column,
  .right-column,
  .bottom-row {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .grid-container {
    padding: 5px;
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }
}
</style>
