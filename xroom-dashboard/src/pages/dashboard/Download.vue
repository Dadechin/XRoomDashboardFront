<template>
        <div>
            <!-- Top Header -->

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

/* Base styles applied across all screen sizes */
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

.chose-device {
  margin: 1.5rem 0;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.platform-card {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: auto;
  min-height: 320px;
  border-radius: 20px;
  background: white;
  overflow: hidden;
  margin: 0;
  isolation: isolate;
}

.platform-card::before {
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

.card-objects {
  text-align: center;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 320px;
  gap: 1rem;
}

.card-title {
  font-size: 20px;
  font-weight: 500;
}

.card-subtitle {
  font-size: 15px;
  font-weight: 500;
  color: #718096;
  max-width: 80%;
  line-height: 190%;
}

.active-button {
  position: relative;
  width: 80%;
  max-width: 207px;
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
}

.active-button::before {
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

.active-button:hover {
  color: #fff;
  background: linear-gradient(to right, #001940, #4364f7);
}

.disabled-button {
  width: 80%;
  max-width: 207px;
  height: 46px;
  color: #111;
  background-color: #e6e6e6;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instructions-text {
  font-size: 14px;
  font-weight: 600;
  color: #4f5a69;
  display: block;
  text-align: center;
  margin-top: 1.5rem;
}

/* Media Query for Tablets (600px < width ≤ 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .section-description {
    font-size: 20px;
    margin-bottom: 3rem;
  }

  .section-description p {
    font-size: 16px;
  }

  .cards {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }

  .platform-card {
    width: 287px;
    height: 442px;
    min-height: auto;
  }

  .platform-card::before {
    padding: 2.5px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-subtitle {
    font-size: 17px;
    max-width: 220px;
  }

  .active-button,
  .disabled-button {
    font-size: 17px;
  }

  .instructions-text {
    font-size: 15px;
  }
}

/* Media Query for Small Desktops (1024px <س width ≤ 1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: #101010;
    margin: 20px 0 10px;
  }

  .cards {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }

  .platform-card {
    width: 287px;
    height: 442px;
    margin-left: 0;
  }

  .platform-card::before {
    padding: 2.5px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-subtitle {
    font-size: 17px;
    max-width: 220px;
  }

  .active-button,
  .disabled-button {
    font-size: 17px;
  }
}

/* Media Query for Large Desktops (width > 1280px) */
@media (min-width: 1280px) {
  .section-title {
    font-size: 21px;
  }
  
  .cards {
    flex-direction: row;
    justify-content: flex-start;
    gap: 2rem;
  }

  .platform-card {
    width: 287px;
    height: 442px;
    margin-left: 0;
  }

  .platform-card::before {
    padding: 2.5px;
  }

  .card-title {
    font-size: 24px;
  }

  .card-subtitle {
    font-size: 17px;
    max-width: 220px;
  }

  .active-button,
  .disabled-button {
    font-size: 17px;
  }
}

</style>