<template>
    <v-layout justify-center row>
        <v-flex xs10 sm10 md10 lg11 xl8>
            <v-container>
                <v-layout row wrap>
                    <v-flex :key="store.id" v-for="(store, index) in stores" xs12 sm6 md4 lg3 xl3>
                        <v-layout justify-center>
                            <v-card
                                    height="50%"
                                    width="90%"
                                    class="store-card mb-4"
                                    @click="goToStore(store.slug)"
                            >
                                <div class="store-img">
                                    <v-img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                           height="90%" class="img"></v-img>
                                </div>

                                <v-card-title class="subheading font-weight-bold">
                                    <div style="font-family: 'Malgun Gothic',sans-serif">{{store.name}}</div>
                                    <span class="body-1 pt-1 font-weight-light text-truncate">
                                            Infinity food este un restaurant minunat
                                        </span>
                                </v-card-title>
                            </v-card>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data: function () {
            return {
                path: 'http://food/storage/menu-images/'
            };
        },
        computed: {
            stores() {
                return this.$store.getters.stores;
            }
        },
        methods: {
            goToStore(slug) {
                 this.$router.push({name: 'Store', params: {slug: slug}});
            }
        },

        created() {
            this.$store.dispatch('getStores');
        }

    };
</script>

<style scoped>
    div {
        font-size: 18px;
    }

    .item-card-title {
        /*font-family: Arial,sans-serif;*/

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