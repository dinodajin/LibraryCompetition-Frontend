<script setup lang="ts">
import { computed, ref } from 'vue';

interface Member {
  loanCount: number;
  damageCount: number;
}

const member = ref<Member>({ loanCount: 10, damageCount: 3 });

const riskScore = computed(() => member.value.loanCount * 2 + member.value.damageCount * 10);

const riskLevel = computed(() => {
  if (riskScore.value < 30) return { label: '청정', color: '#007bff' };
  if (riskScore.value < 60) return { label: '주의', color: '#ffc107' };
  return { label: '위험', color: '#dc3545' };
});
</script>

<template>
  <div class="status-indicator">
    <h3>위험지수</h3>
    <div class="status-content">
      <div class="status-circle" :style="{ backgroundColor: riskLevel.color }">
        <p>{{ riskLevel.label }}</p>
        <p>{{ riskScore }}</p>
      </div>
      <div class="status-details">
        <p><strong>대출 횟수:</strong> {{ member.loanCount }}</p>
        <p><strong>훼손 횟수:</strong> {{ member.damageCount }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-indicator {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  height: 350px;
  overflow: hidden;
  font-size: 1rem;
  box-sizing: border-box;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.status-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: transform 0.3s, background-color 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.status-circle::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 20%, transparent 80%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  transition: transform 0.5s ease-out;
}

.status-circle:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.status-circle:hover {
  transform: scale(1.05);
  /* background-size: 200% 200%;
  animation: waveEffect 2s infinite; */
}

@keyframes waveEffect {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.status-circle p {
    margin: 0;
  }

.status-details p {
  margin: 5px 0;
}
</style>
