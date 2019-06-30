<template>
    <div>
        <restaurant-header/>
        <v-snackbar
                v-model="addNotification"
                :timeout="60000"
                top
                dark
                multi-line
                color="rgb(76, 175, 80, 0.9)"
                style="font-size: 18px"
                class="font-weight-light mt-4"
        >
            <div>Comanda a fost finalizată cu succes, aceasta va ajunge la
                dumneavoastră in aproximativ 50 de minute. <br> Mulțumim că ați comandat de la noi. Pofta bună!
            </div>
            <v-btn flat @click.native="addNotification = false">
                <v-icon size="21px">close</v-icon>
            </v-btn>
        </v-snackbar>

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

        <v-container fluid style="width:85%">
            <v-layout>
                <v-flex>
                    <div v-if="restaurant.aboutText" class="mb-3 sTitle t1">Despre noi</div>
                    <div style="color: #434543">
                        <div class="contentText mb-4">{{restaurant.aboutText}}</div>
                    </div>

                </v-flex>
            </v-layout>
        </v-container>

        <v-container v-if="menus.length" fluid class="pt-0 pb-2" style="width:85%">
            <v-divider></v-divider>
            <div class="mb-3 text-sm-center sTitle t2">
                Comandă acum
            </div>
            <v-layout>
                <v-flex xs9>
                    <v-tabs
                            grow
                            slider-color="black"
                            dark
                            color="primary"
                            class="mb-5"
                    >
                        <v-tab v-for="type in types" :key="type.id">
                            <v-icon style="text-shadow: 2px 2px black;" size="18" class="mr-2">{{getIcon(type)}}
                            </v-icon>
                            <div class="typeText ma-0 pa-0"><b>{{type}}</b></div>
                        </v-tab>
                        <v-tab-item v-for="type in types" :key="type.id">
                            <v-hover v-for="menu in menus" :key="menu.id" v-if="menu.type === type">
                                <v-card style="border-radius: 8px" slot-scope="{ hover }"
                                        :class="`elevation-${hover ? 10 : 3}`">
                                    <v-container class="mb-2 mt-3 pa-0">
                                        <v-layout>
                                            <v-flex align-self-center xs2 class="ma-2">
                                                <v-tooltip fixed right max-width="400px" color="white">
                                                    <template v-slot:activator="{ on }">
                                                        <v-img :src="menuPath+menu.image"
                                                               aspect-ratio="1"
                                                               width="140"
                                                               contain
                                                               v-on="on"
                                                        ></v-img>
                                                    </template>
                                                    <img :src="menuPath+menu.image" width="100%" alt=""/>
                                                </v-tooltip>
                                            </v-flex>
                                            <v-flex xs7 class="mt-3 mb-3 ml-2">
                                                <div class="menuTitle">{{ menu.name}}</div>
                                                <div class="menuContent mt-1">{{ menu.description }}</div>
                                            </v-flex>

                                            <v-flex xs4 mr-2>
                                                <v-layout align-center justify-end row fill-height>
                                                    <h2 class="mr-1" style="font-family: sans-serif;">{{
                                                        menu.price.toLocaleString("ro-RO",{minimumFractionDigits: 2}) }}
                                                        lei</h2>
                                                    <v-btn small fab color="error" @click.stop="addItem(menu)">
                                                        <v-icon size="30">add</v-icon>
                                                    </v-btn>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-hover>
                        </v-tab-item>
                    </v-tabs>

                    <div class="orderSection">
                        <div v-if="orderNow">
                            <v-divider class="mb-4"></v-divider>
                            <v-layout justify-center>
                                <v-card width="100%" class="mb-3 mt-4" style="border-radius:10px;">
                                    <v-form ref="form">
                                        <v-card-text class="pt-0 pb-0">
                                            <v-container class="pl-3 pr-3 pb-0">
                                                <v-layout column>
                                                    <v-flex xs12>
                                                        <div class="mb-2 finalOrderTitle">Eşti gata să serveşti masa?
                                                        </div>
                                                    </v-flex>

                                                    <v-flex xs12>
                                                        <v-divider></v-divider>
                                                        <div class="mt-3 finalOrderText">Unde dorești să fie livrată
                                                            comanda?
                                                        </div>
                                                    </v-flex>

                                                    <v-layout class="justify-space-between mt-3">
                                                        <v-text-field
                                                                prepend-inner-icon="place"
                                                                v-model="address.adresa"
                                                                label="Adresă (strada, numarul) *"
                                                                outline
                                                                :rules="addressRules"
                                                                class="pr-3"
                                                        ></v-text-field>
                                                        <v-text-field
                                                                prepend-inner-icon="place"
                                                                v-model="address.bloc"
                                                                label="Bloc"
                                                                outline
                                                                class="pl-3"
                                                        ></v-text-field>
                                                    </v-layout>

                                                    <v-layout class="justify-space-between">
                                                        <v-text-field
                                                                prepend-inner-icon="place"
                                                                v-model="address.scara"
                                                                label="Scara"
                                                                outline
                                                                class="pr-3"
                                                        ></v-text-field>
                                                        <v-text-field
                                                                prepend-inner-icon="place"
                                                                v-model="address.etaj"
                                                                label="Etaj"
                                                                outline
                                                                class="pl-3"
                                                        ></v-text-field>
                                                    </v-layout>

                                                    <v-layout class="justify-space-between">
                                                        <v-text-field
                                                                prepend-inner-icon="place"
                                                                v-model="address.apartament"
                                                                label="Apartament"
                                                                outline
                                                                class="pr-3"
                                                        ></v-text-field>
                                                        <v-text-field
                                                                prepend-inner-icon="phone"
                                                                v-model="address.interfon"
                                                                label="Interfon"
                                                                outline
                                                                class="pl-3"
                                                        ></v-text-field>
                                                    </v-layout>
                                                    <v-textarea
                                                            prepend-inner-icon="description"
                                                            v-model="address.informations"
                                                            label="Obiecții, preferințe (dacă este cazul)"
                                                            outline
                                                            rows="1"
                                                            auto-grow
                                                    ></v-textarea>

                                                    <v-flex xs12>
                                                        <v-divider></v-divider>
                                                        <div class="mt-3 finalOrderText">Cum te putem contacta?</div>
                                                    </v-flex>

                                                    <v-layout class="justify-space-between mt-3">
                                                        <v-text-field
                                                                prepend-inner-icon="person"
                                                                v-model="address.name"
                                                                label="Nume, prenume *"
                                                                :rules="nameRules"
                                                                outline
                                                                class="pr-3"
                                                        ></v-text-field>
                                                        <v-text-field
                                                                prepend-inner-icon="phone_android"
                                                                v-model="address.phone"
                                                                :rules="phoneRules"
                                                                label="Număr de telefon *"
                                                                outline
                                                                class="pl-3"
                                                        ></v-text-field>
                                                    </v-layout>
                                                </v-layout>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions class="mb-4 pl-5">
                                            <v-btn large class="pr-3 pl-3" style="font-size: 20px;" color="primary"
                                                   @click.prevent="onSubmit">
                                                Plasesază comanda
                                            </v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </v-layout>
                        </div>
                    </div>
                </v-flex>

                <v-flex xs3 class="pl-3">
                    <v-card class="orderCard" style="border-radius:4px;">
                        <v-toolbar
                                style="text-shadow: 2px 2px 2px black"
                                height="47px"
                                color="primary"
                                dark
                        >
                            <v-toolbar-title>
                                <div style="font-size: 22px;">Comandă</div>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-icon>restaurant</v-icon>
                        </v-toolbar>

                        <v-layout v-if="!items.length && items" column class="text-xs-center pt-5 pb-5">
                            <v-flex>
                                <v-icon size="110">shopping_cart</v-icon>
                            </v-flex>

                            <v-flex class="subheading">Coșul tău este gol,</v-flex>
                            <v-flex class="subheading">umple-l cu ceva delicios!</v-flex>
                        </v-layout>

                        <v-container v-else class="pb-2 pr-0 pl-3 pt-0">
                            <div class="orderItems pt-3">
                                <v-layout
                                        v-for="item in items"
                                        :key="item.id"
                                        column
                                        class="pr-0"
                                >
                                    <v-layout row>
                                        <v-flex xs8 class="subheading">
                                            {{item.nr}}x {{item.name}}
                                        </v-flex>

                                        <v-flex xs4 class="subheading text-sm-right pr-2">
                                            <b>{{item.price.toLocaleString("ro-RO",{minimumFractionDigits: 2})}} lei</b>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row class="ma-0 pr-1">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                icon
                                                style="height:25px;width:25px;"
                                                color="error"
                                                small
                                                fab
                                                @click="addMore(item)"
                                        >
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        <v-btn
                                                icon
                                                style="height:25px;width:25px;"
                                                color="error"
                                                small
                                                fab
                                                @click="removeItem(item)"
                                        >
                                            <v-icon>remove</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <v-divider class="mt-1 mb-2 mr-3"></v-divider>
                                </v-layout>
                            </div>

                            <v-layout class="mt-3">
                                <div class="title">TOTAL</div>
                                <v-spacer></v-spacer>
                                <div
                                        class="title pr-3"
                                        style="color: #cd0a00;">
                                    {{totalPrice.toLocaleString("ro-RO",{minimumFractionDigits: 2})}} lei
                                </div>
                            </v-layout>

                            <v-card-actions class="justify-center mt-3">
                                <v-btn
                                        large
                                        class="pl-5 pr-5 mr-3"
                                        style="font-size: 20px;"
                                        color="primary"
                                        @click="order"
                                >
                                    Comandă Acum
                                </v-btn>
                            </v-card-actions>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container class="pt-0" fluid style="width:85%">
            <v-divider class="mb-2 mt-2"></v-divider>
            <v-layout>
                <v-flex>
                    <div class="mb-3 mt-3 sTitle t3">Contact</div>
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
                items: [],
                totalPrice: null,
                path: process.env.VUE_APP_RESTAURANT_IMAGES,
                menuPath: process.env.VUE_APP_MENU_IMAGES,
                duration: 1000,
                offset: 40,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
                icons:
                    {
                        'Felul întâi': 'restaurant',
                        'Fel principal': 'room_service',
                        'Fastfood': 'fastfood',
                        'Pizza': 'local_pizza',
                        'Desert': 'cake',
                        'Băuturi': 'local_bar',
                    },
                address: {
                    name: null,
                    phone: null,
                    city: null,
                    adresa: null,
                    bloc: null,
                    scara: null,
                    etaj: null,
                    apartament: null,
                    interfon: null,
                    informations: null
                },
                addressRules: [
                    v => !!v || 'Numele este obligatoriu',
                ],
                nameRules: [
                    v => !!v || 'Numele este obligatoriu',
                ],
                phoneRules: [
                    v => !!v || 'Numărul de telefon este obligatoriu',
                    v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'Numărul trebuie să conțină doar cifre'
                ],

                orderNow: false,
                addNotification: false,

            };
        },
        methods: {
            orderCreatedNotification() {
                this.addNotification = false;
                setTimeout(() => {
                    this.addNotification = true;
                }, 100);
            },
            onSubmit() {

                if (!this.$refs.form.validate()) {
                    return;
                }

                let orderData = {};

                let items = this.items.map(item => ' ' + item.nr + 'x ' + item.name);
                orderData.menus = items.toString();
                orderData.name = this.address.name;
                orderData.phone = this.address.phone;
                orderData.city = this.restaurant.city;
                orderData.adresa = this.address.adresa;
                orderData.store_id = this.restaurant.id;
                orderData.totalPrice = this.totalPrice;

                if (this.address.bloc !== '')
                    orderData.bloc = this.address.bloc;
                if (this.address.scara !== '')
                    orderData.scara = this.address.scara;
                if (this.address.etaj !== '')
                    orderData.etaj = this.address.etaj;
                if (this.address.apartament !== '')
                    orderData.apartament = this.address.apartament;
                if (this.address.interfon !== '')
                    orderData.interfon = this.address.interfon;
                if (this.address.informations !== '')
                    orderData.informations = this.address.informations;

                this.$vuetify.goTo('.t2', this.optionsFinalOrder);
                this.$store.dispatch('addOrder', orderData).then((res) => {
                    if (res.responseType === 'success') {
                        this.orderNow = false;
                        this.orderCreatedNotification();
                        this.address = {};
                        this.totalPrice = null;
                        this.items = [];
                    }
                });
            },
            order() {
                this.orderNow = true;
                if (this.orderNow)
                    this.$vuetify.goTo('.orderSection', this.options);
            },
            addItem(menu) {
                let item = this.items.find(item => item.id === menu.id);

                if (item) {
                    item.nr++;
                    this.totalPrice += item.price;
                } else {
                    this.items.push({id: menu.id, nr: 1, name: menu.name, price: menu.price});
                    this.totalPrice += menu.price;
                }
            },
            addMore(item) {
                item.nr++;
                this.totalPrice += item.price;
                console.log(item);
            },
            removeItem(item) {
                item.nr--;
                this.totalPrice -= item.price;
                if (item.nr === 0)
                    this.items.splice(this.items.indexOf(item), 1);
            },
            getIcon(type) {
                return this.icons[type];
            },
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrap");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
            }
        },

        computed: {
            types() {
                return this.$store.getters.restaurantMenuTypes;
            },
            menus() {
                return this.$store.getters.restaurantMenus;
            },
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
            optionsFinalOrder() {
                return {
                    duration: 700,
                    offset: 80,
                    easing: this.easing
                }
            },
        },

        created() {
            window.scrollTo(0, 0);

            this.$store.dispatch('getRestaurantComplete', this.$route.params.slug).then((res) => {
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
    .orderCard {
        position: sticky;
        top: 80px;
    }

    .orderItems {
        max-height: 350px;
        overflow: auto;
        font-family: 'Malgun Gothic', sans-serif;
    }

    .finalOrderText {
        font-size: 27px;
        font-family: sans-serif;
    }

    .finalOrderTitle {
        font-size: 40px;
        font-family: sans-serif;
    }

    .wrap {
        height: 560px;
        font-size: 55px;
        color: white;
        text-shadow: 6px 6px 3px black;
        width: 100%;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .typeText {
        font-size: 17px;
        text-shadow: 2px 2px 2px black;
        font-family: 'Malgun Gothic', sans-serif;
    }

    .menuTitle {
        font-size: 18px;
        font-family: 'Malgun Gothic', sans-serif;
        font-weight: bold;

    }

    .menuContent {
        font-size: 16px;
        font-family: sans-serif;

    }

    .contentText {
        font-size: 21px;
        font-family: sans-serif;
        text-align: justify;
    }

    .sTitle {
        font-size: 30px;
        font-family: sans-serif;
    }

    .logodiv {
        font-size: 110px;
        font-weight: bold;
        font-family: sans-serif;

    }
</style>

