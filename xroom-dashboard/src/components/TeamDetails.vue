<template>
  <div class="tab-content">
    <div class="card">جزئیات تیم ۱</div>
    <div class="card">جزئیات تیم ۲</div>
  </div>
</template>

<script>
export default {
  name: 'TeamDetails',
};
</script>

<style scoped>
.tab-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>