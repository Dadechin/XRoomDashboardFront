<template>
  <div class="tab-content">
    <!-- Team Info Section -->
    <div class="team-info">
      <div class="card-title">
        <div class="title-with-image">
          <h2>جزئیات تیم</h2>
          <div v-if="form.image" class="team-image">
            <img :src="form.image" alt="تصویر تیم" />
          </div>
        </div>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="team_name">نام تیم</label>
            <input id="team_name" type="text" v-model="form.teamName" />
          </div>
 
        

          <div class="form-group">
            <label for="type_activity">نوع فعالیت</label>
            <input id="type_activity" type="text" v-model="form.activityType" />
          </div>
          <div class="form-group">
            <label for="max_persons">حداکثر اعضا</label>
            <input id="max_persons" type="number" v-model="form.maxPersons" min="1" />
          </div>

          <!-- New file input -->
          <div class="form-group">
            <label for="team_image">تصویر پروفایل تیم</label>
            <input id="team_image" type="file" @change="uploadImage" />
          </div>

          <button type="submit" class="submit-btn">تایید</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeamDetails",
  data() {
    return {
      form: {
        teamName: "",
        activityType: "",
        maxPersons: null,
        teamId: null,
        image: null, // ✅ add image
      },
      baseUrl: "https://my.xroomapp.com/api",
    };
  },
  created() {
    this.fetchTeamData();
  },
  methods: {
  async fetchTeamData() {
    const Toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${this.baseUrl}/get_team`, {
        headers: { Authorization: `Token ${token}` },
      });

      const team = response.data.teams[0];
      if (team) {
        this.form.image = "https://my.xroomapp.com" + team.image;
        console.log(this.form.image);
        this.form.teamName = team.name || "";
        this.form.activityType = team.description || "";
        this.form.maxPersons = team.max_persons || null;
        this.form.teamId = team.id;
        
        
      } else {
        Toast.fire({ icon: "error", title: "هیچ اطلاعاتی برای تیم یافت نشد." });
      }
    } catch (error) {
      Toast.fire({ icon: "error", title: "خطا در بارگذاری اطلاعات تیم." });
      console.error("Fetch team error:", error);
    }
  },

  async uploadImage(event) {
    const file = event.target.files[0];
    if (!file || !this.form.teamId) return;

    const Toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);
      formData.append("team_id", this.form.teamId);

      const response = await axios.post(
        `${this.baseUrl}/teams/upload_image/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Toast.fire({ icon: "success", title: "تصویر تیم با موفقیت بارگذاری شد." });
      console.log("Image uploaded:", response.data);

      // Refresh data if needed
      this.fetchTeamData();
    } catch (error) {
      Toast.fire({ icon: "error", title: "خطا در بارگذاری تصویر." });
      console.error("Upload image error:", error);
    }
  },

  async submitForm() {
    const Toast = this.$swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    if (!this.form.teamName && !this.form.activityType && !this.form.maxPersons) {
      Toast.fire({ icon: "error", title: "لطفاً حداقل یک فیلد وارد کنید." });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${this.baseUrl}/editTeam/`,
        {
          team_id: this.form.teamId,
          name: this.form.teamName,
          description: this.form.activityType,
          max_persons: this.form.maxPersons,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      console.log(response.data);

      Toast.fire({ icon: "success", title: "اطلاعات تیم با موفقیت به‌روزرسانی شد." });

      // refresh data
      this.fetchTeamData();
    } catch (error) {
      Toast.fire({ icon: "error", title: "خطا در به‌روزرسانی اطلاعات تیم." });
      console.error("Update team error:", error);
    }
  },
}

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



.title-with-image {
  display: flex;
  align-items: center;
  gap: 2.5rem; /* smaller gap so it looks stuck */
}

.title-with-image h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.team-image img {
  height: 90px;
  width: 90px;
  object-fit: cover;
  border-radius: 50%; /* round avatar */
  margin-right: 4px;   /* small spacing in RTL */
}

</style>