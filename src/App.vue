<template>
    <div id="app">
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
                  rel="stylesheet">
        </head>
        <v-app>
            <app-header/>
            <router-view/>
        </v-app>
    </div>
</template>

<script>
    import authHeader from "./components/auth/authHeader";
    export default {
        name: 'app',
        components: {
            'app-header': authHeader
        },
    }
</script>

<style>
    #app {
              font-family: 'Avenir', Helvetica, Arial, sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-align: center;
              color: #2c3e50;
          }
</style>
