<template>
  <div class="dashboard">
    <h1 class="dashboard-title">도서 훼손율</h1>
    <div class="chart-container">
      <canvas id="damageChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';

const store = useStore();
const route = useRoute();
const chart = ref(null);

// 현재 도서 ID와 해당 도서의 훼손율 데이터
const bookDamage = ref(0);
const totalDamage = ref(0);

// 도서 데이터 업데이트 함수
const updateChart = () => {
  const bookId = route.query.id;
  if (bookId) {
    const bookList = store.getters.getBookList;
    const book = bookList.find(b => b.bookId === bookId);
    
    if (book) {
      // 총 훼손량 계산
      totalDamage.value = bookList.reduce((acc, b) => acc + b.bookDamage, 0);
      // 선택된 도서의 훼손량
      bookDamage.value = book.bookDamage;
    }
  }
};

// 차트 초기화 함수
const initChart = () => {
  const ctx = document.getElementById('damageChart').getContext('2d');
  if (chart.value) {
    chart.value.destroy(); // 기존 차트 제거
  }
  chart.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['훼손된 비율', '훼손되지 않은 비율'],
      datasets: [{
        label: '도서 훼손율',
        data: [(bookDamage.value / 100) * 100, ((100 - bookDamage.value)/100) * 100],
        backgroundColor: ['#FF6384', '#afafaf'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            }
          }
        },
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const dataset = chart.data.datasets[0];
          const percentage = (bookDamage.value / totalDamage.value * 100).toFixed(2);

          ctx.save();
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(`${percentage}%`, width / 2, height / 2);
          ctx.restore();
        }
      }
    }
  });
};

onMounted(() => {
  updateChart(); // 컴포넌트 마운트 시 데이터 업데이트
  initChart(); // 차트 초기화
});

// URL 쿼리 파라미터나 도서 목록이 변경될 때 차트 업데이트
watch(() => [route.query.id, store.getters.getBookList], updateChart, { immediate: true });
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* 패딩 조정 */
  height: 200px; /* 전체 컴포넌트 높이 */
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* 전체 폭에 맞추기 */
  box-sizing: border-box; /* 패딩 포함 */
}

.dashboard-title {
  font-size: 18px; /* 헤더 글씨 크기 조정 */
  margin-bottom: 12px;
}

.chart-container {
  width: 70%;
  height: 70%; /* 차트 컨테이너 높이 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 차트 위치를 조정할 수 있도록 설정 */
}

canvas {
  width: 100% !important; /* 차트 너비 조정 */
  height: 100% !important; /* 차트 높이 조정 */
}
</style>
