<!-- DashboardPage.vue -->
<template>
  <SidebarMenu />

  <div class="dashboard-page">
    <div class="content">
      <!-- Top Header -->
      <AppHeader pageTitle="تیم ها" />
      <!-- Description -->
      <div class="section-description">
        <div class="section-title">مدیریت اعضا</div>
        <p>
          در این بخش به شما امکان می‌دهد تا اتاق‌ها، فایل‌ها و جلسات را با همکاران خود به اشتراک بگذارید. در این بخش می‌توانید تیم خود را مدیریت کنید.
        </p>
      </div>
      <!-- Tab Buttons -->
      <div class="tab-buttons">
        <button
          :class="['tab-btn', activeTab === 'users' ? 'active' : '']"
          @click="activeTab = 'users'"
        >
          کاربران
        </button>
        <button
          :class="['tab-btn', activeTab === 'buy-subscription' ? 'active' : '']"
          @click="activeTab = 'buy-subscription'"
        >
          خرید اشتراک
        </button>
        <button
          :class="['tab-btn', activeTab === 'membership' ? 'active' : '']"
          @click="activeTab = 'membership'"
        >
          اشتراک ها
        </button>
        <button
          :class="['tab-btn', activeTab === 'details' ? 'active' : '']"
          @click="activeTab = 'details'"
        >
          جزئیات
        </button>
      </div>
      <!-- Tab Content -->
      <div v-if="activeTab === 'users'">
        <TeamUser 
          :userList="userList" 
          :teamMemberCapacity="teamMemberCapacity"
          :subscriptionCount="subscriptionCount"
          @add-user="submitNewUser" 
          @change-tab="changeTab" 
        />
      </div>
      <div v-if="activeTab === 'membership'">
        <Membership
          :subscriptionCount="subscriptionCount"
          :teamMemberCapacity="teamMemberCapacity"
          :isBillingModalVisible="isBillingModalVisible"
          @change-tab="changeTab"
          @update:isBillingModalVisible="isBillingModalVisible = $event"
        />
      </div>
      <div v-if="activeTab === 'details'">
        <TeamDetails @update:teamData="handleTeamData" />
      </div>
      <div v-if="activeTab === 'buy-subscription'">
        <BuySubscription
          :memberCount="memberCount"
          :availableMemberOptions="availableMemberOptions"
          :baseUrl="baseUrl"
          @update:memberCount="memberCount = $event"
          @plan-selected="selectedPlan = $event"
          @payment-success="handlePaymentSuccess"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';
import AppHeader from '@/components/Header.vue';
import TeamUser from '@/components/TeamUser.vue';
import BuySubscription from '@/components/BuySubscription.vue';
import Membership from '@/components/Membership.vue';
import TeamDetails from '@/components/TeamDetails.vue';
import axios from 'axios';

