<template>
    <div id="app">
      <div class="row d-flex justify-content-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style="border-radius: 1rem;background-color:blanchedalmond;">
            <div class="card-body p-4 text-center">
              <h3 class="mb-4">Sign up</h3>
              <div class="row">
                <label class="col-sm-4 col-form-label" for="name">Username</label>
                <div class="col-sm-8">
                  <input type="text" id="name" class="form-control " v-model="username" required/>
                </div>
              </div>
              <div class="row">
                <label for="email" class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
              </div>
              <div class="row">
                <label for="new_password" class="col-sm-4 col-form-label">New Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="new_password" v-model="new_password" required>
                </div>
              </div>
              <div class="row">
                <label for="confirm_password" class="col-sm-4 col-form-label">Confirm Password</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" id="confirm_password" v-model="confirm_password" required>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                  <button class="btn btn-primary btn-lg btn-block" v-on:click="register">Register</button>
                </div>
              </div>
              <hr class="my-4">
              <div>
                <p class="mb-0" style="-webkit-text-fill-color:darkolivegreen;">Have an account? <a href="/">Login</a>
                </p>
              </div>
            </div>
          </div>
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
      username: '',
      new_password: '',
      confirm_password: '',
      email: '',
    };
  },
  methods: {
    // showFlash() {
    //   setTimeout(() => {
    //     this.flash = null
    //   }, 3000)
    // },
    async register() {
      const postData = {
        name: this.username,
        email: this.email,
        new_password: this.new_password,
        confirm_password: this.confirm_password
      };
      try {
        const res = await axios.post(`${baseURL}/api/user_registration`, postData)
        if (res.status != 200) {
          console.log(res);
          // this.flash = res.data.result;
          // this.showFlash();
          // return this.$router.push({ path: '/' });
        }
        else {
          return this.$router.push({ path: '/' });
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  }
  </script>
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  nav {
    padding: 30px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  .row{
    margin: 10px;
  }
  
  nav a.router-link-exact-active {
    color: #42b983;
  }
  </style>