<template>
    <div>
        <restaurant-header/>
        <v-layout class="wrap">
            <v-container fill-height>
                <v-layout align-center justify-center>
                    <!--  <v-img class="mt-3 mr-2" max-width="215px"
                             :src="require('../assets/bluewhitelogo3.png')"></v-img>-->
                    <div class="logodiv">{{restaurant.name}}</div>
                </v-layout>
            </v-container>
        </v-layout>
        <v-container style="width:70%">
            <v-layout class="text-sm-center">
                <v-flex>
                    <div class="mb-3 sTitle t1">Despre noi</div>
                    <div style="color: #434543">
                        <div class="text mb-2">Ce este InfinityFood? O echipă creativă și dinamică, antrenată cu
                            zambete și voie bună.
                        </div>
                        <div class="text mb-2">Ce face InfinityFood? Lucrează cu optimism în a vă oferi cele mai
                            bune servicii pentru a comanda mancare online.
                        </div>
                        <div class="text mb-2">Ce motivează InfinityFood? Dorința de a oferi zi de zi servicii de
                            calitate la un nivel realizat doar de profesioniști.
                        </div>
                        <div class="text mb-4">Ce oferă InfinityFood? Posibilitatea de a savura preparate delicioase
                            de la restaurantele din zona în care vă aflati. O gamă variata de bucătării văstau la
                            dispoziție cu doar câteva click-uri.
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="mb-3 mt-3 sTitle t2">Cum comanzi</div>
                    <div class="text mb-2">1. Alege orașul și restaurantul de la care vrei să comanzi.</div>
                    <div class="text mb-2">2. Adaugă mâncarea pe care ți-o dorești apăsând pe +, iar când ai terminat
                        apasă pe "Comandă Acum".
                    </div>
                    <div class="text mb-2">3. Completează locația și datele tale de contact, după care apasă pe
                        "Plasează comanda" pentru a confirma.
                    </div>
                    <div class="text mb-4">4. Poftă bună! Mâncarea este pregătită și livrată la ușa ta de către
                        restaurant.
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
                duration: 1000,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
            };
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
        methods: {
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrap");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
            }
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
        height: 450px;
        font-size: 55px;
        color: white;
        text-shadow: 2px 2px black;
        width: 100%;
        background-image: url('../assets/aboutbgdark.png');
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .text {
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
        /*#526372*/
        font-family: sans-serif;

    }

    .comandabtn {
        font-size: 35px;
        height: 55px;
        font-family: sans-serif;
        border-radius: 5px;
    }


</style>