export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    AppHeader,
    TeamUser,
    BuySubscription,
    Membership,
    TeamDetails,
  },
  data() {
    return {
      isBillingModalVisible: false,
      memberCount: 5,
      availableMemberOptions: [5, 10, 20, 100],
      selectedPlan: null,
      userList: [
        {
          name: 'دانیال پژوهش کیا',
          email: 'aminimperator@gmail.com',
          role: 'نسخه آزمایشی',
          version: '',
          avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
        },
        {
          name: 'امین رمضانی',
          email: 'aminimperator@gmail.com',
          role: 'مدیر',
          version: 'نسخه آزمایشی',
          avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
        },
        {
          name: 'نوید رمضانی',
          email: 'aminimperator@gmail.com',
          role: 'مدیر',
          version: 'نسخه آزمایشی',
          avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
        },
      ],
      activeTab: 'users',
      previewUrl: '',
      currentPreviewIndex: null,
      currentPreviewType: null,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            type: 'video/mp4',
            src: '',
          },
        ],
      },
      userData: {
        customer: {},
        user: {
          first_name: '',
          last_name: '',
        },
        images: [],
        pdfs: [],
        videos: [],
        glbs: [],
      },
      newFileName: '',
      selectedFile: null,
      uploading: false,
      baseUrl: 'http://194.62.43.230:8000',
      currentUploadType: 'image',
      dialogTitle: 'آپلود فایل جدید',
      fileAccept: '*/*',
      teamMemberCapacity: 0,
      subscriptionCount: 0,
    };
  },
  created() {
    this.fetchUserData();
    this.fetchTeamMemberInfo();
  },
  methods: {
    changeTab(tabName) {
      this.activeTab = tabName;
    },
    async handlePaymentSuccess() {
      await this.fetchTeamMemberInfo();
      this.activeTab = 'membership';
    },
    async fetchTeamMemberInfo() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${this.baseUrl}/get_team_member_info`, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        this.teamMemberCapacity = response.data.data.team_member_capacity;
        this.subscriptionCount = response.data.data.subscriptionCount;
        console.log('تعداد اشتراک‌ها (subscriptionCount):', this.subscriptionCount);
      } catch (error) {
        console.error('خطا در دریافت اطلاعات اشتراک:', error);
        alert('خطا در بارگذاری اطلاعات اشتراک. لطفاً دوباره تلاش کنید.');
      }
    },
    async submitNewUser(newUser) {
      console.log('اطلاعات کاربر جدید:', newUser);

      const remainingCapacity = this.subscriptionCount - this.teamMemberCapacity;
      if (remainingCapacity <= 0) {
        alert('ظرفیت تیم پر شده است. لطفاً اشتراک جدیدی خریداری کنید.');
        this.activeTab = 'buy-subscription';
        return;
      }

      try {
        const token = localStorage.getItem('token');
        
        await axios.post(
          'http://my.xroomapp.com:8000/add_teamMember/',
          newUser,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        this.userList.push({
          ...newUser,
          avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
          role: newUser.role || 'کاربر',
          version: newUser.version || 'نسخه آزمایشی',
        });

        this.teamMemberCapacity++;

        await this.fetchTeamMemberInfo();

        alert('کاربر با موفقیت اضافه شد');
      } catch (error) {
        console.error('خطا در اضافه کردن کاربر:', error);
        alert('خطا در اضافه کردن کاربر. لطفاً دوباره تلاش کنید.');
      }
    },
    handleBackdropClick(event) {
      if (event.target === this.$refs.filePreviewDialog) {
        this.closePreviewDialog();
      }
    },
    handleTeamData(data) {
      console.log('اطلاعات دریافتی : ', data);
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

      this.$refs.filePreviewDialog.showModal();
    },
    getVideoThumbnail() {
      return 'https://cdn-icons-png.flaticon.com/512/2839/2839038.png';
    },
    closePreviewDialog() {
      const dialog = this.$refs.filePreviewDialog;
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      } else {
        console.warn('Dialog reference not found or close method unavailable');
      }
      this.previewUrl = '';
      this.currentPreviewIndex = null;
      this.currentPreviewType = null;
    },
    async downloadFile() {
      const url =
        this.currentPreviewType === 'image' ? this.previewImageUrl : this.previewPdfUrl;
      if (!url) return;

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;

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

        switch (this.currentPreviewType) {
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
            Authorization: `Token ${token}`,
          },
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
        const response = await axios.get(`${this.baseUrl}/getInfo`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
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

      switch (type) {
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
      formData.append('name', this.newFileName || this.selectedFile.name);

      switch (this.currentUploadType) {
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

        switch (this.currentUploadType) {
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
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        this.closeDialog();
        await this.fetchUserData();
        alert('فایل با موفقیت آپلود شد');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('خطا در آپلود فایل');
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped>

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin-top: 20px;
  margin-bottom: 10px;
  grid-column: 1 / -1;
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
  gap: 10px;
}

.tab-buttons {
  display: flex;
  gap: 25px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.tab-btn {
  background: none;
  border: none;
  color: gray;
  font-size: 17px;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  padding-right: 0;
}

.tab-btn.active {
  color: #3a57e8;
  border-bottom: 2px solid #3a57e8;
  font-size: 20px;
}

.section-description {
  margin-bottom: 3rem;
  margin-top: 1rem;
}

.section-description p {
  line-height: 190%;
  color: #4F5A69;
  font-size: 16px;
  margin-top: 2rem;
}


</style>