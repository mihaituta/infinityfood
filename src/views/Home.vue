<template>
  <div class="home">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-view/>
      <v-img contain max-height="500" :src="require('../assets/biglogoBlue2.png')"></v-img>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped>

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
