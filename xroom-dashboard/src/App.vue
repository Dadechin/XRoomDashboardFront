<template>
  <div id="app">
    <!-- Dashboard LayOut -->
    <template v-if="isDashboardLayout">
      <SidebarMenu />
      <div class="dashboard-page">
        <div class="content">
          <AppHeader :pageTitle="$route.meta.title" />
          <router-view></router-view>
        </div>
      </div>
    </template>

    <!-- Sample LayOut for SignUp .... -->
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
  computed: {
    isDashboardLayout() {
      return this.$route.meta.requiresAuth === true;
    },
  },
};
</script>

<style scoped>
/* Global Styles */

body {
  /* font-family: 'Arial', sans-serif; */
  background-color: #f4f7fa;
  margin: 0;
  padding: 0;
  font-family: 'Yekan', sans-serif;

}


.app-title {
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

/* Additional styling for the whole app */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex-grow: 1;
  padding: 20px;
}






</style>


<style>
@font-face {
  font-family: 'IRANSans';
  src: url('@/assets/fonts/IRANSansXFaNum-Medium.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* Apply the font globally */
* {
  font-family: 'IRANSans', sans-serif !important;
}

.dashboard-page {
  margin-right: 20rem;
  padding: 20px;
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
}

.content {
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 35px 80px !important;
  display: flex;
  flex-direction: column;
  gap: 32px;
}


</style>