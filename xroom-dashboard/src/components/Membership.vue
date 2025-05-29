<template>
  <div class="tab-content">
    <div class="access-container">
      <!-- Header Section -->
      <div class="access-header">
        <div class="header-content">
          <img :src="require('@/assets/img/lock Icon.png')" alt="lock" class="lock-icon" />
          <div class="header-text">
            <h3>فعال‌سازی دسترسی XRoom</h3>
            <p>دسترسی کامل به امکانات XRoom بدون واترمارک</p>
          </div>
        </div>
        <button class="primary-button" @click="navigateToSubscription">
          <img :src="require('@/assets/img/hand.png')" alt="hand" class="button-icon" />
          <span>انتخاب طرح اشتراکی</span>
        </button>
      </div>

      <!-- Info Cards Section -->
      <div class="info-cards" v-if="isLoading">
        <div class="loading">در حال بارگذاری...</div>
      </div>
      <div class="info-cards" v-else-if="error">
        <div class="error">{{ error }} <button @click="retryFetch">تلاش مجدد</button></div>
      </div>
      <div class="info-cards" v-else>
        <!-- Billing Info Card -->
        <div class="info-card">
          <div class="card-content">
            <h4>{{ translations.billing.title }}</h4>
            <div class="billing-info">
              <p class="billing-address">{{ billingInfo.address }}</p>
              <p class="billing-phoneNum">
                {{ translations.billing.phone }}: <span>{{ billingInfo.phone }}</span>
              </p>
              <p class="billing-email">
                {{ translations.billing.email }}: <span>{{ billingInfo.email }}</span>
              </p>
            </div>
          </div>
          <button class="secondary-button" @click="openBillingModal">
            {{ translations.billing.editButton }}
          </button>
        </div>

        <!-- Memberships Card -->
        <div class="info-card">
          <div class="card-content">
            <h4>{{ translations.memberships.title }}</h4>
            <p class="memberships">
              {{ hasActiveSubscription ? translations.memberships.active : translations.memberships.inactive }}
            </p>
          </div>
          <button class="secondary-button" @click="manageMemberships">
            {{ translations.memberships.manageButton }}
          </button>
        </div>

        <!-- Payment Method Card -->
        <div class="info-card">
          <div class="card-content">
            <h4>{{ translations.payment.title }}</h4>
            <p class="payment-method">
              {{ paymentMethod || translations.payment.noMethod }}
            </p>
          </div>
        </div>

        <!-- Team Subscription Card -->
        <div class="info-card">
          <div class="card-content">
            <h4>{{ translations.subscription.title }}</h4>
            <div class="subscription-info" v-if="hasRemainingCapacity">
              <p class="subscription-all">
                {{ translations.subscription.total }}: <span>{{ subscriptionCount }} {{ translations.subscription.users }}</span>
              </p>
              <p class="subscription-remainder">
                {{ translations.subscription.remaining }}: <span>{{ remainingCapacity }} {{ translations.subscription.users }}</span>
              </p>
              <p class="subscription-added">
                {{ translations.subscription.added }}: <span>{{ teamMemberCapacity }} {{ translations.subscription.users }}</span>
              </p>
            </div>
            <p class="invalid-subscription" v-else>
              {{ translations.subscription.noActive }}
            </p>
          </div>
          <button
            :class="hasRemainingCapacity ? 'disable-button' : 'secondary-button'"
            :disabled="hasRemainingCapacity"
            @click="navigateToSubscription"
          >
            {{ hasRemainingCapacity ? translations.subscription.activeButton : translations.subscription.buyButton }}
          </button>
        </div>
      </div>

      <!-- Billing Modal -->
      <EditBillingModal
        :isVisible="isBillingModalVisible"
        @close="closeBillingModal"
        @update:billingInfo="updateBillingInfo"
      />
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
      validator: (value) => value >= 0,
    },
    teamMemberCapacity: {
      type: Number,
      required: true,
      validator: (value) => value >= 0,
    },
    isBillingModalVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      translations: {
        billing: {
          title: 'جزئیات صورتحساب',
          phone: 'شماره تماس',
          email: 'ایمیل',
          editButton: 'ویرایش جزئیات صورتحساب',
        },
        memberships: {
          title: 'عضویت‌ها',
          active: 'اشتراک فعال است',
          inactive: 'هنوز مجوزی فعال نیست. کاربران شما نمی‌توانند از XRoom با واترمارک استفاده کنند.',
          manageButton: 'مدیریت عضویت‌ها',
        },
        payment: {
          title: 'روش پرداخت',
          noMethod: 'هیچ روش پرداختی برای صورتحساب مرتبط نیست.',
        },
        subscription: {
          title: 'وضعیت اشتراک تیم',
          total: 'ظرفیت کل تیم',
          remaining: 'ظرفیت باقی‌مانده',
          added: 'کاربران اضافه کرده',
          users: 'کاربر',
          noActive: 'شما اشتراک فعالی ندارین، لطفا اشتراک جدیدی خریداری نمایید.',
          activeButton: 'اشتراک فعال دارید',
          buyButton: 'خرید اشتراک جدید',
        },
        error: {
          fetchFailed: 'خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.',
        },
      },
      billingInfo: {
        address: 'اصفهان، خیابان وحید، نبش خیابان حسین آباد، مجتمع عسگری ۳، واحد ۳ ۸۱۷۵۹۴۹۹۹۱',
        phone: '۰۹۳۷۹۸۹۸۶۲۳',
        email: 'aminimperator@gmail.com',
      },
      paymentMethod: null,
      hasActiveSubscription: false,
      isLoading: false,
      error: null,
    };
  },
  computed: {
    hasRemainingCapacity() {
      return this.subscriptionCount - this.teamMemberCapacity > 0;
    },
    remainingCapacity() {
      return this.subscriptionCount - this.teamMemberCapacity;
    },
  },
  created() {
    this.simulateFetch();
  },
  methods: {
    simulateFetch() {
      // شبیه‌سازی دریافت داده‌ها
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    retryFetch() {
      this.error = null;
      this.simulateFetch();
    },
    navigateToSubscription() {
      this.$emit('change-tab', 'buy-subscription');
    },
    openBillingModal() {
      this.$emit('update:isBillingModalVisible', true);
    },
    closeBillingModal() {
      this.$emit('update:isBillingModalVisible', false);
    },
    updateBillingInfo(newBillingInfo) {
      this.billingInfo = { ...newBillingInfo };
    },
    manageMemberships() {
      console.log('مدیریت عضویت‌ها');
    },
  },
};
</script>

