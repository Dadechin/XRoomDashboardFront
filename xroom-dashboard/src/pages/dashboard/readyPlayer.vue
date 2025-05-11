<template>
    <SidebarMenu />
  
    <div class="dashboard-page">
      <div class="content">
        <!-- Header -->
        <AppHeader pageTitle="انتخاب آواتار" />

  
        <div class="page-title">ساخت آواتار جدید</div>
  
        
        <!-- Hidden iframe for Ready Player Me -->
        <iframe
          id="frame"
          class="rpm-frame"
          :src="iframeSrc"
          allow="camera *; microphone *; clipboard-write"
           
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMenu from '@/components/SidebarMenu.vue'
  import axios from '@/axios';
import AppHeader from '@/components/Header.vue';
  
  export default {
    name: 'ChangeAvatar',
    components: {
      SidebarMenu,
      AppHeader,
    },
    data() {
      return {
        subdomain: 'xroom',
        avatarUrl: '',
        frame: null,
        saving: false,
        userData: {
          user: { first_name: '', last_name: '' }
        },
        maleAvatars: [
          { id: 1, name: 'مرد ۱', src: 'http://194.62.43.230:8000/media/2025/5/5/men1.glb' },
          { id: 2, name: 'مرد ۲', src: 'http://194.62.43.230:8000/media/2025/5/5/men1.glb' },
          { id: 7, name: 'مرد ۳', src: 'http://194.62.43.230:8000/media/2025/5/5/men1.glb' },
        ],
        femaleAvatars: [
          { id: 4, name: 'زن ۱', src: 'http://194.62.43.230:8000/media/2025/5/5/men1.glb' },
          { id: 10, name: 'زن ۳', src: 'http://194.62.43.230:8000/media/2025/5/5/men1.glb' },
        ],
        baseUrl: 'http://194.62.43.230:8000'
      };
    },
    computed: {
      iframeSrc() {
        return `https://${this.subdomain}.readyplayer.me/avatar?frameApi`;
      }
    },
    mounted() {
      this.frame = document.getElementById('frame');
      window.addEventListener('message', this.subscribe);
      document.addEventListener('message', this.subscribe);
      
      // Load existing avatar if available
      this.loadUserData();
    },
    beforeUnmount() {
      window.removeEventListener('message', this.subscribe);
      document.removeEventListener('message', this.subscribe);
    },
    methods: {
        async saveAvatarUrl(glbUrl) {
      try {
        const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        const payload = {
          profile_glb_url: glbUrl
        };

        // If profile_img is null, set it to the thumbnail of the GLB
        if (!customer.profile_img) {
          payload.profile_img = this.getAvatarThumbnail(glbUrl);
        }

        const response = await axios.post(`${this.baseUrl}/editProfile/`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Update local storage
        if (!customer.profile_img) {
          customer.profile_img = payload.profile_img;
        }
        customer.profile_glb_url = glbUrl;
        localStorage.setItem('customer', JSON.stringify(customer));
        
        return response.data;
      } catch (error) {
        console.error('Error saving avatar URL:', error);
        throw error;
      }
    },
    
    getAvatarThumbnail(glbUrl) {
      // Replace .glb with .png for thumbnail
      // Adjust this based on your actual thumbnail URLs
      if (glbUrl.includes('readyplayer.me')) {
        // For Ready Player Me avatars, use their thumbnail service
        return glbUrl.replace('.glb', '.png');
      }
      return glbUrl.replace('.glb', '.png') || 'https://i.imgur.com/QbXfV6C.png';
    },
      loadUserData() {
        const customer = JSON.parse(localStorage.getItem('customer') || '{}');
        if (customer.profile_glb_url) {
          this.avatarUrl = customer.profile_glb_url;
        }
      },
      async subscribe(event) {
        const json = this.parse(event);
  
        if (json?.source !== 'readyplayerme') {
          return;
        }
  
        if (json.eventName === 'v1.frame.ready') {
          this.frame.contentWindow.postMessage(
            JSON.stringify({
              target: 'readyplayerme',
              type: 'subscribe',
              eventName: 'v1.**'
            }),
            '*'
          );
        }
  
        if (json.eventName === 'v1.avatar.exported') {
          this.saving = true;
          try {
            console.log(`Avatar URL: ${json.data.url}`);
            this.avatarUrl = json.data.url;
            this.frame.hidden = true;
            
            // Save the avatar URL to your backend
            await this.saveAvatarUrl(json.data.url);
            
            alert('آواتار با موفقیت ذخیره شد');
          } catch (error) {
            console.error('Error saving avatar:', error);
            alert('خطا در ذخیره آواتار');
          } finally {
            this.saving = false;
          }
        }
      },
      parse(event) {
        try {
          return JSON.parse(event.data);
        } catch (error) {
          return null;
        }
      },
      openAvatarEditor() {
        this.frame.hidden = false;
      },
     
      
      async selectAvatar(avatar) {
        this.saving = true;
        try {
          await this.saveAvatarUrl(avatar.src);
          this.avatarUrl = avatar.src;
          alert('آواتار پیش‌فرض با موفقیت انتخاب شد');
        } catch (error) {
          console.error('Error selecting avatar:', error);
          alert(error.response?.data?.detail || error.message || 'خطا در انتخاب آواتار');
        } finally {
          this.saving = false;
        }
      },
      async fetchUserData() {
        try {
          const response = await axios.get('/getInfo');
          this.userData = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Previous styles remain the same, add these new styles */
  
  .default-avatars {
    margin-top: 20px;
  }
  
  .avatar-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin: 10px 0 20px;
  }
  
  .avatar-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.2s;
  }
  
  .avatar-option:hover {
    background-color: #f0f0f0;
  }
  
  .avatar-thumbnail {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 5px;
  }
  
  /* Rest of your existing styles... */
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
  
  .page-title {
    font-size: 22px;
    font-weight: bold;
    margin: 24px 0;
    color: #333;
  }
  
  .profile-edit-container {
    display: flex;
    gap: 32px;
    flex-direction: row-reverse;
  }
  
  .column {
    flex: 1;
  }
  
  .form-section {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  
  .form-section h3 {
    margin-bottom: 8px;
    color: #222;
    font-size: 18px;
  }
  
  .section-description {
    color: #777;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .avatar-image {
    width: 200px;
    height: 200px;
    border-radius: 12px;
    margin: 16px 0;
    object-fit: cover;
  }
  
  .avatar-placeholder {
    padding: 40px;
    text-align: center;
    color: #777;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin: 16px 0;
  }
  
  .avatar-url {
    color: #4CAF50;
    font-size: 14px;
    margin-top: 8px;
  }
  
  .save-btn {
    background: #3a57e8;
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 8px;
  }
  
  .save-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .instruction-list {
    padding-right: 20px;
    color: #555;
  }
  
  .instruction-list li {
    margin-bottom: 8px;
  }
  
  .rpm-frame {
    width: 100%;
    height: 950px;
    border: none;
    border-radius: 12px;
  }
  
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-name {
    font-weight: 500;
  }
  
  .avatar-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .subscription-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #3a57e8;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .button-icon {
    width: 16px;
    height: 16px;
  }
  </style>