<template>
    <div class="wrapper">
        <v-container fluid style="width:95%">
            <notification text="Restaurantul a fost șters cu succes!" color="rgb(255, 82, 82, 0.9)" :top=true
                          :right=true
                          :showNotification="restaurantDeletedNotif"></notification>
            <notification text="Restaurantul a fost modificat cu succes!" color="rgb(76, 175, 80, 0.9)"
                          :showNotification="restaurantUpdatedNotif" :top=true :right=true></notification>
            <notification text="Există deja un restaurant cu acest nume!" color="rgb(255, 82, 82, 0.9)"
                          :showNotification="nameNotification" :top=true></notification>

            <add-modal/>
            <edit-modal v-if="openEditModal" v-model="openEditModal" :id='restaurantId'/>
            <delete-modal v-if="openDeleteModal" v-model="openDeleteModal" text="Doriți să ștergeți acest restaurant?"
                          :id='restaurantId' action="deleteRestaurant"/>
            <v-card class="mt-4 mb-5">
                <v-card-title class="headline">
                    Restaurante
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Caută"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        v-if="restaurants"
                        :headers="headers"
                        :items="restaurants"
                        :search="search"
                        :expand="expand"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="restaurant">
                        <tr @click="restaurant.expanded = !restaurant.expanded">
                            <td>{{ restaurant.item.id }}</td>
                            <td>{{ restaurant.item.name }}</td>
                            <td>{{ restaurant.item.slug }}</td>
                            <td>{{ restaurant.item.user_id }}</td>
                            <td>{{ restaurant.item.city }}</td>
                            <td>{{ restaurant.item.phone1 }}</td>
                            <td>{{ restaurant.item.phone2 }}</td>
                            <td>{{ restaurant.item.mail1 }}</td>
                            <td>{{ restaurant.item.mail2 }}</td>
                            <td class="pa-0" width="16%">

                                <v-btn small dark color="success" @click.stop="editRestaurant(restaurant.item.id)">
                                    <v-icon class="pr-1" size="16">edit</v-icon>
                                    Modifică
                                </v-btn>

                                <v-btn small @click.stop="deleteRestaurant(restaurant.item.id)" dark color="error">
                                    <v-icon class="pr-1" size="18">delete</v-icon>
                                    Șterge
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="restaurant">
                        <v-card style="text-align: justify;" flat>
                            <v-layout class="justify-space-around text-sm-center titleText mt-2">
                                <v-flex xs2>
                                    Descriere de prezentare
                                </v-flex>
                                <v-flex xs4>
                                    Descrierea restaurantului
                                </v-flex>
                                <v-flex xs4>
                                    Descrierea din secțiunea de contact
                                </v-flex>
                            </v-layout>
                            <v-layout class="justify-space-around  text-sm-center mt-3 mb-2">
                                <v-flex xs2 class="subheading">
                                    {{restaurant.item.previewDescription}}
                                </v-flex>
                                <v-flex xs4 class="subheading">
                                    {{restaurant.item.aboutText}}
                                </v-flex>
                                <v-flex xs4 class="subheading">
                                    {{restaurant.item.contactText}}
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>

                            <v-layout class="titleText justify-space-around text-sm-center mt-2">
                                <v-flex xs2>
                                    Logo-ul restaurantului
                                </v-flex>
                                <v-flex xs4>
                                    Imagine de fundal
                                </v-flex>
                                <v-flex xs4>
                                    Imagine de prezentare
                                </v-flex>
                            </v-layout>
                            <v-layout class="justify-space-around align-center mt-3 mb-3">

                                <v-flex xs2>
                                    <v-tooltip fixed top max-width="400px" color="white">
                                        <template v-slot:activator="{ on }">
                                            <v-img :src="path+restaurant.item.logoImage"
                                                   aspect-ratio="1"
                                                   height="170"
                                                   contain
                                                   v-on="on"
                                            ></v-img>
                                        </template>
                                        <img :src="path+restaurant.item.logoImage" width="100%"/>
                                    </v-tooltip>
                                </v-flex>

                                <v-flex xs4>
                                    <v-tooltip fixed top max-width="1000px" color="white">
                                        <template v-slot:activator="{ on }">
                                            <v-img :src="path+restaurant.item.backgroundImage"
                                                   aspect-ratio="1"
                                                   height="190"
                                                   contain
                                                   v-on="on"
                                            ></v-img>
                                        </template>
                                        <img :src="path+restaurant.item.backgroundImage" width="100%"/>
                                    </v-tooltip>
                                </v-flex>

                                <v-flex xs4>
                                    <v-tooltip fixed top max-width="800px" color="white">
                                        <template v-slot:activator="{ on }">
                                            <v-img :src="path+restaurant.item.previewImage"
                                                   aspect-ratio="1"
                                                   height="190"
                                                   contain
                                                   v-on="on"
                                            ></v-img>
                                        </template>
                                        <img :src="path+restaurant.item.previewImage" width="100%"/>
                                    </v-tooltip>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-card>
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            Nu există utilizatori.
                        </v-alert>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                            Nu s-a găsit nimic pentru "{{ search }}" .
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import addModal from '../modals/addRestaurantModal';
    import editModal from '../modals/editRestaurantModal';
    import deleteModal from '../modals/deleteModal';

    export default {
        data: function () {
            return {
                path: process.env.VUE_APP_RESTAURANT_IMAGES,
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Nume', value: 'name'},
                    {text: 'Slug', value: 'slug'},
                    {text: 'Staff', value: 'user_id'},
                    {text: 'Oraș', value: 'city'},
                    {text: 'Telefon 1', value: 'phone1'},
                    {text: 'Telefon 2', value: 'phone2'},
                    {text: 'E-mail 1', value: 'mail1'},
                    {text: 'E-mail 2', value: 'mail2'},
                    {text: 'Acțiuni', align: 'center', sortable: false}
                ],
                search: '',
                expand: false,
                openEditModal: false,
                openDeleteModal: false,
                restaurantId: null,
                restaurantDeletedNotif: false,
                restaurantUpdatedNotif: false,
                nameNotification: false,
            };
        },
        computed: {
            restaurants() {
                return this.$store.getters.restaurants;
            },
        },
        methods: {
            editRestaurant(id) {
                this.restaurantId = id;
                this.openEditModal = true;
            },
            deleteRestaurant(id) {
                this.restaurantId = id;
                this.openDeleteModal = true;
            },
            addDeleteNotification() {
                this.restaurantDeletedNotif = false;
                setTimeout(() => {
                    this.restaurantDeletedNotif = true;
                }, 200);
            },
            addUpdateNotification() {
                this.restaurantUpdatedNotif = false;
                setTimeout(() => {
                    this.restaurantUpdatedNotif = true;
                }, 200);
            },
            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 200);
            },
            emailErrorNotification() {
                this.emailNotification = false;
                setTimeout(() => {
                    this.emailNotification = true;
                }, 200);
            },
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrapper");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.4) + 'px');
            },
        },

        beforeCreate() {
            this.$store.dispatch('getRestaurantsComplete');
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        components: {
            'add-modal': addModal,
            'edit-modal': editModal,
            'delete-modal': deleteModal
        }
    };
</script>

<style scoped>
    .wrapper {
        /*       background-image: url('../../assets/b16.png');
               background-attachment: fixed;
               background-size: cover;*/
    }

    .titleText {
        font-family: 'Malgun Gothic', sans-serif;
        font-size: 18px;
        font-weight: 400;
    }
</style>