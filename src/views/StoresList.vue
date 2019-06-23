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
                        <v-flex :key="store.id" v-for="(store, index) in filteredList" xs12 sm6 md4 lg3 xl3>
                            <v-layout justify-center>
                                <v-card
                                        height="50%"
                                        width="90%"
                                        class="store-card mb-4"
                                        @click="goToStore(store.slug)"
                                >
                                    <div class="store-img">
                                        <v-img :src="images[index]"
                                               height="180" width="100%" class="img"></v-img>
                                    </div>

                                    <v-card-title class="subheading font-weight-bold">
                                        <v-layout column wrap>
                                            <v-flex>
                                                <div class="name">
                                                    {{store.name}}
                                                </div>
                                            </v-flex>
                                            <v-flex>
                                            <span class="body-1 pt-1 font-weight-light text-truncate">
                                                {{ text[index] }}
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
                path: 'http://food/storage/menu-images/',
                images: [
                    'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', //infinityfood
                    'https://www.joc.com/sites/default/files/field_feature_image/KFC_0.png', //kfc
                    'https://www.onlineqatar.com/portals/0/Images/living/Dining-Entertainments/pizza-hut-qatar.jpg', //pizza hut
                    'http://pizzeria-mario-lino.de/wp-content/uploads/2012/10/20161122_212810-1024x768.jpg', //pizzeria mario
                    'https://mirajpizza.ro/wp-content/uploads/2017/08/piept_pui_2.jpg', //la familiar
                    'http://nrai.org/site/wp-content/uploads/2018/10/mcdonalds-fast-food.jpg', //mc donalds
                    'https://eucemananc.ro/uploads/cover/18767566_1202786246499241_5126678999309654559_n.jpg', // spartan
                    'https://i2-prod.mirror.co.uk/incoming/article10001303.ece/ALTERNATES/s615/Dominos-Pizza.jpg', //dominos
                ],
                text: [
                    'Fast-Food | Bauturi | Romanesc',
                    'Fast-Food | Internațional | Bauturi',
                    'Pizza | Italienesc | Desert',
                    'Pizza | Italienesc | Desert',
                    'Fast-food | Bauturi | Romanesc',
                    'Fast-Food | Internațional | Desert',
                    'Fast-Food | Specific Grecesc | Desert',
                    'Pizza | Italienesc | Bauturi',

                ],
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
                return this.$store.getters.stores;
            },

            filteredList() {
               return this.$store.getters.stores.filter(store => {
                    if (store.name)
                        return store.name.toLowerCase().includes(this.search.toLowerCase())
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
            goToStore(slug) {
                this.$router.push({name: 'Store', params: {slug: slug}});
            }
        },

        created() {
            this.$store.dispatch('getStores');
            console.info('App currentRoute:', this.$router.currentRoute)

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

    .item-card-title {
        /*font-family: Arial,sans-serif;*/

    }

    .wrapper {
        margin: 0;
        padding: 0;
        /*background-image: url('../assets/b8.png');*/
        /*background-size: cover;*/


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