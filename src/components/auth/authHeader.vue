<template>
    <v-toolbar dark color="dark">
        <v-toolbar-title>
            <div v-if="userRole === 'Admin'">Administrare</div>
            <div v-else-if="userRole === 'Staff'">Staff</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-if="userRole === 'Admin'" flat to="/admin/magazine">
                <v-icon class="pr-2">restaurant</v-icon>
                Restaurante
            </v-btn>
            <v-btn v-if="userRole === 'Admin'" flat to="/admin/utilizatori">
                <v-icon class="pr-2">people</v-icon>
                Utilizatori
            </v-btn>
            <v-btn v-if="userRole === 'Staff'" flat to="/staff/magazin">
                <v-icon class="pr-2">restaurant</v-icon>
                Restaurant
            </v-btn>
            <v-btn v-if="userRole === 'Staff'" flat to="/staff/meniuri">
                <v-icon class="pr-2">fastfood</v-icon>
                Meniuri
            </v-btn>
            <v-btn flat v-if="userRole" @click="onLogout" class="logout">
                <v-icon class="pr-2">exit_to_app</v-icon>
                Deconectează-te
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        computed: {
            userRole() {
                return this.$store.getters.role_id;
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout');
            }
        }
    };
</script>

<style scoped>

</style>