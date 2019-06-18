<template>
    <!--    <v-toolbar dark color="#295ec4">-->
    <v-toolbar dark color="dark">
        <router-link to="/">
            <v-img contain width="300" :src="require('../assets/'+logoImage)"/>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn color="" flat to="/">
                <v-icon class="pr-2">restaurant</v-icon>
                Acasă
            </v-btn>
            <v-btn color="" flat to="/staff/store">
                <v-icon class="pr-2">people</v-icon>
                Despre noi
            </v-btn>
            <v-btn color="" flat to="/staff/menus">
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
                if (this.$router.currentRoute.name === 'storeslist') {
                    this.logoImage = 'smallLogoWhiteBlue.png';
                } else if (this.$router.currentRoute.name === 'login') {
                    this.logoImage = 'smallLogoWhiteRed4.png';
                }
            }
        },
        created() {
            if (this.$router.currentRoute.name === 'storeslist') {
                this.logoImage = 'smallLogoWhiteBlue.png';
            } else if (this.$router.currentRoute.name === 'login')
                this.logoImage = 'smallLogoWhiteRed4.png';
        },
    }
</script>

<style scoped>
    .logobtn {
        text-decoration: none;
        color: white;
        font-size: 22px;
    }
</style>