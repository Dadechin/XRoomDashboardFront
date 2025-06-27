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
import axios from '@/axios'; // Adjust the path based on your project structure

export default {
  data() {
    return {
      form: {
        mobileNumber: '',
        code: '',
        password: '',
      },
      codeSent: false, // Tracks if the code has been sent
      isButtonDisabled: false, // Tracks if resend button is disabled
      countdown: 120, // Countdown timer in seconds (2 minutes)
      countdownInterval: null, // Interval for countdown
    };
  },
  mounted() {
    // Check for token and trigger SMS sending on mount
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.reload();
    } else {
      this.sendSms(); // Automatically call sendSms on mount
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
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Send request to get verification SMS
        const response = await axios.get('/sendSmsVerification', {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          // Update state to indicate code was sent
          this.codeSent = true;

          // Show success Toast
          Toast.fire({
            icon: 'success',
            title: '.کد تأیید به شماره موبایل شما ارسال شد',
          });

          // Start countdown for resend button
          this.startCountdown();
        } else {
          // Show error Toast with server message
          Toast.fire({
            icon: 'error',
            title: response.data.message || 'خطا در ارسال کد تأیید, لطفاً دوباره تلاش کنید',
          });
        }
      } catch (error) {
        // Handle specific error cases
        let errorMessage = 'خطا در ارسال کد تأیید, لطفاً دوباره تلاش کنید';
        if (error.response) {
          // Handle server errors (e.g., 400, 401)
          if (error.response.status === 400) {
            errorMessage = '.درخواست نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است, لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          // Handle network errors (no response from server)
          errorMessage = 'مشکل در ارتباط با سرور, لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        // Log error for debugging
        console.error('Error requesting SMS code:', error);
      }
    },
    startCountdown() {
      // Disable resend button and start countdown
      this.isButtonDisabled = true;
      this.countdown = 120; // Reset to 2 minutes

      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }

      // Update countdown every second
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
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // Send request to verify SMS code
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
          // Show success Toast
          Toast.fire({
            icon: 'success',
            title: '.کد تأیید صحیح است',
          });

          // Redirect to dashboard
          this.$router.push('/dashboard');
        } else {
          // Show error Toast with server message
          Toast.fire({
            icon: 'error',
            title: response.data.message || '.کد تأیید نامعتبر است',
          });
        }
      } catch (error) {
        // Handle specific error cases
        let errorMessage = '.کد تأیید نامعتبر است';
        if (error.response) {
          // Handle server errors (e.g., 400, 401)
          if (error.response.status === 400) {
            errorMessage = '.کد تأیید نامعتبر است';
          } else if (error.response.status === 401) {
            errorMessage = 'توکن نامعتبر است, لطفاً دوباره وارد شوید';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          // Handle network errors (no response from server)
          errorMessage = 'مشکل در ارتباط با سرور, لطفاً دوباره تلاش کنید';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        // Log error for debugging
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
