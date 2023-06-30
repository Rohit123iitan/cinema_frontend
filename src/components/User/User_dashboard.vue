<template>
    <div>
        <div class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <a class="navbar-brand" href="#">My_Show.com</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/user">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/movies">Movies</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/theaters">Theaters</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/my_booking">My booking</a>
                    </li>
                </ul>
                <form class="form-inline ml-auto">
                    <search></search>
                </form>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="token==null">
                        <a class="nav-link  ctm_btn" href="/">Login</a>
                    </li>
                    <li class="nav-item" v-if="token">
                        <a class="nav-link  ctm_btn" @click="Logout">logout</a>
                    </li>
                </ul>
            </div>
        </div>
            <router-view />
    </div>
</template>
  
<script>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import search from '@/components/User/Search.vue';
export default {
    // name: 'user',
    data(){
        return{
            token:null,
        }
    },
    components:{
        search,
    },
    methods:{
        Logout(){
            localStorage.removeItem("access_token");
            this.token=null;
            this.$router.push({path:'/'});
        }
    },
    mounted(){
        this.token=localStorage.getItem('access_token');
        
    }
};
</script>
  
<style scoped>
.ctm_btn{
    border-radius: 20px;
    color: rgb(245, 245, 249) !important;
    background-color: rgba(3, 17, 95, 0.959);
    padding-left: 20px;
    padding-right: 20px;
    cursor:pointer;
}
.ctm_btn:hover{
    box-shadow: 0 0 0 0.2rem rgba(254, 4, 250, 0.881);

}
.navbar {
    /* margin-bottom: 20px; */
    background: linear-gradient(to right, #ff0000, #edf506eb);
    
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
    border-radius: 20px;
    margin-left: 5px;
}

@media (max-width: 767.98px) {
    .navbar-nav {
        flex-direction: column;
    }
    .navbar-nav .nav-item {
        margin-bottom: 10px;
    }
    .navbar-nav .nav-link {
        text-align: center;
    }
    .input-group {
        margin-top: 0;
        margin-bottom: 10px;
    }
    .ml-auto {
        margin-left: auto !important;
    }
}
</style>
  
  
