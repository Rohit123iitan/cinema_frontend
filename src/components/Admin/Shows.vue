<template>
  <div>
    <Create_movie></Create_movie>
    <div class="card p-2 my-2 ">
      <div class="card-header custom_header1 ">
        <div class="card-text text-center ">Exisiting movie</div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white custom_card " v-for="movie in Movies">
        <div class="card-header hb">
          <h5 class="card-title">{{ movie.name }}</h5>
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
        <img class="card-img-top custom_img" :src="movie.image" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Theater: {{ movie.theater }}</p>
          <p class="card-text">Type: {{ movie.type }}</p>
          <p class="card-text">Price: {{ movie.cost }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Create_movie from "@/components/Admin/create_movie.vue"
const baseURL = "http://localhost:8080";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  components: {
    Create_movie
  },
  data() {
    return {
      isDropdownOpen: false,
      Movies: []
    };
  },
  mounted() {
    console.log(this.token);
    axios.get(`${baseURL}/api/get_movie_data`).then(res => {
      this.Movies = res.data;
      console.log(res);
    }).catch(error => {
      console.log(error.message);
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
  width:18.5rem;
  background-color: rgb(23, 60, 97);
  margin: 5px;
}
.custom_img{
  height: 12rem;
}
@media (max-width: 767px) {
  .custom_card {
    width: 100%;
  }
}
</style>