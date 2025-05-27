<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✕</button>
      <h2 class="modal-title">انتخاب فضای اختصاصی</h2>
      
      <!-- Space Selection Cards -->
      <div v-if="spaces.length > 0" class="space-selection">
        <div 
          v-for="(space, index) in spaces" 
          :key="index" 
          class="space-card" 
          @click="selectSpace(space)"
          :class="{ selected: selectedSpace === space }"  
        >
          <img :src="'http://my.xroomapp.com:8000' + space.img" alt="فضای اختصاصی" class="space-img" />
          <div class="space-info">
            <h3 class="space-name">{{ space.name }}</h3>
            <p class="space-type">{{ space.type }}</p>
            <p class="space-capacity">حداکثر: {{ space.capacity }} کاربر</p> <!-- Map maxPerson -->
          </div>
        </div>
      </div>

      <div v-else class="loading-message">
        <p>در حال بارگذاری فضاها...</p>
      </div>

      <!-- Form to enter additional information -->
      <div v-if="selectedSpace" class="space-form">
        <h3>اطلاعات فضا</h3>
        <form @submit.prevent="submitForm">
          <label for="name">نام:</label>
          <input type="text" v-model="form.name" id="name" required />
          
          <label for="capacity">ظرفیت:</label>
          <input type="number" v-model="form.capacity" id="capacity" required />
          
          <label for="description">توضیحات:</label>
          <textarea v-model="form.description" id="description" required></textarea>
          
          <button type="submit" class="submit-btn">تایید</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios for API requests

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      spaces: [], // To store the fetched spaces
      selectedSpace: null, // Store the selected space
      form: {
        name: '',
        capacity: '',
        description: '',  // New field for description
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit the close event to parent
    },
    selectSpace(space) {
      this.selectedSpace = space; // Set the selected space
    },
    async fetchSpaces() {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          console.error('No token found!');
          return;
        }

        const response = await axios.get(
          'http://my.xroomapp.com:8000/get_assigned_assetbundle_rooms', // API endpoint
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // Log the response to check if `maxPerson` is included in the API response
        console.log(response.data); // Log the API response to the console

        // Store the spaces data in the spaces array
        this.spaces = response.data.assetbundle_rooms.map(room => ({
          name: room.name,
          img: room.img,  // Assuming 'img' exists in the API response
          capacity: room.maxPerson, // Map maxPerson to capacity
          type: room.Private ? 'Private' : 'Public', // Adjust if you have a different field
          maxPerson: room.maxPerson, // Store maxPerson for display
          id: room.id, // Store the room id for space selection
        }));
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    },
    async submitForm() {
      // Collect data to be sent to the API
      const spaceData = {
        assetBundleRoomId: this.selectedSpace.id,  // Use selected space ID (the room ID)
        name: this.form.name,
        description: this.form.description,  // Include description from form
        capacity: this.form.capacity,
      };

      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
          console.error('No token found!');
          return;
        }

        // Make POST request to add the space
        const response = await axios.post(
          'http://my.xroomapp.com:8000/add_space',  // API endpoint to add space
          spaceData,
          {
            headers: {
              Authorization: `Token ${token}`,  // Pass the token
              'Content-Type': 'application/json',
            },
          }
        );

        // Log the response from the API
        console.log(response.data);

        // Close the modal and emit success
        this.$emit('submit', response.data);  // Pass the response data to the parent
        this.closeModal(); // Close the modal

      } catch (error) {
        console.error('Error submitting form:', error);
        alert('خطا در ارسال اطلاعات، لطفا دوباره تلاش کنید');
      }
    },
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchSpaces(); // Fetch spaces only when the modal becomes visible
      }
    },
  },
};
</script>

<style scoped>
/* Styling for the modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #3A57E8;
  text-align: center;
  margin-bottom: 20px;
}

.space-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.space-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.space-card:hover {
  transform: scale(1.05);
}

/* Add selected class styles */
.space-card.selected {
  border: 2px solid #3A57E8;
  box-shadow: 0 4px 8px rgba(58, 87, 232, 0.5); /* Blue border and shadow */
}

.space-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.space-info {
  padding: 10px;
  text-align: center;
}

.space-name {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin: 5px 0;
}

.space-type, .space-capacity {
  font-size: 14px;
  color: #718096;
}

.loading-message {
  text-align: center;
  font-size: 16px;
  color: #718096;
}

.space-form {
  margin-top: 20px;
}

.space-form label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.space-form input, .space-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  background-color: #3A57E8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #2c48b4;
}




















 
/* Modal styling */
.create-space-modal {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent backdrop */
  z-index: 9999; /* Ensure it's above other content */
}

/* Modal content */
.modal-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 10000; /* Higher than backdrop */
}

/* Add transition for smooth opening/closing */
.create-space-modal-enter-active, .create-space-modal-leave-active {
  transition: opacity 0.3s ease;
}

.create-space-modal-enter, .create-space-modal-leave-to {
  opacity: 0;
}
</style>