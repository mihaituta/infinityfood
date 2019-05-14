<template>
    <v-toolbar dark color="secondary">
        <v-toolbar-title>InfinityFood</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/admin/stores">
                <v-icon left>restaurant</v-icon>
                Home
            </v-btn>
            <v-btn flat to="/admin/users">
                <v-icon left>people</v-icon>
                Menus
            </v-btn>
            <v-btn flat to="/staff/store">
                <v-icon left>restaurant</v-icon>
                About
            </v-btn>
            <v-btn flat to="/staff/menus">
                <v-icon left>fastfood</v-icon>
                Contact
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>

</script>

<style scoped>

</style>