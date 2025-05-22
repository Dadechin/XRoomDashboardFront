<template>
  <SidebarMenu />

  <div class="dashboard-page">
    <div class="content">
      <!-- Top Header -->
      <AppHeader pageTitle="جلسات" />

      <!-- Description -->
      <div class="section-description">
        <div class="section-title">مدیریت جلسات</div>
        <p class="title-description">
          با استفاده از جلسات، می‌توانید همکاران و کاربران خارجی XRoom را به تیم و اتاق‌های خصوصی خود دعوت کنید. شرکت‌کنندگان جلسه شما می‌توانند با استفاده از کد جلسه ایجاد شده در زمان‌های معین به جلسه بپیوندند.
        </p>
      </div>

      <!-- Meeting Section -->
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
                :class="{ 'active-filter': activeFilter === 'future', 'disable-filter': activeFilter !== 'future' }"
                @click="setFilter('future')"
              >
                آینده
              </button>
              <button
                :class="{ 'active-filter': activeFilter === 'all', 'disable-filter': activeFilter !== 'all' }"
                @click="setFilter('all')"
              >
                همه
              </button>
            </div>
          </div>
        </div>

        <!-- Meet Discover -->
        <div :class="filteredMeetings.length === 0 ? 'meet-discover' : 'meetings-container'">
          <span class="discover-result" v-if="filteredMeetings.length === 0">
            هیچ جلسه‌ای یافت نشد. با کلیک کردن، یک جلسه جدید ایجاد کنید
          </span>
          <div v-else class="meetings-list">
            <div v-for="meeting in filteredMeetings" :key="meeting.id" class="meeting-item">
              <img :src="meeting.image" alt="Meeting Image" class="meeting-image" width="120px" height="120px" />
              <div class="meeting-details" style="margin-right: 10px;">
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
              </div>
            </div>
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

      <!-- Create Meeting Modal -->
      <CreateMeetingModal
        :is-open="showModal"
        @create-meeting="createNewMeeting"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';
import AppHeader from '@/components/Header.vue';
import CreateMeetingModal from '@/components/CreateMeetingModal.vue';

export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    AppHeader,
    CreateMeetingModal,
  },
  data() {
    return {
      searchQuery: '',
      activeFilter: 'future',
      showModal: false,
      meetings: [
        {
          id: 1,
          title: 'Interview room',
          date: '2025-05-25T10:00:00',
          image: require('@/assets/img/img.png'),
          type: 'فضا تیم',
          maxCapacity: 33,
        },
        {
          id: 2,
          title: 'جلسه بررسی پیشرفت',
          date: '2025-05-18T14:00:00',
          image: require('@/assets/img/img.png'),
          type: 'مدیریتی',
          maxCapacity: 8,
        },
        {
          id: 3,
          title: 'جلسه تیم فنی',
          date: '2025-06-01T09:00:00',
          image: require('@/assets/img/img.png'),
          type: 'فنی',
          maxCapacity: 12,
        },
      ],
      filteredMeetings: [],
    };
  },
  created() {
    this.filterMeetings();
  },
  methods: {
    filterMeetings() {
      let filtered = this.meetings;
      if (this.searchQuery) {
        filtered = filtered.filter(
          (meeting) =>
            meeting.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            meeting.type.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.activeFilter === 'future') {
        const now = new Date();
        filtered = filtered.filter((meeting) => new Date(meeting.date) > now);
      }
      this.filteredMeetings = filtered;
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterMeetings();
    },
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
      this.filterMeetings();
      this.showModal = false;
    },
  },
};
</script>
<style scoped>
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


    .section-title {
        font-size: 17px;
        font-weight: 600;
    }

    .title-description {
        font-size: 15px;
        font-weight: 500;
        margin-top: 1.5rem;
        color: #4F5A69;
        line-height: 190%;
        max-width: 80%;
    }

    .meeting-section {
        margin-top: 1rem;
        border-radius: 10px;
    }

    .meeting-filters {
        display: flex;
        align-items: center;
        margin-bottom: 2.5rem;
        padding: 24px 16px;
        border-radius: 10px;
        background-color: #FFFFFF;
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

    .search-wrapper {
        margin-top: 1rem;
        padding: 1.2px;
        border-radius: 10px;
        background: linear-gradient(to right, #001940, #4364F7);
        position: relative;
    }

    .search-input {
        width: 99.9%;
        height: 43px;
        padding: 10px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        box-sizing: border-box;
        background-color: white;
        display: block;
        margin: 0 auto;
    }

    .search-input::placeholder {
        color: #7F8DA1;
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

    .filter-buttons {
        margin-top: 1rem;
    }

    .active-filter {
        background-color: #3A57E8;
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 500;
        height: 38px;
        width: 51px;
        border-radius: 8px;
        border: none;
        padding: 7px 10px;
        cursor: pointer;
        margin-left: 1rem;
    }

    .disable-filter {
        color: #3A57E8;
        background-color: #FFFFFF;
        font-size: 15px;
        font-weight: 500;
        height: 38px;
        width: 51px;
        border-radius: 8px;
        border: none;
        padding: 7px 10px;
        cursor: pointer;
        margin-left: 1rem;
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
        margin-left: 5rem;
    }

    .create-meet {
    width: 191px;
    height: 46px;
    padding: 12px 24px 12px 24px;
    background-color: #3A57E8;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    }

    .meetings-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .meeting-item {
        width: 100%;
        display: flex;
        align-items: center;
        border: 1px solid #B8C0CB;
        border-radius: 12px;
        padding: 8px;
        text-align: right;
    }

    .meet-title {
        font-size: 16px;
        font-weight: 500;
        color: #101010;
    }

    .meet-capacity {
        font-size: 14px;
        font-weight: 500;
        color: #718096;
        margin: 1.2rem 0;
        display: flex;
        align-items: center;
    }

    .meet-type {
        font-size: 14px;
        font-weight: 500;
        color: #3A57E8;
        display: flex;
        align-items: center;
    }



</style>