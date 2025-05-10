<template>
    <header class="header-container">
      <img class="line" src="https://c.animaapp.com/m9nvumalUMfQbN/img/line-1.svg" />
      <p class="welcome-message">از این داشبورد، کار با XRoom را آغاز کنید.</p>
      <div class="user-info-container">
        <div class="user-name-container">
          <img class="user-icon" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-10.svg" />
          <div class="user-name">{{ fullName }}</div>
        </div>
        <div class="avatar-wrapper">
          <img class="user-avatar" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg" />
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
    computed: {
      fullName() {
        // Get user data from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Return formatted name or default if not available
        if (user.first_name && user.last_name) {
          return `${user.first_name} ${user.last_name}`;
        }
        return 'کاربر مهمان';
      }
    }
  }
  </script>
  
  <style scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #eaeaea;
  }
  
  .welcome-message {
    font-size: 14px;
    color: #666666;
    margin: 0 15px;
  }
  
  .user-info-container {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .user-name-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .user-icon {
    width: 16px;
    height: 16px;
  }
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
  
  .avatar-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  .user-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .line {
    height: 40px;
    width: 1px;
    background-color: #eaeaea;
  }
  </style>