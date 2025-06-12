<template>
  <div style="padding-bottom: 2.5rem;">
    <!-- License Info -->
    <div class="card license-card">
      <span>لایسنس‌های قابل استفاده: {{ remainingCapacity }}</span>
      <div
        v-if="!hasActiveSubscription"
        class="buy-subscription"
        @click="goToBuySubscription"
      >
        <p>خرید اشتراک</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M12 19.5L5 12.5L12 5.5"
            stroke="#48BB78"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19 12.5H5"
            stroke="#48BB78"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- User List with Swiper -->
    <div class="user-cards">
      <swiper
        v-if="isMobile"
        :slidesPerView="1.2"
        :spaceBetween="15"
        :freeMode="true"
        :pagination="{ clickable: false }"
        :modules="modules"
        :breakpoints="{
          768: { slidesPerView: 2.3, spaceBetween: 15 },
          1024: { slidesPerView: 1.6, spaceBetween: 15 },
          1280: { slidesPerView: 1.1, spaceBetween: 25 },
        }"
        class="swiper-container"
      >
        <swiper-slide v-for="(user, index) in userList" :key="index">
          <div class="user-card">
            <div class="user-card-header">
              <div style="display: flex;align-items: center;gap: 8px;">
                <img :src="user.avatar" class="user-avatar" alt="avatar" />
                <div class="user-info-tags">
                  <div class="user-name">{{ user.name }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
              <div class="user-info-box">
                <div class="user-activity">
                  <div class="user-role">{{ user.role }}</div>
                  <div class="user-version">{{ user.version }}</div>
                </div>
              </div>
            </div>
            <div class="user-footer">
              <span>اکانت XRoom</span>
              <div class="user-actions">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.666 5.83325H9.16602"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.666 14.1667H4.16602"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.166 16.6667C15.5467 16.6667 16.666 15.5475 16.666 14.1667C16.666 12.786 15.5467 11.6667 14.166 11.6667C12.7853 11.6667 11.666 12.786 11.666 14.1667C11.666 15.5475 12.7853 16.6667 14.166 16.6667Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.83398 8.33325C7.2147 8.33325 8.33398 7.21396 8.33398 5.83325C8.33398 4.45254 7.2147 3.33325 5.83398 3.33325C4.45327 3.33325 3.33398 4.45254 3.33398 5.83325C3.33398 7.21396 4.45327 8.33325 5.83398 8.33325Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M2.5 5H17.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.8327 5V16.6667C15.8327 17.5 14.9993 18.3333 14.166 18.3333H5.83268C4.99935 18.3333 4.16602 17.5 4.16602 16.6667V5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66602 5.00008V3.33341C6.66602 2.50008 7.49935 1.66675 8.33268 1.66675H11.666C12.4993 1.66675 13.3327 2.50008 13.3327 3.33341V5.00008"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.33398 9.16675V14.1667"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.666 9.16675V14.1667"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      
      <div v-else class="user-cards-grid">
        <div v-for="(user, index) in userList" :key="index" class="user-card">
          <div class="user-card-header">
            <img :src="user.avatar" class="user-avatar" alt="avatar" />
            <div class="user-info-box">
              <div class="user-info-tags">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
              <div class="user-activity">
                <div class="user-role">{{ user.role }}</div>
                <div class="user-version">{{ user.version }}</div>
              </div>
            </div>
          </div>
          <div class="user-footer">
            <span>اکانت XRoom</span>
            <div class="user-actions">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.666 5.83325H9.16602"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.666 14.1667H4.16602"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.166 16.6667C15.5467 16.6667 16.666 15.5475 16.666 14.1667C16.666 12.786 15.5467 11.6667 14.166 11.6667C12.7853 11.6667 11.666 12.786 11.666 14.1667C11.666 15.5475 12.7853 16.6667 14.166 16.6667Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.83398 8.33325C7.2147 8.33325 8.33398 7.21396 8.33398 5.83325C8.33398 4.45254 7.2147 3.33325 5.83398 3.33325C4.45327 3.33325 3.33398 4.45254 3.33398 5.83325C3.33398 7.21396 4.45327 8.33325 5.83398 8.33325Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.5 5H17.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8327 5V16.6667C15.8327 17.5 14.9993 18.3333 14.166 18.3333H5.83268C4.99935 18.3333 4.16602 17.5 4.16602 16.6667V5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66602 5.00008V3.33341C6.66602 2.50008 7.49935 1.66675 8.33268 1.66675H11.666C12.4993 1.66675 13.3327 2.50008 13.3327 3.33341V5.00008"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33398 9.16675V14.1667"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.666 9.16675V14.1667"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Add User Card -->
          <div class="user-card add-card" @click="openAddUserModal">
            <span class="add-text">
              <span style="font-size: 23px; margin-left: 0.5rem;">+</span>
              اضافه کردن کاربر جدید
            </span>
          </div>
      </div>
      <!-- Add User Card -->
      <div class="user-card add-card swiper-add-user" @click="openAddUserModal">
        <span class="add-text">
          <span style="font-size: 23px; margin-left: 0.5rem;">+</span>
          اضافه کردن کاربر جدید
        </span>
      </div>
    </div>



    <!-- Add User Modal -->
    <AddUserModal
      :is-visible="isAddUserModalVisible"
      @close="closeAddUserModal"
      @add-user="submitNewUser"
    />
  </div>
</template>


<script>
import AddUserModal from '@/components/AddUserModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';

export default {
  name: 'TeamUser',
  components: { AddUserModal, Swiper, SwiperSlide },
  props: {
    userList: { type: Array, default: () => [] },
    teamMemberCapacity: { type: Number, default: 0 },
    subscriptionCount: { type: Number, default: 0 },
    hasActiveSubscription: { type: Boolean, default: false },
  },
  data() {
    return {
      modules: [FreeMode, Pagination],
      isAddUserModalVisible: false,
      isMobile: window.innerWidth <= 1024,
    };
  },
  computed: {
    remainingCapacity() {
      return this.subscriptionCount - this.teamMemberCapacity;
    },
  },
  methods: {
    openAddUserModal() {
      if (this.remainingCapacity <= 0) {
        this.$emit('change-tab', 'buy-subscription');
        alert('اشتراک فعالی ندارید , لطفا اشتراک تهیه نمایید.');
        return;
      }
      this.isAddUserModalVisible = true;
    },
    closeAddUserModal() {
      this.isAddUserModalVisible = false;
    },
    submitNewUser(user) {
      this.$emit('add-user', user);
      this.closeAddUserModal();
    },
    goToBuySubscription() {
      this.$emit('change-tab', 'buy-subscription');
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 1280;
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

};
</script>


<style scoped>
/* Base Styles */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-size: 16px;
  font-weight: 700;
  color: #101010;
}

.user-email {
  font-size: 14px;
  font-weight: 500;
  color: #4f5a69;
}

.user-info-tags,
.user-activity {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-activity {
  padding-left: 2rem;
}

.user-cards {
  margin-top: 2.5rem;
}

.user-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px 0 #00000029;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.user-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px;
}

.user-info-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  text-align: right;
  gap: 4px;
}

.user-role {
  color: #3a57e8;
  font-weight: 600;
  font-size: 17px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 110px;
  overflow-x: clip;
}

.buy-subscription {
  display: flex;
  align-items: center;
  color: #48bb78;
  font-weight: 500;
  cursor: pointer;
}

.buy-subscription span {
  margin-right: 0.5rem;
}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a57e8;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
}

