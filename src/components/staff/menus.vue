<template>
    <v-container fluid style="width:80%">
        <notification text="Meniul a fost șters cu succes!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="menuDeletedNotif" :top=true :right=true></notification>
        <notification text="Meniul a fost modificat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="menuUpdatedNotif" :top=true :right=true></notification>
        <notification text="Există deja un meniu cu acest nume!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="nameNotification" :top=true></notification>
        <add-modal/>
        <edit-modal v-if="openEditModal" v-model="openEditModal" :id='menuId'/>
        <delete-modal v-if="openDeleteModal" v-model="openDeleteModal" text="Doriți să ștergeți acest meniu?"
                      :id='menuId'/>
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
                                    <v-tooltip fixed right max-width="35%" color="white">
                                        <template v-slot:activator="{ on }">
                                            <v-img :src="path+menu.image"
                                                   aspect-ratio="1"
                                                   height="100"
                                                   width="100"
                                                   contain
                                                   v-on="on"
                                            ></v-img>
                                        </template>
                                        <img :src="path+menu.image" width="100%"/>
                                    </v-tooltip>
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

                                        <v-btn dark color="success" @click.stop="menuById(menu.id)">
                                            <v-icon class="pr-2" size="20">edit</v-icon>
                                            Modifică
                                        </v-btn>

                                        <v-btn @click.stop="menuById2(menu.id)" dark color="error">
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
    import editModal from '../modals/editMenuModal';
    import deleteModal from '../modals/menuDeleteModal';

    export default {
        data: function () {
            return {
                menuDeletedNotif: false,
                menuUpdatedNotif: false,
                openEditModal: false,
                openDeleteModal: false,
                confirmDeletion: false,
                nameNotification: false,
                menuId: null,
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
            menuById(id) {
                this.openEditModal = true;
                this.menuId = id;
            },
            menuById2(id) {
                this.openDeleteModal = true;
                this.menuId = id;
            },
            addDeleteNotification() {
                this.menuDeletedNotif = false;
                setTimeout(() => {
                    this.menuDeletedNotif = true;
                }, 200);
            },
            addUpdateNotification() {
                this.menuUpdatedNotif = false;
                setTimeout(() => {
                    this.menuUpdatedNotif = true;
                }, 200);
            },
            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 200);
            }
        },
        created() {
            this.$store.dispatch('getMenus');
        },
        components: {
            'add-modal': addModal,
            'edit-modal': editModal,
            'delete-modal': deleteModal
        }
    };
</script>

<style scoped>
    div {
        font-size: 18px;
    }
</style>