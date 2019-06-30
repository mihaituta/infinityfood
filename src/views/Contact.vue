<template>
    <div>
        <v-layout class="wrap">
            <v-container fill-height>
                <v-layout align-center justify-center>
                    <v-img class="mt-3 mr-2" max-width="215px"
                           :src="require('../assets/bluewhitelogo3.png')"></v-img>
                    <div class="logo" style="color: #1b6cc4;">Cont</div>
                    <div class="logo">act</div>
                </v-layout>
            </v-container>
        </v-layout>
        <v-container style="width:70%">
            <v-layout>
                <v-flex>
                    <div class="titleText mb-3 mt-3">Contact</div>
                    <div class="contentText mb-4">Ne face plăcere să discutăm cu cei care comandă mâncare pe
                        InfinityFood pentru că astfel aflăm ce ar trebui să facem mai bine. De aceea vă încurajăm să ne
                        spuneți ce vă place și ce nu vă place atunci când comandați mâncare de la noi.
                    </div>
                    <v-divider></v-divider>
                    <div class="titleText mb-3 mt-3">Relații clienți</div>
                    <div class="contentText mb-2">
                        <v-layout column>
                            <v-flex class="mb-2">
                                <v-icon>mail</v-icon>
                                E-mail:
                                <span style="color: #1b6cc4;">support@infinityfood.ro</span>
                            </v-flex>
                            <v-flex class="mb-2">
                                <v-icon>phone</v-icon>
                                Telekom:
                                <span style="color: #1b6cc4;">0760 432 235</span>
                            </v-flex>
                            <v-flex class="mb-2">
                                <v-icon>phone</v-icon>
                                Vodafone:
                                <span style="color: #1b6cc4;">0729 963 143</span>
                            </v-flex>
                            <v-flex class="mb-4">
                                <v-icon>phone</v-icon>
                                Digi:
                                <span style="color: #1b6cc4;">0722 343 122</span>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                    </div>
                    <div class="titleText mb-3 mt-3">Parteneri</div>
                    <div class="contentText mb-2">Doriți să deveniți partenerul nostru? Vreți să vă vedeți restaurantul
                        pe site? Sau sunteți deja partener și aveți întrebări cu privire la serviciile noastre?
                    </div>
                    <div class="contentText mb-4">
                        Apelați cu încredere la
                        <v-icon class="mr-2">phone</v-icon>
                        <span style="color: #1b6cc4;">0762 188 254</span>
                        sau scrieți-ne un e-mail la adresa
                        <v-icon class="mr-2">mail</v-icon>
                        <span style="color: #1b6cc4;">partener@infinityfood.ro</span>.
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        methods: {
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrap");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
            }
        }
    }
</script>

<style scoped>
    .wrap {
        height: 500px;
        font-size: 55px;
        font-weight: bold;
        color: white;
        text-shadow: 3px 3px black;
        width: 100%;
        background-image: url('../assets/contactbgdark.png');
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .logo {
        font-size: 110px;
        font-weight: bold;
        font-family: sans-serif;
    }

    .titleText {
        font-family: sans-serif;
        font-size: 35px;
    }

    .contentText {
        font-family: sans-serif;
        font-size: 21px;
        text-align: justify;
    }
</style>