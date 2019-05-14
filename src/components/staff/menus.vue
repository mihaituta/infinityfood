<template>
    <v-container fluid style="width:90%">
        <v-btn color="blue" dark>
            ADD MENU
            <v-icon right>add</v-icon>
        </v-btn>
        <v-tabs fixed-tabs color="transparent" centered>
            <v-tab v-for="type in types">
                {{type}}
            </v-tab>
            <v-tab-item v-for="type in types">
                <v-hover v-for="menu in menus" v-if="menu.type === type">
                    <v-card slot-scope="{ hover }"
                            :class="`elevation-${hover ? 8 : 2}`">
                        <v-container fluid grid-list-sm class="menusContainer">
                            <v-layout align-center justify-center row wrap fill-height class="text-xs-center">

                                <v-flex xs1>
                                    <v-img :src="path+menu.image"
                                           aspect-ratio="1"
                                           height="90"
                                           width="90"
                                           contain
                                    ></v-img>
                                </v-flex>
                                <v-flex xs2>
                                    <div>{{ menu.name}}</div>
                                </v-flex>
                                <v-flex xs4>
                                    <div>{{ menu.description}}</div>
                                </v-flex>
                                <v-flex xs1>
                                    <div>{{ menu.price}}</div>
                                </v-flex>
                                <v-flex xs1>
                                    <div>{{ menu.type}}</div>
                                </v-flex>

                                <v-flex xs3>
                                    <v-layout align-center justify-center row fill-height>

                                        <v-btn dark color="success">
                                            <v-icon left>edit</v-icon>
                                            EDIT
                                        </v-btn>
                                        <v-btn dark color="error">
                                            <v-icon left>delete</v-icon>
                                            DELETE
                                        </v-btn>
                                    </v-layout>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card>
                </v-hover>
            </v-tab-item>


        </v-tabs>

    </v-container>
</template>

<script>
    export default {
        data: function () {
            return {
                path: 'http://food/storage/menu-images/'
            }
        },
        computed: {
            menus() {
                return this.$store.getters.menus
            },
            types() {
                return this.$store.getters.menuTypes
            }
        },

        created: function () {
            this.$store.dispatch('getMenus')
        }
    }
</script>

<style scoped>
    div {
        font-size: 18px;
    }

    .menusContainer {
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 8px;
    }
</style>