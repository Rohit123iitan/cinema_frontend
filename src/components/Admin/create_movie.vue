<template>
    <div>
        <div v-if="show" :class="['flash-message', type]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-shield-exclamation" viewBox="0 0 16 16">
                <path
                    d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                <path
                    d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            {{ message }}
            <button class="custom_buttom1" @click="hideFlashMessage">Close</button>
        </div>
        <div class="d-flex justify-content-center align-items-center ">
            <button type="button" class="custom_buttom" data-toggle="modal" data-target="#exampleModal"
                data-whatever="@getbootstrap">Add Movie</button>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="addMovieModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addMovieModalLabel">Add Movie</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="MovieName" class="form-label">Movie Name</label>
                                <input type="text" class="form-control" id="MovieName" placeholder="Enter Movie name"
                                    v-model="MovieName">
                            </div>
                            <div class="mb-3">
                                <label for="MovieDate" class="form-label">Movie Date</label>
                                <input type="date" class="form-control" id="MovieDate" placeholder="Enter Movie Date"
                                    v-model="MovieDate">
                            </div>
                            <div class="mb-3">
                                <label for="MovieTime" class="form-label">Movie Time</label>
                                <input type="time" class="form-control" id="MovieTime" placeholder="Enter Movie Time"
                                    v-model="MovieTime">
                            </div>
                            <div class="mb-3">
                                <label for="theater">Theater :</label>
                                <select id="theater" v-model="theaters" class="form-control">
                                    <option v-for="theater in Unique_Theaters">{{ theater }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="theaterLocation">Theater Location:</label>
                                <select id="theaterLocation" v-model="theaterLocation" class="form-control">
                                    <option v-for="location in TheaterLocation">{{ location }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="movie_type">Movie type:</label>
                                <select id="movie_type" v-model="movie_type" class="form-control">
                                    <option v-for="m_type in Movie_type">{{ m_type }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Price </label>
                                <input type="number" class="form-control" id="price" placeholder="Enter ticket cost"
                                    v-model="price">
                            </div>
                            <div class="mb-3">
                                <label for="MovieImage" class="form-label">Movie Image </label>
                                <input type="file" accept="image/*" id="MovieImage" @change="handleFileChange"
                                    class="form-control-file" />
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="myButton" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    data() {
        return {
            MovieName: '',
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
            this.theaterLocation='';
            this.TheaterLocation=[];
            for (let i = 0; i < this.Theaters.length; i++) {
                const location = this.Theaters[i].address;
                if (!this.TheaterLocation.includes(location) && name==this.Theaters[i].name) {
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
            const formData = new FormData();
            formData.append('m_name', this.MovieName);
            formData.append('m_date', this.MovieDate);
            formData.append('m_time', this.MovieTime);
            formData.append('m_theater', this.theaters);
            formData.append('m_address', this.theaterLocation);
            formData.append('m_type', this.movie_type);
            formData.append('m_cost', this.price);
            formData.append('m_image', this.MovieImage);
            try {
                const res = await axios.post(`${baseURL}/api/add_movie`, formData)
                if (res.status != 200) {
                    this.$refs.myButton.click();
                }
                else {
                    this.$refs.myButton.click();
                }
            } catch (error) {
                this.$refs.myButton.click();
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
            console.log(this.Unique_Theaters);
        }).catch(error => {
            if (error.response.request.status == 422) {
                this.$router.push({ path: '/admin_login' });
            }
        })
    }
}
</script>
<style>
.custom_buttom {
    padding: 10px;
    border-radius: 50px;
    background-color: blueviolet;
}

.custom_buttom1 {
    padding: 5px;
    border-radius: 10px;
    background-color: gray;
}

.custom_buttom:hover {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
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