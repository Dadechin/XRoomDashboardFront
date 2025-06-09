<template>
  <div v-if="isOpen" class="modal-overlay" @click="cancel">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>اتاق این جلسه را انتخاب کنید</h2>
        <button @click="cancel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 32 32"
            fill="none"
          >
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="#101010" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E2DEE9" />
            <path
              d="M21 11L11 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 11L21 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="popUp-title">
        <h2>فضاها</h2>
        <span>یک اتاق برای این جلسه انتخاب کنید</span>
      </div>
      <div class="rooms-list" v-if="rooms.length">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="room-item"
          :class="{ selected: selectedRoom == room.id }"
          @click="selectRoom(room.id)"
        >
          <img
            :src="room.image"
            alt="Room Image"
            class="room-image"
            width="120"
            height="120"
            @error="room.image = 'https://via.placeholder.com/150'"
          />
          <div class="room-details" style="margin-right: 10px;">
            <h3 class="room-title">{{ room.name }}</h3>
            <p class="room-capacity">
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
              حداکثر: {{ room.capacity }} کاربر
            </p>
            <p class="room-type">
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
              {{ room.type }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <span>هیچ فضایی یافت نشد.</span>
      </div>
      <div v-if="temporaryRooms.length">
        <div class="popUp-title">
          <h2>اتاق‌های موقت</h2>
          <span>اتاق‌های موقت ایجادشده برای این جلسه</span>
        </div>
        <div class="rooms-list">
          <div
            v-for="room in temporaryRooms"
            :key="room.id"
            class="room-item"
            :class="{ selected: selectedRoom === room.id }"
            @click="selectRoom(room.id)"
          >
            <img
              :src="room.image"
              alt="Room Image"
              class="room-image"
              width="120"
              height="120"
              @error="room.image = 'https://via.placeholder.com/150'"
            />
            <div class="room-details" style="margin-right: 10px;">
              <h3 class="room-title">{{ room.name }}</h3>
              <p class="room-capacity">
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
                حداکثر: {{ room.capacity }} کاربر
              </p>
              <p class="room-type">
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
                {{ room.type }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <span>هیچ اتاق موقتی یافت نشد.</span>
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" @click="cancel">لغو</button>
        <button type="button" class="submit-button" @click="submitRoom" :disabled="!selectedRoom">تأیید</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_BASE_URL = 'http://my.xroomapp.com:8000';
const DEFAULT_IMAGE = 'https://via.placeholder.com/150';

export default {
  name: 'RoomSelectionModal',
  props: {
    isOpen: { type: Boolean, default: false },
    selectedRoomId: { type: [Number, String, null], default: null },
  },
  data() {
    return {
      rooms: [],
      temporaryRooms: [],
      selectedRoom: null,
      error: null,
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.selectedRoom = this.selectedRoomId;
      }
    },
    selectedRoomId(newVal) {
      this.selectedRoom = newVal;
    },
  },
  created() {
    this.fetchSpaces();
    this.fetchTemporaryRooms();
  },
  methods: {
    async fetchSpaces() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error();

        const response = await axios.get(`${API_BASE_URL}/get_space`, {
          headers: { Authorization: `Token ${token.trim()}` },
        });

        this.rooms = response.data.spaces.map((space) => ({
          id: space.id,
          assetBundleRoomId: space.assetBundleRoomId?.id,
          image: space.assetBundleRoomId?.img
            ? `${API_BASE_URL}${space.assetBundleRoomId.img}`
            : DEFAULT_IMAGE,
          name: space.name,
          capacity: space.capacity,
          type: space.description || 'فضا',
          isTemporary: false,
        }));

        this.selectedRoom = this.selectedRoomId;
      } catch (error) {
        if (error.response?.status === 403) {
          window.location.href = '/login';
        }
        this.error = 'خطا در بارگذاری لیست اتاق‌ها';
      }
    },
    async fetchTemporaryRooms() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error();

        const response = await axios.get(`${API_BASE_URL}/get_assigned_assetbundle_rooms`, {
          headers: { Authorization: `Token ${token.trim()}` },
        });

        this.temporaryRooms = response.data.assetbundle_rooms.map((room) => ({
          id: room.id,
          image: room.img ? `${API_BASE_URL}${room.img}` : DEFAULT_IMAGE,
          name: room.name,
          capacity: room.maxPerson,
          type: room.description || 'اتاق موقت',
          isTemporary: true,
        }));

        this.selectedRoom = this.selectedRoomId;
      } catch (error) {
        if (error.response?.status === 403) {
          window.location.href = '/login';
        }
        this.error = 'خطا در بارگذاری لیست اتاق‌های موقت';
      }
    },
    selectRoom(roomId) {
      this.selectedRoom = this.selectedRoom === roomId ? null : roomId;
    },
    cancel() {
      this.$emit('close');
      this.selectedRoom = this.selectedRoomId;
    },
    submitRoom() {
      if (!this.selectedRoom) {
        this.error = 'لطفاً یک اتاق انتخاب کنید';
        return;
      }
      const selectedRoomDetails = [...this.rooms, ...this.temporaryRooms].find(
        (room) => room.id == this.selectedRoom
      );
      if (!selectedRoomDetails) {
        this.error = 'اتاق انتخاب‌شده یافت نشد';
        return;
      }

      let roomData;
      if (selectedRoomDetails.isTemporary) {
        roomData = {
          ...selectedRoomDetails,
          space: 18,
          asset_bundle: selectedRoomDetails.id,
          use_space: false,
          image: selectedRoomDetails.image || 'https://via.placeholder.com/150',
        };
      } else {
        if (!selectedRoomDetails.assetBundleRoomId) {
          this.error = 'اتاق انتخاب‌شده اطلاعات معتبری ندارد';
          return;
        }
        roomData = {
          ...selectedRoomDetails,
          space: selectedRoomDetails.id,
          asset_bundle: selectedRoomDetails.assetBundleRoomId,
          use_space: true,
          image: selectedRoomDetails.image || 'https://via.placeholder.com/150',
        };
      }

      this.$emit('submit-room', roomData);
      this.selectedRoom = this.selectedRoomId;
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #F7F5FA;
  border-radius: 8px;
  width: 100%;
  max-width: 750px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  direction: rtl;
  border-radius: 20px;
  padding-bottom: 2rem;
  height: 95vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.modal-content::-webkit-scrollbar {
  display: none;
}

.popUp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #101010;
  color: #fff;
  width: 100%;
  padding: 20px 26px;
  margin-bottom: 1.5rem;
  border-radius: 20px 20px 0px 0px;
}

