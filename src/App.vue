<template>
    <div>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
                  rel="stylesheet">
        </head>
        <v-app>
            <auth-header v-if="logged"/>
            <app-header v-else/>
            <router-view/>
            <app-footer/>
        </v-app>
    </div>
</template>

<script>
    import authHeader from './components/auth/authHeader';
    import header from './components/utils/header';
    import footer from './components/utils/footer';


    export default {
        components: {
            'auth-header': authHeader,
            'app-header': header,
            'app-footer': footer
        },
        computed: {
            logged() {
                return this.$store.getters.isAuthenticated;
            }
        }
    };
</script>

<style>
    button {
        text-transform: none;
    }
</style>
