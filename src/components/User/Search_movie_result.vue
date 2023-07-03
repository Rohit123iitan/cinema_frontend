<template>
  <div>
    <div class="card p-2 ">
      <div class="card-header style_header1 ">
        <div class="card-text ">result</div>
        <div class=" d-inline-flex align-items-center ">
          <select class="form-control" id="ratingFilter" v-model="selectedRating">
            <option value="">All Ratings</option>
            <option v-for="rating in ratings" :value="rating">{{ rating }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white m-2 style_card " v-for="movie in Movies" v-if="(movie.rating > 0 && movie.rating == selectedRating) || selectedRating === ''">
        <div class="card-header">
          <h5 class="card-title text-center">{{ movie.name }}</h5>
        </div>
        <img class="card-img-top style_img" :src="movie.image" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Theater: {{ movie.theater }}</p>
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
      m_name: null,
    };
  },
  components: {
    rating,
  },
  created() {
    this.type = this.$route.params.filter;
    this.m_name = this.$route.params.id;
  },
  mounted() {
    axios.post(`${baseURL}/api/get_movies`, { name: this.m_name }).then(res => {
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

.style_header {
  border-radius: 40px;

}

.style_header1 {
  border-radius: 50px !important;
  background-color: chartreuse !important;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
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