.popUp-header h2 {
  font-size: 22px;
}

.popUp-header button {
  background-color: #101010;
  border: none;
  cursor: pointer;
}

.room-item {
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #B8C0CB;
  border-radius: 12px;
  padding: 8px;
  text-align: right;
  cursor: pointer;
}

.temporary-room-form {
  margin-top: 1rem;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  margin: 1rem auto 2rem auto;

}

.rooms-list {
  margin-top: 1rem;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 1rem auto 2rem auto;
}

.temporary-rooms-list {
  margin-top: 1rem;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 1rem auto 2rem auto;
}

.room-item.selected {
  border: 1px solid #101010;
}

.popUp-title {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  padding-right: 50px;
}

.popUp-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101010;
}

.popUp-title span {
  font-size: 16px;
  font-weight: 500;
  color: #4F5A69;
  margin-top: 1rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  width: 50%;
  font-size: 16px;
}

.form-group input {
  height: 45px;
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 25rem;
}

.form-group input:focus {
  outline: none;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0;
  width: 100%;
  max-width: 620px;
  margin: auto;
}

.submit-button,
.cancel-button {
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 47%;
}

.submit-button {
  background-color: #3A57E8;
  color: white;
  font-weight: 500;
  font-size: 18px;
}

.cancel-button {
  background-color: #EBEEFD;
  color: #101010;
  font-weight: 500;
  font-size: 18px;
}

.room-title {
  font-size: 16px;
  font-weight: 500;
  color: #101010;
}

.form-group {
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group label {
  display: block;
  font-weight: 500;
  width: 50%;
  font-size: 16px;
}

.form-group input {
  height: 45px;
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 25rem
}

.room-capacity {
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  margin: 1.2rem 0;
  display: flex;
  align-items: center;
}

.room-type {
  font-size: 14px;
  font-weight: 500;
  color: #3A57E8;
  display: flex;
  align-items: center;
}

.create-room {
    width: 120px;
    height: 45px;
    padding: 12px 24px 12px 24px;
    background-color: #3A57E8;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    display: block;
    margin-right: auto;
}

.room-image {
  border-radius: 10px;
  object-fit :cover;
}

</style>