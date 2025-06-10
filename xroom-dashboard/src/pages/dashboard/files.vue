<template>
  <div>
    <!-- Top Header -->
    <!-- Description -->
    <div class="section-description">
      <div class="section-title">مدیریت فایل‌ها</div>
      <p>
        فایل‌های خود مانند مدل‌های سه‌بعدی، تصاویر و اسناد PDF را برای استفاده در VR آماده کنید. یا یادداشت‌ها و تصاویر ایجاد شده در برنامه XRoom را دانلود کنید.
      </p>
    </div>

    <!-- File Manager Layout -->
    <div class="file-manager-layout">
      <div class="file-sidebar">
        <div class="filter-buttons">
          <button class="new-file" @click="openDialog('image')">
            فایل جدید
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_312_7133)">
                  <path d="M2.66602 11.3333V12.6666C2.66602 13.0202 2.80649 13.3593 3.05654 13.6094C3.30659 13.8594 3.64573 13.9999 3.99935 13.9999H11.9993C12.353 13.9999 12.6921 13.8594 12.9422 13.6094C13.1922 13.3593 13.3327 13.0202 13.3327 12.6666V11.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M8 2.66675V10.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
                <defs>
                  <clipPath id="clip0_312_7133">
                    <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>
          </button>

          <button
            v-for="(filter, index) in filters"
            :key="'filter-' + index"
            :class="[
              'filter-btn',
              { 'active-btn': activeFilter === filter.id },
              { 'disable-btn': activeFilter !== filter.id },
              { 'recent-filter-border': filter.id === 'recent-files' }
            ]"
            @click="setActiveFilter(filter.id)"
          >
            <span v-html="filter.icon" :class="['filter-icon', { 'active-icon': activeFilter === filter.id, 'disable-icon': activeFilter !== filter.id }]">
            </span>
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="file-grid">
        <div v-for="section in filteredFileSections" :key="section.type" class="file-section">
          <div class="section-title">{{ section.title }}</div>
          <div v-if="filteredFiles(section.type).length > 0" style="display: flex; align-items: center; gap: 1.5rem 0.9rem; flex-wrap: wrap;">
            <div
              class="file-card"
              v-for="(file, index) in filteredFiles(section.type)"
              :key="`${section.type}-${index}`"
              @click="openPreviewDialog(section.type, index, getFullFileUrl(file[section.type]), file.id)"
            >
              <img
                :src="getFilePreviewImage(section.type, file)"
                :class="[
                  {
                    'file-image': section.type === 'image',
                    'file-image file-pdf': section.type === 'pdf',
                    'file-image file-video': section.type === 'video',
                    'file-image file-glb': section.type === 'glb',
                    'file-image file-other': section.type === 'other'
                  }
                ]"
              />
              <div class="file-card-info">
                <div class="file-title">{{ file.name }}</div>
                <div class="file-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2.5 2.5V6.66667H6.66667" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 5.83325V9.99992L13.3333 11.6666" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="file-date">{{ formatDate(file.created_at) }}</span>
                </div>
              </div>
            </div>

          </div>
          <div v-else class="no-files-message">
            <button class="new-file" @click="openDialog(section.type)">
              فایلی وجود ندارد , برای آپلود فایل جدید کلیک کنید
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_312_7133)">
                    <path d="M2.66602 11.3333V12.6666C2.66602 13.0202 2.80649 13.3593 3.05654 13.6094C3.30659 13.8594 3.64573 13.9999 3.99935 13.9999H11.9993C12.353 13.9999 12.6921 13.8594 12.9422 13.6094C13.1922 13.3593 13.3327 13.0202 13.3327 12.6666V11.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8 2.66675V10.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_312_7133">
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div  v-for="section in filteredFileSections" :key="section.type" class="swiper-file-section">
          <div class="section-title">{{ section.title }}</div>
          <div v-if="filteredFiles(section.type).length > 0" style="display: flex; align-items: center; gap: 1.5rem 0.9rem; flex-wrap: wrap;">
          <swiper
            :slides-per-view="1.8"
            :space-between="20"
            :freeMode="true"
            :pagination="{ clickable: true }"
            :breakpoints="{
              600: { slidesPerView: 3.8, spaceBetween: 15 },
              900: { slidesPerView: 3.4, spaceBetween: 15 },
            }"
            :modules="modules"
            class="swiper-file-list">
              <swiper-slide class="swiper-file-card"
                  v-for="(file, index) in filteredFiles(section.type)"
                  :key="`${section.type}-${index}`"
                  @click="openPreviewDialog(section.type, index, getFullFileUrl(file[section.type]), file.id)">
                  <img
                    :src="getFilePreviewImage(section.type, file)"
                    :class="[
                      {
                        'file-image': section.type === 'image',
                        'file-image file-pdf': section.type === 'pdf',
                        'file-image file-video': section.type === 'video',
                        'file-image file-glb': section.type === 'glb',
                        'file-image file-other': section.type === 'other'
                      }
                    ]"
                  />
                  <div class="file-card-info">
                    <div class="file-title">{{ file.name }}</div>
                    <div class="file-meta">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
                          <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2.5 2.5V6.66667H6.66667" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10 5.83325V9.99992L13.3333 11.6666" stroke="#101010" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="file-date">{{ formatDate(file.created_at) }}</span>
                    </div>
                  </div>
              </swiper-slide>
          </swiper>
          </div>
          <div v-else class="no-files-message">
            <button class="new-file" @click="openDialog(section.type)">
              فایلی وجود ندارد , برای آپلود فایل جدید کلیک کنید
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <g clip-path="url(#clip0_312_7133)">
                    <path d="M2.66602 11.3333V12.6666C2.66602 13.0202 2.80649 13.3593 3.05654 13.6094C3.30659 13.8594 3.64573 13.9999 3.99935 13.9999H11.9993C12.353 13.9999 12.6921 13.8594 12.9422 13.6094C13.1922 13.3593 13.3327 13.0202 13.3327 12.6666V11.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4.66602 6.00008L7.99935 2.66675L11.3327 6.00008" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8 2.66675V10.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_312_7133">
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div v-if="filteredFileSections.length === 0" class="no-files-message">
          فایلی وجود ندارد
        </div>
      </div>
    </div>
  </div>

  <!-- New File Dialog Component -->
  <NewFileDialog
    :is-open="isNewFileDialogOpen"
    :initial-upload-type="currentUploadType"
    :base-url="baseUrl"
    @close="closeDialog"
    @upload-success="fetchUserData"
  />

  <!-- File Preview Dialog Component -->
  <FilePreviewDialog
    :is-open="isPreviewDialogOpen"
    :preview-url="previewUrl"
    :preview-type="currentPreviewType"
    :preview-index="currentPreviewIndex"
    :base-url="baseUrl"
    :video-options="videoOptions"
    @close="closePreviewDialog"
    @delete-success="fetchUserData"
  />
