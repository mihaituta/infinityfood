<template>
    <div>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
                  rel="stylesheet">
        </head>
        <v-app dark>
            <auth-header v-if="logged"/>
            <app-header v-else/>
            <router-view/>
        </v-app>
    </div>
</template>

<script>
    import authHeader from "./components/auth/authHeader";
    import header from "./components/header";

    export default {
        components: {
            'auth-header': authHeader,
            'app-header': header
        },
        computed: {
            logged() {
                return this.$store.getters.isAuthenticated;
            }
        },
    }
</script>

<style>
    button{
        text-transform: none;
    }
</style>
