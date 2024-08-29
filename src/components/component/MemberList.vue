<template>
  <div class="member-list">
    <h3>Members</h3>
    <div class="list-container">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>BIRTHDAY</th>
            <th>PHONE NUMBER</th>
            <th>DAMAGE COUNT</th>
            <th>WARNING</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" 
          :key="member.id" 
          class="member-row"
          @click="goToMemberDetail(member.memberId)"
          >
            <td>{{ member.memberName }}</td>
            <td>{{ member.memberBirth }}</td>
            <td>{{ member.memberPhoneNumber }}</td>
            <td>{{ member.memberDamageCount }}</td>
            <td>
              <span :class="['member-status', statusClass(member.memberWarning)]">
                {{ statusClass(member.memberWarning) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const members = computed(() => store.state.memberList)

const fetchMembers = () => {
  store.dispatch('fetchMembers')
}

// 사용자 상세 페이지로 이동
const goToMemberDetail = (memberId: number) => {
  router.push({ path: '/memberdetail', query: { id: memberId } })
}

// 컴포넌트가 마운트될 때 사용자 목록을 가져옴
onMounted(() => {
  fetchMembers()
})

// 상태 클래스 결정
const statusClass = (warning: string) => {
  switch (warning) {
    case "정상":
      return '정상'
    case "경고":
      return '경고'
    case "위험":
      return '위험'
    default:
      return 'other'
  }
}
</script>

<style scoped>
.member-list {
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

.member-row {
  transition: transform 0.2s ease-in-out;
}

.member-row:hover {
  transform: scale(1.02);
}

.member-status {
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
}

.정상 {
  background-color: #e6f7e6;
  color: #27ae60;
}

.위험 {
  background-color: #fff5e6;
  color: #f39c12;
}

.경고 {
  background-color: #ffebe6;
  color: #e74c3c;
}

.other {
  background-color: #f0f0f5;
  color: #999;
}
</style>
