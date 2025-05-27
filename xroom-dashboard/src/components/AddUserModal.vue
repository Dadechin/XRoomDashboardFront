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
            <label for="full_name">نام و نام خانوادگی</label>
            <input
              id="full_name"
              v-model="newUser.full_name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">ایمیل</label>
            <input
              id="email"
              v-model="newUser.email"
              type="email"
              required
              style="text-align: left;"
            />
          </div>
          <div class="form-group">
            <label for="phone">شماره تماس</label>
            <input
              id="phone"
              v-model="newUser.phone"
              type="tel"
              required
            />
          </div>
          <div class="form-group">
            <label for="job_title">عنوان شغلی</label>
            <input
              id="job_title"
              v-model="newUser.job_title"
              type="text"
              required
            />
          </div>
          <div class="form-group" style="justify-content: normal;">
            <span>مدیر</span>
            <input
              type="checkbox"
              id="is_manager"
              class="checkbox"
              v-model="newUser.is_manager"
            />
            <label for="is_manager" class="switch"></label>
          </div>
          <div class="form-group" style="justify-content: normal;">
            <span>مجوز</span>
            <input
              type="checkbox"
              id="has_permission"
              class="checkbox"
              v-model="newUser.has_permission"
            />
            <label for="has_permission" class="switch"></label>
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
        full_name: '',
        phone: '',
        email: '',
        job_title: '',
        is_manager: false,
        has_permission: false,
      },
    };
  },
  methods: {
    close() {
      this.newUser = {
        full_name: '',
        phone: '',
        email: '',
        job_title: '',
        is_manager: false,
        has_permission: false,
      };
      this.$emit('close');
    },
    handleSubmit() {
      if (!this.newUser.full_name || !this.newUser.email || !this.newUser.phone || !this.newUser.job_title) {
        alert('لطفاً تمام فیلدها را پر کنید.');
        return;
      }
      this.$emit('add-user', { ...this.newUser });
      console.log('اطلاعات کاربر اضافه شده:', JSON.stringify(this.newUser, null, 2));
      this.close();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0; /* جایگزین top: 0; left: 0; right: 0; bottom: 0 */
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
  background-color: inherit; /* استفاده از inherit برای حذف تکرار #101010 */
  border: none;
  cursor: pointer;
}

.popUp-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* اصلاح start به flex-start برای استاندارد بودن */
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
  margin: 1rem auto 0; /* ترکیب margin-top و margin: auto */
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  resize: none; /* برای textarea */
}

.form-group input {
  height: 45px;
  max-width: 22rem;
}

.form-group textarea {
  height: 140px;
  max-width: 25rem;
}

.form-group input:focus,
.form-group textarea:focus {
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
    position : relative ;
    display : inline-block;
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
    display : none;
}

</style>