<template>
  <div class="dashboard">
    <h1 class="dashboard-title">도서 훼손율 대시보드</h1>
    <div class="chart-container">
      <canvas id="damageChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';

const route = useRoute();
const bookId = route.params.bookId; // URL에서 bookId 가져오기

const data = ref({
  labels: ['훼손된 비율', '훼손되지 않은 비율'],
  datasets: [
    {
      label: '도서 훼손율',
      data: [0, 100], // 초기 데이터, 나중에 업데이트
      backgroundColor: ['#FF6384', '#afafaf'],
      hoverOffset: 4
    }
  ]
});

const fetchBookData = async () => {
  try {
    const response = await fetch('/path/to/book.json'); // Replace with the actual URL
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }
    
    const text = await response.text();
    console.log('Response text:', text);
    
    try {
      const books = JSON.parse(text);
      const book = books.find(book => book.bookId === bookId);
      
      if (book) {
        const totalDamage = 100; // Whole damage scale is 100
        const damagePercentage = book.bookDamage;

        data.value.datasets[0].data = [damagePercentage, totalDamage - damagePercentage];
        updateChart();
      } else {
        console.error('Book not found');
      }
    } catch (jsonError) {
      console.error('Failed to parse JSON:', jsonError);
    }
  } catch (error) {
    console.error('Failed to fetch book data:', error);
  }
};


const updateChart = () => {
  const ctx = document.getElementById('damageChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: data.value,
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
          const percentage = calculateDamagePercentage(dataset);

          ctx.save();
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(`${Math.round(percentage)}%`, width / 2, height / 2);
          ctx.restore();
        }
      }
    }
  });
};

const calculateDamagePercentage = (dataset) => {
  const total = dataset.data.reduce((a, b) => a + b, 0);
  return dataset.data[0] / total * 100; // 훼손된 도서 비율
};

// Fetch book data when component is mounted or bookId changes
onMounted(fetchBookData);
watch(() => route.params.bookId, fetchBookData);
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.dashboard-title {
  font-size: 18px;
  margin-bottom: 12px;
}

.chart-container {
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
