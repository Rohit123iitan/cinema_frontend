<template>
    <div>
      <div class="rating">
        Rate the movie : 
        <span v-for="star in stars" 
              :class="{ 'filled': star <= currentRating }" 
              @click="rate(star)"
              @dblclick="removeRating">
          &#9733;
        </span>
      </div>
    </div>
  </template>
  
  <script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  export default {
    props: ['movieId'],
    data() {
      return {
        stars: [1, 2, 3, 4, 5],
        currentRating: 0,
      };
    },
    methods: {
      async rate(star) {
        this.currentRating = star;
        const user_id=localStorage.getItem('user_id');
        const postdata={
          user_id:user_id,
          rating:this.currentRating,
          movie_id:this.movieId,
        }
        console.log(postdata);
        const res = await axios.post(`${baseURL}/api/save_rating`,postdata);
        if(res.status==200){
          console.log(res);
        }
        else{
          console.log(res);
        }
      },
      async removeRating() {
        this.currentRating = 0;
        const user_id=localStorage.getItem('user_id');
        const postdata={
          user_id:user_id,
          movie_id:this.movieId,
        }
        console.log(postdata);
        const res = await axios.post(`${baseURL}/api/remove_rating`,postdata);
        if(res.status==200){
          console.log(res);
        }
        else{
          console.log(res);
        }
      },
    },
    mounted(){
      const user_id=localStorage.getItem('user_id');
      const postdata={
        user_id:user_id,
        movie_id:this.movieId,
      }
      axios.post(`${baseURL}/api/get_rating`,postdata).then((res)=>{
        console.log(res);
        this.currentRating=res.data.rating;
      })
    }
  };
  </script>
  
  <style scoped>
  .rating {
    font-size: 18px;
    cursor: pointer;
  }
  
  .filled {
    color: gold;
  }
  </style>
  
  