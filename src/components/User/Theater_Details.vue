<template>
    <div>
      <div class="card p-2 ">
        <div class="card-header header ">
          <div class="card-text ">{{ Movies[0].t_name }}</div>
        </div>
      </div>
      <div class="row" v-if="Movies[0].t_image!='0'">
        <img :src="Movies[0].t_image" style="width: 100%; height: 20rem;" alt="Theater_img" />
      </div>
      <div class="card p-2 ">
        <div class="card-header header ">
          <div class="card-text ">Movies</div>
        </div>
      </div>
      <div class="row">
        <div class="card text-white m-2 style_card " v-for="movie in Movies" v-if="(movie.rating > 0 && movie.rating == selectedRating) || selectedRating === ''">
          <div class="card-header hb">
            <h5 class="card-title">{{ movie.name }}</h5>
            <button type="button" class="style_buttom2 dropdown-toggle dropdown-toggle-split hb" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </button>
          </div>
          <img class="card-img-top style_img" :src="movie.image" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">vacent seat: {{ movie.seats }}</p>
            <p class="card-text">Type: {{ movie.type }}</p>
            <p class="card-text">Price: {{ movie.cost }}</p>
            <p v-if="movie.rating > 0" class="card-text">Rating: {{ movie.rating }}</p>
            <p v-else class="card-text">Rating: Not Rated</p>
            <hr style="border-color: red;border-style:dashed;">
            <rating :movieId="movie.id"></rating>
            <hr style="border-color: red;border-style:dashed;">
            <div>
              <router-link :to="`/user/booking/${movie.id}`"><button class="style_buttom">Book Now</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  const baseURL = "http://localhost:8080";
  import axios from 'axios';
  import rating from '@/components/User/Raating.vue';
  const token = localStorage.getItem('access_token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  export default {
    data() {
      return {
        selectedRating: '', // Selected rating filter
        ratings: [1, 2, 3, 4, 5],
        Movies: [],
        Theaters: [],
        type: '',
        resultId: null,
      };
    },
    components: {
      rating,
    },
    created() {
      this.resultId = this.$route.params.Id;
    },
    mounted() {
      axios.post(`${baseURL}/api/get_theater_details`, { "theater_name": this.resultId }).then(res => {
        this.Movies = res.data;
        console.log(res);
      }).catch(error => {
        console.log(error)
        this.$router.push({ path: '/' });
      })
    }
  }
  </script>
<style>
.style_buttom {
  padding: 10px;
  border-radius: 50px;
  background-color: rgb(177, 43, 226);
}

.style_buttom:hover {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 234, 0.589);
}

.style_buttom2 {
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

.style_header {
  border-radius: 40px;

}

.header {
  border-radius: 50px !important;
  background-color: chartreuse !important;
  text-align: center;
}

.style_card {
  width: 18rem;
  background-color: rgb(97, 23, 62) !important;
}

.style_img {
  height: 12rem;
}

@media (max-width: 767px) {
  .style_card {
    width: 100%;
  }
}
</style>