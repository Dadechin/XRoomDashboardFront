<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>فضا جدید</h2>
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
        <!-- Space Selection Cards -->
        <div v-if="spaces.length > 0" class="space-selection">
          <div 
            v-for="(space, index) in spaces" 
            :key="index" 
            class="space-card" 
            @click="selectSpace(space)"
            :class="{ selected: selectedSpace === space }"  
          >
            <img :src="'http://my.xroomapp.com:8000' + space.img" alt="فضای اختصاصی" class="space-img" />
            <div class="space-info">
              <h3 class="space-name">{{ space.name }}</h3>
              <p class="space-type">{{ space.type }}</p>
              <p class="space-capacity">حداکثر: {{ space.capacity }} کاربر</p>
            </div>
          </div>
        </div> 

        <div v-if="spaces.length === 0 && !isLoading" class="loading-message">
          <p>امکان ساختن فضا برای شما وجود ندارد</p>
        </div>
        <div v-else-if="spaces.length === 0 && isLoading" class="loading-message">
          <p>در حال بارگذاری فضاها...</p>
        </div>
      </div>
      
      <div class="popUp-objects">
        <div class="popUp-title-object">
          <h2>اضافه کردن فضا جدید</h2>
          <span>برای ایجاد فضای جدید فرم زیر را تکمیل نمایید .</span>
        </div>


        <!-- Form to enter additional information -->
        <div v-if="selectedSpace" class="space-form">
          <form @submit.prevent="submitForm">

            <div class="form-group">
              <label for="name">نام:</label>
              <input type="text" v-model="form.name" id="name" required />
            </div>
            
            <div class="form-group">
              <label for="capacity">ظرفیت:</label>
              <input type="number" v-model="form.capacity" id="capacity" required />
            </div>
            
            <div class="form-group">
              <label for="description">توضیحات:</label>
              <textarea v-model="form.description" id="description" required></textarea>
            </div>
          </form>
        </div>
      </div>
      <div class="form-actions" v-if="selectedSpace">
          <button type="button" class="cancel-btn" @click="closeModal">بازگشت</button>
          <button type="submit" class="submit-btn" @click="submitForm">تایید</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      spaces: [],
      selectedSpace: null,
      form: {
        name: '',
        capacity: '',
        description: '',
      },
      isLoading: false,
    };
  },
  methods: {
    beforeDestroy() {
      document.body.style.overflow = '';
    },
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.spaces = [];
      this.selectedSpace = null;
      this.form = {
        name: '',
        capacity: '',
        description: '',
      };
    },
    selectSpace(space) {
      this.selectedSpace = space;
    },
    async fetchSpaces() {
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
        this.isLoading = true;
        const token = localStorage.getItem('token');
        if (!token) {
          // Show error Toast if no token is found
          Toast.fire({
            icon: 'error',
            title: 'توکن یافت نشد. لطفا دوباره وارد شوید.',
          });
          return;
        }

        const response = await axios.get(
          'http://my.xroomapp.com:8000/get_assigned_assetbundle_rooms',
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        this.spaces = response.data.assetbundle_rooms.map(room => ({
          name: room.name,
          img: room.img,
          capacity: room.maxPerson,
          type: room.Private ? 'Private' : 'Public',
          maxPerson: room.maxPerson,
          id: room.id,
        }));
      } catch (error) {
        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: 'خطا در بارگذاری فضاها. لطفا دوباره تلاش کنید.',
        });
        console.error('Error fetching spaces:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async submitForm() {
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

      const spaceData = {
        assetBundleRoomId: this.selectedSpace.id,
        name: this.form.name,
        description: this.form.description,
        capacity: this.form.capacity,
      };

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Show error Toast if no token is found
          Toast.fire({
            icon: 'error',
            title: 'توکن یافت نشد. لطفا دوباره وارد شوید.',
          });
          return;
        }

        const response = await axios.post(
          'http://my.xroomapp.com:8000/add_space',
          spaceData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'فضا با موفقیت اضافه شد',
        });

        this.$emit('submit', response.data);
        this.closeModal();
        window.location.reload();
      } catch (error) {
        let errorMessage = 'خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید.';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'عدم دسترسی. لطفا دوباره وارد شوید.';
          } else if (error.response.status === 400) {
            errorMessage = 'اطلاعات ورودی نامعتبر است.';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور. لطفا دوباره تلاش کنید.';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Error submitting form:', error);
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        this.fetchSpaces();
      } else {
        document.body.style.overflow = '';
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
  padding: 20px;
  padding-right: 50px;
}

