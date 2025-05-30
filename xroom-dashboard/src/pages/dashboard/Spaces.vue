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

      <!-- Add Space Button -->
      <button class="add-space" @click="openCreateSpaceModal">
        + <span style="margin-right: 0.5rem;">اضافه کردن فضای اختصاصی</span>
      </button>

     

      <!-- Spaces -->
      <div v-if="filteredSpaces.length > 0 " style="z-index: 0;">
        <swiper
          :slidesPerView="3.6"
          :spaceBetween="30"
          :pagination="{ clickable: false }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(space, index) in filteredSpaces" :key="index" class="card">
            <img :src="'http://my.xroomapp.com:8000' + space.img" alt="تصویر فضا" />
            <div class="card-texts">
              <h2>{{ space.name }}</h2>
              <p class="space-capacity">
                حداکثر: {{ space.capacity }} کاربر
              </p>
              <p class="space-type">
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





   <!-- Create Space Modal -->
      <CreateSpaceModal
        :isVisible="isCreateSpaceModalVisible"
        @close="closeCreateSpaceModal"
        :spaces="spaces"
        @submit="handleCreateSpaceSubmit"
      />

</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';
import AppHeader from '@/components/Header.vue';
import CreateSpaceModal from '@/components/CreateSpaceModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import axios from 'axios';

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
      spaces: [], // Initialize the spaces array
      selectedSpace: null, // Store the selected space
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
    async fetchSpaces() {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get(
          'http://my.xroomapp.com:8000/get_spaces', // API endpoint
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Store the spaces data in the spaces array
        this.spaces = response.data.spaces.map(space => ({
          name: space.name,
          img: space.assetBundleRoomId.img,  // Assuming 'img' exists in the API response
          capacity: space.capacity,
          type: space.Private ? 'Private' : 'Public', // Adjust if you have a different field
          sharing: space.Private ? 'private' : 'team',
          spaceType: 'spaces',
          description: space.description, // Store description from response
        }));
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    },
    handleCreateSpaceSubmit(space) {
      // Handle form submission here, space will contain the selected space and the additional fields
      console.log('Form submitted with:', space);
      this.closeCreateSpaceModal(); // Close the modal after submission
    },
  },
  mounted() {
    this.fetchSpaces(); // Fetch spaces when the component is mounted
  },
};
</script>

<style scoped>
/* Add your CSS styling here */
</style>

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
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
}

.section-description {
    margin-bottom: 3rem;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
  margin: 1rem 0 3rem;
}

.section-description p {
    line-height: 190%;
    color: #4F5A69;
    font-size: 16px;
    margin-top: 1rem;
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
  margin-bottom: 12rem;
  text-align: center;
}
</style>
