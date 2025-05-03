<template>
  <div id="app">
    <!-- Main App Layout -->
     
     

    <!-- The router-view here will display the active route's component -->
    <router-view></router-view>
  </div>
  <Footer />

  
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
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

/* Styling for the header */
header {
  background-color: #4A90E2; /* Blue color */
  padding: 20px;
  text-align: center;
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
</style>