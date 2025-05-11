<template>
  <header class="header-container">
    <img class="line" src="https://c.animaapp.com/m9nvumalUMfQbN/img/line-1.svg" />
    <div class="welcome-container">
      <p class="welcome-message">{{ pageTitle }} </p>
    </div>
    <div class="user-info-container"  @click.stop="toggleDropdown">
      <div class="user-name-container" ref="userContainer">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="profileIcon"   />
        </div>
        <div class="user-name">{{ fullName }}</div>
        <img class="user-icon"  src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-10.svg"   />
        
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

    <button class="green-button">
      <img :src="require('@/assets/img/shopIcon.png')" alt="Icon" class="button-icon" />
      <span>خرید اشتراک </span>
    </button>
  </header>
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
      if (user.first_name && user.last_name) {
        return `${user.first_name} ${user.last_name}`;
      }
      return 'کاربر مهمان';
    },
    
    profileIcon() {
      const customer = JSON.parse(localStorage.getItem('customer') || '{}');
      if (customer.profile_img  ) {
        return `${customer.profile_img}`;
      }
      
      return 'https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg';
    }
  },
  methods: {
    toggleDropdown() {
      console.log("Dropdown toggled"); // This should now appear in console
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    }
  },
  mounted() {
    console.log("Component mounted"); // Check if this appears
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>
<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: relative;
}

/* New green button styles */
.green-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #48BB78; /* Green color */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.green-button:hover {
  background-color: #3e8e41; /* Darker green on hover */
}

.button-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1); /* Make icon white */
}

.welcome-container {
  flex: 1;
  text-align: right;
  padding-right: 20px;
}

.welcome-message {
  font-size: 14px;
  color: #666666;
  margin: 0;
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 25px;
}

.user-name-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
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
  position: relative;
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
  /* position: absolute; */
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 150px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.logout-icon {
  width: 16px;
  height: 16px;
}


.user-info-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 25px;
  position: relative; /* Add this for dropdown positioning */
}

.user-name-container {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative; /* Important for dropdown positioning */
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* Position below the user info */
  right: 0;
  background-color: white;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Higher z-index to ensure it's above other elements */
  min-width: 150px;
  margin-top: 5px; /* Small gap from the user info */
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.logout-icon {
  width: 16px;
  height: 16px;
}

/* Ensure header has proper z-index */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: relative;
  z-index: 100; /* Lower than dropdown but higher than page content */
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
  color: #3b82f6; /* Tailwind blue-500 */
  text-decoration: none;
  margin-left: 8px;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}

.logout {
  color: #f56565; /* Tailwind red-500 */
}

.logout .dropdown-label {
  color: #f56565;
}

</style>