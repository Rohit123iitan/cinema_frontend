<template>
    <div>
        <div class="dropleft  ml-auto">
          <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            @click="watched"> Notification
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill"
              viewBox="0 0 16 16">
              <path
                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
            <span v-if="count > 0" class="badge rounded-pill  bg-danger custom_pos">{{ count }}</span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li v-for="notification in notify">
              <a class="dropdown-item" href="#">{{ notification.name }} request for getting access for admin</a>
              <div class="row">
                <div class="col">
                    <button> add</button>
                </div>
                <div class="col ml-auto">
                    <button>remove</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  name: "admin",
  data() {
    return {
      count: 1,
      notify: []
    }
  },
  methods: {
    watched() {
      this.count = 0
      // axios.get(`${baseURL}/api/seen_notification`).then(res => {
      //   this.notify = res.data;
      //   this.count = this.notify.length;
      //   console.log(res);
      // }).catch(error => {
      //   if (error.response.request.status == 422) {
      //     this.$router.push({ path: '/admin_login' });
      //   }
      // })
    }
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    if (token === null) {
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
.custom_pos {
  position: relative;
  bottom: 5px;
  right: 5px;
}
</style>