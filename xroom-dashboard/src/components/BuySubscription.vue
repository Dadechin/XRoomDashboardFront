<template>
  <div class="buy-subscription-container">
    <div class="subscription-title">
      <h3 style="text-align: center; margin-bottom: 20px;">
        لطفا نوع اشتراک خود را انتخاب کنید
      </h3>
      <span>
        ما مدل مجوزدهی انعطاف‌پذیری ارائه می‌دهد. شما می‌توانید به‌صورت ماهانه و به ازای هر کاربر پرداخت کنید. تعداد کاربران را می‌توان فوراً افزایش داد، اما در صورت کاهش مجوزها، تغییرات در پایان دوره‌ی صورتحساب اعمال خواهند شد.
      </span>
    </div>

    <div class="user-count" style="text-align: start; margin: 3rem 0 2rem 0;">
      <label for="memberCount" style="margin-left: 10px;">تعداد کاربران : </label>
      <select
        id="memberCount"
        :value="memberCount"
        @change="updateMemberCount($event)">
        <option v-for="count in availableMemberOptions" :key="count" :value="count">
          {{ count }} کاربر
        </option>
      </select>
    </div>

    <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
      <div class="plan-card">
        <div class="card-inner">
          <h4>هفتگی</h4>
          <div class="card-price-title">
            <p>{{ (plans.weekly.price * memberCount).toLocaleString() }} تومان</p>
            <small>برای {{ memberCount }} کاربر، در هفته</small>
          </div>
          <button class="primary-button" @click="selectPlan('weekly')">
            انتخاب طرح اشتراک
          </button>
        </div>
      </div>
      <div class="plan-card">
        <div class="card-inner">
          <h4>ماهانه</h4>
          <div class="card-price-title">
            <p>{{ (plans.monthly.price * memberCount).toLocaleString() }} تومان</p>
            <small>برای {{ memberCount }} کاربر، در ماه</small>
          </div>
          <button class="primary-button" @click="selectPlan('monthly')">
            انتخاب طرح اشتراک
          </button>
        </div>
      </div>
      <div class="plan-card">
        <div class="card-inner">
          <h4>سالانه</h4>
          <div class="card-price-title">
            <p>{{ (plans.yearly.price * memberCount).toLocaleString() }} تومان</p>
            <small>برای {{ memberCount }} کاربر، در سال</small>
          </div>
          <button class="primary-button" @click="selectPlan('yearly')">
            انتخاب طرح اشتراک
          </button>
        </div>
      </div>
    </div>

    <!-- فاکتور -->
    <div
      v-if="selectedPlan"
      class="invoice-box"
      style="margin-top: 40px; background: white; padding: 20px; border-radius: 12px; max-width: 400px; margin-right: auto; margin-left: auto;"
    >
      <h4 style="margin-bottom: 16px;">پیش‌فاکتور اشتراک {{ selectedPlan.name }}</h4>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>قیمت پایه:</span>
        <span>{{ selectedPlan.basePrice.toLocaleString() }} تومان</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>مالیات (۹٪):</span>
        <span>{{ selectedPlan.tax.toLocaleString() }} تومان</span>
      </div>
      <div
        style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-bottom: 20px;"
      >
        <span>مبلغ قابل پرداخت:</span>
        <span>{{ selectedPlan.total.toLocaleString() }} تومان</span>
      </div>
      <button class="primary-button" style="width: 100%;" @click="pay">
        پرداخت
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BuySubscription',
  props: {
    memberCount: {
      type: Number,
      default: 5,
    },
    availableMemberOptions: {
      type: Array,
      default: () => [5, 10, 20, 100],
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedPlan: null,
      plans: {
        weekly: { name: 'هفتگی', price: 250000 },
        monthly: { name: 'ماهانه', price: 670000 },
        yearly: { name: 'سالانه', price: 4600000 },
      },
    };
  },
  methods: {
    updateMemberCount(event) {
      const newCount = Number(event.target.value);
      this.$emit('update:memberCount', newCount);
      if (this.selectedPlan) {
        this.selectPlan(
          this.selectedPlan.name === 'هفتگی' ? 'weekly' : this.selectedPlan.name === 'ماهانه' ? 'monthly' : 'yearly'
        );
      }
    },
    selectPlan(planKey) {
      const plan = this.plans[planKey];
      if (!plan) return;

      const base = plan.price * this.memberCount;
      const tax = Math.round(base * 0.09);

      this.selectedPlan = {
        ...plan,
        basePrice: base,
        tax,
        total: base + tax,
      };
      this.$emit('plan-selected', this.selectedPlan);
    },
    async pay() {
      if (!this.selectedPlan) {
        alert('لطفاً ابتدا یک طرح اشتراک انتخاب کنید.');
        return;
      }

      try {
        const startTime = new Date().toISOString();
        let endTime;
        if (this.selectedPlan.name === 'هفتگی') {
          endTime = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
        } else if (this.selectedPlan.name === 'ماهانه') {
          endTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
        } else if (this.selectedPlan.name === 'سالانه') {
          endTime = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();
        }

        const subscriptionData = {
          user_count: this.memberCount,
          license_number: `ABC-${Math.random().toString(36).substr(2, 6).toUpperCase()}-XYZ`,
          startTime: startTime,
          endTime: endTime,
          price: this.selectedPlan.total,
        };

        const token = localStorage.getItem('token');
        await axios.post(`${this.baseUrl}/add_subscription/`, subscriptionData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        alert(`پرداخت با موفقیت انجام شد برای ${this.memberCount} کاربر`);
        this.selectedPlan = null;
        this.$emit('payment-success');
      } catch (error) {
        alert('خطا در ثبت اشتراک. لطفاً دوباره تلاش کنید.');
      }
    },
  },
};
</script>

<style scoped>
.buy-subscription-container {
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
}

.plan-card {
   background-color: white;
    border-radius: 16px;
    padding: 1px 1px 2px 1px;
    width: 32%;
    text-align: center;
    height: 25rem;
    background: linear-gradient(to right, #001940, #4364F7);
}

.card-inner {
    background-color: white;
    border-radius: 14px;
    height: 100%;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 4rem;
}

.plan-card h4 {
  font-size: 25px;
  color: #101010;
  margin-bottom: 10px;
}


.primary-button {
  background-color: #3a57e8;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
}

.primary-button:hover {
  background-color: #2e45c8;
}

.subscription-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.subscription-title h3 {
    color: #101010;
    font-weight: 600;
    font-size: 20px;
}

.subscription-title span {
    color: #4F5A69;
    line-height: 190%;
    font-size: 16px;
}

.user-count select {
padding: 8px 12px;
border-radius: 8px;
border-left: 16px solid transparent !important;
box-shadow: #00000029 0px 1px 4px 0px;
border: none;
}

.user-count select:focus {
outline: none;
}

.card-price-title p{
    color: #101010;
    font-size: 20px;
    line-height: 140%;
    margin-bottom: 8px;
}

.card-price-title small {
    color: #8D99AB;
    font-size: 17px;
    line-height: 140%;
    margin-top: 10px;
}
</style>