<template>
        <div>
            <!-- Top Header -->
            <AppHeader pageTitle="دانلود  ها" />

            <!-- Description -->
            <div class="section-description">
                <div class="section-title">دانلود XRoom</div>
                <p class="title-description">
                    برای شروع , برنامه XRoom را برای پلتفرم خود دانلود کنید
                </p>
            </div>

            <!-- Choose Device -->
             <div class="chose-device">
                <div class="section-title">لطفا پلتفرم خود را انتخاب کنید :</div>
                
                    <div class="cards">
                        <div class="platform-card" v-for="(item, index) in platforms" :key="index">
                            <div class="card-objects">
                                <img :src="item.img" :alt="item.title" :style="item.imgStyle" />

                                <p class="card-title">{{ item.title }}</p>

                                <span class="card-subtitle">{{ item.subtitle }}</span>

                                <router-link
                                to="/dashboard/download"
                                :class="item.buttonText === 'دانلود اپلیکیشن' ? 'active-button' : 'disabled-button'"
                                >
                                {{ item.buttonText }}
                                </router-link>
                            </div>
                        </div>
                    </div>
             </div>

             <!-- download instructions -->
              <span class="instructions-text">
                برای دستورالعمل‌های نصب ، حتماً از <router-link to="/dashboard/download" style="color: #3A57E8;">پایگاه دانش ما</router-link> دیدن کنید.
              </span>
        </div>
</template>

<script>

export default {
  name: 'DashboardPage',
  components: {

  },
  data () {
    return {
        platforms: [
        {
          title: "Headsets",
          subtitle: "Meta Quest 2, Meta Quest Pro, Meta Quest 3",
          img: require("@/assets/img/image11.png"),
          imgStyle: "width: 70px;height: 80px;",
          buttonText: "دانلود اپلیکیشن",
        },
        {
          title: "Windows",
          subtitle: "Desktop mode for PC",
          img: require("@/assets/img/image10.png"),
          imgStyle: "width: 90px;height: 80px;",
          buttonText: "بزودی",
        },
      ],
    }
  }
}
</script>

<style scoped>

/*   .dashboard-page {
    margin-right: 360px;
    padding: 20px;
    direction: rtl;
    font-family: IRANSansXFaNum, sans-serif;
  }
  .content {
    background-color: #f8f9fa;
    border-radius: 20px;
    padding: 35px 80px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
 */
.section-title {
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
}

.section-description {
    margin-bottom: 3rem;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
  margin: 1rem 0 3rem;
}

.section-description p {
    line-height: 190%;
    color: #4F5A69;
    font-size: 16px;
    margin-top: 1rem;
}

  .chose-device {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .cards {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 2.5rem;
  }

  .card-border {
  background: linear-gradient(to right, #001940, #4364F7);
  padding: 2px 1px;
  border-radius: 20px;
  width: 287px;
  height: 442px;
  margin-left: 2.5rem;
}

.platform-card {
  position: relative;
  width: 287px;
  height: 442px;
  border-radius: 20px;
  background: white;
  z-index: 0;
  overflow: hidden;
  margin-left: 2.5rem;
}

.platform-card::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2.5px;
  border-radius: 20px;
  background: linear-gradient(to right, #001940, #4364F7);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}


  .card-objects {
    text-align: center;
    padding: 2.5rem 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .card-title {
    font-size: 24px;
    font-weight: 500;
  }

  .card-subtitle {
    font-size: 17px;
    font-weight: 500;
    color : #718096;
    max-width: 220px;
  }

.active-button {
  position: relative;
  width: 207px;
  height: 46px;
  border-radius: 8px;
  background: white;
  z-index: 0;
  overflow: hidden;
  color: black;
  font-size: 17px;
  font-weight: 500;
  padding-top: 5%;
  transition: background 0.8s ease, color 0.6s ease-in-out;
}

.active-button::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 8px;
  background: linear-gradient(to right, #001940, #4364F7);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.active-button:hover {
  background: linear-gradient(to right, #001940, #4364F7);
  color: #fff;
}

.disabled-button {
    width: 207px;
    height: 46px;
    color: #111;
    background-color: #E6E6E6;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 500;
    padding-top: 5%;
}

.instructions-text {
    font-size: 15px;
    font-weight: 600;
    color: #4F5A69;
}

</style>