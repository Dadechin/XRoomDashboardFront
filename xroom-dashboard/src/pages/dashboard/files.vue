<template>
  <SidebarMenu />
  
  <div class="dashboard-page">
    <div class="content">
      <!-- Top Header -->
      <AppHeader pageTitle="فایل ها" />


       
      <!-- Description -->
      <div class="section-description">
        <div class="section-title">مدیریت فایل ها</div>
        <p>
          فایل های خود مانند مدل های سه بعدی، تصاویر و اسناد PDF را برای استفاده در VR آماده کنید. یا یادداشت ها و تصاویر ایجاد شده در برنامه XRoom را دانلود کنید.
        </p>
      </div>

      <!-- File Manager Layout -->
      <div class="file-manager-layout">

          <!-- Sidebar -->
        <!-- <div class="file-sidebar">
          <button class="primary-button" @click="openDialog('image')">
            افزودن تصویر
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="btn-icon" />
          </button>
          
          <button class="primary-button" @click="openDialog('pdf')">
            افزودن PDF
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="btn-icon" />
          </button>
          
          <button class="primary-button" @click="openDialog('video')">
            افزودن ویدیو
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="btn-icon" />
          </button>
          
          <button class="primary-button" @click="openDialog('glb')">
            افزودن مدل 3D
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="btn-icon" />
          </button>

          <div class="filter-buttons">
            <button class="filter-btn">فایل های اخیر</button>
            <button class="filter-btn">دانلودهای اخیر</button>
            <button class="filter-btn">فایل های شخصی</button>
            <button class="filter-btn">نشانه دار شده</button>
          </div>
        </div> -->

        
        <!-- Cards Grid -->
         <!-- Cards Grid -->
  <div class="file-grid">
    <!-- Images Section -->
    <div class="section-title">تصاویر</div>
    <div class="file-card" @click="openDialog('image')">
      <div class="file-card-info">
        <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="file-image" style="background: #3a57e8; border-radius: 20px;" />
        <div class="file-title">تصویر جدید</div>
        <div class="file-meta">
          <span class="file-date">برای افزودن کلیک کنید</span>
        </div>
      </div>
    </div>
    <div class="file-card" v-for="(image, index) in userData.images" :key="'image-' + index" 
    
    @click="openPreviewDialog('image', index, getFullImageUrl(image.image))"
    >
      <img :src="getFullImageUrl(image.image)" class="file-image" />
      <div class="file-card-info">
        <div class="file-title">{{ image.name }}</div>
        <div class="file-meta">
          <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" class="meta-icon" />
          <span class="file-date">{{ formatDate(image.created_at) }}</span>
        </div>
      </div>
    </div>

    <!-- PDFs Section -->
    <div class="section-title">فایل های PDF</div>
    <div class="file-card" @click="openDialog('pdf')">
      <div class="file-card-info">
        <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="file-image" style="background: #3a57e8; border-radius: 20px;" />
        <div class="file-title">PDF جدید</div>
        <div class="file-meta">
          <span class="file-date">برای افزودن کلیک کنید</span>
        </div>
      </div>
    </div>
    <div class="file-card" v-for="(pdf, index) in userData.pdfs" :key="'pdf-' + index"     
     @click="openPreviewDialog('pdf', index, getFullImageUrl(pdf.pdf))"
      >
      <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" class="file-image" />
      <div class="file-card-info">
        <div class="file-title">{{ pdf.name }}</div>
        <div class="file-meta">
          <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" class="meta-icon" />
          <span class="file-date">{{ formatDate(pdf.created_at) }}</span>
        </div>
      </div>
    </div>

    <!-- Videos Section -->
    <div class="section-title">ویدیوها</div>
    <div class="file-card" @click="openDialog('video')">
      <div class="file-card-info">
        <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="file-image" style="background: #3a57e8; border-radius: 20px;" />
        <div class="file-title">ویدیو جدید</div>
        <div class="file-meta">
          <span class="file-date">برای افزودن کلیک کنید</span>
        </div>
      </div>
    </div>
    <div class="file-card" v-for="(video, index) in userData.videos" :key="'video-' + index"
    @click="openPreviewDialog('video', index, getFullImageUrl(video.video))"

    >
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQ1L9b8tFaGXBQxOdCCaq-AcYkmawPtRVZA&s"    />
      <div class="file-card-info">
        <div class="file-title">{{ video.name }}</div>
        <div class="file-meta">
          <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" class="meta-icon" />
          <span class="file-date">{{ formatDate(video.created_at) }}</span>
        </div>
      </div>
    </div>

    <!-- GLBs Section -->
    <div class="section-title">مدل های 3D</div>
    <div class="file-card" @click="openDialog('glb')">
      <div class="file-card-info">
        <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" class="file-image" style="background: #3a57e8; border-radius: 20px;" />
        <div class="file-title">مدل 3D جدید</div>
        <div class="file-meta">
          <span class="file-date">برای افزودن کلیک کنید</span>
        </div>
      </div>
    </div>
    <div class="file-card" v-for="(glb, index) in userData.glbs" :key="'glb-' + index"
    @click="openPreviewDialog('glb', index, getFullImageUrl(glb.glb))"
    >
      <img :src="require('@/assets/img/3d icon.jpg')" />
       
      <div class="file-card-info">
        <div class="file-title">{{ glb.name }}</div>
        <div class="file-meta">
          <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" class="meta-icon" />
          <span class="file-date">{{ formatDate(glb.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>

    <!-- New File Dialog -->
    <dialog ref="newFileDialog" class="new-file-dialog">
      <div class="dialog-content">
        <h3>{{ dialogTitle }}</h3>
        
        <div class="form-group">
          <label for="fileName">نام فایل</label>
          <input 
            type="text" 
            id="fileName" 
            v-model="newFileName" 
            placeholder="نام فایل را وارد کنید"
          />
        </div>
        
        <div class="form-group">
          <label for="fileUpload">انتخاب فایل</label>
          <input 
            type="file" 
            id="fileUpload" 
            ref="fileInput"
            @change="handleFileChange"
            :accept="fileAccept"
          />
        </div>
        
        <div class="dialog-actions">
          <button class="cancel-btn" @click="closeDialog">انصراف</button>
          <button class="submit-btn" @click="uploadFile" :disabled="!selectedFile || uploading">
            {{ uploading ? 'در حال آپلود...' : 'آپلود فایل' }}
          </button>
        </div>
      </div>
    </dialog>


   
    

    <!-- Preview Dialog -->
<!-- Preview Dialog -->

 
<dialog ref="filePreviewDialog" class="file-preview-dialog" :data-type="currentPreviewType"
 @click="handleBackdropClick"
>
  <div class="preview-content" @click.stop>
    <button class="close-preview" @click="closePreviewDialog">×</button>
    
    <!-- Image Preview -->
    <img :src="previewUrl" class="preview-file" v-if="currentPreviewType === 'image'" />
    
    <!-- PDF Preview -->
    <div class="pdf-preview-container" v-if="currentPreviewType === 'pdf'">
      <vue-pdf-embed 
        :source="previewUrl" 
        class="pdf-preview"
        v-if="previewUrl" />
    </div>
    
     <!-- Video Player -->
     <div v-if="currentPreviewType === 'video'" class="video-preview-container">
      <VideoPlayer 
    v-if="currentPreviewType === 'video'"
    :options="videoOptions"
    class="video-player"
  />
    </div>
    
    <!-- 3D Model Preview -->
    <div class="model-preview-container" v-if="currentPreviewType === 'glb'">
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
    
    <div class="preview-actions">
      <button class="download-btn" @click="downloadFile">دانلود</button>
      <button class="delete-btn" @click="deleteFile" v-if="currentPreviewIndex !== null">حذف</button>
    </div>
  </div>
</dialog>

     
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/sea/index.css';
import '@google/model-viewer'
import SidebarMenu from '@/components/SidebarMenu.vue'
import axios from 'axios';

 
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import AppHeader from '@/components/Header.vue';

export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    VuePdfEmbed,  
    VideoPlayer,
    AppHeader,

  },
  data() {
    return {
      // ... existing data ...
      previewUrl: '',
    currentPreviewIndex: null,
    currentPreviewType: null,
    videoOptions: {
        autoplay: false,
        controls: true,
        sources: [{
          type: 'video/mp4',
          src: '' // Will be set dynamically
        }]
      },
    
      userData: {
        customer: {},
        user: {
          first_name: '',
          last_name: ''
        },
        images: [],
        pdfs: [],
        videos: [],
        glbs: []
      },
      newFileName: '',
      selectedFile: null,
      uploading: false,
      baseUrl: 'http://194.62.43.230:8000',
      currentUploadType: 'image',
      dialogTitle: 'آپلود فایل جدید',
      fileAccept: '*/*'
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    handleBackdropClick(event) {
    // Check if click was directly on the dialog element (backdrop)
    if (event.target === this.$refs.filePreviewDialog) {
      this.closePreviewDialog();
    }
  },
    openPreviewDialog(type, index, url) {
      if (type === 'video') {
        this.videoOptions.sources[0].src = url;
        this.$nextTick(() => {
          this.$refs.filePreviewDialog?.showModal();
        });
      }
      if (!this.$refs.filePreviewDialog) {
      console.error('Dialog element not found');
      return;
    }
    
    this.currentPreviewType = type;
    this.currentPreviewIndex = index;
    this.previewUrl = url;
    // Special handling for video
     
    this.currentPreviewType = type;
    this.currentPreviewIndex = index;
    
    if (type === 'video') {
      this.videoOptions.sources[0].src = url;
      this.videoOptions.poster = this.getVideoThumbnail();
      this.previewUrl = url;
    } else {
      this.previewUrl = url;
    }
    
    this.$nextTick(() => {
      this.$refs.filePreviewDialog?.showModal();
    });

    if (type === 'image') {
      this.previewImageUrl = url;
      this.previewPdfUrl = '';
    } else if (type === 'pdf') {
      this.previewPdfUrl = url;
      this.previewImageUrl = '';
    }
    
    // this.$refs.imagePreviewDialog.showModal();
    this.$refs.filePreviewDialog.showModal();

  },
  getVideoThumbnail(videoUrl) {
    // You can implement a proper thumbnail generation here
    // For now, we'll just return a placeholder
    videoUrl = 'https://cdn-icons-png.flaticon.com/512/2839/2839038.png'
    return videoUrl;
  },
  closePreviewDialog() {
    // Safely access the dialog reference
    const dialog = this.$refs.filePreviewDialog;
    
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else {
      console.warn('Dialog reference not found or close method unavailable');
    }
    
    // Reset preview state
    this.previewUrl = '';
    this.currentPreviewIndex = null;
    this.currentPreviewType = null;
  },
  async downloadFile() {
    const url = this.currentPreviewType === 'image' 
      ? this.previewImageUrl 
      : this.previewPdfUrl;
    
    if (!url) return;
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      
      // Set appropriate filename
      if (this.currentPreviewType === 'image') {
        a.download = `image-${new Date().getTime()}.${url.split('.').pop()}`;
      } else if (this.currentPreviewType === 'pdf') {
        a.download = `document-${new Date().getTime()}.pdf`;
      }
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('خطا در دانلود فایل');
    }
  },
  
  async deleteFile() {
    if (this.currentPreviewIndex === null || !this.currentPreviewType) return;
    
    try {
      const token = localStorage.getItem('token');
      let deleteUrl = '';
      let itemId = '';
      let fileArray = [];
      
      switch(this.currentPreviewType) {
        case 'image':
          fileArray = this.userData.images;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteImage/${itemId}/`;
          break;
        case 'pdf':
          fileArray = this.userData.pdfs;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deletePdf/${itemId}/`;
          break;
        case 'video':
          fileArray = this.userData.videos;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteVideo/${itemId}/`;
          break;
        case 'glb':
          fileArray = this.userData.glbs;
          itemId = fileArray[this.currentPreviewIndex].id;
          deleteUrl = `${this.baseUrl}/deleteGlb/${itemId}/`;
          break;
      }
      
      await axios.delete(deleteUrl, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      
      this.closePreviewDialog();
      await this.fetchUserData();
      alert('فایل با موفقیت حذف شد');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('خطا در حذف فایل');
    }
  },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        
        let response = await axios.get(`${this.baseUrl}/getInfo`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        response = response.data;
        this.userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    getFullImageUrl(relativePath) {
      if (!relativePath) return '';
      return `${this.baseUrl}${relativePath}`;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    },
    openDialog(type) {
      this.currentUploadType = type;
      
      switch(type) {
        case 'image':
          this.dialogTitle = 'آپلود تصویر جدید';
          this.fileAccept = 'image/*';
          break;
        case 'pdf':
          this.dialogTitle = 'آپلود فایل PDF';
          this.fileAccept = '.pdf';
          break;
        case 'video':
          this.dialogTitle = 'آپلود ویدیو';
          this.fileAccept = 'video/*';
          break;
        case 'glb':
          this.dialogTitle = 'آپلود مدل 3D';
          this.fileAccept = '.glb';
          break;
      }
      
      this.$refs.newFileDialog.showModal();
    },
    closeDialog() {
      this.newFileName = '';
      this.selectedFile = null;
      this.$refs.newFileDialog.close();
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) return;
      
      this.uploading = true;
      
      const formData = new FormData();
      // formData.append('file', this.selectedFile);
      formData.append('name', this.newFileName || this.selectedFile.name);
      


         
        switch(this.currentUploadType) {
          case 'image':
            formData.append('image', this.selectedFile);
            break;
          case 'pdf':
            formData.append('pdf', this.selectedFile);
            break;
          case 'video':
            formData.append('video', this.selectedFile);

            break;
          case 'glb':
            formData.append('glb', this.selectedFile);

            break;
        }


      try {
        const token = localStorage.getItem('token');
        let uploadUrl = '';
        
        switch(this.currentUploadType) {
          case 'image':
            uploadUrl = `${this.baseUrl}/uploadImage/`;
            break;
          case 'pdf':
            uploadUrl = `${this.baseUrl}/uploadPdf/`;
            break;
          case 'video':
            uploadUrl = `${this.baseUrl}/uploadVideo/`;
            break;
          case 'glb':
            uploadUrl = `${this.baseUrl}/uploadGlb/`;
            break;
        }
        
        await axios.post(uploadUrl, formData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        this.closeDialog();
        // Refresh the data after successful upload
        await this.fetchUserData();
        
        // Show success message
        alert('فایل با موفقیت آپلود شد');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('خطا در آپلود فایل');
      } finally {
        this.uploading = false;
      }
    }
  }
}
</script>

 
<!-- Your existing styles remain the same -->
  
  <style scoped>

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-top: 20px;
  margin-bottom: 10px;
  grid-column: 1 / -1;
}

/* Update the file-sidebar to accommodate more buttons */
.file-sidebar {
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
  .dashboard-page {
    margin-right: 360px;
    padding: 20px;
    direction: rtl;
    font-family: IRANSansXFaNum, sans-serif;
  }
  
  .content {
    background-color: #f8f9fa;
    border-radius: 20px;
    padding: 35px 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .right-actions {
    display: flex;
    gap: 10px;
  }
  
  .subscription-button {
    background-color: #48bb78;
    color: white;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .button-icon {
    width: 20px;
    height: 20px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .user-name {
    font-size: 14px;
    font-weight: 500;
    color: #2d3748;
  }
  
  .avatar-box {
    width: 40px;
    height: 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
  
  .avatar-icon {
    width: 20px;
    height: 20px;
  }
  
  .page-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
  }
  
  .section-description {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .section-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a202c;
  }
  
  .section-description p {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.8;
  }
  
  .file-manager-layout {
    display: flex;
    gap: 32px;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  
  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 24px;
    flex: 1;
    min-width: 0;
  }
  
  .file-card {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: 0.2s ease;
  }
  
  .file-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  }
  
  .file-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
  }
  
  .file-card-info {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .file-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a202c;
    text-align: center;
  }
  
  .file-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #718096;
  }
  
  .meta-icon {
    width: 16px;
    height: 16px;
  }
  
  .file-sidebar {
    width: 180px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .primary-button {
    background-color: #3a57e8;
    color: white;
    font-size: 14px;
    padding: 12px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
  }
  
  .primary-button:hover {
    background-color: #2e45c8;
  }
  
  .btn-icon {
    width: 16px;
    height: 16px;
  }
  
  .filter-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-btn {
    background-color: white;
    color: #1a202c;
    font-size: 13px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .filter-btn:hover {
    background-color: #edf2f7;
  }
  
  .footer {
    margin-top: 40px;
    text-align: center;
  }
  
  .text-wrapper-13 {
    font-size: 13px;
    color: white;
    font-weight: 500;
  }
  
  .logo {
    margin-top: 15px;
  }
  
  .clip-path-group {
    height: 40px;
    width: 150px;
  }








  .new-file-dialog {
  border: none;
  border-radius: 16px;
  padding: 0;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.new-file-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  padding: 24px;
}

.dialog-content h3 {
  margin: 0 0 20px;
  font-size: 18px;
  color: #1a202c;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a5568;
}

.form-group input[type="text"],
.form-group input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.cancel-btn {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.image-preview-dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 70%;
  max-height: 80%;
  width: auto;
  height: auto;
}

.preview-content {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  margin-bottom: 20px;
}

.preview-actions {
  display: flex;
  gap: 10px;
}

.download-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.download-btn {
  background-color: #3a57e8;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}




/* pdf preview */
.pdf-preview-container {
  width: 100%;
  max-width: 800px;
  height: 70vh;
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.pdf-preview {
  width: 100%;
  height: 100%;
}

/* Adjust dialog size for PDFs */
.image-preview-dialog[data-type="pdf"] {
  width: 80%;
  height: 80%;
}
/* pdf preview */



/* Base dialog styles */
.file-preview-dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
}

.preview-content {
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

/* Image preview */
.preview-file[data-type="image"] {
  max-width: 100%;
  max-height: 70vh;
  margin-bottom: 20px;
}

/* PDF preview */
.pdf-preview-container {
  width: 100%;
  max-width: 800px;
  height: 70vh;
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.pdf-preview {
  width: 100%;
  height: 100%;
}

/* Video preview */
.video-preview-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.video-preview {
  width: 100%;
  max-height: 70vh;
}

/* 3D Model preview */
.model-preview-container {
  width: 100%;
  height: 70vh;
  max-width: 800px;
  margin-bottom: 20px;
}

.model-preview {
  width: 100%;
  height: 100%;
}

/* Action buttons */
.preview-actions {
  display: flex;
  gap: 10px;
}

.download-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.download-btn {
  background-color: #3a57e8;
  color: white;
}

.delete-btn {
  background-color: #ff4d4f;
  color: white;
}








.dialog-content {
  /* Prevent margin collapse that could interfere with click detection */
  display: inline-block;
  /* Rest of your existing dialog content styles */
}

.file-preview-dialog::backdrop {
  /* Makes the backdrop clickable */
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
  </style>
  