<template>
    <v-layout class="pa-0 ma-0" max-width="25%">
        <notification text="Utilizatorul a fost modificat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="addNotification" :top=true :right=true></notification>
        <notification :text="'Există deja un utilizator cu acest '+errorText" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="errorNotification" :top=true></notification>
        <v-dialog
                v-model="openModal"
                max-width="25%"
                full-height
                transition="scale-transition"
        >
            <v-card>
                <v-card-title class="ma-0 pa-0">
                    <v-spacer></v-spacer>
                    <v-btn flat fab small @click="openModal = false">
                        <v-icon size="25px">close</v-icon>
                    </v-btn>
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <div class="title">
                            <v-icon>person_add</v-icon>
                            Modifică utilizator
                        </div>
                    </v-flex>
                </v-card-title>
                <v-form ref="form">
                    <v-card-text class="pt-0 pb-0">
                        <v-container class="pl-3 pr-3 pb-1">
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="person"
                                            v-model="userList.name"
                                            label="Nume"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="email"
                                            v-model="userList.email"
                                            label="Email"
                                            :error-messages="emailErrors"
                                            @input="$v.userList.email.$touch()"
                                            @blur="$v.userList.email.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-text-field
                                        prepend-icon="lock"
                                        name="password"
                                        :append-icon="show ? 'visibility' : 'visibility_off'"
                                        :type="show ? 'text' : 'password'"
                                        v-model="userList.password"
                                        :error-messages="passwordErrors"
                                        label="Parolă"
                                        @input="$v.userList.password.$touch()"
                                        @blur="$v.userList.password.$touch()"
                                        @click:append="show = !show"
                                ></v-text-field>
                                <v-flex xs12>
                                    <v-select
                                            prepend-icon="security"
                                            :items=roles
                                            label="Rol"
                                            v-model="userList.role_id"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions class="pb-3">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click.stop="openModal=false">Închide</v-btn>
                            <v-btn color="primary" @click.prevent="onSubmit">Modifică</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {minLength} from 'vuelidate/lib/validators';
    import email from 'vuelidate/src/validators/email';

    export default {
        props: {
            value: Boolean,
            id: Number
        },
        data() {
            return {
                show: false,
                roles: [
                    {text: 'Admin'},
                    {text: 'Staff'},
                    {text: 'User'}
                ],
                user: {},
                userList: [
                    {id: ''},
                    {name: ''},
                    {email: ''},
                    {password: ''},
                    {role_id: ''}
                ],
                addNotification: false,
                errorNotification: false,
                errorText: ''
            };
        },
        beforeMount() {
            this.user = this.$store.getters.getUserById(this.id);
            this.userList.id = this.user.id;
            this.userList.name = this.user.name;
            this.userList.email = this.user.email;
            this.userList.role_id = this.user.role_id;
        },
        watch: {
            openModal() {
                this.$v.$reset();
                this.user.name = '';
                this.user.email = '';
                this.user.password = '';
                this.user.role_id = null;
            }
        },
        validations: {
            userList: {
                email: {email},
                password: {minLength: minLength(6)}
            }
        },
        computed: {
            openModal: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.userList.email.$dirty) return errors;
                !this.$v.userList.email.email && errors.push('Email-ul trebuie să fie valid');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.userList.password.$dirty) return errors;
                !this.$v.userList.password.minLength && errors.push('Parola trebuie să aibă cel puțin 6 caractere');
                return errors;
            }
        },
        methods: {
            onSubmit() {
                this.$v.$touch();
                if (this.$v.$pending || this.$v.$error) return;

                if ((this.userList.name === this.user.name &&
                    this.userList.email === this.user.email &&
                    this.userList.password === this.user.password &&
                    this.userList.role_id === this.user.role_id) ||
                    (this.userList.name === '' &&
                        this.userList.email === this.user.email &&
                        this.userList.password === this.user.password &&
                        this.userList.role_id === this.user.role_id) ||
                    (this.userList.name === this.user.name &&
                        this.userList.email === '' &&
                        this.userList.password === this.user.password &&
                        this.userList.role_id === this.user.role_id) ||
                    (this.userList.name === '' &&
                        this.userList.email === '' &&
                        this.userList.password === this.user.password &&
                        this.userList.role_id === this.user.role_id)) {
                    this.openModal = false;
                    return;
                }

                const formData = new FormData();
                let data = {
                    id: this.userList.id,
                    name: this.userList.name,
                    email: this.userList.email,
                    password: this.userList.password,
                    role_id: this.userList.role_id
                };
                formData.append('id', data.id);
                if (this.user.name !== this.userList.name)
                    formData.append('name', data.name);
                if (this.user.email !== this.userList.email)
                    formData.append('email', data.email);
                if (this.user.password !== this.userList.password)
                    formData.append('password', data.password);
                if (this.user.role_id !== this.userList.role_id)
                    formData.append('role_id', data.role_id);
                formData.append('_method', 'patch');

                this.$store.dispatch('editUser', {data: formData, id: data.id}).then((res) => {
                    if (res.responseType === 'success') {
                        this.$parent.addUpdateNotification();
                        this.openModal = false;
                    } else if (res.responseType === 'error' && res.errorMessage === 'uniqueName') {
                        this.$parent.nameErrorNotification();
                    } else if (res.responseType === 'error' && res.errorMessage === 'uniqueEmail') {
                        this.$parent.emailErrorNotification();
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>