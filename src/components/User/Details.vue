<template>
    <div class="row">
      <div class="card custom_card" v-for="booking in bookings">
        <div class="card-header" >
          <h5 class="card-title">{{ booking.person_name }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text"><strong>Booking id:</strong> M_{{ booking.id }}</p>
          <p class="card-text"><strong>Movie:</strong> {{ booking.movie_name }}</p>
          <p class="card-text"><strong>Age:</strong> {{ booking.person_age }}</p>
          <p class="card-text"><strong>Date:</strong> {{ booking.date }}</p>
          <p class="card-text"><strong>Time:</strong> {{ booking.time }}</p>
          <p class="card-text"><strong>Cost:</strong> {{ booking.cost }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const baseURL = "http://localhost:8080";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
  export default {
    data() {
      return {
        bookings:[],
      };
    },
    mounted(){
        const postdata = { id: this.$route.params.id }
        axios.post(`${baseURL}/api/get_details`, postdata).then(res => {
        console.log(res.data)
        this.bookings = res.data;
        }).catch(error => {
            console.log(error);
        })
    }
  };
  </script>
  
  <style scoped>
  .custom_card{
  width:18rem;
  /* background-color: rgb(23, 60, 97); */
  display: flex;
  /* justify-content: space-between; */
}
@media (max-width: 767px) {
  .custom_card {
    width: 100%;
  }
}
  </style>
  