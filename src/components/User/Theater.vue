<template>
  <table class="table table-striped ">
    <thead class="bg-dark text-light">
      <tr>
        <th>Theater Name</th>
        <th>Locations</th>
        <th>Capacity</th>
        <th><select class="form-control" id="LocationsFilter" v-model="selectedLocations">
            <option value="">All Locations</option>
            <option v-for="location in Locations" :value="location">{{ location }}</option>
          </select></th>
      </tr>
    </thead >
    <tbody class="bg-light text-dark">
      <tr v-for="theater in Theaters" v-if="theater.address===selectedLocations || selectedLocations===''" >
        <td>{{ theater.name }}</td>
        <td>{{ theater.address }}</td>
        <td>{{ theater.capacity }}</td>
        <td><button class="btn btn-primary btn-sm" @click="Details(theater.name,theater.id)">Details</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token=localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
  data() {
    return {
      selectedLocations:'',
      Theaters: [],
      Locations:[]
    };
  },
  methods:{
    Details(name,Id) {
        this.$router.push(`/user/theaters/details/${name}/${Id}`);
      }
  },
  mounted() {
    axios.get(`${baseURL}/api/get_theater_data`).then(res => {
      this.Theaters = res.data;
      for (let i = 0; i < this.Theaters.length; i++) {
        const location = this.Theaters[i].address;

      if (!this.Locations.includes(location)) {
        this.Locations.push(location);
      }
    }
      console.log(res);
    }).catch(error => {
      console.log(error);
        this.$router.push({path:'/admin_login'});
    })
  }
}
</script>
<style>

</style>