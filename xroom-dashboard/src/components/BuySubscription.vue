<template>
  <div class="buy-subscription-container">
    <!-- Subscription Title -->
    <div class="subscription-title">
      <h3 style="text-align: center; margin-bottom: 20px;">لطفا نوع اشتراک خود را انتخاب کنید</h3>
      <span>مدل مجوزدهی انعطاف‌پذیر با پرداخت ماهانه به ازای هر کاربر. تعداد کاربران را می‌توان فوراً افزایش داد، اما کاهش مجوزها در پایان دوره‌ی صورتحساب اعمال می‌شود.</span>
    </div>

    <!-- User Count Selector -->
    <div class="user-count" style="text-align: start; margin: 3rem 0 2rem 0;">
      <label for="memberCount" style="margin-left: 10px;">تعداد کاربران:</label>
      <select
        id="memberCount"
        :value="memberCount"
        @change="updateMemberCount($event)"
      >
        <option v-for="count in availableMemberOptions" :key="count" :value="count">
          {{ count }} کاربر
        </option>
      </select>
    </div>

    <!-- Plan Cards -->
    <div class="plan-card-container">
      <div v-for="(plan, key) in plans" :key="key" class="plan-card">          
        <h4>{{ plan.name }}</h4>
        <div class="card-price-title">
          <p>{{ (plan.price * memberCount).toLocaleString() }} تومان</p>
          <small>برای {{ memberCount }} کاربر، در {{ plan.name.toLowerCase() }}</small>
        </div>
        <button class="primary-button" @click="selectPlan(key)">انتخاب طرح اشتراک</button>
      </div>
    </div>

    <!-- Invoice -->
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
      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; margin-bottom: 20px;">
        <span>مبلغ قابل پرداخت:</span>
        <span>{{ selectedPlan.total.toLocaleString() }} تومان</span>
      </div>
      <button class="primary-button" style="width: 100%;max-width: 100%;" @click="pay">پرداخت</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BuySubscription',
  props: {
    memberCount: { type: Number, default: 5 },
    availableMemberOptions: { type: Array, default: () => [5, 10, 20, 100] },
    baseUrl: { type: String, required: true },
    hasActiveSubscription: { type: Boolean, default: false },
    hasExpiredSubscription: { type: Boolean, default: false },
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
      if (this.selectedPlan) this.selectPlan(this.selectedPlan.name.toLowerCase());
    },
    selectPlan(planKey) {
      const plan = this.plans[planKey];
      if (!plan) return;
      const base = plan.price * this.memberCount;
      const tax = Math.round(base * 0.09);
      this.selectedPlan = { ...plan, basePrice: base, tax, total: base + tax };
    },
    async pay() {
      // Define Toast configuration with SweetAlert2
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimeritarian
          toast.onmouseleave = this.$swal.resumeTimer;
        },
      });

      if (this.hasActiveSubscription) {
        Toast.fire({
          icon: 'warning',
          title: 'شما اشتراک فعالی دارید و نمی‌توانید اشتراک دیگری خریداری کنید.',
        });
        return;
      }

      if (this.hasExpiredSubscription) {
        Toast.fire({
          icon: 'warning',
          title: 'شما یکبار اشتراک تهیه کردید و نمی‌توانید دوباره اشتراک تهیه کنید.',
        });
        return;
      }

      if (!this.selectedPlan) {
        Toast.fire({
          icon: 'error',
          title: 'لطفاً یک طرح اشتراک انتخاب کنید.',
        });
        return;
      }

      try {
        const startTime = new Date().toISOString();
        const endTime = this.calculateEndTime(this.selectedPlan.name);
        const subscriptionData = {
          user_count: this.memberCount,
          license_number: `ABC-${Math.random().toString(36).substr(2, 6).toUpperCase()}-XYZ`,
          startTime,
          endTime,
          price: this.selectedPlan.total,
        };

        const token = localStorage.getItem('token');
        if (!token) {
          Toast.fire({
            icon: 'error',
            title: 'توکن احراز هویت یافت نشد.',
          });
          throw new Error('Authentication token not found.');
        }

        const response = await axios.post(`${this.baseUrl}/add_subscription/`, subscriptionData, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        });

        this.$emit('payment-success', { subscriptionId: response.data.subscription_id });

        // Show success Toast
        Toast.fire({
          icon: 'success',
          title: 'اشFinally با موفقیت ثبت شد.',
        });

        this.selectedPlan = null;
      } catch (error) {
        let errorMessage = 'خطا در ثبت اشتراک. لطفاً دوباره تلاش کنید.';
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'توکن احراز هویت نامعتبر است.';
          } else if (error.response.status === 400) {
            errorMessage = 'اطلاعات ورودی نامعتبر است.';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        } else if (error.request) {
          errorMessage = 'مشکل در ارتباط با سرور. لطفاً دوباره تلاش کنید.';
        }

        // Show error Toast
        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });

        console.error('Error registering subscription:', error);
      }
    },
    calculateEndTime(planName) {
      const now = new Date();
      if (planName === 'هفتگی') {
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      } else if (planName === 'ماهانه') {
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
      } else {
        return new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();
      }
    },
  },
};
</script>


