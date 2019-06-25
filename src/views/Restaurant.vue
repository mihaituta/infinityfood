<template>
    <div>
        <restaurant-header/>
        <v-layout class="wrap" v-if="restaurant.backgroundImage"
                  :style="{ backgroundImage: 'url('+path+restaurant.backgroundImage+')'}">
            <v-container fill-height>
                <v-layout align-center justify-center>
                    <v-img v-if="restaurant.logoImage" class="mr-2" max-width="215px"
                           :src="path+restaurant.logoImage"></v-img>
                    <div class="logodiv">{{restaurant.name}}</div>
                </v-layout>
            </v-container>
        </v-layout>
        <v-container style="width:70%">
            <v-layout class="text-sm-center">
                <v-flex>
                    <div v-if="restaurant.aboutText" class="mb-3 sTitle t1">Despre noi</div>
                    <div style="color: #434543">
                        <div class="contentText mb-4">{{restaurant.aboutText}}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="mb-3 mt-3 sTitle t2">Contact</div>
                    <div class="contentText mb-2">{{restaurant.contactText}}</div>
                    <div class="contentText mb-4">
                        <v-flex class="mb-2">
                            <v-icon>phone</v-icon>
                            Telefon:
                            <span style="color: #1b6cc4;">{{restaurant.phone1}}</span>
                        </v-flex>

                        <v-flex v-if="restaurant.phone2" class="mb-2">
                            <v-icon>phone</v-icon>
                            Telefon:
                            <span style="color: #1b6cc4;">{{restaurant.phone2}}</span>
                        </v-flex>

                        <v-flex class="mb-2">
                            <v-icon>mail</v-icon>
                            E-mail:
                            <span style="color: #1b6cc4;">{{restaurant.mail1}}</span>
                        </v-flex>

                        <v-flex v-if="restaurant.mail2" class="mb-2">
                            <v-icon>mail</v-icon>
                            E-mail:
                            <span style="color: #1b6cc4;">{{restaurant.mail2}}</span>
                        </v-flex>
                    </div>
                    <v-divider class="mb-2"></v-divider>
                    <v-btn
                            color="primary"
                            class="pl-4 pr-4 mt-4 mb-3 comandabtn t3"
                            to="/"
                    >
                        Comandă acum
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import restaurantHeader from '../components/utils/restaurantHeader';
    import * as easings from 'vuetify/es5/util/easing-patterns'

    export default {
        data() {
            return {
                path: process.env.VUE_APP_RESTAURANT_IMAGES,
                duration: 1000,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
            };
        },

        methods: {
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrap");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
            }
        },

        computed: {
            restaurant() {
                return this.$store.getters.restaurant;
            },

            target() {
                const value = this[this.type];
                if (!isNaN(value)) return Number(value);
                else return value
            },

            options() {
                return {
                    duration: this.duration,
                    offset: this.offset,
                    easing: this.easing
                }
            },
        },

        created() {
            window.scrollTo(0, 0);

            this.$store.dispatch('getRestaurant', this.$route.params.slug).then((res) => {
                if (res.responseType === 'error') {
                    this.$router.replace({name: 'error', params: {'0': '404'}});
                }
            });

            window.addEventListener('scroll', this.handleScroll);

        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        components: {
            'restaurant-header': restaurantHeader,
        }
    }
</script>

