<!-- SidebarMenu.vue -->
<template>
  <div class="sidebar">
    <div class="group">
      <!-- Profile Info -->
      <div class="logo-xroom">

        <div class="logo">
          <div class="clip-path-group-wrapper">
            <img class="clip-path-group" src="https://c.animaapp.com/m9nvumalUMfQbN/img/clip-path-group.png" />
          </div>
        </div>
      </div>
      <router-link to="/dashboard/edit-profile" class="profile-link">
        <div class="profile-container">
          <img class="profile" src="https://c.animaapp.com/m9nvumalUMfQbN/img/profile.png" />
          <div class="frame-2">
            <div class="text-wrapper-2">خوش آمدید...</div>
            <div class="text-wrapper-3">دانیال پژوهش کیا</div>
          </div>
          <div class="notifications">
            <div class="notification-badge">4</div>
          </div> 
        </div>
      </router-link>
    </div>
 
    <!-- Menu -->
    <div class="frame">
      <router-link to="/dashboard" class="nav-button" :class="{ active: isActive('/dashboard') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-dashboard.svg" />
        <div class="text-wrapper">داشبورد</div>
      </router-link>

      <router-link to="/spaces" class="nav-button" :class="{ active: isActive('/spaces') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/menu-icon-4.svg" />
        <div class="text-wrapper">فضاها</div>
      </router-link>

      <router-link to="/meetings" class="nav-button" :class="{ active: isActive('/meetings') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/menu-icon-1.svg" />
        <div class="text-wrapper">جلسات</div>
      </router-link>

      <router-link to="/download" class="nav-button" :class="{ active: isActive('/download') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-download.svg" />
        <div class="text-wrapper">دانلود</div>
      </router-link>

      <router-link to="/dashboard/files" class="nav-button" :class="{ active: isActive('/dashboard/files') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-files.svg" />
        <div class="text-wrapper">فایل ها</div>
      </router-link>

      <router-link to="/team" class="nav-button" :class="{ active: isActive('/team') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-team.svg" />
        <div class="text-wrapper">تیم</div>
      </router-link>

      <router-link to="/support" class="nav-button" :class="{ active: isActive('/support') }">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/property-1-support.svg" />
        <div class="text-wrapper">پشتیبانی</div>
      </router-link>
    </div>
  </div>



</template>

<script>
export default {
  name: 'SidebarMenu',
  methods: {
    isActive(path) {
      return this.$route.path === path  
    }
  },
  data() {
    return {
      activeMenu: 'dashboard'
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 48px;
  text-align: center;
  color: #aaa;
  font-size: 12px;
}
.sidebar {
  background-color: #101010;
  width: 360px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px 50px;
  direction: rtl;
  display: flex;
  flex-direction: column;
}

.group {
  width: 228px;
  margin-bottom: 75px;
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

.profile-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 0;
}

.profile {
  width: 72px;
  height: 72px;
  margin-left: 20px;
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
  font-size: 16px;
  line-height: 22.4px;
}

.text-wrapper-3 {
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 19px;
  line-height: 26.6px;
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

.frame {
  display: flex;
  flex-direction: column;
  width: 260px;
  gap: 4px;
}

.nav-button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 260px;
  height: 57px;
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
</style>