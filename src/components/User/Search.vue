<template>
    <div style="display: inline-flex;">
        <div class="card card_style">
            <div style="display: inline-flex;">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                </div>
                <input type="text" class="form-control " placeholder="Search..." @input="search"
                    v-on:keyup.enter="handleEnter" v-model="searchQuery" autofocus />
            </div>
            <div>
                <ul v-if="searchResults.length > 0 && filter=='movies'">
                    <li v-for="result in Unique_Movies" ><a
                            :href="`/user/search/${filter}/${result}`">{{
                                result}}</a></li>
                </ul>
                <ul v-if="searchResults.length > 0 && filter=='theaters'">
                    <li v-for="result in Unique_Movies" ><a
                            :href="`/user/search/${filter}/${result}`">{{
                                result}}</a></li>
                </ul>
            </div>
        </div>
        <div class="filter-options cst_input">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="filter-movies" value="movies" v-model="filter">
                <label class="form-check-label" for="filter-movies">Movies</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="filter-theaters" value="theaters" v-model="filter">
                <label class="form-check-label" for="filter-theaters">Theaters </label>
            </div>
        </div>
    </div>
</template>
  
<script>
const baseURL = "https://cinemaghar.onrender.com";
import axios from 'axios';
const token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default {
    data() {
        return {
            searchQuery: '',
            filter: 'movies',
            searchResults: [],
            Unique_Movies:[],
            Unique_theaters:[]
        };
    },
    
    methods: {
        search() {
            const postdata = {
                query: this.searchQuery
            }
            if (this.filter === 'theaters') {
                axios.post(`${baseURL}/api/search_theaters`, postdata).then(res => {
                    this.searchResults = res.data;
                    console.log(res);
                    for (let i = 0; i < this.searchResults.length; i++) {
                        const name = this.searchResults[i].name;

                        if (!this.Unique_theaters.includes(name)) {
                            this.Unique_theaters.push(name);
                        }
                    }
                })
            } else if (this.filter === 'movies') {
                axios.post(`${baseURL}/api/search_movies`, postdata).then(res => {
                    this.searchResults = res.data;
                    for (let i = 0; i < this.searchResults.length; i++) {
                        const name = this.searchResults[i].name;

                        if (!this.Unique_Movies.includes(name)) {
                            this.Unique_Movies.push(name);
                        }
                    }
                })
            }
        },
    },
};
</script>
  
<style scoped>
.card_style {
    flex-direction: column;
    z-index: 1;
    position: absolute;
    box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.1);
}

.filter-options {
    margin-top: 10px;
    margin-bottom: 4px;
}
.cst_input{
    display:inline-flex;
    margin-left: 16rem;
}

.form-check-inline {
    margin-left: 10px;
    margin-bottom: 2px;
}
</style>
  
  
  