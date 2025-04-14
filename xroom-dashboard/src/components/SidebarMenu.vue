<template>
    <div class="sidebar">
      <div class="sidebar-header">
        <img src="@/assets/logo.png" alt="XRoom" class="logo" />
        <div class="profile">
          <img src="@/assets/img/profile.png" alt="User" class="profile-img" />
          <span class="username">دانیال پژوهش کیا</span>
        </div>
      </div>
      
      <div class="sidebar-nav">
        <router-link to="/" class="nav-link">داشبورد</router-link>
        <router-link to="/sessions" class="nav-link">جلسات</router-link>
        <router-link to="/downloads" class="nav-link">دانلود</router-link>
        <router-link to="/files" class="nav-link">فایل‌ها</router-link>
        <router-link to="/teams" class="nav-link">تیم‌ها</router-link>
      </div>
  
      <div class="sidebar-footer">
        <router-link to="/settings" class="footer-link">پشتیبانی</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #2f2f2f;
    color: white;
    padding: 20px;
  }
  
  .sidebar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .logo {
    width: 100px;
    margin-bottom: 20px;
  }
  
  .profile {
    text-align: center;
  }
  
  .profile-img {
    width: 50px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .username {
    font-size: 14px;
    font-weight: bold;
  }
  
  .sidebar-nav {
    margin-bottom: 20px;
  }
  
  .nav-link {
    display: block;
    color: white;
    padding: 10px 0;
    text-decoration: none;
    margin: 10px 0;
    font-size: 16px;
  }
  
  .nav-link:hover {
    background-color: #444;
  }
  
  .sidebar-footer {
    margin-top: auto;
  }
  
  .footer-link {
    color: white;
    text-decoration: none;
    font-size: 14px;
  }
  </style>
  