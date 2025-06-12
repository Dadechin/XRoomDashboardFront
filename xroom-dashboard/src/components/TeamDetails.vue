<template>
  <div class="tab-content">
    <!-- Team Logo Section -->
    <div class="team-logo">
      <div class="card-title">
        <h2>لوگوی تیم</h2>
        <p>این لوگو در اتاق‌های شما نمایش داده می‌شود. توصیه می‌شود از تصویر شفاف با نسبت 2:1 استفاده کنید.</p>
      </div>
      <div class="logo-info">
        <img :src="teamLogo || require('@/assets/img/team-logo.jpg')" alt="team logo" />
        <label for="file-upload">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2.66602 11.3333V12.6666C2.66602 13.0202 2.80649 13.3593 3.05654 13.6094C3.30659 13.8594 3.64573 13.9999 3.99935 13.9999H11.9993C12.353 13.9999 12.6921 13.8594 12.9422 13.6094C13.1922 13.3593 13.3327 13.0202 13.3327 12.6666V11.3333"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 2.66675V10.6667"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>آپلود</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style="display: none;"
          @change="handleLogoUpload"
          ref="fileUpload"
        />
      </div>
      <div class="logo-sample">
        <div class="logo-sample-title">
          <h2>نمونه</h2>
          <span>نمایش لوگوی تیم شما در اتاق‌ها به این شکل خواهد بود.</span>
        </div>
        <div class="sample-logos">
          <img
            v-for="(logo, index) in sampleLogos"
            :key="index"
            :src="require(`@/assets${logo.path}`)"
            :alt="logo.alt"
          />
        </div>
      </div>
    </div>

    <!-- Team Info Section -->
    <div class="team-info">
      <div class="card-title">
        <h2>جزئیات تیم</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="team_name">نام تیم</label>
            <input
              id="team_name"
              type="text"
              v-model="form.teamName"
            />
          </div>
          <div class="form-group">
            <label for="type_activity">نوع فعالیت</label>
            <input
              id="type_activity"
              type="text"
              v-model="form.activityType"
            />
          </div>
          <button type="submit" class="submit-btn">تایید</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeamDetails',
  data() {
    return {
      form: {
        teamName: '',
        activityType: '',
        teamId: null,
      },
      teamLogo: null,
      uploadedLogoFile: null,
      sampleLogos: [
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
      ],
      baseUrl: 'http://my.xroomapp.com:8000',
    };
  },
  created() {
    this.fetchTeamData();
  },
  methods: {
    async fetchTeamData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت یافت نشد.');
        const response = await axios.get(`${this.baseUrl}/get_team`, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' },
        });
        const team = response.data.teams[0];
        if (team) {
          this.form.teamName = team.name || '';
          this.form.activityType = team.description || '';
          this.form.teamId = team.id;
          this.teamLogo = team.logo ? `${this.baseUrl}${team.logo}` : null;
        } else {
          alert('هیچ اطلاعاتی برای تیم یافت نشد.');
        }
      } catch {
        alert('خطا در بارگذاری اطلاعات تیم.');
      }
    },
    handleLogoUpload(event) {
      this.uploadedLogoFile = event.target.files[0];
      if (this.uploadedLogoFile) {
        this.teamLogo = URL.createObjectURL(this.uploadedLogoFile);
      }
    },
    async submitForm() {
      if (!this.form.teamName && !this.form.activityType && !this.uploadedLogoFile) {
        alert('لطفاً حداقل یک فیلد یا لوگو وارد کنید.');
        return;
      }
      try {
        const formData = new FormData();
        if (this.form.teamName) formData.append('name', this.form.teamName);
        if (this.form.activityType) formData.append('description', this.form.activityType);
        if (this.uploadedLogoFile) formData.append('logo', this.uploadedLogoFile);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('توکن احراز هویت یافت نشد.');
        await axios.patch(`${this.baseUrl}/update_team/${this.form.teamId}/`, formData, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        this.$emit('update:team-data', {
          teamName: this.form.teamName,
          activityType: this.form.activityType,
          teamLogo: this.uploadedLogoFile,
        });
        alert('اطلاعات تیم با موفقیت به‌روزرسانی شد.');
        this.resetForm();
        await this.fetchTeamData();
      } catch {
        alert('خطا در به‌روزرسانی اطلاعات تیم.');
      }
    },
    resetForm() {
      this.form.teamName = '';
      this.form.activityType = '';
      this.teamLogo = null;
      this.uploadedLogoFile = null;
      if (this.$refs.fileUpload) {
        this.$refs.fileUpload.value = '';
      }
    },
  },
};
</script>

