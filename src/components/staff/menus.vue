<template>
    <v-container fluid style="width:80%">
        <notification text="Meniul a fost șters cu succes!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="bool"></notification>
        <add-modal/>
        <v-tabs fixed-tabs color="transparent" centered>
            <v-tab v-for="type in types" :key="type.id">
                {{type}}
            </v-tab>
            <v-tab-item v-for="type in types" :key="type.id">
                <v-container fluid grid-list-sm class="pa-2 mt-2">
                    <v-layout class="text-xs-center">
                        <v-flex xs1>
                            <div>Imagine</div>
                        </v-flex>
                        <v-flex xs2>
                            <div>Nume</div>
                        </v-flex>
                        <v-flex xs4>
                            <div>Descriere</div>
                        </v-flex>
                        <v-flex xs1>
                            <div>Preț</div>
                        </v-flex>
                        <v-flex xs1>
                            <div>Tip</div>
                        </v-flex>
                        <v-flex xs3>
                            <div>Acțiuni</div>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-hover v-for="menu in menus" :key="menu.id" v-if="menu.type === type">
                    <v-card slot-scope="{ hover }"
                            :class="`elevation-${hover ? 8 : 2}`">
                        <v-container fluid grid-list-sm class="mb-2 mt-2 pa-1">
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
                                    <div>{{ menu.price}} ron</div>
                                </v-flex>
                                <v-flex xs1>
                                    <div>{{ menu.type}}</div>
                                </v-flex>

                                <v-flex xs3>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn dark color="success">
                                            <v-icon class="pr-2" size="20">edit</v-icon>
                                            Modifică
                                        </v-btn>
                                        <v-btn @click="deleteMenu(menu.id)" dark color="error">
                                            <v-icon class="pr-1" size="22">delete</v-icon>
                                            Șterge
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
    import addModal from '../modals/addMenuModal';

    export default {
        data: function () {
            return {
                bool: false,
                path: 'http://food/storage/menu-images/'
            };
        },
        computed: {
            menus() {
                return this.$store.getters.menus;
            },
            types() {
                return this.$store.getters.menuTypes;
            }
        },
        methods: {
            deleteMenu(id) {
                this.$store.dispatch('deleteMenu', id).then((res) => {
                    if (res.responseType === 'success') {
                        this.addNotification();
                    }
                });
            },
            addNotification() {
                this.bool = false;
                setTimeout(() => {
                    this.bool = true;
                }, 200);
            }
        },
        created: function () {
            this.$store.dispatch('getMenus');
        },
        components: {
            'add-modal': addModal
        }
    };
</script>

<style scoped>
    div {
        font-size: 18px;
    }

</style>