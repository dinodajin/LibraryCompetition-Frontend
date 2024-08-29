<template>
  <div class="user-detail">
    <Sidebar />
    <div class="grid-container">
      <div class="left-column">
        <!-- 전달된 member 데이터를 props로 넘김 -->
        <ProfileCard :member="member" />
        <CurrentLoans />
      </div>
      <div class="right-column">
        <div class="top-row">
          <StatusIndicator1 :member="member" />
          <ReturnRecord />
        </div>
        <div class="bottom-row">
          <LoanRecord />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from '../component/ProfileCard.vue'
import StatusIndicator1 from '../component/StatusIndicator1.vue'
import LoanRecord from '../component/LoanRecord.vue'
import ReturnRecord from '../component/MemberDamageList.vue'
import CurrentLoans from '../component/CurrentLoans.vue'
import Sidebar from '../component/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const member = ref(null)

const fetchMemberDetails = async () => {
  const id = route.query.id as string;
  if (id) {
    try {
      member.value = await store.dispatch('fetchMemberById', id);
      await store.dispatch('fetchLoanRecordsByMemberId', id);
    } catch (error) {
      console.error('Failed to fetch member details or loan records:', error);
    }
  } else {
    console.error('No member ID found in route query parameters.');
  }
}

onMounted(() => {
  fetchMemberDetails()
})
</script>

<style scoped>
.user-detail {
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
  padding: 20px;
  box-sizing: border-box; /* Include padding in height */
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
  grid-template-columns: 2fr 3fr;
  gap: 16px;
}

.bottom-row {
  display: grid;
  gap: 16px;
  height: 100%; /* Fill remaining space */
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: 1fr;
    height: auto; /* Allow dynamic height */
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .grid-container {
    padding: 10px;
  }

  .left-column, .right-column, .bottom-row {
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
