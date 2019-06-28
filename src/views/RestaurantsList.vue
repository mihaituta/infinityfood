<template>
    <div class="wrapper">
        <v-layout justify-center row>
            <v-flex xs12 sm10 md10 lg12 xl8>
                <v-container class="mb-4">
                    <v-layout align-center justify-space-between row>
                        <v-flex xs7>
                            <div v-if="cityModel" class="logoText">Livrare de mancare de la cele mai bune restaurante
                                din orasul <b>{{cityModel}}</b></div>
                            <div v-else class="logoText">Livrare de mancare de la cele mai bune restaurante pe <b>InfinityFood</b>
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
                    <v-container style="width: 85%"  class="text-xs-center pb-0 pt-2">
                        <div v-if="!filteredList.length">
                            <div class="notFound">Ne pare rău, se pare că restaurantul <b>{{search}}</b> nu există sau
                                nu este înregistrat pe site-ul nostru.
                            </div>
                            <v-icon size="220">restaurant_menu</v-icon>
                        </div>
                    </v-container>
                    <v-layout row wrap class="mt-3">
                        <v-flex :key="restaurant.id" v-for="(restaurant) in filteredList" xs12 sm6 md4 lg3 xl3>
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
            };
        },
        computed: {
            cities() {
                return this.$store.getters.cities;
            },
            restaurants() {
                return this.$store.getters.restaurants;
            },

            filteredList() {
                let restaurants = this.$store.getters.restaurants.filter(restaurant => {
                    if (restaurant.name)
                        return restaurant.name.toLowerCase().includes(this.search.toLowerCase())
                });

                let restaurantsFromCity;

                if (this.cityModel) {
                    restaurantsFromCity = this.$store.getters.restaurants.filter(restaurant => {
                        if (restaurant.name) {
                            return restaurant.city.includes(this.cityModel);
                        }
                    })
                } else {
                    return restaurants;
                }

                if (this.search) {
                    return restaurantsFromCity.filter(restaurant => {
                        if (restaurant.name)
                            return restaurant.name.toLowerCase().includes(this.search.toLowerCase());
                    })
                } else {
                    return restaurantsFromCity;
                }

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
    .notFound {
        font-size: 30px;
        color: #5f6762;
    }

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