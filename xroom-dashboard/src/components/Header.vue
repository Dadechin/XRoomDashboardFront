<template>
  <div class="header-container">
    <div class="welcome-container">
      <p class="welcome-message">{{ pageTitle }} </p>
    </div>
    <div class="user-info-container"  @click.stop="toggleDropdown">
      <div class="user-name-container" ref="userContainer">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="profileIcon"   />
        </div>
        <div class="user-name">{{ fullName }}</div>
        <span>          
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19922 10L11.9992 14L16.7992 10" stroke="#8D99AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        
        <!-- Dropdown positioned relative to user-info-container -->
        <div v-if="showDropdown" class="dropdown-menu">
          <router-link to="/dashboard/team" class="dropdown-item">
  <span class="dropdown-label">نام تیم</span>
  <span class="team-name">Dadechin</span>
  <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" class="dropdown-icon" alt="team" />
</router-link>

<router-link to="/dashboard/edit-profile" class="dropdown-item">
  <span class="dropdown-label">حساب کاربری</span>
  <img src="https://cdn-icons-png.flaticon.com/512/3524/3524637.png" class="dropdown-icon" alt="account" />
</router-link>

  <div class="dropdown-item logout" @click="logout">
    <span class="dropdown-label">خروج</span>
    <img :src="require('@/assets/img/exitIcon.png')" alt="logout" class="dropdown-icon" />
  </div>
</div>
      </div>
    </div>
    <button class="menu" @click="toggleSidebar">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </span>
    </button>
    <button class="green-button">
      <img :src="require('@/assets/img/shopIcon.png')" alt="Icon" class="button-icon" />
      <span>خرید اشتراک </span>
    </button>
  </div>
</template>


<script>
export default {
  name: 'AppHeader',
  props: {
    pageTitle: {
      type: String,
      default: 'از این داشبورد، کار با XRoom را آغاز کنید.'
    }
  },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    fullName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : 'کاربر مهمان';
    },
    profileIcon() {
      const customer = JSON.parse(localStorage.getItem('customer') || '{}');
      return customer.profile_img
        ? `${customer.profile_img}`
        : 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg';
    }
  },
  methods: {
    toggleDropdown() {
      console.log("Dropdown toggled");
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/';
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  },
  mounted() {
    console.log("Component mounted");
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>

<style scoped>
/* Base styles for all screen sizes */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eaeaea;
  position: relative;
  z-index: 100;
}

.green-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #48BB78;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.green-button:hover {
  background-color: #3e8e41;
}

.button-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.menu {
  background-color: transparent;
  border: none;
}

.menu svg {
  height: 25px;
  width: 25px;
}

.welcome-container {
  flex: 1;
}

.welcome-message {
  color: #111;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.user-name-container {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.user-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #101010;
}

.avatar-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  cursor: pointer;
}

.user-avatar {
  width: 100%;
  height: 55px;
  object-fit: cover;
}

.line {
  height: 40px;
  width: 1px;
  background-color: #eaeaea;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  padding: 10px 0;
  margin-top: 5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-label {
  font-size: 14px;
  color: #333;
}

.team-name {
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  margin-left: 8px;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}

.logout {
  color: #f56565;
}

.logout .dropdown-label {
  color: #f56565;
}

.logout-icon {
  width: 16px;
  height: 16px;
}

/* Mobile (max-width: 520px) */
@media (max-width: 520px) {
  .header-container {
    padding: 20px 0;
  }

  .green-button {
    display: none;
  }

  .menu {
    text-align: right;
    width: 30%;
  }

  .welcome-container {
    text-align: left;
    order: 3;
    width: 30%;
  }

  .welcome-message {
    font-size: 15px;
    width: 90px;
  }

  .user-info-container {
    justify-content: center;
    order: 2;
    width: 40%;
  }

  .avatar-wrapper {
    display: none;
  }
}

/* Small tablet (min-width: 520px and max-width: 780px) */
@media (min-width: 520px) and (max-width: 780px) {
  .header-container {
    padding: 20px 0;
  }

  .green-button {
    display: none;
  }

  .menu {
    text-align: center;
    width: 30%;
  }

  .menu svg {
    height: 29px;
    width: 29px;
  }

  .welcome-container {
    text-align: center;
    order: 3;
    width: 30%;
  }

  .welcome-message {
    font-size: 18px;
    width: 90px;
    margin: auto;
    display: block;
  }

  .user-info-container {
    justify-content: center;
    order: 2;
    width: 40%;
  }

  .user-icon {
    width: 18px;
    height: 18px;
  }

  .user-name {
    font-size: 18px;
  }

  .avatar-wrapper {
    display: none;
  }
}

/* Tablet (min-width: 780px and max-width: 1024px) */
@media (min-width: 780px) and (max-width: 1024px) {
  .menu {
    display: none;
  }

  .header-container {
    padding-right: 0;
  }

  .welcome-container {
    text-align: right;
    width: 30%;
  }

  .welcome-message {
    font-size: 15px;
    width: 200px;
  }

  .user-info-container {
    margin-left: 25px;
    width: 40%;
  }
}

/* Desktop (min-width: 1025px and max-width: 1280px) */
@media (min-width: 1025px) and (max-width: 1280px) {
  .menu {
    display: none;
  }

  .header-container {
    padding-right: 0;
  }

  .welcome-container {
    text-align: right;
  }

  .welcome-message {
    font-size: 19px;
  }

  .user-info-container {
    margin-left: 25px;
  }
}

/* Large Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  .menu {
    display: none;
  }

  .header-container {
    padding-right: 0;
  }

  .welcome-container {
    text-align: right;
  }

  .welcome-message {
    font-size: 19px;
  }

  .user-info-container {
    margin-left: 25px;
  }
}

</style>