</template>

<script>
import '@google/model-viewer';
import axios from 'axios';
import NewFileDialog from '@/components/NewFileDialog.vue';
import FilePreviewDialog from '@/components/FilePreviewDialog.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper/modules';

export default {
  name: 'DashboardPage',
  components: {
    NewFileDialog,
    FilePreviewDialog,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [FreeMode, Pagination],
      userData: {
        customer: {},
        user: {
          first_name: '',
          last_name: '',
        },
        images: [],
        pdfs: [],
        videos: [],
        glbs: [],
        others: [],
      },
      baseUrl: 'http://194.62.43.230:8000/',
      isNewFileDialogOpen: false,
      currentUploadType: 'image',
      isPreviewDialogOpen: false,
      previewUrl: '',
      currentPreviewType: null,
      currentPreviewIndex: null,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [{ type: 'video/mp4', src: '' }],
      },
      activeFilter: 'all-files',
      filters: [
        {
          id: 'recent-files',
          label: 'فایل‌های اخیر',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 2.5V6.66667H6.66667" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 5.83325V9.99992L13.3333 11.6666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'all-files',
          label: 'همه فایل‌ها',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 3.33333V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 16.6667V3.33333C17.5 2.8913 17.3244 2.46738 17.0118 2.15482C16.6993 1.84226 16.2754 1.66667 15.8333 1.66667H4.16667C3.72464 1.66667 3.30072 1.84226 2.98816 2.15482C2.67559 2.46738 2.5 2.8913 2.5 3.33333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5V6.66667C12.5 7.1087 12.6756 7.53262 12.9882 7.84518C13.3007 8.15774 13.7246 8.33333 14.1667 8.33333H17.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'images',
          label: 'تصاویر',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 3.33333V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 16.6667V3.33333C17.5 2.8913 17.3244 2.46738 17.0118 2.15482C16.6993 1.84226 16.2754 1.66667 15.8333 1.66667H4.16667C3.72464 1.66667 3.30072 1.84226 2.98816 2.15482C2.67559 2.46738 2.5 2.8913 2.5 3.33333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66667 8.33333C7.58714 8.33333 8.33333 7.58714 8.33333 6.66667C8.33333 5.74619 7.58714 5 6.66667 5C5.74619 5 5 5.74619 5 6.66667C5 7.58714 5.74619 8.33333 6.66667 8.33333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 12.5L13.3333 8.33333L5 16.6667" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'pdfs',
          label: 'PDF‌ها',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 16.6667V6.66667L12.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5V6.66667C12.5 7.1087 12.6756 7.53262 12.9882 7.84518C13.3007 8.15774 13.7246 8.33333 14.1667 8.33333H17.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'videos',
          label: 'ویدیوها',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 3.33333V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 16.6667V3.33333C17.5 2.8913 17.3244 2.46738 17.0118 2.15482C16.6993 1.84226 16.2754 1.66667 15.8333 1.66667H4.16667C3.72464 1.66667 3.30072 1.84226 2.98816 2.15482C2.67559 2.46738 2.5 2.8913 2.5 3.33333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 5.83333L13.3333 10L7.5 14.1667V5.83333Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'glbs',
          label: 'مدل‌های 3D',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M10 2.5C7.23858 2.5 4.58333 3.31667 2.5 4.78333V16.6667C4.58333 15.3167 7.23858 14.5 10 14.5C12.7614 14.5 15.4167 15.3167 17.5 16.6667V4.78333C15.4167 3.31667 12.7614 2.5 10 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 2.5V14.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
        {
          id: 'others',
          label: 'سایر',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 16.6667V6.66667L12.5 2.5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5V6.66667C12.5 7.1087 12.6756 7.53262 12.9882 7.84518C13.3007 8.15774 13.7246 8.33333 14.1667 8.33333H17.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 10H10.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 13H10.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 16H10.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
        },
      ],
      fileSections: [
        { type: 'image', title: 'مدیریت تصاویر' },
        { type: 'pdf', title: 'مدیریت PDF‌ها' },
        { type: 'video', title: 'مدیریت ویدیوها' },
        { type: 'glb', title: 'مدیریت مدل‌های 3D' },
        { type: 'other', title: 'مدیریت سایر فایل‌ها' },
      ],
    };
  },
  computed: {
    filteredFileSections() {
    let sections = this.fileSections;

    if (this.activeFilter === 'all-files' || this.activeFilter === 'recent-files') {
      sections = this.fileSections.filter(section => {
        const files = this.filteredFiles(section.type);
        return files.length > 0;
      });
    } else {
      const filterTypeMap = {
        images: 'image',
        pdfs: 'pdf',
        videos: 'video',
        glbs: 'glb',
        others: 'other',
      };
      const filterType = filterTypeMap[this.activeFilter];
      sections = filterType
        ? this.fileSections.filter(section => {
            const files = this.filteredFiles(section.type);
            return section.type === filterType && files.length > 0;
          })
        : [];
    }

    return sections;
  },
  hasRecentFiles() {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    return ['images', 'pdfs', 'videos', 'glbs', 'others'].some(type =>
      this.userData[type].some(file => new Date(file.created_at) >= oneDayAgo)
    );
  },
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    setActiveFilter(filterId) {
      this.activeFilter = filterId;
    },
    getFilterType(filterId) {
      const filterTypeMap = {
        images: 'image',
        pdfs: 'pdf',
        videos: 'video',
        glbs: 'glb',
        others: 'other',
      };
      return filterTypeMap[filterId] || 'image';
    },
    filteredFiles(type) {
      const files = this.userData[`${type}s`];
      if (!files) return [];

      if (this.activeFilter === 'recent-files') {
        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);
        return files.filter(file => new Date(file.created_at) >= oneDayAgo);
      }

      const filterTypeMap = {
        images: 'image',
        pdfs: 'pdf',
        videos: 'video',
        glbs: 'glb',
        others: 'other',
      };
      if (this.activeFilter !== 'all-files' && filterTypeMap[this.activeFilter] !== type) {
        return [];
      }

      return files;
    },
    getFilePreviewImage(type, file) {
      switch (type) {
        case 'image':
          return this.getFullFileUrl(file.image);
        case 'pdf':
          return 'https://cdn-icons-png.flaticon.com/512/337/337946.png';
        case 'video':
          return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQ1L9b8tFaGXBQxOdCCaq-AcYkmawPtRVZA&s';
        case 'glb':
          return require('@/assets/img/3d-icon.jpg');
        case 'other':
          return 'https://cdn-icons-png.flaticon.com/512/186/186159.png';
        default:
          return '';
      }
    },
    getFullFileUrl(relativePath) {
      if (!relativePath) return '';
      return `${this.baseUrl}${relativePath}`;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    },
    openDialog(type = 'image') {
      this.currentUploadType = type;
      this.isNewFileDialogOpen = true;
    },
    closeDialog() {
      this.isNewFileDialogOpen = false;
    },
    openPreviewDialog(type, index, url, id) {
      this.currentPreviewType = type;
      this.currentPreviewIndex = id;
      this.previewUrl = url;

      if (type === 'video') {
        this.videoOptions.sources[0].src = url;
      }

      this.isPreviewDialogOpen = true;
    },
    closePreviewDialog() {
      this.isPreviewDialogOpen = false;
      this.previewUrl = '';
      this.currentPreviewIndex = null;
      this.currentPreviewType = null;
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${this.baseUrl}/getInfo`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        this.userData = {
          ...response.data.data,
          others: response.data.data.others || [],
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.userData.others = [
        ];
      }
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
  margin-bottom: 3rem;
}

.section-description p {
  line-height: 190%;
  color: #4f5a69;
  font-size: 15px;
  margin-top: 1rem;
  font-weight: 500;
  text-align: justify;
}

.swiper-file-section {
  display: none;
}

.file-section {
  display: block;
  margin-bottom: 3rem;
}

.file-manager {
  direction: rtl;
  font-family: system-ui, -apple-system, sans-serif;
}

.file-manager-layout {
  display: flex;
  gap: 3rem;
}

.file-sidebar {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  height: fit-content;
}

.filter-buttons {
  display: flex;
  gap: 1.5rem;
}

.new-file {
  background: #3a57e8;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
}

.filter-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
}

.active-btn {
  color: #3a57e8;
}

.disable-btn {
  color: #5a6678;
}

.active-icon svg {
  stroke: #3a57e8;
  width: 22px;
  height: 22px;
}

.disable-icon svg {
  stroke: #5a6678;
  width: 22px;
  height: 22px;
}

.recent-filter-border {
  border-bottom: 0;
  padding-bottom: 0;
}

.file-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.file-grid-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.file-card,
.swiper-file-card {
  width: calc(33.333% - 0.67rem);
  border: 1px solid #b8c0cb;
  border-radius: 16px;
  background: #fff;
  padding: 0.5rem 0.5rem 1rem;
  cursor: pointer;
}

.swiper-file-card {
  border-radius: 12px;
  padding: 6px;
  height: 16rem;
}

.file-image {
  width: 100%;
  height: 145px;
  border-radius: 8px;
  object-fit: cover;
}

.file-pdf,
.file-video,
.file-glb,
.file-other {
  object-fit: contain;
  width: 70%;
  display: block;
  margin: auto;
}

.file-card-info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  height: 30%;
}

.file-title {
  color: #101010;
  font-size: 16px;
  font-weight: 600;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-meta svg {
  width: 16px;
  height: 16px;
}

.file-date {
  color: #7f8da1;
  font-size: 14px;
}

.no-files-message {
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-btn {
  background: #3a57e8;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
}

.upload-btn svg,
.new-file svg {
  width: 22px;
  height: 22px;
}

@media (max-width: 1023px) {
  .swiper-file-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .file-section {
    display: none;
  }

  .swiper-file-list {
    width: 100%;
  }

  .file-manager-layout {
    flex-direction: column;
  }

  .file-sidebar {
    padding: 1rem;
  }

  .filter-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .new-file {
    width: 100%;
  }

  .new-file svg {
    width: 20px;
  }

  .filter-btn {
    font-size: 15px;
  }

  .file-grid {
    padding-bottom: 5rem;
  }
}

@media (min-width: 1024px) {
  .file-manager-layout {
    flex-direction: row;
  }

  .file-sidebar {
    padding: 2rem;
    width: 25%;
  }

  .filter-buttons {
    flex-direction: column;
  }

  .file-grid {
    width: 75%;
  }

  .file-card {
    border-radius: 16px;
    padding: 0.5rem 0.5rem 1rem;
  }

  .file-image {
    height: 190px;
    border-radius: 15px;
  }

  .file-pdf,
  .file-video,
  .file-glb,
  .file-other {
    width: 100%;
  }

  .file-card-info {
    height: auto;
  }

  .file-title {
    color: #444d5a;
    font-size: 1.25rem;
  }

  .file-meta svg {
    width: 22px;
    height: 22px;
  }

  .file-date {
    font-size: 1rem;
  }

  .recent-filter-border {
    border-bottom: 1px solid #e2dee9;
    padding-bottom: 1.5rem;
  }

  .filter-btn {
    font-size: 1.125rem;
  }
}

@media (min-width: 1280px) {
  .section-title {
    font-size: 21px;
  }

  .section-description p {
    font-size: 17.5px;
  }

  .file-section {
    display: block;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

</style>