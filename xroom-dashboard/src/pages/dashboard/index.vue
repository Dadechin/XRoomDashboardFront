<!-- DashboardPage.vue -->
<template>
    <SidebarMenu />

<div class="dashboard-page">
  <div class="content">
    <img class="line" src="https://c.animaapp.com/m9nvumalUMfQbN/img/line-1.svg" />
    <p class="p">از این داشبورد، کار با XRoom را آغاز کنید.</p>
    <div class="frame-3">
      <div class="frame-4">
        <img class="img" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-10.svg" />
        <div class="text-wrapper-5">دانیال پژوهش کیا</div>
      </div>
      <div class="frame-wrapper">
        <img class="frame-5" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame.svg" />
      </div>
    </div>
    <div class="group-2">
      <div class="text-wrapper-6">راهنمای شروع</div>
      <img class="tutorials" src="https://c.animaapp.com/m9nvumalUMfQbN/img/tutorials.svg" />
      <img class="frame-6" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-20.svg" />
      <img class="frame-7" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-19.svg" />
      <img class="frame-8" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-21.svg" />
    </div>
    <p class="text-wrapper-7">
      فقط یک ایده با جلسه شگفت‌انگیز بعدی‌تان در واقعیت مجازی فاصله دارید. همین امروز آن را برگزار کنید!
    </p>
    <div class="text-wrapper-8">جلسات</div>
    <div class="group-3">
      <div class="text-wrapper-9">آخرین فایل‌ها</div>
      <div class="frame-9">
        <img class="BTN-2" src="https://c.animaapp.com/m9nvumalUMfQbN/img/btn-1.svg" />
        <img class="BTN-2" src="https://c.animaapp.com/m9nvumalUMfQbN/img/btn.svg" />
      </div>
      <div class="frame-10">
        <div class="card">
          <div class="frame-11"></div>
          <div class="frame-12">
            <div class="text-wrapper-10">Pico Control</div>
            <div class="history">
              <img class="frame-13" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
              <div class="text-wrapper-11">24 تیر 1403</div>
            </div>
          </div>
        </div>
        <div class="frame-14">
          <div class="frame-15"></div>
          <div class="frame-12">
            <div class="text-wrapper-10">Fakor Sanat Tehran</div>
            <div class="history">
              <img class="frame-13" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
              <div class="text-wrapper-11">24 تیر 1403</div>
            </div>
          </div>
        </div>
        <div class="frame-16">
          <div class="frame-17"></div>
          <div class="frame-12">
            <div class="text-wrapper-10">Design Artist</div>
            <div class="history">
              <img class="frame-13" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
              <div class="text-wrapper-11">24 تیر 1403</div>
            </div>
          </div>
        </div>
        <div class="frame-18">
          <div class="frame-19"></div>
          <div class="frame-12">
            <div class="text-wrapper-10">Flash Back</div>
            <div class="history">
              <img class="frame-13" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-1.svg" />
              <div class="text-wrapper-11">24 تیر 1403</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="BTN-icon">
      <img class="frame-20" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-2.svg" />
      <div class="text-wrapper-12">ایجاد جلسه جدید</div>
    </div>
    <div class="buy-a-subscription">
      <img class="frame-21" src="https://c.animaapp.com/m9nvumalUMfQbN/img/frame-6.svg" />
      <div class="text-wrapper-12">خرید اشتراک</div>
    </div>
  </div>
  <div class="footer">
    <div class="text-wrapper-13">All Rights Reserved ©Dadechin</div>
    <div class="logo">
      <div class="clip-path-group-wrapper">
        <img class="clip-path-group" src="https://c.animaapp.com/m9nvumalUMfQbN/img/clip-path-group.png" />
      </div>
    </div>
  </div>
</div>
</template>

<script>

import SidebarMenu from '@/components/SidebarMenu.vue'


export default {
name: 'DashboardPage',
components: {
  SidebarMenu,
 }

}
</script>

<style scoped>
.dashboard-page {
margin-right: 360px;
padding: 20px;
direction: rtl;
}

