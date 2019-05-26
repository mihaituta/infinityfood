<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs10 sm6 md6 lg4>
                <v-card class="elevation-4">
                    <v-toolbar dark color="info">
                        <v-toolbar-title>Autentificare</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    prepend-icon="person"
                                    name="email"
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="Email"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    :type="show ? 'text' : 'password'"
                                    v-model="password"
                                    :error-messages="passwordErrors"
                                    label="Parolă"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                    @click:append="show = !show"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center pb-3">
                        <v-btn color="info" @click.prevent="submit">Autentificare</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators';
    import email from 'vuelidate/src/validators/email';

    export default {
        data() {
            return {
                show: false,
                email: '',
                password: ''
            };
        },
        validations: {
            email: {required, email},
            password: {required, minLength: minLength(6)}

        },
        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.email && errors.push('Email-ul trebuie să fie valid');
                !this.$v.email.required && errors.push('Email-ul este obligatoriu');
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Parola este obligatorie');
                !this.$v.password.minLength && errors.push('Parola trebuie să aibă cel puțin 6 caractere');
                return errors;
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.$v.$pending || this.$v.$error) return;

                const formData = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('login', formData);
            }
        }
    };
</script>

<style scoped>

</style>