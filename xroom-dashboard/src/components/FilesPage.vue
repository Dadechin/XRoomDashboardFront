<template>
    <div class="files-page">
      <SidebarMenu /> <!-- Sidebar remains the same -->
      
      <div class="content">
        <div class="header">
          <button class="btn-subscribe">خرید اشتراک</button>
          <div class="search-bar">
            <input type="text" placeholder="جستجو..." />
          </div>
        </div>
  
        <div class="files-body">
          <div class="files-header">
            <h2>مدیریت فایل ها</h2>
            <button class="btn-upload">فایل جدید</button>
          </div>
  
          <div class="file-actions">
            <div class="file-actions-menu">
              <button class="action-btn">فایل‌های آخر</button>
              <button class="action-btn">یادداشت‌های آخر</button>
              <button class="action-btn">فایل‌های شخصی</button>
              <button class="action-btn">فایل‌های تیمی</button>
            </div>
          </div>
  
          <div class="file-cards">
            <div class="file-card" v-for="file in files" :key="file.id">
              <img :src="file.image" alt="file" />
              <p>{{ file.name }}</p>
              <span>{{ file.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '@/components/SidebarMenu.vue';
  
  export default {
    components: {
      SidebarMenu, 
    },
    data() {
      return {
        files: [
          { id: 1, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file1.jpg' },
          { id: 2, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file2.jpg' },
          { id: 3, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file3.jpg' },
          { id: 4, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file4.jpg' },
          { id: 5, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file5.jpg' },
          { id: 6, name: 'نام فایل', date: '24 تیر 1403', image: '@/assets/file6.jpg' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .files-page {
    display: flex;
    direction: rtl;

  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .btn-subscribe {
    background-color: #1a73e8;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .search-bar input {
    padding: 10px;
    width: 300px;
  }
  
  .files-body {
    margin-top: 20px;
  }
  
  .files-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .btn-upload {
    background-color: #1a73e8;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .file-actions {
    margin-bottom: 30px;
  }
  
  .file-actions-menu {
    display: flex;
    gap: 10px;
  }
  
  .action-btn {
    background-color: #f1f1f1;
    color: #333;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .file-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .file-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .file-card img {
    width: 100%;
    border-radius: 10px;
    height: 180px;
    object-fit: cover;
  }
  
  .file-card p {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  