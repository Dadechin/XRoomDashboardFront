<template>
  <div class="signup-page">
    <div class="signup-form">
      <h2 class="title">
        <img :src="require('@/assets/img/logo.png')" alt="Logo" />
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
        <button type="submit"   class="submit-btn">
           ورود
        </button>
      </form>

      <!-- Login Link -->
      <div class="login-link">
        <router-link to="/signup">ساخت حساب کاربری</router-link>
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
        mobileNumber: '',
        password: '',
        terms: false,
      },
    };
  },
  methods: {
    async handleSubmit() {
  const loginData = {
    mobile_number: this.form.mobileNumber,
    password: this.form.password,
  };

  try {
    const response = await axios.post('http://194.62.43.230:8000/login', loginData);
    const token = response.data.token;
    const user = response.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.$router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    alert('خطا در ورود. لطفا دوباره تلاش کنید.');
  }
},

  },
};
</script>

 
<style scoped>
/* Add your styles here */
</style>

 
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
