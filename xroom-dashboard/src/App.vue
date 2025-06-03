<template>
  <div id="app">
    <!-- Dashboard Layout -->
    <template v-if="isDashboardLayout">
      <SidebarMenu :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
      <div class="dashboard-page">
        <div class="content">
          <AppHeader @toggle-sidebar="toggleSidebar" :pageTitle="$route.meta.title" />
          <router-view></router-view>
        </div>
      </div>
    </template>

    <!-- Sample Layout for SignUp, etc. -->
    <template v-else>
      <router-view></router-view>
    </template>

    <Footer />
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
    SidebarMenu,
    AppHeader,
  },
  data() {
    return {
      isSidebarOpen: false
    };
  },
  computed: {
    isDashboardLayout() {
      return this.$route.meta.requiresAuth === true;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
/* Reset default margins and set base font */
body {
  margin: 0;
  padding: 0;
  font-family: 'Yekan', 'Arial', sans-serif;
  background-color: #f4f7fa;
}

/* App title styling */
.app-title {
  color: #fff;
  font-size: 2rem; /* 32px, using rem for scalability */
  font-weight: 700;
  margin: 0;
}

/* Main app container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Router view content */
router-view {
  flex-grow: 1;
  padding: 1.25rem; /* 20px, using rem for consistency */
}

</style>


<style>
/* Font Face Declaration */
@font-face {
  font-family: 'IRANSans';
  src: url('@/assets/fonts/IRANSansXFaNum-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap; /* Improves font loading performance */
}

/* Global Font Application */
* {
  font-family: 'IRANSans', sans-serif !important;
}

/* Base Content Styles */
.content {
  background-color: #f8f9fa;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 35px 80px;
}

/* Responsive Styles */
@media (max-width: 520px) {
  .dashboard-page {
    padding: 0;
    direction: rtl;
  }

  .content {
    padding: 5px 15px !important;
    gap: 0;
    border-radius: 0;
  }
}

@media (min-width: 521px) and (max-width: 780px) {
  .dashboard-page {
    padding:  0;
    direction: rtl;
  }

  .content {
    padding: 0px 15px !important;
    padding-bottom: 45px !important;
    gap: 0;
    border-radius: 0;
  }
}

@media (min-width: 781px) and (max-width: 1024px) {
  .dashboard-page {
    margin-right: 20rem;
    padding: 20px;
    direction: rtl;
  }

  .content {
    padding: 15px 45px 45px 0 !important;
    gap: 0;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .dashboard-page {
    margin-right: 20rem;
    padding: 20px;
    direction: rtl;
  }

  .content {
    padding: 35px 45px !important;
  }
}

@media (min-width: 1280px) and (max-width : 1440px){
  .dashboard-page {
    margin-right: 20rem;
    padding: 20px;
    direction: rtl;
  }

  .content {
    padding: 35px 45px !important;
  }
}

@media (min-width: 1440px){
  .dashboard-page {
    margin-right: 20rem;
    padding: 20px;
    direction: rtl;
  }

  .content {
    padding: 35px 80px !important;
  }
}
</style>