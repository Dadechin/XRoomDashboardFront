<template>
  <div class="tab-content">
    <div class="team-logo">
      <div class="card-title">
        <h2>لوگوی تیم</h2>
        <p>این لوگو در اتاق‌های شما استفاده خواهد شد. توصیه می‌کنیم از یک تصویر شفاف با نسبت تصویر 2:1 استفاده کنید.</p>
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
              <g clip-path="url(#clip0_312_7133)">
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
              </g>
              <defs>
                <clipPath id="clip0_312_7133">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
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
          <span>به این ترتیب لوگوی تیم شما در اتاق‌های شما به نظر می‌رسد.</span>
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
            <label for="company_name">نام شرکت</label>
            <input
              id="company_name"
              type="text"
              v-model="form.companyName"
            />
          </div>
          <div class="form-group">
            <label for="type_activity">نوع فعالیت شرکت</label>
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
export default {
  name: 'TeamDetails',
  data() {
    return {
      form: {
        teamName: '',
        companyName: '',
        activityType: '',
      },
      teamLogo: null,
      uploadedLogoFile: null,
      sampleLogos: [
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
        { path: '/img/sample-logo.png', alt: 'نمونه لوگو' },
      ],
    };
  },
  methods: {
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.teamLogo = URL.createObjectURL(file);
        this.uploadedLogoFile = file;
      }
    },
    submitForm() {
      // Check if there's any data to submit
      const hasFormData = this.form.teamName || this.form.companyName || this.form.activityType;
      const hasLogo = !!this.uploadedLogoFile;

      if (!hasFormData && !hasLogo) {
        alert('لطفاً حداقل یک فیلد یا لوگو را وارد کنید.');
        return;
      }

      // Prepare data to emit, including only non-empty fields
      const formData = {};
      if (this.form.teamName) formData.teamName = this.form.teamName;
      if (this.form.companyName) formData.companyName = this.form.companyName;
      if (this.form.activityType) formData.activityType = this.form.activityType;
      if (hasLogo) formData.teamLogo = this.uploadedLogoFile;

      this.$emit('update:teamData', formData);

      // Reset form and logo
      this.form = {
        teamName: '',
        companyName: '',
        activityType: '',
      };
      this.teamLogo = null;
      this.uploadedLogoFile = null;
      // Reset file input
      const fileInput = this.$refs.fileUpload;
      if (fileInput) {
        fileInput.value = '';
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
  width: 49%;
  background-color: #ffffff;
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
</style>