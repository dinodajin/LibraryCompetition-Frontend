<template>
  <div class="dashboard">
    <h1 class="dashboard-title">도서 훼손율 대시보드</h1>
    <div class="chart-container">
      <canvas id="damageChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

// 데이터와 옵션 정의
const data = ref({
  labels: ['훼손된 비율', '훼손되지 않은 비율 '],
  datasets: [
    {
      label: '도서 훼손율',
      data: [70, 30], // 초기 데이터, 실제로는 API 호출 등을 통해 업데이트
      backgroundColor: ['#FF6384', '#afafaf'],
      hoverOffset: 4
    }
  ]
});

// 훼손율 수치를 계산하는 함수
const calculateDamagePercentage = (dataset) => {
  const total = dataset.data.reduce((a, b) => a + b, 0);
  return dataset.data[1] / total * 100; // 훼손된 도서 비율
};

onMounted(() => {
  const ctx = document.getElementById('damageChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: data.value,
    options: {
      responsive: true,
      maintainAspectRatio: false, // 비율 유지하지 않기
      plugins: {
        legend: {
          display: false // 범례 제거
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            }
          }
        },
        // 도넛 차트 중앙에 텍스트를 그리는 플러그인
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const dataset = chart.data.datasets[0];
          const percentage = calculateDamagePercentage(dataset);

          ctx.save();
          ctx.font = 'bold 14px Arial'; // 텍스트 크기 조정
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';

          // 텍스트를 차트 중앙에 그리기
          ctx.fillText(`${Math.round(percentage)}%`, width / 2, height / 2);
          ctx.restore();
        }
      }
    }
  });
});
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
