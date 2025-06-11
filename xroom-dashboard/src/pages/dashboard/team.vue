<template>
  <div>
    <!-- Section Description -->
    <div class="section-description">
      <div class="section-title">مدیریت اعضا</div>
      <p>در این بخش می‌توانید اتاق‌ها، فایل‌ها و جلسات را با همکاران خود به اشتراک بگذارید و تیم خود را مدیریت کنید.</p>
    </div>

    <!-- Tab Buttons -->
    <div class="tab-buttons">
      <button
        :class="['tab-btn', { active: activeTab === 'users' }]"
        @click="activeTab = 'users'"
      >کاربران</button>
      <button
        :class="['tab-btn', { active: activeTab === 'buy-subscription' }]"
        @click="activeTab = 'buy-subscription'"
      >خرید اشتراک</button>
      <button
        :class="['tab-btn', { active: activeTab === 'membership' }]"
        @click="activeTab = 'membership'"
      >اشتراک‌ها</button>
      <button
        :class="['tab-btn', { active: activeTab === 'details' }]"
        @click="activeTab = 'details'"
      >جزئیات</button>
    </div>

    <!-- Tab Content -->
    <div v-if="activeTab === 'users'">
      <TeamUser
        :user-list="userList"
        :team-member-capacity="teamMemberCapacity"
        :subscription-count="subscriptionCount"
        :has-active-subscription="hasActiveSubscription"
        @add-user="submitNewUser"
        @change-tab="changeTab"
      />
    </div>
    <div v-if="activeTab === 'membership'">
      <Membership
        :subscription-count="subscriptionCount"
        :team-member-capacity="teamMemberCapacity"
        :is-billing-modal-visible="isBillingModalVisible"
        @change-tab="changeTab"
        @update:is-billing-modal-visible="isBillingModalVisible = $event"
      />
    </div>
    <div v-if="activeTab === 'details'">
      <TeamDetails @update:team-data="handleTeamData" />
    </div>
    <div v-if="activeTab === 'buy-subscription'">
      <BuySubscription
        :member-count="memberCount"
        :available-member-options="availableMemberOptions"
        :base-url="baseUrl"
        :has-active-subscription="hasActiveSubscription"
        :has-expired-subscription="hasExpiredSubscription"
        @update:member-count="memberCount = $event"
        @payment-success="handlePaymentSuccess"
      />
    </div>
  </div>
</template>

<script>
import TeamUser from '@/components/TeamUser.vue';
import BuySubscription from '@/components/BuySubscription.vue';
import Membership from '@/components/Membership.vue';
import TeamDetails from '@/components/TeamDetails.vue';
import axios from 'axios';

