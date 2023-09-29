<template>
  <div class="custom_cd">
    <div class="card text-white custom_card " v-for="movie in movies">
      <div class="card-header">
        <h5 class="card-title">{{ movie.name }}</h5>
      </div>
      <img class="card-img-top custom_img" :src="movie.image" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">Theater: {{ movie.theater }}</p>
        <p class="card-text">Type: {{ movie.type }}</p>
        <p class="card-text">Price: {{ movie.cost }}</p>
      </div>
    </div>
    <div class="card custom_card1 ">
      <div v-if="show" :class="['flash-message', type]" class="pos">
        <!-- <div v-if="type == 'error'" style="display: inline-block;">&#9888;</div>{{ message }} -->
        <!-- <div v-if="type == 'warning'" style="display: inline-block;"> &#x1F504;</div>{{ message }} -->
        <div v-if="type == 'success'" style="display: inline-block;">&#127881;</div> {{ message }}
        <button type="button" class="mx-2 close" @click="hideFlashMessage">&times;</button>
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tickets</h5>
        <div class="form-group">
          <label for="ticketCount">Number of Tickets:</label>
          <input type="number" class="form-control" v-model="ticketCount" placeholder="Enter number of tickets">
        </div>
        <div v-if="ticketCount">
          <div class="card-text custom_text">
            Fill the Details
          </div>
          <div v-for="index in parseInt(ticketCount)" :key="index" class="form-group input">
            <label :for="'name' + index">Name of Person {{ index }}:</label>
            <input type="text" class="form-control" :id="'name' + index" v-model="ticketDetails[index - 1].name"
              placeholder="Enter name">
            <label :for="'name' + index">Age of Person {{ index }}:</label>
            <input type="number" class="form-control" :id="'name' + index" v-model="ticketDetails[index - 1].age"
              placeholder="Enter age">
          </div>
          <div class="custom_cost_text">
            Total cost : {{ cost }}
          </div>
        </div>
        <div class="d-flex flex-column align-items-center my-2">
          <button type="submit" class="btn btn-primary text-center" @click="initiate_payment">Pay Now </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
import img from '@/assets/Movie-Ticket-Booking-1024x768.png'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
export default {
  data() {
    return {
      cost: 0,
      movies: [],
      ticketCount: 0,
      ticketDetails: [],
      result: [],
      show: false,
      message: '',
      type: ''
    };
  },
  watch: {
    ticketCount(newCount) {
      this.ticketDetails = [];
      for (let i = 0; i < newCount; i++) {
        this.ticketDetails.push({ name: '' });
        this.ticketDetails.push({ age: '' });
      }
      this.cost = newCount * this.movies[0].cost;
    },
  },
  methods: {
    showFlashMessage(message, type) {
      this.message = message;
      this.type = type;
      this.show = true;
      setTimeout(() => {
        this.hideFlashMessage();
      }, 3000);
    },
    async initiate_payment() {
      try {
        const user_id=localStorage.getItem('user_id');
        const postdata = {
          user_id: user_id,
          movie_id: this.$route.params.id,
          ticket: this.ticketDetails,
          total_ticket: this.ticketCount,
          cost: this.cost
        }
        const response = await axios.post(`${baseURL}/api/payment`, postdata);
        if (response.status == 200) {
          this.result = response.data;
          localStorage.setItem("ticket_count", this.ticketCount);
          const options = {
            key: this.result[0].razorpayKey,
            amount: this.cost * 100, // Amount in paise (e.g., 10000 for ₹100)
            currency: 'INR',
            order_id: this.result[0].razorpayOrderId,
            name: 'Movies.com',
            description: 'Test Payment',
            image: img,
            handler: this.handlePaymentSuccess,
            prefill: {
              name: 'John Doe',
              email: 'john@example.com',
              contact: '1234567890'
            }
          };
          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
        }
        else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    },
    hideFlashMessage() {
      this.show = false;
      this.message = '';
      this.type = '';
    },
    handlePaymentSuccess(response) {
      const paymentId = response.razorpay_payment_id;
      axios.post(`${baseURL}/api/payment/success`, { paymentId })
        .then((res) => {
          this.showFlashMessage(res.data.message, "success");
          console.log(res);
        })
        .catch((error) => {
          // this.showFlashMessage(error.data.message, "error");
          console.error(error);
        });
    }
  },
  mounted() {
    const postdata = { id: this.$route.params.id }
    axios.post(`${baseURL}/api/get_movies`, postdata).then(res => {
      this.movies = res.data;
    }).catch(error => {
      console.log(error.message);
    })
  }
};
</script>
<style>
.custom_card {
  width: 36rem;
  background-color: rgb(97, 23, 62);
}

.custom_img {
  height: 36rem;
}

.custom_cd {
  display: inline-flex;
}

.custom_text {
  text-align: center;
  color: aqua;
  border-style: groove;
  background-color: crimson;
}

.custom_card1 {
  margin-left: 5px;
  width: 38rem;
  color: rgb(199, 200, 205);
  background-color: rgb(112, 31, 74);
}

.input {
  border-style: dashed;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  background-color: rgb(4, 78, 11);
}

.custom_cost_text {
  text-align: center;
  color: aqua;
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
  .custom_card {
    width: 100%;
    margin: 0%;
  }

  .custom_img {
    height: 18rem;
  }

  .custom_card1 {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }

  .custom_cd {
    display: flex;
    flex-direction: column;
  }

  .pos {
    position: relative;
    bottom: 10px;
  }
}
</style>
