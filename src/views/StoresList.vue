<template>
    <v-container fluid style="width:80%">
        <!--        <v-tabs fixed-tabs color="transparent" centered>-->
        <!--            <v-tab v-for="type in types" :key="type.id">-->
        <!--                {{type}}-->
        <!--            </v-tab>-->
        <!--            <v-tab-item v-for="type in types" :key="type.id">-->
        <!--                <v-container fluid grid-list-sm class="pa-2 mt-2">-->
        <!--                    <v-layout class="text-xs-center">-->
        <!--                        <v-flex xs1>-->
        <!--                            <div>Imagine</div>-->
        <!--                        </v-flex>-->
        <!--                        <v-flex xs2>-->
        <!--                            <div>Nume</div>-->
        <!--                        </v-flex>-->
        <!--                        <v-flex xs4>-->
        <!--                            <div>Descriere</div>-->
        <!--                        </v-flex>-->
        <!--                        <v-flex xs1>-->
        <!--                            <div>Preț</div>-->
        <!--                        </v-flex>-->
        <!--                        <v-flex xs1>-->
        <!--                            <div>Tip</div>-->
        <!--                        </v-flex>-->
        <!--                        <v-flex xs3>-->
        <!--                            <div>Acțiuni</div>-->
        <!--                        </v-flex>-->
        <!--                    </v-layout>-->
        <!--                </v-container>-->
        <!--                <v-hover v-for="menu in menus" :key="menu.id" v-if="menu.type === type">-->

        <!--                    <v-card slot-scope="{ hover }"-->
        <!--                            :class="`elevation-${hover ? 8 : 2}`">-->
        <!--                        <v-container fluid grid-list-sm class="mb-2 mt-2 pa-1">-->
        <!--                            <v-layout align-center justify-center row wrap fill-height class="text-xs-center">-->
        <!--                                <v-flex xs1>-->
        <!--                                    <v-tooltip fixed right max-width="60%" color="white">-->
        <!--                                        <template v-slot:activator="{ on }">-->
        <!--                                            <v-img :src="path+menu.image"-->
        <!--                                                   aspect-ratio="1"-->
        <!--                                                   height="90"-->
        <!--                                                   width="90"-->
        <!--                                                   contain-->
        <!--                                                   v-on="on"-->
        <!--                                            ></v-img>-->
        <!--                                        </template>-->
        <!--                                        <img :src="path+menu.image" width="100%"/>-->
        <!--                                    </v-tooltip>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs2>-->
        <!--                                    <div>{{ menu.name}}</div>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs4>-->
        <!--                                    <div>{{ menu.description}}</div>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs1>-->
        <!--                                    <div>{{ menu.price}} ron</div>-->
        <!--                                </v-flex>-->
        <!--                                <v-flex xs1>-->
        <!--                                    <div>{{ menu.type}}</div>-->
        <!--                                </v-flex>-->

        <!--                                <v-flex xs3>-->
        <!--                                    <v-layout align-center justify-center row fill-height>-->

        <!--                                        <v-btn dark color="success" @click.stop="menuById(menu.id)">-->
        <!--                                            <v-icon class="pr-2" size="20">edit</v-icon>-->
        <!--                                            Modifică-->
        <!--                                        </v-btn>-->

        <!--                                        <v-btn @click.stop="menuById2(menu.id)" dark color="error">-->
        <!--                                            <v-icon class="pr-1" size="22">delete</v-icon>-->
        <!--                                            Șterge-->
        <!--                                        </v-btn>-->
        <!--                                    </v-layout>-->
        <!--                                </v-flex>-->
        <!--                            </v-layout>-->
        <!--                        </v-container>-->
        <!--                    </v-card>-->
        <!--                </v-hover>-->
        <!--            </v-tab-item>-->
        <!--        </v-tabs>-->
        <v-hover v-for="store in stores" :key="store.id">

            <v-card slot-scope="{ hover }"
                    :class="`elevation-${hover ? 8 : 2}`">
                <v-container fluid grid-list-sm class="mb-2 mt-2 pa-1">
                    <v-layout align-center justify-center row wrap fill-height class="text-xs-center">
                        <v-flex xs1>
<!--                            <v-tooltip fixed right max-width="60%" color="white">-->
<!--                                <template v-slot:activator="{ on }">-->
<!--                                    <v-img :src="path+menu.image"-->
<!--                                           aspect-ratio="1"-->
<!--                                           height="90"-->
<!--                                           width="90"-->
<!--                                           contain-->
<!--                                           v-on="on"-->
<!--                                    ></v-img>-->
<!--                                </template>-->
<!--                                <img :src="path+menu.image" width="100%"/>-->
<!--                            </v-tooltip>-->
                        </v-flex>
                        <v-flex xs1>
                            <div>{{ store.id}}</div>
                        </v-flex>
                        <v-flex xs2>
                            <div>{{ store.name}}</div>
                        </v-flex>
                        <v-flex xs2>
                            <div>{{ store.url}}</div>
                        </v-flex>
                        <v-flex xs1>
                            <div>{{ store.user_id}}</div>
                        </v-flex>
                        <v-flex xs1>
                            <div>{{ store.images_id}}</div>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>
        </v-hover>
    </v-container>
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
        methods: {},
        created() {
            this.$store.dispatch('getStores');
        }

    };
</script>

<style scoped>
    div {
        font-size: 18px;
    }
</style>