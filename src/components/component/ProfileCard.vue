<template>
  <div class="profile-card">
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
</template>

<script setup lang="ts">
const loans = [
{ name: '이승현', age: '29', email: 'user4@gmail.com', number: '010-4567-8901' }
// More loans
];
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
  font-size: 0.875rem; /* Reduce font size for smaller screens */
}
}

@media screen and (max-width: 480px) {
.profile-card {
  font-size: 0.75rem; /* Further reduce font size for very small screens */
}
}
</style>