<template>
    <div>
        <div v-if="show" :class="['flash-message', type]" class="pos">
            <div v-if="type == 'error'" style="display: inline-block;">&#9888;</div>
            <div v-if="type == 'warning'" style="display: inline-block;"> &#x1F504;</div>
            <div v-if="type == 'success'" style="display: inline-block;">&#127881;</div> {{ message }}
            <button type="button" class="mx-2 close" @click="hideFlashMessage">&times;</button>
        </div>
        <div style="display: inline-flex;">
            <a data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Get access</a>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="addTheaterModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addTheaterModalLabel">Get access</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="registered">Have you already registered as a user?</label>
                            <select class="form-control" id="registered" v-model="registered">
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div v-if="registered == 'no'">
                            <div class="mb-3">
                                <label for="admin_name" class="form-label">Admin name</label>
                                <input type="text" class="form-control" id="admin_name" placeholder="Enter your name"
                                    v-model="admin_name">
                            </div>
                            <div class="mb-3">
                                <label for="new_password" class="form-label">New password</label>
                                <input type="text" class="form-control" id="new_password" placeholder="Enter new password"
                                    v-model="new_password">
                            </div>
                            <div class="mb-3">
                                <label for="confirm_password" class="form-label">Confirm password</label>
                                <input type="number" class="form-control" id="confirm_password"
                                    placeholder="Enter confirm password" v-model="confirm_password">
                            </div>
                        </div>
                        <div v-if="registered == 'yes'">
                            <div class="mb-3">
                                <label for="admin_name" class="form-label">Admin name</label>
                                <input type="text" class="form-control" id="admin_name" placeholder="Enter your name"
                                    v-model="admin_name">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" ref="myButton" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="register">Post</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const baseURL = "http://localhost:8080";
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    data() {
        return {
            registered: '',
            admin_name: '',
            new_password: '',
            confirm_password: '',
            show: false,
            message: '',
            type: ''
        };
    },
    watch: {
        registered(new_val) {
            this.registered = new_val;
        },
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
            if (this.registered == 'no') {
                const postData = {
                    a_name: this.admin_name,
                    a_new_password: this.new_password,
                    a_confirm_password: this.confirm_password,
                    registered:this.registered
                };
                try {
                    const res = await axios.post(`${baseURL}/api/get_admin_access`, postData)
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
            }
            if (this.registered == 'yes') {
                const postData = {
                    a_name: this.admin_name,
                    registered:this.registered
                };
                try {
                    const res = await axios.post(`${baseURL}/api/get_admin_access`, postData)
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
            }
        },
        handleError(error) {
            this.showFlashMessage(error.response.data.message, "error");
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