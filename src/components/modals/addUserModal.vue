<template>
    <v-layout class="pt-4">
        <notification text="Utilizatorul a fost adăugat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="addNotification" :top=true :right=true></notification>
        <notification :text="'Există deja un utilizator cu acest '+errorText" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="errorNotification" :top=true></notification>
        <v-btn
                color="primary"
                dark
                @click.stop="openModal = true"
        >
            <v-icon class="pr-2">person_add</v-icon>
            Adaugă utilizator
        </v-btn>

        <v-dialog
                v-model="openModal"
                max-width="25%"
                transition="slide-y-transition"
        >
            <v-card>
                <v-card-title class="pa-0">
                    <v-spacer></v-spacer>
                    <v-btn flat fab small @click="openModal = false">
                        <v-icon size="25px">close</v-icon>
                    </v-btn>
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <div class="title">
                            <v-icon>person_add</v-icon>
                            Adaugă utilizator
                        </div>
                    </v-flex>
                </v-card-title>
                <v-form ref="form">
                    <v-card-text class="pt-0 pb-0">
                        <v-container class="pl-3 pr-3 pb-2">
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="person"
                                            v-model="user.name"
                                            label="Nume"
                                            :error-messages="nameErrors"
                                            required
                                            @input="$v.user.name.$touch()"
                                            @blur="$v.user.name.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="email"
                                            name="email"
                                            v-model="user.email"
                                            :error-messages="emailErrors"
                                            label="Email"
                                            required
                                            @input="$v.user.email.$touch()"
                                            @blur="$v.user.email.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-text-field
                                        prepend-icon="lock"
                                        name="password"
                                        :append-icon="show ? 'visibility' : 'visibility_off'"
                                        :type="show ? 'text' : 'password'"
                                        v-model="user.password"
                                        :error-messages="passwordErrors"
                                        label="Parolă"
                                        required
                                        @input="$v.user.password.$touch()"
                                        @blur="$v.user.password.$touch()"
                                        @click:append="show = !show"
                                ></v-text-field>
                                <v-flex xs12>
                                    <v-select
                                            prepend-icon="security"
                                            :items=roles
                                            label="Rol"
                                            v-model="user.role_id"
                                            :error-messages="role_idErrors"
                                            required
                                            @change="$v.user.role_id.$touch()"
                                            @blur="$v.user.role_id.$touch()"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions class="pb-3">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="openModal = false">Închide</v-btn>
                            <v-btn color="primary" @click.prevent="onSubmit">Adaugă</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators';
    import email from 'vuelidate/src/validators/email';

    export default {
        data() {
            return {
                openModal: false,
                show: false,
                roles: [
                    {text: 'Admin'},
                    {text: 'Staff'},
                    {text: 'User'}
                ],
                user: {
                    name: '',
                    email: '',
                    password: '',
                    role_id: ''
                },
                addNotification: false,
                errorNotification: false,
                errorText: ''

            };
        },
        validations: {
            user: {
                name: {required},
                email: {required, email},
                password: {required, minLength: minLength(6)},
                role_id: {required}
            }
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
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.user.name.$dirty) return errors;
                !this.$v.user.name.required && errors.push('Numele este obligatoriu');
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.user.email.$dirty) return errors;
                !this.$v.user.email.email && errors.push('Email-ul trebuie să fie valid');
                !this.$v.user.email.required && errors.push('Email-ul este obligatoriu');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.user.password.$dirty) return errors;
                !this.$v.user.password.required && errors.push('Parola este obligatorie');
                !this.$v.user.password.minLength && errors.push('Parola trebuie să aibă cel puțin 6 caractere');
                return errors;
            },
            role_idErrors() {
                const errors = [];
                if (!this.$v.user.role_id.$dirty) return errors;
                !this.$v.user.role_id.required && errors.push('Rolul este obligatoriu');
                return errors;
            }
        },
        methods: {
            userAddedNotification() {
                this.addNotification = false;
                setTimeout(() => {
                    this.addNotification = true;
                }, 100);
            },
            userExistsNotification() {
                this.errorNotification = false;
                setTimeout(() => {
                    this.errorNotification = true;
                }, 100);
            },
            onSubmit() {
                this.$v.$touch();
                if (this.$v.$pending || this.$v.$error) return;

                let userData = this.user;
                this.$store.dispatch('addUser', userData).then((res) => {
                    if (res.responseType === 'success') {
                        this.openModal = false;
                        this.userAddedNotification();
                    } else if (res.responseType === 'error' && res.errorMessage === 'uniqueName') {
                        this.errorText = 'nume';
                        this.userExistsNotification();
                    } else if (res.responseType === 'error' && res.errorMessage === 'uniqueEmail') {
                        this.errorText = 'email';
                        this.userExistsNotification();
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>