<template>
  <div>
    <Create_theater></Create_theater>
    <div class="card p-2 my-2 ">
      <div class="card-header custom_header1 ">
        <div class="card-text text-center ">Exisiting Theater</div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white m-2 custom_card " v-for="theater in Theaters">
        <div class="card-header hb">
          <h5 class="card-title">{{ theater.name }}</h5>
          <button type="button" class="custom_buttom2 dropdown-toggle dropdown-toggle-split hb" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item" type="button">Action</button>
            <button class="dropdown-item" type="button">Another action</button>
            <button class="dropdown-item" type="button">Something else here</button>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
        <div class="card-body">
          <!-- <h6 class="card-subtitle mb-2 text-muted">Theater Name: ABC Theater</h6> -->
          <p class="card-text">Location: {{ theater.address }}</p>
          <p class="card-text">Capacity: {{ theater.capacity }}</p>
          <p class="card-text">Shows: {{ theater.capacity }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Create_theater from "@/components/Admin/create_theater.vue"
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  components: {
    Create_theater
  },
  data() {
    return {
      isDropdownOpen: false,
      Theaters: []
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    deleteItem() {
      // Handle delete functionality here
    },
    updateItem() {
      // Handle update functionality here
    }
  },
  mounted() {
    axios.get(`${baseURL}/api/get_theater_data`).then(res => {
      this.Theaters = res.data;
      console.log(res);
    }).catch(error => {
      if(error.response.request.status==422){
        this.$router.push({path:'/admin_login'});
      }
    })
  }
}
</script>
<style>
.custom_buttom2 {
  background-color: initial;
  border: none;
  color: aliceblue;
}

.dropdown-toggle::after {
  display: none !important;
}

.hb {
  display: flex;
  justify-content: space-between;
}

.custom_header {
  border-radius: 40px;

}

.custom_header1 {
  border-radius: 50px !important;
  background-color: chartreuse;
}
.custom_card{
  width:18rem;
  background-color: rgb(23, 60, 97);
}
@media only screen and (max-width: 767px) {
  .custom_card {
    width: 100%;
  }
}
</style>