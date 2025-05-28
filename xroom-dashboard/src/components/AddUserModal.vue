<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>کاربر جدید</h2>
        <button @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#101010" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E2DEE9" />
            <path
              d="M21 11L11 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 11L21 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="popUp-title">
        <h2>دعوت کاربر جدید</h2>
        <span>کاربر یک ایمیل دعوت برای فعال کردن حساب خود دریافت می‌کند.</span>
      </div>
      <div class="popUp-objects">
        <form @submit.prevent="handleSubmit" autocomplete="off">
          <div class="form-group">
            <label for="first_name">نام</label>
            <input
              id="first_name"
              v-model="newUser.first_name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="last_name">نام خانوادگی</label>
            <input
              id="last_name"
              v-model="newUser.last_name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="mobile_number">شماره تماس</label>
            <input
              id="mobile_number"
              v-model="newUser.mobile_number"
              type="tel"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">رمز عبور</label>
            <input
              id="password"
              v-model="newUser.password"
              type="password"
              required
            />
          </div>
          <div class="form-group">
            <label for="semat">عنوان شغلی</label>
            <input
              id="semat"
              v-model="newUser.semat"
              type="text"
              required
            />
          </div>
          <div class="form-group" style="justify-content: normal;">
            <span>مدیر</span>
            <input
              type="checkbox"
              id="isAdmin"
              class="checkbox"
              v-model="newUser.isAdmin"
            />
            <label for="isAdmin" class="switch"></label>
          </div>
        </form>
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="close">بازگشت</button>
        <button type="submit" class="submit-btn" @click="handleSubmit">تایید</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddUserModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newUser: {
        first_name: '',
        last_name: '',
        mobile_number: '',
        password: '',
        semat: '',
        isAdmin: false,
      },
    };
  },
  methods: {
    close() {
      this.newUser = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        password: '',
        semat: '',
        isAdmin: false,
      };
      this.$emit('close');
    },
    handleSubmit() {
      if (!this.newUser.first_name || !this.newUser.last_name || !this.newUser.mobile_number || !this.newUser.password || !this.newUser.semat) {
        alert('لطفاً تمام فیلدها را پر کنید.');
        return;
      }
<<<<<<< HEAD
      
      this.$emit('add-user', { ...this.newUser });
      this.close();
=======

      const token = localStorage.getItem('token');
      const userData = {
        mobile_number: this.newUser.mobile_number,
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        semat: this.newUser.semat,
        password: this.newUser.password,
        isAdmin: this.newUser.isAdmin ? 'true' : 'false', // Sending as string "true" or "false"
      };

      axios.post('http://my.xroomapp.com:8000/add_teamMember', userData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('کاربر جدید:', response.data);
        alert('کاربر با موفقیت اضافه شد');
        this.close();
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        alert('خطا در افزودن کاربر');
      });
>>>>>>> a042a56a6722c011d4746a55c172b4927d2b7fef
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #F7F5FA;
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  direction: rtl;
  padding-bottom: 1.5rem;
  height: 95vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.popUp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #101010;
  color: #fff;
  padding: 20px 26px;
  margin-bottom: 1.5rem;
  border-radius: 20px 20px 0 0;
}

.popUp-header h2 {
  font-size: 22px;
}

.popUp-header button {
  background-color: inherit;
  border: none;
  cursor: pointer;
}

.popUp-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 50px 20px 20px;
}

.popUp-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101010;
}

.popUp-title span {
  font-size: 16px;
  font-weight: 500;
  color: #4F5A69;
  margin-top: 1rem;
}

.popUp-objects {
  margin: 1rem auto 0;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 620px;
  display: block;
}

.form-group {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group label {
  font-weight: 500;
  width: 50%;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0;
  width: 100%;
  max-width: 620px;
  margin: auto;
}

.submit-btn,
.cancel-btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 47%;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
}

.submit-btn {
  background-color: #3A57E8;
  color: white;
}

.cancel-btn {
  background-color: #EBEEFD;
  color: #101010;
}

/* checkbox toggler */

.switch {
  position: relative;
  display: inline-block;
  width: 60px !important;
  height: 25px;
  background-color: #CCCCCC;
  border-radius: 20px;
  margin-right: 12.5rem;
}

.switch::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: 2px;
  right: 3px;
  transition: all 0.3s;
}

.checkbox:checked + .switch::after {
  right: 37px;
}

.checkbox:checked + .switch {
  background-color: #3a57e8;
}

.checkbox {
  display: none;
}
</style>
