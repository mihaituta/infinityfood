import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import notification from './components/utils/notifications'
import './utils/globalcss.css'

Vue.component('notification', notification);
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuelidate)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.dispatch('tryAutoLogin')
    }
});
