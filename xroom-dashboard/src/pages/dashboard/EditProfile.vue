<template>
    <div>
      <div class="profile-edit-container">
        <div class="column">
          <div class="form-section">
            <h3>آواتار واقعیت مجازی شما</h3>
            <p class="section-description">
              می‌توانید با آپلود یک تصویر، به شخصی‌سازی آواتار خود، ظاهر خود را در محیط واقعیت مجازی ویرایش کنید.
            </p>
            <div class="avatar-actions">
              <img :src="userProfilePicUrl" class="avatar-image" />
              <div style="display: flex;align-items: center;gap: 2.5rem;">
                <span style="display: flex;align-items: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_312_6762)">
                    <path d="M14.1147 4.54126C14.4671 4.18888 14.6652 3.71091 14.6652 3.2125C14.6653 2.71409 14.4674 2.23607 14.115 1.8836C13.7626 1.53112 13.2846 1.33307 12.7862 1.33301C12.2878 1.33295 11.8098 1.53088 11.4573 1.88326L2.55999 10.7826C2.4052 10.9369 2.29073 11.127 2.22665 11.3359L1.34599 14.2373C1.32876 14.2949 1.32746 14.3562 1.34222 14.4145C1.35699 14.4728 1.38727 14.5261 1.42985 14.5686C1.47244 14.6111 1.52573 14.6413 1.58409 14.656C1.64245 14.6707 1.70369 14.6693 1.76132 14.6519L4.66332 13.7719C4.8721 13.7084 5.0621 13.5947 5.21665 13.4406L14.1147 4.54126Z" stroke="#3A57E8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 3.33325L12.6667 5.99992" stroke="#3A57E8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_312_6762">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  <router-link to="/dashboard/ChangeAvatar">تغییر آواتار </router-link>
                </span>
                <span style="display: flex;align-items: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8C2 9.18669 2.35189 10.3467 3.01118 11.3334C3.67047 12.3201 4.60754 13.0892 5.7039 13.5433C6.80026 13.9974 8.00666 14.1162 9.17054 13.8847C10.3344 13.6532 11.4035 13.0818 12.2426 12.2426C13.0818 11.4035 13.6532 10.3344 13.8847 9.17054C14.1162 8.00666 13.9974 6.80026 13.5433 5.7039C13.0892 4.60754 12.3201 3.67047 11.3334 3.01118C10.3467 2.35189 9.18669 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333" stroke="#3A57E8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 2V5.33333H5.33333" stroke="#3A57E8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <router-link to="/dashboard/ChangeAvatar">ساخت آواتار جدید </router-link>
                </span>
              </div>
            </div>
          </div>
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
        <div class="column">
          <div class="form-section">
            <h3>تصویر پروفایل</h3>
            <p class="section-description">
              این نماد در کنار نام شما و برای دیگران در واقعیت مجازی و در پلتفرم وب قابل مشاهده خواهد بود.
            </p>
            <div style="display: flex; align-items: center;">
              <img :src="userProfilePicUrl" class="profile-image" />
              <label class="profile-upload" for="profile-upload">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M2.66602 11.3333V12.6666C2.66602 13.0202 2.80649 13.3593 3.05654 13.6094C3.30659 13.8594 3.64573 13.9999 3.99935 13.9999H11.9993C12.353 13.9999 12.6921 13.8594 12.9422 13.6094C13.1922 13.3593 13.3327 13.0202 13.3327 12.6666V11.3333"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 2.66675V10.6667"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>آپلود</span>
              </label>
              <input type="file" @change="uploadProfileImage" id="profile-upload" class="upload-input" style="display: none;" />
            </div>
          </div>
          <div class="form-section">
            <h3>اطلاعات کاربر</h3>
            <div class="form-group">
              <label for="email">آدرس ایمیل</label>
              <input type="email" id="email" v-model="editForm.email" disabled />
            </div>
            <div class="form-group">
              <label for="firstName">نام</label>
              <input type="text" id="firstName" v-model="editForm.first_name" placeholder="نام" />
            </div>
            <div class="form-group">
              <label for="lastName">نام خانوادگی</label>
              <input type="text" id="lastName" v-model="editForm.last_name" placeholder="نام خانوادگی" />
            </div>
            <div class="form-group">
              <label for="position">جایگاه</label>
              <input v-model="editForm.semat" type="text" id="position" placeholder="جایگاه شغلی (اختیاری)" />
            </div>
            <button class="save-btn" @click="saveProfile" :disabled="saving">
              {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'EditProfile',
  components: {},
  data() {
    return {
      selectedProfileImage: null,
      userData: {
        customer: { semat: '', profile_img: '' },
        user: { first_name: '', last_name: '' },
      },
      editForm: { first_name: '', last_name: '', email: '', semat: '' },
      passwordForm: { current_password: '', new_password: '', confirm_password: '' },
      initialFormState: { first_name: '', last_name: '', semat: '' },
      saving: false,
      userAvatarUrl: 'https://i.imgur.com/QbXfV6C.png',
      baseUrl: 'http://194.62.43.230:8000',
    };
  },
  created() {
    this.fetchUserData();
  },
  computed: {
    userProfilePicUrl() {
      // Prioritize userData from API if available
      if (this.userData.customer && this.userData.customer.profile_img) {
        return this.userData.customer.profile_img;
      }
      // Fallback to localStorage
      const customer = JSON.parse(localStorage.getItem('customer') || '{}');
      return customer.profile_img || this.userAvatarUrl;
    },
  },
  methods: {
    async fetchUserData() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      try {
        const response = await axios.get('/getInfo');

        // Check if response.data and required fields exist
        if (!response.data || !response.data.data) {
          throw new Error('داده‌های پاسخ از سرور معتبر نیست');
        }

        const userData = response.data.data; // Adjust to match the nested 'data' structure
        if (!userData.user || !userData.customer) {
          throw new Error('داده‌های کاربر یا مشتری در پاسخ سرور وجود ندارد');
        }

        this.userData = userData;
        this.editForm = {
          first_name: userData.user.first_name || '',
          last_name: userData.user.last_name || '',
          email: userData.user.email || '',
          semat: userData.customer.semat || '',
        };
        this.initialFormState = {
          first_name: this.editForm.first_name,
          last_name: this.editForm.last_name,
          semat: this.editForm.semat,
        };

        // Update localStorage to keep it in sync with the API response
        localStorage.setItem('customer', JSON.stringify(userData.customer));
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'خطا در بارگذاری اطلاعات کاربر. لطفاً دوباره تلاش کنید',
        });
        console.error('Error fetching user data:', error);
        // Initialize with default values to prevent breaking the UI
        this.editForm = {
          first_name: '',
          last_name: '',
          email: '',
          semat: '',
        };
        this.initialFormState = {
          first_name: '',
          last_name: '',
          semat: '',
        };
      }
    },
    async saveProfile() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      this.saving = true;
      let isProfileChanged = false;
      let isPasswordChanged = false;
      let onlyNameChanged = false;

      try {
        const formData = new FormData();

        if (this.editForm.first_name !== this.initialFormState.first_name || this.editForm.last_name !== this.initialFormState.last_name) {
          formData.append('first_name', this.editForm.first_name);
          formData.append('last_name', this.editForm.last_name);
          isProfileChanged = true;
          onlyNameChanged = true;
        }

        if (this.editForm.semat !== this.initialFormState.semat) {
          formData.append('semat', this.editForm.semat);
          isProfileChanged = true;
          onlyNameChanged = false;
        }

        if (this.selectedProfileImage) {
          formData.append('profile_img', this.selectedProfileImage);
          isProfileChanged = true;
          onlyNameChanged = false;
        }

        if (isProfileChanged) {
          await axios.post(`${this.baseUrl}/editProfile/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        if (this.passwordForm.current_password && this.passwordForm.new_password) {
          if (this.passwordForm.new_password !== this.passwordForm.confirm_password) {
            Toast.fire({
              icon: 'error',
              title: 'رمز عبور جدید و تکرار آن مطابقت ندارند',
            });
            this.saving = false;
            return;
          }

          await axios.post(`${this.baseUrl}/resetPassword/`, {
            old_password: this.passwordForm.current_password,
            new_password: this.passwordForm.new_password,
          });
          isPasswordChanged = true;
          onlyNameChanged = false;
        }

        if (!isProfileChanged && !isPasswordChanged) {
          Toast.fire({
            icon: 'info',
            title: 'هیچ تغییری اعمال نشده است',
          });
          this.saving = false;
          return;
        }

        await this.fetchUserData();
        this.passwordForm = { current_password: '', new_password: '', confirm_password: '' };
        this.editForm.first_name = '';
        this.editForm.last_name = '';
        this.editForm.semat = '';
        this.selectedProfileImage = null;

        Toast.fire({
          icon: 'success',
          title: 'تغییرات با موفقیت ذخیره شد',
        });

        if (onlyNameChanged) {
          window.location.reload();
        }
      } catch (error) {
        let errorMessage = 'خطا در ذخیره تغییرات';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'اطلاعات ورودی نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'رمز عبور فعلی اشتباه است';
          } else {
            errorMessage = error.response.data.detail || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور، لطفاً دوباره تلاش کنید';
        }

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
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'info',
        title: 'تغییر آواتار کلیک شد',
      });
    },
    regenerateAvatar() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'info',
        title: 'ساخت مجدد آواتار کلیک شد',
      });
    },
    uploadProfileImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedProfileImage = file;
        this.userProfilePicUrl = URL.createObjectURL(file);
      }
    },
  },
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
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.form-section h3 {
  margin-bottom: 1.5rem;
  color: #101010;
  font-weight: 600;
  font-size: 21px;
}

.section-description {
  color: #667387;
  font-size: 16px;
  margin-bottom: 12px;
  line-height: 190%;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-upload {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #6dc993;
  padding: 10px 26px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
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
  width: 70%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  direction: rtl;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
}

input:disabled {
  background: #f5f5f5;
  color: #777;
  width: 70%;
}

.avatar-image,
.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.avatar-actions {
  display: flex;
  align-items: center;
}

.avatar-actions a {
  color: #3a57e8;
  font-size: 15px;
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
  width: 70%;
  display: block;
  margin-right: auto;
}

.save-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-input {
  margin-top: 8px;
}


/* سایز موبایل (max-width: 600px) */
@media screen and (max-width: 600px) {
  .profile-edit-container {
    flex-direction: column;
    gap: 16px;
  }

  .column {
    width: 100%;
  }

  .form-section {
    padding: 16px;
    margin-bottom: 16px;
  }

  .form-section h3 {
    font-size: 18px;
  }

  .section-description {
    font-size: 14px;
    line-height: 170%;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input:disabled {
    width: 100%;
    font-size: 13px;
    padding: 8px 12px;
  }

  .save-btn {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }

  .avatar-image,
  .profile-image {
    width: 80px;
    height: 80px;
  }

  .avatar-actions {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .profile-upload {
    padding: 8px 20px;
    font-size: 16px;
  }

  .avatar-actions a {
    font-size: 14px;
  }
}

/* سایز تبلت کوچک (min-width: 600px - max-width: 1024px) */
@media screen and (min-width: 600px) and (max-width: 1024px) {
  .profile-edit-container {
    flex-direction: column;
    gap: 24px;
  }

  .column {
    width: 100%;
  }

  .form-section {
    padding: 20px;
    margin-bottom: 20px;
  }

  .form-section h3 {
    font-size: 20px;
  }

  .section-description {
    font-size: 15px;
  }

  .form-group {
    flex-direction: row;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input:disabled {
    width: 65%;
    font-size: 14px;
  }

  .save-btn {
    width: 65%;
    padding: 10px;
  }

  .avatar-image,
  .profile-image {
    width: 100px;
    height: 100px;
  }

  .avatar-actions {
    flex-direction: row;
    gap: 16px;
  }

  .profile-upload {
    padding: 10px 24px;
    font-size: 17px;
  }
}

/* سایز تبلت بزرگ و لپ‌تاپ کوچک (min-width: 1024px - max-width: 1280px) */
@media screen and (min-width: 1024px) and (max-width: 1280px) {
   .profile-edit-container {
    flex-direction: column;
    gap: 24px;
  }

  .column {
    width: 100%;
  }

  .form-section {
    padding: 20px;
    margin-bottom: 20px;
  }

  .form-section h3 {
    font-size: 20px;
  }

  .section-description {
    font-size: 15px;
  }

  .form-group {
    flex-direction: row;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input:disabled {
    width: 65%;
    font-size: 14px;
  }

  .save-btn {
    width: 65%;
    padding: 10px;
  }

  .avatar-image,
  .profile-image {
    width: 100px;
    height: 100px;
  }

  .avatar-actions {
    flex-direction: row;
    gap: 16px;
  }

  .profile-upload {
    padding: 10px 24px;
    font-size: 17px;
  }
}

/* سایز دسکتاپ (min-width: 1280px) */
@media screen and (min-width: 1280px) {
  /* استایل‌های اصلی دسکتاپ که در بالا تعریف شده‌اند اعمال می‌شوند */
  /* تغییرات اضافی در صورت نیاز می‌توانید اینجا اضافه کنید */
  .profile-edit-container {
    gap: 32px;
  }

  .form-section {
    padding: 24px;
  }
}
</style>