<template>
  <div>
    <div class="section-description">
      <div class="section-title">مدیریت جلسات</div>
      <p class="title-description">
        با استفاده از جلسات، می‌توانید همکاران و کاربران خارجی XRoom را به تیم و اتاق‌های خصوصی خود دعوت کنید. شرکت‌کنندگان جلسه شما می‌توانند با استفاده از کد جلسه ایجاد شده در زمان‌های معین به جلسه بپیوندند.
      </p>
    </div>

    <div class="meeting-section">
      <div class="meeting-filters">
        <div class="search-section">
          <span style="font-size: 17px; font-weight: 600;">جستجو</span>
          <div class="search-wrapper">
            <input
              type="text"
              class="search-input"
              placeholder="جستجو جلسه مدنظر ..."
              v-model="searchQuery"
              @input="filterMeetings"
            />
            <button class="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="#101010"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.9995 14L11.1328 11.1333"
                  stroke="#101010"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="filter-section">
          <span style="font-size: 17px; font-weight: 600;">فیلتر</span>
          <div class="filter-buttons">
            <button
              :class="{ 'active-filter': activeFilter === 'all', 'disable-filter': activeFilter !== 'all' }"
              @click="setFilter('all')"
            >
              همه
            </button>
            <button
              :class="{ 'active-filter': activeFilter === 'future', 'disable-filter': activeFilter !== 'future' }"
              @click="setFilter('future')"
            >
              آینده
            </button>
          </div>
        </div>
      </div>

      <div :class="filteredMeetings.length === 0 ? 'meet-discover' : 'meetings-container'">
        <span class="discover-result" v-if="filteredMeetings.length === 0">
          هیچ جلسه‌ای یافت نشد. با کلیک کردن، یک جلسه جدید ایجاد کنید
        </span>
        <div v-else class="meetings-list">
          <div v-for="meeting in filteredMeetings" :key="meeting.id" class="meeting-item">
            <img :src="meeting.image" alt="Meeting Image" class="meeting-image" width="48%" height="120" />
            <div class="meeting-details" style="width : 48%;">
              <h3 class="meet-title">{{ meeting.title }}</h3>
              <p class="meet-capacity">
                <span style="margin-left: 4px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g clip-path="url(#clip0_622_1334)">
                      <path d="M3.33203 5.16667C3.33203 5.87391 3.61298 6.55219 4.11308 7.05228C4.61318 7.55238 5.29145 7.83333 5.9987 7.83333C6.70594 7.83333 7.38422 7.55238 7.88432 7.05228C8.38441 6.55219 8.66536 5.87391 8.66536 5.16667C8.66536 4.45942 8.38441 3.78115 7.88432 3.28105C7.38422 2.78095 6.70594 2.5 5.9987 2.5C5.29145 2.5 4.61318 2.78095 4.11308 3.28105C3.61298 3.78115 3.33203 4.45942 3.33203 5.16667Z" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 14.5V13.1667C2 12.4594 2.28095 11.7811 2.78105 11.281C3.28115 10.781 3.95942 10.5 4.66667 10.5H7.33333C8.04058 10.5 8.71885 10.781 9.21895 11.281C9.71905 11.7811 10 12.4594 10 13.1667V14.5" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.668 2.58667C11.2416 2.73354 11.75 3.06714 12.1131 3.53488C12.4761 4.00262 12.6732 5.17 12.6732 5.17C12.6732 5.76212 12.4761 6.33739 12.1131 6.80513C11.75 7.27287 11.2416 7.60647 10.668 7.75334" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 14.5V13.1666C13.9966 12.5781 13.7986 12.0072 13.4368 11.5429C13.0751 11.0786 12.5699 10.7471 12 10.6" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_622_1334">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                حداکثر: {{ meeting.maxCapacity }} کاربر
              </p>
              <div class="card-footer">
                <p class="meet-type">
                  <span style="margin-left: 4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M4 15.1667V3.16671C4 2.81309 4.14048 2.47395 4.39052 2.2239C4.64057 1.97385 4.97971 1.83337 5.33333 1.83337H10.6667C11.0203 1.83337 11.3594 1.97385 11.6095 2.2239C11.8595 2.47395 12 2.81309 12 3.16671V15.1667H4Z" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3.9987 8.5H2.66536C2.31174 8.5 1.9726 8.64048 1.72256 8.89052C1.47251 9.14057 1.33203 9.47971 1.33203 9.83333V13.8333C1.33203 14.187 1.47251 14.5261 1.72256 14.7761C1.9726 15.0262 2.31174 15.1667 2.66536 15.1667H3.9987" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6.5H13.3333C13.687 6.5 14.0261 6.64048 14.2761 6.89052C14.5262 7.14057 14.6667 7.47971 14.6667 7.83333V13.8333C14.6667 14.187 14.5262 14.5261 14.2761 14.7761C14.0261 15.0262 13.687 15.1667 13.3333 15.1667H12" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 4.5H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 7.16663H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 9.83337H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 12.5H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  {{ meeting.type }}
                </p>
                <button class="info-button" @click="openMeetingInfo(meeting)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3A57E8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
          <swiper
            ref="swiper"
            :key="filteredMeetings.length + activeFilter + JSON.stringify(filteredMeetings)"
            :slides-per-view="1.4"
            :space-between="10"
            :freeMode="true"
            :pagination="{ clickable: true }"
            :breakpoints="{
              768: { slidesPerView: 3.3, spaceBetween: 15 },
              1024: { slidesPerView: 2.1, spaceBetween: 15 },
              1280: { slidesPerView: 4.1, spaceBetween: 25 },
            }"
            :modules="modules"
            class="swiper-meetings-list"
          >
            <swiper-slide v-for="meeting in filteredMeetings" :key="meeting.id" class="swiper-meeting-item">
              <img :src="meeting.image" alt="Meeting Image" class="meeting-image" width="48%" height="120" />
              <div class="meeting-details" style="width: 48%;padding-left: 4px;">
                <h3 class="meet-title">{{ meeting.title }}</h3>
                <p class="meet-capacity">
                  <span style="margin-left: 4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <g clip-path="url(#clip0_622_1334)">
                        <path d="M3.33203 5.16667C3.33203 5.87391 3.61298 6.55219 4.11308 7.05228C4.61318 7.55238 5.29145 7.83333 5.9987 7.83333C6.70594 7.83333 7.38422 7.55238 7.88432 7.05228C8.38441 6.55219 8.66536 5.87391 8.66536 5.16667C8.66536 4.45942 8.38441 3.78115 7.88432 3.28105C7.38422 2.78095 6.70594 2.5 5.9987 2.5C5.29145 2.5 4.61318 2.78095 4.11308 3.28105C3.61298 3.78115 3.33203 4.45942 3.33203 5.16667Z" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 14.5V13.1667C2 12.4594 2.28095 11.7811 2.78105 11.281C3.28115 10.781 3.95942 10.5 4.66667 10.5H7.33333C8.04058 10.5 8.71885 10.781 9.21895 11.281C9.71905 11.7811 10 12.4594 10 13.1667V14.5" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.668 2.58667C11.2416 2.73354 11.75 3.06714 12.1131 3.53488C12.4761 4.00262 12.6732 5.17 12.6732 5.17C12.6732 5.76212 12.4761 6.33739 12.1131 6.80513C11.75 7.27287 11.2416 7.60647 10.668 7.75334" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 14.5V13.1666C13.9966 12.5781 13.7986 12.0072 13.4368 11.5429C13.0751 11.0786 12.5699 10.7471 12 10.6" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_622_1334">
                          <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  حداکثر: {{ meeting.maxCapacity }} کاربر
                </p>
                <div class="card-footer">
                  <p class="meet-type">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path d="M4 15.1667V3.16671C4 2.81309 4.14048 2.47395 4.39052 2.2239C4.64057 1.97385 4.97971 1.83337 5.33333 1.83337H10.6667C11.0203 1.83337 11.3594 1.97385 11.6095 2.2239C11.8595 2.47395 12 2.81309 12 3.16671V15.1667H4Z" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M3.9987 8.5H2.66536C2.31174 8.5 1.9726 8.64048 1.72256 8.89052C1.47251 9.14057 1.33203 9.47971 1.33203 9.83333V13.8333C1.33203 14.187 1.47251 14.5261 1.72256 14.7761C1.9726 15.0262 2.31174 15.1667 2.66536 15.1667H3.9987" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6.5H13.3333C13.687 6.5 14.0261 6.64048 14.2761 6.89052C14.5262 7.14057 14.6667 7.47971 14.6667 7.83333V13.8333C14.6667 14.187 14.5262 14.5261 14.2761 14.7761C14.0261 15.0262 13.687 15.1667 13.3333 15.1667H12" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 4.5H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 7.16663H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 9.83337H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66797 12.5H9.33464" stroke="#3A57E8" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span style="margin-right: 4px;white-space: nowrap;text-overflow: ellipsis;overflow-x: clip;width: 50px;">
                      {{ meeting.type }}
                    </span>
                  </p>
                  <button class="info-button" @click="openMeetingInfo(meeting)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3A57E8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </button>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <button
          class="create-meet"
          @click="showModal = true"
          :style="{ width: filteredMeetings.length === 0 ? 'auto' : '191px', margin: filteredMeetings.length === 0 ? '0' : 'auto'}"
        >
          + <span style="margin-right: 0.5rem;">ایجاد جلسه جدید</span>
        </button>
      </div>
    </div>

    <CreateMeetingModal
      :is-open="showModal"
      @create-meeting="createNewMeeting"
      @close="showModal = false"
    />
    <MeetingInfoModal
      :is-open="showInfoModal"
      :meeting="selectedMeeting"
      @close="showInfoModal = false"
      @update-meeting="updateMeeting"
    />
  </div>
</template>

<script>
import CreateMeetingModal from '@/components/CreateMeetingModal.vue';
import MeetingInfoModal from '@/components/MeetingInfoModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';
import axios from 'axios';

const API_BASE_URL = 'https://my.xroomapp.com/api';

export default {
  name: 'Meetings',
  components: {
    Swiper,
    SwiperSlide,
    CreateMeetingModal,
    MeetingInfoModal,
  },
  data() {
    return {
      searchQuery: '',
      activeFilter: 'future',
      showModal: false,
      showInfoModal: false,
      selectedMeeting: null,
      modules: [FreeMode, Pagination],
      meetings: [],
      filteredMeetings: [],
    };
  },
  created() {
    this.fetchMeetings();
  },
  methods: {
    async updateMeeting(updatedMeeting) {
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
        this.meetings = this.meetings.map((meeting) =>
          meeting.id === updatedMeeting.id
            ? {
                ...meeting,
                title: updatedMeeting.title,
                date: updatedMeeting.date,
                image: updatedMeeting.image || meeting.image || 'https://via.placeholder.com/150',
                type: updatedMeeting.type,
                maxCapacity: updatedMeeting.maxCapacity,
              }
            : meeting
        );
        this.filterMeetings();
        this.showInfoModal = false;
        this.$nextTick(() => {
          this.refreshSwiper();
        });
        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'جلسه با موفقیت به‌روزرسانی شد',
        });
      } catch (error) {
        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: `خطا در به‌روزرسانی جلسات: ${error.message}`,
        });
      }
    },
    openMeetingInfo(meeting) {
      this.selectedMeeting = meeting;
      this.showInfoModal = true;
    },
    refreshSwiper() {
      if (this.$refs.swiper && this.$refs.swiper.swiper) {
        this.$refs.swiper.swiper.update();
        this.$refs.swiper.swiper.slideTo(0);
      }
    },
    async fetchMeetings() {
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
        let token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت پیدا نشد');

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token.trim()}`,
          },
        };

        const response = await axios.get(`${API_BASE_URL}/get_user_meetings`, config).catch(async (error) => {
          if (error.response?.status === 403) {
            token = await this.refreshToken();
            return axios.get(`${API_BASE_URL}/get_user_meetings`, {
              headers: { ...config.headers, Authorization: `Token ${token.trim()}` },
            });
          }
          throw error;
        });

        this.meetings = response.data.meetings.map((meeting) => {
          const isSpaceUsed = meeting.use_space;
          const imagePath = isSpaceUsed
            ? meeting.space_data?.assetBundleRoomId?.img
            : meeting.asset_bundle_data?.img;

          return {
            id: meeting.id,
            title: meeting.name,
            date: meeting.date_time,
            image: imagePath
              ? imagePath.startsWith('http')
                ? imagePath
                : `${"https://my.xroomapp.com"}${imagePath}`
              : 'https://via.placeholder.com/150',
            type: isSpaceUsed
              ? meeting.space_data?.name || 'جلسه'
              : meeting.asset_bundle_data?.name || 'جلسه',
            maxCapacity: isSpaceUsed
              ? meeting.space_data?.capacity || 10
              : meeting.asset_bundle_data?.maxPerson || 10,
          };
        });

        this.filterMeetings();
        this.refreshSwiper();
      } catch (error) {
        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: `خطایی در دریافت جلسات رخ داد: ${error.response?.data?.message || error.message}`,
        });
      }
    },
    filterMeetings() {
      let filtered = this.meetings;

      if (this.searchQuery) {
        filtered = filtered.filter((meeting) =>
          [meeting.title, meeting.type].some((field) =>
            field.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }

      if (this.activeFilter === 'future') {
        filtered = filtered.filter((meeting) => new Date(meeting.date) > new Date());
      }

      this.filteredMeetings = filtered;
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterMeetings();
    },
    async refreshToken() {
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
        const response = await axios.post(`${API_BASE_URL}/refresh_token`, {
          refresh_token: localStorage.getItem('refresh_token'),
        });
        const newToken = response.data.access_token;
        localStorage.setItem('token', newToken);
        return newToken;
      } catch (error) {
        // Show error Toast and redirect to login
        Toast.fire({
          icon: 'error',
          title: 'لطفاً دوباره وارد شوید',
        });
        window.location.href = '/login';
        throw error;
      }
    },
    async createNewMeeting(meetingData) {
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
        let token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت پیدا نشد');

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token.trim()}`,
          },
        };

        await axios.post(`${API_BASE_URL}/add_meeting`, meetingData, config).catch(async (error) => {
          if (error.response?.status === 403) {
            token = await this.refreshToken();
            return axios.post(`${API_BASE_URL}/add_meeting`, meetingData, {
              headers: { ...config.headers, Authorization: `Token ${token.trim()}` },
            });
          }
          throw error;
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
        await this.fetchMeetings();
        this.showModal = false;
        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'جلسه با موفقیت ایجاد شد',
        });
      } catch (error) {
        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: `خطایی در ایجاد جلسه رخ داد: ${error.response?.data?.message || error.message}`,
        });
      }
    },
  },
};
</script>

