<template>
    <div>
        <div v-if="show" :class="['flash-message', type]" class="pos">
            <div v-if="type == 'error'" style="display: inline-block;">&#9888;</div>
            <div v-if="type == 'warning'" style="display: inline-block;"> &#x1F504;</div>
            <div v-if="type == 'success'" style="display: inline-block;">&#127881;</div> {{ message }}
            <button type="button" class="mx-2 close" @click="hideFlashMessage">&times;</button>
        </div>
        <div class="d-flex justify-content-center align-items-center ">
            <button type="button" class="custom_buttom" data-toggle="modal" data-target="#exampleModal"
                data-whatever="@getbootstrap">Add Theater</button>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="addTheaterModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addTheaterModalLabel">Add Theater</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="theaterName" class="form-label">Theater Name</label>
                                <input type="text" class="form-control" id="theaterName" placeholder="Enter theater name"
                                    v-model="theaterName">
                            </div>
                            <div class="mb-3">
                                <label for="theaterAddress" class="form-label">Theater Address</label>
                                <input type="text" class="form-control" id="theaterAddress"
                                    placeholder="Enter theater address" v-model="theaterAddress">
                            </div>
                            <div class="mb-3">
                                <label for="theaterCapacity" class="form-label">Theater Capacity</label>
                                <input type="number" class="form-control" id="theaterCapacity"
                                    placeholder="Enter theater capacity" v-model="theaterCapacity">
                            </div>
                            <div class="mb-3">
                                <label for="MovieImage" class="form-label">Theater Image </label>
                                <input type="file" accept="image/*" id="MovieImage" @change="handleFileChange"
                                    class="form-control-file" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="myButton" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="register">Save</button>
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
            theaterName: '',
            theaterAddress: '',
            theaterCapacity: null,
            show: false,
            message: '',
            type: '',
            TheaterImage: null
        };
    },
    methods: {
        showFlashMessage(message, type) {
            this.message = message;
            this.type = type;
            this.show = true;
            setTimeout(() => {
                this.hideFlashMessage();
            }, 100000);
        },
        hideFlashMessage() {
            this.show = false;
            this.message = '';
            this.type = '';
        },
        async register() {
            const formData = new FormData();
            formData.append('image', this.TheaterImage);
            formData.append('t_name', this.theaterName);
            formData.append('t_address', this.theaterAddress);
            formData.append('t_capacity', this.theaterCapacity);
            console.log(formData)
            try {
                const res = await axios.post(`${baseURL}/api/add_theater`, formData)
                if (res.status != 200) {
                    this.$refs.myButton.click();
                    console.log(res);
                }
                else {
                    this.$refs.myButton.click();
                }
            } catch (error) {
                console.log(error);
                this.$refs.myButton.click();
                this.handleError(error);
            }

        },
        handleError(error) {
            this.showFlashMessage(error.response.data.message, "error");
        },
        handleFileChange(event) {
            this.TheaterImage = event.target.files[0];
        }
    },
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

@media (max-width: 767px) {
    .pos {
        position: relative;
        bottom: 10px;
    }
}
</style>