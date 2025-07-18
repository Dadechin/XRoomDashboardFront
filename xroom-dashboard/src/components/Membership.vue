<template>
  <div class="tab-content">
    <!-- Access Container -->
    <div class="access-container">
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

      <!-- Info Cards -->
      <div class="info-cards">
        <div v-if="isLoading" class="loading">در حال بارگذاری...</div>
        <div v-else-if="error" class="error">
          {{ error }} <button @click="retryFetch">تلاش مجدد</button>
        </div>
        <template v-else>
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
          <div class="info-card">
            <div class="card-content">
              <h4>{{ translations.memberships.title }}</h4>
              <p class="memberships">
                {{ hasActiveSubscription ? translations.memberships.active : translations.memberships.inactive }}
              </p>
            </div>
            <button class="secondary-button" @click="navigateToSubscription">
              {{ translations.memberships.manageButton }}
            </button>
          </div>
          <div class="info-card">
            <div class="card-content">
              <h4>{{ translations.payment.title }}</h4>
              <p class="payment-method">
                {{ paymentMethod || translations.payment.noMethod }}
              </p>
            </div>
          </div>
          <div class="info-card">
            <div class="card-content">
              <h4>{{ translations.subscription.title }}</h4>
              <div v-if="hasRemainingCapacity" class="subscription-info">
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
              <p v-else class="invalid-subscription">
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
        </template>
      </div>

      <!-- Edit Billing Modal -->
      <EditBillingModal
        :is-visible="isBillingModalVisible"
        @close="closeBillingModal"
        @update:billing-info="updateBillingInfo"
      />
    </div>
  </div>
</template>

<script>
import EditBillingModal from '@/components/EditBillingModal.vue';

export default {
  name: 'Membership',
  components: { EditBillingModal },
  props: {
    subscriptionCount: { type: Number, required: true, validator: value => value >= 0 },
    teamMemberCapacity: { type: Number, required: true, validator: value => value >= 0 },
    isBillingModalVisible: { type: Boolean, default: false },
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
          inactive: 'هنوز مجوزی فعال نیست. کاربران شما نمی‌توانند از XRoom بدون واترمارک استفاده کنند.',
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
          added: 'کاربران اضافه شده',
          users: 'کاربر',
          noActive: 'شما اشتراک فعالی ندارید، لطفاً اشتراک جدیدی خریداری کنید.',
          activeButton: 'اشتراک فعال دارید',
          buyButton: 'خرید اشتراک جدید',
        },
        error: { fetchFailed: 'خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.' },
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
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.hasActiveSubscription = this.subscriptionCount > 0;
      } catch {
        this.error = this.translations.error.fetchFailed;
      } finally {
        this.isLoading = false;
      }
    },
    retryFetch() {
      this.error = null;
      this.fetchData();
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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem 0;
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
  height: 18rem;
  gap: 1rem;
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

/* Responsive Design */

/* Mobile (max-width: 600px) */
@media (max-width: 600px) {
  .access-container {
    padding: 10px;
  }

  .access-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    margin-bottom: 16px;
  }

  .header-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .header-text {
    margin-right: 0;
    margin-top: 0;
  }

  .header-text h3 {
    font-size: 16px;
    margin-bottom: 1rem;
  }

  .header-text p {
    font-size: 12px;
  }

  .lock-icon {
    width: 50px;
    height: 50px;
  }

  .primary-button {
    width: 100%;
    justify-content: center;
    padding: 10px;
    font-size: 12px;
    margin-top: 15px;
  }

  .info-cards {
    flex-direction: column;
    gap: 15px;
  }

  .info-card {
    max-width: 100%;
    height: auto;
    padding: 15px;
    gap: 1rem;
  }

  .card-content h4 {
    font-size: 16px;
    margin-bottom: 1rem;
  }

  .billing-address,
  .memberships,
  .payment-method,
  .subscription-all,
  .subscription-remainder,
  .subscription-added,
  .invalid-subscription {
    font-size: 14px;
  }

  .billing-phoneNum span,
  .billing-email span,
  .subscription-all span,
  .subscription-remainder span,
  .subscription-added span {
    font-size: 13px;
  }

  .secondary-button,
  .disable-button {
    font-size: 13px;
    padding: 8px 12px;
  }

  .loading,
  .error {
    font-size: 14px;
  }
}

/* Tablet (min-width: 600px - max-width: 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .access-container {
    padding: 15px;
  }

  .access-header {
    flex-direction: row;
    padding: 15px;
  }

  .header-text h3 {
    font-size: 18px;
  }

  .header-text p {
    font-size: 13px;
  }

  .lock-icon {
    width: 60px;
    height: 60px;
  }

  .primary-button {
    padding: 10px 20px;
    font-size: 13px;
  }

  .info-cards {
    gap: 15px;
  }

  .info-card {
    max-width: 48%;
    height: auto;
    padding: 15px;
    gap: 1rem;
  }

  .card-content h4 {
    font-size: 17px;
  }

  .billing-address,
  .memberships,
  .payment-method,
  .subscription-all,
  .subscription-remainder,
  .subscription-added,
  .invalid-subscription {
    font-size: 15px;
  }

  .billing-phoneNum span,
  .billing-email span,
  .subscription-all span,
  .subscription-remainder span,
  .subscription-added span {
    font-size: 14px;
  }

  .secondary-button,
  .disable-button {
    font-size: 14px;
    padding: 8px 14px;
  }
}

/* Small Desktop (min-width: 1024px - max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .access-container {
    padding: 15px;
  }

  .access-header {
    padding: 18px;
  }

  .header-text h3 {
    font-size: 19px;
  }

  .header-text p {
    font-size: 13px;
  }

  .lock-icon {
    width: 70px;
    height: 70px;
  }

  .primary-button {
    padding: 10px 20px;
    font-size: 13px;
  }

  .info-cards {
    gap: 18px;
  }

  .info-card {
    max-width: 48%;
    padding: 18px;
    gap: 1rem;
  }

  .card-content h4 {
    font-size: 17px;
  }

  .billing-address,
  .memberships,
  .payment-method,
  .subscription-all,
  .subscription-remainder,
  .subscription-added,
  .invalid-subscription {
    font-size: 15px;
  }

  .billing-phoneNum span,
  .billing-email span,
  .subscription-all span,
  .subscription-remainder span,
  .subscription-added span {
    font-size: 14px;
  }
}

/* Large Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  /* No changes needed as the original styles are optimized for this size */
}
</style>