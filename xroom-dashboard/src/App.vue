<template>
  <div id="app">
    <!-- Main App Layout -->
     
      <h1 class="app-title">XRoom Dashboard</h1>
   

    <!-- The router-view here will display the active route's component -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  font-family: 'Yekan';
  src: url('@/assets/fonts/Yekan.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* Apply the font globally */
body {
  font-family: 'Yekan', sans-serif;
}
</style>