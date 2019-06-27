<template>
    <div class="wrapper">
        <v-layout justify-center row>
            <v-flex xs12 sm10 md10 lg12 xl8>
                <v-container class="mb-4">
                    <v-layout align-center justify-space-between row>
                        <v-flex xs7>
                            <div class="logoText">Livrare de mancare de la cele mai bune restaurante din orasul <b>Craiova</b>
                            </div>
                        </v-flex>
                        <v-img contain max-width="430"
                               :src="require('../assets/biglogoBlue2f.png')"></v-img>
                    </v-layout>
                    <v-layout align-center row justify-space-between class="mt-4">
                        <v-flex xs6 sm5 md4 lg3 xl4>
                            <v-text-field
                                    prepend-inner-icon="search"
                                    v-model="search"
                                    label="Caută un restaurant.."
                                    class="headline"
                                    height="60"
                                    solo
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs6 sm5 md4 lg3 xl4>
                            <v-autocomplete
                                    prepend-inner-icon="location_city"
                                    v-model="cityModel"
                                    :items=cities
                                    label="Alege un Oraș"
                                    height="60"
                                    solo
                                    clearable
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="mt-3">
                        <v-flex :key="restaurant.id" v-for="(restaurant, index) in filteredList" xs12 sm6 md4 lg3 xl3>
                            <v-layout justify-center>
                                <v-card
                                        height="50%"
                                        width="90%"
                                        class="store-card mb-4"
                                        @click="goToRestaurant(restaurant.slug)"
                                >
                                    <div class="store-img">
                                        <v-img :src="path+restaurant.previewImage"
                                               height="180" width="100%" class="img"></v-img>
                                    </div>

                                    <v-card-title class="subheading font-weight-bold">
                                        <v-layout column wrap>
                                            <v-flex>
                                                <div class="name">
                                                    {{restaurant.name}}
                                                </div>
                                            </v-flex>
                                            <v-flex>
                                            <span class="body-1 pt-1 font-weight-light text-truncate">
                                                {{ restaurant.previewDescription }}
                                             </span>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-title>
                                </v-card>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                path: process.env.VUE_APP_RESTAURANT_IMAGES,
                search: '',
                cityModel: null,
                city: [
                    'pizza',
                    'kfc',
                    'spartan',
                    'inf',
                ],
                cities: [
                    'Craiova', 'Bucuresti', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                    'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                    'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
                    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                    'Missouri', 'Montana', 'Nebraska', 'Nevada',
                    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                    'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
                    'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                    'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
                    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
                ]
            };
        },
        computed: {
            stores() {
                return this.$store.getters.restaurants;
            },

            filteredList() {
                return this.$store.getters.restaurants.filter(restaurant => {
                    if (restaurant.name)
                        return restaurant.name.toLowerCase().includes(this.search.toLowerCase())
                });
                // let restaurants = this.$store.getters.stores.filter(store => {
                //     if (store.name)
                //         return store.name.toLowerCase().includes(this.search.toLowerCase())
                // });

                // if (this.cityModel) {
                //     return this.$store.getters.stores.filter(store => {
                //         if (store.name) {
                //             return store.name.toLowerCase().includes(this.cityModel.toLowerCase());
                //         }
                //     })
                // } else {
                //     return restaurants;
                // }
            },
        },
        methods: {
            goToRestaurant(slug) {
                this.$router.push({name: 'restaurant', params: {slug: slug}});
            },
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrapper");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.1) + 'px');
            },
        },

        created() {
            this.$store.dispatch('getRestaurantsPreviews');
            console.info('App currentRoute:', this.$router.currentRoute)
            window.scrollTo(0, 0);
            window.addEventListener('scroll', this.handleScroll);

        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }

</script>

<style scoped>
    .name {
        font-size: 18px;
        font-family: 'Malgun Gothic', sans-serif;
    }

    .logoText {
        font-size: 50px;
        font-family: 'Malgun Gothic', sans-serif
    }

    .wrapper {
        margin: 0;
        padding: 0;
        background-image: url('../assets/b17.png');
        background-attachment: fixed;
        background-size: cover;
    }

    .v-text-field .v-label {
        font-size: 50px;
    }

    span {
        color: #64675f;
        font-family: 'Malgun Gothic', sans-serif;
    }

    .store-card:hover .img {
        transform: scale(1.08);
    }

    .store-card {
        transition: 0.5s ease;
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
        cursor: pointer;
        border-radius: 10px;
    }

    .store-card:hover {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
    }

    .store-img .img {
        transition: 0.4s ease;
    }

    .store-img {
        overflow: hidden;
    }
</style>