<template>
  <div class="signup-page">
    <div class="signup-form">
      <h2 class="title">
        <img :src="require('@/assets/img/Logins-logo.png')" alt="Logo" style="max-width: 150px;" />
      </h2>
      <h3 class="subtitle">تأیید شماره موبایل</h3>

      <h5 class="descript-xroom">
        پیامکی شامل کد تأیید به موبایل شما ارسال شده است.
      </h5>

      <button
        type="button"
        class="submit-btn"
        style="margin-bottom: 35px;"
        :disabled="isButtonDisabled"
        @click="sendSms"
      >
        <span v-if="isButtonDisabled">
          ارسال مجدد کد ({{ Math.floor(countdown / 60) }}:{{ String(countdown % 60).padStart(2, '0') }})
        </span>
        <span v-else>
          ارسال مجدد کد
        </span>
      </button>

      <!-- Code Input -->
      <form @submit.prevent="submitSmsVerification">
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

        <button type="submit" class="submit-btn">
          تأیید کد
        </button>
      </form>

      <!-- Links -->
      <div class="login-link">
        <router-link to="/signup">ساخت حساب کاربری</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      form: {
        mobileNumber: '',
        code: '',
        password: '',
      },
      codeSent: false,
      isButtonDisabled: false,
      countdown: 120,
      countdownInterval: null,
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.reload();
    } else {
      this.sendSms();
    }
  },
  methods: {
    async sendSms() {
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

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/sendSmsVerification', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          this.codeSent = true;
          Toast.fire({
            icon: 'success',
            title: '.کد تأیید به شماره موبایل شما ارسال شد',
          });
          this.startCountdown();
        } else {
          Toast.fire({
            icon: 'error',
            title: response.data.message || 'خطا در ارسال کد تأیید, لطفاً دوباره تلاش کنید',
          });
        }
      } catch (error) {
        let errorMessage = 'خطا در ارسال کد تأیید, لطفاً دوباره تلاش کنید';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = '.درخواست نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است, لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور, لطفاً دوباره تلاش کنید';
        }
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
        console.error('Error requesting SMS code:', error);
      }
    },
    startCountdown() {
      this.isButtonDisabled = true;
      this.countdown = 120;

      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }

      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          this.isButtonDisabled = false;
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    },
    async submitSmsVerification() {
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

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          '/submitSmsVerification',
          {
            verification_sms_code: this.form.code,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: '.کد تأیید صحیح است',
          });
          this.$router.push('/dashboard');
        } else {
          Toast.fire({
            icon: 'error',
            title: response.data.message || '.کد تأیید نامعتبر است',
          });
        }
      } catch (error) {
        let errorMessage = '.کد تأیید نامعتبر است';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = '.کد تأیید نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است, لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور, لطفاً دوباره تلاش کنید';
        }
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
        console.error('Error verifying SMS code:', error);
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