.card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.add-text {
  text-align: center;
  cursor: pointer;
}

.license-card {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.license-card span {
  font-size: 17px;
}

.user-footer {
  background: #3a57e8;
  color: #fff;
  border-radius: 0 0 12px 12px;
  padding: 10px 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-footer span {
  font-size: 17px;
}

.user-actions button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.user-avatar {
  width: 70px;
  height: 7rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  align-self: flex-end;
  margin-top: 0;
}

/* Swiper Styles */
.swiper-container {
  width: 100%;
  padding-bottom: 20px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
}


.swiper-add-user {
  display : none;
}

/* Mobile Styles (max-width: 600px) */
@media (max-width: 600px) {

  .swiper-add-user {
    display : block;
  }

  .user-card {
    width: 100%;
    height: auto;
  }

  .add-card {
    width: 100%;
    height: 100px;
    display: flex;
  }

  .license-card {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  .user-info-box {
    flex-direction: column;
    align-items: flex-end;
  }

  .user-activity {
    padding-left: 0;
  }

  .user-avatar {
    margin-top: 0;
    width: 50px;
    height: 80px;
    object-fit: cover;
  }

  .user-name {
    font-size: 14px;
    font-size: 16px;
    font-weight: 700;
    color: #101010;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: clip;
    width: 90px;
  }

  .user-email {
    font-size: 12px;
  }

  .user-role {
    font-size: 15px;
  }

  .user-footer span {
    font-size: 14px;
    font-weight: 500;
  }

  .user-info-tags, .user-activity {
    gap: 1rem;
  }

  .user-actions svg {
    width: 18px !important; 
    height: 18px !important; 
  }

  .user-version , .user-role{ 
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow-x: clip;
    white-space: nowrap;
    width: 80px;
  }

  .license-card span {
    font-size: 14px;
  }

  .buy-subscription {
    font-size : 14px;
    gap : 6px;
  }

  .buy-subscription svg {
  
    height: 18px;
    width: 18px;

  }

  .add-text {
    font-size: 18px;
  }
}

/* Tablet Styles (min-width: 600px and max-width: 1024px) */
@media (min-width: 600px) and (max-width: 1025px) {

  .swiper-add-user {
    display : block;
  }

  .user-card {
    width: 100%;
    height: auto;
  }

  .add-card {
    width: 100%;
    height: 100px;
    display: flex;
  }

  .license-card {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  .user-info-box {
    flex-direction: column;
    align-items: flex-end;
  }

  .user-activity {
    padding-left: 0;
  }

  .user-avatar {
    margin-top: 0;
    width: 50px;
    height: 80px;
    object-fit: cover;
  }

  .user-name {
    font-size: 16px;
    font-weight: 700;
    color: #101010;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: clip;
    width: 90px;
  }

  .user-email {
    font-size: 13px;
  }

  .user-role {
    font-size: 15px;
  }

  .user-footer span {
    font-size: 14px;
    font-weight: 500;
  }

  .user-info-tags, .user-activity {
    gap: 1rem;
  }

  .user-actions svg {
    width: 18px !important; 
    height: 18px !important; 
  }

  .user-version , .user-role{ 
    font-size: 15px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow-x: clip;
    white-space: nowrap;
    width: 80px;
  }

  .license-card span {
    font-size: 15x;
  }

  .buy-subscription {
    font-size : 15px;
    gap : 6px;
  }

  .buy-subscription svg {
  
    height: 18px;
    width: 18px;

  }

  .add-text {
    font-size: 18px;
  }
}

/* LapTop Styles (min-width: 1025px and max-width: 1280px) */
@media (min-width: 1025px) and (max-width: 1280px) {

  .swiper-add-user {
    display : block;
  }

  .user-card {
    width: 100%;
    height: auto;
  }

  .add-card {
    width: 100%;
    height: 100px;
    display: flex;
  }

  .license-card {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  .user-info-box {
    flex-direction: column;
    align-items: flex-end;
  }

  .user-activity {
    padding-left: 0;
  }

  .user-avatar {
    margin-top: 0;
    width: 50px;
    height: 80px;
    object-fit: cover;
  }

  .user-name {
    font-size: 14px;
    font-size: 16px;
    font-weight: 700;
    color: #101010;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: clip;
    width: 90px;
  }

  .user-email {
    font-size: 12px;
  }

  .user-role {
    font-size: 15px;
  }

  .user-footer span {
    font-size: 14px;
    font-weight: 500;
  }

  .user-info-tags, .user-activity {
    gap: 1rem;
  }

  .user-actions svg {
    width: 18px !important; 
    height: 18px !important; 
  }

  .user-version , .user-role{ 
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow-x: clip;
    white-space: nowrap;
    width: 80px;
  }

  .license-card span {
    font-size: 14px;
  }

  .buy-subscription {
    font-size : 14px;
    gap : 6px;
  }

  .buy-subscription svg {
  
    height: 18px;
    width: 18px;

  }

  .add-text {
    font-size: 18px;
  }
}


/* Desktop Styles (min-width: 1280px) */
@media (min-width: 1280px) {
  .user-cards-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
  }

  .user-card {
    width: 48%;
    height: auto;
  }

  .add-card {
    width: 48%;
    height: auto;
  }
}

</style>