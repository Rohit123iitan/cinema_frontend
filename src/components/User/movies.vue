<template>
  <div>
    <div class="card p-2 ">
      <div class="card-header custom_header1 ">
        <div class="card-text text-center font-weight-bold">Exisiting movie</div>
        <div class=" d-inline-flex align-items-center ">
          <select class="form-control" id="ratingFilter" v-model="selectedRating">
            <option value="">All Ratings</option>
            <option v-for="rating in ratings" :value="rating">{{ rating }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white m-2 custom_card " v-for="movie in Movies" v-if="(movie.Rating > 0 && movie.Rating == selectedRating) || selectedRating === ''">
        
          <div class="card-header">
          <h5 class="card-title text-center">{{ movie.name }}</h5>
        </div>
        <img class="card-img-top custom_img" :src="movie.image" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Theater: {{ movie.theater }}</p>
          <p class="card-text">Type: {{ movie.type }}</p>
          <p class="card-text">Price: {{ movie.cost }}</p>
          <p v-if="movie.Rating >0 " class="card-text">Rating: {{ movie.Rating }}</p>
          <p v-else class="card-text">Rating: Not Rated</p>
          <hr style="border-color: red;border-style:dashed;">
          <rating :movieId="movie.id"></rating>
          <hr style="border-color: red;border-style:dashed;">
          <div v-if="movie.Housefull==false ">
            <router-link :to="`/user/booking/${movie.id}`"><button class="custom_buttom">Book Now</button></router-link>
          </div>
          <div v-else>
            <div v-if="show" class="py-2">
              <div style="display: inline-block;">&#9888;</div>{{ message }}
              <button type="button" class="mx-2 close " @click="hideFlashMessage">&times;</button>
            </div>
            <button class="custom_buttom" @click="alert_message">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
import rating from '@/components/User/Raating.vue';
export default {
  data() {
    return {
      selectedRating: '', // Selected rating filter
      ratings: [1, 2, 3, 4, 5],
      Movies: [],
      show:false,
      message: '',
    };
  },
  components:{
    rating,
  },
  methods:{
    alert_message(){
      this.show=true;
      this.message="sorry for inconvenience , Seats is already filled."
    },
    hideFlashMessage(){
      this.show=false;
      this.message=null;
    }
  },
  mounted() {
    axios.get(`${baseURL}/api/get_movies`).then(res => {
      this.Movies = res.data;
      console.log(res);
    }).catch(error => {
      console.log(error);
      this.$router.push({path:'/'});
    })
  }
}
</script>
<style>
.custom_buttom {
  padding: 10px;
  border-radius: 50px;
  background-color: rgb(177, 43, 226);
}

.custom_buttom:hover {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 234, 0.589);
}

.custom_buttom2 {
  background-color: initial;
  border: none;
  color: aliceblue;
}

.dropdown-toggle::after {
  display: none !important;
}

.custom_header {
  border-radius: 40px;

}

.custom_header1 {
  border-radius: 50px !important;
  background-color: chartreuse !important;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.custom_card {
  width: 18rem;
  background-color: rgb(97, 23, 62) !important;
}

.custom_img {
  height: 12rem;
}

@media (max-width: 767px) {
  .custom_card {
    width: 100%;
  }
}
</style>
