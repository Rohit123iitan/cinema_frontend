<template>
  <div>
    <div class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a class="navbar-brand" href="#">Cinemaghar</a>
      <div class="search1">
        <search></search>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/movies" class="nav-link">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/theater" class="nav-link">Theaters</router-link>
          </li>
        </ul>
        <Notification class="ml-auto text-center px-4"></Notification>
        <div class="navbar-nav nav-item px-4" >
            <a class="nav-link  ctm_btn" @click="generate_csv">Generate Report</a>
        </div>
        <ul class="navbar-nav ">
          <li class="nav-item" v-if="token == null">
            <a class="nav-link  ctm_btn" href="/admin_login">Login</a>
          </li>
          <li class="nav-item" v-if="token">
            <a class="nav-link  ctm_btn" @click="Logout">logout</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>
<script>
import search from '@/components/User/Search.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
import Notification from '@/components/Admin/notification.vue'
export default {
  name: "admin",
  data() {
    return {
      count: 1,
      notify: [],
      token: null,
    }
  },
  components: {
    Notification,
    search
  },
  methods: {
    Logout() {
      localStorage.removeItem("access_token");
      this.token = null;
      this.$router.push({ path: '/admin_login' });
    },
    async generate_csv(){
      const admin_id = localStorage.getItem('admin_id');
      const postdata={
        admin_id:admin_id,
      }
      const res = await axios.post(`${baseURL}/api/generate_csv_file`,postdata)
      if (res.status != 200) {
          console.log(res);
      }
      else {
          console.log(res);
      }
    }
  },
  mounted() {
    this.token= localStorage.getItem('access_token');
    if (this.token === null) {
      this.$router.push({
        path: '/admin_login'
      })
    }
    axios.get(`${baseURL}/api/get_notification`).then(res => {
      this.notify = res.data;
      this.count = this.notify.length;
      console.log(res);
    }).catch(error => {
      if (error.response.request.status == 422) {
        this.$router.push({ path: '/admin_login' });
      }
    })
  }
}
</script>
<style>
.ctm_btn{
    border-radius: 15px;
    color: rgb(245, 245, 249) !important;
    background-color: rgba(3, 17, 95, 0.959);
    padding-left: 20px;
    padding-right: 20px;
    cursor:pointer;
    margin-bottom: 5px;
}
.ctm_btn:hover{
    box-shadow: 0 0 0 0.2rem rgba(254, 4, 250, 0.881);

}
.navbar {
  margin-bottom: 0px !important;
  background: linear-gradient(to right, #5100ff, #06f5e9eb);
}

.navbar-brand {
  font-weight: bold;
}

.navbar-toggler {
  border-color: transparent;
  border-radius: 5px;
}

.navbar-nav .nav-item:hover {
  background-color: #f8f9fa7c;
  border-radius: 10px;
}
.search1{
    display: none;
}
@media (max-width: 992px) {
  .navbar-nav {
    flex-direction: column;
  }

  .navbar-nav .nav-item {
    margin-bottom: 10px;
  }

  .navbar-nav .nav-link {
    text-align: center;
  }

  .notify {
    margin-top: 0;

    margin-right: auto;
  }

  .ml-auto {
    margin-left: auto !important;
    margin-bottom: 10px;
  }
  .search{
        display: none;
    }
}
@media (min-width: 768px) and (max-width: 992px) {
    .search1{
        display: block;
    }
}
</style>
