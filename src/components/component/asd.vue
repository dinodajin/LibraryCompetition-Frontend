<template>
    <div class="profile-card">
      <div class="profile-info">
        <img src="./User1.jpg" alt="Profile" class="profile-image" />
        <div class="info-text">
          <table>
            <tbody>
            <tr> 
                <!-- NAME -->
                <th>NAME</th>
                <td v-for="loan in loans" :key="loan.name">{{ loan.name }}</td>
            </tr>
            <tr>
                <!-- AGE -->
                <th>AGE</th>
                <td v-for="loan in loans" :key="loan.name">{{ loan.age }}</td>
            </tr>
            <tr>
                <!-- E-MAIL -->
                <th>E-MAIL</th>
                <td v-for="loan in loans" :key="loan.name">{{ loan.email }}</td>
            </tr>
            <tr>
                <!-- NUMBER -->
                <th>BOOK NUMBER</th>
                <td v-for="loan in loans" :key="loan.name">{{ loan.number }}</td>
            </tr>
            </tbody>
          </table>
       </div>
      </div>
    </div>
</template>

<script setup lang="ts">
const loans = [
  { name: '이승현', age: '29', email: 'user4@gmail.com', number: '010-4567-8901' }
  // More loans
];
</script>
  
<style scoped>
.profile-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  background-color: #ffffff;
  font-size: 1rem;
  align-items: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.profile-image {
  width: 100%;
  border-radius: 10px;
}

.info-text td, th {
  text-align: left;
  margin: 5px 0;
}

@media screen and (max-width: 768px) {
  .profile-card {
    font-size: 0.875rem; /* Reduce font size for smaller screens */
  }
}

@media screen and (max-width: 480px) {
  .profile-card {
    font-size: 0.75rem; /* Further reduce font size for very small screens */
  }
}
</style>