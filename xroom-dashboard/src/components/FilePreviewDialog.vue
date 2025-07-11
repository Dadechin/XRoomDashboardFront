<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleBackdropClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>پیش‌نمایش فایل</h2>
        <button @click="closePreviewDialog">
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
        <h2>مشاهده فایل</h2>
        <span>پیش‌نمایش فایل انتخاب‌شده را مشاهده کنید.</span>
      </div>
      <div class="preview-content">
        <!-- Image Preview -->
        <img :src="previewUrl" class="preview-file" v-if="previewType === 'image'" />

        <!-- PDF Preview -->
        <div class="pdf-preview-container" v-if="previewType === 'pdf'">
          <vue-pdf-embed :source="previewUrl" class="pdf-preview" v-if="previewUrl" />
        </div>

        <!-- Video Player -->
        <div v-if="previewType === 'video'" class="video-preview-container">
          <vue-plyr :options="plyrOptions">
            <video controls>
              <source :src="previewUrl" type="video/mp4" />
            </video>
          </vue-plyr>
        </div>

        <!-- 3D Model Preview -->
        <div class="model-preview-container" v-if="previewType === 'glb'">
          <model-viewer
            :src="previewUrl"
            alt="3D Model"
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="neutral"
            auto-rotate
            camera-controls
            class="model-preview"
          ></model-viewer>
        </div>
      </div>
      <div class="modal-actions">
        <button class="close-btn" @click="closePreviewDialog">بستن</button>
        <button class="delete-btn" @click="deleteFile" v-if="previewIndex !== null">حذف</button>
        <button class="download-btn" @click="downloadFile">دانلود</button>
      </div>
    </div>
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import '@google/model-viewer';
import axios from 'axios';

export default {
  name: 'FilePreviewDialog',
  components: {
    VuePdfEmbed,
    VuePlyr,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    previewUrl: {
      type: String,
      default: '',
    },
    previewType: {
      type: String,
      default: null,
    },
    previewIndex: {
      type: Number,
      default: null,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    plyrOptions: {
      type: Object,
      default: () => ({
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed', 'loop'],
        autoplay: false,
      }),
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
  methods: {
    handleBackdropClick(event) {
      if (event.target.classList.contains('modal-overlay')) {
        this.closePreviewDialog();
      }
    },
    closePreviewDialog() {
      this.$emit('close');
    },
    async downloadFile() {
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
        const response = await fetch(this.previewUrl);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${this.previewType}-${new Date().getTime()}.${this.previewUrl.split('.').pop()}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'فایل با موفقیت دانلود شد',
        });
      } catch (error) {
        console.error('Error downloading file:', error);

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: 'خطا در دانلود فایل',
        });
      }
    },
    async deleteFile() {
      if (this.previewIndex === null || !this.previewType) return;

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
        const deleteUrl = `${this.baseUrl}/delete${this.previewType.charAt(0).toUpperCase() + this.previewType.slice(1)}/${this.previewIndex}/`;

        await axios.delete(deleteUrl, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        this.$emit('delete-success');
        this.closePreviewDialog();

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'فایل با موفقیت حذف شد',
        });
      } catch (error) {
        console.error('Error deleting file:', error);

        let errorMessage = 'خطا در حذف فایل';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'عدم دسترسی: لطفا دوباره وارد شوید.';
          } else if (error.response.status === 400) {
            errorMessage = 'درخواست نامعتبر است.';
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
      }
    },
  },
};
</script>


<style scoped>
:deep(.plyr) {
  width: 100%;
  height: 100%;
  --plyr-color-main: #3a57e8; /* رنگ اصلی کنترل‌ها */
  --plyr-video-background: #000; /* پس‌زمینه ویدیو */
}

.video-preview-container {
  border-radius: 12px;
}

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
  max-height: 95vh;
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

.preview-content {
  margin: 1rem auto 0;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 620px;
  display: block;
}

.preview-content img {
  border-radius: 12px;
  object-fit: cover;
}

.preview-file {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.pdf-preview-container,
.video-preview-container,
.model-preview-container {
  width: 100%;
  max-height: 400px;
  overflow: auto;
}

.pdf-preview,
.model-preview {
  width: 100%;
  height: 300px;
}

.video-player {
  width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0;
  width: 100%;
  max-width: 620px;
  margin: auto;
  gap: 1rem;
}

.download-btn,
.delete-btn,
.close-btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 33%;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
}

.download-btn {
  background-color: #3A57E8;
  color: white;
}

.delete-btn {
  background-color: #b02424;
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

  .preview-content {
    max-width: 90%;
    padding: 15px;
  }

  .preview-file {
    max-height: 250px;
  }

  .pdf-preview-container,
  .video-preview-container,
  .model-preview-container {
    max-height: 250px;
  }

  .pdf-preview,
  .model-preview {
    width: 100%;
    height: 200px;
  }

  .modal-actions {
    flex-direction: row;
    gap: 0.75rem;
    padding: 15px 0;
    max-width: 90%;
  }

  .download-btn,
  .delete-btn {
    width: 48%;
    height: 40px;
    font-size: 14px;
  }

  .close-btn {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }

  /* Custom layout for buttons in mobile */
  .modal-actions {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .download-btn,
  .delete-btn {
    flex: 0 0 calc(50% - 0.5rem); /* Two buttons side by side with gap */
  }

  .close-btn {
    flex: 0 0 100%; /* Full width for close button */
    order: 2; /* Place close button below others */
  }
}

/* Tablet: min-width 600px - max-width 1024px */
@media (min-width: 600px) and (max-width: 1024px) {
  .modal-content {
    max-width: 80%;
    height: max-content;
  }

  .preview-content {
    max-width: 90%;
  }

  .modal-actions {
    max-width: 90%;
  }

  .preview-file {
    max-height: 350px;
  }

  .pdf-preview-container,
  .video-preview-container,
  .model-preview-container {
    max-height: 350px;
  }

  .pdf-preview,
  .model-preview {
    width: 100%;
    height: 250px;
  }

  .download-btn,
  .delete-btn,
  .close-btn {
    width: 33%;
    font-size: 16px;
    height: 45px;
  }
}

/* Large Tablet / Small Desktop: min-width 1024px - max-width 1280px */
@media (min-width: 1024px) and (max-width: 1280px) {
  .modal-content {
    max-width: 720px;
  }

  .preview-content {
    max-width: 680px;
  }

  .modal-actions {
    max-width: 680px;
  }

  .pdf-preview,
  .model-preview {
    width: 100%;
  }
}

/* Desktop: min-width 1280px */
@media (min-width: 1280px) {
  .modal-content {
    max-width: 700px;
  }

  .preview-content {
    max-width: 620px;
  }

  .modal-actions {
    max-width: 620px;
  }

  .pdf-preview,
  .model-preview {
    width: 100%;
  }
}
</style>