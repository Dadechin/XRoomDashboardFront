<template>
  <SidebarMenu />
  
  <div class="dashboard-page">
    <div class="content">
      <!-- Top Header -->
      <AppHeader pageTitle="تیم ها" />


       
      <!-- Description -->
      <div class="section-description">
          <div class="section-title">مدیریت اعضا</div>
        <p>
در این بخش به شما امکان می‌دهد تا اتاق‌ها، فایل‌ها و جلسات را با همکاران خود به اشتراک بگذارید. در این بخش می‌توانید تیم خود را مدیریت کنید.        </p>
      </div>


     




















<!-- Tab Buttons -->
<div class="tab-buttons">
  <button
    :class="['tab-btn', activeTab === 'users' ? 'active' : '']"
    @click="activeTab = 'users'"
  >کاربران</button>
   <button
  :class="['tab-btn', activeTab === 'buy-subscription' ? 'active' : '']"
  @click="activeTab = 'buy-subscription'"
>
  خرید اشتراک
</button>
  <button
    :class="['tab-btn', activeTab === 'membership' ? 'active' : '']"
    @click="activeTab = 'membership'"
  >اشتراک ها</button>
  <button
    :class="['tab-btn', activeTab === 'details' ? 'active' : '']"
    @click="activeTab = 'details'"
  >جزئیات</button>
 

</div>



<!-- Tab Content -->
<div v-if="activeTab === 'users'">
  <div class="card license-card">
    <span>لایسنس های قابل استفاده :</span>
    <div class="buy-subscription">خرید اشتراک</div>
  </div>

  <div class="user-cards">
    <div class="user-card add-card" @click="openAddUserDialog">
      <span class="add-text">➕ اضافه کردن کاربر جدید</span>
    </div>
    
    
    <div class="user-card" v-for="(user, index) in userList" :key="index">
  <div class="user-card-header">
    <img :src="user.avatar" class="user-avatar" alt="avatar" />
    <div class="user-info-box">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-email">{{ user.email }}</div>
      <div class="user-role">{{ user.role }}</div>
      <div class="user-version">{{ user.version }}</div>
    </div>
  </div>
  <div class="user-footer">
    <span>اکانت XRoom</span>
    <div class="user-actions">
      <button><i class="icon">🗑️</i></button>
      <button><i class="icon">⚙️</i></button>
    </div>
  </div>
</div>

    
  </div>
</div>


<div v-if="activeTab === 'membership'" class="tab-content">
  <div class="access-container">
  <!-- Title Section -->
  <div class="access-header" style="
    background: white;
    border-radius: 20px;
    padding: 20px;"
    >

    <img :src="require('@/assets/img/lock Icon.png')" alt="logout"  class="lock-icon"/>

    <div class="header-text">
      <h3>فعال‌سازی دسترسی XRoom</h3>
      <p>دسترسی کامل به امکانات XRoom بدون واترمارک</p>
    </div>
  

      <!-- Subscription Button -->
      <button class="primary-button">
    <img style="margin-left:10px" :src="require('@/assets/img/hand.png')" alt="logout"  />
        
         انتخاب طرح اشتراکی
      </button>


  </div>


  <!-- Info Cards -->
  <div class="info-cards">
    <!-- Billing Info -->
    <div class="info-card">
      <h4>جزئیات صورتحساب</h4>
      <p>
        اصفهان، خیابان وحید، نبش خیابان حسین آباد، مجتمع عسگری ۳، واحد ۳<br />
        ۸۱۷۵۹۴۹۹۹۱<br />
        شماره تماس: ۰۹۳۷۹۸۹۸۶۲۳<br />
        ایمیل: aminimperator@gmail.com
      </p>
      <button class="secondary-button">ویرایش جزئیات صورتحساب</button>
    </div>

    <!-- Membership Info -->
    <div class="info-card">
      <h4>عضویت ها</h4>
      <p>هنوز مجوزی فعال نیست. کاربران شما نمی‌توانند از XRoom با واترمارک استفاده کنند.</p>
      <button class="secondary-button">مدیریت عضویت ها</button>
    </div>

    <!-- Payment Method -->
    <div class="info-card">
      <h4>روش پرداخت</h4>
      <p>هیچ روش پرداختی برای صورتحساب مرتبط نیست.</p>
    </div>
  </div>
</div>

</div>

<div v-if="activeTab === 'details'" class="tab-content">
  <div class="card">جزئیات تیم ۱</div>
  <div class="card">جزئیات تیم ۲</div>
