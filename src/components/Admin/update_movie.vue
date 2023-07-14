<template>
    <div>
        <div class="modal fade" id="updateShowModal" tabindex="-1" role="dialog" aria-labelledby="updateMovieModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content text-dark">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateMovieModalLabel">Update</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="m_Name" class="form-label">Movie Name</label>
                                <input type="text" class="form-control" id="m_Name" placeholder="Enter Movie name"
                                    v-model="movie" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="m_Date" class="form-label">Movie Date</label>
                                <input type="date" class="form-control" id="m_Date" placeholder="Enter Movie Date"
                                    v-model="MovieDate">
                            </div>
                            <div class="mb-3">
                                <label for="m_Time" class="form-label">Movie Time</label>
                                <input type="time" class="form-control" id="m_Time" placeholder="Enter Movie Time"
                                    v-model="MovieTime">
                            </div>
                            <div class="mb-3">
                                <label for="theater_">Theater :</label>
                                <select id="theater_" v-model="theaters" class="form-control">
                                    <option v-for="theater in Unique_Theaters">{{ theater }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="Location">Theater Location:</label>
                                <select id="Location" v-model="theaterLocation" class="form-control">
                                    <option v-for="location in TheaterLocation">{{ location }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="m_type">Movie type:</label>
                                <select id="m_type" v-model="movie_type" class="form-control">
                                    <option v-for="m_type in Movie_type">{{ m_type }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="price_" class="form-label">Price </label>
                                <input type="number" class="form-control" id="price_" placeholder="Enter ticket cost"
                                    v-model="price">
                            </div>
                            <div class="mb-3">
                                <label for="m_Image" class="form-label">Movie Image </label>
                                <input type="file" accept="image/*" id="m_Image" @change="handleFileChange"
                                    class="form-control-file" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="myButton" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="update">Save</button>
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
    store:store,
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
        async update() {
            const formData = new FormData();
            formData.append('m_id', this.id);
            formData.append('m_date', this.MovieDate);
            formData.append('m_time', this.MovieTime);
            formData.append('m_theater', this.theaters);
            formData.append('m_address', this.theaterLocation);
            formData.append('m_type', this.movie_type);
            formData.append('m_cost', this.price);
            formData.append('m_image', this.MovieImage);
            try {
                const res = await axios.put(`${baseURL}/api/update_movie`, formData)
                if (res.status == 200) {
                    console.log("successful");
                    window.location.reload();
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