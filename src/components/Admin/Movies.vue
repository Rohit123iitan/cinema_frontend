<template>
  <div>
    <Create_movie></Create_movie>
    <div class="card p-2 my-2 ">
      <div class="card-header custom_header1 ">
        <div class="card-text text-center ">Exisiting movie</div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white custom_card " v-for="movie in Movies" :key="movie.id">
        <div class="card-header">
          <h5 class="card-title text-center">{{ movie.name }}</h5>
        </div>
        <img class="card-img-top custom_img" :src="movie.image" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Theater: {{ movie.theater }}</p>
          <p class="card-text">Type: {{ movie.type }}</p>
          <p class="card-text">Price: {{ movie.cost }}</p>
        </div>
        <hr style="border-color: rgb(60, 255, 0);border-style:dashed;">
        <div class="hb">
            <button v-on:click="updateMovie(movie.name,movie.id)" type="button" class="custom_buttom" data-toggle="modal" data-target="#updateShowModal" data-whatever="@getbootstrap">Update</button>
            <Update_movie :movie='name' :id="m_id"></Update_movie>
            <button v-on:click="updateMovie(movie.name,movie.id)" type="button" id="custom_buttom" data-toggle="modal" data-target="#deleteMovie" data-whatever="@getbootstrap">Delete</button>
        </div>
      </div>
      <Delete_movie :movie='name' :id="m_id"></Delete_movie>
    </div>
  </div>
</template>
<script>
import Create_movie from "@/components/Admin/create_movie.vue"
import Update_movie from "@/components/Admin/update_movie.vue"
import Delete_movie from "@/components/Admin/Delete_movie.vue"
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  components: {
    Create_movie,
    Update_movie,
    Delete_movie
  },
  data() {
    return {
      isDropdownOpen: false,
      Movies: [],
      name: '',
      m_id:'',
    };
  },
  methods: {
    updateMovie(newName,id_) {
      this.name = newName;
      this.m_id=id_;
    },
  },
  mounted() {
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
#custom_buttom {
    margin-top: 0%;
    margin-left: 0%;
    border-radius: 20px;
    background-color: rgb(243, 47, 8);
}

#custom_buttom:hover {
    box-shadow: 0 0 0 0.2rem rgba(255, 183, 0, 0.485);
}

.custom_buttom2 {
  background-color: initial;
  border: none;
  color: aliceblue;
}

.dropdown-toggle::after {
  display: none !important;
}

.hb {
  padding: 10px;
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

.custom_card {
  width: 18.5rem;
  background-color: rgb(23, 60, 97);
  margin: 5px;
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