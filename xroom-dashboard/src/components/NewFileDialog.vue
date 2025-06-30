<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeDialog">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ dialogTitle }}</h2>
        <button @click="closeDialog">
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
      <div class="modal-title">
        <h2>آپلود فایل جدید</h2>
        <span>فایل خود را برای استفاده در پروژه انتخاب کنید.</span>
      </div>
      <div class="form-content">
        <form @submit.prevent="uploadFile" autocomplete="off">
          <div class="input-group">
            <label for="fileName">نام فایل</label>
            <input
              id="fileName"
              v-model="newFileName"
              type="text"
              placeholder="نام فایل را وارد کنید"
            />
          </div>
          <div class="input-group">
            <p>انتخاب فایل</p>
            <div style="width: 100%;">
              <label for="fileUpload" class="file-input-label">
                <span v-if="selectedFile" class="file-name">{{ selectedFile.name }}</span>
                <span v-else>برای انتخاب فایل کلیک کنید</span>
              </label>
              <input
                id="fileUpload"
                ref="fileInput"
                type="file"
                @change="handleFileChange"
                required
                class="file-input"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="modal-actions">
        <button type="button" class="close-btn" @click="closeDialog">بازگشت</button>
        <button type="submit" class="upload-btn" @click="uploadFile" :disabled="!selectedFile || uploading">
          {{ uploading ? 'در حال آپلود...' : 'آپلود فایل' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewFileDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    initialUploadType: {
      type: String,
      default: 'image',
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newFileName: '',
      selectedFile: null,
      uploading: false,
      currentUploadType: this.initialUploadType,
      dialogTitle: 'آپلود فایل جدید',
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.resetForm();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        this.resetForm();
      }
    },
    initialUploadType(newType) {
      this.currentUploadType = newType;
      this.resetForm();
    },
  },
  methods: {
    beforeDestroy() {
      document.body.style.overflow = '';
    },
    resetForm() {
      this.newFileName = '';
      this.selectedFile = null;
      this.currentUploadType = this.initialUploadType;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    closeDialog() {
      this.resetForm();
      this.$emit('close');
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const fileName = this.selectedFile.name.toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|psd|raw|heic|heif|ico)$/i.test(fileName)) {
          this.currentUploadType = 'image';
          this.dialogTitle = 'آپلود تصویر جدید';
        } else if (/\.(pdf|fdf)$/i.test(fileName)) {
          this.currentUploadType = 'pdf';
          this.dialogTitle = 'آپلود فایل PDF';
        } else if (/\.(mp4|mov|mkv|wmv|m4v|mpg|webm|ogg)$/i.test(fileName)) {
          this.currentUploadType = 'video';
          this.dialogTitle = 'آپلود ویدیو';
        } else if (/\.(glb|obj|fbx|stl|ply|gltf)$/i.test(fileName)) {
          this.currentUploadType = 'glb';
          this.dialogTitle = 'آپلود مدل 3D';
        } else {
          this.currentUploadType = 'other';
          this.dialogTitle = 'آپلود فایل سایر';
        }
      }
    },
    async uploadFile() {
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

      if (!this.selectedFile) {
        // Check if a file is selected
        Toast.fire({
          icon: 'error',
          title: 'لطفاً یک فایل انتخاب کنید.',
        });
        return;
      }

      this.uploading = true;
      const formData = new FormData();
      formData.append('name', this.newFileName || this.selectedFile.name);
      formData.append(this.currentUploadType === 'other' ? 'file' : this.currentUploadType, this.selectedFile);

      try {
        const token = localStorage.getItem('token');
        let uploadUrl = `${this.baseUrl}/upload${this.currentUploadType.charAt(0).toUpperCase() + this.currentUploadType.slice(1)}/`;

        if (this.currentUploadType === 'other') {
          console.log('File sent to "other" category:', this.selectedFile.name);
          // Log and show Toast for 'other' file type (test mode)
          Toast.fire({
            icon: 'success',
            title: 'فایل به دسته "سایر" ارسال شد.',
          });
          this.resetForm();
          this.$emit('upload-success');
          this.$emit('close');
          return;
        }

        await axios.post(uploadUrl, formData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'فایل با موفقیت آپلود شد',
        });

        this.resetForm();
        this.$emit('upload-success');
        this.$emit('close');

        if (this.$route.path !== '/dashboard/files') {
          this.$router.push('/dashboard/files');
        }
      } catch (error) {
        let errorMessage = 'خطا در آپلود فایل. لطفا دوباره تلاش کنید.';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'عدم دسترسی. لطفاً وارد حساب کاربری شوید.';
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

        console.error('Error uploading file:', error);
      } finally {
        this.uploading = false;
      }
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
  max-width: 620px;
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

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #101010;
  color: #fff;
  padding: 20px 26px;
  margin-bottom: 1.5rem;
  border-radius: 20px 20px 0 0;
}

