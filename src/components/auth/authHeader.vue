<template>
    <v-toolbar dark color="primary">
        <v-toolbar-title>Administration</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-if="userRole === 1" flat to="/admin/stores">
                <v-icon left>restaurant</v-icon>
                Stores
            </v-btn>
            <v-btn v-if="userRole === 1" flat to="/admin/users">
                <v-icon left>people</v-icon>
                Users
            </v-btn>
            <v-btn v-if="userRole === 2" flat to="/staff/store">
                <v-icon left>restaurant</v-icon>
                Store
            </v-btn>
            <v-btn v-if="userRole === 2" flat to="/staff/menus">
                <v-icon left>fastfood</v-icon>
                Menus
            </v-btn>
            <v-btn flat v-if="userRole" @click="onLogout" class="logout">Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        computed: {
            userRole() {
                return this.$store.getters.role_id
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout')
            }
        }
    }
</script>

<style scoped>

</style>