<template>
  <div class="signup-page">
    <div class="signup-form">
      <h2 class="title">
        <img :src="require('@/assets/img/Logins-logo.png')" alt="Logo" style="max-width: 150px;" />
      </h2>
      <h3 class="subtitle">فراموشی رمز عبور</h3>

      <h5 class="descript-xroom">
        رمز عبور خود را فراموش کرده اید؟ شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود.
      </h5>

      <!-- Step 1: Mobile Number Input -->
      <form v-if="!codeSent" @submit.prevent="requestResetCode">
        <div class="form-group">
          <label for="phone">شماره تماس</label>
          <input
            v-model="form.mobileNumber"
            type="text"
            id="phone"
            placeholder="شماره تماس"
            required
          />
        </div>
        <button type="submit" class="submit-btn">
          ارسال کد تأیید
        </button>
      </form>

      <!-- Step 2: Code and New Password Input -->
      <form v-else @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="code">کد تأیید</label>
          <input
            v-model="form.code"
            type="text"
            id="code"
            placeholder="کد تأیید دریافت شده"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">رمز عبور جدید</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="رمز عبور جدید"
            required
          />
        </div>
        <button type="submit" class="submit-btn">
          بازنشانی رمز عبور
        </button>
      </form>

      <!-- Links -->
      <div class="login-link">
        <router-link to="/signup">ساخت حساب کاربری</router-link> |
        <router-link to="/">ورود</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import apiClient from '@/api/axios'; // Adjust the path based on your project structure

export default {
  data() {
    return {
      form: {
        mobileNumber: '',
        code: '',
        password: '',
      },
      codeSent: false, // Tracks if the code has been sent
    };
  },
  methods: {
    async requestResetCode() {
      try {
        const response = await apiClient.post('/requestResetCode', {
          mobile_number: this.form.mobileNumber,
        });
        if (response.data.success) {
          this.codeSent = true;
          alert('کد تأیید به شماره موبایل شما ارسال شد.');
        }
      } catch (error) {
        console.error('Error requesting reset code:', error);
        alert('خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.');
      }
    },
    async resetPassword() {
      try {
        const response = await apiClient.post('/verifyResetCode', {
          mobile_number: this.form.mobileNumber,
          code: this.form.code,
          password: this.form.password,
        });
        if (response.data.success) {
          alert('رمز عبور با موفقیت بازنشانی شد.');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('خطا در بازنشانی رمز عبور. لطفاً کد یا رمز عبور را بررسی کنید.');
      }
    },
  },
};
</script>

<style scoped>

.descript-xroom {
  font-family: IRANSansXFaNum;
font-weight: 500;
font-size: 13px;
line-height: 210%;
letter-spacing: 0%;
text-align: justify;
vertical-align: middle;
margin-bottom: 30px;
}
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
