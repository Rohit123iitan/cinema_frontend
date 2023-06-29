<template>
  <div class="container custm_container">
    <div class="card custm_card">
      <div class="card-body text-center">
        <h1 class="card-title ">Welcome to Show.com!</h1>
        <p class="card-text">The ultimate destination for movie lovers.</p>
        <hr>
        <p class="card-text">Book your movie tickets online with ease and convenience.</p>
        <!-- <p>
          <img class="card-img img-fit" src="../../assets/Movie-Ticket-Booking-1024x768.png" alt="movies_img">
        </p> -->
        <div class="btn btn-primary" @click="check_login">Browse Movies</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WelcomeNote',
  methods:{
    check_login(){
      const token=localStorage.getItem('access_token');
      if(token===null){
        console.log(token);
        this.$router.push({
          path:'/'
        })
      }
      else{
        this.$router.push({path:'/user/movies'})
      }
    }
  }
};
</script>
<style>
.custm_container {
  background: linear-gradient(to right, #1a640b, #d9ff00);
  margin-top: 40px;
}
.img-fit{
  width:50%;
  height: 10%;
  border-radius: 5px;
}
.custm_card {
  border-radius: 50px;
  box-shadow: 0px 10px 10px 0px rgba(251, 6, 18, 0.588);
}

@media (max-width: 576px) {
  .card {
    margin: 20px;
    box-shadow: 0px 10px 10px 0px rgba(251, 6, 18, 0.588);
    border-radius: 40px;
  }
}
</style>

  
  