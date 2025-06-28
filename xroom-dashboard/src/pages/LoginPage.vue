<template>
  <div class="signup-page">
    <div class="signup-form">
      <h2 class="title">
        <img :src="require('@/assets/img/Logins-logo.png')" alt="Logo" style="max-width: 150px;" />
      </h2>
      <h3 class="subtitle">ورود به حساب کاربری</h3>

      <form @submit.prevent="handleSubmit">
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

        <!-- Submit Button -->
        <button type="submit" class="submit-btn">
          ورود
        </button>
      </form>

      <!-- Login Link -->
      <div class="login-link">
        <router-link to="/signup">ساخت حساب کاربری</router-link>
      </div>
      <!-- Reset Password Link -->
      <div class="login-link">
        <router-link to="/resetPassword">فراموشی رمز عبور</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/axios';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
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

      const loginData = {
        mobile_number: this.form.mobileNumber,
        password: this.form.password,
      };

      try {
        const response = await apiClient.post('/login', loginData);

        if (response.data.status === 200) {
          const token = response.data.data.token;
          const user = response.data.data.user;

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Show success Toast
          Toast.fire({
            icon: 'success',
            title: 'ورود با موفقیت انجام شد',
          });

          this.$router.push('/dashboard');
        } else {
          // Show error Toast with server message
          Toast.fire({
            icon: 'error',
            title: response.data.message || 'خطا در ورود, لطفا دوباره تلاش کنید',
          });
        }
      } catch (error) {
        let errorMessage = 'خطا در ورود, لطفا دوباره تلاش کنید';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = '.شماره تماس یا رمز عبور اشتباه است';
          } else if (error.response.status === 400) {
            errorMessage = '.اطلاعات ورودی نامعتبر است';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور, لطفا دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Login error:', error);
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
  max-width: 682px;
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
  margin-top: 66px;
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