.content {
width: 100%;
height: 860px;
background-color: #f8f9fa;
border-radius: 20px;
overflow: hidden;
padding: 35px 80px;
position: relative;
}

.line {
position: absolute;
width: calc(100% - 160px);
height: 1px;
top: 90px;
right: 80px;
object-fit: cover;
}

.p {
position: absolute;
height: 22px;
top: 35px;
right: 80px;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: #101010;
font-size: 16px;
letter-spacing: 0;
line-height: 22.4px;
white-space: nowrap;
}

.frame-3 {
display: inline-flex;
height: 42px;
align-items: center;
gap: 8px;
position: absolute;
top: 35px;
right: 605px;
}

.frame-4 {
display: inline-flex;
align-items: center;
gap: 4px;
position: relative;
flex: 0 0 auto;
}

.text-wrapper-5 {
position: relative;
width: fit-content;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: #101010;
font-size: 16px;
text-align: right;
line-height: 22.4px;
white-space: nowrap;
letter-spacing: 0;
}

.frame-wrapper {
position: relative;
width: 42px;
height: 42px;
background-color: white;
border-radius: 8px;
overflow: hidden;
border: 1px solid #e2dee9;
}

.frame-5 {
position: absolute;
width: 20px;
height: 20px;
top: 11px;
right: 11px;
}

.group-2 {
position: absolute;
width: 522px;
height: 270px;
top: 112px;
right: 80px;
}

.text-wrapper-6 {
position: absolute;
height: 27px;
top: 0;
right: 0px;
font-family: "IRANSansXFaNum-DemiBold", Helvetica;
font-weight: 700;
color: #101010;
font-size: 19px;
line-height: 26.6px;
white-space: nowrap;
letter-spacing: 0;
}

.tutorials {
position: absolute;
width: 250px;
height: 94px;
top: 54px;
right: 270px;
}

.frame-6 {
position: absolute;
width: 250px;
height: 94px;
top: 176px;
right: 270px;
}

.frame-7 {
position: absolute;
width: 250px;
height: 94px;
top: 54px;
right: 0;
}

.frame-8 {
position: absolute;
width: 250px;
height: 94px;
top: 176px;
right: 0;
}

.text-wrapper-7 {
position: absolute;
width: 292px;
top: 148px;
right: 687px;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: #4f5a69;
font-size: 14px;
line-height: 26.6px;
letter-spacing: 0;
text-align: right;
}

.text-wrapper-8 {
position: absolute;
height: 27px;
top: 112px;
right: 689px;
font-family: "IRANSansXFaNum-DemiBold", Helvetica;
font-weight: 700;
color: #101010;
font-size: 19px;
line-height: 26.6px;
white-space: nowrap;
letter-spacing: 0;
}

.group-3 {
position: absolute;
width: calc(100% - 160px);
height: 341px;
top: 40px;
right: 80px;
}

.text-wrapper-9 {
position: absolute;
width: 116px;
height: 29px;
top: 4px;
right: 784px;
font-family: "IRANSansXFaNum-DemiBold", Helvetica;
font-weight: 700;
color: #101010;
font-size: 19px;
line-height: 26.6px;
white-space: nowrap;
letter-spacing: 0;
}

.frame-9 {
display: flex;
width: 292px;
align-items: center;
justify-content: space-between;
position: absolute;
top: 450px;
right: 600px;
}

.BTN-2 {
position: relative;
width: 130px;
cursor: pointer;
}

.frame-10 {
position: absolute;
width: 900px;
height: 267px;
top: 512px;
right: 0;
overflow: hidden;
overflow-x: scroll;
}

.frame-10::-webkit-scrollbar {
width: 0;
display: none;
}

.card {
display: flex;
flex-direction: column;
width: 250px;
align-items: center;
gap: 16px;
padding: 8px 8px 16px;
position: absolute;
top: -2px;
right: 650px;
background-color: white;
border-radius: 16px;
border: 0.5px solid #b8c0cb;
}

