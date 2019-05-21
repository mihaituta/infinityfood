<template>
    <v-container fluid style="width:80%">
        <notification text="Meniul a fost șters cu succes!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="bool"></notification>

        <edit-modal v-if="openEditModal" v-model="openEditModal" :id='menuId'/>
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
        <!--                                    <v-img :src="path+menu.image"-->
        <!--                                           aspect-ratio="1"-->
        <!--                                           height="90"-->
        <!--                                           width="90"-->
        <!--                                           contain-->
        <!--                                    ></v-img>-->
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

        <!--                                        <v-btn @click="deleteMenu(menu.id)" dark color="error">-->
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

        <v-toolbar flat color="white">
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider
                    class="mx-2"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <add-modal/>
        </v-toolbar>
        <v-data-table
                v-if="users"
                :headers="headers"
                :items="users"
                class="elevation-1"
        >
            <template slot="items" slot-scope="user">
                <td>{{ user.item.id }}</td>
                <td>{{ user.item.name }}</td>
                <td>{{ user.item.email }}</td>
                <td>{{ user.item.role_id }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(user.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(user.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">
                    Sorry, no users to display here
                </v-alert>
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import addModal from '../modals/addMenuModal';
    import editModal from '../modals/editMenuModal';

    export default {
        data: function () {
            return {
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Nume', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Rol', value: 'role_id'},
                    {text: 'Acțiuni', value: 'name', sortable: false}
                ],
                bool: false,
                openEditModal: false,
                menuId: null,
            };
        },
        computed: {
            users() {
                return this.$store.getters.users;
            }
        },
        methods: {
            menuById(id) {
                this.openEditModal = true;
                this.menuId = id;
            },
            deleteMenu(id) {
                this.$store.dispatch('deleteMenu', id).then((res) => {
                    if (res.responseType === 'success') {
                        this.addDeleteNotification();
                    }
                });
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
            }
        },
        created() {
            this.$store.dispatch('getUsers');
        },
        components: {
            'add-modal': addModal,
            'edit-modal': editModal
        }
    };
</script>

<style scoped>

</style>