<style scoped>
.buy-subscription-container {
  direction: rtl;
  font-family: IRANSansXFaNum, sans-serif;
  padding: 1rem;
}

/* Base styles applied across all screen sizes */
.subscription-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.subscription-title h3 {
  color: #101010;
  font-weight: 600;
  font-size: 19px;
  line-height: 26.6px;
  margin-bottom: 1rem;
  text-align: center;
}

.subscription-title span {
  color: #4f5a69;
  line-height: 190%;
  font-size: 15px;
  font-weight: 500;
  text-align: right;
  max-width: 100%;
}

.user-count {
  text-align: start;
  margin: 2rem 0;
}

.user-count label {
  font-size: 15px;
  font-weight: 500;
  color: #101010;
  margin-left: 10px;
}

.user-count select {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  font-weight: 500;
  width: 150px;
}

.user-count select:focus {
  outline: none;
}

.plan-card {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: auto;
  min-height: 350px;
  border-radius: 20px;
  background: white;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  margin: 0 auto 1rem;
}

.plan-card::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 20px;
  background: linear-gradient(to right, #001940, #4364f7);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.plan-card h4 {
  font-size: 20px;
  font-weight: 500;
  color: #101010;
  margin-bottom: 1rem;
}

.card-price-title p {
  color: #101010;
  font-size: 20px;
  font-weight: 500;
  line-height: 140%;
  margin-bottom: 8px;
}

.card-price-title small {
  color: #718096;
  font-size: 15px;
  font-weight: 500;
  line-height: 190%;
}

.primary-button {
  position: relative;
  width: 100%;
  height: 46px;
  border-radius: 8px;
  background: white;
  color: black;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.8s ease, color 0.3s ease-in-out;
  border: none;
  cursor: pointer;
}

.primary-button::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 8px;
  background: linear-gradient(to right, #001940, #4364f7);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 0;
}

.primary-button:hover {
  color: #fff;
  background: linear-gradient(to right, #001940, #4364f7);
}

.invoice-box {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 400px;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.invoice-box h4 {
  font-size: 20px;
  font-weight: 500;
  color: #101010;
  margin-bottom: 1rem;
  text-align: center;
}

.invoice-box div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
  color: #4f5a69;
}

.invoice-box div:last-of-type {
  font-weight: bold;
  font-size: 16px;
  color: #101010;
  margin-bottom: 1.5rem;
}

/* Media Query for Tablets (600px < width ≤ 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .subscription-title h3 {
    font-size: 20px;
  }

  .subscription-title span {
    font-size: 16px;
    max-width: 90%;
  }

  .user-count label {
    font-size: 16px;
  }

  .user-count select {
    font-size: 16px;
    width: 180px;
  }

  .plan-card {
    width: 45%;
    height: 300px;
    min-height: auto;
  }

  .plan-card::before {
    padding: 1.5px;
  }

  .plan-card h4 {
    font-size: 24px;
  }

  .card-price-title p {
    font-size: 22px;
  }

  .card-price-title small {
    font-size: 16px;
  }

  .primary-button {
    font-size: 16px;
    max-width: 220px;
  }

  .invoice-box {
    max-width: 500px;
  }

  .invoice-box h4 {
    font-size: 22px;
  }

  .invoice-box div {
    font-size: 16px;
  }

  .invoice-box div:last-of-type {
    font-size: 17px;
  }

  .plan-card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
}

/* Media Query for Small Desktops (1024px < width ≤ 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .subscription-title h3 {
    font-size: 20px;
    margin-bottom: 1rem;
  }

  .subscription-title span {
    font-size: 16px;
    max-width: 90%;
  }

  .user-count label {
    font-size: 16px;
  }

  .user-count select {
    font-size: 16px;
    width: 180px;
  }

  .plan-card {
    width: 48%;
    height: 300px;
    min-height: auto;
  }


  .plan-card h4 {
    font-size: 24px;
  }

  .card-price-title p {
    font-size: 22px;
  }

  .card-price-title small {
    font-size: 16px;
  }

  .primary-button {
    font-size: 16px;
    max-width: 220px;
  }

  .invoice-box {
    max-width: 500px;
  }

  .plan-card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
}

/* Media Query for Large Desktops (width > 1280px) */
@media (min-width: 1280px) {
  .subscription-title h3 {
    font-size: 21px;
  }

  .subscription-title span {
    font-size: 17px;
    max-width: 90%;
  }

  .user-count label {
    font-size: 17px;
  }

  .user-count select {
    font-size: 17px;
    width: 200px;
  }

  .plan-card {
    width: 287px;
    height: 400px;
    min-height: auto;
  }

  .plan-card::before {
    padding: 2px;
  }

  .plan-card h4 {
    font-size: 24px;
  }

  .card-price-title p {
    font-size: 24px;
  }

  .card-price-title small {
    font-size: 17px;
  }

  .primary-button {
    font-size: 17px;
    max-width: 220px;
  }

  .invoice-box {
    max-width: 500px;
  }

  .plan-card-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }
}
</style>