<style scoped>

/* Base styles for all screen sizes */
.section-title {
  font-weight: 700;
  color: #101010;
  font-size: 19px;
  line-height: 26.6px;
}

.section-description {
  margin: 1rem 0 3rem;
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
}

.section-description p {
  line-height: 190%;
  color: #4f5a69;
  font-size: 15px;
  margin-top: 1rem;
  font-weight: 500;
  text-align: justify;
}

.meeting-section {
  margin-top: 1rem;
  border-radius: 10px;
}

.meeting-filters {
  margin-bottom: 2.5rem;
  padding: 24px 16px;
  border-radius: 10px;
  background-color: #ffffff;
}


.search-wrapper {
  margin-top: 1rem;
  position: relative;
  display: inline-block;
  width: 95%;
}

.search-wrapper::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 10px;
  background: linear-gradient(to right, #001940, #4364f7);
  z-index: 0;
}

.search-input {
  width: 100%;
  height: 43px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: white;
  display: block;
  position: relative;
  z-index: 1;
}

.search-button {
  position: relative;
  z-index: 1; /* Ensures the button stays above the pseudo-element */
}

.search-input::placeholder {
  color: #7f8da1;
  font-size: 14px;
  font-weight: 500;
}

.search-input:focus {
  outline: none;
}

