<template>
    <!--    <v-toolbar dark color="#295ec4">-->
    <v-toolbar dark color="dark">
        <router-link to="/">
            <v-img v-if="logoImage" contain width="280" :src="require('../../assets/'+logoImage)"/>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn color="" flat to="/">
                <v-icon class="pr-2">restaurant</v-icon>
                Acasă
            </v-btn>
            <v-btn color="" flat to="/despre-noi">
                <v-icon class="pr-2">people</v-icon>
                Despre noi
            </v-btn>
            <v-btn color="" flat to="/contact">
                <v-icon class="pr-2">mail</v-icon>
                Contact
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        data: function () {
            return {
                logoImage: ''
            }
        },
        watch: {
            $route(to, from) {
                if (this.$router.currentRoute.name === 'storeslist')
                    this.logoImage = 'smallLogoWhiteBlue2.png';
                else if (this.$router.currentRoute.name === 'login')
                    this.logoImage = 'smallLogoWhiteRed4.png';
                else
                    this.logoImage = 'smallLogoWhiteBlue2.png';
            }
        },
        created() {
            if (this.$router.currentRoute.name === 'storeslist') {
                this.logoImage = 'smallLogoWhiteBlue2.png';
            } else if (this.$router.currentRoute.name === 'login')
                this.logoImage = 'smallLogoWhiteRed4.png';
            else
                this.logoImage = 'smallLogoWhiteBlue2.png';
        }
    }
</script>

<style scoped>

</style>