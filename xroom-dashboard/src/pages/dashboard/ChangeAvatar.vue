<template>

    <div style="gap: 1.5rem;display: flex;flex-direction: column;">
      <div style="gap: 1.5rem;display: flex;flex-direction: column;">

        <div class="page-title"> آواتار خود را انتخاب کنید</div>

        <h5>
          نحوه ظاهر شدن خود را در طول جلسات در XRoom را سفارشی سازی کنید.
          نگران نباشید، شما می توانید ان را در هر زمان دیگری تغییر دهید.
        </h5>

        <router-link to="/dashboard/readyplayer">ساخت آواتار به دلخواه   </router-link>
      </div>
      <div class="avatar-selection-container">
    <!-- Left Column - Women Models -->
    
    <!-- Female avatars column -->
<div class="gender-column">
  <h3 class="mb-4 text-center">آواتارهای زنانه</h3>
  <div class="avatar-grid">
    <div v-for="(avatar, index) in femaleAvatars" :key="'female-' + index" class="avatar-card">
      <div class="model-preview-container">
        <!-- Show profile_img or fallback -->
        <img :src="avatar.profile_img || 'https://via.placeholder.com/150?text=No+Image'" alt="Avatar Image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
      </div>
      <button @click="selectAvatar(avatar)" class="select-button">
        انتخاب این آواتار
      </button>
    </div>
  </div>
</div>

<!-- Male avatars column -->
<div class="gender-column">
  <h3 class="mb-4 text-center">آواتارهای مردانه</h3>
  <div class="avatar-grid">
    <div v-for="(avatar, index) in maleAvatars" :key="'male-' + index" class="avatar-card">
      <div class="model-preview-container">
        <!-- Show profile_img -->
        <img :src="avatar.profile_img" alt="Avatar Image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
      </div>
      <button @click="selectAvatar(avatar)" class="select-button">
        انتخاب این آواتار
      </button>
    </div>
  </div>
</div>


  </div>
      
    </div>
</template>

<script>
import axios from '@/axios';
import { ref } from 'vue';

export default {
  name: 'ChangeAvatar',
  data() {
    return {
      selectedProfileImage: null,
      userData: {
        user: { first_name: '', last_name: '', email: '' }
      },
      editForm: { first_name: '', last_name: '', email: '' },
      passwordForm: { current_password: '', new_password: '', confirm_password: '' },
      saving: false,
      userAvatarUrl: 'https://i.imgur.com/QbXfV6C.png',
      baseUrl: 'https://my.xroomapp.com/api'
    };
  },
  setup() {
    const maleAvatars = ref([
      { id: 1, name: 'مرد ۱', src: 'http://my.xroomapp.com:8000/media/user_glbs/men1.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/men1.png' },
      { id: 2, name: 'مرد ۲', src: 'http://my.xroomapp.com:8000/media/user_glbs/men2.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/men2.png' },
      { id: 7, name: 'مرد ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/men3.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/men3.png' },
      { id: 17, name: 'مرد ۴', src: 'http://my.xroomapp.com:8000/media/user_glbs/men4.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/men4.png' },
    ]);

    const femaleAvatars = ref([
      { id: 4, name: 'زن ۱', src: 'http://my.xroomapp.com:8000/media/user_glbs/women1.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women1.png' },
      { id: 10, name: 'زن ۲', src: 'http://my.xroomapp.com:8000/media/user_glbs/women2.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women2.png' },
      { id: 11, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women3.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women3.png' },
      { id: 12, name: 'زن ۴', src: 'http://my.xroomapp.com:8000/media/user_glbs/women4.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women4.png' },
      { id: 13, name: 'زن ۵', src: 'http://my.xroomapp.com:8000/media/user_glbs/women6.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women6.png' },
      { id: 14, name: 'زن ۶', src: 'http://my.xroomapp.com:8000/media/user_glbs/women7.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women7.png' },
    ]);

    const selectedAvatar = ref(null);

    return {
      maleAvatars,
      femaleAvatars,
      selectedAvatar,
    };
  },
  created() {
    this.fetchUserData();
  },
  computed: {
    userProfilePicUrl() {
      const customer = JSON.parse(localStorage.getItem('customer') || {});
      if (!customer.profile_img) return this.defaultProfileImage;
      return `https://my.xroomapp.com/api/media/${customer.profile_img}`;
    }
  },
  methods: {
    async selectAvatar(avatar) {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      this.saving = true;
      this.selectedAvatar = avatar.id;

      try {
        await axios.post(`${this.baseUrl}/editProfile/`, {
          profile_glb_url: avatar.src,
          profile_img: avatar.profile_img
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: '.آواتار با موفقیت انتخاب شد',
        });

        setTimeout(() => {
          window.location.assign('/dashboard');
        }, 2000);

      } catch (error) {
        let errorMessage = 'خطا در انتخاب آواتار. لطفاً دوباره تلاش کنید';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'درخواست نامعتبر است.';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است. لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.detail || error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Error selecting avatar:', error);
      } finally {
        this.saving = false;
        this.selectedAvatar = null;
      }
    },
    async fetchUserData() {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      try {
        const response = await axios.get('/getInfo');
        this.userData = response.data;
      } catch (error) {
        let errorMessage = 'خطا در دریافت اطلاعات کاربر';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است. لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.detail || error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Error fetching user data:', error);
      }
    },
    async saveProfile() {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

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

        if (this.passwordForm.new_password && this.passwordForm.current_password) {
          if (this.passwordForm.new_password !== this.passwordForm.confirm_password) {
            // Show error Toast for password mismatch
            Toast.fire({
              icon: 'error',
              title: 'رمز عبور جدید و تکرار آن مطابقت ندارند',
            });
            throw new Error('رمز عبور جدید و تکرار آن مطابقت ندارند');
          }

          await axios.post(`${this.baseUrl}/resetPassword/`, {
            old_password: this.passwordForm.current_password,
            new_password: this.passwordForm.new_password
          });
        }

        await this.fetchUserData();

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'تغییرات با موفقیت ذخیره شد',
        });
      } catch (error) {
        let errorMessage = 'خطا در ذخیره تغییرات. لطفاً دوباره تلاش کنید';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = '.درخواست نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است. لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.detail || error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Error saving profile:', error);
      } finally {
        this.saving = false;
      }
    },
    changeAvatar() {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      // Show Toast for change avatar click
      Toast.fire({
        icon: 'info',
        title: 'تغییر آواتار کلیک شد',
      });
    },
    regenerateAvatar() {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      // Show Toast for regenerate avatar click
      Toast.fire({
        icon: 'info',
        title: 'ساخت مجدد آواتار کلیک شد.',
      });
    },
    uploadProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedProfileImage = file;
        this.userProfilePicUrl = URL.createObjectURL(file);
      }
    }
  }
};
</script>

<style scoped>
 
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































/* Remove any default margins/paddings that might affect full width */
body, html {
  margin: 0;
  padding: 0;
}

/* Main container for the avatar selection */
.avatar-selection-container {
  width: 100%;
  display: flex;
  gap: 20px; /* Space between columns */
  margin-top: 2rem;
}

/* Each gender column */
.gender-column {
  flex: 1;
  min-width: 0;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

/* Grid layout inside each column */
.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Avatar card styling */
.avatar-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.avatar-card:hover {
  transform: translateY(-5px);
}

/* Model viewer container */
.model-preview-container {
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

/* Select button styling */
.select-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.select-button:hover {
  background-color: #4338ca;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .avatar-selection-container {
    flex-direction: column;
  }
  
  .avatar-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>