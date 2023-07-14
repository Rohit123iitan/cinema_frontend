<template>
  <div>
    <Create_theater class="my-2"></Create_theater>
    <div class="card p-2">
      <div class="card-header custom_header1 ">
        <div class="card-text text-center ">Exisiting Theater</div>
      </div>
    </div>
    <div class="row">
      <div class="card text-white m-2 custom_card " v-for="theater in Theaters">
        <div class="card-header text-center">
          <h5 class="card-title">{{ theater.name }}</h5>
        </div>
        <img class="card-img-top custom_img" :src="theater.image" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">Location: {{ theater.address }}</p>
          <p class="card-text">Capacity: {{ theater.capacity }}</p>
        </div>
        <hr>
        <div class="hb">
            <button v-on:click="updateTheater(theater.name,theater.id)" type="button" class="custom_buttom" data-toggle="modal" data-target="#updateTheaterModal" data-whatever="@getbootstrap">Update</button>
            <Update_theater :theater='name' :id="id"></Update_theater>
            <button v-on:click="updateTheater(theater.name,theater.id)" type="button" id="custom_buttom" data-toggle="modal" data-target="#deleteTheater" data-whatever="@getbootstrap">Delete</button>
        </div>
        <Delete_theater :theater='name' :id="id"></Delete_theater>
      </div>
    </div>
  </div>
</template>
<script>
import Create_theater from "@/components/Admin/create_theater.vue"
import Update_theater from "@/components/Admin/update_theater.vue"
import Delete_theater from "@/components/Admin/Delete_theater.vue"
const baseURL = "http://localhost:8080";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  components: {
    Create_theater,
    Update_theater,
    Delete_theater,
  },
  data() {
    return {
      Theaters: [],
      name:'',
      id:'',
    };
  },
  methods: {
    updateTheater(name,id){
      this.name=name;
      this.id=id;
    },
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
#custom_buttom {
    border-radius: 50px;
    background-color: rgb(243, 47, 8);
}

#custom_buttom:hover {
    box-shadow: 0 0 0 0.2rem rgba(255, 183, 0, 0.485);
}

.custom_buttom {
    padding: 10px;
    border-radius: 50px;
    background-color: blueviolet;
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