</div>


<div v-if="activeTab === 'buy-subscription'" class="tab-content">
  <div class="buy-subscription-container">










    <div style="text-align: center; margin-bottom: 20px;">
      <label for="memberCount" style="margin-left: 10px;">تعداد کاربران:</label>
      <select
        id="memberCount"
        v-model.number="memberCount"
        @change="selectedPlan && selectPlan(selectedPlan.name === 'هفتگی' ? 'weekly' : selectedPlan.name === 'ماهانه' ? 'monthly' : 'yearly')"
        style="padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc;"
      >
        <option v-for="count in availableMemberOptions" :key="count" :value="count">
          {{ count }} کاربر
        </option>
      </select>
    </div>











    <h3 style="text-align: center; margin-bottom: 20px;">لطفا نوع اشتراک خود را انتخاب کنید</h3>

    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <div class="plan-card">
        <h4>هفتگی</h4>
        <p>۲۵۰٬۰۰۰ تومان<br><small>برای یک کاربر، در هفته</small></p>
        <button class="primary-button" @click="selectPlan('weekly')">انتخاب طرح اشتراک</button>
      </div>

      <div class="plan-card">
        <h4>ماهانه</h4>
        <p>۶۷۰٬۰۰۰ تومان<br><small>برای یک کاربر، در هفته</small></p>
        <button class="primary-button" @click="selectPlan('monthly')">انتخاب طرح اشتراک</button>
      </div>

      <div class="plan-card">
        <h4>سالانه</h4>
        <p>۴٬۶۰۰٬۰۰۰ تومان<br><small>برای یک کاربر، در هفته</small></p>
        <button class="primary-button" @click="selectPlan('yearly')">انتخاب طرح اشتراک</button>
      </div>
    </div>

    <!-- فاکتور -->
    <div v-if="selectedPlan" class="invoice-box" style="margin-top: 40px; background: white; padding: 20px; border-radius: 12px; max-width: 400px; margin-right: auto; margin-left: auto;">
      <h4 style="margin-bottom: 16px;">پیش‌فاکتور اشتراک {{ selectedPlan.name }}</h4>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>قیمت پایه:</span>
        <span>{{ selectedPlan.price.toLocaleString() }} تومان</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>مالیات (۹٪):</span>
        <span>{{ selectedPlan.tax.toLocaleString() }} تومان</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-bottom: 20px;">
        <span>مبلغ قابل پرداخت:</span>
        <span>{{ selectedPlan.total.toLocaleString() }} تومان</span>
      </div>

      <button class="primary-button" style="width: 100%;" @click="pay">پرداخت</button>
    </div>

  </div>
</div>




















      

 


     
  </div>
  </div>
















  <dialog ref="addUserDialog" class="add-user-dialog">
  <div class="dialog-header">
    <button class="close-btn" @click="closeAddUserDialog">✕</button>
    <h3>کاربر جدید</h3>
  </div>
  <div class="dialog-body">
    <h4>دعوت کاربر جدید</h4>
    <p style="    line-height: 45px;">کاربر یک ایمیل دعوت برای فعال کردن حساب خود دریافت می‌کند.</p>
    <form class="form-fields" @submit.prevent="submitNewUser">
      <div class="form-row">
        <label>نام  </label>
        <input v-model="newUser.first_name" required />
      </div>
      <div class="form-row">
        <label>نام خانوادگی</label>
        <input v-model="newUser.last_name" required />
      </div>
      
      
      <div class="form-row">
        <label>شماره تماس</label>
        <input v-model="newUser.phone" />
      </div>
      <div class="form-row">
        <label>پسورد </label>
        <input type="password" v-model="newUser.password" />
      </div>
      
      <div class="dialog-actions">
        <button type="submit" class="confirm-btn">تایید</button>
        <button type="button" class="cancel-btn" @click="closeAddUserDialog">بازگشت</button>
      </div>
    </form>
  </div>
</dialog>









 



</template>

<script>
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import '@google/model-viewer'
import SidebarMenu from '@/components/SidebarMenu.vue'
import axios from 'axios';

 
 import 'video.js/dist/video-js.css';
import AppHeader from '@/components/Header.vue';

