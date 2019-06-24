<template>
    <div>
        <head>
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
                  rel="stylesheet">
        </head>
        <v-app>
            <auth-header v-if="logged"/>
            <app-header v-else-if="showNavbar"/>
            <router-view/>
            <app-footer/>
            <btn-to-top/>
        </v-app>
    </div>
</template>

<script>
    import authHeader from './components/auth/authHeader';
    import header from './components/utils/header';
    import footer from './components/utils/footer';
    import buttonToTop from "./components/utils/buttonToTop";

    export default {
        data() {
            return {
                showNavbar: true
            }
        },
        components: {
            'auth-header': authHeader,
            'app-header': header,
            'app-footer': footer,
            'btn-to-top': buttonToTop
        },
        computed: {
            logged() {
                return this.$store.getters.isAuthenticated;
            }
        },
        watch: {
            $route(to, from) {
                if (this.$router.currentRoute.name === 'restaurant') {
                    this.showNavbar = false;
                } else {
                    this.showNavbar = true;
                }
            }
        },
        created() {
            if (this.$router.currentRoute.name === 'restaurant') {
                this.showNavbar = false;
            } else {
                this.showNavbar = true;
            }
        }
    };
</script>

<style>
    button {
        text-transform: none;
    }
</style>
