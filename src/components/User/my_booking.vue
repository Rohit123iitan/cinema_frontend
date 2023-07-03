<template>
    <table class="table table-striped table-responsive-sm">
      <thead class="bg-dark text-light">
        <tr>
          <th>ID</th>
          <th>Movie Name</th>
          <th>Theater Name</th>
          <th>Total Tickets</th>
          <th>Date</th>
          <th>Time</th>
          <th>Cost</th>
          <th></th>
        </tr>
      </thead >
      <tbody class="bg-light text-dark">
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.movie_name }}</td>
          <td>{{ ticket.theaterName }}</td>
          <td>{{ ticket.ticket_count }}</td>
          <td>{{ ticket.date }}</td>
          <td>{{ ticket.time }}</td>
          <td>{{ ticket.cost }}</td>
          <td><button class="btn btn-primary btn-sm" @click="navigateToDetails(ticket.id)">Details</button></td>
        </tr>
      </tbody>
    </table>
  </template>
  <script>
  const baseURL = "http://localhost:8080";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  export default {
    data() {
      return {
        tickets: []
      };
    },
    methods: {
      navigateToDetails(ticketId) {
        this.$router.push(`/user/my_booking/details/${ticketId}`);
      }
    },
    mounted() {
    const postdata = { user_id: 1 }
    axios.post(`${baseURL}/api/my_bookings`, postdata).then(res => {
      this.tickets = res.data;
    }).catch(error => {
      if(this.token==null){
        this.$router.push({path:'/'});
      }
    })
    }
  };
  </script>
<style>
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 50px;
}
</style>