export default {
  name: 'Team',
  components: { TeamUser, BuySubscription, Membership, TeamDetails },
  data() {
    return {
      activeTab: 'users',
      userList: [],
      memberCount: 5,
      availableMemberOptions: [5, 10, 20, 100],
      teamMemberCapacity: 0,
      subscriptionCount: 0,
      hasActiveSubscription: false,
      hasExpiredSubscription: false, // جدید: بررسی اشتراک منقضی‌شده
      subscriptionEndTime: null, // جدید: ذخیره تاریخ انقضای اشتراک
      teamId: null,
      subscriptionId: null,
      isBillingModalVisible: false,
      baseUrl: 'http://my.xroomapp.com:8000',
    };
  },
  created() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      const tab = this.$route.query.tab;
      if (tab) this.activeTab = tab;
      await Promise.all([
        this.fetchUserData(),
        this.fetchTeamMemberInfo(),
        this.fetchTeamData(),
      ]);
    },
    changeTab(tabName) {
      this.activeTab = tabName;
    },
    async fetchTeamData() {
      try {
        const response = await this.axiosGet('/get_team');
        const team = response.data.teams[0];
        this.teamId = team?.id || null;
      } catch (error) {
        console.error('Error fetching team data:', error);
        alert('خطا در بارگذاری اطلاعات تیم.');
      }
    },
    async fetchTeamMemberInfo() {
      try {
        const response = await this.axiosGet('/get_all_team_members');
        this.userList = response.data.members.map(member => ({
          name: `${member.user.first_name} ${member.user.last_name}`,
          email: member.user.username,
          role: member.semat || 'کاربر',
          version: 'نسخه آزمایشی',
          avatar: member.profile_img || 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
        }));
        this.teamMemberCapacity = response.data.members.length;
      } catch (error) {
        console.error('Error fetching team members:', error);
        alert('خطا در بارگذاری اطلاعات اعضای تیم.');
      }
    },
    async fetchUserData() {
      try {
        const response = await this.axiosGet('/get_user_subscriptions');
        const subscriptions = response.data.subscriptions || [];
        this.subscriptionCount = subscriptions.reduce((total, sub) => total + sub.user_count, 0);
        this.subscriptionId = subscriptions[0]?.id || null;
        this.subscriptionEndTime = subscriptions[0]?.endTime || null; // جدید: تاریخ انقضا
        const now = new Date();
        const isExpiredByTime = this.subscriptionEndTime && new Date(this.subscriptionEndTime) < now;
        const isExpiredByCapacity = this.subscriptionCount <= this.teamMemberCapacity;
        this.hasActiveSubscription = subscriptions.length > 0 && !isExpiredByTime && !isExpiredByCapacity;
        this.hasExpiredSubscription = subscriptions.length > 0 && (isExpiredByTime || isExpiredByCapacity);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('خطا در بارگذاری اطلاعات اشتراک.');
      }
    },
    async handlePaymentSuccess({ subscriptionId }) {
      try {
        this.subscriptionId = subscriptionId;
        await Promise.all([
          this.fetchUserData(),
          this.fetchTeamMemberInfo(),
          this.fetchTeamData(),
        ]);

        if (!this.teamId && this.subscriptionId) {
          await this.createTeam();
          alert('اشتراک و تیم به درستی ساخته شد.');
        } else if (this.teamId) {
          alert('تیم از قبل وجود دارد.');
        }
        this.activeTab = 'membership';
      } catch (error) {
        console.error('Error handling payment success:', error);
        alert('خطا در پردازش پرداخت یا ساخت تیم.');
      }
    },
    async createTeam() {
      const teamData = {
        name: 'تیم 1',
        description: 'فعالیت',
        max_persons: this.subscriptionCount.toString(),
        subscriptionId: this.subscriptionId,
      };
      await this.axiosPost('/add_team', teamData);
      await this.fetchTeamData();
    },
    async submitNewUser(newUser) {
      if (this.subscriptionCount - this.teamMemberCapacity <= 0) {
        alert('اشتراک فعالی ندارید , اشتراک تهیه نمایید.');
        this.activeTab = 'buy-subscription';
        return;
      }
      if (!this.teamId) {
        alert('خطا: اطلاعات تیم یافت نشد.');
        return;
      }
      try {
        await this.axiosPost('/add_teamMember/', { ...newUser, teamId: this.teamId });
        this.userList.push({
          ...newUser,
          avatar: 'https://models.readyplayer.me/681f59760bc631a87ad25172.png',
          role: newUser.role || 'کاربر',
          version: newUser.version || 'نسخه آزمایشی',
        });
        this.teamMemberCapacity++;
        await this.fetchTeamMemberInfo();
        alert('کاربر با موفقیت اضافه شد.');
      } catch (error) {
        console.error('Error adding user:', error);
        alert('خطا در اضافه کردن کاربر.');
      }
    },
    handleTeamData(data) {
      console.log('Team data updated:', data);
    },
    async axiosGet(endpoint) {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('توکن احراز هویت یافت نشد.');
      return await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
      });
    },
    async axiosPost(endpoint, data) {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('توکن احراز هویت یافت نشد.');
      return await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
      });
    },
  },
  watch: {
    '$route.query.tab'(newTab) {
      if (newTab) this.activeTab = newTab;
    },
  },
};
</script>


<style scoped>

.section-title {
  font-weight: 700;
  color: #101010;
  font-size: 19px;
  line-height: 26.6px;
}

.section-description {
  margin: 1rem 0 3rem;
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
}

.section-description p {
  line-height: 190%;
  color: #4f5a69;
  font-size: 15px;
  margin-top: 1rem;
  font-weight: 500;
  text-align: justify;
}

.tab-buttons {
  display: flex;
  gap: 25px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  padding : 8px;
}

.tab-btn {
  background: none;
  border: none;
  color: gray;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  padding-right: 0px;
  padding-left: 0;
}

.tab-btn.active {
  color: #3a57e8;
  border-bottom: 2px solid #3a57e8;
  font-size: 16px;
}

@media (min-width: 600px) and (max-width: 1024px) {
  .tab-buttons {
    justify-content: flex-start;
  }
}


@media (min-width: 1024px) and (max-width: 1280px) {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #101010;
    margin: 20px 0 10px;
  }
}


@media (min-width: 1280px) {
  .section-title {
    font-size: 21px;
  }

  .section-description p {
    font-size: 17.5px;
  }
  .tab-btn {
    font-size: 18px;
    padding: 8px 16px;
  }

  .tab-btn.active {
    font-size: 21px;
  }

  .tab-buttons {
    padding: 0;
    justify-content: flex-start;
  }
}


</style>