<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <!-- Right Section -->
      <div class="right-section">
        <h2 class="section-title">راهنمای شروع</h2>
        <swiper
          :slides-per-view="1.5"
          :space-between="10"
          :loop="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          class="my-swiper"
        >
          <swiper-slide>
            <img
              src="https://c.animaapp.com/m9nvumalUMfQbN/img/tutorials.svg"
              alt="Tutorial"
              class="swiper-image"
              @click="tutorialShowModal = true"
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-20.svg"
              alt="Tutorial"
              class="swiper-image"
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-19.svg"
              alt="Tutorial"
              class="swiper-image"
            />
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-21.svg"
              alt="Tutorial"
              class="swiper-image"
            />
          </swiper-slide>
        </swiper>
        <div class="tutorial-grid">
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/tutorials.svg"
            alt="Tutorial"
            class="tutorial-item"
            @click="tutorialShowModal = true"
          />
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-20.svg"
            alt="Tutorial"
            class="tutorial-item"
          />
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-19.svg"
            alt="Tutorial"
            class="tutorial-item"
          />
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-21.svg"
            alt="Tutorial"
            class="tutorial-item"
          />
        </div>
      </div>

      <!-- Left Section -->
      <div class="left-section">
        <h2 class="section-title">جلسات</h2>
        <p class="section-description">
          فقط یک ایده با جلسه شگفت‌انگیز بعدی‌تان در واقعیت مجازی فاصله دارید. همین امروز آن را برگزار کنید!
        </p>
        <button class="create-meeting-btn" @click="showModal = true">
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg"
            alt="Create Meeting Icon"
            class="btn-icon"
          />
          <span>ایجاد جلسه جدید</span>
        </button>
      </div>

      <!-- Meetings Section -->
      <div class="meetings-section">
        <div class="files-header">
          <h1 class="files-title">آخرین فایل‌ها</h1>
          <div class="file-buttons">
            <button class="white-button" @click="openDialog('image')">
              بارگذاری فایل
            </button>
            <router-link class="white-button" to="/dashboard/files">
              مدیریت فایل‌ها
            </router-link>
          </div>
        </div>
        <swiper
          :slides-per-view="2.2"
          :space-between="15"
          :loop="true"
          :pagination="{ clickable: true }"
          :breakpoints="{
            768: { slidesPerView: 3.4, spaceBetween: 15 },
            1024: { slidesPerView: 2.8, spaceBetween: 25 },
            1280: { slidesPerView: 3.8, spaceBetween: 30 },
          }"
          :modules="modules"
          class="last-files-swiper"
        >
          <swiper-slide v-for="(meeting, index) in meetings" :key="index" class="meeting-card">
            <div
              class="card-image"
              :style="{ backgroundImage: `url(${meeting.image})` }"
            ></div>
            <div class="card-content">
              <h3>{{ meeting.title }}</h3>
              <div class="meeting-date">
                <img
                  src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg"
                  alt="Calendar Icon"
                  class="date-icon"
                />
                <span>{{ meeting.date }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- Modals -->
    <CreateMeetingModal
      :is-open="showModal"
      @create-meeting="createNewMeeting"
      @close="showModal = false"
    />
    <TutorialShowModal
      :is-open="tutorialShowModal"
      @close="tutorialShowModal = false"
    />
    <NewFileDialog
      :is-open="isNewFileDialogOpen"
      :initial-upload-type="currentUploadType"
      :base-url="baseUrl"
      @close="closeDialog"
      @upload-success="fetchUserData"
    />
  </div>
</template>

<script>
import CreateMeetingModal from '@/components/CreateMeetingModal.vue';
import TutorialShowModal from '@/components/TutorialShowModal.vue';
import NewFileDialog from '@/components/NewFileDialog.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

export default {
  name: 'DashboardPage',
  components: {
    CreateMeetingModal,
    TutorialShowModal,
    NewFileDialog,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination],
      showModal: false,
      tutorialShowModal: false,
      isNewFileDialogOpen: false,
      currentUploadType: 'image',
      baseUrl: 'http://194.62.43.230:8000',
      meetings: [
        {
          title: 'Pico Control',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-1.png',
        },
        {
          title: 'Flash Back',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-4.png',
        },
        {
          title: 'Fakor Sanat Tehran',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png',
        },
        {
          title: 'Design Artist',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-3.png',
        },
        {
          title: 'Fakor Sanat Tehran',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png',
        },
        {
          title: 'Design Artist',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-3.png',
        },
        {
          title: 'Flash Back',
          date: '24 تیر 1403',
          image: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-4.png',
        },
      ],
    };
  },
  methods: {
    createNewMeeting(meetingData) {
      this.meetings.push({
        title: meetingData.title,
        date: meetingData.date,
        image: 'https://via.placeholder.com/150',
        type: meetingData.type,
        maxCapacity: meetingData.maxCapacity,
      });
      this.showModal = false;
    },
    openDialog(type = 'image') {
      this.currentUploadType = type;
      this.isNewFileDialogOpen = true;
    },
    closeDialog() {
      this.isNewFileDialogOpen = false;
    },
    fetchUserData() {
      console.log('Fetching user data');
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px 0px;
  font-family: 'IRANSansXFaNum-Medium', Helvetica, sans-serif;
}

.section-title {
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #101010;
  font-size: 19px;
  line-height: 26.6px;
  margin-bottom: 1rem;
}

.section-description {
  color: #4f5a69;
  font-size: 14px;
  line-height: 26.6px;
  margin: 0;
}

.create-meeting-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #3a57e8;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.files-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.files-title {
  font-size: 19px;
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #101010;
}

