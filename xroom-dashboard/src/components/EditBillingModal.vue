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
          <div class="form-group" style="justify-content: normal;">
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
  methods: {
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #F7F5FA;
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  direction: rtl;
  border-radius: 20px;
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
    width: 100%;
    padding: 20px 26px;
    margin-bottom: 1.5rem;
    border-radius: 20px 20px 0px 0px;
}

.popUp-header h2 {
  font-size: 22px;
}

.popUp-header button {
    background-color: #101010;
    border: none;
    cursor: pointer;
}

.popUp-title {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
    padding-right: 50px;
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
    margin-top: 1rem !important;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 16px;
    width: 100%;
    max-width: 620px;
    display: block;
    margin: auto;
}

.form-group {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group label {
  display: block;
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
  max-width: 22rem
}

.form-group textarea {
  height: 140px;
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 25rem;
  resize: none;
}

.form-group input:focus {
    outline: none;
}

.form-group textarea:focus {
    outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0;
  width: 100%;
  max-width: 620px;
  margin: auto;
}

.submit-btn,
.cancel-btn {
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 47%;
}

.submit-btn {
  background-color: #3A57E8;
  color: white;
  font-weight: 500;
  font-size: 18px;
}

.cancel-btn {
  background-color: #EBEEFD;
  color: #101010;
  font-weight: 500;
  font-size: 18px;
}

/* checkbox toggler */

.switch { 
    position : relative ;
    display : inline-block;
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
    background-color: #3a57e8;
}

.checkbox { 
    display : none;
}


</style>