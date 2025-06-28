<template>
  <div class="signup-page">
    <div class="signup-form">
      <h2 class="title">
        <img :src="require('@/assets/img/Logins-logo.png')" alt="Logo" />
      </h2>
      <h3 class="subtitle">ساخت حساب کاربری</h3>

      <form @submit.prevent="handleSubmit">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">نام</label>
          <input v-model="form.firstName" type="text" id="firstName" placeholder="نام" />
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label for="lastName">نام خانوادگی</label>
          <input v-model="form.lastName" type="text" id="lastName" placeholder="نام خانوادگی" />
        </div>

        <!-- Job Title -->
        <div class="form-group">
          <label for="semat">جایگاه شغلی (سمت)</label>
          <input v-model="form.semat" type="text" id="semat" placeholder="سمت" />
        </div>

        <!-- Mobile Number -->
        <div class="form-group">
          <label for="phone">شماره تماس</label>
          <input v-model="form.mobileNumber" type="text" id="phone" placeholder="شماره تماس" />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">گذرواژه</label>
          <input v-model="form.password" type="password" id="password" placeholder="گذرواژه" />
        </div>

        <!-- Terms and Conditions -->
        <div class="terms-checkbox">
          <input type="checkbox" id="terms" v-model="form.terms" required />
          <label for="terms">کلیه قوانین داده شده و شرایط حریم خصوصی را مطالعه کرده و تأیید می‌کنم.</label>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="!form.terms" class="submit-btn">
          ثبت نام
        </button>
      </form>

      <!-- Login Link -->
      <div class="login-link">
        <router-link to="/">حساب کاربری دارید؟ وارد شوید</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        semat: '',
        mobileNumber: '',
        password: '',
        terms: false,
      },
    };
  },
  methods: {
    async handleSubmit() {
      // Define Toast configuration with SweetAlert2
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

      if (!this.form.firstName || !this.form.lastName || !this.form.semat || !this.form.mobileNumber || !this.form.password) {
        Toast.fire({
          icon: 'error',
          title: '.لطفاً تمام فیلدها را پر کنید',
        });
        return;
      }

      const signupData = {
        first_name: this.form.firstName,
        last_name: this.form.lastName,
        semat: this.form.semat,
        mobile_number: this.form.mobileNumber,
        password: this.form.password,
      };

      try {
        const response = await axios.post('http://194.62.43.230:8000/signup', signupData);

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);

          // Show success Toast
          Toast.fire({
            icon: 'success',
            title: '.حساب کاربری با موفقیت ساخته شد',
          });

          this.$router.push('/');
        } else {
          // Show error Toast with server message
          Toast.fire({
            icon: 'error',
            title: response.data.message || 'خطا در ثبت‌نام, لطفاً دوباره تلاش کنید',
          });
        }
      } catch (error) {
        let errorMessage = 'خطا در ثبت‌نام, لطفاً دوباره تلاش کنید';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = '.شماره تلفن قبلاً ثبت شده است';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور, لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Signup error:', error);
      }
    },
  },
};
</script>

 
<style scoped>
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body and Background Styling */
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/background.jpg'); /* Correct path */
  
   background-size: cover;
  background-position: center;
}

.signup-form {
  direction: rtl;
  background-color: rgba(255, 255, 255, 1); /* Semi-transparent white background */
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #4A90E2;
  text-align: center;
}

.subtitle {
  font-size: 24px;
  color: #444;
  text-align: right;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}

.form-group input:focus {
  border-color: #4A90E2;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
}

.terms-checkbox input {
  margin-right: 10px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4A90E2;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:enabled {
  background-color: #357ABD;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #4A90E2;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
