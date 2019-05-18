<template>
    <v-toolbar dark color="secondary">
        <v-toolbar-title>InfinityFood</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/admin/stores">
                <v-icon class="pr-2">restaurant</v-icon>
                Acasă
            </v-btn>
            <v-btn flat to="/admin/users">
                <v-icon class="pr-2">people</v-icon>
                Meniuri
            </v-btn>
            <v-btn flat to="/staff/store">
                <v-icon class="pr-2">restaurant</v-icon>
                Despre noi
            </v-btn>
            <v-btn flat to="/staff/menus">
                <v-icon class="pr-2">fastfood</v-icon>
                Contact
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>

</script>

<style scoped>

</style>