export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    
    AppHeader,

  },
  data() {
    return {
      memberCount: 5,
      availableMemberOptions: [5, 10, 20, 100],

      newUser: {
      first_name: '',
      last_name: '',
      phone: '',
      password: '',
      isAdmin: false,
      hasAccess: false,

      }
      ,

    selectedPlan: null,
    plans: {
      weekly: { name: 'هفتگی', price: 250000 },
      monthly: { name: 'ماهانه', price: 670000 },
      yearly: { name: 'سالانه', price: 4600000 }
    },

      // ... existing data ...
      userList: [
  {
    name: 'دانیال پژوهش کیا',
    email: 'aminimperator@gmail.com',
    role: 'نسخه آزمایشی',
    version: '',
    avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
  },
  {
    name: 'امین رمضانی',
    email: 'aminimperator@gmail.com',
    role: 'مدیر',
    version: 'نسخه آزمایشی',
    avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
  },
  {
    name: 'نوید رمضانی',
    email: 'aminimperator@gmail.com',
    role: 'مدیر',
    version: 'نسخه آزمایشی',
    avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
  }
]
,
      activeTab: 'users',

      previewUrl: '',
    currentPreviewIndex: null,
    currentPreviewType: null,
    videoOptions: {
        autoplay: false,
        controls: true,
        sources: [{
          type: 'video/mp4',
          src: '' // Will be set dynamically
        }]
      },
    
      userData: {
        customer: {},
        user: {
          first_name: '',
          last_name: ''
        },
        images: [],
        pdfs: [],
        videos: [],
        glbs: []
      },
      newFileName: '',
      selectedFile: null,
      uploading: false,
      baseUrl: 'http://194.62.43.230:8000',
      currentUploadType: 'image',
      dialogTitle: 'آپلود فایل جدید',
      fileAccept: '*/*'
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {

    
    
     selectPlan(planKey) {
  const plan = this.plans[planKey];
  if (!plan) return;

  const base = plan.price * this.memberCount;
  const tax = Math.round(base * 0.09);

  this.selectedPlan = {
    ...plan,
    basePrice: base,
    tax,
    total: base + tax
  };
      } 
    ,
  pay() {
  alert(`پرداخت با موفقیت انجام شد برای ${this.memberCount} کاربر`);
  this.selectedPlan = null;
},



    openAddUserDialog() {
  this.$refs.addUserDialog.showModal();
},
closeAddUserDialog() {
  this.$refs.addUserDialog.close();
},
submitNewUser() {
  // اینجا می‌تونی ارسال به API اضافه کنی
  console.log('کاربر جدید:', this.newUser);
  alert('کاربر با موفقیت اضافه شد');
  this.closeAddUserDialog();
}
,
    handleBackdropClick(event) {
    // Check if click was directly on the dialog element (backdrop)
    if (event.target === this.$refs.filePreviewDialog) {
      this.closePreviewDialog();
    }
  },
    openPreviewDialog(type, index, url) {
      if (type === 'video') {
        this.videoOptions.sources[0].src = url;
        this.$nextTick(() => {
          this.$refs.filePreviewDialog?.showModal();
        });
      }
      if (!this.$refs.filePreviewDialog) {
      console.error('Dialog element not found');
      return;
    }
    
    this.currentPreviewType = type;
    this.currentPreviewIndex = index;
    this.previewUrl = url;
    // Special handling for video
     
    this.currentPreviewType = type;
    this.currentPreviewIndex = index;
    
    if (type === 'video') {
      this.videoOptions.sources[0].src = url;
      this.videoOptions.poster = this.getVideoThumbnail();
      this.previewUrl = url;
    } else {
      this.previewUrl = url;
    }
    
    this.$nextTick(() => {
      this.$refs.filePreviewDialog?.showModal();
    });

    if (type === 'image') {
      this.previewImageUrl = url;
      this.previewPdfUrl = '';
    } else if (type === 'pdf') {
      this.previewPdfUrl = url;
      this.previewImageUrl = '';
    }
    
    // this.$refs.imagePreviewDialog.showModal();
    this.$refs.filePreviewDialog.showModal();

  },
  getVideoThumbnail(videoUrl) {
    // You can implement a proper thumbnail generation here
    // For now, we'll just return a placeholder
    videoUrl = 'https://cdn-icons-png.flaticon.com/512/2839/2839038.png'
    return videoUrl;
  },
  closePreviewDialog() {
    // Safely access the dialog reference
    const dialog = this.$refs.filePreviewDialog;
    
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else {
      console.warn('Dialog reference not found or close method unavailable');
    }
    
    // Reset preview state
    this.previewUrl = '';
    this.currentPreviewIndex = null;
    this.currentPreviewType = null;
  },
  async downloadFile() {
    const url = this.currentPreviewType === 'image' 
      ? this.previewImageUrl 
      : this.previewPdfUrl;
    
    if (!url) return;
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      
      // Set appropriate filename
      if (this.currentPreviewType === 'image') {
        a.download = `image-${new Date().getTime()}.${url.split('.').pop()}`;
      } else if (this.currentPreviewType === 'pdf') {
        a.download = `document-${new Date().getTime()}.pdf`;
      }
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('خطا در دانلود فایل');
    }
  },
  
  async deleteFile() {
    if (this.currentPreviewIndex === null || !this.currentPreviewType) return;
    
    try {
      const token = localStorage.getItem('token');
      let deleteUrl = '';
      let itemId = '';
      let fileArray = [];
      
      switch(this.currentPreviewType) {
        case 'image':
          fileArray = this.userData.images;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteImage/${itemId}/`;
          break;
        case 'pdf':
          fileArray = this.userData.pdfs;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deletePdf/${itemId}/`;
          break;
        case 'video':
          fileArray = this.userData.videos;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteVideo/${itemId}/`;
          break;
        case 'glb':
          fileArray = this.userData.glbs;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteGlb/${itemId}/`;
          break;
      }
      
      await axios.delete(deleteUrl, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      this.closePreviewDialog();
      await this.fetchUserData();
      alert('فایل با موفقیت حذف شد');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('خطا در حذف فایل');
    }
  },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${this.baseUrl}/getInfo`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        
        this.userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    getFullImageUrl(relativePath) {
      if (!relativePath) return '';
      return `${this.baseUrl}${relativePath}`;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    },
    openDialog(type) {
      this.currentUploadType = type;
      
      switch(type) {
        case 'image':
          this.dialogTitle = 'آپلود تصویر جدید';
          this.fileAccept = 'image/*';
          break;
        case 'pdf':
          this.dialogTitle = 'آپلود فایل PDF';
          this.fileAccept = '.pdf';
          break;
        case 'video':
          this.dialogTitle = 'آپلود ویدیو';
          this.fileAccept = 'video/*';
          break;
        case 'glb':
          this.dialogTitle = 'آپلود مدل 3D';
          this.fileAccept = '.glb';
          break;
      }
      
      this.$refs.newFileDialog.showModal();
    },
    closeDialog() {
      this.newFileName = '';
      this.selectedFile = null;
      this.$refs.newFileDialog.close();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) return;
      
      this.uploading = true;
      
      const formData = new FormData();
      // formData.append('file', this.selectedFile);
      formData.append('name', this.newFileName || this.selectedFile.name);
      


         
        switch(this.currentUploadType) {
          case 'image':
            formData.append('image', this.selectedFile);
            break;
          case 'pdf':
            formData.append('pdf', this.selectedFile);
            break;
          case 'video':
            formData.append('video', this.selectedFile);

            break;
          case 'glb':
            formData.append('glb', this.selectedFile);

            break;
        }


      try {
        const token = localStorage.getItem('token');
        let uploadUrl = '';
        
        switch(this.currentUploadType) {
          case 'image':
            uploadUrl = `${this.baseUrl}/uploadImage/`;
            break;
          case 'pdf':
            uploadUrl = `${this.baseUrl}/uploadPdf/`;
            break;
          case 'video':
            uploadUrl = `${this.baseUrl}/uploadVideo/`;
            break;
          case 'glb':
            uploadUrl = `${this.baseUrl}/uploadGlb/`;
            break;
        }
        
        await axios.post(uploadUrl, formData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        this.closeDialog();
        // Refresh the data after successful upload
        await this.fetchUserData();
        
        // Show success message
        alert('فایل با موفقیت آپلود شد');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('خطا در آپلود فایل');
      } finally {
        this.uploading = false;
      }
    }
  }
}
</script>

 
<!-- Your existing styles remain the same -->
  
  <style scoped>

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-top: 20px;
  margin-bottom: 10px;
  grid-column: 1 / -1;
}

/* Update the file-sidebar to accommodate more buttons */
.file-sidebar {
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
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
    min-height: 80vh;
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








  .new-file-dialog {
  border: none;
  border-radius: 16px;
  padding: 0;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.new-file-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  padding: 24px;
}

.dialog-content h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #1a202c;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
}

.form-group input[type="text"],
.form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.cancel-btn {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.image-preview-dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 70%;
  max-height: 80%;
  width: auto;
  height: auto;
}

.preview-content {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  margin-bottom: 20px;
}

.preview-actions {
  display: flex;
  gap: 10px;
}

.download-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.download-btn {
  background-color: #3a57e8;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}




/* pdf preview */
.pdf-preview-container {
  width: 100%;
  max-width: 800px;
  height: 70vh;
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.pdf-preview {
  width: 100%;
  height: 100%;
}

/* Adjust dialog size for PDFs */
.image-preview-dialog[data-type="pdf"] {
  width: 80%;
  height: 80%;
}
/* pdf preview */



/* Base dialog styles */
.file-preview-dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
}

.preview-content {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

/* Image preview */
.preview-file[data-type="image"] {
  max-width: 100%;
  max-height: 70vh;
  margin-bottom: 20px;
}

/* PDF preview */
.pdf-preview-container {
  width: 100%;
  max-width: 800px;
  height: 70vh;
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.pdf-preview {
  width: 100%;
  height: 100%;
}

/* Video preview */
.video-preview-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.video-preview {
  width: 100%;
  max-height: 70vh;
}

/* 3D Model preview */
.model-preview-container {
  width: 100%;
  height: 70vh;
  max-width: 800px;
  margin-bottom: 20px;
}

.model-preview {
  width: 100%;
  height: 100%;
}

/* Action buttons */
.preview-actions {
  display: flex;
  gap: 10px;
}

.download-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.download-btn {
  background-color: #3a57e8;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}








.dialog-content {
  /* Prevent margin collapse that could interfere with click detection */
  display: inline-block;
  /* Rest of your existing dialog content styles */
}

.file-preview-dialog::backdrop {
  /* Makes the backdrop clickable */
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}













.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-buy {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.search-bar input {
  padding: 10px;
  width: 300px;
}

/* Main content styles */
.main-content {
  display: flex;
  flex-direction: column;
}

.team h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.team h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.team p {
  font-size: 16px;
  margin-bottom: 20px;
}

.user-list {
  display: flex;
  flex-direction: column;
}

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info {
  flex-grow: 1;
  margin-left: 10px;
}

.btn-remove {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}















.tab-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 16px;
}

.tab-btn {
  background: none;
  border: none;
  color: gray;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
}

.tab-btn.active {
  color: #3a57e8;
  border-bottom: 2px solid #3a57e8;
}

.tab-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.license-card {
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buy-subscription {
  color: #48bb78; /* Tailwind-style green */
  font-weight: 600;
  cursor: pointer;
}


.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
      height: 280px;
}

.user-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
     width: 440px;
    height: 158px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
  position: relative;
}

.user-info-box {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 20px;
}

.user-role {
  color: #3a57e8;
  font-weight: 600;
}

.user-name {
  font-weight: 700;
  font-size: 16px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  align-self: flex-end;
  margin-top: 10px;
}
 

.user-actions button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a57e8;
  font-weight: 600;
  font-size: 14px;
  border: 2px dashed #3a57e8;
  width: 440px;
    height: 158px;
}

.add-text {
  text-align: center;
}

/* dialog */
.add-user-dialog {
  border: none;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 0;
}

.dialog-header {
  background: black;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.dialog-body {
  padding: 24px;
  direction: rtl;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
    

}

.form-row input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
    max-width: 300px;
    margin-left: 19px;
}

.switch-row input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.confirm-btn {
  background: #3a57e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
}

.cancel-btn {
  background: #e2e8f0;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
}

/* dialog  */




/* tab 2 */
.access-container {
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
  padding: 20px;
  background-color: #f9f9fb;
      width: -webkit-fill-available;
}

.access-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-text h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 6px;
}

.header-text p {
  color: #4a5568;
  font-size: 14px;
}

.lock-icon {
  width: 40px;
  height: 40px;
}

.primary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.info-card p {
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 16px;
  line-height: 1.7;
}

.secondary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
}

/* tab 2 */












 

.user-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.user-avatar {
  width: 70px;
      height: 86px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-info-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  flex: 1;
  text-align: right;
  gap: 4px;
}

.user-name {
  font-weight: 700;
  font-size: 16px;
}

.user-email, .user-role, .user-version {
  font-size: 14px;
  color: #4a5568;
}

.user-footer {
  background: #3a57e8;
  color: #fff;
  border-radius: 0 0 12px 12px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 20px; */
}

.user-actions button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}





.plan-card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.plan-card h4 {
  font-size: 18px;
  color: #1a202c;
  margin-bottom: 10px;
}

.plan-card p {
  font-size: 16px;
  color: #4a5568;
  margin-bottom: 20px;
  line-height: 1.6;
}




</style>
  