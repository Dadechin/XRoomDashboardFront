<template>
    <div class="dashboard-container">
      <SidebarMenu />
      
      <div class="content">
        <div class="header">
          <button class="btn-subscribe">خرید اشتراک</button>
          <div class="search-bar">
            <input type="text" placeholder="جستجو..." />
          </div>
        </div>
  
        <div class="dashboard-body">
          <div class="quick-actions">
            <button class="btn-action">ایجاد جلسه جدید +</button>
            <div class="guide">
              <button class="btn-guide">راهنمای شروع</button>
              <button class="btn-guide">آموزش‌ها</button>
              <button class="btn-guide">تغییرات نسخه</button>
            </div>
          </div>
  
          <div class="latest-files">
            <h3>آخرین فایل‌ها</h3>
            <div class="files-grid">
              <div class="file-card" v-for="file in files" :key="file.id">
                <img :src="file.image" alt="file" />
                <p>{{ file.name }}</p>
                <span>{{ file.date }}</span>
              </div>
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
          { id: 1, name: 'Flash Back', date: '24 تیر 1403', image: '@/assets/file1.jpg' },
          { id: 2, name: 'Design Artist', date: '24 تیر 1403', image: '@/assets/file2.jpg' },
          { id: 3, name: 'Fakor Sanat Tehran', date: '24 تیر 1403', image: '@/assets/file3.jpg' },
          { id: 4, name: 'Pico Control', date: '24 تیر 1403', image: '@/assets/file4.jpg' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
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
  
  .dashboard-body {
    margin-top: 20px;
  }
  
  .quick-actions {
    margin-bottom: 30px;
  }
  
  .btn-action {
    background-color: #1a73e8;
    color: white;
    padding: 15px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .guide {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-guide {
    background-color: #f1f1f1;
    color: #333;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .latest-files {
    margin-top: 50px;
  }
  
  .files-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
  