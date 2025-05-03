<template>
  <SidebarMenu />

  <div class="dashboard-page">
    <div class="content">

      <!-- Header -->
      <div class="header-row">
        <div class="right-actions">
          <button class="subscription-button">
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-6.svg" class="button-icon" />
            خرید اشتراک
          </button>
        </div>
        <div class="user-info">
          <span class="user-name">{{ userData.user.first_name }} {{ userData.user.last_name }}</span>
          <div class="avatar-box">
            <img class="avatar-icon" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg" />
          </div>
        </div>
      </div>

      <div class="page-title">ویرایش پروفایل</div>

      <!-- Two-Column Form Layout -->
      <div class="profile-edit-container">

        <!-- Left Column -->
        <div class="column">

          <!-- VR Avatar Section -->
          <div class="form-section">
            <h3>آواتار واقعیت مجازی شما</h3>
            <p class="section-description">
              می‌توانید با آپلود یک تصویر، به شخصی‌سازی آواتار خود، ظاهر خود را در محیط واقعیت مجازی ویرایش کنید.
            </p>
            <img :src="userAvatarUrl" class="avatar-image" />
            <div class="avatar-actions">
              <a @click="changeAvatar">تغییر آواتار</a> |
              <a @click="regenerateAvatar">ساخت مجدد آواتار</a>
            </div>
          </div>

          <!-- Password Change Section -->
          <div class="form-section">
            <h3>تغییر رمز عبور</h3>
            <div class="form-group">
              <label for="currentPassword">رمز عبور فعلی</label>
              <input type="password" id="currentPassword" v-model="passwordForm.current_password" />
            </div>
            <div class="form-group">
              <label for="newPassword">رمز عبور جدید</label>
              <input type="password" id="newPassword" v-model="passwordForm.new_password" />
            </div>
            <div class="form-group">
              <label for="confirmPassword">تأیید رمز عبور جدید</label>
              <input type="password" id="confirmPassword" v-model="passwordForm.confirm_password" />
            </div>
            <button class="save-btn" @click="saveProfile" :disabled="saving">
              {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
            </button>
          </div>

        </div>

        <!-- Right Column -->
        <div class="column">

          <!-- Profile Picture Section -->
          <div class="form-section">
            <h3>تصویر پروفایل</h3>
            <p class="section-description">
              این نماد در کنار نام شما و برای دیگران در واقعیت مجازی و در پلتفرم وب قابل مشاهده خواهد بود.
            </p>



            <img :src="userProfilePicUrl" class="profile-image" />

            <input type="file" @change="uploadProfileImage" class="upload-input" />





            
          </div>


          
          <!-- User Info Section -->
          <div class="form-section">
            <h3>اطلاعات کاربر</h3>
            <div class="form-group">
              <label for="email">آدرس ایمیل</label>
              <input type="email" id="email" v-model="editForm.email" disabled />
            </div>
            <div class="form-group">
              <label for="firstName">نام و نام خانوادگی</label>
              <input type="text" id="firstName" v-model="editForm.first_name" />
              <input type="text" id="lastName" v-model="editForm.last_name" />
            </div>
            <div class="form-group">
              <label for="position">جایگاه</label>
              <input type="text" id="position" placeholder="جایگاه شغلی (اختیاری)" />
            </div>
            <button class="save-btn" @click="saveProfile" :disabled="saving">
              {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
            </button>
          </div>

        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'
import axios from '@/axios';

export default {
  name: 'EditProfile',
  components: {
    SidebarMenu
  },
  data() {
    return {
      selectedProfileImage: null,

      userData: {
        user: { first_name: '', last_name: '', email: '' }
      },
      editForm: { first_name: '', last_name: '', email: '' },
      passwordForm: { current_password: '', new_password: '', confirm_password: '' },
      saving: false,
      // userProfilePicUrl: 'https://i.imgur.com/QbXfV6C.png',
      userAvatarUrl: 'https://i.imgur.com/QbXfV6C.png',
      baseUrl: 'http://194.62.43.230:8000'
    }
  },
  created() {
    this.fetchUserData();
  },
  computed: {
    userProfilePicUrl() {
      const customer = JSON.parse(localStorage.getItem('customer') || {});
      if (!customer.profile_img) return this.defaultProfileImage;
      return `http://194.62.43.230:8000/media/${customer.profile_img}`;
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('/getInfo');
        this.userData = response.data;
        this.editForm = {
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email,
          userAvatarUrl: this.baseUrl+ "/"+ response.data.customer.profile_img
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async saveProfile() {
  this.saving = true;
  try {
    const formData = new FormData();
    formData.append('first_name', this.editForm.first_name);
    formData.append('last_name', this.editForm.last_name);

    if (this.selectedProfileImage) {
      formData.append('profile_img', this.selectedProfileImage);
    }

    await axios.post(`${this.baseUrl}/editProfile/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Handle password change if filled
    if (this.passwordForm.new_password && this.passwordForm.current_password) {
      if (this.passwordForm.new_password !== this.passwordForm.confirm_password) {
        throw new Error('رمز عبور جدید و تکرار آن مطابقت ندارند');
      }

      await axios.post(`${this.baseUrl}/resetPassword/`, {
        old_password: this.passwordForm.current_password,
        new_password: this.passwordForm.new_password
      });
    }

    await this.fetchUserData();
    alert('تغییرات با موفقیت ذخیره شد');
  } catch (error) {
    alert(error.response?.data?.detail || error.message || 'خطا در ذخیره تغییرات');
  } finally {
    this.saving = false;
  }
},
    changeAvatar() {
      alert('تغییر آواتار کلیک شد');
    },
    regenerateAvatar() {
      alert('ساخت مجدد آواتار کلیک شد');
    },
      uploadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedProfileImage = file;
      this.userProfilePicUrl = URL.createObjectURL(file);
    }
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
.page-title {
  font-size: 22px;
  font-weight: bold;
  margin: 24px 0;
  color: #333;
}

.profile-edit-container {
  display: flex;
  gap: 32px;
  flex-direction: row-reverse;
}

.column {
  flex: 1;
}

.form-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-section h3 {
  margin-bottom: 8px;
  color: #222;
  font-size: 18px;
}

.section-description {
  color: #777;
  font-size: 14px;
  margin-bottom: 12px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #444;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  direction: rtl;
}

input:disabled {
  background: #f5f5f5;
  color: #777;
}

.avatar-image,
.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.avatar-actions a {
  color: #3a57e8;
  font-size: 14px;
  cursor: pointer;
  margin: 0 4px;
}

.save-btn {
  background: #3a57e8;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-input {
  margin-top: 8px;
}


</style>
