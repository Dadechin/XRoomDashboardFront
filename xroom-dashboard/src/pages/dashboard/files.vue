<template>
    <SidebarMenu />
  
    <div class="dashboard-page">
      <div class="content">
        <!-- Top Header -->
        <div class="header-row">
          <div class="right-actions">
            <button class="subscription-button">
              <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-6.svg" class="button-icon" />
              خرید اشتراک
            </button>
          </div>
  
          <div class="user-info">
            <span class="user-name">دانیال پژوهش کیا</span>
            <div class="avatar-box">
              <img class="avatar-icon" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg" />
            </div>
          </div>
        </div>
  
        <!-- Page Title -->
        <div class="page-title">فایل ها</div>
  
        <!-- Description -->
        <div class="section-description">
          <div class="section-title">مدیریت فایل ها</div>
          <p>
            فایل های خود مانند مدل های سه بعدی، تصاویر و اسناد PDF را برای استفاده در VR آماده کنید. یا یادداشت ها و تصاویر ایجاد شده در برنامه XRoom را دانلود کنید.
          </p>
        </div>
  
        <!-- File Manager Layout -->
        <div class="file-manager-layout">

            <!-- Sidebar -->
          <div class="file-sidebar">
            <button class="primary-button">
              فایل جدید
              <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="btn-icon" />
            </button>
  
            <div class="filter-buttons">
              <button class="filter-btn">فایل های اخیر</button>
              <button class="filter-btn">دانلودهای اخیر</button>
              <button class="filter-btn">فایل های شخصی</button>
              <button class="filter-btn">نشانه دار شده</button>
            </div>
          </div>

          
          <!-- Cards Grid -->
          <div class="file-grid">
            <div class="file-card" v-for="(item, index) in files" :key="index">
              <img :src="item.image" class="file-image" />
              <div class="file-card-info">
                <div class="file-title">نام فایل</div>
                <div class="file-meta">
                  <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" class="meta-icon" />
                  <span class="file-date">۲۳ تیر ۱۴۰۳</span>
                </div>
              </div>
            </div>
          </div>
  
          


        </div>
      </div>
  
      <!-- Footer -->
      <div class="footer">
        <div class="text-wrapper-13">All Rights Reserved ©Dadechin</div>
        <div class="logo">
          <img class="clip-path-group" src="https://c.animaapp.com/m9nvumalUMfQbN/img/clip-path-group.png" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '@/components/SidebarMenu.vue'
  
  export default {
    name: 'DashboardPage',
    components: {
      SidebarMenu,
    },
    data() {
      return {
        files: [
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-1.png' },
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png' },
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-3.png' },
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-4.png' },
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-1.png' },
          { image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-page {
    margin-right: 360px;
    padding: 20px;
    direction: rtl;
    font-family: IRANSansXFaNum, sans-serif;
  }
  
  .content {
    background-color: #f8f9fa;
    border-radius: 20px;
    padding: 35px 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .right-actions {
    display: flex;
    gap: 10px;
  }
  
  .subscription-button {
    background-color: #48bb78;
    color: white;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .button-icon {
    width: 20px;
    height: 20px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: #2d3748;
  }
  
  .avatar-box {
    width: 40px;
    height: 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
  
  .avatar-icon {
    width: 20px;
    height: 20px;
  }
  
  .page-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
  }
  
  .section-description {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a202c;
  }
  
  .section-description p {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.8;
  }
  
  .file-manager-layout {
    display: flex;
    gap: 32px;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  
  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
    flex: 1;
    min-width: 0;
  }
  
  .file-card {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: 0.2s ease;
  }
  
  .file-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  }
  
  .file-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
  
  .file-card-info {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .file-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a202c;
    text-align: center;
  }
  
  .file-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #718096;
  }
  
  .meta-icon {
    width: 16px;
    height: 16px;
  }
  
  .file-sidebar {
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .primary-button {
    background-color: #3a57e8;
    color: white;
    font-size: 14px;
    padding: 12px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .primary-button:hover {
    background-color: #2e45c8;
  }
  
  .btn-icon {
    width: 16px;
    height: 16px;
  }
  
  .filter-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-btn {
    background-color: white;
    color: #1a202c;
    font-size: 13px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .filter-btn:hover {
    background-color: #edf2f7;
  }
  
  .footer {
    margin-top: 40px;
    text-align: center;
  }
  
  .text-wrapper-13 {
    font-size: 13px;
    color: white;
    font-weight: 500;
  }
  
  .logo {
    margin-top: 15px;
  }
  
  .clip-path-group {
    height: 40px;
    width: 150px;
  }
  </style>
  