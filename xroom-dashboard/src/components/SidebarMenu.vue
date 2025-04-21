<!-- SidebarMenu.vue -->
<template>
  <div class="sidebar">
    <div class="group">
      <!-- Profile Info -->
      <div class="overlap">
        <img class="profile" src="https://c.animaapp.com/m9nvumalUMfQbN/img/profile.png" />
        <div class="frame-2">
          <div class="text-wrapper-2">خوش آمدید...</div>
          <div class="text-wrapper-3">دانیال پژوهش کیا</div>
        </div>
      </div>
      <div class="notifications">
        <div class="overlap-group"><div class="text-wrapper-4">4</div></div>
      </div>
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



.sidebar {
  background-color: #101010;
  width: 360px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px 50px;
  direction: rtl;
}

.group {
  position: relative;
  width: 228px;
  height: 88px;
  margin-bottom: 75px;
}

.overlap {
  position: absolute;
  width: 137px;
  height: 72px;
  top: 16px;
  right: 91px;
}

.profile {
  position: absolute;
  width: 72px;
  height: 72px;
  top: 0;
  right: -95px;
}

.frame-2 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
  gap: 8px;
  position: absolute;
  top: 9px;
  right: 0;
}

.text-wrapper-2 {
  position: relative;
  width: fit-content;
  margin-top: -1px;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: #e6e6e6;
  font-size: 16px;
  text-align: right;
  line-height: 22.4px;
  white-space: nowrap;
  letter-spacing: 0;
}

.text-wrapper-3 {
  position: relative;
  width: fit-content;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 19px;
  text-align: right;
  line-height: 26.6px;
  white-space: nowrap;
  letter-spacing: 0;
}

.notifications {
  position: absolute;
  width: 31px;
  height: 29px;
  top: 0;
  right: 52px;
}

.overlap-group {
  position: relative;
  height: 31px;
  top: 1px;
  right: -1px;
  background-color: #dc3434;
  border-radius: 15.5px;
}

.text-wrapper-4 {
  position: absolute;
  top: 9px;
  right: 11px;
  font-family: "IRANSansXFaNum-DemiBold", Helvetica;
  font-weight: 700;
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 0.22px;
  line-height: normal;
  white-space: nowrap;
}

.frame {
  display: flex;
  flex-direction: column;
  width: 260px;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.BTN {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 260px;
  height: 57px;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 16px 24px;
  position: relative;
  background-color: #3a57e8;
  border-radius: 10px;
  cursor: pointer;
}

.text-wrapper {
  position: relative;
  width: fit-content;
  margin-top: -2px;
  font-family: "IRANSansXFaNum-Medium", Helvetica;
  font-weight: 500;
  color: white;
  font-size: 18px;
  text-align: right;
  letter-spacing: 0;
  line-height: 25.2px;
  white-space: nowrap;
}

.img {
  position: relative;
  width: 24px;
  height: 24px;
}

.button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 260px;
  height: 57px;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 16px 24px;
  position: relative;
  background-color: #101010;
  border-radius: 10px;
  cursor: pointer;
}

.button:hover {
  background-color: #1e1e1e;
}
</style>