<style scoped>

.access-container {
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
  padding: 20px 0;
  background-color: #f9f9fb;
  width: 100%;
}

.access-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-text {
  margin-right: 1.5rem;
}

.header-text h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
}

.header-text p {
  color: #5a6678;
  font-size: 14px;
}

.lock-icon {
  width: 75px;
  height: 75px;
}

.primary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.button-icon {
  margin-left: 10px;
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
  max-width: 32%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20rem;
}

.card-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.secondary-button,
.disable-button {
  border: none;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
}

.secondary-button {
  background-color: #3a57e8;
  color: white;
}

.disable-button {
  background-color: #ebeefd;
  color: #1a202c;
  cursor: not-allowed;
}

.billing-info,
.subscription-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.billing-address,
.memberships,
.payment-method,
.subscription-all,
.subscription-remainder,
.subscription-added {
  line-height: 190%;
  font-size: 16px;
  color: #5a6678;
}

.billing-phoneNum,
.billing-email,
.subscription-all,
.subscription-remainder,
.subscription-added {
  color: #1a202c;
}

.billing-phoneNum span,
.billing-email span,
.subscription-all span,
.subscription-remainder span,
.subscription-added span {
  color: #5a6678;
  font-size: 15px;
}

.invalid-subscription {
  color: #f44336;
  line-height: 190%;
  font-size: 15px;
}

.loading {
  margin-top: 2.5rem;
  text-align: center;
  font-size: 16px;
  color: #5a6678;
}

.error {
  text-align: center;
  color: #f44336;
  font-size: 16px;
}

.error button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>