.frame-11 {
position: relative;
align-self: stretch;
width: 100%;
height: 172px;
border-radius: 14px;
background: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-1.png) 50% 50% / cover;
}

.frame-12 {
display: flex;
flex-direction: column;
width: 218px;
align-items: flex-start;
gap: 14px;
position: relative;
flex: 0 0 auto;
}

.text-wrapper-10 {
position: relative;
width: fit-content;
margin-top: -1px;
font-family: "IRANSansXFaNum-DemiBold", Helvetica;
font-weight: 700;
color: #444d5a;
font-size: 15px;
text-align: left;
letter-spacing: 0;
line-height: 21px;
white-space: nowrap;
}

.history {
display: inline-flex;
align-items: center;
justify-content: center;
gap: 10px;
position: relative;
flex: 0 0 auto;
}

.text-wrapper-11 {
position: relative;
width: fit-content;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: #7f8da1;
font-size: 13px;
letter-spacing: 0;
line-height: 18.2px;
white-space: nowrap;
}

.frame-13 {
position: relative;
width: 20px;
height: 20px;
}

.frame-14 {
display: flex;
flex-direction: column;
width: 250px;
align-items: center;
gap: 16px;
padding: 8px 8px 16px;
position: absolute;
top: -2px;
right: 380px;
background-color: white;
border-radius: 16px;
border: 0.5px solid #b8c0cb;
}

.frame-15 {
background: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-2.png) 50% 50% / cover;
position: relative;
align-self: stretch;
width: 100%;
height: 172px;
border-radius: 14px;
}

.frame-16 {
display: flex;
flex-direction: column;
width: 250px;
align-items: center;
gap: 16px;
padding: 8px 8px 16px;
position: absolute;
top: -2px;
right: 110px;
background-color: white;
border-radius: 16px;
border: 0.5px solid #b8c0cb;
}

.frame-17 {
background: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-3.png) 50% 50% / cover;
position: relative;
align-self: stretch;
width: 100%;
height: 172px;
border-radius: 14px;
}

.frame-18 {
display: flex;
flex-direction: column;
width: 250px;
align-items: center;
gap: 16px;
padding: 8px 8px 16px;
position: absolute;
top: -2px;
right: -160px;
background-color: white;
border-radius: 16px;
border: 0.5px solid #b8c0cb;
}

.frame-19 {
background: url(https://c.animaapp.com/m9nvumalUMfQbN/img/frame-23-4.png) 50% 50% / cover;
position: relative;
align-self: stretch;
width: 100%;
height: 172px;
border-radius: 14px;
}

.BTN-icon {
display: flex;
width: 292px;
align-items: center;
justify-content: flex-start;
gap: 10px;
padding: 12px 24px;
top: 250px;
right: 687px;
border-radius: 8px;
position: absolute;
background-color: #3a57e8;
cursor: pointer;
}

.text-wrapper-12 {
position: relative;
width: fit-content;
margin-top: -2px;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: white;
font-size: 16px;
text-align: right;
line-height: 22.4px;
white-space: nowrap;
letter-spacing: 0;
}

.frame-20 {
position: relative;
width: 16px;
height: 16px;
}

.buy-a-subscription {
display: inline-flex;
align-items: center;
justify-content: flex-start;
gap: 10px;
padding: 10px;
position: absolute;
top: 35px;
right: 858px;
background-color: #48bb78;
border-radius: 8px;
cursor: pointer;
}

.frame-21 {
position: relative;
width: 20px;
height: 20px;
}

.footer {
margin-top: 20px;
text-align: center;
position: relative;
}

.text-wrapper-13 {
width: 100%;
height: 18px;
font-family: "IRANSansXFaNum-Medium", Helvetica;
font-weight: 500;
color: white;
font-size: 13px;
text-align: center;
letter-spacing: 0;
line-height: 18.2px;
}

.logo {
width: 360px;
height: 45px;
margin: 30px auto;
}

.clip-path-group-wrapper {
position: relative;
height: 45px;
}

.clip-path-group {
position: absolute;
width: 150px;
height: 40px;
top: 5px;
right: 105px;
}
</style>