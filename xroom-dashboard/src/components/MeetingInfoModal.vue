<template>
  <!-- The template remains unchanged -->
  <div v-if="isOpen && !isRoomSelectionOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" ref="modalContent" @click.stop>
      <div class="popUp-header">
        <h2>{{ isEditing ? 'ویرایش جلسه' : 'جزئیات جلسه' }}</h2>
        <button @click="closeModalByButton">
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
        <h2>جزئیات جلسه</h2>
        <span>{{ isEditing ? 'جزئیات جلسه را ویرایش کنید.' : 'جزئیات جلسه را مشاهده کنید.' }}</span>
      </div>
      <div class="popUp-objects">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="meetingTitle">نام جلسه</label>
            <input
              type="text"
              id="meetingTitle"
              v-model="form.title"
              :disabled="!isEditing"
              required
            />
          </div>
          <div class="form-group">
            <label for="meet-description">شرح جلسه</label>
            <textarea
              name="meet-description"
              id="meet-description"
              v-model="form.description"
              :disabled="!isEditing"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="meetingDate">روز</label>
            <div class="input-group">
              <span class="calendar-icon" style="position: absolute; z-index: 99; top: 10px; left: 65%;">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_312_7390)">
                    <path
                      d="M14.1147 4.54126C14.4671 4.18888 14.6652 3.71091 14.6652 3.2125C14.6653 2.71409 14.4674 2.23607 14.115 1.8836C13.7626 1.53112 13.2846 1.33307 12.7862 1.33301C12.2878 1.33295 11.8098 1.53088 11.4573 1.88326L2.55999 10.7826C2.4052 10.9369 2.29073 11.127 2.22665 11.3359L1.34599 14.2373C1.32876 14.2949 1.32746 14.3562 1.34222 14.4145C1.35699 14.4728 1.38727 14.5261 1.42985 14.5686C1.47244 14.6111 1.52573 14.6413 1.58409 14.656C1.64245 14.6707 1.70369 14.6693 1.76132 14.6519L4.66332 13.7719C4.8721 13.7084 5.0621 13.5947 5.21665 13.4406L14.1147 4.54126Z"
                      stroke="#3A57E8"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 3.33337L12.6667 6.00004"
                      stroke="#3A57E8"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_312_7390">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <VuePersianDatetimePicker
                v-model="form.date"
                type="date"
                format="jYYYY/jMM/jDD"
                locale="fa"
                :auto-submit="true"
                input-class="form-control"
                id="meetingDate"
                style="border-radius: 0 8px 8px 0; text-align: center; position: relative;"
                :disabled="!isEditing"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="meetingTime">ساعت</label>
            <div class="input-group">
              <div class="time-input-group">
                <div class="child-time-input-group">
                  <p>شروع</p>
                  <div class="input-div">
                    <button type="button" @click="incrementTime('startMinute')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15 12.5L10 7.5L5 12.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      v-model.number="form.startMinute"
                      min="0"
                      max="59"
                      :disabled="!isEditing"
                      required
                    />
                    <button type="button" @click="decrementTime('startMinute')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <span>:</span>
                  <div class="input-div">
                    <button type="button" @click="incrementTime('startHour')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15 12.5L10 7.5L5 12.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      v-model.number="form.startHour"
                      min="0"
                      max="23"
                      :disabled="!isEditing"
                      required
                    />
                    <button type="button" @click="decrementTime('startHour')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="child-time-input-group">
                  <p>پایان</p>
                  <div class="input-div">
                    <button type="button" @click="incrementTime('endMinute')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15 12.5L10 7.5L5 12.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      v-model.number="form.endMinute"
                      min="0"
                      max="59"
                      :disabled="!isEditing"
                      required
                    />
                    <button type="button" @click="decrementTime('endMinute')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <span>:</span>
                  <div class="input-div">
                    <button type="button" @click="incrementTime('endHour')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15 12.5L10 7.5L5 12.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      v-model.number="form.endHour"
                      min="0"
                      max="23"
                      :disabled="!isEditing"
                      required
                    />
                    <button type="button" @click="decrementTime('endHour')" :disabled="!isEditing">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#3A57E8"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label style="font-size: 19px; font-weight: 600;">اتاق جلسه</label>
            <div class="rooms-selecter">
              <span>{{ form.selectedRoom ? '1 اتاق انتخاب شده' : '0 اتاق انتخاب شده' }}</span>
              <button type="button" @click="openRoomSelection" :disabled="!isEditing">
                انتخاب اتاق جلسه
              </button>
            </div>
          </div>
          <div class="participants-objects">
            <h2>شرکت‌کنندگان</h2>
            <p>
              <span style="color: #101010; font-weight: 600;">کاربران</span> یا
              <span style="color: #101010; font-weight: 600;">مهمانان تیم</span> دعوت‌شده به جلسه.
            </p>
          </div>
          <div class="presenter">
            <div style="display: flex; align-items: center; height: 100%;">
              <div class="avatar-wrapper">
                <img class="user-avatar" :src="profileIcon" />
              </div>
              <div class="user-info">
                <p class="user-name">{{ fullName }}</p>
                <span>{{ userPhone }}</span>
              </div>
            </div>
            <p class="presenter-role">{{ userRole }}</p>
          </div>
          <div class="presenter" v-for="participant in participants" :key="participant.id">
            <div style="display: flex; align-items: center; height: 100%;">
              <div class="avatar-wrapper">
                <img class="user-avatar" :src="participant.profile_img || defaultProfileIcon" />
              </div>
              <div class="user-info">
                <p class="user-name">{{ participant.name || 'کاربر مهمان' }}</p>
                <span>{{ participant.phone }}</span>
              </div>
            </div>
            <p class="presenter-role">{{ participant.role }}</p>
            <button v-if="isEditing" @click="removeParticipant(participant.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E2DEE9" />
                <path
                  d="M20.5 12L12.5 20"
                  stroke="#101010"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.5 12L20.5 20"
                  stroke="#101010"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div v-if="isEditing" class="form-group">
            <label for="participantInput">اضافه کردن شرکت‌کننده</label>
            <div class="participant-input">
              <div class="custom-input" @click="toggleDropdown" ref="customInput">
                <span v-if="!selectedParticipantId">یک عضو تیم انتخاب کنید</span>
                <span v-else>{{ getParticipantName(selectedParticipantId) }}</span>
                <svg
                  class="dropdown-icon"
                  :class="{ active: isDropdownOpen }"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#3A57E8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div v-if="isDropdownOpen" class="dropdown-menu" ref="dropdownMenu">
                <div
                  v-for="member in teamMembers"
                  :key="member.user.id"
                  class="dropdown-item"
                  @click="selectParticipant(member.user.id)"
                >
                  <div class="avatar-wrapper">
                    <img
                      :src="member.profile_img || defaultProfileIcon"
                      class="user-avatar"
                      alt="Profile"
                    />
                  </div>
                  <div class="user-info">
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      <p class="user-name">{{ member.user.first_name }} {{ member.user.last_name }}</p>
                      <span>{{ member.mobile_number }}</span>
                    </div>
                    <span class="user-role">{{ member.semat || 'بدون سمت' }}</span>
                  </div>
                </div>
                <div v-if="!teamMembers.length" class="dropdown-item no-members">
                  هیچ عضوی یافت نشد
                </div>
              </div>
            </div>
          </div>
        </form>
        <span class="last-span">
          شرکت‌کنندگان دعوت‌شده به این جلسه. برای شرکت‌کنندگانی که اضافه شده‌اند، پیامکی حاوی کد
          جلسه، عنوان، توضیحات و زمان ارسال می‌شود.
        </span>
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" @click="closeModalByButton">بستن</button>
        <button
          v-if="!isEditing"
          type="button"
          class="submit-button"
          @click="isEditing = true"
        >
          ویرایش
        </button>
        <button
          v-if="isEditing"
          type="button"
          class="submit-button"
          @click="handleSubmit"
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  </div>
  <RoomSelectionModal
    :is-open="isRoomSelectionOpen"
    :selected-room-id="form.selectedRoom ? form.selectedRoom.id : null"
    @close="isRoomSelectionOpen = false"
    @submit-room="handleRoomSelection"
  />
