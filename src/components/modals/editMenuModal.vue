<template>
    <v-layout class="pa-0 ma-0" max-width="25%">

        <v-dialog
                    v-model="openModal"
                    max-width="25%"
                    full-height
                    transition="scale-transition"
            >
                <v-card >
                    <v-card-title class="ma-0 pa-0">
                        <v-spacer></v-spacer>
                        <v-btn flat fab small @click="openModal = false">
                            <v-icon size="25px">close</v-icon>
                        </v-btn>
                        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                            <div class="title">
                                <v-icon>fastfood</v-icon>
                                Modifică meniu
                            </div>
                        </v-flex>
                    </v-card-title>
                    <v-form ref="form">
                        <v-card-text class="pt-0 pb-0">
                            <v-container class="pl-3 pr-3 pb-1">
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
                                                rows="1"
                                                auto-grow
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
                                            class="text-xs-center text-sm-center text-md-center text-lg-center mt-0">
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
                                            class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                                        <v-tooltip top  max-width="60%" color="white">
                                            <template v-slot:activator="{ on }">
                                                <img :src="imageUrl" v-on="on" width="50%"  v-if="imageUrl"/>
                                                <img :src="path+items.image"  v-on="on" width="50%" v-else-if="items.image"/>
                                            </template>
                                            <img :src="imageUrl" width="100%"  v-if="imageUrl"/>
                                            <img :src="path+items.image"  width="100%" v-else-if="items.image"/>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                        <div v-if="imageName" class="subheading font-weight-light">{{imageName}}</div>
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
    export default {
        props: {
            value: Boolean,
            id: Number
        },
        data() {
            return {
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
            if (this.id !== undefined) {
                this.menu = this.$store.getters.getMenuById(this.id);
                this.items.id = this.menu.id;
                this.items.name = this.menu.name;
                this.items.description = this.menu.description;
                this.items.price = this.menu.price;
                this.items.type = this.menu.type;
                this.items.image = this.menu.image;
                this.items.store_id = this.menu.store_id;
            }
        },
        watch: {
            openModal() {
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
            openModal: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
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
                formData.append('id', data.id);
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('image', data.image);
                formData.append('type', data.type);
                formData.append('_method', 'patch');
                this.$store.dispatch('editMenu', {data: formData, id: data.id}).then((res) => {
                    if (res.responseType === 'success') {
                        this.$parent.addUpdateNotification();
                        this.openModal = false;
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>