.search-button {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #555;
  height: -webkit-fill-available;
}

.meet-discover {
  margin-top: 3rem;
  padding-bottom: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.meetings-container {
  display: flex;
  flex-direction: column;
}

.discover-result {
  font-size: 15px;
  font-weight: 500;
  color: #101010;
  line-height: 190%;
}

.create-meet {
  background-color: #3a57e8;
  border-radius: 8px;
  font-weight: 500;
  color: #ffffff;
  border: none;
  cursor: pointer;
}

.active-filter {
  background-color: #3a57e8;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.disable-filter {
  color: #3a57e8;
  background-color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.meeting-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #b8c0cb;
  border-radius: 12px;
  text-align: right;
}

.meet-title {
  font-weight: 500;
  color: #101010;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: clip;
  width: 90px;
}

.meet-capacity {
  font-weight: 500;
  color: #718096;
  margin: 1.2rem 0;
  display: flex;
  align-items: center;
}

.meet-capacity svg,
.meet-type svg {
  height: 14px !important;
  width: 14px !important;
}

.meet-type {
  font-weight: 500;
  color: #3a57e8;
  display: flex;
  align-items: center;
}

.meeting-image {
  border-radius: 10px;
  object-fit: cover;
}

.swiper-meetings-list {
  display: none;
}

.filter-section {
  padding : 0;
}

.card-footer {
  display : flex;
  align-items : center;
  justify-content: space-between;
}

.info-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}