</template>

<script>
import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
import moment from 'moment-jalaali';
import RoomSelectionModal from './RoomSelectionModal.vue';
import axios from 'axios';

const API_BASE_URL = 'http://my.xroomapp.com:8000';

export default {
  name: 'MeetingInfoModal',
  components: { VuePersianDatetimePicker, RoomSelectionModal },
  props: {
    isOpen: { type: Boolean, default: false },
    meeting: { type: Object, default: null },
  },
  data() {
    return {
      defaultProfileIcon: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
      isEditing: false,
      form: {
        title: '',
        description: '',
        date: '',
        startHour: 12,
        startMinute: 0,
        endHour: 13,
        endMinute: 0,
        selectedRoom: null,
        space: null,
        asset_bundle: null,
        use_space: false,
      },
      participants: [],
      teamMembers: [],
      selectedParticipantId: '',
      isDropdownOpen: false,
      isRoomSelectionOpen: false,
      error: null,
    };
  },
  computed: {
    customer() {
      return JSON.parse(localStorage.getItem('customer') || '{}');
    },
    fullName() {
      return this.customer.first_name && this.customer.last_name
        ? `${this.customer.first_name} ${this.customer.last_name}`
        : 'کاربر مهمان';
    },
    userPhone() {
      return this.customer.mobile_number || 'شماره تلفن موجود نیست';
    },
    userRole() {
      return this.customer.semat || 'مجری';
    },
    profileIcon() {
      return this.customer.profile_img || this.defaultProfileIcon;
    },
    userId() {
      return this.customer.user_id || null;
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.meeting) {
        this.loadMeetingData();
        this.fetchTeamMembers();
      }
      document.body.style.overflow = newVal && !this.isRoomSelectionOpen ? 'hidden' : '';
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.modalContent) {
            this.$refs.modalContent.addEventListener('click', this.closeDropdownOnClick);
          }
        });
      } else {
        if (this.$refs.modalContent) {
          this.$refs.modalContent.removeEventListener('click', this.closeDropdownOnClick);
        }
      }
    },
    meeting(newVal) {
      if (newVal) {
        this.loadMeetingData();
      }
    },
    isRoomSelectionOpen(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : '';
    },
  },
  mounted() {
    if (this.$refs.modalContent) {
      this.$refs.modalContent.addEventListener('click', this.closeDropdownOnClick);
    }
  },
  beforeUnmount() {
    if (this.$refs.modalContent) {
      this.$refs.modalContent.removeEventListener('click', this.closeDropdownOnClick);
    }
  },
  methods: {
    async fetchTeamMembers() {
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
        const token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت پیدا نشد');
        const response = await axios.get(`${API_BASE_URL}/get_all_team_members`, {
          headers: { Authorization: `Token ${token.trim()}` },
        });
        this.teamMembers = response.data.members.filter(
          (member) => member.user?.id && member.user.first_name && member.user.last_name
        );
      } catch (error) {
        if (error.response?.status === 403) {
          Toast.fire({
            icon: 'error',
            title: 'لطفاً دوباره وارد شوید',
          });
          window.location.href = '/login';
        }
        this.error = 'خطا در بارگذاری لیست اعضای تیم';
      }
    },
    async loadMeetingData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت پیدا نشد');
        const response = await axios.get(`${API_BASE_URL}/get_user_meetings`, {
          headers: { Authorization: `Token ${token.trim()}` },
        });
        const meeting = response.data.meetings.find((m) => m.id === this.meeting.id);
        if (!meeting) throw new Error('جلسه یافت نشد');
        const dateTime = moment(meeting.date_time);
        const isSpaceUsed = meeting.use_space;
        const roomData = isSpaceUsed ? meeting.space_data : meeting.asset_bundle_data;
        let imageUrl = 'https://via.placeholder.com/150';
        if (isSpaceUsed && meeting.space_data?.assetBundleRoomId?.img) {
          imageUrl = meeting.space_data.assetBundleRoomId.img.startsWith('http')
            ? meeting.space_data.assetBundleRoomId.img
            : `${API_BASE_URL}${meeting.space_data.assetBundleRoomId.img}`;
        } else if (!isSpaceUsed && meeting.asset_bundle_data?.img) {
          imageUrl = meeting.asset_bundle_data.img.startsWith('http')
            ? meeting.asset_bundle_data.img
            : `${API_BASE_URL}${meeting.asset_bundle_data.img}`;
        }
        this.form = {
          title: meeting.name,
          description: meeting.description || '',
          date: dateTime.format('jYYYY/jMM/jDD'),
          startHour: dateTime.hour(),
          startMinute: dateTime.minute(),
          endHour: dateTime.hour() + 1,
          endMinute: dateTime.minute(),
          selectedRoom: {
            id: isSpaceUsed ? meeting.space : meeting.asset_bundle,
            name: roomData?.name || 'اتاق',
            type: roomData?.description || 'اتاق',
            capacity: isSpaceUsed ? meeting.space_data?.capacity : meeting.asset_bundle_data?.maxPerson || 10,
            image: imageUrl,
          },
          space: meeting.space,
          asset_bundle: meeting.asset_bundle,
          use_space: isSpaceUsed,
        };
        this.participants = [];
        this.participants = meeting.invited_users
          .filter((user) => user.id !== this.userId)
          .map((user) => ({
            id: user.id,
            name: user.customer.first_name
              ? `${user.customer.first_name} ${user.customer.last_name}`
              : user.username,
            phone: user.customer.mobile_number,
            role: user.customer.semat || 'بدون سمت',
            profile_img: user.customer.profile_img || this.defaultProfileIcon,
          }));
        this.isEditing = false;
      } catch (error) {
        this.error = `خطا در بارگذاری اطلاعات جلسه: ${error.message}`;
      }
    },
    toggleDropdown(event) {
      this.isDropdownOpen = !this.isDropdownOpen;
      event.stopPropagation();
    },
    selectParticipant(id) {
      this.selectedParticipantId = id;
      this.isDropdownOpen = false;
      this.addParticipant();
    },
    closeDropdownOnClick(event) {
      if (
        this.isDropdownOpen &&
        this.$refs.customInput &&
        !this.$refs.customInput.contains(event.target)
      ) {
        this.isDropdownOpen = false;
      }
    },
    openRoomSelection() {
      this.isRoomSelectionOpen = true;
    },
    handleRoomSelection(room) {
      this.form.selectedRoom = {
        id: room.id,
        name: room.name || 'اتاق',
        type: room.type || 'اتاق',
        capacity: room.capacity || 10,
        image: room.image || 'https://via.placeholder.com/150',
      };
      this.form.space = room.space;
      this.form.asset_bundle = room.asset_bundle;
      this.form.use_space = room.use_space;
      this.isRoomSelectionOpen = false;
    },
    getParticipantName(id) {
      const member = this.teamMembers.find((m) => m.user.id === id);
      return member ? `${member.user.first_name} ${member.user.last_name}` : '';
    },
    addParticipant() {
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

      if (!this.selectedParticipantId) {
        Toast.fire({
          icon: 'error',
          title: 'لطفاً یک عضو تیم انتخاب کنید.',
        });
        this.error = 'لطفاً یک عضو تیم انتخاب کنید.';
        return;
      }
      const selectedMember = this.teamMembers.find((member) => member.user.id === this.selectedParticipantId);
      if (!selectedMember) {
        Toast.fire({
          icon: 'error',
          title: 'کاربر انتخاب‌شده یافت نشد.',
        });
        this.error = 'کاربر انتخاب‌شده یافت نشد.';
        return;
      }
      if (this.participants.some((p) => p.id === this.selectedParticipantId)) {
        Toast.fire({
          icon: 'error',
          title: 'این کاربر قبلاً اضافه شده است.',
        });
        this.error = 'این کاربر قبلاً اضافه شده است.';
        return;
      }
      if (this.selectedParticipantId === this.userId) {
        Toast.fire({
          icon: 'error',
          title: 'نمی‌توانید خودتان را به‌عنوان شرکت‌کننده اضافه کنید.',
        });
        this.error = 'نمی‌توانید خودتان را به‌عنوان شرکت‌کننده اضافه کنید.';
        return;
      }
      this.participants.push({
        id: selectedMember.user.id,
        phone: selectedMember.mobile_number,
        name: `${selectedMember.user.first_name} ${selectedMember.user.last_name}`,
        role: selectedMember.semat || 'بدون سمت',
        profile_img: selectedMember.profile_img || this.defaultProfileIcon,
      });
      this.selectedParticipantId = '';
      this.isDropdownOpen = false;
      this.error = null;
    },
    removeParticipant(id) {
      this.participants = this.participants.filter((p) => p.id !== id);
      this.error = null;
    },
    closeModal(event) {
      if (event && event.target.classList.contains('modal-overlay')) {
        this.$emit('close');
        this.resetForm();
      }
    },
    closeModalByButton() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        date: moment().format('jYYYY/jMM/jDD'),
        startHour: 12,
        startMinute: 0,
        endHour: 13,
        endMinute: 0,
        selectedRoom: null,
        space: null,
        asset_bundle: null,
        use_space: false,
      };
      this.participants = [];
      this.selectedParticipantId = '';
      this.isDropdownOpen = false;
      this.isEditing = false;
      this.error = null;
      this.isRoomSelectionOpen = false;
    },
    incrementTime(field) {
      const limits = { startHour: 23, startMinute: 59, endHour: 23, endMinute: 59 };
      if (this.form[field] < limits[field]) this.form[field]++;
    },
    decrementTime(field) {
      if (this.form[field] > 0) this.form[field]--;
    },
    async handleSubmit() {
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

      if (!this.form.title || !this.form.date) {
        Toast.fire({
          icon: 'error',
          title: 'لطفاً نام جلسه و تاریخ را وارد کنید.',
        });
        this.error = 'لطفاً نام جلسه و تاریخ را وارد کنید.';
        return;
      }
      if (!this.form.selectedRoom || this.form.space === null || this.form.asset_bundle === null) {
        Toast.fire({
          icon: 'error',
          title: 'لطفاً یک اتاق برای جلسه انتخاب کنید.',
        });
        this.error = 'لطفاً یک اتاق برای جلسه انتخاب کنید.';
        return;
      }
      const momentDate = moment(this.form.date, 'jYYYY/jMM/jDD');
      if (!momentDate.isValid()) {
        Toast.fire({
          icon: 'error',
          title: 'تاریخ وارد شده معتبر نیست.',
        });
        this.error = 'تاریخ وارد شده معتبر نیست.';
        return;
      }
      const startTimeInMinutes = this.form.startHour * 60 + this.form.startMinute;
      const endTimeInMinutes = this.form.endHour * 60 + this.form.endMinute;
      if (endTimeInMinutes <= startTimeInMinutes) {
        Toast.fire({
          icon: 'error',
          title: 'زمان پایان باید بعد از زمان شروع باشد.',
        });
        this.error = 'زمان پایان باید بعد از زمان شروع باشد.';
        return;
      }
      const startDateTime = momentDate
        .clone()
        .set({ hour: this.form.startHour, minute: this.form.startMinute, second: 0 })
        .toISOString();
      const meetingData = {
        meeting_id: this.meeting.id,
        name: this.form.title,
        description: this.form.description,
        date_time: startDateTime,
        space: this.form.space,
        asset_bundle: this.form.asset_bundle,
        use_space: this.form.use_space,
        user_ids: [this.userId, ...this.participants.map((p) => p.id)],
      };
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت پیدا نشد');
        await axios.post(`${API_BASE_URL}/edit_meeting`, meetingData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token.trim()}`,
          },
        });
        this.$emit('update-meeting', {
          id: this.meeting.id,
          title: meetingData.name,
          description: meetingData.description,
          date: startDateTime,
          image: this.form.selectedRoom.image || 'https://via.placeholder.com/150',
          type: this.form.selectedRoom.name || 'جلسه',
          maxCapacity: this.form.selectedRoom.capacity || 10,
          invited_users: this.participants,
        });
        Toast.fire({
          icon: 'success',
          title: 'جلسه با موفقیت ویرایش شد!',
        });
        this.closeModalByButton();
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: `خطا در ویرایش جلسه: ${error.response?.data?.message || error.message}`,
        });
        this.error = `خطا در ویرایش جلسه: ${error.response?.data?.message || error.message}`;
      }
    },
  },
};
</script>

<style scoped>
/* Base styles */
.participant-input {
  position: relative;
  display: flex;
  align-items: center;
}

.custom-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #E2DEE9;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  transition: border-color 0.3s ease;
  user-select: none;
}

.custom-input:hover {
  border-color: #3A57E8;
}

.dropdown-icon {
  transition: transform 0.3s ease;
}

.custom-input.active .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #E2DEE9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

.dropdown-item .avatar-wrapper {
  width: 90px;
  height: 90px;
  margin-right: 0px;
}

.dropdown-item .user-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.dropdown-item .user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 2.5rem;
  margin-top: 15px;
}

.dropdown-item .user-name {
  font-size: 16px;
  font-weight: 600;
  color: #101010;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: clip;
  width: 100px;
}

.dropdown-item .user-info span {
  font-size: 14px;
  color: #718096;
  width: 75px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: clip;
}

.dropdown-item .user-role {
  font-size: 12px;
  color: #3A57E8;
  font-weight: 500;
}

.no-members {
  padding: 10px;
  text-align: center;
  color: #718096;
}

.child-time-input-group {
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-around;
}

.participant-input button {
  margin-left: 10px;
  padding: 10px;
  background: #3A57E8;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
  max-width: 700px;
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

.popUp-objects {
  margin-top: 1rem !important;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 620px;
  display: block;
  margin: auto;
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
  max-width: 25rem;
}

.input-group {
  position: relative;
  width: 100%;
}

.form-group textarea {
  height: 140px;
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 25rem;
  resize: none;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
}

.time-input-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.time-input-group input {
  width: 45px;
  height: 45px;
  border: 1px solid #718096;
  border-radius: 9px;
  text-align: center;
  color: #101010;
  margin-bottom: 0.25rem;
}

.time-input-group input::-webkit-outer-spin-button,
.time-input-group input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.time-input-group input[type=number] {
  -moz-appearance: textfield;
}

.time-input-group p {
  font-size: 17px;
}

.time-input-group span {
  margin: 0 0.5rem;
}

.input-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-div button {
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 5%;
  padding-bottom: 0;
  width: 100%;
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

.rooms-selecter {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.rooms-selecter span {
  color: #101010;
  font-size: 17px;
}

.rooms-selecter button {
  background-color: #3A57E8;
  color: #fff;
  border-radius: 8px;
  border: none;
  font-size: 17px;
  height: 50px;
  width: 60%;
}

.participants-objects h2 {
  font-weight: 600;
  font-size: 19px;
  color: #101010;
}

.participants-objects p {
  font-weight: 500;
  font-size: 16px;
  color: #5A6678;
  margin: 2rem 0 1.5rem 0;
}

.participants-guide {
  font-size: 16px;
  color: #5A6678;
  line-height: 2rem;
  width: 89%;
  display: block;
  max-width: 35rem;
}

.presenter {
  margin: 2rem 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 4px 0px #00000029;
  border-radius: 12px;
  height: 95px;
  padding-left: 1rem;
}

.user-avatar {
  width: 80px;
  height: 80px;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  max-height: 80px;
  font-size: 18px;
}

.user-info p {
  font-weight: 600;
}

.user-info span {
  color: #667387;
}

.presenter-role {
  font-size: 18px;
  color: #101010;
  font-weight: 600;
  width: 160px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: clip;
}

.presenter button {
  background-color: transparent;
  border: none;
  height: 35px;
  cursor: pointer;
}

.last-span {
  color: rgb(79, 90, 105);
  font-size: 16.5px;
  line-height: 190%;
  display: block;
  margin-top: 4rem;
  margin-bottom: 1rem;
}

.participant-input {
  position: relative;
  width: 100%;
}

.participant-input input {
  width: 100%;
}

.participant-input button {
  position: absolute;
  right: 0;
  top: 11px;
  background-color: transparent;
  border: none;
}

#participantPhone::placeholder {
  text-align: right;
  padding-right: 1.5rem;
}

/* Responsive Styles */

/* Mobile (max-width: 600px) */
@media (max-width: 600px) {
  .modal-content {
    max-width: 90%;
    height: 85vh;
    padding-bottom: 1rem;
  }

  .popUp-header {
    padding: 15px 20px;
  }

  .popUp-header h2 {
    font-size: 18px;
  }

  .popUp-header button svg {
    width: 28px;
    height: 28px;
  }

  .popUp-objects {
    padding: 10px;
    max-width: 325px;
    border-radius: 16px;
  }

  .child-time-input-group {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
  }

  .popUp-title {
    padding: 10px;
    padding-right: 10px;
    padding-top: 0;
    gap: 0.5rem !important;
  }

  .popUp-title h2 {
    font-size: 18px;
  }

  .popUp-title span {
    font-size: 14px;
  }

  .form-group {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .form-group label {
    width: 100%;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .form-group input,
  .form-group textarea {
    max-width: 100%;
    font-size: 14px;
  }

  .time-input-group {
    justify-content: flex-start;
    gap: 1.5rem;
  }

  .time-input-group input {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .input-div svg {
    width: 18px;
    height: 18px;
  }

  .time-input-group p {
    font-size: 15px;
  }

  .time-input-group span {
    margin: 0 0.3rem;
  }

  .form-actions {
    flex-direction: row;
    gap: 10px;
    padding: 15px;
  }

  .submit-button,
  .cancel-button {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }

  .rooms-selecter {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .rooms-selecter button {
    width: 60%;
    height: 40px;
    font-size: 14px;
  }

  .rooms-selecter span {
    font-size: 15px;
    width: 50%;
  }

  .participants-objects h2 {
    font-size: 17px;
  }

  .participants-objects p {
    font-size: 14px;
    margin: 1.5rem 0;
  }

  .participants-guide {
    font-size: 14px;
    line-height: 1.8rem;
  }

  .presenter {
    height: 80px;
    padding-left: 0.5rem;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
  }

  .user-info {
    font-size: 16px;
    max-height: 60px;
  }

  .user-info p {
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: clip;
    width: 6rem;
  }

  .user-info span {
    font-size: 13px;
  }

  .presenter-role {
    font-size: 13px;
    text-align: center;
    width: 70px;
    font-weight: 500;
  }

  .presenter button svg {
    width: 30px;
    height: 30px;
  }

  .last-span {
    font-size: 14px;
    margin-top: 1.5rem;
  }

  .dropdown-item .avatar-wrapper {
    width: 60px;
    height: 60px;
  }

  .dropdown-item .user-name {
    font-size: 14px;
    width: 80px;
  }

  .dropdown-item .user-info span {
    font-size: 12px;
    width: 60px;
  }

  .dropdown-item .user-role {
    font-size: 11px;
  }

  .custom-input {
    font-size: 14px;
    padding: 8px;
  }

  .dropdown-menu {
    max-height: 250px;
  }
}

/* Tablet (min-width: 600px - max-width: 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .modal-content {
    max-width: 90vw;
    padding: 0px;
    padding-bottom: 2rem;
  }

  .popUp-header h2 {
    font-size: 20px;
  }

  .popUp-objects {
    max-width: 95%;
    padding: 18px;
  }

  .popUp-title {
    padding-right: 20px;
    gap: 1rem;
  }

  .popUp-title h2 {
    font-size: 19px;
  }

  .popUp-title span {
    font-size: 15px;
  }

  .form-group label {
    font-size: 15px;
  }

  .form-group input,
  .form-group textarea {
    max-width: 90%;
    font-size: 15px;
  }

  .time-input-group input {
    width: 42px;
    height: 42px;
  }

  .time-input-group p {
    font-size: 16px;
  }

  .submit-button,
  .cancel-button {
    font-size: 17px;
    height: 48px;
  }

  .rooms-selecter button {
    width: 60%;
    font-size: 16px;
  }

  .participants-objects h2 {
    font-size: 18px;
  }

  .participants-objects p {
    font-size: 15px;
  }

  .participants-guide {
    font-size: 15px;
  }

  .presenter {
    height: 90px;
  }

  .user-avatar {
    width: 70px;
    height: 70px;
  }

  .user-info {
    font-size: 17px;
  }

  .user-name {
    font-size: 16px;
  }

  .user-info span {
    font-size: 14px;
  }

  .presenter-role {
    font-size: 16px;
    width: 140px;
  }
}

/* Large Tablet / Small Desktop (min-width: 1024px - max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .modal-content {
    max-width: 85vw;
  }

  .popUp-objects {
    max-width: 95%;
  }

  .form-group input,
  .form-group textarea {
    max-width: 95%;
  }

  .rooms-selecter button {
    width: 65%;
  }
}

/* Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  .modal-content {
    max-width: 700px;
  }

  .popUp-objects {
    max-width: 620px;
  }

  .popUp-title {
    gap: 1rem;
  }
}
</style>

<style>
.vpd-input-group input {
  height: 40px;
  width: 100%;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
  max-width: 25rem;
  text-align: center;
  padding: 0;
}

.vpd-input-group label {
  display: none;
}

/* Responsive adjustments for VuePersianDatetimePicker */
@media (max-width: 600px) {
  .vpd-input-group input {
    height: 40px;
    max-width: 100%;
    font-size: 14px;
  }
}

@media (min-width: 600px) and (max-width: 1024px) {
  .vpd-input-group input {
    max-width: 90%;
    font-size: 15px;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .vpd-input-group input {
    max-width: 95%;
  }
}
</style>