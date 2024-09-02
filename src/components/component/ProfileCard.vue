<template>
  <div class="profile-card">
    <img src="./User1.jpg" alt="Profile" class="profile-image" />
    <div class="info-text">
      <table>
        <tbody>
          <tr>
            <th>NAME</th>
            <td>{{ member?.memberName }}</td>
          </tr>
          <!-- <tr>
            <th>AGE</th>
            <td>{{ member ? calculateAge(member.memberBirth) : 'N/A' }}</td>
          </tr> -->
          <tr>
            <th>BIRTHDAY</th>
            <td>{{ member?.memberBirth }}</td>
          </tr>
          <tr>
            <th>PHONE NUMBER</th>
            <td>{{ member?.memberPhoneNumber }}</td>
          </tr>
          <tr>
            <th>WARNING</th>
            <td>{{ member?.memberWarning }}</td>
          </tr>
          <tr>
            <th>DAMAGE COUNT</th>
            <td>{{ member?.memberDamageCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Member {
  memberName?: string;
  memberBirth?: string;
  memberPhoneNumber?: string;
  memberWarning?: string;
  memberDamageCount?: number;
}

const props = defineProps<{
  member: Member | null // member가 null일 수 있도록 수정
}>()

// 나이계산
const calculateAge = (birthdate: string) => {
  const birthYear = new Date(birthdate).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  font-size: 1rem;
}

.profile-image {
  height: 200px;
  margin-bottom: 16px;
  border-radius: 8px;
}

.info-text td, th {
  text-align: left;
  margin: 5px 0;
}

@media screen and (max-width: 768px) {
  .profile-card {
    font-size: 0.875rem;
  }
}

@media screen and (max-width: 480px) {
  .profile-card {
    font-size: 0.75rem;
  }
}
</style>
