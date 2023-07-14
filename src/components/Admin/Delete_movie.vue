<template>
    <div>
        <div class="modal fade" id="deleteMovie" tabindex="-1" role="dialog" aria-labelledby="deleteMovieLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header alert-danger">
                        <p class="modal-title" id="deleteMovieLabel">Are you sure want to delete ? {{ movie }}</p>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="d-flex justify-content-end ">
                        <button type="button" ref="myButton" class="btn btn-secondary m-2" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary m-2" @click="save">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const baseURL = "http://localhost:8080";
import store from '@/store';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    props: ['movie','id'],
    data() {
        return {
            movie_name:'',
            MovieDate: '',
            MovieTime: '',
            theaterLocation: '',
            movie_type: '',
            price: null,
            MovieImage: null,
            theaters: '',
            Theaters: [],
            Unique_Theaters: [],
            TheaterLocation: [],
            show: false,
            message: '',
            type: '',
            Movie_type: ['Drama', 'Action', 'Horror', 'Comedy', 'Animated']
        };
    },
    watch: {
        theaters(name) {
            this.theaterLocation = '';
            this.TheaterLocation = [];
            for (let i = 0; i < this.Theaters.length; i++) {
                const location = this.Theaters[i].address;
                if (!this.TheaterLocation.includes(location) && name == this.Theaters[i].name) {
                    this.TheaterLocation.push(location);
                }
            }
        },
    },
    methods: {
        showFlashMessage(message, type) {
            this.message = message;
            this.type = type;
            this.show = true;
            setTimeout(() => {
                this.hideFlashMessage();
            }, 3000); // Hide the flash message after 3 seconds (adjust as needed)
        },
        hideFlashMessage() {
            this.show = false;
            this.message = '';
            this.type = '';
        },
        async save() {
            const postdata={
                m_id:this.id,
            }
            try {
                const res = await axios.put(`${baseURL}/api/delete_movie`, postdata)
                if (res.status == 200) {
                    console.log("deleted");
                    // this.$refs.myButton.click();
                }
                else {
                    // this.$refs.myButton.click();
                }
            } catch (error) {
                // this.$refs.myButton.click();
            }

        },
        handleError(error) {
            this.showFlashMessage(error.message, "error");
        },
        handleFileChange(event) {
            this.MovieImage = event.target.files[0];
        }
    },
    mounted() {
        axios.get(`${baseURL}/api/get_theater_data`).then(res => {
            this.Theaters = res.data;
            for (let i = 0; i < this.Theaters.length; i++) {
                const name = this.Theaters[i].name;

                if (!this.Unique_Theaters.includes(name)) {
                    this.Unique_Theaters.push(name);
                }
            }
        }).catch(error => {
            if (error.response.request.status == 422) {
                this.$router.push({ path: '/admin_login' });
            }
        })
    }
}
</script>
<style>
.custom_buttom1 {
    padding: 5px;
    border-radius: 10px;
    background-color: gray;
}

.flash-message {
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    color: #ffffff;
}

.success {
    background-color: green;
}

.error {
    background-color: red;
}

.warning {
    background-color: orange;
}
</style>