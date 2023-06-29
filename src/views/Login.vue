<template>
  <div id="app">
    <nav>
      <router-link to="/">User</router-link> |
      <router-link to="/admin_login">Admin</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a:hover {
  color: #2c3e50;
  box-sizing: border-box;
  text-decoration: none;
  padding: 10px;
  background-color:lightgray;
  border-radius: 5px;
}

nav a.router-link-exact-active {
  color: #59f20c;
  box-sizing: border-box;
  padding: 10px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 0px 10px 10px 0px rgba(251, 6, 6, 0.929);
}
</style>
