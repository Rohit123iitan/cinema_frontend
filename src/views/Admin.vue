<template>
  <div id="app">
    <div class="row d-flex justify-content-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;background-color:blanchedalmond;">
          <div class="card-body p-4 text-center">
            <h3 class="mb-4">Sign in</h3>
            <div class="row">
              <label class="col-sm-4 col-form-label" for="admin">Admin name</label>
              <div class="col-sm-8">
                <input type="text" id="admin" class="form-control " v-model="admin_name" required/>
              </div>
            </div>
            <div class="row">
              <label for="email" class="col-sm-4 col-form-label">Email</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
            </div>
            <div class="row">
              <label for="password" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8">
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
            </div>
            <!-- Checkbox -->
            <div class="row">
              <div class="form-check d-flex justify-content-start mb-4">
                <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                <label class="form-check-label" for="form1Example3"> Remember password </label>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit" v-on:click="login">Login</button>
              </div>
            </div>
            <hr >
            <div  id="custom_btn">
              <p class="mb-0" ><admin_access></admin_access>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
import admin_access from '@/components/Admin/Admin_access.vue'
export default {
  data(){
    return{
      admin_name:'',
      email:'',
      password:'',
      register:'false',
    };
  },
  components:{
    admin_access,
  },
  methods:{
    async login() {
      const postData = {
        name: this.admin_name,
        email: this.email,
        password: this.password,

      };
      try {
        const res = await axios.post(`${baseURL}/api/admin_login`, postData)
        if (res.status == 200) {
          console.log(res);
          localStorage.setItem('access_token', res.data[0]);
          localStorage.setItem('admin_id', res.data[1]);
          return this.$router.push({ path: '/admin' });
        }
        else {
          console.log(res);
          // return this.$router.push({ path: '/' });
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
  
}
</script>
<style>
#custom_btn{
  background-color: aliceblue;
  padding: 10px;
  border-radius: 5px;
}
.row{
  margin: 10px;
}
</style>

