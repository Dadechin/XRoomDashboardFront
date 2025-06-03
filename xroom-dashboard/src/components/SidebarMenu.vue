<template>
  <div>
    <!-- Overlay for mobile when sidebar is open -->
    <div class="overlay" v-if="isOpen && isMobile" @click="$emit('close')"></div>
    
    <div class="sidebar" :class="{ 'open': isOpen }">


      <div class="group">
        <!-- Profile Info -->
        <div class="logo-xroom">
          <div class="logo">
            <div class="clip-path-group-wrapper">
              <img class="clip-path-group" :src="require('@/assets/img/logo.png')" />
            </div>
          </div>
        </div>
        <router-link to="/dashboard/edit-profile" class="profile-link">
          <div class="profile-container">
            <img 
              class="profile" 
              :src="profileImageUrl" 
              alt="Profile Image"
              @error="handleImageError"
            />
            <div class="frame-2">
              <div class="text-wrapper-2">خوش آمدید...</div>
              <div class="text-wrapper-3">{{ fullName }}</div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Menu -->
      <div class="frame">
        <router-link to="/dashboard" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-dashboard.svg" />
          <div class="text-wrapper">داشبورد</div>
        </router-link>
        <router-link to="/dashboard/spaces" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard/spaces') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/menu-icon-4.svg" />
          <div class="text-wrapper">فضاها</div>
        </router-link>
        <router-link to="/dashboard/meetings" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard/meetings') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/menu-icon-1.svg" />
          <div class="text-wrapper">جلسات</div>
        </router-link>
        <router-link to="/dashboard/download" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard/download') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-download.svg" />
          <div class="text-wrapper">دانلود</div>
        </router-link>
        <router-link to="/dashboard/files" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard/files') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-files.svg" />
          <div class="text-wrapper">فایل ها</div>
        </router-link>
        <router-link to="/dashboard/teams" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/dashboard/teams') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-team.svg" />
          <div class="text-wrapper">تیم</div>
        </router-link>
        <router-link to="/support" class="nav-button"  @click="$emit('close')" :class="{ active: isActive('/support') }">
          <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-support.svg" />
          <div class="text-wrapper">پشتیبانی</div>
        </router-link>
      </div>

      <!-- Close Button for mobile -->
      <button class="close-button" v-if="isMobile" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>


  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMenu: 'dashboard',
      defaultProfileImage: 'https://c.animaapp.com/m9nvumalUMfQbN/img/profile.png'
    };
  },
  computed: {
    user() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    customer() {
      const customer = localStorage.getItem('customer');
      return customer ? JSON.parse(customer) : null;
    },
    fullName() {
      if (!this.user) return 'دانیال پژوهش کیا';
      return `${this.user.first_name || ''} ${this.user.last_name || ''}`.trim() || 'کاربر';
    },
    profileImageUrl() {
      if (!this.customer?.profile_img) return this.defaultProfileImage;
      return `${this.customer.profile_img}`;
    },
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    handleImageError(event) {
      event.target.src = this.defaultProfileImage;
    }
  }
};
</script>

<style scoped>
/* Base styles for common elements */
.sidebar {
  background-color: #101010;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  direction: rtl;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar.open {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.close-button {
  position: fixed;
  top: 20px;
  left: 15px;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #fff;
  border-radius: 5px;
  padding-top: 7px;
}

.close-button svg {
  width: 24px;
  height: 24px;
  stroke: #333;
}

.nav-button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 16px 24px;
  background-color: #101010;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #1e1e1e;
}

.nav-button.active {
  background-color: #3a57e8;
}

.frame {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.frame-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.text-wrapper-2 {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: #e6e6e6;
  font-size: 15px;
  line-height: 22.4px;
}

.text-wrapper-3 {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 16px;
  line-height: 26.6px;
}

.profile {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: none;
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.clip-path-group {
  width: 10rem;
}

.footer {
  margin-top: 48px;
  text-align: center;
  color: #aaa;
  font-size: 12px;
}

.logo-xroom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.text-wrapper-13 {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  color: #e6e6e6;
  font-size: 12px;
  margin-top: 10px;
}

.logo {
  display: flex;
  justify-content: center;
}

.clip-path-group-wrapper {
  width: 100px;
  height: 100px;
}

.clip-path-group {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-link {
  text-decoration: none;
  color: inherit;
}

.notifications {
  position: absolute;
  left: 0;
  top: 10px;
}

.notification-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: #dc3434;
  border-radius: 50%;
  font-family: "IRANSansXFaNum-DemiBold", Helvetica;
  font-weight: 700;
  color: #ffffff;
  font-size: 13px;
}

.text-wrapper {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 18px;
  text-align: right;
  line-height: 25.2px;
}

.img {
  width: 24px;
  height: 24px;
}

/* Media Queries */
@media (max-width: 520px) {
  .sidebar {
    width: 250px;
    padding: 1rem 1rem 1rem 0.5rem;
    display: none;
    transition: transform 0.3s ease-in-out;
  }

  .nav-button {
    width: 100%;
    height: 40px;
  }

  .group {
    width: 100%;
  }

  .clip-path-group-wrapper {
    width: 150px;
    height: 40px;
  }

  .clip-path-group {
    width: 150px;
    height: 40px;
    object-fit: contain;
  }
}

@media (min-width: 520px) and (max-width: 780px) {
  .sidebar {
    width: 22rem;
    padding: 1rem 1rem 1rem 0.5rem;
    display: none;
    transition: transform 0.3s ease-in-out;
  }

  .nav-button {
    width: 100%;
    height: 40px;
  }

  .group {
    width: 100%;
  }
  
  .clip-path-group-wrapper {
    width: 150px;
    height: 40px;
  }

  .clip-path-group {
    width: 150px;
    height: 40px;
    object-fit: contain;
  }
}

@media (min-width: 780px) and (max-width: 1280px) {
  .sidebar {
    width: 360px;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
  }

  .close-button {
    display: none;
  }

  .nav-button {
    width: 260px;
    height: 57px;
  }

  .frame {
    width: 260px;
    gap: 4px;
  }

  .group {
    width: 228px;
    margin-bottom: 75px;
  }

  .profile {
    margin-left: 20px;
  }

  .profile-container {
    padding: 10px 0;
    position: relative;
  }

  .text-wrapper-2 {
    font-size: 16px;
  }

  .text-wrapper-3 {
    font-size: 19px;
  }
}

@media (min-width: 1280px) {
  .sidebar {
    width: 360px;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
  }

  .close-button {
    display: none;
  }

  .nav-button {
    width: 260px;
    height: 57px;
  }

  .frame {
    width: 260px;
    gap: 4px;
  }

  .group {
    width: 228px;
    margin-bottom: 75px;
  }

  .profile {
    margin-left: 20px;
  }

  .profile-container {
    padding: 10px 0;
    position: relative;
  }

  .text-wrapper-2 {
    font-size: 16px;
  }

  .text-wrapper-3 {
    font-size: 19px;
  }
}
</style>