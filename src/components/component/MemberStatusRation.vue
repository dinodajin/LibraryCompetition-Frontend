<template>
  <div class="member-status-ratio">
    <div class="title">사용자 정보 차트</div>
    <div class="chart-legend-container">
      <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
      <div class="legend-container">
        <div v-for="(item, index) in legendData" :key="index" class="legend-item">
          <div :style="{ backgroundColor: item.color }" class="legend-color-box"></div>
          <span class="legend-label">{{ item.label }}: {{ item.percentage }}% ({{ item.count }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Access Vuex store
const store = useStore();

// Compute ratio data from store
const ratio = computed(() => store.getters.getMemberWarningRatio);

// Compute counts for the display
const totalMembers = computed(() => store.getters.getMemberList.length);

const legendData = computed(() => {
  const labels = ['정상', '경고', '위험'];
  const colors = ['#27ae60', '#f39c12', '#e74c3c'];
  const ratioValues = [ratio.value.safe, ratio.value.warning, ratio.value.danger];

  return labels.map((label, index) => {
    const value = Number(ratioValues[index]); // Ensure value is a number
    const count = isNaN(value) ? 0 : Math.round((value / 100) * totalMembers.value); // Calculate count
    return {
      label,
      color: colors[index],
      percentage: isNaN(value) ? 0 : value.toFixed(2), // Ensure value is not NaN
      count
    };
  });
});

// Chart data and options
const chartData = computed(() => ({
  labels: ['정상', '경고', '위험'],
  datasets: [
    {
      label: 'Warning Ratio',
      data: [ratio.value.safe, ratio.value.warning, ratio.value.danger],
      backgroundColor: ['#27ae60', '#f39c12', '#e74c3c'],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Disable built-in legend
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const label = tooltipItem.label || '';
          const value = tooltipItem.raw || 0;
          const count = Math.round((value / 100) * totalMembers.value);
          return `${label}: ${value}% (${count})`;
        },
      },
    },
    datalabels: {
      display: false, // Hide internal data labels
    },
  },
};
</script>

<style scoped>
.member-status-ratio {
  display: flex;
  flex-direction: column;
  flex:1;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  max-width: 1000px;
  margin: auto;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 15px 0;
  text-align: start;
}

.chart-legend-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.chart-container {
  /* flex: 1; */
  justify-content: center;
  align-items: center;
}

.legend-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.legend-color-box {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.legend-label {
  font-size: 16px;
  color: #666;
}
</style>
