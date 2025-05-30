<template>
  <SidebarMenu />
  <div class="dashboard-page">
    <div class="content">
      <!-- <AppHeader /> -->
      <AppHeader pageTitle="از این داشبورد، کار با XRoom را آغاز کنید." />

      <div class="dashboard-grid">
        
        <!-- Right Section -->
        <div class="right-section">
          <h2 class="section-title">راهنمای شروع</h2>
          <div class="tutorial-grid">
            <img
              class="tutorial-item"
              @click="tutorialShowModal = true;"
              src="https://c.animaapp.com/m9nvumalUMfQbN/img/tutorials.svg"
              style="cursor: pointer;"
            />
            <img class="tutorial-item" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-20.svg" />
            <img class="tutorial-item" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-19.svg" />
            <img class="tutorial-item" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-21.svg" />
          </div>
        </div>
        
        <!-- Left Section -->
        <div class="left-section">
          <h2 class="section-title">جلسات</h2>
          <p class="section-description">
            فقط یک ایده با جلسه شگفت‌انگیز بعدی‌تان در واقعیت مجازی فاصله دارید. همین امروز آن را برگزار کنید!
          </p>
          
          <button class="create-meeting-btn" @click="showModal = true">
            <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" />
            <span>ایجاد جلسه جدید</span>
          </button>

          
        </div>
        
        <!-- Meetings Section -->
        <div class="meetings-section">
          <div class="files-header">
            <h1 style="    font-size: 24px;">آخرین فایل ها</h1>
            <div class="file-buttons">
              <button class="white-button">بارگذاری فایل</button>
              <button class="white-button">مدیریت فایل‌ها</button>
            </div>
          </div>
          
          <div class="meetings-scroll">
            <div class="meeting-cards">
              <div class="meeting-card">
                <div class="card-image" style="background-image: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-1.png)"></div>
                <div class="card-content">
                  <h3>Pico Control</h3>
                  <div class="meeting-date">
                    <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
                    <span>24 تیر 1403</span>
                  </div>
                </div>
              </div>
              
              <div class="meeting-card">
                <div class="card-image" style="background-image: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png)"></div>
                <div class="card-content">
                  <h3>Fakor Sanat Tehran</h3>
                  <div class="meeting-date">
                    <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
                    <span>24 تیر 1403</span>
                  </div>
                </div>
              </div>
              
              <div class="meeting-card">
                <div class="card-image" style="background-image: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-3.png)"></div>
                <div class="card-content">
                  <h3>Design Artist</h3>
                  <div class="meeting-date">
                    <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
                    <span>24 تیر 1403</span>
                  </div>
                </div>
              </div>
              
              <div class="meeting-card">
                <div class="card-image" style="background-image: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-4.png)"></div>
                <div class="card-content">
                  <h3>Flash Back</h3>
                  <div class="meeting-date">
                    <img src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
                    <span>24 تیر 1403</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>

  <!-- Create Meeting Modal -->
  <CreateMeetingModal
    :is-open="showModal"
    @create-meeting="createNewMeeting"
    @close="showModal = false"
  />  

  <!-- Tutorial Modal -->
  <TutorialShowModal
    :is-open="tutorialShowModal"
    @close="tutorialShowModal = false"
  />
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'
import AppHeader from '@/components/Header.vue';
import CreateMeetingModal from '@/components/CreateMeetingModal.vue';
import TutorialShowModal from '@/components/TutorialShowModal.vue';


export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    AppHeader,
    CreateMeetingModal,
    TutorialShowModal,
  },
  data() {
    return {
      showModal: false,
      tutorialShowModal: false,
    }
  },
 methods: {
    createNewMeeting(meetingData) {
      const newMeeting = {
        id: this.meetings.length + 1,
        title: meetingData.title,
        date: meetingData.date,
        image: 'https://via.placeholder.com/150',
        type: meetingData.type,
        maxCapacity: meetingData.maxCapacity,
      };
      this.meetings.push(newMeeting);
      this.showModal = false;
    },
    filterMeetings() {
      console.log('Filtering meetings');
    },
  }
  
}
</script>

<style scoped>
.dashboard-page {
  margin-right: 360px;
  padding: 20px;
  direction: rtl;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 35px 80px;
  display: flex;
  flex-direction: column;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 80px;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-family: "IRANSansXFaNum-DemiBold", Helvetica;
  font-weight: 700;
  color: #101010;
  font-size: 19px;
  line-height: 26.6px;
  margin: 0;
}

.section-description {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: #4f5a69;
  font-size: 14px;
  line-height: 26.6px;
  margin: 0;
}

.tutorial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
 
}

.tutorial-item {
  width: 300px;
  height: auto;
  border-radius: 8px;
  margin: auto;
}

.create-meeting-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: #3a57e8;
  color: white;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: fit-content;
}

.create-meeting-btn img {
  width: 16px;
  height: 16px;
}

.meetings-section {
  grid-column: 1 / -1;
  margin-top: 40px;
}

.meeting-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.meeting-btn {
  width: 130px;
  cursor: pointer;
}

.meetings-scroll {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}

.meetings-scroll::-webkit-scrollbar {
  display: none;
}

.meeting-cards {
  display: flex;
  gap: 20px;
  width: max-content;
}

.meeting-card {
  width: 250px;
  background-color: white;
  border-radius: 16px;
  border: 0.5px solid #b8c0cb;
  overflow: hidden;
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 172px;
  background-size: cover;
  background-position: center;
  border-radius: 14px;
}

.card-content {
  padding: 8px 16px 16px;
}

.card-content h3 {
  font-family: "IRANSansXFaNum-DemiBold", Helvetica;
  font-weight: 700;
  color: #444d5a;
  font-size: 15px;
  margin: 0 0 14px 0;
}

.meeting-date {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: #7f8da1;
  font-size: 13px;
}

.meeting-date img {
  width: 20px;
  height: 20px;
}

.footer {
  text-align: center;
  margin-top: 20px;
}

.footer-text {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 13px;
  line-height: 18.2px;
}

.footer-logo {
  width: 150px;
  margin: 30px auto;
}

.footer-logo img {
  width: 100%;
  height: auto;
}





.files-header {
  display: flex;
  align-items: center;
   
  margin-bottom: 20px;
}

.file-buttons {
  display: flex;
  gap: 30px;
  margin-right: 40px;
}

.white-button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  cursor: pointer;
  transition: background-color 0.2s;
}

.white-button:hover {
  background-color: #f5f5f5;
}

</style>