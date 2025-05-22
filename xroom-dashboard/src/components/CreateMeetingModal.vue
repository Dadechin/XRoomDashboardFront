<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>ایجاد جلسه جدید</h2>
        <button @click="closeModal">
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
        <span>برای ایجاد جلسه جدید فرم زیر را تکمیل نمایید.</span>
      </div>
      <div class="popUp-objects">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="meetingTitle">نام جلسه</label>
            <input
              type="text"
              id="meetingTitle"
              v-model="form.title"
              required
            />
          </div>
          <div class="form-group">
            <label for="meet-description">شرح جلسه</label>
            <textarea
              name="meet-description"
              id="meet-description"
              v-model="form.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="meetingDate">روز</label>
            <div class="input-group">
              <span style="position: absolute; z-index: 1; top: 10px; right: 32%;">
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
                required
                style="border-radius: 0 8px 8px 0; text-align: center; position: relative;"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="meetingTime">ساعت</label>
            <div class="input-group">
              <div class="time-input-group">
                <p style="margin-left: 1rem;">شروع</p>
                <div class="input-div">
                  <button type="button" @click="incrementTime('startMinute')">
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
                        stroke-linecap prištede="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    v-model.number="form.startMinute"
                    min="0"
                    max="59"
                    required
                  />
                  <button type="button" @click="decrementTime('startMinute')">
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
                  <button type="button" @click="incrementTime('startHour')">
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
                    max="24"
                    required
                  />
                  <button type="button" @click="decrementTime('startHour')">
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
                <p style="margin-left: 1rem; margin-right: 2.5rem;">پایان</p>
                <div class="input-div">
                  <button type="button" @click="incrementTime('endMinute')">
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
                    required
                  />
                  <button type="button" @click="decrementTime('endMinute')">
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
                  <button type="button" @click="incrementTime('endHour')">
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
                    max="24"
                    required
                  />
                  <button type="button" @click="decrementTime('endHour')">
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
          <div class="form-group">
            <label style="font-size: 19px;font-weight: 600;">اتاق های جلسات</label>
            <div class="rooms-selecter">
              <span>0 انتخاب شده</span>
              <button type="button" @click="openRoomSelection">انتخاب اتاق جلسه</button>
            </div>
          </div>
          <div class="participants-objects">
            <h2>شرکت کنندگان</h2>
            <p><span style="color: #101010;font-weight: 600;">کاربران</span> یا <span style="color: #101010;font-weight: 600;">مهمانان تیم</span> را با پر کردن آدرس ایمیل آنها دعوت کنید.</p>
            <span class="participants-guide">
              می‌توانید به مجری اجازه بدهید تا ابزارهایی برای مدیریت این جلسه و همچنین ابزارهایی برای مدیریت مجوزها در طول جلسه به او بدهد.
            </span>
          </div>
          <div class="presenter">
            <div style="display: flex;align-items: center;height: 100%;">
              <div class="avatar-wrapper">
                <img class="user-avatar" :src="profileIcon" />
              </div>
              <div class="user-info">
                <p class="user-name">{{ fullName }}</p>
                <span>{{ userEmail || 'ایمیل موجود نیست' }}</span>
              </div>
            </div>
            <p class="presenter-role">{{ userRole }}</p>
          </div>
          <div class="presenter" v-for="participant in participants" :key="participant.email">
            <div style="display: flex;align-items: center;height: 100%;">
              <div class="avatar-wrapper">
                <img class="user-avatar" :src="participant.profile_img || defaultProfileIcon" />
              </div>
              <div class="user-info">
                <p class="user-name">{{ participant.name || 'کاربر مهمان' }}</p>
                <span>{{ participant.email }}</span>
              </div>
            </div>
            <p class="presenter-role">{{ participant.role }}</p>
            <button @click="removeParticipant(participant.email)">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32" fill="none">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white"/>
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E2DEE9"/>
                <path d="M20.5 12L12.5 20" stroke="#101010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 12L20.5 20" stroke="#101010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="form-group">
            <label for="participantEmail">اضافه کردن شرکت کننده</label>
            <div class="participant-input">
              <input
                type="email"
                id="participantEmail"
                v-model="newParticipantEmail"
                placeholder="لطفا ایمیل شرکت کننده را وارد کنید ..."
                @keyup.enter="addParticipant"
              />
              <button type="button" @click="addParticipant">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <path d="M3.33203 8H12.6654" stroke="#3A57E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 3.33325V12.6666" stroke="#3A57E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
        <span class="last-span">
          شرکت کنندگان را اضافه کنید برای شرکت کنندگانی که به این جلسه اضافه شده اند ایمیلی حاوی کد جلسه، عنوان، توضیحات و زمان ارسال می شود.
        </span>
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" @click="closeModal">بازگشت</button>
        <button type="button" class="submit-button" @click="handleSubmit">ایجاد جلسه</button>
      </div>
    </div>
  </div>
