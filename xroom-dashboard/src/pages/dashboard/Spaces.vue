<template>
    <div>
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
          :slidesPerView="1.7"
          :spaceBetween="20"
          :freeMode="true"
          :pagination="{ clickable: false }"
          :modules="modules"
          :breakpoints="{
            768: { slidesPerView: 3.3, spaceBetween: 15 },
            1024: { slidesPerView: 2.8, spaceBetween: 15 },
            1280: { slidesPerView: 4.1, spaceBetween: 25 },
          }"
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





   <!-- Create Space Modal -->
      <CreateSpaceModal
        :isVisible="isCreateSpaceModalVisible"
        @close="closeCreateSpaceModal"
        :spaces="spaces"
        @submit="handleCreateSpaceSubmit"
      />

</template>

<script>
import CreateSpaceModal from '@/components/CreateSpaceModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';
import axios from 'axios';

export default {
  name: 'DashboardPage',
  components: {
    CreateSpaceModal,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [FreeMode, Pagination],
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
      spaces: [],
      selectedSpace: null,
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
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get(
          'http://my.xroomapp.com:8000/get_spaces',
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        this.spaces = response.data.spaces.map(space => ({
          name: space.name,
          img: space.assetBundleRoomId.img,
          capacity: space.capacity,
          type: space.Private ? 'Private' : 'Public',
          sharing: space.Private ? 'private' : 'team',
          spaceType: 'spaces',
          description: space.description,
        }));
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    },
    handleCreateSpaceSubmit(space) {
      console.log('Form submitted with:', space);
      this.closeCreateSpaceModal();
    },
  },
  mounted() {
    this.fetchSpaces();
  },
};
</script>


<style scoped>
/* Base styles applied across all screen sizes */
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
  background-color: #3A57E8;
  color: #FFFFFF;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: max-content;
  margin: auto;
  font-weight: 500;
}

.mySwiper {
  margin: 2.5rem 0;
}

.card {
  height: auto;
  border: 1px solid #B8C0CB;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 4px;
}

.card img {
  width: 100%;
  height: 10rem;
  border-radius: 14px;
  border: none;
  object-fit: cover;
}

.card-texts {
  width: 100%;
  margin-top: 1rem;
  padding-right: 1rem;
  display: grid;
  gap: 1rem;
}

.card-texts h2 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: clip;
  width: 170px;
  font-weight: 600;
  color: #101010;
}

.space-capacity {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #718096;
}

.space-type {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #3A57E8;
  text-overflow: ellipsis;
  overflow-x: clip;
  white-space: nowrap;
  width: 170px;
}

.no-spaces-message {
  font-size: 18px;
  font-weight: 500;
  color: #101010;
  margin-top: 4rem;
  margin-bottom: 12rem;
  text-align: center;
}

/* Media Queries for responsive adjustments */
@media (max-width: 600px) {
  .card {
    max-width: 250px;
    height: 17.5rem;
  }

  .card-texts h2 {
    font-size: 16px;
  }

  .add-space {
    padding : 8px 18px ;
  }
}

@media (min-width: 600px) and (max-width: 1024px) {
  .card-texts h2 {
    font-size: 17px;
    font-weight: 500;
  }

  .card {
    height: 17.5rem;
  }

  .add-space {
    padding : 8px 18px ;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #101010;
    margin: 20px 0 10px;
  }

  .add-space {
    padding: 10px 20px;
    font-size: 15px;
  }

  .card-texts h2 {
    font-size: 18px;
  }

  .card {
    height: 17.5rem;
  }
}

@media (min-width: 1280px) {
  .section-title {
    font-size: 21px;
  }

  .section-description p {
    font-size: 17.5px;
  }

  .add-space {
    padding: 12px 24px;
    font-size: 16px;
  }

  .card {
    max-width: 250px;
    height: 20rem;
  }

  .card img {
    width: 100%;
    height: 12rem;
  }

  .card-texts h2 {
    font-size: 21px;
  }

  .space-capacity,
  .space-type {
    font-size: 16px;
  }
}

</style>