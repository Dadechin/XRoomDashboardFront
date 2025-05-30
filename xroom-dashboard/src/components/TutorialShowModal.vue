<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="popUp-header">
        <h2>آموزش ها</h2>
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

      <div class="popUp-body">
        <div v-for="(section, index) in sections" :key="index" class="popUp-object">
            <h2>{{ section.title }}</h2>
            <div class="cards">
            <div v-for="(card, cardIndex) in section.cards" :key="cardIndex" class="card">
                <div class="card-header"></div>
                <span class="card-logo">
                <img :src="card.icon" alt="icon">
                </span>
                <div class="card-body">
                {{ card.title }}
                </div>
                <div class="card-footer">
                مشاهده محتوا
                </div>
            </div>
            </div>
        </div>
      </div>

        <button class="exit-btn" @click="closeModal">خروج</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sections: [
        {
          title: 'شروع به کار',
          cards: [
            {
              title: 'راهنمای دسکتاپ',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'راهنمای متا',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'راهنمای مهمان',
              icon: require('@/assets/img/card-icon.png'),
            },
          ],
        },
        {
          title: 'ویژگی‌های پیشرفته',
          cards: [
            {
              title: 'تنظیمات پیشرفته',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'اتوماسیون',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'مدیریت کاربران',
              icon: require('@/assets/img/card-icon.png'),
            },
          ],
        },
        {
          title: 'راهنمای کاربری',
          cards: [
            {
              title: 'راهنمای نصب',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'راهنمای به‌روزرسانی',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'پشتیبانی',
              icon: require('@/assets/img/card-icon.png'),
            },
          ],
        },
        {
          title: 'سوالات متداول',
          cards: [
            {
              title: 'سوالات عمومی',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'مشکلات رایج',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'تماس با ما',
              icon: require('@/assets/img/card-icon.png'),
            },
            {
              title: 'ارتباط با ما',
              icon: require('@/assets/img/card-icon.png'),
            },
          ],
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
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

.popUp-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2.5rem;
}

.popUp-object {
    margin-top: 1rem !important;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 16px;
    width: 100%;
    max-width: 620px;
    display: block;
    margin: auto;
}

.popUp-object {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.popUp-object h2 {
    font-size: 20px;
    color: #101010;
    line-height: 140%;
    font-weight: 600;
}

.cards {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem 0;
}

.card {
    width: 31.5%;
    height: 10.5rem;
    border-radius: 12px;
    position: relative;
}

.card-header {
    width: 100%;
    height: 3.5rem;
    background-color: #182561;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.card-logo img {
    height: 30px;
    width: 30px;
}

.card-logo {
    position: absolute;
    top: 15px;
    right: 34%;
    background-color: #fff;
    border-radius: 100%;
    padding: 1rem 1rem 0.7rem 1rem;
    border: 1px solid #182561;
}


.card-body {
    background-color: #F7F6FA;
    height: 4.5rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 1.2rem;
}

.card-footer {
    color: #667387;
    font-size: 14px;
    border-top: 0.5px solid #E2DEE9;
    background-color: #F7F6FA;
    height: 2.5rem;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.exit-btn {
    background-color: #3A57E8;
    border-radius: 8px;
    color: #fff;
    border: none;
    padding: 15px 45px 15px 45px;
    display: block;
    margin: auto;
    font-size: 16px;
    cursor: pointer;
}
</style>