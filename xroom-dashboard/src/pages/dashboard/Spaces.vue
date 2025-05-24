<template>
  <SidebarMenu />

  <div class="dashboard-page">
    <div class="content">
      <!-- Top Header -->
      <AppHeader pageTitle="فضاها" />

      <!-- Description -->
      <div class="section-description">
        <div class="section-title">مدیریت فضای مجازی</div>
        <p class="title-description">
          با همکاران خود در یک فضای مجازی ملاقات کنید. در این صفحه می‌توانید فضای اطراف خود را مشاهده و مدیریت کنید.
        </p>
      </div>

      <!-- Page Objects -->
      <div>
        <!-- Sharing Filter -->
        <div class="filter-section">
          <div class="sharing-filters">
            <span style="font-size: 17px; font-weight: 600;">فیلتر اشتراک‌گذاری</span>
            <div class="filter-buttons">
              <button
                v-for="filter in sharingFilters"
                :key="filter.value"
                :class="activeSharingFilter === filter.value ? 'active-filter' : 'disable-filter'"
                @click="setActiveSharingFilter(filter.value)"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
          <div class="space-type-filter">
            <span style="font-size: 17px; font-weight: 600;">فیلتر نوع فضا</span>
            <div class="filter-buttons">
              <button
                v-for="filter in spaceTypeFilters"
                :key="filter.value"
                :class="activeSpaceTypeFilter === filter.value ? 'active-filter' : 'disable-filter'"
                @click="setActiveSpaceTypeFilter(filter.value)"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Add Space Button -->
        <button class="add-space" @click="openCreateSpaceModal">
          + <span style="margin-right: 0.5rem;">اضافه کردن فضای اختصاصی</span>
        </button>

        <!-- Create Space Modal -->
        <CreateSpaceModal
          :isVisible="isCreateSpaceModalVisible"
          @close="closeCreateSpaceModal"
        />

        <!-- Spaces -->
        <div v-if="filteredSpaces.length > 0">
          <swiper
            :slidesPerView="3.6"
            :spaceBetween="30"
            :pagination="{ clickable: false }"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(space, index) in filteredSpaces" :key="index" class="card">
              <img :src="space.image" alt="تصویر فضا" />
              <div class="card-texts">
                <h2>{{ space.name }}</h2>
                <p class="space-capacity">
                    <span style="margin-left: 4px;">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                    >
                        <g clip-path="url(#clip0_622_1334)">
                        <path
                            d="M3.33203 5.16667C3.33203 5.87391 3.61298 6.55219 4.11308 7.05228C4.61318 7.55238 5.29145 7.83333 5.9987 7.83333C6.70594 7.83333 7.38422 7.55238 7.88432 7.05228C8.38441 6.55219 8.66536 5.87391 8.66536 5.16667C8.66536 4.45942 8.38441 3.78115 7.88432 3.28105C7.38422 2.78095 6.70594 2.5 5.9987 2.5C5.29145 2.5 4.61318 2.78095 4.11308 3.28105C3.61298 3.78115 3.33203 4.45942 3.33203 5.16667Z"
                            stroke="#718096"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M2 14.5V13.1667C2 12.4594 2.28095 11.7811 2.78105 11.281C3.28115 10.781 3.95942 10.5 4.66667 10.5H7.33333C8.04058 10.5 8.71885 10.781 9.21895 11.281C9.71905 11.7811 10 12.4594 10 13.1667V14.5"
                            stroke="#718096"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M10.668 2.58667C11.2416 2.73354 11.75 3.06714 12.1131 3.53488C12.4761 4.00262 12.6732 5.17 12.6732 5.17C12.6732 5.76212 12.4761 6.33739 12.1131 6.80513C11.75 7.27287 11.2416 7.60647 10.668 7.75334"
                            stroke="#718096"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M14 14.5V13.1666C13.9966 12.5781 13.7986 12.0072 13.4368 11.5429C13.0751 11.0786 12.5699 10.7471 12 10.6"
                            stroke="#718096"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        </g>
                        <defs>
                        <clipPath id="clip0_622_1334">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                        </defs>
                    </svg>
                    </span>
                    حداکثر: {{ space.capacity }} کاربر
                </p>
                <p class="space-type">
                    <span style="margin-left: 4px;">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                        >
                            <path
                            d="M4 15.1667V3.16671C4 2.81309 4.14048 2.47395 4.39052 2.2239C4.64057 1.97385 4.97971 1.83337 5.33333 1.83337H10.6667C11.0203 1.83337 11.3594 1.97385 11.6095 2.2239C11.8595 2.47395 12 2.81309 12 3.16671V15.1667H4Z"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M3.9987 8.5H2.66536C2.31174 8.5 1.9726 8.64048 1.72256 8.89052C1.47251 9.14057 1.33203 9.47971 1.33203 9.83333V13.8333C1.33203 14.187 1.47251 14.5261 1.72256 14.7761C1.9726 15.0262 2.31174 15.1667 2.66536 15.1667H3.9987"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M12 6.5H13.3333C13.687 6.5 14.0261 6.64048 14.2761 6.89052C14.5262 7.14057 14.6667 7.47971 14.6667 7.83333V13.8333C14.6667 14.187 14.5262 14.5261 14.2761 14.7761C14.0261 15.0262 13.687 15.1667 13.3333 15.1667H12"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M6.66797 4.5H9.33464"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M6.66797 7.16663H9.33464"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M6.66797 9.83337H9.33464"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                            <path
                            d="M6.66797 12.5H9.33464"
                            stroke="#3A57E8"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                    {{ space.type }}
                </p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div v-else class="no-spaces-message">
          <p>هیچ فضایی با فیلترهای انتخاب‌شده یافت نشد.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';
