<template>
  <div v-if="isVisible" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>ویرایش صورت حساب</h2>
        <button @click="$emit('close')">
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
        <h2>اطلاعات صورت حساب</h2>
        <span>لطفا جزئیات صورت حساب خود را وارد کنید تا صورت حساب خود را تنظیم کنید.</span>
      </div>
      <div class="popUp-objects">
        <form @submit.prevent="handleSubmit" autocomplete="off">
          <div class="form-group is-compony-form" style="justify-content: normal;">
            <span>سفارش به عنوان یک شرکت</span>
            <input
              type="checkbox"
              id="toggle"
              class="checkbox"
              v-model="form.isCompany"
            />
            <label for="toggle" class="switch"></label>
          </div>
          <div class="form-group">
            <label for="name">نام</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">آدرس</label>
            <input
              id="address"
              v-model="form.address"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="city">شهر</label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="postalCode">کدپستی</label>
            <input
              id="postalCode"
              v-model="form.postalCode"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">شماره تماس</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">ایمیل</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
            />
          </div>
        </form>
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('close')">بازگشت</button>
        <button type="submit" class="submit-btn" @click="handleSubmit">تایید</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateSpaceModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        isCompany: false,
        name: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
      },
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        // غیرفعال کردن اسکرول هنگام باز شدن پاپ‌آپ
        document.body.style.overflow = 'hidden';
      } else {
        // فعال کردن اسکرول هنگام بسته شدن پاپ‌آپ
        document.body.style.overflow = '';
      }
    },
  },
  methods: {
    beforeDestroy() {
    // اطمینان از فعال شدن اسکرول هنگام حذف کامپوننت
    document.body.style.overflow = '';
    },
    handleSubmit() {
      console.log('اطلاعات صورت حساب:', JSON.stringify(this.form, null, 2));
    /*  console.log('اطلاعات صورت حساب:', this.form);  */
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.form = {
        isCompany: false,
        name: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        email: '',
      };
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
  height: max-content;
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
  height: 45px;
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 22rem;
}

.form-group input:focus {
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
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

/* Checkbox toggler */
.switch {
  position: relative;
  display: inline-block;
  width: 60px !important;
  height: 25px;
  background-color: #CCCCCC;
  border-radius: 20px;
  margin-right: 4rem;
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
  background-color: #3A57E8;
}

.checkbox {
  display: none;
}

/* Responsive Styles */

/* Mobile: max-width 600px */
@media (max-width: 600px) {
  .modal-content {
    max-width: 90%;
    height: 85vh;
    margin: 0 1rem;
    padding-bottom: 0.5rem;
  }

  .popUp-header {
    padding: 15px 20px;
  }

  .popUp-header h2 {
    font-size: 18px;
  }

  .popUp-header button svg {
    width: 28px;
    height: 28px;
  }

  .popUp-title {
    padding: 15px 20px;
  }

  .popUp-title h2 {
    font-size: 18px;
  }

  .popUp-title span {
    font-size: 14px;
    margin-top: 0.75rem;
    line-height: 150%;
  }

  .popUp-objects {
    max-width: 90%;
    padding: 15px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 0.5rem;
  }

  .is-compony-form {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
  }

  .form-group label {
    width: 100%;
    font-size: 14px;
  }

  .form-group input {
    width: 100%;
    font-size: 14px;
    height: 2.25rem;
    max-width: 100%;
  }

  .form-actions {
    flex-direction: row;
    gap: 1rem;
    padding: 15px 0;
    max-width: 90%;
  }

  .submit-btn,
  .cancel-btn {
    width: 48%;
    height: 40px;
    font-size: 14px;
  }

  /* Checkbox in mobile */
  .form-group .switch {
    margin-right: 0;
    width: 50px !important;
    height: 20px;
  }

  .form-group .switch::after {
    width: 16px;
    height: 16px;
    top: 2px;
    right: 2px;
  }

  .checkbox:checked + .switch::after {
    right: 32px;
  }
}

/* Tablet: min-width 600px - max-width 1024px */
@media (min-width: 600px) and (max-width: 1024px) {
  .modal-content {
    max-width: 80%;
    height: 95vh;
  }

  .popUp-objects {
    max-width: 90%;
  }

  .form-actions {
    max-width: 90%;
  }

  .form-group input {
    max-width: 20rem;
  }

  .form-group .switch {
    margin-right: 3rem;
  }
}

/* Large Tablet / Small Desktop: min-width 1024px - max-width 1280px */
@media (min-width: 1024px) and (max-width: 1280px) {
  .modal-content {
    max-width: 720px;
    height: 95vh;
  }

  .popUp-objects {
    max-width: 680px;
  }

  .form-actions {
    max-width: 680px;
  }

  .form-group .switch {
    margin-right: 3.5rem;
  }
}

/* Desktop: min-width 1280px */
@media (min-width: 1280px) {
  .modal-content {
    max-width: 700px;
    height: 95vh;
  }

  .popUp-objects {
    max-width: 620px;
  }

  .form-actions {
    max-width: 620px;
  }
}
</style>