.file-buttons {
  display: flex;
  gap: 10px;
}

.white-button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 14px;
  color: #101010;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  line-height: normal;
}

.white-button:hover {
  background-color: #f5f5f5;
}

.my-swiper,
.last-files-swiper {
  width: 100%;
  margin-bottom: 1.5rem;
}

.swiper-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
}

.tutorial-grid {
  display: none;
}

.tutorial-item {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
}

.meeting-card {
  background-color: white;
  border-radius: 16px;
  border: 0.5px solid #b8c0cb;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 120px;
  background-size: cover;
  background-position: center;
  border-radius: 14px 14px 0 0;
}

.card-content {
  padding: 12px 10px 8px;
}

.card-content h3 {
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #444d5a;
  font-size: 14px;
  margin: 0 0 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meeting-date {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f8da1;
  font-size: 12px;
}

.date-icon {
  width: 15px;
  height: 15px;
}

/* Mobile (max-width: 600px) */
@media (max-width: 600px) {

  .white-button {
    font-size: 12px;
  }
  
  .section-title {
    margin-bottom: 0;

  }

  .files-title {
    font-size: 18px !important;
    font-weight: 600 !important;
  }

  .create-meeting-btn {
    width: fit-content;
  }

  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

   .left-section {
    gap: 10px !important;
   }

  .my-swiper, .last-files-swiper {
    margin: 0;
  }

  .right-section,
  .left-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .tutorial-grid {
    display: none;
  }

  .meeting-card {
    width: 250px;
    flex-shrink: 0;
  }
}

/* Small Tablet (min-width: 600px and max-width: 780px) */
@media (min-width: 600px) and (max-width: 780px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 200px;
    margin: auto;
  }

  .meetings-section {
    grid-column: 1 / -1;
    margin-top: 40px;
  }

  .file-buttons {
    margin-right: 20px;
  }
}

/* Tablet (min-width: 780px and max-width: 1024px) */
@media (min-width: 780px) and (max-width: 1024px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 85%;
    margin: auto;
  }

  .meetings-section {
    max-width: 96%;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 15px;
  }

  .date-icon {
    width: 20px;
    height: 20px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }
}

/* Desktop (min-width: 1024px and max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 280px;
    margin: auto;
  }

  .create-meeting-btn {
    padding: 12px 24px;
    font-size: 16px;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .meetings-section {
    max-width: 100%;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 15px;
  }

  .date-icon {
    width: 20px;
    height: 20px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }
}

/* Large Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 300px;
    margin: auto;
  }

  .create-meeting-btn {
    padding: 12px 24px;
    font-size: 16px;
    margin-top: 1.5rem;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .meetings-section {
    grid-column: 1 / -1;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 15px;
  }

  .date-icon {
    width: 20px;
    height: 20px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }
}
</style>