<style scoped>
    .wrap {
        height: 500px;
        font-size: 55px;
        color: white;
        text-shadow: 6px 6px 3px black;
        width: 100%;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .contentText {
        font-size: 22px;
        font-family: sans-serif;
        text-align: justify;
    }

    .sTitle {
        font-size: 45px;
        font-family: sans-serif;

    }

    .logodiv {
        font-size: 110px;
        font-weight: bold;
        font-family: sans-serif;

    }

    .comandabtn {
        font-size: 35px;
        height: 55px;
        font-family: sans-serif;
        border-radius: 5px;
    }
</style>

<!--

<template>
    <div>
        <restaurant-header/>
        <v-layout class="wrap" v-if="restaurant.backgroundImage">
            &lt;!&ndash;
                              :style="{ backgroundImage: 'url('+path+restaurant.backgroundImage+')'}">
            &ndash;&gt;
            <v-container fill-height>
                <v-layout align-center justify-center>
                    <v-img v-if="restaurant.logoImage" class="mr-2" max-width="215px"
                           src="https://banner2.kisspng.com/20171210/52f/food-logo-design-5a2d21f3b1a6e2.1617100015129072517277.jpg"></v-img>
                    <div class="logodiv">La Familiar</div>
                </v-layout>
            </v-container>
        </v-layout>
        <v-container style="width:70%">
            <v-layout class="text-sm-center">
                <v-flex>
                    <div v-if="restaurant.aboutText" class="mb-3 sTitle t1">Despre noi</div>
                    <div style="color: #434543">
                        <div class="contentText mb-4">{{restaurant.aboutText}}</div>
                    </div>
                    <v-divider></v-divider>
                    <div class="mb-3 mt-3 sTitle t2">Contact</div>
                    <div class="contentText mb-2">{{restaurant.contactText}}</div>
                    <div class="contentText mb-4">
                        <v-flex class="mb-2">
                            <v-icon>phone</v-icon>
                            Telefon:
                            <span style="color: #1b6cc4;">{{restaurant.phone1}}</span>
                        </v-flex>

                        <v-flex v-if="restaurant.phone2" class="mb-2">
                            <v-icon>phone</v-icon>
                            Telefon:
                            <span style="color: #1b6cc4;">{{restaurant.phone2}}</span>
                        </v-flex>

                        <v-flex class="mb-2">
                            <v-icon>mail</v-icon>
                            E-mail:
                            <span style="color: #1b6cc4;">{{restaurant.mail1}}</span>
                        </v-flex>

                        <v-flex v-if="restaurant.mail2" class="mb-2">
                            <v-icon>mail</v-icon>
                            E-mail:
                            <span style="color: #1b6cc4;">{{restaurant.mail2}}</span>
                        </v-flex>
                    </div>
                    <v-divider class="mb-2"></v-divider>
                    <v-btn
                            color="primary"
                            class="pl-4 pr-4 mt-4 mb-3 comandabtn t3"
                            to="/"
                    >
                        Comandă acum
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import restaurantHeader from '../components/utils/restaurantHeader';
    import * as easings from 'vuetify/es5/util/easing-patterns'

    export default {
        data() {
            return {
                path: process.env.VUE_APP_RESTAURANT_IMAGES,
                duration: 1000,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
            };
        },

        methods: {
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrap");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
            }
        },

        computed: {
            restaurant() {
                return this.$store.getters.restaurant;
            },

            target() {
                const value = this[this.type];
                if (!isNaN(value)) return Number(value);
                else return value
            },

            options() {
                return {
                    duration: this.duration,
                    offset: this.offset,
                    easing: this.easing
                }
            },
        },

        created() {
            window.scrollTo(0, 0);

            this.$store.dispatch('getRestaurant', this.$route.params.slug).then((res) => {
                if (res.responseType === 'error') {
                    this.$router.replace({name: 'error', params: {'0': '404'}});
                }
            });

            window.addEventListener('scroll', this.handleScroll);

        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        components: {
            'restaurant-header': restaurantHeader,
        }
    }
</script>

<style scoped>
    .wrap {
        height: 500px;
        font-size: 55px;
        color: white;
        text-shadow: 6px 6px 3px black;
        width: 100%;
        background-image: url('https://cdn.foodism.co.uk/featured_image/5aec6b3c831df.jpeg');
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .contentText {
        font-size: 22px;
        font-family: sans-serif;
        text-align: justify;
    }

    .sTitle {
        font-size: 45px;
        font-family: sans-serif;

    }

    .logodiv {
        font-size: 110px;
        font-weight: bold;
        font-family: sans-serif;

    }

    .comandabtn {
        font-size: 35px;
        height: 55px;
        font-family: sans-serif;
        border-radius: 5px;
    }
</style>
-->
