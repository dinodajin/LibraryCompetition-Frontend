<template>
  <div class="report-section">
    <div class="headline">
      <h3>훼손 내용 제보</h3>
      <a href="#" class="view-all"><strong>View All</strong></a>
    </div>
    <div class="report-list">
      <div class="report-item" v-for="report in reports" :key="report.id">
        <div class="member-info">
          <strong>{{ report.name }}</strong>
        </div>
        <p>{{ report.text }}</p>
      </div>
    </div>
    <div class="bottom-space"></div>
  </div>
</template>

<script setup lang="ts">
const reports = [
  { id: 1, name: '김철수', text: '책 커버가 찢어졌습니다.' },
  { id: 2, name: '이영희', text: '책에 커피 자국이 있습니다.' },
  { id: 3, name: '박민수', text: '책에 페이지가 찢어졌습니다.' },
  { id: 4, name: '최수지', text: '책 모서리가 심하게 구겨졌습니다.' },
  { id: 5, name: '장민지', text: '책에 젖은 자국이 있습니다.' },
  { id: 6, name: '윤다은', text: '책에 펜으로 낙서가 되어 있습니다.' },
  { id: 7, name: '김서준', text: '책에 음료가 쏟아졌습니다.' },
  { id: 8, name: '박지훈', text: '책이 심하게 훼손되었습니다.' },
  { id: 9, name: '정유진', text: '책 페이지가 물에 젖었습니다.' },
  { id: 10, name: '오한나', text: '책 표지가 분리되었습니다.' },
  // More reports
];
</script>

<style scoped>
.report-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: auto;
  max-height: 300px;
  overflow: hidden;
  box-sizing: border-box;
}

.headline {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

h3 {
  display: flex;
  margin: 0 0 20px;
  font-size: 18px;
  color: #333;
}

.view-all {
  display: flex;
  text-align: right;
  color: #007bff;
  margin: 5px 0 20px 70px;
  text-decoration: none;
  font-size: 12px;
}

.report-list {
  max-height: auto;
  padding: 20px;
  padding-bottom: 20px; /* 추가: 아래쪽 여백을 추가하여 컴포넌트 내에서 스크롤 시 신고 내용들이 잘려 보이지 않도록 함 */
  overflow-y: auto;
}

.report-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  max-width: calc(100% - 24px); /* Ensure the item doesn't exceed the parent's width */
}

.report-item:hover {
  transform: scale(1.03); /* Slightly reduce the scale factor */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Slightly reduce the shadow on hover */
}

.member-info {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

p {
  margin: 0;
  color: #666;
}

.bottom-space {
  height: 20px; /* Adjust the height as needed for bottom margin */
}
</style>