<style scoped>
.tab-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.team-logo,
.team-info {
  background: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 1.5rem;
}

.team-logo {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.card-title,
.logo-sample-title {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-title h2,
.logo-sample-title h2 {
  color: #101010;
  font-weight: 600;
  font-size: 20px;
}

.card-title p,
.logo-sample-title span {
  color: #5a6678;
  font-weight: 500;
  font-size: 17px;
  line-height: 190%;
  max-width: 90%;
}

.logo-sample-title {
  gap: 1rem !important;
}

.logo-sample {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem !important;
}

.logo-info {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo-info img {
  border-radius: 12px;
  height: 150px;
  max-width: 150px;
  width: 100%;
  object-fit: cover;
}

.logo-info label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #6dc993;
  padding: 10px 26px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}

.sample-logos {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.sample-logos img {
  height: 110px;
  width: 110px;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group label {
  font-weight: 500;
  width: 70%;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #718096;
  border-radius: 8px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
}

.submit-btn {
  background-color: #3a57e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  height: 50px;
  width: 60%;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  float: left;
  margin-top: 0.5rem;
}

/* Mobile (max-width: 600px) */
@media (max-width: 600px) {
  .tab-content {
    flex-direction: column;
    gap: 12px;
  }

  .team-logo {
    gap: 1rem;
  }

  .team-logo,
  .team-info {
    width: 100%;
    padding: 1rem;
  }

  .card-title h2,
  .logo-sample-title h2 {
    font-size: 16px;
  }

  .card-title p,
  .logo-sample-title span {
    font-size: 14px;
    max-width: 100%;
  }

  .logo-info {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  .logo-info img {
    height: 100px;
    max-width: 100px;
  }

  .logo-info label {
    font-size: 16px;
    padding: 8px 20px;
  }

  .sample-logos {
    justify-content: center;
  }

  .sample-logos img {
    height: 90px;
    width: 30%;
    object-fit: cover;
  }

  .form-group label {
    font-size: 14px;
    width: 100%;
  }

  .form-group input {
    font-size: 14px;
    padding: 6px;
  }

  .submit-btn {
    width: 100%;
    font-size: 16px;
    height: 40px;
  }
}

/* Tablet (min-width: 600px - max-width: 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .tab-content {
    flex-direction: column;
    gap: 14px;
  }

  .team-logo,
  .team-info {
    width: 100%;
    padding: 1.25rem;
  }

  .card-title h2,
  .logo-sample-title h2 {
    font-size: 18px;
  }

  .card-title p,
  .logo-sample-title span {
    font-size: 15px;
    max-width: 95%;
  }

  .logo-info {
    gap: 2rem;
  }

  .logo-info img {
    height: 120px;
    max-width: 120px;
  }

  .logo-info label {
    font-size: 16px;
    padding: 9px 22px;
  }

  .sample-logos img {
    height: 120px;
    width: 120px;
  }

  .form-group label {
    font-size: 15px;
    width: 80%;
  }

  .form-group input {
    font-size: 15px;
    padding: 7px;
  }

  .submit-btn {
    width: 100%;
    font-size: 17px;
    height: 45px;
  }
}

/* Small Laptop (min-width: 1024px - max-width: 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .team-logo,
  .team-info {
    width: 100%;
    padding: 1.25rem;
  }

  .card-title h2,
  .logo-sample-title h2 {
    font-size: 19px;
  }

  .card-title p,
  .logo-sample-title span {
    font-size: 16px;
    max-width: 90%;
  }

  .logo-info img {
    height: 130px;
    max-width: 130px;
  }

  .logo-info label {
    font-size: 17px;
    padding: 9px 24px;
  }

  .sample-logos img {
    height: 100px;
    width: 100px;
  }

  .form-group label {
    font-size: 15px;
  }

  .form-group input {
    font-size: 15px;
    padding: 7px;
  }

  .submit-btn {
    width: 70%;
    font-size: 17px;
    height: 45px;
  }
}

/* Desktop (min-width: 1280px) */
@media (min-width: 1280px) {
  .team-logo,
  .team-info {
    width: 49%;
  }
}
</style>