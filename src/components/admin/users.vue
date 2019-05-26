<template>
    <v-container fluid style="width:80%">
        <notification text="Utilizatorul a fost șters cu succes!" color="rgb(255, 82, 82, 0.9)" :top=true :right=true
                      :showNotification="userDeletedNotif"></notification>
        <notification text="Utilizatorul a fost modificat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="userUpdatedNotif" :top=true :right=true></notification>
        <notification text="Există deja un utilizatorul cu acest nume!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="nameNotification" :top=true></notification>
        <notification text="Există deja un utilizatorul cu acest email!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="emailNotification" :top=true></notification>
        <add-modal/>
        <edit-modal v-if="openEditModal" v-model="openEditModal" :id='userId'/>
        <v-card class="mt-3">
            <v-card-title class="headline">
                Utilizatori
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Caută"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    v-if="users"
                    :headers="headers"
                    :items="users"
                    :search="search"
                    class="elevation-1"
            >
                <template slot="items" slot-scope="user">
                    <td>{{ user.item.id }}</td>
                    <td>{{ user.item.name }}</td>
                    <td>{{ user.item.email }}</td>
                    <td>{{user.item.role_id}}</td>
                    <td class="pa-0" width="20%">

                        <v-btn small dark color="success" @click.stop="userById(user.item.id)">
                            <v-icon class="pr-2" size="18">edit</v-icon>
                            Modifică
                        </v-btn>

                        <v-btn small @click.stop="deleteUser(user.item.id)" dark color="error">
                            <v-icon class="pr-1" size="20">delete</v-icon>
                            Șterge
                        </v-btn>

                    </td>
                </template>
                <template v-slot:no-data>
                    <v-alert :value="true" color="error" icon="warning">
                        Nu există utilizatori.
                    </v-alert>
                </template>
                <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning">
                        Nu s-a găsit nimic pentru "{{ search }}" .
                    </v-alert>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    import addModal from '../modals/addUserModal';
    import editModal from '../modals/editUserModal';

    export default {
        data: function () {
            return {
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Nume', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Rol', value: 'role_id'},
                    {text: 'Acțiuni', align: 'center', sortable: false}
                ],
                search: '',
                openEditModal: false,
                userId: null,
                userDeletedNotif: false,
                userUpdatedNotif: false,
                nameNotification: false,
                emailNotification: false,
            };
        },
        computed: {
            users() {
                return this.$store.getters.users;
            }
        },
        methods: {
            userById(id) {
                this.userId = id;
                this.openEditModal = true;
            },
            deleteUser(id) {
                this.$store.dispatch('deleteUser', id).then((res) => {
                    if (res.responseType === 'success') {
                        this.addDeleteNotification();
                    }
                });
            },
            addDeleteNotification() {
                this.userDeletedNotif = false;
                setTimeout(() => {
                    this.userDeletedNotif = true;
                }, 200);
            },
            addUpdateNotification() {
                this.userUpdatedNotif = false;
                setTimeout(() => {
                    this.userUpdatedNotif = true;
                }, 200);
            },
            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 200);
            },
            emailErrorNotification() {
                this.emailNotification = false;
                setTimeout(() => {
                    this.emailNotification = true;
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