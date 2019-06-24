<template>
    <v-footer
            dark
            height="auto"

    >
        <v-card
                flat
                tile
                class="text-xs-center"
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
                    <!--                    <v-flex-->
                    <!--                            dark-->
                    <!--                            py-3-->
                    <!--                            text-xs-center-->
                    <!--                            white&#45;&#45;text-->
                    <!--                            xs12-->
                    <!--                    >-->
                    <!--                    </v-flex>-->
                </v-layout>
            </v-card-text>
            <v-card-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
                Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur
                dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla
                placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam
                elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus.
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

</style>