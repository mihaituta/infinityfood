<template>
    <v-layout class="pa-0 ma-0" max-width="25%">
        <notification text="Meniul a fost modificat cu succes!" color="rgb(76, 175, 80, 0.9)"
                      :showNotification="showNotification"></notification>
        <v-dialog
                v-model="show"
                max-width="25%"
                transition="scale-transition"
        >
            <v-card>
                <v-card-title class="pb-2 pt-4">
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <div class="title">
                            <v-icon>fastfood</v-icon>
                            Modifică meniu
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
                                            v-model="items.name"
                                            label="Nume"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea
                                            prepend-icon="description"
                                            v-model="items.description"
                                            label="Descriere"
                                    ></v-textarea>
                                </v-flex>
                                <v-flex>
                                    <v-text-field
                                            prepend-icon="attach_money"
                                            v-model="items.price"
                                            type="number"
                                            label="Preț"
                                            min="0"
                                            oninput="this.value = Math.abs(this.value)"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            prepend-icon="restaurant_menu"
                                            :items=types
                                            label="Tip mâncare"
                                            v-model="items.type"
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
                                </v-flex>

                                <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-3">
                                    <img :src="imageUrl" height="120" v-if="imageUrl"/>
                                    <img :src="path+items.image" height="120" v-else-if="items.image"/>
                                </v-flex>
                                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                    <div v-if="imageName" class="subheading font-weight-light">{{imageName}}</div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions class="pb-3">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click.stop="show=false">Închide</v-btn>
                            <v-btn color="primary" @click.prevent="onSubmit">Modifică</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            id: Number
        },
        data() {
            return {
                dialog: false,
                imageUrl: '',
                path: 'http://food/storage/menu-images/',
                imageName: '',
                imageTooBig: false,
                types: ['starter', 'main', 'dessert', 'drink', 'pizza', 'fastfood'],
                menu: {},
                items: [
                    {id: ''},
                    {menu: ''},
                    {description: ''},
                    {price: ''},
                    {type: ''},
                    {image: ''},
                    {store_id: ''}
                ],
                showNotification: false
            };
        },
       beforeMount() {
            this.menu = this.$store.getters.getMenuById(this.id);
            this.items.id = this.menu.id;
            this.items.name = this.menu.name;
            this.items.description = this.menu.description;
            this.items.price = this.menu.price;
            this.items.type = this.menu.type;
            this.items.image = this.menu.image;
            this.items.store_id = this.menu.store_id;
        },
        watch: {
            show() {
                this.$refs.image.value = '';
                this.menu.name = '';
                this.menu.description = '';
                this.menu.price = '';
                this.menu.type = null;
                this.menu.image = null;
                this.imageUrl = '';
                this.imageName = '';
                this.imageTooBig = false;
            }
        },
        computed: {
            // menu() {
            //     return this.$store.getters.getMenuById(121);
            // },
            show: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            addNotification() {
                this.showNotification = false;
                setTimeout(() => {
                    this.showNotification = true;
                }, 100);
            },
            pickFile() {
                this.$refs.image.click();
            },
            onFileChanged(e) {
                const file = e.target.files[0];
                if (file && file.size > 1920 * 1080) {
                    this.imageTooBig = true;
                    this.items.image = null;
                    this.imageName = '';
                    this.imageUrl = '';
                    return;
                }
                if (file !== undefined) {
                    this.imageName = file.name;
                } else {
                    return;
                }
                this.imageTooBig = false;
                this.items.image = file;
                this.imageUrl = URL.createObjectURL(file);
            },
            onSubmit() {
                const formData = new FormData();
                let data = this.items;
                if (data.type !== null)
                    data.type = data.type.toLowerCase();

                formData.append('id', data.id);
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('image', data.image);
                formData.append('type', data.type);
                formData.append('_method', 'patch');

                this.$store.dispatch('editMenu', {data: formData, id: data.id}).then((res) => {
                    if (res.responseType === 'success') {
                        this.show = false;
                        this.addNotification();
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>