.modal-header h2 {
  font-size: 22px;
}

.modal-header button {
  background-color: inherit;
  border: none;
  cursor: pointer;
}

.modal-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 50px 20px 20px;
}

.modal-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101010;
}

.modal-title span {
  font-size: 16px;
  font-weight: 500;
  color: #4F5A69;
  margin-top: 1rem;
}

.form-content {
  margin: 1rem auto 0;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 620px;
  display: block;
}

.input-group {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input-group label , .input-group p {
  font-weight: 500;
  width: 50%;
  font-size: 16px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
}

.input-group input:focus {
  outline: none;
}

.input-group .file-input {
  display: none;
}

.input-group .file-input-label {
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 15px;
  text-align: start;
  cursor: pointer;
  background-color: #fff;
  color: #798487;
  height: 2.5rem;
  line-height: normal;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.input-group .file-input-label:hover {
  background-color: #f0f0f0;
}

.input-group .file-name {
  font-size: 15px;
  color: #4F5A69;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0;
  width: 100%;
  max-width: 620px;
  margin: auto;
}

.upload-btn,
.close-btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 47%;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
}

.upload-btn {
  background-color: #3A57E8;
  color: white;
}

.close-btn {
  background-color: #EBEEFD;
  color: #101010;
}

/* Responsive Styles */

/* Mobile: max-width 600px */
@media (max-width: 600px) {
  .modal-content {
    max-width: 90%;
    height: max-content;
    margin: 0 1rem;
    padding-bottom: 0.5rem;
  }

  .modal-header {
    padding: 15px 20px;
  }

  .modal-header h2 {
    font-size: 18px;
  }

  .modal-header button svg {
    width: 28px;
    height: 28px;
  }

  .modal-title {
    padding: 15px 20px;
  }

  .modal-title h2 {
    font-size: 18px;
  }

  .modal-title span {
    font-size: 14px;
    margin-top: 0.75rem;
  }

  .form-content {
    max-width: 90%;
    padding: 15px;
  }

  .input-group {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 0.5rem;
  }

  .input-group label , .input-group p {
    width: 100%;
    font-size: 14px;
  }

  .input-group input,
  .input-group .file-input-label {
    width: 100%;
    font-size: 14px;
    height: 2.25rem;
  }

  .input-group .file-name {
    font-size: 14px;
  }

  .modal-actions {
    flex-direction: row;
    gap: 1rem;
    padding: 15px 0;
    max-width: 90%;
  }

  .upload-btn,
  .close-btn {
    width: 100%;
    height: 35px;
    font-size: 14px;
  }
}

/* Tablet: min-width 600px - max-width 1024px */
@media (min-width: 600px) and (max-width: 1024px) {
  .modal-content {
    max-width: 80%;
    height: max-content;
  }

  .form-content {
    max-width: 90%;
  }

  .modal-actions {
    max-width: 90%;
  }

  .input-group input,
  .input-group .file-input-label {
    max-width: 20rem;
  }

  .input-group p {
    width: 60%;
  }
}

/* Large Tablet / Small Desktop: min-width 1024px - max-width 1280px */
@media (min-width: 1024px) and (max-width: 1280px) {
  .modal-content {
    max-width: 720px;
  }

  .form-content {
    max-width: 680px;
  }

  .modal-actions {
    max-width: 680px;
  }

  .input-group p {
    width: 100%;
  }
}

/* Desktop: min-width 1280px */
@media (min-width: 1280px) {
  .modal-content {
    max-width: 700px;
  }

  .form-content {
    max-width: 620px;
  }

  .modal-actions {
    max-width: 620px;
  }

  .input-group p {
    width: 50%;
  }
}
</style>