import AppHeader from '@/components/Header.vue';
import CreateSpaceModal from '@/components/CreateSpaceModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

export default {
  name: 'DashboardPage',
  components: {
    SidebarMenu,
    AppHeader,
    CreateSpaceModal,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination],
      isCreateSpaceModalVisible: false,
      sharingFilters: [
        { label: 'همه', value: 'all' },
        { label: 'تیم', value: 'team' },
        { label: 'حریم خصوصی', value: 'private' },
      ],
      spaceTypeFilters: [
        { label: 'فضاها', value: 'spaces' },
        { label: 'قالب‌ها', value: 'templates' },
        { label: 'همه', value: 'all' },
      ],
      activeSharingFilter: 'all',
      activeSpaceTypeFilter: 'spaces',
      spaces: [
        {
          name: 'فضای تیمی ۱',
          image: require('@/assets/img/img.jpg'),
          capacity: 33,
          type: 'فضا تیم',
          sharing: 'team',
          spaceType: 'spaces',
        },
        {
          name: 'فضای تیمی ۲',
          image: require('@/assets/img/img2.jpg'),
          capacity: 33,
          type: 'فضا تیم',
          sharing: 'team',
          spaceType: 'spaces',
        },
        {
          name: 'فضای خصوصی ۱',
          image: require('@/assets/img/img3.jpg'),
          capacity: 33,
          type: 'فضا خصوصی',
          sharing: 'private',
          spaceType: 'spaces',
        },
        {
          name: 'قالب ۱',
          image: require('@/assets/img/img4.jpg'),
          capacity: 33,
          type: 'قالب',
          sharing: 'team',
          spaceType: 'templates',
        },
        {
          name: 'فضای تیمی ۳',
          image: require('@/assets/img/img.jpg'),
          capacity: 33,
          type: 'فضا تیم',
          sharing: 'team',
          spaceType: 'spaces',
        },
      ],
    };
  },
  computed: {
    filteredSpaces() {
      return this.spaces.filter((space) => {
        const matchesSharing =
          this.activeSharingFilter === 'all' || space.sharing === this.activeSharingFilter;
        const matchesSpaceType =
          this.activeSpaceTypeFilter === 'all' || space.spaceType === this.activeSpaceTypeFilter;
        return matchesSharing && matchesSpaceType;
      });
    },
  },
  methods: {
    setActiveSharingFilter(value) {
      this.activeSharingFilter = value;
    },
    setActiveSpaceTypeFilter(value) {
      this.activeSpaceTypeFilter = value;
    },
    openCreateSpaceModal() {
      this.isCreateSpaceModalVisible = true;
    },
    closeCreateSpaceModal() {
      this.isCreateSpaceModalVisible = false;
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
}

.filter-section {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
    padding: 24px 16px;
    border-radius: 10px;
    background-color: #FFFFFF;
}

.sharing-filters {
    max-width: 79%;
    width: 100%;
    margin-left: 1.5rem;
}

.space-type-filter {
    max-width: 21%;
    width: 100%;
}

.active-filter {
    background-color: #3A57E8;
    color: #FFFFFF;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    padding: 7px 12px;
    cursor: pointer;
    margin-left: 1rem;
}

.disable-filter {
    color: #3A57E8;
    background-color: #FFFFFF;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    padding: 7px 10px;
    cursor: pointer;
    margin-left: 1rem;
}
    
.filter-buttons {
    margin-top: 1rem;
}


.add-space {
    display: block;
    padding: 12px 24px 12px 24px;
    background-color: #3A57E8;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    width: max-content;
    margin: auto;
}

.mySwiper {
    margin-top: 2.5rem;
}

.card {
    max-width: 250px !important;
    width: 100% !important;
    height: 335px;
    border: 1px solid #B8C0CB;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.card img {
    max-width: 235px;
    width: 100%;
    max-height: 205px;
    height: 100%;
    border-radius: 14px;
    border: none;
    margin-top: 0.4rem;
}

.card-texts {
    width: 100%;
    margin-top: 1rem;
    padding-right: 1rem;
    display: grid;
    gap: 1rem;
}

.space-name {
    font-size: 17px;
    font-weight: 600;
    color: #444D5A;
}

.space-capacity {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: #718096;
}

.space-type {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: #3A57E8;
}

.no-spaces-message {
    font-size: 18px;
    font-weight: 500;
    color: #101010;
    margin-top: 4rem;
    text-align: center;
}


</style>