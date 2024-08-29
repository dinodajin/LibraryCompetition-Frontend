<template>
    <div class="status-indicator">
      <h3>위험지수</h3>
      <div class="status-content">
        <div class="status-circle">
          <p>청정</p>
          <p>16</p>
        </div>
        <div class="status-details">
          <p><strong>대출 횟수:</strong> 10</p>
          <p><strong>훼손 횟수:</strong> 3</p>
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
    padding: 16px;
    max-height: 300px;
    overflow: hidden;
    font-size: 1rem;
  }
  
  .status-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .status-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #d0e7ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  
  .status-circle p {
    margin: 0;
  }
  
  .status-details p {
    margin: 5px 0;
  }
  </style>