/* Mobile devices (max-width: 600px) */
@media (max-width: 600px) {

/*   .info-button {
    height: 18px;
  } */

  .meeting-filters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .search-section,
  .filter-section {
    max-width: 100%;
    width: 100%;
  }

  .search-section {
    margin-left: 1.5rem;
  }

  .filter-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .filter-buttons {
    margin-top: 0;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .active-filter {
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 5px;
  }

  .disable-filter {
    padding: 0;
  }

  .meet-discover {
    flex-direction: column;
  }

  .discover-result {
    margin: 0 auto 1.5rem;
    text-align: center;
    max-width: 70%;
  }

  .create-meet {
    padding: 7px 16px;
    font-size: 15px;
  }

  .meetings-container {
    padding-bottom: 2rem;
  }

  .swiper-meetings-list {
    width: 100%;
    margin-bottom: 1.5rem;
    display: block;
  }

  .meeting-item {
    display: none;
  }

  .swiper-meeting-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #b8c0cb;
    border-radius: 12px;
    padding: 4px;
    text-align: right;
  }

  .meet-title {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: clip;
    width: 100px;
    text-align: justify;
  }

  .meet-capacity,
  .meet-type {
    font-size: 12px;
  }

  .meeting-image {
    height: 7rem;
    object-fit: cover;
  }
}

