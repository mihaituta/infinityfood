<template>
    <v-toolbar color="white">
        <router-link to="/">
                <v-img contain width="250" :src="require('../assets/smallLogoBlue.png')"/>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/">
                <v-icon dark class="pr-2">home</v-icon>
                Acasă
            </v-btn>
            <v-btn flat to="/restaurante">
                <v-icon class="pr-2">restaurant</v-icon>
                Restaurante
            </v-btn>
            <v-btn flat to="/staff/store">
                <v-icon class="pr-2">people</v-icon>
                Despre noi
            </v-btn>
            <v-btn flat to="/staff/menus">
                <v-icon class="pr-2">mail</v-icon>
                Contact
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>

</script>

<style scoped>
    .logobtn {
        text-decoration: none;
        color: white;
        font-size: 22px;
    }
</style>