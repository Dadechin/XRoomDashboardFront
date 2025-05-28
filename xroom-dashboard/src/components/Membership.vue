<template>
  <div class="tab-content">
    <div class="access-container">
      <div class="access-header" style="background: white; border-radius: 20px; padding: 20px;">
        <img :src="require('@/assets/img/lock Icon.png')" alt="lock" class="lock-icon" />
        <div class="header-text">
          <h3>فعال‌سازی دسترسی XRoom</h3>
          <p>دسترسی کامل به امکانات XRoom بدون واترمارک</p>
        </div>
        <button class="primary-button" @click="changeTab('buy-subscription')">
          <img style="margin-left: 10px" :src="require('@/assets/img/hand.png')" alt="hand" />
          انتخاب طرح اشتراکی
        </button>
      </div>
      <!-- subscription card -->
      <div class="info-cards">
        <div class="info-card">
          <h4>وضعیت اشتراک تیم</h4>
          <p v-if="subscriptionCount - teamMemberCapacity > 0">
            ظرفیت کل تیم: <strong>{{ subscriptionCount }} کاربر</strong><br />
            ظرفیت باقی‌مانده: <strong>{{ subscriptionCount - teamMemberCapacity }} کاربر</strong><br />
            کاربران اضافه کرده: <strong>{{ teamMemberCapacity }} کاربر</strong>
          </p>
          <p class="invalid-subscription" v-else>شما اشتراک فعالی ندارین، لطفا اشتراک جدیدی خریداری نمایید.</p>
          <button class="disable-button" v-if="subscriptionCount - teamMemberCapacity > 0">
            اشتراک فعال دارید
          </button>
          <button class="secondary-button" @click="changeTab('buy-subscription')" v-else>
            خرید اشتراک جدید
          </button>
        </div>
        <div class="info-card">
          <h4>جزئیات صورتحساب</h4>
          <p>
            اصفهان، خیابان وحید، نبش خیابان حسین آباد، مجتمع عسگری ۳، واحد ۳<br />
            ۸۱۷۵۹۴۹۹۹۱<br />
            شماره تماس: ۰۹۳۷۹۸۹۸۶۲۳<br />
            ایمیل: aminimperator@gmail.com
          </p>
          <button class="secondary-button" @click="openBillingModal">
            ویرایش جزئیات صورتحساب
          </button>
        </div>
        <div class="info-card">
          <h4>عضویت‌ها</h4>
          <p>
            هنوز مجوزی فعال نیست. کاربران شما نمی‌توانند از XRoom با واترمارک استفاده کنند.
          </p>
          <button class="secondary-button">مدیریت عضویت‌ها</button>
        </div>
        <div class="info-card">
          <h4>روش پرداخت</h4>
          <p>هیچ روش پرداختی برای صورتحساب مرتبط نیست.</p>
        </div>
      </div>
      <EditBillingModal :isVisible="isBillingModalVisible" @close="closeBillingModal" />
    </div>
  </div>
</template>

<script>
import EditBillingModal from '@/components/EditBillingModal.vue';

export default {
  name: 'Membership',
  components: {
    EditBillingModal,
  },
  props: {
    subscriptionCount: {
      type: Number,
      required: true,
    },
    teamMemberCapacity: {
      type: Number,
      required: true,
    },
    isBillingModalVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    changeTab(tabName) {
      this.$emit('change-tab', tabName);
    },
    openBillingModal() {
      this.$emit('update:isBillingModalVisible', true);
    },
    closeBillingModal() {
      this.$emit('update:isBillingModalVisible', false);
    },
  },
};
</script>

<style scoped>
.access-container {
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
  padding: 20px;
  background-color: #f9f9fb;
  width: -webkit-fill-available;
}

.access-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-text h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 6px;
}

.header-text p {
  color: #4a5568;
  font-size: 14px;
}

.lock-icon {
  width: 40px;
  height: 40px;
}

.primary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-card h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.info-card p {
  font-size: 14px;
  color: #4a5568;
  margin-bottom: 16px;
  line-height: 1.7;
}

.secondary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
}

.invalid-subscription {
  color: #f44336 !important;
}

.disable-button {
  background-color: #ebeeFD;
  color: #101010;
  border: none;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

.tab-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>