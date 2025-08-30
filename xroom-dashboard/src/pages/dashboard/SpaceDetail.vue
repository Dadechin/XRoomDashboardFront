<template>

          <AppHeader pageTitle="فضاها" />

  <div class="space-detail" v-if="space">
    <!-- Back Button -->
    <button class="back-btn" @click="$router.push('/dashboard/spaces')">
      ⬅ بازگشت به فضاها
    </button>

    <!-- Space Image -->
    <div class="image-container">
      <img :src="'https://my.xroomapp.com' + space.img" alt="تصویر فضا" />
    </div>

     <!-- Space Live Button -->
    <button class="live-btn">
    پخش زنده فضا
    </button>


    <!-- Space Info -->
    <div class="info">
      <h1>{{ space.name }}</h1>
      <p class="capacity">ظرفیت: {{ space.capacity }} کاربر</p>
      <p class="type">نوع: {{ space.type }}</p>
      <p class="description">{{ space.description }}</p>
    </div>



    
    <div class="table-container">
        <table class="users-table">
            <thead>
            <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>ID</th>
                <th>Phone</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(person) in people" :key="person.id">
                <td>
                <img :src="person.icon" class="profile-img" />
                </td>
                <td>{{ person.name }}</td>
                <td>{{ person.id }}</td>
                <td>{{ person.phone }}</td>
                <td>
                <span :class="person.online ? 'online' : 'offline'">
                    {{ person.online ? 'Online' : 'Offline' }}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        </div>




  </div>

  

  <!-- Loading State -->
  <div v-else class="loading">
    در حال بارگذاری...
  </div>
</template>

<script>
import axios from "axios";
import 'flowbite';

export default {
  name: "SpaceDetail",
  props: ["id"], // comes from route params
  data() {
    return {
      space: null,
       people : [
                { id: 1, name: "Mahdi", phone: "0912-123-4567", online: true,  icon: "/avatars/m1.png" },
                { id: 2, name: "Sara",  phone: "0913-456-7890", online: false, icon: "/avatars/m2.png" },
                ],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://my.xroomapp.com/api/get_spaces", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      const spaces = response.data.spaces.map(space => ({
        id: space.id,
        name: space.name,
        img: space.assetBundleRoomId.img,
        capacity: space.capacity,
        type: space.assetBundleRoomId.Private ? "Private" : "Public",
        description: space.description,
      }));

      this.space = spaces.find(s => s.id == this.id);
    } catch (error) {
      console.error("Error loading space:", error);
    }
  },
};
</script>

<style scoped>
.space-detail {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}
.back-btn {
  margin-bottom: 1rem;
  background: #3A57E8;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.image-container img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}
.info h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.capacity,
.type,
.description {
  font-size: 16px;
  margin-bottom: 0.75rem;
}
.type {
  color: #3A57E8;
  font-weight: 600;
}
.loading {
  text-align: center;
  padding: 3rem;
  font-size: 18px;
  font-weight: 500;
}








.table-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow-x: auto;
  direction: rtl; /* Added for RTL layout */
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  text-align: right; /* Text aligned to right for RTL */
}

.users-table thead {
  background-color: #333;
  color: #fff;
}

.users-table th, .users-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
}

.users-table tbody tr:nth-child(even) {
  background-color: #f0f0f0;
}

.users-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.users-table tbody tr:hover {
  background-color: #e0e0e0;
  transition: background-color 0.2s ease;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #666;
}

.online {
  color: #28a745;
  font-weight: bold;
}

.offline {
  color: #dc3545;
  font-weight: bold;
}




.live-btn {
  display: block;          /* Make it block so margin auto works */
  margin: 1rem auto 2rem;  /* Top 1rem, horizontal center, bottom 2rem */
  background: #28a745;     /* Green background for live button */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.live-btn:hover {
  background: #218838;     /* Darker green on hover */
}

</style>