</template>

<script>
import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
import moment from 'moment-jalaali';

export default {
  name: 'MeetingModal',
  components: {
    VuePersianDatetimePicker,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        date: moment().format('jYYYY/jMM/jDD'),
        startHour: 12,
        startMinute: 0,
        endHour: 18,
        endMinute: 0,
      },
      participants: [],
      newParticipantEmail: '',
      defaultProfileIcon: 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg',
      error: null,
    };
  },
  computed: {
    fullName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : 'کاربر مهمان';
    },
    userEmail() {
      return 'diyar.akhgar@gmail.com';
    },
    userRole() {
      return 'مجری';
    },
    profileIcon() {
      const customer = JSON.parse(localStorage.getItem('customer') || '{}');
      return customer.profile_img || this.defaultProfileIcon;
    },
  },
  methods: {
    openRoomSelection() {
      this.$emit('open-room-selection');
    },
    addParticipant() {
      if (!this.newParticipantEmail || !this.validateEmail(this.newParticipantEmail)) {
        this.error = 'لطفاً ایمیل معتبر وارد کنید';
        return;
      }

      if (this.participants.some(p => p.email === this.newParticipantEmail) || this.newParticipantEmail === this.userEmail) {
        this.error = 'این ایمیل قبلاً اضافه شده است';
        return;
      }

      this.participants.push({
        email: this.newParticipantEmail,
        name: 'کاربر مهمان',
        role: 'شرکت‌کننده',
        profile_img: this.defaultProfileIcon,
      });
      this.newParticipantEmail = '';
      this.error = null;
    },
    removeParticipant(email) {
      this.participants = this.participants.filter(p => p.email !== email);
    },
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    closeModal() {
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
        endHour: 18,
        endMinute: 0,
      };
      this.participants = [];
      this.newParticipantEmail = '';
      this.error = null;
    },
       incrementTime(field) {
      if (field === 'startHour' && this.form.startHour < 23) {
        this.form.startHour++;
      } else if (field === 'startMinute' && this.form.startMinute < 59) {
        this.form.startMinute++;
      } else if (field === 'endHour' && this.form.endHour < 23) {
        this.form.endHour++;
      } else if (field === 'endMinute' && this.form.endMinute < 59) {
        this.form.endMinute++;
      }
    },
    decrementTime(field) {
      if (field === 'startHour' && this.form.startHour > 0) {
        this.form.startHour--;
      } else if (field === 'startMinute' && this.form.startMinute > 0) {
        this.form.startMinute--;
      } else if (field === 'endHour' && this.form.endHour > 0) {
        this.form.endHour--;
      } else if (field === 'endMinute' && this.form.endMinute > 0) {
        this.form.endMinute--;
      }
    },
    handleSubmit() {
      if (!this.form.title || !this.form.date) {
        this.error = 'لطفاً نام جلسه و تاریخ را وارد کنید.';
        return;
      }

      const momentDate = moment(this.form.date, 'jYYYY/jMM/jDD');
      if (!momentDate.isValid()) {
        this.error = 'تاریخ وارد شده معتبر نیست.';
        return;
      }

      const startTimeInMinutes = this.form.startHour * 60 + this.form.startMinute;
      const endTimeInMinutes = this.form.endHour * 60 + this.form.endMinute;
      if (endTimeInMinutes <= startTimeInMinutes) {
        this.error = 'زمان پایان باید بعد از زمان شروع باشد.';
        return;
      }

      const startDateTime = momentDate
        .clone()
        .set({
          hour: this.form.startHour,
          minute: this.form.startMinute,
          second: 0,
        })
        .toISOString();

      const endDateTime = momentDate
        .clone()
        .set({
          hour: this.form.endHour,
          minute: this.form.endMinute,
          second: 0,
        })
        .toISOString();

      const meetingData = {
        title: this.form.title,
        description: this.form.description,
        startDateTime,
        endDateTime,
        participants: [
          ...(this.userEmail ? [{ email: this.userEmail, role: this.userRole }] : []),
          ...this.participants.map(p => ({
            email: p.email,
            role: p.role,
          })),
        ],
      };

      console.log('داده‌های جلسه:', meetingData);

      this.$emit('submit', meetingData);
      this.closeModal();
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
    margin-top: 1rem;
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

.form-group input:focus {
    outline: none;
}

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
    -moz-appearance:textfield;
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
  border:none ;
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
}

.presenter button {
  background-color: transparent;
  border:none;
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
  left: 0;
  top: 11px;
  background-color: transparent;
  border: none;
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


</style>