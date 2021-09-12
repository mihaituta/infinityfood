<template>
    <v-footer
            dark
            height="auto"
            class="footer"
            width="100%"
    >
        <v-card
                flat
                tile
                class="text-xs-center flex"
        >
            <v-card-text>
                <v-layout
                        justify-center
                        row
                        wrap
                >
                    <v-btn
                            color="white"
                            flat
                            round
                            @click.native="scrollToTop"
                            to="/">
                        <v-icon class="pr-2">restaurant</v-icon>
                        Restaurante
                    </v-btn>
                    <v-btn
                            color="white"
                            flat
                            round
                            @click.native="scrollToTop"
                            to="/despre-noi">
                        <v-icon class="pr-2">people</v-icon>
                        Despre noi
                    </v-btn>
                    <v-btn
                            color="white"
                            flat
                            round
                            @click.native="scrollToTop"
                            to="/contact">
                        <v-icon class="pr-2">mail</v-icon>
                        Contact
                    </v-btn>

                </v-layout>
            </v-card-text>
            <v-card-text class="text pt-0">
                Ce oferă InfinityFood? Posibilitatea de a savura preparate delicioase de la restaurantele din zona în care vă aflati. O gamă variata de bucătării văstau la dispoziție cu doar câteva click-uri.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                &copy;2019 - <strong>InfinityFood.</strong> Toate drepturile rezervate.
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            links: [
                'Acasă',
                'Despre noi',
                'Contact',
            ]
        }),
        methods: {
            scrollToTop() {
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style scoped>
.text{
    font-size: 17px;
}
</style>