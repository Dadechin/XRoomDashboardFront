<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <!-- Right Section -->
      <div class="right-section">
        <h2 class="section-title">راهنمای شروع</h2>
<!--         <swiper
          :slides-per-view="1.5"
          :space-between="10"
          :loop="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          class="my-swiper"
        >
          <swiper-slide>
            <div
              class="swiper-image"
              @click="tutorialShowModal = true">
              <div>
                <h2>آموزش ها</h2>
                <span>کاوش در XRoom</span>
              </div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M15.9993 29.3334C23.3631 29.3334 29.3327 23.3639 29.3327 16.0001C29.3327 8.63628 23.3631 2.66675 15.9993 2.66675C8.63555 2.66675 2.66602 8.63628 2.66602 16.0001C2.66602 23.3639 8.63555 29.3334 15.9993 29.3334Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.1191 12C12.4326 11.1089 13.0513 10.3575 13.8657 9.87887C14.6802 9.40024 15.6377 9.22528 16.5687 9.38498C17.4998 9.54467 18.3442 10.0287 18.9526 10.7514C19.5609 11.4741 19.8939 12.3887 19.8925 13.3334C19.8925 16 15.8925 17.3334 15.8925 17.3334" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 22.6667H16.0133" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="swiper-image">
              <div>
                <h2>تغییرات نسخه</h2>
                <span>جزئیات به‌روزرسانی ها</span>
              </div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M17.8673 2.66675H8.00065C7.29341 2.66675 6.61513 2.9477 6.11503 3.4478C5.61494 3.94789 5.33398 4.62617 5.33398 5.33341V26.6667C5.33398 27.374 5.61494 28.0523 6.11503 28.5524C6.61513 29.0525 7.29341 29.3334 8.00065 29.3334H24.0007C24.7079 29.3334 25.3862 29.0525 25.8863 28.5524C26.3864 28.0523 26.6673 27.374 26.6673 26.6667V16.8001" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66602 8H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66602 13.3333H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66602 18.6667H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.66602 24H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M28.5046 7.50137C29.0358 6.97023 29.3342 6.24985 29.3342 5.4987C29.3342 4.74756 29.0358 4.02718 28.5046 3.49604C27.9735 2.9649 27.2531 2.6665 26.502 2.6665C25.7508 2.6665 25.0304 2.9649 24.4993 3.49604L17.8193 10.1787C17.5023 10.4955 17.2702 10.8871 17.1446 11.3174L16.0286 15.144C15.9952 15.2588 15.9932 15.3804 16.0228 15.4962C16.0525 15.6119 16.1127 15.7176 16.1972 15.8021C16.2817 15.8866 16.3874 15.9469 16.5032 15.9765C16.6189 16.0062 16.7406 16.0042 16.8553 15.9707L20.682 14.8547C21.1122 14.7291 21.5038 14.497 21.8206 14.18L28.5046 7.50137Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="swiper-image"
              @click="goToDownloads">
              <div>
                <h2>دانلود</h2>
                <span>پلتفرم خود را انتخاب کنید</span>
              </div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M28 20V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V20" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.33398 13.3333L16.0007 19.9999L22.6673 13.3333" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 20V4" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="swiper-image"
              @click="goToTeams">
              <div>
                <h2>تیم ها</h2>
                <span>مدیریت تیم های خود</span>
              </div>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M25.7563 21.8719C24.9741 21.0891 24.0602 20.4501 23.0563 19.9844C24.472 18.8375 25.3751 17.0875 25.3751 15.125C25.3751 11.6625 22.4876 8.82188 19.0251 8.875C15.6157 8.92813 12.8688 11.7063 12.8688 15.125C12.8688 17.0875 13.7751 18.8375 15.1876 19.9844C14.1835 20.4498 13.2695 21.0888 12.4876 21.8719C10.7813 23.5813 9.81258 25.8375 9.75008 28.2437C9.74924 28.2771 9.7551 28.3103 9.76728 28.3413C9.77947 28.3724 9.79776 28.4007 9.82105 28.4246C9.84435 28.4485 9.8722 28.4674 9.90294 28.4804C9.93369 28.4933 9.96672 28.5 10.0001 28.5H11.7501C11.8845 28.5 11.997 28.3937 12.0001 28.2594C12.0595 26.4469 12.7938 24.75 14.0845 23.4625C14.7449 22.7986 15.5305 22.2722 16.3957 21.9139C17.2609 21.5555 18.1886 21.3724 19.1251 21.375C21.0282 21.375 22.8188 22.1156 24.1657 23.4625C25.4532 24.75 26.1876 26.4469 26.2501 28.2594C26.2532 28.3937 26.3657 28.5 26.5001 28.5H28.2501C28.2834 28.5 28.3165 28.4933 28.3472 28.4804C28.378 28.4674 28.4058 28.4485 28.4291 28.4246C28.4524 28.4007 28.4707 28.3724 28.4829 28.3413C28.4951 28.3103 28.5009 28.2771 28.5001 28.2437C28.4376 25.8375 27.4688 23.5813 25.7563 21.8719ZM19.1251 19.125C18.0563 19.125 17.0501 18.7094 16.297 17.9531C15.919 17.5781 15.6204 17.1309 15.4191 16.638C15.2178 16.1451 15.1178 15.6167 15.1251 15.0844C15.1345 14.0594 15.5438 13.0688 16.2595 12.3344C17.0095 11.5656 18.0126 11.1375 19.0845 11.125C20.1438 11.1156 21.172 11.5281 21.9282 12.2688C22.7032 13.0281 23.1282 14.0438 23.1282 15.125C23.1282 16.1938 22.7126 17.1969 21.9563 17.9531C21.5853 18.3259 21.144 18.6214 20.6581 18.8226C20.1721 19.0237 19.651 19.1265 19.1251 19.125ZM11.297 15.95C11.2688 15.6781 11.2532 15.4031 11.2532 15.125C11.2532 14.6281 11.3001 14.1438 11.3876 13.6719C11.4095 13.5594 11.3501 13.4438 11.247 13.3969C10.822 13.2063 10.4313 12.9438 10.0938 12.6125C9.69614 12.2269 9.3832 11.7626 9.17497 11.2493C8.96674 10.736 8.8678 10.1849 8.88445 9.63125C8.91258 8.62813 9.3157 7.675 10.0188 6.95625C10.7907 6.16563 11.8282 5.73438 12.9313 5.74688C13.9282 5.75625 14.8907 6.14063 15.6188 6.82188C15.8657 7.05313 16.0782 7.30938 16.2563 7.58438C16.3188 7.68125 16.4407 7.72188 16.547 7.68438C17.097 7.49375 17.6782 7.35938 18.2751 7.29688C18.4501 7.27813 18.5501 7.09063 18.472 6.93438C17.4563 4.925 15.3813 3.5375 12.9813 3.5C9.5157 3.44688 6.6282 6.2875 6.6282 9.74688C6.6282 11.7094 7.53133 13.4594 8.94695 14.6063C7.9532 15.0656 7.03758 15.7 6.24383 16.4937C4.53133 18.2031 3.56258 20.4594 3.50008 22.8687C3.49924 22.9021 3.50509 22.9353 3.51728 22.9663C3.52947 22.9974 3.54776 23.0257 3.57105 23.0496C3.59435 23.0735 3.6222 23.0924 3.65294 23.1054C3.68369 23.1183 3.71672 23.125 3.75008 23.125H5.5032C5.63758 23.125 5.75008 23.0187 5.7532 22.8844C5.81258 21.0719 6.54695 19.375 7.83758 18.0875C8.75633 17.1687 9.88133 16.5312 11.1095 16.2219C11.2313 16.1906 11.3126 16.075 11.297 15.95Z" fill="#101010"/>
                </svg>
              </span>
            </div>
          </swiper-slide>
        </swiper> -->
        <div class="tutorial-grid">
          <div
            class="tutorial-item"
            @click="tutorialShowModal = true">
            <div>
              <h2>آموزش ها</h2>
              <span>کاوش در XRoom</span>
            </div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M15.9993 29.3334C23.3631 29.3334 29.3327 23.3639 29.3327 16.0001C29.3327 8.63628 23.3631 2.66675 15.9993 2.66675C8.63555 2.66675 2.66602 8.63628 2.66602 16.0001C2.66602 23.3639 8.63555 29.3334 15.9993 29.3334Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.1191 12C12.4326 11.1089 13.0513 10.3575 13.8657 9.87887C14.6802 9.40024 15.6377 9.22528 16.5687 9.38498C17.4998 9.54467 18.3442 10.0287 18.9526 10.7514C19.5609 11.4741 19.8939 12.3887 19.8925 13.3334C19.8925 16 15.8925 17.3334 15.8925 17.3334" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 22.6667H16.0133" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div
            class="tutorial-item">
            <div>
              <h2>تغییرات نسخه</h2>
              <span>جزئیات به‌روزرسانی ها</span>
            </div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M17.8673 2.66675H8.00065C7.29341 2.66675 6.61513 2.9477 6.11503 3.4478C5.61494 3.94789 5.33398 4.62617 5.33398 5.33341V26.6667C5.33398 27.374 5.61494 28.0523 6.11503 28.5524C6.61513 29.0525 7.29341 29.3334 8.00065 29.3334H24.0007C24.7079 29.3334 25.3862 29.0525 25.8863 28.5524C26.3864 28.0523 26.6673 27.374 26.6673 26.6667V16.8001" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66602 8H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66602 13.3333H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66602 18.6667H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.66602 24H7.99935" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M28.5046 7.50137C29.0358 6.97023 29.3342 6.24985 29.3342 5.4987C29.3342 4.74756 29.0358 4.02718 28.5046 3.49604C27.9735 2.9649 27.2531 2.6665 26.502 2.6665C25.7508 2.6665 25.0304 2.9649 24.4993 3.49604L17.8193 10.1787C17.5023 10.4955 17.2702 10.8871 17.1446 11.3174L16.0286 15.144C15.9952 15.2588 15.9932 15.3804 16.0228 15.4962C16.0525 15.6119 16.1127 15.7176 16.1972 15.8021C16.2817 15.8866 16.3874 15.9469 16.5032 15.9765C16.6189 16.0062 16.7406 16.0042 16.8553 15.9707L20.682 14.8547C21.1122 14.7291 21.5038 14.497 21.8206 14.18L28.5046 7.50137Z" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div
            class="tutorial-item"
            @click="goToDownloads">
            <div>
              <h2>دانلود</h2>
              <span>پلتفرم خود را انتخاب کنید</span>
            </div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M28 20V25.3333C28 26.0406 27.719 26.7189 27.219 27.219C26.7189 27.719 26.0406 28 25.3333 28H6.66667C5.95942 28 5.28115 27.719 4.78105 27.219C4.28095 26.7189 4 26.0406 4 25.3333V20" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33398 13.3333L16.0007 19.9999L22.6673 13.3333" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 20V4" stroke="#101010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div
            class="tutorial-item"
            @click="goToTeams">
            <div>
              <h2>تیم ها</h2>
              <span>مدیریت تیم های خود</span>
            </div>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M25.7563 21.8719C24.9741 21.0891 24.0602 20.4501 23.0563 19.9844C24.472 18.8375 25.3751 17.0875 25.3751 15.125C25.3751 11.6625 22.4876 8.82188 19.0251 8.875C15.6157 8.92813 12.8688 11.7063 12.8688 15.125C12.8688 17.0875 13.7751 18.8375 15.1876 19.9844C14.1835 20.4498 13.2695 21.0888 12.4876 21.8719C10.7813 23.5813 9.81258 25.8375 9.75008 28.2437C9.74924 28.2771 9.7551 28.3103 9.76728 28.3413C9.77947 28.3724 9.79776 28.4007 9.82105 28.4246C9.84435 28.4485 9.8722 28.4674 9.90294 28.4804C9.93369 28.4933 9.96672 28.5 10.0001 28.5H11.7501C11.8845 28.5 11.997 28.3937 12.0001 28.2594C12.0595 26.4469 12.7938 24.75 14.0845 23.4625C14.7449 22.7986 15.5305 22.2722 16.3957 21.9139C17.2609 21.5555 18.1886 21.3724 19.1251 21.375C21.0282 21.375 22.8188 22.1156 24.1657 23.4625C25.4532 24.75 26.1876 26.4469 26.2501 28.2594C26.2532 28.3937 26.3657 28.5 26.5001 28.5H28.2501C28.2834 28.5 28.3165 28.4933 28.3472 28.4804C28.378 28.4674 28.4058 28.4485 28.4291 28.4246C28.4524 28.4007 28.4707 28.3724 28.4829 28.3413C28.4951 28.3103 28.5009 28.2771 28.5001 28.2437C28.4376 25.8375 27.4688 23.5813 25.7563 21.8719ZM19.1251 19.125C18.0563 19.125 17.0501 18.7094 16.297 17.9531C15.919 17.5781 15.6204 17.1309 15.4191 16.638C15.2178 16.1451 15.1178 15.6167 15.1251 15.0844C15.1345 14.0594 15.5438 13.0688 16.2595 12.3344C17.0095 11.5656 18.0126 11.1375 19.0845 11.125C20.1438 11.1156 21.172 11.5281 21.9282 12.2688C22.7032 13.0281 23.1282 14.0438 23.1282 15.125C23.1282 16.1938 22.7126 17.1969 21.9563 17.9531C21.5853 18.3259 21.144 18.6214 20.6581 18.8226C20.1721 19.0237 19.651 19.1265 19.1251 19.125ZM11.297 15.95C11.2688 15.6781 11.2532 15.4031 11.2532 15.125C11.2532 14.6281 11.3001 14.1438 11.3876 13.6719C11.4095 13.5594 11.3501 13.4438 11.247 13.3969C10.822 13.2063 10.4313 12.9438 10.0938 12.6125C9.69614 12.2269 9.3832 11.7626 9.17497 11.2493C8.96674 10.736 8.8678 10.1849 8.88445 9.63125C8.91258 8.62813 9.3157 7.675 10.0188 6.95625C10.7907 6.16563 11.8282 5.73438 12.9313 5.74688C13.9282 5.75625 14.8907 6.14063 15.6188 6.82188C15.8657 7.05313 16.0782 7.30938 16.2563 7.58438C16.3188 7.68125 16.4407 7.72188 16.547 7.68438C17.097 7.49375 17.6782 7.35938 18.2751 7.29688C18.4501 7.27813 18.5501 7.09063 18.472 6.93438C17.4563 4.925 15.3813 3.5375 12.9813 3.5C9.5157 3.44688 6.6282 6.2875 6.6282 9.74688C6.6282 11.7094 7.53133 13.4594 8.94695 14.6063C7.9532 15.0656 7.03758 15.7 6.24383 16.4937C4.53133 18.2031 3.56258 20.4594 3.50008 22.8687C3.49924 22.9021 3.50509 22.9353 3.51728 22.9663C3.52947 22.9974 3.54776 23.0257 3.57105 23.0496C3.59435 23.0735 3.6222 23.0924 3.65294 23.1054C3.68369 23.1183 3.71672 23.125 3.75008 23.125H5.5032C5.63758 23.125 5.75008 23.0187 5.7532 22.8844C5.81258 21.0719 6.54695 19.375 7.83758 18.0875C8.75633 17.1687 9.88133 16.5312 11.1095 16.2219C11.2313 16.1906 11.3126 16.075 11.297 15.95Z" fill="#101010"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- Left Section -->
      <div class="left-section">
        <h2 class="section-title">جلسات</h2>
        <p class="section-description">
          فقط یک ایده با جلسه شگفت‌انگیز بعدی‌تان در واقعیت مجازی فاصله دارید. همین امروز آن را برگزار کنید!
        </p>
        <button class="create-meeting-btn" @click="showModal = true">
          <img
            src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg"
            alt="Create Meeting Icon"
            class="btn-icon"
          />
          <span>ایجاد جلسه جدید</span>
        </button>
      </div>

      <!-- Meetings Section -->
      <div class="meetings-section">
        <div class="files-header">
          <h1 class="files-title">آخرین فایل‌ها</h1>
          <div class="file-buttons">
            <button class="white-button" @click="openDialog('image')">
              بارگذاری فایل
            </button>
            <router-link class="white-button" to="/dashboard/files">
              مدیریت فایل‌ها
            </router-link>
          </div>
        </div>
        <div v-if="recentFiles.length === 0" class="no-files-message">
          <p>شما اخیرا فایلی آپلود نکردید</p>
        </div>
        <swiper
          v-else
          :slides-per-view="2.2"
          :space-between="15"
          :loop="true"
          :pagination="{ clickable: true }"
          :breakpoints="{
            768: { slidesPerView: 3.4, spaceBetween: 15 },
            1024: { slidesPerView: 2.8, spaceBetween: 25 },
            1280: { slidesPerView: 4.4, spaceBetween: 30 },
          }"
          :modules="modules"
          class="last-files-swiper"
        >
          <swiper-slide v-for="(file, index) in recentFiles" :key="index" class="meeting-card">
            <div
              class="card-image"
              :class="[
                {
                  'file-image': file.type === 'image',
                  'file-pdf': file.type === 'pdf',
                  'file-video': file.type === 'video',
                  'file-glb': file.type === 'glb',
                  'file-other': file.type === 'other',
                }
              ]"
              :style="{ backgroundImage: `url(${getFilePreviewImage(file.type, file)})` }"
              @click="openPreviewDialog(file.type, index, getFullFileUrl(file[file.type]), file.id)"
            ></div>
            <div class="card-content">
              <h3>{{ file.name }}</h3>
              <div class="meeting-date">
                <img
                  src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg"
                  alt="Calendar Icon"
                  class="date-icon"
                />
                <span>{{ formatDate(file.created_at) }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- Modals -->
    <CreateMeetingModal
      :is-open="showModal"
      @create-meeting="createNewMeeting"
      @close="showModal = false"
    />
    <TutorialShowModal
      :is-open="tutorialShowModal"
      @close="tutorialShowModal = false"
    />
    <NewFileDialog
      :is-open="isNewFileDialogOpen"
      :initial-upload-type="currentUploadType"
      :base-url="baseUrl"
      @close="closeDialog"
      @upload-success="fetchUserData"
    />
    <FilePreviewDialog
      :is-open="isPreviewDialogOpen"
      :preview-url="previewUrl"
      :preview-type="currentPreviewType"
      :preview-index="currentPreviewIndex"
      :base-url="baseUrl"
      :video-options="videoOptions"
      @close="closePreviewDialog"
      @delete-success="fetchUserData"
    />
  </div>
</template>

<script>
import CreateMeetingModal from '@/components/CreateMeetingModal.vue';
import TutorialShowModal from '@/components/TutorialShowModal.vue';
import NewFileDialog from '@/components/NewFileDialog.vue';
import FilePreviewDialog from '@/components/FilePreviewDialog.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import axios from 'axios';

export default {
  name: 'DashboardPage',
  components: {
    CreateMeetingModal,
    TutorialShowModal,
    NewFileDialog,
    FilePreviewDialog,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination],
      showModal: false,
      tutorialShowModal: false,
      isNewFileDialogOpen: false,
      isPreviewDialogOpen: false,
      currentUploadType: 'image',
      currentPreviewType: null,
      currentPreviewIndex: null,
      previewUrl: '',
      baseUrl: 'https://my.xroomapp.com/api',
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [{ type: 'video/mp4', src: '' }],
      },
      userData: {
        images: [],
        pdfs: [],
        videos: [],
        glbs: [],
        others: [],
      },
      recentFiles: [],
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
  async fetchUserData() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${this.baseUrl}/getInfo`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      this.userData = {
        ...response.data.data,
        others: response.data.data.others || [],
      };

      // فیلتر فایل‌های اخیر (24 ساعت گذشته)
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);
      this.recentFiles = [
        ...this.userData.images.map(file => ({ ...file, type: 'image' })),
        ...this.userData.pdfs.map(file => ({ ...file, type: 'pdf' })),
        ...this.userData.videos.map(file => ({ ...file, type: 'video' })),
        ...this.userData.glbs.map(file => ({ ...file, type: 'glb' })),
        ...this.userData.others.map(file => ({ ...file, type: 'other' })),
      ].filter(file => new Date(file.created_at) >= oneDayAgo);
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.recentFiles = [];
    }
  },
    getFilePreviewImage(type, file) {
      switch (type) {
        case 'image':
          return this.getFullFileUrl(file.image);
        case 'pdf':
          return 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
        case 'video':
          return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQ1L9b8tFaGXBQxOdCCaq-AcYkmawPtRVZA&s';
        case 'glb':
          return 'https://images.freeimages.com/clg/istock/previews/1024/102424081-icon-3d-modeling.jpg'; // URL ثابت برای مدل سه‌بعدی
        case 'other':
          return 'https://cdn-icons-png.flaticon.com/512/186/186159.png';
        default:
          return '';
      }
    },
    getFullFileUrl(relativePath) {
      if (!relativePath) return '';
      return `${this.baseUrl}${relativePath}`;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    },
    createNewMeeting(meetingData) {
      this.meetings.push({
        title: meetingData.title,
        date: meetingData.date,
        image: 'https://via.placeholder.com/150',
        type: meetingData.type,
        maxCapacity: meetingData.maxCapacity,
      });
      this.showModal = false;
    },
    openDialog(type = 'image') {
      this.currentUploadType = type;
      this.isNewFileDialogOpen = true;
    },
    closeDialog() {
      this.isNewFileDialogOpen = false;
    },
    openPreviewDialog(type, index, url, id) {
      this.currentPreviewType = type;
      this.currentPreviewIndex = id;
      this.previewUrl = url;

      if (type === 'video') {
        this.videoOptions.sources[0].src = url;
      }

      this.isPreviewDialogOpen = true;
    },
    closePreviewDialog() {
      this.isPreviewDialogOpen = false;
      this.previewUrl = '';
      this.currentPreviewIndex = null;
      this.currentPreviewType = null;
    },
    goToDownloads() {
      this.$router.push('/dashboard/download');
    },
    goToTeams() {
      this.$router.push('/dashboard/teams');
    },
  },
};
</script>

<style scoped>

.no-files-message{
  text-align: center;
  margin-top: 3rem;
  font-size: 20px;
}


.dashboard {
  padding: 20px 0px;
  font-family: 'IRANSansXFaNum-Medium', Helvetica, sans-serif;
}

.section-title {
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #101010;
  font-size: 19px;
  line-height: 26.6px;
  margin-bottom: 1rem;
}

.section-description {
  color: #4f5a69;
  font-size: 14px;
  line-height: 26.6px;
  margin: 0;
}

.create-meeting-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #3a57e8;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.files-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.files-title {
  font-size: 19px;
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #101010;
}

.file-buttons {
  display: flex;
  gap: 10px;
}

.white-button {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 14px;
  color: #101010;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  line-height: normal;
}

.white-button:hover {
  background-color: #f5f5f5;
}

.my-swiper,
.last-files-swiper {
  width: 100%;
  margin-bottom: 1.5rem;
}

.swiper-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  height: auto;
  min-height: 6.5rem;
  background: white;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.swiper-image::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 20px;
  background: linear-gradient(to right, #001940, #4364f7);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.swiper-image h2{
  color: #101010;
  font-weight: 600;
  font-size: 19px;
}

.swiper-image span{
  color: #718096;
  font-weight: 500;
  font-size: 14px;
}

.swiper-image div{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tutorial-grid {
  display: none;
}

.tutorial-item {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  height: auto;
  min-height: 6.5rem;
  background: white;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.tutorial-item::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 20px;
  background: linear-gradient(to right, #001940, #4364f7);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.tutorial-item h2{
  color: #101010;
  font-weight: 600;
  font-size: 19px;
  margin: 0 !important;
}

.tutorial-item span{
  color: #718096;
  font-weight: 500;
  font-size: 14px;
}

.tutorial-item div{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.meeting-card {
  background-color: white;
  border-radius: 16px;
  border: 0.5px solid #b8c0cb;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 172px;
  background-size: cover;
  background-position: center;
  border-radius: 14px 14px 0 0;
}

  .file-pdf,.file-video,.file-glb {
    background-size: contain !important;
    background-repeat: no-repeat;
    margin-top: 0.8rem;
    height: 160px;
    width: 8rem !important;
    margin-right: auto;
    margin-left: auto;
  }

.card-content {
  padding: 12px 10px 8px;
}

.card-content h3 {
  font-family: 'IRANSansXFaNum-DemiBold', Helvetica, sans-serif;
  font-weight: 700;
  color: #444d5a;
  font-size: 14px;
  margin: 0 0 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meeting-date {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f8da1;
  font-size: 12px;
}

.date-icon {
  width: 15px;
  height: 15px;
}

/* Mobile (max-width: 600px) */
@media (max-width: 600px) {
  .white-button {
    font-size: 12px;
  }
  
  .section-title {
    margin-bottom: 0;
  }

  .files-title {
    font-size: 18px !important;
    font-weight: 600 !important;
  }

  .create-meeting-btn {
    width: fit-content;
  }

  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .left-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;  
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .tutorial-item {
    width: 100%;
    margin: 0;
    min-height: 5rem;
  }

  .tutorial-item h2 {
    font-size: 15px;
  }

  .tutorial-item span {
    font-size: 12px;
    line-height: 160%;
  }

  .tutorial-item svg {
    width: 30px !important;
    height: 30px !important;
  }

  .tutorial-item div {
    gap: 0.5rem;
  }

  .last-files-swiper {
    margin: 0;
  }

  .meeting-card {
    width: 250px;
    flex-shrink: 0;
  }

  .right-section {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  .card-image {
    height: 7.5rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

/* Small Tablet (min-width: 600px and max-width: 780px) */
@media (min-width: 600px) and (max-width: 780px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 200px;
    margin: auto;
  }

  .meetings-section {
    grid-column: 1 / -1;
    margin-top: 40px;
  }

  .file-buttons {
    margin-right: 20px;
  }
}

/* Tablet (min-width: 780px and max-width: 1024px) */
@media (min-width: 780px) and (max-width: 1024px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 85%;
    margin: auto;
  }

  .meetings-section {
    max-width: 96%;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .file-pdf,.file-video,.file-glb {
    background-size: contain !important;
    background-repeat: no-repeat;
    margin-top: 0.8rem;
    height: 160px;
    width: 8rem !important;
    margin-right: auto;
    margin-left: auto;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 15px;
  }

  .date-icon {
    width: 20px;
    height: 20px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }
}

/* Desktop (min-width: 1024px and max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 280px;
    margin: auto;
  }

  .create-meeting-btn {
    padding: 12px 24px;
    font-size: 16px;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .meetings-section {
    max-width: 100%;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .file-pdf,.file-video,.file-glb {
    background-size: contain !important;
    background-repeat: no-repeat;
    margin-top: 0.8rem;
    height: 160px;
    width: 8rem !important;
    margin-right: auto;
    margin-left: auto;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 20px;
    line-height: 190%;
  }

  .date-icon {
    width: 22px;
    height: 22px;
  }

  .meeting-date span {
    font-size: 16px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }
}

/* Large Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .my-swiper {
    display: none;
  }

  .tutorial-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .tutorial-item {
    width: 300px;
    margin: auto;
  }

  .create-meeting-btn {
    padding: 12px 24px;
    font-size: 16px;
    margin-top: 1.5rem;
  }

  .btn-icon {
    width: 16px;
    height: 16px;
  }

  .meetings-section {
    grid-column: 1 / -1;
    margin-top: 40px;
  }

  .card-image {
    height: 172px;
  }

  .file-pdf,.file-video,.file-glb {
    background-size: contain !important;
    background-repeat: no-repeat;
    margin-top: 0.8rem;
    height: 160px;
    width: 8rem !important;
    margin-right: auto;
    margin-left: auto;
  }

  .card-content {
    padding: 8px 16px 16px;
  }

  .card-content h3 {
    font-size: 20px;
    line-height: 190%;
  }

  .date-icon {
    width: 22px;
    height: 22px;
  }

  .meeting-date span {
    font-size: 16px;
  }

  .file-buttons {
    gap: 30px;
    margin-right: 40px;
  }

  .white-button {
    padding: 8px 16px;
  }

  .section-title {
    font-size: 21px;
  }

  .section-description {
    font-size: 17.5px;
  }
}

/* Larger Desktop (min-width: 1840px) */
@media (min-width: 1840px) {

  .tutorial-item {
    width: 30rem;
    height: 8.5rem;
    margin: auto;
  }

}
</style>