.popUp-title-object {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.popUp-title-object h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101010;
}

.popUp-title-object span {
  font-size: 16px;
  font-weight: 500;
  color: #4F5A69;
  margin-top: 1rem;
}

.popUp-objects {
  margin-top: 0rem !important;
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
  max-width: 22rem;
}

.form-group textarea {
  height: 140px;
  width: 75%;
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

.space-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 16px;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.space-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 31%;
  height: 15rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.space-card:hover {
  transform: scale(1.05);
}

.space-card.selected {
  border: 2px solid #3A57E8;
  box-shadow: 0 4px 8px rgba(58, 87, 232, 0.5);
}

.space-img {
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.space-info {
  padding: 10px;
  text-align: right;
  gap: 1rem;
  display: grid;
}

.space-name {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-top: 5px;
}

.space-type,
.space-capacity {
  font-size: 14px;
  color: #718096;
}

.loading-message {
  text-align: center;
  font-size: 16px;
  color: #718096;
  margin-bottom: 1rem;
}

.space-form {
  margin-top: 3rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 5%;
  padding-bottom: 0;
  width: 100%;
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

/* Responsive Styles */

/* Mobile: max-width 600px */
@media (max-width: 600px) {
  .modal-content {
    max-width: 90%;
    height: 85vh;
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
    padding: 15px;
    padding-right: 30px;
  }

  .popUp-objects {
    max-width: 90%;
    padding: 15px;
  }

  .space-selection {
    gap: 1rem 10px;
    justify-content: space-between;
  }

  .space-card {
    width: calc(50% - 5px); /* Two cards per row with gap */
    height: 12rem;
  }

  .space-info {
    padding-top: 3px !important;
    padding: 5px;
    gap: 10px;
  }

  .space-name ,
  .space-type ,
  .space-capacity{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: clip;
    width: 80%;
  }

  .space-img {
    height: 7rem;
  }

  .space-name {
    font-size: 14px;
  }

  .space-type,
  .space-capacity {
    font-size: 12px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .form-group label {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    max-width: 100%;
  }

  .form-group textarea {
    width: 100%;
    max-width: 100%;
  }

  .form-actions {
    flex-direction: row;
    gap: 1rem;
  }

  .submit-btn,
  .cancel-btn {
    width: 100%;
    height: 35px;
    font-size: 15px;
  }

  .popUp-title-object h2 {
    font-size: 18px;
  }

  .popUp-title-object span {
    font-size: 14px;
  }
  
}

/* Tablet: min-width 600px - max-width 1024px */
@media (min-width: 600px) and (max-width: 1024px) {
  .modal-content {
    max-width: 80%;
  }

  .popUp-objects {
    max-width: 90%;
  }

  .space-card {
    width: calc(33% - 10px); /* Maintain three cards per row */
  }

  .form-group input {
    max-width: 20rem;
  }

  .form-group textarea {
    max-width: 20rem;
  }


}

/* Large Tablet / Small Desktop: min-width 1024px - max-width 1280px */
@media (min-width: 1024px) and (max-width: 1280px) {
  .modal-content {
    max-width: 750px;
  }

  .popUp-objects {
    max-width: 680px;
  }

  .space-card {
    width: calc(33% - 10px); /* Maintain three cards per row */
  }


}

/* Desktop: min-width 1280px */
@media (min-width: 1280px) {
  .modal-content {
    max-width: 700px;
  }

  .popUp-objects {
    max-width: 620px;
  }

  .space-card {
    width: 31%; /* Original layout */
  }
}
</style>