/* Small tablets (min-width: 600px and max-width: 780px) */
@media (min-width: 600px) and (max-width: 780px) {
  .meeting-filters {
    display: flex;
    align-items: center;
  }

  .search-section {
    max-width: 85%;
    width: 100%;
    margin-left: 1.5rem;
  }

  .filter-section {
    max-width: 20%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }

  .filter-buttons {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .active-filter {
    padding: 7px 12px;
    margin-left: 1rem;
  }

  .disable-filter {
    padding: 7px 10px;
    margin-left: 1rem;
  }

  .discover-result {
    margin-left: 5rem;
  }

  .create-meet {
    padding: 8px 18px;
    font-size: 16px;
    width: max-content;
  }

  .meetings-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .meeting-item {
    padding: 4px;
  }

  .meet-title {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: clip;
    width: 120px;
    text-align: justify;
  }


  .meeting-details {
    width: 60% !important;
  }

  .info-button svg {
    height: 18px !important;
    width: 18px !important;
  }

  .info-button {
    height: 18px;
  }

  .meet-capacity,
  .meet-type {
    font-size: 12px;
  }

  .meeting-image {
    height: 7rem;
    width: 7.5rem;
    object-fit: cover;
  }
}

/* Tablets (min-width: 780px and max-width: 1024px) */
@media (min-width: 780px) and (max-width: 1024px) {
  .meeting-filters {
    display: flex;
    align-items: center;
  }

  .search-section {
    max-width: 85%;
    width: 100%;
    margin-left: 1.5rem;
  }

  .filter-section {
    max-width: 15%;
    width: 100%;
  }

  .filter-buttons {
    margin-top: 1rem;
  }

  .active-filter {
    padding: 7px 12px;
    margin-left: 1rem;
  }

  .disable-filter {
    padding: 7px 10px;
    margin-left: 1rem;
  }

  .discover-result {
    margin-left: 5rem;
  }

  .create-meet {
    padding: 12px 24px;
    font-size: 16px;
    width: max-content;
  }

  .meetings-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .meeting-item {
    padding: 8px;
  }

  .meet-title {
    font-size: 16px;
  }

  .meet-capacity,
  .meet-type {
    font-size: 14px;
  }
}

/* Laptops (min-width: 1024px and max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .meeting-filters {
    display: flex;
    align-items: center;
  }

  .search-section {
    max-width: 85%;
    width: 100%;
    margin-left: 1.5rem;
  }

  .filter-section {
    max-width: 20%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }

  .filter-buttons {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .active-filter {
    padding: 7px 12px;
    margin-left: 1rem;
  }

  .disable-filter {
    padding: 7px 10px;
    margin-left: 1rem;
  }

  .discover-result {
    margin-left: 5rem;
  }

  .create-meet {
    white-space: nowrap;
    padding: 8px 20px;
    font-size: 14px;
    width: -moz-max-content;
    width: max-content;
  }



  .meet-title{
    width: 115px !important;
  }

  .meet-type span {
    width : 75px !important;
  }

  .info-button {
    height: 18px;
  }

  .meetings-list {
    display: flex;
    margin-bottom: 2rem;
  }

  .swiper-meetings-list {
    width: 100%;
    margin-bottom: 1.5rem;
    display: block !important;
  }

  .swiper-meeting-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #b8c0cb;
    border-radius: 12px;
    padding: 4px;
    text-align: right;
  }

  .meeting-item {
    display: none; 
  }

  .meet-title {
    font-size: 16px;
  }

  .meet-capacity,
  .meet-type {
    font-size: 14px;
  }
}

/* Desktops (min-width: 1280px) */
@media (min-width: 1280px) {
  .meeting-filters {
    display: flex;
    align-items: center;
  }

  .search-section {
    display: flex;
    flex-direction: column;
    max-width: 85%;
    width: 100%;
    margin-left: 1.5rem;
  }

  .filter-section {
    max-width: 15%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }

  .filter-buttons {
    margin-top: 1rem;
  }

  .active-filter {
    padding: 7px 12px;
    margin-left: 1rem;
  }

  .disable-filter {
    padding: 7px 10px;
    margin-left: 1rem;
  }

  .discover-result {
    margin-left: 5rem;
  }

  .create-meet {
    padding: 12px 24px;
    font-size: 16px;
    width: max-content;
  }

  .meetings-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .meeting-item {
    padding: 4px;
  }


  .meet-title {
    font-size: 17px;
    width : 140px;
  }

  .meet-capacity,
  .meet-type {
    font-size: 15.5px;
  }

  .section-title {
    font-size: 21px;
  }

  .section-description p {
    font-size: 17.5px;
  }
}

</style>