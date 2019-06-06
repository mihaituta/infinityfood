<template>
    <v-layout>
        <notification text="Meniul a fost adăugat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="addNotification" :top=true :right=true></notification>
        <notification text="Există deja un meniu cu acest nume!" color="rgb(255, 82, 82, 0.9)"
                      :showNotification="nameNotification" :top=true></notification>
        <v-btn
                color="primary"
                dark
                @click.stop="openModal = true"
        >
            <v-icon class="pr-2">library_add</v-icon>
            Adaugă meniu

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
                            <v-icon>fastfood</v-icon>
                            Adaugă meniu
                        </div>
                    </v-flex>
                </v-card-title>
                <v-form ref="form">
                    <v-card-text class="pt-0 pb-0">
                        <v-container class="pl-3 pr-3 pb-2">
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field
                                            prepend-icon="create"
                                            v-model="menu.name"
                                            label="Nume"
                                            :error-messages="nameErrors"
                                            required
                                            @input="$v.menu.name.$touch()"
                                            @blur="$v.menu.name.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            prepend-icon="description"
                                            v-model="menu.description"
                                            label="Descriere"
                                            :error-messages="descriptionErrors"
                                            required
                                            @input="$v.menu.description.$touch()"
                                            @blur="$v.menu.description.$touch()"
                                            rows="1"
                                            auto-grow
                                    ></v-textarea>
                                </v-flex>
                                <v-flex>
                                    <v-text-field
                                            prepend-icon="attach_money"
                                            v-model="menu.price"
                                            type="number"
                                            label="Preț"
                                            min="0"
                                            oninput="this.value = Math.abs(this.value)"
                                            :error-messages="priceErrors"
                                            required
                                            @input="$v.menu.price.$touch()"
                                            @blur="$v.menu.price.$touch()"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            prepend-icon="restaurant_menu"
                                            :items=types
                                            label="Tip mâncare"
                                            v-model="menu.type"
                                            :error-messages="typeErrors"
                                            required
                                            @change="$v.menu.type.$touch()"
                                            @blur="$v.menu.type.$touch()"
                                    ></v-select>
                                </v-flex>
                                <input
                                        type="file"
                                        style="display:none"
                                        ref="image"
                                        accept="image/*"
                                        @change="onFileChanged"
                                >
                                <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                                    <v-btn @click="pickFile" color="primary" class="ma-0">
                                        Încarcă imagine
                                        <v-icon right dark>cloud_upload</v-icon>
                                    </v-btn>
                                    <div v-if="imageTooBig" style="color:red;"
                                         class="subheading font-weight-light mt-3">
                                        <!--                                        Image is too big, resolution must be 1920x1080 or lower.-->
                                        Imaginea este prea mare, rezoluția trebuie să fie 1920x1080 sau mai mică.
                                    </div>
                                    <div v-else-if="imageError" style="color:red;"
                                         class="subheading font-weight-light mt-3">
                                        Imaginea este obligatorie
                                    </div>
                                </v-flex>

                                <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                                    <v-tooltip v-if="imageUrl" top max-width="500px" color="white">
                                        <template v-slot:activator="{ on }">
                                            <img :src="imageUrl" v-on="on" width="35%" v-if="imageUrl"/>
                                        </template>
                                        <img :src="imageUrl" width="100%" v-if="imageUrl"/>

                                    </v-tooltip>
                                </v-flex>
                                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                    <div v-if="imageName" class="subheading font-weight-light">{{imageName}}</div>
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
    import {required, minValue, maxValue} from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                openModal: false,
                imageUrl: '',
                imageName: '',
                imageTooBig: false,
                types: ['Starter', 'Main', 'Dessert', 'Drink', 'Pizza', 'Fastfood'],
                menu: {
                    name: '',
                    description: '',
                    price: '',
                    type: '',
                    image: ''
                },
                addNotification: false,
                nameNotification: false,
                imageError: false
            };
        },
        validations: {
            menu: {
                name: {required},
                description: {required},
                price: {required, minValue: minValue(0), maxValue: maxValue(999999.99)},
                type: {required}
            }
        },
        watch: {
            openModal() {
                this.$v.$reset();
                this.$refs.image.value = '';
                this.menu.name = '';
                this.menu.description = '';
                this.menu.price = '';
                this.menu.type = null;
                this.menu.image = null;
                this.imageUrl = '';
                this.imageName = '';
                this.imageTooBig = false;
                this.imageError = false;

            }
        },
        computed: {
            nameErrors() {
                const errors = [];
                if (!this.$v.menu.name.$dirty) return errors;
                !this.$v.menu.name.required && errors.push('Numele este obligatoriu');
                return errors;
            },
            descriptionErrors() {
                const errors = [];
                if (!this.$v.menu.description.$dirty) return errors;
                !this.$v.menu.description.required && errors.push('Descrierea este obligatorie');
                return errors;
            },
            priceErrors() {
                const errors = [];
                if (!this.$v.menu.price.$dirty) return errors;
                !this.$v.menu.price.required && errors.push('Prețul este obligatoriu');
                !this.$v.menu.price.minValue && errors.push('Prețul nu poate fi negativ');
                !this.$v.menu.price.maxValue && errors.push('Prețul este prea mare');
                return errors;
            },
            typeErrors() {
                const errors = [];
                if (!this.$v.menu.type.$dirty) return errors;
                !this.$v.menu.type.required && errors.push('Tipul mâncării este obligatoriu');
                return errors;
            }
        },
        methods: {
            addedNotification() {
                this.addNotification = false;
                setTimeout(() => {
                    this.addNotification = true;
                }, 100);
            },
            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 100);
            },
            pickFile() {
                this.$refs.image.click();
            },
            onFileChanged(e) {
                const file = e.target.files[0];
                if (file && file.size > 1920 * 1080) {
                    this.imageTooBig = true;
                    this.menu.image = null;
                    this.imageName = '';
                    this.imageUrl = '';
                    return;
                }
                if (file !== undefined) {
                    this.imageName = file.name;
                } else {
                    return;
                }
                this.imageError = false;
                this.imageTooBig = false;
                this.menu.image = file;
                this.imageUrl = URL.createObjectURL(file);
            },
            onSubmit() {
                this.$v.$touch();
                if (this.$v.$pending || this.$v.$error) return;

                const formData = new FormData();
                const menuData = this.menu;
                if (!menuData.image) {
                    this.imageError = true;
                    return;
                }
                formData.append('name', menuData.name);
                formData.append('description', menuData.description);
                formData.append('price', menuData.price);
                formData.append('image', menuData.image);
                formData.append('type', menuData.type);

                this.$store.dispatch('addMenu', formData).then((res) => {
                    if (res.responseType === 'success') {
                        this.openModal = false;
                        this.addedNotification();
                    } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
                        this.nameErrorNotification();
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>