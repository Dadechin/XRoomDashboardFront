<template>
  <div v-if="isVisible" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>ایجاد جلسه جدید</h2>
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
        <h2>اضافه کردن فضای جدید</h2>
        <span>برای ایجاد فضای جدید فرم زیر را تکمیل نمایید.</span>
      </div>
      <div class="popUp-objects">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="spaceName">نام:</label>
            <input
              id="spaceName"
              v-model="form.name"
              type="text"
              required
              placeholder="نام فضا را وارد کنید"
            />
          </div>
          <div class="form-group">
            <label for="spaceCapacity">ظرفیت:</label>
            <input
              id="spaceCapacity"
              v-model.number="form.capacity"
              type="number"
              required
              placeholder="ظرفیت (تعداد کاربر)"
            />
          </div>
          <div class="form-group">
            <label for="spaceType">امکانات فضای مد نظر:</label>
            <textarea
              id="spaceType"
              v-model="form.features"
              required
              placeholder="امکانات فضا را وارد کنید"
            ></textarea>
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
        name: '',
        capacity: null,
        features: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.form.name && this.form.capacity && this.form.features) {
        console.log('داده‌های فرم:', {
          name: this.form.name,
          capacity: this.form.capacity,
          features: this.form.features,
        });
        this.form = {
          name: '',
          capacity: null,
          features: '',
        };
        this.$emit('close');
      }
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
  max-width: 25rem
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
</style>