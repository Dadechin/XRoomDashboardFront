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
  components: {
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
  setup() {
    const maleAvatars = ref([
      { id: 1, name: 'مرد ۱', src: 'http://my.xroomapp.com:8000/media/user_glbs/men1.glb', profile_img:'http://my.xroomapp.com:8000/media/user_images/men1.png' },
      { id: 2, name: 'مرد ۲', src: 'http://my.xroomapp.com:8000/media/user_glbs/men2.glb' , profile_img:'http://my.xroomapp.com:8000/media/user_images/men2.png'},
      { id: 7, name: 'مرد ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/men3.glb' , profile_img:'http://my.xroomapp.com:8000/media/user_images/men3.png'},
      { id: 17, name: 'مرد 4', src: 'http://my.xroomapp.com:8000/media/user_glbs/men4.glb' , profile_img:'http://my.xroomapp.com:8000/media/user_images/men4.png'},
      // Add more male avatars as needed
    ]);

 
    
    const femaleAvatars = ref([
  { id: 4, name: 'زن ۱', src: 'http://my.xroomapp.com:8000/media/user_glbs/women1.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women1.png' },
  { id: 10, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women2.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women2.png' },
  { id: 10, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women3.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women3.png' },
  { id: 10, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women4.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women4.png' },
  { id: 10, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women6.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women6.png' },
  { id: 10, name: 'زن ۳', src: 'http://my.xroomapp.com:8000/media/user_glbs/women7.glb', profile_img: 'http://my.xroomapp.com:8000/media/user_images/women7.png' },
]);
    const selectedAvatar = ref(null);

    // const selectAvatar = (avatar) => {
    //   selectedAvatar.value = avatar;
    //   // You can add API call here to save the selected avatar
    //   console.log('Selected avatar:', avatar);
    // };

    return {
      maleAvatars,
      femaleAvatars,
      selectedAvatar,
      // selectAvatar,
    };
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
    async selectAvatar(avatar) {
      this.saving = true;
      this.selectedAvatar = avatar.id;
      
      // try {
          await axios.post(`${this.baseUrl}/editProfile/`, {
          profile_glb_url: avatar.src ,
          profile_img: avatar.profile_img
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // print(response)
        // Update local storage if needed
        // const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        // customer.profile_glb = avatar.src;
        // localStorage.setItem('customer', JSON.stringify(customer));

        // Show success message
        // this.$toast.success('آواتار با موفقیت انتخاب شد');
        alert('تغییرات با موفقیت ذخیره شد');

        // Optionally refresh user data
        // await this.fetchUserData();
        
      // } catch (error) {
      //   console.error('Error selecting avatar:', error);
      //   const errorMessage = error.response?.data?.detail || 
      //                      error.response?.data?.message || 
      //                      'خطا در انتخاب آواتار';
      //   this.$toast.error(errorMessage);
      // } finally {
      //   this.saving = false;
      //   this.selectedAvatar = null;
      // }
    },
    
    async fetchUserData() {
      try {
        const response = await axios.get('/getInfo');
        this.userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
  //   async selectAvatar(avatar) {
  //   try {
  //     const response = await axios.post(
  //       'http://194.62.43.230:8000/editProfile',
  //       {
  //         profile_glb: avatar.src  // Send the GLB URL in the specified field
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${yourAuthToken}` // Add if you use authentication
  //         }
  //       }
  //     );
      
  //     // Show success message
  //     alert('آواتار با موفقیت انتخاب شد!');
  //     console.log('Avatar selected:', response.data);
      
  //   } catch (error) {
  //     console.error('Error selecting avatar:', error);
  //     alert('خطا در انتخاب آواتار!');
  //   }
  // },
    
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
