<template>
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex xs10 sm6 md6 lg4>
                    <v-card class="elevation-4">
                        <v-toolbar dark color="info">
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        prepend-icon="person"
                                        name="email"
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        label="E-mail"
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
                                        label="Password"
                                        required
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                        @click:append="show = !show"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn color="info" @click.prevent="submit">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators'
    import email from "vuelidate/src/validators/email";
    import authHeader from './authHeader'
    export default {
        data() {
            return {
                show: false,
                email: '',
                password: ''
            }
        },
        validations: {
            email: {required, email},
            password: {required, minLength: minLength(6)},

        },
        computed: {
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required.')
                !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
                return errors
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if (this.$v.$pending || this.$v.$error) return;

                const formData = {
                    email: this.email,
                    password: this.password,
                }
                this.$store.dispatch('login',formData)
            }
        },
    }
</script>

<style scoped>

</style>