<template>
    <div>
        <div class="modal fade" id="deleteTheater" tabindex="-1" role="dialog" aria-labelledby="deleteTheaterLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content ">
                    <div class="modal-header alert-danger">
                        <p class="modal-title" id="deleteTheaterLabel">Are you sure want to delete ? {{ theater }}</p>
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
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    props: ['theater','id'],
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
                t_id:this.id,
            }
            try {
                const res = await axios.put(`${baseURL}/api/delete_theater`, postdata)
                if (res.status == 200) {
                    console.log("deleted");
                    window.location.reload();
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
            this.theaterImage = event.target.files[0];
        }
    },
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